"""
CyphEV — OBD-II Simulator (Serial Replay)

Simulates an OBD-II port by streaming raw sensor data from CSV datasets
to an ESP32 over serial. The ESP32 handles all feature extraction and
ML inference on-device.

Two modes:
  REALTIME — Streams raw 10 Hz BMW i3 sensor rows (voltage, current, speed, etc.)
             ESP32 buffers 600 samples, extracts window features, predicts SoC + Range.

  CYCLE    — Sends per-cycle discharge summaries from NASA battery dataset.
             ESP32 maintains cycle history, computes derived features, predicts SoH + RUL.

Usage:
    python serial_replay.py --port COM5                        # all modes
    python serial_replay.py --port COM5 --mode realtime        # SoC + Range only
    python serial_replay.py --port COM5 --mode cycle           # SoH + RUL only
    python serial_replay.py --list-ports                       # list serial ports
    python serial_replay.py --dry-run                          # print what would be sent
    python serial_replay.py --dry-run --mode realtime --trip TripA01  # specific trip

Dependencies:
    pip install pyserial numpy pandas
"""

import argparse
import sys
import time
from pathlib import Path

import numpy as np
import pandas as pd

# ─── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).resolve().parent
BMW_DIR = SCRIPT_DIR.parent / "03 SoC + Range Prediction [Benchmark]" / "BMW_i3_Dataset"
NASA_DIR = SCRIPT_DIR.parent / "04 SoH + RUL Prediction [Benchmark]" / "NASA_Cleaned_Dataset"

# ─── Helpers ──────────────────────────────────────────────────────────────────

def find_col(df, keyword):
    for c in df.columns:
        if keyword.lower() in c.lower():
            return c
    return None


def open_serial(port, baud):
    """Open serial port and wait for ESP32 READY."""
    import serial
    ser = serial.Serial(port, baud, timeout=2)
    time.sleep(2)  # ESP32 resets on serial connect
    while ser.in_waiting:
        line = ser.readline().decode('ascii', errors='replace').strip()
        if line:
            print(f"  ESP32> {line}")
    return ser


def send_line(ser, line, dry_run=False):
    """Send a line over serial (or print in dry-run mode)."""
    if dry_run:
        # Truncate for display
        display = line if len(line) < 120 else line[:117] + "..."
        print(f"  >> {display}")
        return
    ser.write((line + "\n").encode('ascii'))
    ser.flush()


def read_responses(ser, timeout=0.5):
    """Read all available responses from ESP32."""
    responses = []
    deadline = time.time() + timeout
    while time.time() < deadline:
        if ser.in_waiting:
            line = ser.readline().decode('ascii', errors='replace').strip()
            if line:
                responses.append(line)
                deadline = time.time() + 0.1  # extend slightly for multi-line responses
        else:
            time.sleep(0.005)
    return responses


# ─── Realtime mode: stream BMW i3 trip data ───────────────────────────────────

def load_bmw_trip(filepath):
    """Load a single BMW i3 trip CSV and extract raw sensor columns."""
    df = pd.read_csv(filepath, sep=';', encoding='latin1')
    cm = {
        'time': find_col(df, 'Time'),
        'velocity': find_col(df, 'Velocity'),
        'elevation': find_col(df, 'Elevation'),
        'throttle': find_col(df, 'Throttle'),
        'torque': find_col(df, 'Motor Torque') or find_col(df, 'Torque'),
        'accel': find_col(df, 'Longitudinal Accel') or find_col(df, 'Accel'),
        'regen': find_col(df, 'Regenerative'),
        'voltage': find_col(df, 'Battery Voltage') or find_col(df, 'Voltage'),
        'current': find_col(df, 'Battery Current') or find_col(df, 'Current'),
        'btemp': find_col(df, 'Battery Temp'),
        'soc': find_col(df, 'SoC'),
        'heating': find_col(df, 'Heating Power CAN') or find_col(df, 'Heating'),
        'aircon': find_col(df, 'AirCon'),
        'atemp': find_col(df, 'Ambient Temp'),
        # Extra telemetry columns (not used by ML, passed through for dashboard display)
        'coolant_heatercore': find_col(df, 'Coolant Temperature Heatercore') or find_col(df, 'Heatercore'),
        'coolant_inlet': find_col(df, 'Coolant Temperature Inlet') or find_col(df, 'Coolant Inlet'),
        'heat_exchanger': find_col(df, 'Heat Exchanger'),
        'cabin_temp': find_col(df, 'Cabin Temperature') or find_col(df, 'Cabin Temp'),
    }
    return df, cm


