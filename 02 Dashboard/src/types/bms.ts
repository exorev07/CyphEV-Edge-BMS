export const AlertSeverity = {
  ATTENTION_REQUIRED: 'ATTENTION_REQUIRED',
  SEVERE: 'SEVERE',
  CRITICAL: 'CRITICAL',
} as const

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity]

export interface BMSAlert {
  id: string
  code: string
  message: string
  severity: AlertSeverity
  timestamp: number
}

export interface BMSData {
  // Core Battery Stats
  soc: number
  soh: number
  voltage: number
  current: number
  power: number

  // Performance Stats
  velocity: number
  throttle: number
  elevation: number
  motorTorque: number
  longitudinalAccel: number

  // Predictions (Edge AI)
  rulCycles: number
  rulDays: number
  remainingRangeKm: number
  remainingTimeMinutes: number

  // Environment & Safety
  packTemp: number
  ambientTemp: number
  humidity: number
  pressure: number

  // Additional Sensors
  airconPower: number
  heatExchangerTemp: number
  coolantHeatercoreTemp: number
  coolantInletTemp: number

  // Hardware Status
  fanStatus: boolean
  fanRpm: number
  relayStatus: 'CONNECTED' | 'DISCONNECTED'
  isCharging: boolean

  // Anomaly Flags
  capacityFadeDetected: boolean
  thermalRunawayRisk: boolean
  voltageAnomaly: boolean
  currentAnomaly: boolean
  batterySwellDetected: boolean
  waterLeakageDetected: boolean
  socDropDetected: boolean

  timestamp: number
}

export interface HistoryPoint {
  time: string
  voltage: number
  temp: number
  ambientTemp: number
  current: number
  soc: number
  range: number
  soh: number
  humidity: number
  pressure: number
  power: number
}

export type SystemStatus = 'NOMINAL' | 'WARNING' | 'SEVERE' | 'CRITICAL'

export function getSystemStatus(data: BMSData): SystemStatus {
  // CRITICAL: voltage/current anomaly → relay disconnects
  if (data.voltageAnomaly || data.currentAnomaly || data.thermalRunawayRisk) return 'CRITICAL'

  // SEVERE: leak, swell, rapid SoC drop
  if (
    data.waterLeakageDetected ||
    data.batterySwellDetected ||
    data.socDropDetected
  ) return 'SEVERE'

  // WARNING: attention-level issues
  if (
    data.capacityFadeDetected ||
    data.soc < 20 ||
    data.packTemp > 45
  ) return 'WARNING'

  return 'NOMINAL'
}
