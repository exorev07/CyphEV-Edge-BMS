# CyphEV: Edge-Deployable Model Benchmarks

## Target Device
**ESP32-WROOM-32** (520 KB RAM, 240 MHz dual-core)

## Datasets
| Dataset | Used For | Source | Details |
|---------|----------|--------|---------|
| BMW i3 Trip Data | SoC & Range | 42 valid driving trips | 10 Hz sampling, semicolon-delimited CSVs |
| NASA Battery Aging | SoH & RUL | 34 batteries (charge/discharge cycles) | Per-cycle CSVs + metadata |

## Feature Engineering
- **Windowed extraction**: WINDOW = 600 samples (60s at 10 Hz), STRIDE = 200
- **SoC features** (22): voltage/current/temp stats, delta_soc, time_elapsed, rolling means/stds
- **Range features** (24): same as SoC + speed, acceleration, regen braking stats
- **SoH features** (10 base -> 65 polynomial degree-2): capacity, impedance (Re, Rct), cycle count, voltage/current/temp stats
- **RUL features** (42): cycle-level stats, impedance, capacity fade rate, rolling features

## Model Accuracy Comparison

| Model | Benchmark R² | Deployable R² | Benchmark MAE | Deployable MAE | Notes |
|-------|-------------|---------------|---------------|----------------|-------|
| **SoC** | 0.93 (Stacking Ensemble) | **0.81** (XGBoost) | 2.5% | 3.9% | Stacking infeasible on ESP32; XGBoost is practical |
| **Range** | 0.89 (XGBoost) | **0.89** (XGBoost) | 23.2 Wh/km | 24.3 Wh/km | Matches benchmark |
| **SoH** | 0.96 (LassoCV Poly) | **0.97** (LassoCV Poly) | 1.7% | 1.3% | Better than benchmark |
| **RUL** | 0.85 (RidgeCV) | **0.85** (RidgeCV) | 4.0 cycles | 4.0 cycles | Matches benchmark |

## Deployable Model Details

| Model | Type | Size Constraint | Export Format |
|-------|------|----------------|---------------|
| **SoC** | XGBoost (100 trees, depth 4) | 22 input features | C header — switch-case tree walk |
| **Range** | XGBoost (100 trees, depth 4) | 24 input features | C header — switch-case tree walk |
| **SoH** | LassoCV + Polynomial (degree 2) | 10 base -> 65 poly features | C header — exponent matrix + dot product |
| **RUL** | RidgeCV (linear) | 42 input features | C header — scale + dot product |

## Output Files
All model headers in `esp32_firmware/main/models/`:
- `model_soc.h` — `soc_predict(raw_features[22])`
- `model_range.h` — `range_predict(raw_features[24])`
- `model_soh.h` — `soh_predict(raw_features[10])`
- `model_rul.h` — `rul_predict(raw_features[42])`

Each header includes embedded StandardScaler parameters (mean/scale) for on-device normalization.

## Key Observations
- **SoC** is the only model with a meaningful gap (0.81 vs 0.93). The benchmark used a complex stacking ensemble (XGBoost + LightGBM + Ridge + SVR + MLP) which is impractical on a microcontroller. XGBoost at 0.81 with ~4% MAE is still usable for a PoC.
- **Range**, **SoH**, and **RUL** all match or exceed their benchmark accuracies.
- All models fit within ESP32 memory constraints using shallow trees (XGBoost) or linear models with polynomial features.

## Training Pipeline
Script: `train_and_export.py`
- Loads raw CSV datasets, applies windowed feature extraction
- Trains models with scikit-learn / XGBoost
- Exports C headers with embedded weights and scalers
- Saves metadata JSONs to `training_metadata/` (gitignored)