def stream_realtime(ser, trip_filter=None, max_rows=None, delay_ms=0, dry_run=False):
    """Stream raw sensor rows from BMW i3 trips to ESP32."""
    trip_files = sorted(BMW_DIR.glob("Trip*.csv"))
    if not trip_files:
        print(f"ERROR: No trip files found in {BMW_DIR}")
        return

    # Filter valid trips
    valid_trips = []
    for f in trip_files:
        if trip_filter and f.stem != trip_filter:
            continue
        df, cm = load_bmw_trip(f)
        if cm['soc'] is None or cm['voltage'] is None or cm['velocity'] is None:
            continue
        soc_first = df[cm['soc']].iloc[0]
        soc_last = df[cm['soc']].iloc[-1]
        if not (soc_first - soc_last > 2):
            continue
        valid_trips.append((f, df, cm))

    if not valid_trips:
        print("ERROR: No valid trips found" + (f" matching '{trip_filter}'" if trip_filter else ""))
        return

    print(f"\nREALTIME mode — {len(valid_trips)} trip(s)")
    print(f"Streaming raw sensor data at {'full speed' if delay_ms == 0 else f'{delay_ms}ms/row'}...")
    print(f"ESP32 will predict every {200} rows (once {600}-sample buffer is full)\n")

    total_sent = 0
    predictions = []

    for filepath, df, cm in valid_trips:
        trip_name = filepath.stem
        is_winter = 1 if trip_name.startswith("TripB") else 0

        print(f"--- Trip: {trip_name} ({len(df)} rows) ---")

        # Send RESET between trips
        send_line(ser, "RESET", dry_run)
        if not dry_run:
            time.sleep(0.1)
            for r in read_responses(ser, timeout=0.2):
                print(f"  ESP32> {r}")

        for i, (_, row) in enumerate(df.iterrows()):
            if max_rows and total_sent >= max_rows:
                break

            # Extract 14 raw channels
            t = float(row[cm['time']]) if cm['time'] and pd.notna(row[cm['time']]) else 0.0
            volt = float(row[cm['voltage']]) if pd.notna(row[cm['voltage']]) else 0.0
            curr = float(row[cm['current']]) if pd.notna(row[cm['current']]) else 0.0
            soc = float(row[cm['soc']]) if pd.notna(row[cm['soc']]) else 0.0
            vel = float(row[cm['velocity']]) if cm['velocity'] and pd.notna(row[cm['velocity']]) else 0.0
            acc = float(row[cm['accel']]) if cm['accel'] and pd.notna(row[cm['accel']]) else 0.0
            torq = float(row[cm['torque']]) if cm['torque'] and pd.notna(row[cm['torque']]) else 0.0
            btemp = float(row[cm['btemp']]) if cm['btemp'] and pd.notna(row[cm['btemp']]) else 0.0
            atemp = float(row[cm['atemp']]) if cm['atemp'] and pd.notna(row[cm['atemp']]) else 0.0

            heating = float(row[cm['heating']]) if cm['heating'] and pd.notna(row[cm['heating']]) else 0.0
            aircon = float(row[cm['aircon']]) if cm['aircon'] and pd.notna(row[cm['aircon']]) else 0.0
            hvac = abs(heating) * 1000 + abs(aircon) * 1000

            elev = float(row[cm['elevation']]) if cm['elevation'] and pd.notna(row[cm['elevation']]) else 0.0
            throttle = float(row[cm['throttle']]) if cm['throttle'] and pd.notna(row[cm['throttle']]) else 0.0
            regen = float(row[cm['regen']]) if cm['regen'] and pd.notna(row[cm['regen']]) else 0.0

            coolant_hc = float(row[cm['coolant_heatercore']]) if cm['coolant_heatercore'] and pd.notna(row[cm['coolant_heatercore']]) else 0.0
            coolant_in = float(row[cm['coolant_inlet']]) if cm['coolant_inlet'] and pd.notna(row[cm['coolant_inlet']]) else 0.0
            heat_ex = float(row[cm['heat_exchanger']]) if cm['heat_exchanger'] and pd.notna(row[cm['heat_exchanger']]) else 0.0
            cabin_t = float(row[cm['cabin_temp']]) if cm['cabin_temp'] and pd.notna(row[cm['cabin_temp']]) else 0.0
            aircon_kw = abs(aircon)  # raw A/C power in kW for dashboard display

            # 14 ML channels + 5 extra display channels = 19 total
            line = f"RT:{t:.4f},{volt:.4f},{curr:.4f},{soc:.4f},{vel:.4f},{acc:.4f},{torq:.4f},{btemp:.4f},{atemp:.4f},{hvac:.4f},{elev:.4f},{throttle:.4f},{regen:.4f},{is_winter:.1f},{coolant_hc:.1f},{coolant_in:.1f},{heat_ex:.1f},{cabin_t:.1f},{aircon_kw:.4f}"
            send_line(ser, line, dry_run)
            total_sent += 1

            # Read any predictions that came back
            if not dry_run:
                for r in read_responses(ser, timeout=0.01):
                    if r.startswith("PRED:"):
                        predictions.append(r)
                        print(f"  [{total_sent:>6d}] {r}")
                    elif r.startswith("ERR:"):
                        print(f"  [{total_sent:>6d}] {r}")

            if delay_ms > 0:
                time.sleep(delay_ms / 1000.0)

            # Progress indicator
            if total_sent % 2000 == 0:
                if dry_run:
                    print(f"  ... {total_sent} rows sent ...")

        if max_rows and total_sent >= max_rows:
            break

    # Flush remaining responses
    if not dry_run:
        time.sleep(0.5)
        for r in read_responses(ser, timeout=1.0):
            if r.startswith("PRED:"):
                predictions.append(r)
                print(f"  [flush] {r}")

    print(f"\nRealtime done: {total_sent} rows sent, {len(predictions)} predictions received")


