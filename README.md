<div align="center">

# CyphEV
*An Edge-Based proof-of-concept aftermarket OBD-II plug-in device, with Multi-Task ML & IoT Framework for Real-Time EV Battery Monitoring that runs 4 ML models simultaneously on an ESP32, and streams sensor data along with predictions to a real-time monitoring dashboard, with time-series analytics and exportable logs.*

[![Platform](https://img.shields.io/badge/Platform-ESP32-red?logo=espressif)](https://www.espressif.com/)
[![Language](https://img.shields.io/badge/Languages-Python%20%7C%20C%2B%2B%20%7C%20TypeScript-blue)](#)
[![ML](https://img.shields.io/badge/ML-XGBoost%20%7C%20Scikit--learn-orange?logo=scikitlearn)](https://scikit-learn.org/)
[![Dashboard](https://img.shields.io/badge/Dashboard-Live%20on%20Vercel-black?logo=vercel)](https://cyphev-dashboard.vercel.app)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)

<!-- Replace with your dashboard GIF -->
<img src="Assets/dashboard_preview.gif" width="85%" alt="CyphEV Dashboard"/>

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Repository Structure](#-repository-structure)
- [ML Models](#-ml-models)
- [Edge Deployment](#-edge-deployment)
- [Dashboard](#-dashboard)
- [Running the Dashboard Locally](#-running-the-dashboard-locally)

## 🔍 Overview

CyphEV is designed as a proof-of-concept aftermarket OBD-II plug-in device for Electric Vehicles - not replacing the vehicle's built-in BMS, but adding ML-driven monitoring on top of it. Four lightweight ML models to predict/estimate SoC, Range, SoH, RUL run entirely on an **ESP32-WROOM-32** with ~2ms inference time. All safety-critical decisions happen on-device with zero cloud dependency; Firebase is used only for pushing predictions to the dashboard via ESP32, so that the users can have a better view at all the data with detailed time-series analytics and download exportable logs in CSV format.

**Key highlights:**
- **4 models, <2ms combined**: SoC, Range, SoH, and RUL predicted simultaneously on 520 KB RAM.
- **All feature extraction on-device**: windowed stats, polynomial expansion, rolling/lag/delta features computed on the ESP32 from raw sensor streams.
- **Safety features**: thermal control, voltage/current anomaly detection, automated relay kill-switch mechanism with latched password re-auth via dashboard.
- **Real-time dashboard**: React 19 + Firebase, deployed on Vercel with live sensor data, detailed analytics charts, and exportable alert logs.


## 📁 Repository Structure

```text
CyphEV/
├── 📂 01 Literature Review/          — Reviewed prior research (gitignored)
│
├── 📂 02 Dashboard/                  — React 19 + TypeScript web app (deployed on Vercel)
│   ├── src/
│   │   ├── pages/                    — Landing, Auth, Dashboard pages
│   │   ├── components/               — UI components (dashboard, landing)
│   │   ├── services/mockBmsService.ts — Mock data + alert system
│   │   └── types/bms.ts              — BMS data types
│   └── ...
│
├── 📂 03 SoC + Range Prediction [Benchmark]/
│   ├── BMW_i3_Dataset/               — 42 valid driving trips (10 Hz CSVs)
│   ├── SOC_prediction.ipynb          — SoC benchmark notebook
│   └── Range_prediction.ipynb        — Range benchmark notebook
│
├── 📂 04 SoH + RUL Prediction [Benchmark]/
│   ├── NASA_Cleaned_Dataset/         — 34 Li-ion batteries
│   ├── SOH_prediction.ipynb          — SoH benchmark notebook
│   └── RUL_prediction.ipynb          — RUL benchmark notebook
│
├── 📂 05 Edge Deployment/
│   ├── train_and_export.py           — Trains models, exports C headers for ESP32
│   ├── serial_replay.py              — OBD-II simulator (streams CSV data to ESP32)
│   ├── model_benchmarks.md           — Benchmark vs deployable accuracy comparison
│   ├── Instructions.md               — Step-by-step deployment guide
│   └── esp32_firmware/main/          — Arduino firmware (feature extraction + inference)
│
└── 📂 06 Paper/                      — IEEE-format paper + plagiarism report (gitignored)
```

## 🤖 ML Models

All models are trained offline and exported as static C header files compiled directly into the ESP32 firmware - no dynamic memory allocation, no external dependencies.

| Model | Algorithm | R² | MAE | Latency (ESP32) |
|-------|-----------|-----|-----|-----------------|
| SoC | XGBoost (100 trees, depth 4) | 0.81 | 3.9% | ~950 µs |
| Range | XGBoost (100 trees, depth 4) | 0.89 | 24.3 Wh/km | ~950 µs |
| SoH | LassoCV + degree-2 polynomial | 0.97 | 1.3% | ~60 µs |
| RUL | RidgeCV | 0.85 | 4.0 cycles | ~17 µs |

> 3 of 4 deployable models match or exceed their full-scale benchmark counterparts. Total inference for all 4 models: **<2ms combined**.

**Datasets:**
- **BMW i3 Trip Data**: 42 valid real-world driving trips at 10 Hz (SoC + Range)
- **NASA Battery Aging Dataset**: 34 Li-ion cells cycled to end-of-life (SoH + RUL)

## 🚀 Edge Deployment

See [`05 Edge Deployment/Instructions.md`](05%20Edge%20Deployment/Instructions.md) for the full step-by-step guide.

### Prerequisites

- ESP32-WROOM-32 connected via USB
- Arduino IDE with ESP32 board support
- Python 3.10+ with dependencies:
  ```bash
  pip install pyserial numpy pandas scikit-learn xgboost
  ```

### Quick Start

**1. Train models and export C headers**
```bash
cd "05 Edge Deployment"
python train_and_export.py
```

**2. Upload firmware**

Open `esp32_firmware/main/main.ino` in Arduino IDE, select **ESP32 Dev Module**, and upload. You should see:
```
[CyphEV] ESP32 BMS Edge Device
[CyphEV] READY | RAM free: ~261000 bytes
```

**3. Run SoC + Range (realtime mode)**
```bash
python serial_replay.py --port COM4 --mode realtime --trip TripA01
```

**4. Run SoH + RUL (cycle mode)**
```bash
python serial_replay.py --port COM4 --mode cycle --battery B0005
```

**No ESP32? Use dry-run mode:**
```bash
python serial_replay.py --dry-run --mode realtime --trip TripA01
```

## 📊 Dashboard

Live at **[cyphev-dashboard.vercel.app](https://cyphev-dashboard.vercel.app)**

| Page | Description |
|------|-------------|
| Overview | SoC, Range, SoH, RUL gauges + sensor tiles + relay control |
| Analytics | 7 time-series charts with date range picker |
| Logs | Filterable alert history (CRITICAL / SEVERE / ATTENTION REQUIRED) with CSV export |

Demo users can view the dashboard with the credentials - `demo@cyphev.app | DemoPass@123` to see the simulated data. Registered users receive live predictions pushed from the ESP32 via Firebase Realtime Database and can manage the relay mechanism.

## 🖥️ Running the Dashboard Locally

```bash
cd "02 Dashboard"
npm install
npm run dev
```

Firebase config is stored in `02 Dashboard/.env` as `VITE_FIREBASE_*` variables (not committed). The app runs in mock/demo mode without it.

---

<div align="center">

***Built as a Minor Project (Semester 4) at IIIT Naya Raipur***

**If you find this useful, consider giving it a ⭐!**
</div>