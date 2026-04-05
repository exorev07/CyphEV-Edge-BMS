/*
 * CyphEV - ESP32 Edge Inference Firmware
 *
 * Performs ON-DEVICE feature extraction and ML inference.
 * The laptop (simulating an OBD-II port) streams raw sensor data;
 * the ESP32 handles windowing, statistics, and prediction.
 * Predictions and telemetry are pushed to Firebase Realtime Database
 * over WiFi for the dashboard to consume in real-time.
 *
 * ── Two operating modes ──
 *
 * REALTIME mode (SoC + Range):
 *   Laptop streams raw 10 Hz sensor rows over serial.
 *   ESP32 accumulates a 600-sample rolling window. Every 200 new
 *   samples it extracts statistical features and runs XGBoost inference.
 *
 *   Laptop → ESP32:  "RT:time,voltage,current,soc,velocity,accel,torque,btemp,atemp,hvac,elevation,throttle,regen,is_winter\n"
 *   ESP32 → Laptop:  "PRED:SOC:value:latency_us\n"  and/or  "PRED:RANGE:value:latency_us\n"
 *
 * CYCLE mode (SoH + RUL):
 *   Laptop sends per-cycle discharge summaries (what a real BMS reports
 *   after each charge/discharge cycle).
 *   ESP32 maintains a small cycle history and computes rolling/lag/delta
 *   features, then runs linear model inference.
 *
 *   Laptop → ESP32:  "CYC:battery_id,cycle,capacity,v_mean,...,Rct\n"
 *   ESP32 → Laptop:  "PRED:SOH:value:latency_us\n"  and  "PRED:RUL:value:latency_us\n"
 *
 * Control commands:
 *   "RESET\n"   — clear all buffers and history
 *   "STATUS\n"  — print buffer fill / cycle count
 */

#include <math.h>
#include <string.h>
#include <stdlib.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include "wifi_config.h"
#include "models/model_soc.h"
#include "models/model_range.h"
#include "models/model_soh.h"
#include "models/model_rul.h"

// ─── Configuration ───────────────────────────────────────────────────────────
#define SERIAL_BAUD    115200
#define MAX_LINE_LEN   1024

// Realtime window parameters (must match training pipeline)
#define RT_WINDOW      600
#define RT_STRIDE      200
#define RT_N_RAW       14   // ML sensor channels per sample
#define RT_N_EXTRA      5   // extra display-only channels (coolant_hc, coolant_in, heat_ex, cabin_t, aircon_kw)
#define RT_N_SERIAL    19   // total channels sent over serial (14 ML + 5 display)
#define RT_N_CHANNELS  18   // channels stored in circular buffer (14 raw + 4 cumulative)

// Cycle history depth (for rolling/lag features)
#define CYC_MAX_HISTORY 200
#define CYC_N_RAW       20  // fields per cycle row (including battery_id mapped to int)

// Firebase push interval (must be long enough for TLS handshake + serial buffer to not overflow)
#define FIREBASE_PUSH_INTERVAL_MS 3000

// ─── Firebase state ──────────────────────────────────────────────────────────
static WiFiClientSecure secureClient;
static unsigned long lastFirebasePush = 0;
static bool wifiConnected = false;

// Latest predictions (updated by inference, pushed periodically)
static bool pendingFirebasePush = false;  // set true after inference, pushed in loop()
static float lastSoC = -1, lastRange = -1, lastSoH = -1, lastRUL = -1;
// Latest raw sensor values (from most recent RT row)
static float lastVoltage = 0, lastCurrent = 0, lastPackTemp = 0, lastAmbientTemp = 0;
static float lastVelocity = 0, lastThrottle = 0, lastElevation = 0, lastMotorTorque = 0;
static float lastAccel = 0, lastHvac = 0, lastRegen = 0;
static float lastHumidity = 35.0;
static float lastPressure = 1013.0;
static bool  lastFanStatus = false;
static int   lastFanRpm = 0;
// Extra display-only sensor values (from BMW dataset, not used by ML)
static float lastCoolantHC = 0, lastCoolantIn = 0, lastHeatExchanger = 0;
static float lastCabinTemp = 0, lastAirconKW = 0;
static bool  lastIsCharging = false;

// ─── Realtime circular buffer ────────────────────────────────────────────────
enum RTChan {
  CH_TIME=0, CH_VOLT, CH_CURR, CH_SOC, CH_VEL, CH_ACCEL, CH_TORQUE,
  CH_BTEMP, CH_ATEMP, CH_HVAC, CH_ELEV, CH_THROTTLE, CH_REGEN, CH_WINTER,
  CH_CUM_AH, CH_CUM_WH, CH_CUM_DIST, CH_ELAPSED
};

