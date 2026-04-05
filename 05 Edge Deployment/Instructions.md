# CyphEV: ESP32 Edge Deployment Demo

Proof-of-concept: 4 ML models (SoC, Range, SoH, RUL) running entirely on an ESP32-WROOM-32 microcontroller. The ESP32 does **all feature extraction and inference on-device** - the laptop only simulates raw OBD-II sensor data.

## Prerequisites

- ESP32-WROOM-32 board connected via USB
- Arduino IDE with ESP32 board support installed
- Python 3.10+ with dependencies:
  ```
  pip install pyserial numpy pandas scikit-learn xgboost
  ```

## Step 1: Upload Firmware

1. Open `esp32_firmware/main/main.ino` in Arduino IDE
2. Select board: **ESP32 Dev Module**
3. Select the correct COM port (check Device Manager if unsure)
4. Click **Upload**
5. Open Serial Monitor (115200 baud) — you should see:
   ```
   [CyphEV] ESP32 BMS Edge Device
   [CyphEV] READY | RAM free: ~261000 bytes
   ```
6. **Close the Serial Monitor** before running the replay script (only one program can use the port at a time)

## Step 2: Find Your COM Port

```bash
python serial_replay.py --list-ports
```

Look for the port showing `CP210x` or `CH340` — that's the ESP32. Usually `COM4` or `COM5` on Windows.

## Step 3: Test SoC + Range (Realtime Mode)

Streams raw 10 Hz BMW i3 driving data. The ESP32 buffers 600 samples (60s window), extracts 22-24 statistical features, and predicts SoC and Range using on-device XGBoost tree inference.

```bash
python serial_replay.py --port COM4 --mode realtime --trip TripA01
```

Expected output (predictions start after 600 samples are buffered):
```
[RT row 600] PRED:SOC:86.0422:961us
[RT row 600] PRED:RANGE:217.5783:943us
[RT row 800] PRED:SOC:85.3812:955us
[RT row 800] PRED:RANGE:204.1247:948us
```

- **SoC**: Should start ~85-87% for TripA01 (battery starts nearly full)
- **Range**: 150-350 Wh/km is realistic for an EV
- **Latency**: ~950us per prediction (~1ms)

### Other trips to try

```bash
python serial_replay.py --port COM4 --mode realtime --trip TripA03
python serial_replay.py --port COM4 --mode realtime --trip TripA05
```

## Step 4: Test SoH + RUL (Cycle Mode)

Sends per-cycle discharge summaries from NASA battery aging data. The ESP32 maintains a cycle history buffer, computes rolling/lag/delta features, and predicts SoH (LassoCV polynomial) and RUL (RidgeCV linear).

```bash
python serial_replay.py --port COM4 --mode cycle --battery B0005
```

Expected output:
```
[cyc   1] PRED:SOH:90.1234:61us
[cyc   1] PRED:RUL:48.3210:17us
...
[cyc 120] PRED:SOH:72.2674:61us
[cyc 120] PRED:RUL:9.6935:17us
...
[cyc 168] PRED:SOH:66.4436:61us
[cyc 168] PRED:RUL:0.0000:17us
```

- **SoH**: Degrades from ~90% to ~65% over the battery's life
- **RUL**: Counts down from ~50 cycles to 0 (clamped, won't go negative)
- **Latency**: ~60us for SoH, ~17us for RUL

### Other batteries to try

```bash
python serial_replay.py --port COM4 --mode cycle --battery B0006
python serial_replay.py --port COM4 --mode cycle --battery B0007
```

## Step 5: Run Both Modes (Full Demo)

```bash
python serial_replay.py --port COM4 --mode all
```

This runs realtime mode first (all available trips), then cycle mode (all batteries).

## Dry Run (No ESP32 Needed)

Preview what data would be sent without a connected device:

```bash
python serial_replay.py --dry-run --mode realtime --trip TripA01
python serial_replay.py --dry-run --mode cycle --battery B0005
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `PermissionError` on COM port | Close Arduino Serial Monitor first |
| No predictions appearing | Wait for 600 samples to buffer (realtime) or 1 cycle (cycle mode) |
| Arduino compile error about ctags | Copy `esp32_firmware/` to a short path like `C:\esp32\` (Windows bug with long paths) |
| Wrong predictions | Re-run `train_and_export.py` to regenerate model headers, then re-upload firmware |

## File Overview

| File | Purpose |
|------|---------|
| `serial_replay.py` | OBD-II simulator — streams raw CSV data to ESP32 over serial |
| `train_and_export.py` | Trains models and exports C headers to `esp32_firmware/main/models/` |
| `model_benchmarks.md` | Model accuracy comparison (benchmark vs deployable) |
| `esp32_firmware/main/main.ino` | ESP32 firmware — feature extraction + inference |
| `esp32_firmware/main/models/*.h` | Exported model weights as C headers |

## Step 6: Firebase Live Dashboard (ESP32 → Cloud → Dashboard)

The ESP32 can push predictions directly to Firebase Realtime Database over WiFi, which the CyphEV dashboard subscribes to in real-time.

### Setup

1. Copy `esp32_firmware/main/wifi_config.example.h` to `esp32_firmware/main/wifi_config.h`
2. Edit `wifi_config.h` with your WiFi credentials:
   ```c
   #define WIFI_SSID     "YourWiFiName"
   #define WIFI_PASSWORD "YourWiFiPassword"
   ```
3. Upload the firmware as usual (Step 1)
4. On boot, the ESP32 will connect to WiFi and print its IP address
5. Run the serial replay — predictions will appear both in terminal AND on the dashboard

### How it works

- ESP32 connects to WiFi on boot
- After each inference cycle, it HTTPS PUTs a JSON payload to Firebase RTDB at `/bms/live`
- The dashboard (when logged in with a real account, not demo) subscribes to `/bms/live` via Firebase SDK
- Demo users (`demo@cyphev.app`) still see mock/simulated data

### Dashboard data source logic

| User | Data Source |
|------|-------------|
| `demo@cyphev.app` | Mock data (simulated, no ESP32 needed) |
| Any other account | Live Firebase RTDB (ESP32 pushes here) |

### Verify Firebase is working

1. Open Firebase Console → Realtime Database
2. Run the serial replay with ESP32 connected to WiFi
3. You should see `/bms/live` updating in real-time
4. Open the dashboard with your real account — data should appear live

## Architecture

```
Laptop (serial_replay.py)          ESP32 (main.ino)                    Cloud + Dashboard
========================          ==================                  ==================

  BMW i3 CSVs ──┐                 ┌── Circular Buffer (600 samples)
                 │   raw sensor   │       │
  NASA CSVs ────┼──── data ──────>├── Feature Extraction (on-device)
                 │   over serial  │       │
                 │                ├── XGBoost / Linear Model Inference
                 │   PRED:...     │       │
  Terminal <─────┼────────────────┤── Prediction Results
                                  │       │
                                  ├── WiFi ──> Firebase RTDB ──> Dashboard
                                  │            (/bms/live)        (real-time)

  No ML on laptop.                All ML on ESP32.                 Live monitoring.
```
