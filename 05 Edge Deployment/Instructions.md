<div align="center">

# CyphEV: ESP32 Edge Deployment Guide
*Step-by-step instructions to train models, flash firmware, and run 4 ML models simultaneously on an ESP32-WROOM-32.*

</div>

## 📖 Table of Contents

- [Prerequisites](#-prerequisites)
- [1️⃣ Train Models & Export C Headers](#1️⃣-train-models--export-c-headers)
- [2️⃣ Find Your COM Port](#2️⃣-find-your-com-port)
- [3️⃣ Upload Firmware](#3️⃣-upload-firmware)
- [4️⃣ Test SoC + Range (Realtime Mode)](#4️⃣-test-soc--range-realtime-mode)
- [5️⃣ Test SoH + RUL (Cycle Mode)](#5️⃣-test-soh--rul-cycle-mode)
- [6️⃣ Run Both Modes (Full Demo)](#6️⃣-run-both-modes-full-demo)
- [7️⃣ Firebase Live Dashboard](#7️⃣-firebase-live-dashboard)
- [Dry Run (No ESP32 Needed)](#-dry-run-no-esp32-needed)
- [File Overview](#-file-overview)
- [Troubleshooting](#-troubleshooting)

## ⚙️ Prerequisites

- ESP32-WROOM-32 connected via USB
- Arduino IDE with ESP32 board support installed
- Python 3.10+ with dependencies:

  ```bash
  pip install pyserial numpy pandas scikit-learn xgboost
  ```

## 1️⃣ Train Models & Export C Headers

Run this once before flashing firmware. It trains all 4 models on the datasets and exports them as C header files directly into `esp32_firmware/main/models/`.

```bash
python train_and_export.py
```

> The datasets (`BMW_i3_Dataset/` and `NASA_Cleaned_Dataset/`) are gitignored. Download them from the links in the main README and place them in the correct folders before running this.

## 2️⃣ Find Your COM Port

```bash
python serial_replay.py --list-ports
```

Look for the port showing `CP210x` or `CH340` — that's the ESP32. Usually `COM4` or `COM5` on Windows.

## 3️⃣ Upload Firmware

1. Open `esp32_firmware/main/main.ino` in Arduino IDE
2. Select board: **ESP32 Dev Module**
3. Select the correct COM port (check Device Manager if unsure)
4. Click **Upload**
5. Open Serial Monitor (115200 baud) — you should see:

   ```
   [CyphEV] ESP32 BMS Edge Device
   [CyphEV] READY | RAM free: ~261000 bytes
   ```

6. **Close the Serial Monitor** before running the replay script — only one program can use the port at a time

## 4️⃣ Test SoC + Range (Realtime Mode)

Streams raw 10 Hz BMW i3 driving data. The ESP32 buffers 600 samples (60s window), extracts 22–24 statistical features, and predicts SoC and Range using on-device XGBoost inference.

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

- **SoC**: Should start ~85–87% for TripA01 (battery starts nearly full)
- **Range**: 150–350 Wh/km is realistic for an EV
- **Latency**: ~950µs per prediction (~1ms)

Other trips to try:

```bash
python serial_replay.py --port COM4 --mode realtime --trip TripA03
python serial_replay.py --port COM4 --mode realtime --trip TripA05
```

## 5️⃣ Test SoH + RUL (Cycle Mode)

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
- **Latency**: ~60µs for SoH, ~17µs for RUL

Other batteries to try:

```bash
python serial_replay.py --port COM4 --mode cycle --battery B0006
python serial_replay.py --port COM4 --mode cycle --battery B0007
```

## 6️⃣ Run Both Modes (Full Demo)

```bash
python serial_replay.py --port COM4 --mode all
```

Runs realtime mode first (all available trips), then cycle mode (all batteries).

## 7️⃣ Firebase Live Dashboard

The ESP32 can push predictions to Firebase Realtime Database over WiFi, which the CyphEV dashboard subscribes to in real-time.

### Setup

1. Copy `esp32_firmware/main/wifi_config.example.h` to `esp32_firmware/main/wifi_config.h`
2. Fill in your credentials:

   ```c
   #define WIFI_SSID     "YourWiFiName"
   #define WIFI_PASSWORD "YourWiFiPassword"
   ```

3. Upload the firmware as usual (Step 3)
4. Run the serial replay — predictions will appear in the terminal AND on the dashboard

### How it works

- After each inference cycle, the ESP32 HTTPS PUTs a JSON payload to Firebase RTDB at `/bms/live`
- The dashboard subscribes to `/bms/live` in real-time (registered users only — demo users see mock data)

| User | Data Source |
|------|-------------|
| `demo@cyphev.app` | Mock data (simulated, no ESP32 needed) |
| Any other account | Live Firebase RTDB (ESP32 pushes here) |

### Verify Firebase is working

1. Open Firebase Console → Realtime Database
2. Run the serial replay with ESP32 connected to WiFi
3. You should see `/bms/live` updating in real-time
4. Open the dashboard — data should appear live

## 🧪 Dry Run (No ESP32 Needed)

Preview what data would be sent without a connected device:

```bash
python serial_replay.py --dry-run --mode realtime --trip TripA01
python serial_replay.py --dry-run --mode cycle --battery B0005
```

## 📁 File Overview

| File | Purpose |
|------|---------|
| `train_and_export.py` | Trains all 4 models, exports C headers to `esp32_firmware/main/models/` |
| `serial_replay.py` | OBD-II simulator — streams raw CSV data to ESP32 over serial |
| `model_benchmarks.md` | Benchmark vs deployable accuracy comparison |
| `esp32_firmware/main/main.ino` | ESP32 firmware — feature extraction + inference |
| `esp32_firmware/main/models/*.h` | Exported model weights as C headers |
| `wifi_config.example.h` | WiFi config template (copy to `wifi_config.h`) |

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| `PermissionError` on COM port | Close Arduino Serial Monitor first |
| No predictions appearing | Wait for 600 samples to buffer (realtime) or 1 cycle (cycle mode) |
| Arduino compile error about ctags | Copy `esp32_firmware/` to a short path like `C:\esp32\` (Windows long path bug) |
| Wrong predictions | Re-run `train_and_export.py` to regenerate model headers, then re-upload firmware |