static float rtBuf[RT_N_CHANNELS][RT_WINDOW];
static int   rtHead = 0;
static int   rtCount = 0;
static int   rtFilled = 0;

static float cumAh = 0.0f;
static float cumWh = 0.0f;
static float cumDistKm = 0.0f;
static float tripStartTime = 0.0f;
static float lastTime = 0.0f;
static bool  tripStarted = false;

// ─── Cycle history buffer ────────────────────────────────────────────────────
#define CF_CYCLE       0
#define CF_CAPACITY    1
#define CF_V_MEAN      2
#define CF_V_STD       3
#define CF_V_MIN       4
#define CF_V_MAX       5
#define CF_V_RANGE     6
#define CF_I_MEAN      7
#define CF_I_STD       8
#define CF_I_MIN       9
#define CF_I_MAX       10
#define CF_T_MEAN      11
#define CF_T_STD       12
#define CF_T_MAX       13
#define CF_T_RISE      14
#define CF_DISCHARGE_T 15
#define CF_ENERGY      16
#define CF_RE          17
#define CF_RCT         18
#define CF_SOH         19
#define CF_N_FIELDS    20

static float cycHist[CYC_MAX_HISTORY][CF_N_FIELDS];
static int   cycCount = 0;

// ─── Serial line buffer ──────────────────────────────────────────────────────
static char lineBuf[MAX_LINE_LEN];
static int  linePos = 0;

// ─── WiFi Setup ──────────────────────────────────────────────────────────────

void setupWiFi() {
  Serial.print("[WiFi] Connecting to ");
  Serial.print(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println(" OK");
    Serial.print("[WiFi] IP: ");
    Serial.println(WiFi.localIP());
  } else {
    wifiConnected = false;
    Serial.println(" FAILED (will run in offline mode)");
  }

  // Skip certificate verification for Firebase RTDB (test mode)
  secureClient.setInsecure();
}

// ─── Firebase HTTPS Push ─────────────────────────────────────────────────────

