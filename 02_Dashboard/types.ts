export enum AlertSeverity {
  ATTENTION_REQUIRED = 'ATTENTION_REQUIRED',
  CRITICAL = 'CRITICAL'
}

export interface BMSAlert {
  id: string;
  code: string;
  message: string;
  severity: AlertSeverity;
  timestamp: number;
}

export interface BMSData {
  // Core Battery Stats
  soc: number; // State of Charge %
  soh: number; // State of Health %
  voltage: number; // Volts
  current: number; // Amps
  power: number; // Watts
  
  // Performance Stats
  velocity: number; // km/h
  throttle: number; // %
  elevation: number; // meters
  motorTorque: number; // Nm
  longitudinalAccel: number; // m/s²

  // Predictions (Edge AI)
  rulCycles: number; // Remaining Useful Life in Cycles
  rulDays: number; // Remaining Useful Life in Days (Estimated)
  remainingRangeKm: number;
  remainingTimeMinutes: number;
  
  // Environment & Safety
  packTemp: number; // Celsius
  ambientTemp: number; // Celsius
  humidity: number; // %
  pressure: number; // Pascal (swelling detection)
  
  // Additional Sensors
  airconPower: number; // W
  heatExchangerTemp: number; // Celsius
  coolantHeatercoreTemp: number; // Celsius
  coolantInletTemp: number; // Celsius
  
  // Hardware Status
  fanStatus: boolean; // Cooling fan on/off
  relayStatus: 'CONNECTED' | 'DISCONNECTED'; // Safety relay
  isCharging: boolean;
  
  // Anomaly Flags (from backend ML)
  capacityFadeDetected: boolean;
  thermalRunawayRisk: boolean;
  voltageAnomaly: boolean;
  currentAnomaly: boolean;
  batterySwellDetected: boolean;
  waterLeakageDetected: boolean;
  
  timestamp: number;
}

// Chart data point structure
export interface HistoryPoint {
  time: string;
  voltage: number;
  temp: number;
  ambientTemp: number;
  current: number;
  soc: number;
  range: number;
}