# ─── Cycle mode: stream NASA battery data ────────────────────────────────────

def stream_cycles(ser, battery_filter=None, max_cycles=None, dry_run=False):
    """Stream per-cycle discharge summaries from NASA dataset to ESP32."""
    meta = pd.read_csv(NASA_DIR / "metadata.csv")
    meta['Re'] = pd.to_numeric(meta['Re'], errors='coerce')
    meta['Rct'] = pd.to_numeric(meta['Rct'], errors='coerce')
    meta['Capacity'] = pd.to_numeric(meta['Capacity'], errors='coerce')
    meta.loc[meta['Re'].abs() > 10, 'Re'] = np.nan
    meta.loc[meta['Rct'].abs() > 10, 'Rct'] = np.nan

    batteries = sorted(meta['battery_id'].unique())
    if battery_filter:
        batteries = [b for b in batteries if b == battery_filter]

    print(f"\nCYCLE mode — {len(batteries)} battery(ies)")
    print(f"Streaming per-cycle discharge summaries...")
    print(f"ESP32 computes derived features (rolling, lags, deltas) on-device\n")

    total_sent = 0
    predictions = []

    for batt in batteries:
        batt_meta = meta[meta['battery_id'] == batt].sort_values('uid')

        print(f"--- Battery: {batt} ---")

        # Send RESET between batteries
        send_line(ser, "RESET", dry_run)
        if not dry_run:
            time.sleep(0.1)
            for r in read_responses(ser, timeout=0.2):
                print(f"  ESP32> {r}")

        cycle = 0
        impedance_re, impedance_rct = [], []

        for _, row in batt_meta.iterrows():
            if max_cycles and total_sent >= max_cycles:
                break

            if row['type'] == 'impedance':
                impedance_re.append(row.get('Re', np.nan))
                impedance_rct.append(row.get('Rct', np.nan))
                continue

            if row['type'] != 'discharge':
                continue

            capacity = row.get('Capacity', np.nan)
            if pd.isna(capacity):
                continue

            csv_path = NASA_DIR / "data" / row['filename']
            if not csv_path.exists():
                continue

            try:
                ddf = pd.read_csv(csv_path)
            except Exception:
                continue

            if len(ddf) < 5:
                continue

            v = ddf['Voltage_measured'].values
            i = ddf['Current_measured'].values
            t = ddf['Temperature_measured'].values
            time_s = ddf['Time'].values

            re_val = impedance_re[-1] if impedance_re and not np.isnan(impedance_re[-1]) else 0.0
            rct_val = impedance_rct[-1] if impedance_rct and not np.isnan(impedance_rct[-1]) else 0.0
            energy = np.trapezoid(v * np.abs(i), time_s) / 3600 if len(time_s) > 1 else 0

            # Send telemetry snapshot first (dashboard display during charging)
            # TEL:voltage,current,packTemp,isCharging,airconPower
            # Use last sample from discharge cycle as representative snapshot
            tel_volt = float(v[-1])      # end-of-discharge voltage (will rise during charge)
            tel_curr = float(np.mean(i)) # charging current (negative = charging in)
            tel_temp = float(t[-1])      # battery temperature at end of cycle
            # Simulate charging: use mean voltage bumped up, negative current (charging)
            charge_volt = float(np.max(v))       # voltage near full
            charge_curr = float(-abs(np.mean(i)))  # negative current = charging
            tel_line = f"TEL:{charge_volt:.4f},{charge_curr:.4f},{tel_temp:.4f},1,0.0"
            send_line(ser, tel_line, dry_run)

            # Build cycle summary line
            # CYC:battery_id,cycle,capacity,v_mean,v_std,v_min,v_max,v_range,
            #     i_mean,i_std,i_min,i_max,t_mean,t_std,t_max,t_rise,
            #     discharge_time,energy,Re,Rct
            line = (
                f"CYC:{batt},{cycle},{capacity:.6f},"
                f"{np.mean(v):.6f},{np.std(v):.6f},{np.min(v):.6f},{np.max(v):.6f},{np.max(v)-np.min(v):.6f},"
                f"{np.mean(i):.6f},{np.std(i):.6f},{np.min(i):.6f},{np.max(i):.6f},"
                f"{np.mean(t):.6f},{np.std(t):.6f},{np.max(t):.6f},{np.max(t)-t[0]:.6f},"
                f"{time_s[-1]:.6f},{energy:.6f},{re_val:.6f},{rct_val:.6f}"
            )
            send_line(ser, line, dry_run)
            total_sent += 1
            cycle += 1

            # Read predictions
            if not dry_run:
                time.sleep(0.02)  # small delay for ESP32 to process
                for r in read_responses(ser, timeout=0.1):
                    if r.startswith("PRED:") or r.startswith("INFO:"):
                        predictions.append(r)
                        print(f"  [cyc {cycle:>3d}] {r}")
                    elif r.startswith("ERR:"):
                        print(f"  [cyc {cycle:>3d}] {r}")

        if max_cycles and total_sent >= max_cycles:
            break

    # Flush
    if not dry_run:
        time.sleep(0.5)
        for r in read_responses(ser, timeout=1.0):
            if r.startswith("PRED:"):
                predictions.append(r)
                print(f"  [flush] {r}")

    print(f"\nCycle done: {total_sent} cycles sent, {len(predictions)} predictions received")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="CyphEV OBD-II Simulator — stream raw data to ESP32 for edge inference"
    )
    parser.add_argument("--port", type=str, help="Serial port (e.g., COM5, /dev/ttyUSB0)")
    parser.add_argument("--baud", type=int, default=115200)
    parser.add_argument("--mode", choices=["realtime", "cycle", "all"], default="all",
                        help="Which mode to run (default: all)")
    parser.add_argument("--trip", type=str, help="Specific BMW trip name (e.g., TripA01)")
    parser.add_argument("--battery", type=str, help="Specific NASA battery ID (e.g., B0005)")
    parser.add_argument("--max-rows", type=int, help="Max raw rows to send in realtime mode")
    parser.add_argument("--max-cycles", type=int, help="Max cycles to send in cycle mode")
    parser.add_argument("--delay-ms", type=int, default=0,
                        help="Delay between rows in ms (0 = full speed, 100 = ~10Hz real-time)")
    parser.add_argument("--list-ports", action="store_true")
    parser.add_argument("--dry-run", action="store_true",
                        help="Don't connect to serial, just show what would be sent")
    args = parser.parse_args()

    if args.list_ports:
        import serial.tools.list_ports
        ports = serial.tools.list_ports.comports()
        if ports:
            for p in ports:
                print(f"  {p.device} — {p.description}")
        else:
            print("  No serial ports found.")
        return

    ser = None
    if not args.dry_run:
        if not args.port:
            print("ERROR: --port required (or use --dry-run / --list-ports)")
            sys.exit(1)
        print(f"Connecting to {args.port} @ {args.baud}...")
        ser = open_serial(args.port, args.baud)

    print("=" * 60)
    print("  CyphEV OBD-II Simulator")
    print("  ESP32 performs on-device feature extraction + ML inference")
    print("=" * 60)

    if args.mode in ("realtime", "all"):
        stream_realtime(ser, trip_filter=args.trip, max_rows=args.max_rows,
                       delay_ms=args.delay_ms, dry_run=args.dry_run)

    if args.mode in ("cycle", "all"):
        stream_cycles(ser, battery_filter=args.battery, max_cycles=args.max_cycles,
                     dry_run=args.dry_run)

    if ser:
        ser.close()
        print("\nSerial port closed.")

    print("\nDone.")


if __name__ == "__main__":
    main()