void firebasePush() {
  if (!wifiConnected || WiFi.status() != WL_CONNECTED) return;

  unsigned long now = millis();
  if (now - lastFirebasePush < FIREBASE_PUSH_INTERVAL_MS) return;
  lastFirebasePush = now;

  // Build JSON payload matching dashboard BMSData shape
  float power = lastVoltage * lastCurrent;
  float soc = (lastSoC >= 0) ? lastSoC : 78.0f;
  float rangeKm = soc * 3.5f;
  float soh = (lastSoH >= 0) ? lastSoH : 92.5f;
  float rulCycles = (lastRUL >= 0) ? lastRUL : 1450;
  float rulDays = rulCycles * 0.68f;
  float avgSpeed = (lastVelocity > 0) ? lastVelocity : 40.0f;
  float remainingTimeMins = rangeKm / avgSpeed * 60.0f;

  bool voltageAnomaly = (lastVoltage > 410 || lastVoltage < 300);
  bool currentAnomaly = (lastCurrent > 160 || lastCurrent < -125);
  bool fanOn = lastPackTemp > 35;

  char json[1200];
  snprintf(json, sizeof(json),
    "{"
    "\"soc\":%.1f,\"soh\":%.1f,\"voltage\":%.1f,\"current\":%.1f,\"power\":%.0f,"
    "\"velocity\":%.1f,\"throttle\":%.0f,\"elevation\":%.0f,\"motorTorque\":%.1f,\"longitudinalAccel\":%.2f,"
    "\"rulCycles\":%.0f,\"rulDays\":%.0f,\"remainingRangeKm\":%.1f,\"remainingTimeMinutes\":%.0f,"
    "\"packTemp\":%.1f,\"ambientTemp\":%.1f,\"humidity\":%.1f,\"pressure\":%.1f,"
    "\"airconPower\":%.1f,\"heatExchangerTemp\":%.1f,\"coolantHeatercoreTemp\":%.1f,\"coolantInletTemp\":%.1f,"
    "\"fanStatus\":%s,\"fanRpm\":%d,\"relayStatus\":\"%s\",\"isCharging\":%s,"
    "\"capacityFadeDetected\":false,\"thermalRunawayRisk\":%s,"
    "\"voltageAnomaly\":%s,\"currentAnomaly\":%s,"
    "\"batterySwellDetected\":false,\"waterLeakageDetected\":false,\"socDropDetected\":false,"
    "\"timestamp\":%lu,"
    "\"rangeWhKm\":%.1f,"
    "\"esp32\":true"
    "}",
    soc, soh, lastVoltage, lastCurrent, power,
    lastVelocity, lastThrottle, lastElevation, lastMotorTorque, lastAccel,
    rulCycles, rulDays, rangeKm, remainingTimeMins,
    lastPackTemp, lastAmbientTemp, lastHumidity, lastPressure,
    lastAirconKW * 1000.0f, lastHeatExchanger, lastCoolantHC, lastCoolantIn,
    fanOn ? "true" : "false", fanOn ? 3000 : 0,
    (voltageAnomaly || currentAnomaly) ? "DISCONNECTED" : "CONNECTED",
    lastIsCharging ? "true" : "false",
    (lastPackTemp > 60) ? "true" : "false",
    voltageAnomaly ? "true" : "false",
    currentAnomaly ? "true" : "false",
    (unsigned long)(millis()),
    (lastRange >= 0) ? lastRange : 0.0f
  );

  // HTTPS PUT to Firebase RTDB REST API
  if (!secureClient.connect(FIREBASE_HOST, 443)) {
    Serial.println("[Firebase] Connection failed");
    return;
  }

  String path = String("/bms/live.json?auth=") + FIREBASE_API_KEY;
  String request = String("PUT ") + path + " HTTP/1.1\r\n" +
    "Host: " + FIREBASE_HOST + "\r\n" +
    "Content-Type: application/json\r\n" +
    "Content-Length: " + String(strlen(json)) + "\r\n" +
    "Connection: close\r\n\r\n" +
    json;

  secureClient.print(request);

  // Read response (just check status, don't block long)
  unsigned long timeout = millis() + 3000;
  bool headerDone = false;
  while (millis() < timeout) {
    if (secureClient.available()) {
      String line = secureClient.readStringUntil('\n');
      if (!headerDone && line.startsWith("HTTP/")) {
        if (line.indexOf("200") > 0) {
          Serial.println("[Firebase] Push OK");
        } else {
          Serial.print("[Firebase] ");
          Serial.println(line);
        }
        headerDone = true;
        break;
      }
    }
    delay(10);
  }

  secureClient.stop();
}

// ─── Helper: parse comma-separated floats ────────────────────────────────────
int parseFloats(const char *str, float *out, int maxCount) {
  int count = 0;
  const char *p = str;
  while (*p && count < maxCount) {
    char *end;
    float val = strtof(p, &end);
    if (end == p) break;
    out[count++] = val;
    p = end;
    if (*p == ',') p++;
  }
  return count;
}

// ─── Helper: window statistics ───────────────────────────────────────────────

static inline float rbGet(int ch, int i) {
  int idx = (rtHead - rtFilled + i + RT_WINDOW) % RT_WINDOW;
  return rtBuf[ch][idx];
}

float chanMean(int ch, int n) {
  float sum = 0;
  for (int i = 0; i < n; i++) sum += rbGet(ch, i);
  return sum / n;
}

float chanMax(int ch, int n) {
  float mx = rbGet(ch, 0);
  for (int i = 1; i < n; i++) { float v = rbGet(ch, i); if (v > mx) mx = v; }
  return mx;
}

float chanMin(int ch, int n) {
  float mn = rbGet(ch, 0);
  for (int i = 1; i < n; i++) { float v = rbGet(ch, i); if (v < mn) mn = v; }
  return mn;
}

float chanStd(int ch, int n) {
  float mean = chanMean(ch, n);
  float sum = 0;
  for (int i = 0; i < n; i++) { float d = rbGet(ch, i) - mean; sum += d * d; }
  return sqrtf(sum / n);
}

static float sortBuf[RT_WINDOW];
float chanPercentile(int ch, int n, float pct) {
  for (int i = 0; i < n; i++) sortBuf[i] = rbGet(ch, i);
  for (int i = 1; i < n; i++) {
    float key = sortBuf[i];
    int j = i - 1;
    while (j >= 0 && sortBuf[j] > key) { sortBuf[j+1] = sortBuf[j]; j--; }
    sortBuf[j+1] = key;
  }
  int idx = (int)(pct / 100.0f * (n - 1));
  return sortBuf[idx];
}

float chanFracBelow(int ch, int n, float threshold) {
  int cnt = 0;
  for (int i = 0; i < n; i++) if (rbGet(ch, i) < threshold) cnt++;
  return (float)cnt / n * 100.0f;
}

float prodMean(int chA, int chB, int n) {
  float sum = 0;
  for (int i = 0; i < n; i++) sum += rbGet(chA, i) * rbGet(chB, i);
  return sum / n;
}

float prodMax(int chA, int chB, int n) {
  float mx = rbGet(chA, 0) * rbGet(chB, 0);
  for (int i = 1; i < n; i++) { float v = rbGet(chA, i) * rbGet(chB, i); if (v > mx) mx = v; }
  return mx;
}

// ─── Realtime feature extraction + inference ─────────────────────────────────

void realtimeInference() {
  int n = rtFilled;
  int mid = n / 2;

  float midCumAh   = rbGet(CH_CUM_AH, mid);
  float midCumWh   = rbGet(CH_CUM_WH, mid);
  float midCumDist = rbGet(CH_CUM_DIST, mid);
  float elapsed    = rbGet(CH_ELAPSED, mid);

  // ── SoC features (22) ──
  float socFeats[22];
  socFeats[0]  = chanMean(CH_VOLT, n);
  socFeats[1]  = chanMean(CH_CURR, n);
  socFeats[2]  = prodMean(CH_VOLT, CH_CURR, n);
  socFeats[3]  = chanMean(CH_VEL, n);
  socFeats[4]  = chanMean(CH_ACCEL, n);
  socFeats[5]  = chanMean(CH_TORQUE, n);
  socFeats[6]  = chanMean(CH_BTEMP, n);
  socFeats[7]  = chanMean(CH_ATEMP, n);
  socFeats[8]  = chanMean(CH_HVAC, n);
  socFeats[9]  = chanMax(CH_CURR, n);
  socFeats[10] = chanMin(CH_CURR, n);
  socFeats[11] = chanStd(CH_CURR, n);
  socFeats[12] = chanStd(CH_VEL, n);
  socFeats[13] = prodMax(CH_VOLT, CH_CURR, n);
  socFeats[14] = chanMin(CH_VOLT, n);
  socFeats[15] = midCumAh;
  socFeats[16] = midCumWh;
  socFeats[17] = midCumDist;
  socFeats[18] = elapsed;
  socFeats[19] = rbGet(CH_ELEV, n-1) - rbGet(CH_ELEV, 0);
  socFeats[20] = chanMean(CH_BTEMP, n) - chanMean(CH_ATEMP, n);
  socFeats[21] = rbGet(CH_WINTER, 0);

  unsigned long t0 = micros();
  float socPred = soc_predict(socFeats);
  unsigned long socUs = micros() - t0;

  lastSoC = socPred;

  Serial.print("PRED:SOC:");
  Serial.print(socPred, 4);
  Serial.print(":");
  Serial.print(socUs);
  Serial.println("us");

  // ── Range features (24) ──
  float avgSpeed = chanMean(CH_VEL, n);
  if (avgSpeed >= 3.0f) {
    float windowDist = 0;
    for (int i = 1; i < n; i++) {
      float dt = rbGet(CH_TIME, i) - rbGet(CH_TIME, i-1);
      if (dt < 0) dt = 0.1f;
      windowDist += fabsf(rbGet(CH_VEL, i)) / 3600.0f * dt;
    }

    if (windowDist >= 0.2f) {
      float rangeFeats[24];
      rangeFeats[0]  = rbGet(CH_SOC, 0);
      rangeFeats[1]  = chanMean(CH_VOLT, n);
      rangeFeats[2]  = chanMean(CH_CURR, n);
      rangeFeats[3]  = prodMean(CH_VOLT, CH_CURR, n);
      rangeFeats[4]  = chanMean(CH_BTEMP, n);
      rangeFeats[5]  = chanMean(CH_ATEMP, n);
      rangeFeats[6]  = chanMean(CH_VEL, n);
      rangeFeats[7]  = chanStd(CH_VEL, n);
      rangeFeats[8]  = chanMax(CH_VEL, n);
      rangeFeats[9]  = chanPercentile(CH_VEL, n, 25.0f);
      rangeFeats[10] = chanPercentile(CH_VEL, n, 75.0f);
      rangeFeats[11] = chanMean(CH_ACCEL, n);
      rangeFeats[12] = chanStd(CH_ACCEL, n);
      rangeFeats[13] = chanFracBelow(CH_ACCEL, n, -2.0f);
      rangeFeats[14] = chanMean(CH_THROTTLE, n);
      rangeFeats[15] = chanMean(CH_TORQUE, n);
      rangeFeats[16] = chanStd(CH_TORQUE, n);
      rangeFeats[17] = rbGet(CH_ELEV, n-1) - rbGet(CH_ELEV, 0);
      rangeFeats[18] = chanStd(CH_ELEV, n);
      rangeFeats[19] = chanMean(CH_HVAC, n);
      rangeFeats[20] = rbGet(CH_WINTER, 0);
      rangeFeats[21] = rbGet(CH_TIME, n-1) - rbGet(CH_TIME, 0);

      int regenCnt = 0;
      for (int i = 0; i < n; i++) if (rbGet(CH_REGEN, i) > 0) regenCnt++;
      rangeFeats[22] = (float)regenCnt / n * 100.0f;

      rangeFeats[23] = chanMean(CH_BTEMP, n) - chanMean(CH_ATEMP, n);

      t0 = micros();
      float rangePred = range_predict(rangeFeats);
      unsigned long rangeUs = micros() - t0;

      lastRange = rangePred;

      Serial.print("PRED:RANGE:");
      Serial.print(rangePred, 4);
      Serial.print(":");
      Serial.print(rangeUs);
      Serial.println("us");
    }
  }

  // Flag for deferred push in loop() (avoids blocking serial while HTTPS is in flight)
  pendingFirebasePush = true;
}

// ─── Process a realtime sensor row ───────────────────────────────────────────

void processRT(const char *data) {
  float vals[RT_N_SERIAL];
  int n = parseFloats(data, vals, RT_N_SERIAL);
  if (n < RT_N_RAW) {
    Serial.print("ERR:RT expects at least ");
    Serial.print(RT_N_RAW);
    Serial.print(" channels, got ");
    Serial.println(n);
    return;
  }

  // Update latest sensor values for Firebase push
  lastVoltage    = vals[CH_VOLT];
  lastCurrent    = vals[CH_CURR];
  lastPackTemp   = vals[CH_BTEMP];
  lastAmbientTemp = vals[CH_ATEMP];
  lastVelocity   = vals[CH_VEL];
  lastThrottle   = vals[CH_THROTTLE];
  lastElevation  = vals[CH_ELEV];
  lastMotorTorque = vals[CH_TORQUE];
  lastAccel      = vals[CH_ACCEL];
  lastHvac       = vals[CH_HVAC];
  lastRegen      = vals[CH_REGEN];
  lastFanStatus  = lastPackTemp > 35;
  lastFanRpm     = lastFanStatus ? 3000 : 0;
  lastIsCharging = false;  // RT mode = driving

  // Extra display-only channels (indices 14-18, if present)
  if (n >= RT_N_SERIAL) {
    lastCoolantHC     = vals[14];
    lastCoolantIn     = vals[15];
    lastHeatExchanger = vals[16];
    lastCabinTemp     = vals[17];
    lastAirconKW      = vals[18];
  }

  // Update cumulative accumulators
  float curTime = vals[CH_TIME];
  if (!tripStarted) {
    tripStartTime = curTime;
    lastTime = curTime;
    tripStarted = true;
  } else {
    float dt = curTime - lastTime;
    if (dt < 0) dt = 0.1f;
    float power = vals[CH_VOLT] * vals[CH_CURR];
    cumAh += vals[CH_CURR] * dt / 3600.0f;
    cumWh += power * dt / 3600.0f;
    cumDistKm += fabsf(vals[CH_VEL]) / 3600.0f * dt;
    lastTime = curTime;
  }

  // Store raw channels in circular buffer
  for (int ch = 0; ch < RT_N_RAW; ch++) {
    rtBuf[ch][rtHead] = vals[ch];
  }
  rtBuf[CH_CUM_AH][rtHead]   = cumAh;
  rtBuf[CH_CUM_WH][rtHead]   = cumWh;
  rtBuf[CH_CUM_DIST][rtHead] = cumDistKm;
  rtBuf[CH_ELAPSED][rtHead]  = curTime - tripStartTime;

  rtHead = (rtHead + 1) % RT_WINDOW;
  if (rtFilled < RT_WINDOW) rtFilled++;
  rtCount++;

  // Always flag a push so sensor values update on the dashboard continuously
  pendingFirebasePush = true;

  if (rtFilled >= RT_WINDOW && (rtCount % RT_STRIDE) == 0) {
    realtimeInference();
  }
}

// ─── Cycle mode: SoH + RUL ──────────────────────────────────────────────────

void processCycle(const char *data) {
  const char *p = strchr(data, ',');
  if (!p) {
    Serial.println("ERR:CYC missing battery_id separator");
    return;
  }
  p++;

  float vals[19];
  int n = parseFloats(p, vals, 19);
  if (n != 19) {
    Serial.print("ERR:CYC expects 19 numeric fields after battery_id, got ");
    Serial.println(n);
    return;
  }

  int idx = cycCount % CYC_MAX_HISTORY;
  cycHist[idx][CF_CYCLE]       = vals[0];
  cycHist[idx][CF_CAPACITY]    = vals[1];
  cycHist[idx][CF_V_MEAN]      = vals[2];
  cycHist[idx][CF_V_STD]       = vals[3];
  cycHist[idx][CF_V_MIN]       = vals[4];
  cycHist[idx][CF_V_MAX]       = vals[5];
  cycHist[idx][CF_V_RANGE]     = vals[6];
  cycHist[idx][CF_I_MEAN]      = vals[7];
  cycHist[idx][CF_I_STD]       = vals[8];
  cycHist[idx][CF_I_MIN]       = vals[9];
  cycHist[idx][CF_I_MAX]       = vals[10];
  cycHist[idx][CF_T_MEAN]      = vals[11];
  cycHist[idx][CF_T_STD]       = vals[12];
  cycHist[idx][CF_T_MAX]       = vals[13];
  cycHist[idx][CF_T_RISE]      = vals[14];
  cycHist[idx][CF_DISCHARGE_T] = vals[15];
  cycHist[idx][CF_ENERGY]      = vals[16];
  cycHist[idx][CF_RE]          = vals[17];
  cycHist[idx][CF_RCT]         = vals[18];

  float capacity = vals[1];
  float soh = (capacity / 2.0f) * 100.0f;
  cycHist[idx][CF_SOH] = soh;

  cycCount++;
  int total = (cycCount < CYC_MAX_HISTORY) ? cycCount : CYC_MAX_HISTORY;

  #define CHIST(offset, field) cycHist[((cycCount - total + (offset)) % CYC_MAX_HISTORY)][field]
  #define CUR(field) CHIST(total - 1, field)
  #define PREV(field, lag) ((total > (lag)) ? CHIST(total - 1 - (lag), field) : CUR(field))

  // ── SoH prediction (10 base features) ──
  float sohFeats[10];
  sohFeats[0] = CUR(CF_ENERGY);
  sohFeats[1] = CUR(CF_RCT);
  sohFeats[2] = CUR(CF_T_MEAN);
  sohFeats[3] = CUR(CF_T_MAX);
  sohFeats[4] = CUR(CF_V_STD);
  sohFeats[5] = CUR(CF_DISCHARGE_T);
  sohFeats[6] = CUR(CF_I_MEAN);
  sohFeats[7] = CUR(CF_V_MAX);
  sohFeats[8] = CUR(CF_T_RISE);
  sohFeats[9] = CUR(CF_RE);

  unsigned long t0 = micros();
  float sohPred = soh_predict(sohFeats);
  unsigned long sohUs = micros() - t0;

  lastSoH = sohPred;

  Serial.print("PRED:SOH:");
  Serial.print(sohPred, 4);
  Serial.print(":");
  Serial.print(sohUs);
  Serial.println("us");

  // ── RUL prediction (42 features) ──
  if (total < 3) {
    Serial.println("INFO:RUL needs 3+ cycles, buffering...");
    pendingFirebasePush = true;
    return;
  }

  float cycle   = CUR(CF_CYCLE);
  float curSoH  = CUR(CF_SOH);
  float curCap  = CUR(CF_CAPACITY);
  float curRe   = CUR(CF_RE);

  float sohDelta    = curSoH - PREV(CF_SOH, 1);
  float capDelta    = curCap - PREV(CF_CAPACITY, 1);
  float reDelta     = curRe  - PREV(CF_RE, 1);
  float energyDelta = CUR(CF_ENERGY) - PREV(CF_ENERGY, 1);

  float firstSoH   = CHIST(0, CF_SOH);
  float firstCycle  = CHIST(0, CF_CYCLE);
  float sohRate = (firstSoH - curSoH) / (cycle - firstCycle + 1.0f);

  float firstCap = CHIST(0, CF_CAPACITY);
  float capFade = (firstCap > 0) ? (firstCap - curCap) / firstCap : 0;

  float capRoll3 = 0, capRoll5 = 0, capStd3 = 0, capStd5 = 0;
  {
    int w3 = (total < 3) ? total : 3;
    int w5 = (total < 5) ? total : 5;
    float sum3 = 0, sum5 = 0;
    for (int i = 0; i < w5; i++) {
      float c = CHIST(total - 1 - i, CF_CAPACITY);
      sum5 += c;
      if (i < w3) sum3 += c;
    }
    capRoll3 = sum3 / w3;
    capRoll5 = sum5 / w5;

    float var3 = 0, var5 = 0;
    for (int i = 0; i < w5; i++) {
      float c = CHIST(total - 1 - i, CF_CAPACITY);
      float d5 = c - capRoll5; var5 += d5 * d5;
      if (i < w3) { float d3 = c - capRoll3; var3 += d3 * d3; }
    }
    capStd3 = (w3 > 1) ? sqrtf(var3 / (w3 - 1)) : 0;
    capStd5 = (w5 > 1) ? sqrtf(var5 / (w5 - 1)) : 0;
  }

  float sohLag1 = PREV(CF_SOH, 1);
  float sohLag2 = PREV(CF_SOH, 2);
  float sohLag3 = (total > 3) ? CHIST(total - 4, CF_SOH) : curSoH;
  float capLag1 = PREV(CF_CAPACITY, 1);
  float capLag2 = PREV(CF_CAPACITY, 2);
  float capLag3 = (total > 3) ? CHIST(total - 4, CF_CAPACITY) : curCap;
  float reLag1  = PREV(CF_RE, 1);
  float reLag2  = PREV(CF_RE, 2);

  float sohXrate  = curSoH * sohRate;
  float sohXdelta = curSoH * sohDelta;
  float capXRe    = curCap * curRe;
  float sohSq     = curSoH * curSoH;
  float capFadeSq = capFade * capFade;

  float rulFeats[42];
  rulFeats[0]  = cycle;
  rulFeats[1]  = curSoH;
  rulFeats[2]  = CUR(CF_V_MEAN);
  rulFeats[3]  = CUR(CF_V_STD);
  rulFeats[4]  = CUR(CF_V_MIN);
  rulFeats[5]  = CUR(CF_V_MAX);
  rulFeats[6]  = CUR(CF_V_RANGE);
  rulFeats[7]  = CUR(CF_I_MEAN);
  rulFeats[8]  = CUR(CF_I_STD);
  rulFeats[9]  = CUR(CF_I_MIN);
  rulFeats[10] = CUR(CF_I_MAX);
  rulFeats[11] = CUR(CF_T_MEAN);
  rulFeats[12] = CUR(CF_T_STD);
  rulFeats[13] = CUR(CF_T_MAX);
  rulFeats[14] = CUR(CF_T_RISE);
  rulFeats[15] = CUR(CF_DISCHARGE_T);
  rulFeats[16] = CUR(CF_ENERGY);
  rulFeats[17] = curRe;
  rulFeats[18] = CUR(CF_RCT);
  rulFeats[19] = sohDelta;
  rulFeats[20] = capDelta;
  rulFeats[21] = reDelta;
  rulFeats[22] = energyDelta;
  rulFeats[23] = sohRate;
  rulFeats[24] = capFade;
  rulFeats[25] = capRoll3;
  rulFeats[26] = capRoll5;
  rulFeats[27] = capStd3;
  rulFeats[28] = capStd5;
  rulFeats[29] = sohLag1;
  rulFeats[30] = sohLag2;
  rulFeats[31] = sohLag3;
  rulFeats[32] = capLag1;
  rulFeats[33] = capLag2;
  rulFeats[34] = capLag3;
  rulFeats[35] = reLag1;
  rulFeats[36] = reLag2;
  rulFeats[37] = sohXrate;
  rulFeats[38] = sohXdelta;
  rulFeats[39] = capXRe;
  rulFeats[40] = sohSq;
  rulFeats[41] = capFadeSq;

  t0 = micros();
  float rulPred = max(0.0f, rul_predict(rulFeats));
  unsigned long rulUs = micros() - t0;

  lastRUL = rulPred;

  Serial.print("PRED:RUL:");
  Serial.print(rulPred, 4);
  Serial.print(":");
  Serial.print(rulUs);
  Serial.println("us");

  pendingFirebasePush = true;

  #undef CHIST
  #undef CUR
  #undef PREV
}

// ─── Reset all state ─────────────────────────────────────────────────────────

void resetAll() {
  rtHead = 0; rtCount = 0; rtFilled = 0;
  cumAh = 0; cumWh = 0; cumDistKm = 0;
  tripStarted = false;
  cycCount = 0;
  lastSoC = -1; lastRange = -1; lastSoH = -1; lastRUL = -1;
  lastIsCharging = false;
  memset(rtBuf, 0, sizeof(rtBuf));
  memset(cycHist, 0, sizeof(cycHist));
  Serial.println("OK:reset");
}

// ─── Telemetry snapshot (dashboard display during charging) ──────────────────

void processTelemetry(const char *data) {
  // TEL:voltage,current,packTemp,isCharging,airconPower
  float vals[5];
  int n = parseFloats(data, vals, 5);
  if (n < 3) {
    Serial.print("ERR:TEL expects at least 3 fields, got ");
    Serial.println(n);
    return;
  }

  lastVoltage     = vals[0];
  lastCurrent     = vals[1];
  lastPackTemp    = vals[2];

  // Charging mode: zero out movement values
  lastVelocity    = 0;
  lastThrottle    = 0;
  lastAccel       = 0;
  lastMotorTorque = 0;
  lastRegen       = 0;

  // Charging-specific
  bool isCharging  = (n >= 4) ? (vals[3] > 0.5f) : true;
  lastAirconKW     = (n >= 5) ? vals[4] : 0;
  lastHvac         = lastAirconKW * 1000.0f;

  lastFanStatus    = lastPackTemp > 35;
  lastFanRpm       = lastFanStatus ? 3000 : 0;

  // Store charging flag for Firebase push
  lastIsCharging   = isCharging;

  pendingFirebasePush = true;
}

// ─── Process incoming line ───────────────────────────────────────────────────

void processLine(const char *line) {
  if (strncmp(line, "RT:", 3) == 0) {
    processRT(line + 3);
  } else if (strncmp(line, "TEL:", 4) == 0) {
    processTelemetry(line + 4);
  } else if (strncmp(line, "CYC:", 4) == 0) {
    processCycle(line + 4);
  } else if (strcmp(line, "RESET") == 0) {
    resetAll();
  } else if (strcmp(line, "STATUS") == 0) {
    Serial.print("STATUS:rt_filled=");
    Serial.print(rtFilled);
    Serial.print("/");
    Serial.print(RT_WINDOW);
    Serial.print(",rt_total=");
    Serial.print(rtCount);
    Serial.print(",cycles=");
    Serial.print(cycCount);
    Serial.print(",wifi=");
    Serial.println(wifiConnected ? "connected" : "disconnected");
  } else {
    Serial.print("ERR:unknown command '");
    Serial.print(line);
    Serial.println("'");
  }
}

// ─── Arduino entry points ────────────────────────────────────────────────────

void setup() {
  Serial.setRxBufferSize(4096);  // Default is 128 — too small when HTTPS blocks
  Serial.begin(SERIAL_BAUD);
  while (!Serial) { delay(10); }

  Serial.println("READY");
  Serial.println("CyphEV Edge Inference v3.0 — On-Device Feature Extraction + Firebase Push");

  // Connect to WiFi
  setupWiFi();

  Serial.println("Modes:");
  Serial.println("  RT:<time,volt,curr,soc,vel,accel,torque,btemp,atemp,hvac,elev,throttle,regen,is_winter>");
  Serial.println("  CYC:<battery_id,cycle,cap,v_mean,v_std,v_min,v_max,v_range,i_mean,i_std,i_min,i_max,t_mean,t_std,t_max,t_rise,dtime,energy,Re,Rct>");
  Serial.println("  RESET | STATUS");
  Serial.print("RAM free: ");
  Serial.print(ESP.getFreeHeap());
  Serial.println(" bytes");
}

void loop() {
  // Drain all available serial data first (non-blocking)
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\n' || c == '\r') {
      if (linePos > 0) {
        lineBuf[linePos] = '\0';
        processLine(lineBuf);
        linePos = 0;
      }
    } else {
      if (linePos < MAX_LINE_LEN - 1) {
        lineBuf[linePos++] = c;
      } else {
        Serial.println("ERR:line overflow");
        linePos = 0;
      }
    }
  }

  // Push to Firebase only when serial is idle (no data waiting)
  if (pendingFirebasePush && !Serial.available()) {
    pendingFirebasePush = false;
    firebasePush();
  }
}
