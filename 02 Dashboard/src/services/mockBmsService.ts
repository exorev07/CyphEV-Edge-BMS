import { useState, useEffect, useRef } from 'react'
import { AlertSeverity } from '../types/bms'
import type { BMSData, HistoryPoint, BMSAlert } from '../types/bms'

const generateMockData = (prevData: BMSData | null): BMSData => {
  const now = Date.now()

  // BMW i3 94Ah: nominal pack ~350–403V, current up to ~160A discharge / 125A charge
  let voltage = prevData ? prevData.voltage + (Math.random() - 0.5) * 2 : 380
  let current = prevData ? prevData.current + (Math.random() - 0.5) * 8 : 40
  let temp = prevData ? prevData.packTemp + (Math.random() - 0.45) * 1.2 : 35
  let ambientTemp = prevData ? prevData.ambientTemp + (Math.random() - 0.5) * 0.4 : 28

  voltage = Math.max(278, Math.min(415, voltage))
  // Occasional spike: ~1% chance of brief overcurrent/overvoltage
  if (Math.random() > 0.99) voltage += 15 + Math.random() * 10
  if (Math.random() > 0.99) current += 80 + Math.random() * 60
  current = Math.max(-125, Math.min(170, current)) // negative = charging
  temp = Math.max(15, Math.min(65, temp))
  ambientTemp = Math.max(15, Math.min(45, ambientTemp))

  const velocity = prevData ? Math.max(0, Math.min(180, prevData.velocity + (Math.random() - 0.45) * 8)) : 65
  const throttle = Math.max(0, Math.min(100, (velocity / 180) * 100 + (Math.random() - 0.5) * 15))
  const elevation = prevData ? prevData.elevation + (Math.random() - 0.5) * 5 : 450
  const motorTorque = Math.max(0, Math.min(500, (throttle * 5) + (Math.random() - 0.5) * 30))
  const longitudinalAccel = (Math.random() - 0.3) * 6

  const airconPower = 450 + (Math.random() * 150)
  const heatExchangerTemp = 28 + (Math.random() * 8)
  const coolantHeatercoreTemp = 55 + (Math.random() * 10)
  const coolantInletTemp = 32 + (Math.random() * 8)

  const isCharging = prevData
    ? prevData.isCharging ? Math.random() > 0.04 : Math.random() > 0.97
    : false
  const socStep = isCharging ? 0.2 : -0.15
  const soc = prevData ? Math.max(0, Math.min(100, prevData.soc + socStep)) : 78
  const remainingRangeKm = soc * 3.5

  const tempDegradation = temp > 45 ? 0.008 : 0.003
  const soh = prevData ? Math.max(60, prevData.soh - tempDegradation + (Math.random() - 0.5) * 0.002) : 92.5
  const maxCycles = 2000
  const rulCycles = Math.max(0, Math.round(((soh - 60) / 40) * maxCycles))
  const rulDays = Math.max(0, Math.round(rulCycles * 0.68))

  const avgSpeed = velocity > 0 ? velocity : 40
  const remainingTimeMinutes = remainingRangeKm / avgSpeed * 60

  const voltageAnomaly = voltage > 410 || voltage < 300
  const currentAnomaly = current > 160 || current < -125
  const relayStatus: 'CONNECTED' | 'DISCONNECTED' = voltageAnomaly || currentAnomaly ? 'DISCONNECTED' : 'CONNECTED'

  return {
    soc: parseFloat(soc.toFixed(1)),
    soh: parseFloat(soh.toFixed(1)),
    voltage: parseFloat(voltage.toFixed(1)),
    current: parseFloat(current.toFixed(1)),
    power: parseFloat((voltage * current).toFixed(0)),

    velocity: parseFloat(velocity.toFixed(1)),
    throttle: parseFloat(throttle.toFixed(0)),
    elevation: parseFloat(elevation.toFixed(0)),
    motorTorque: parseFloat(motorTorque.toFixed(1)),
    longitudinalAccel: parseFloat(longitudinalAccel.toFixed(2)),

    rulCycles,
    rulDays,
    remainingRangeKm: parseFloat(remainingRangeKm.toFixed(1)),
    remainingTimeMinutes: parseFloat(remainingTimeMinutes.toFixed(0)),

    packTemp: parseFloat(temp.toFixed(1)),
    ambientTemp: parseFloat(ambientTemp.toFixed(1)),
    humidity: parseFloat((45 + Math.random() * 5).toFixed(1)),
    pressure: parseFloat((1013 + Math.random() * 10).toFixed(1)),

    airconPower: parseFloat(airconPower.toFixed(1)),
    heatExchangerTemp: parseFloat(heatExchangerTemp.toFixed(1)),
    coolantHeatercoreTemp: parseFloat(coolantHeatercoreTemp.toFixed(1)),
    coolantInletTemp: parseFloat(coolantInletTemp.toFixed(1)),

    fanStatus: temp > 35,
    fanRpm: temp > 35
      ? Math.round(prevData?.fanRpm
          ? Math.max(2500, Math.min(4000, prevData.fanRpm + (Math.random() - 0.5) * 200))
          : 2500 + Math.random() * 1500)
      : 0,
    relayStatus,
    isCharging,

    capacityFadeDetected: Math.random() > 0.98,
    thermalRunawayRisk: temp > 60,
    voltageAnomaly,
    currentAnomaly,
    batterySwellDetected: Math.random() > 0.995,
    waterLeakageDetected: Math.random() > 0.995,
    socDropDetected: prevData ? (prevData.soc - soc) > 0.5 : false,

    timestamp: now,
  }
}

export const useBMSData = () => {
  const [data, setData] = useState<BMSData | null>(null)
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [alerts, setAlerts] = useState<BMSAlert[]>([])
  const lastFired = useRef<Record<string, number>>({})

  useEffect(() => {
    const initialData = generateMockData(null)
    setData(initialData)

    const interval = setInterval(() => {
      setData((prev) => {
        const d = generateMockData(prev)

        setHistory((h) => {
          const point: HistoryPoint = {
            time: new Date(d.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            voltage: d.voltage,
            temp: d.packTemp,
            ambientTemp: d.ambientTemp,
            current: d.current,
            soc: d.soc,
            range: d.remainingRangeKm,
            soh: d.soh,
            humidity: d.humidity,
            pressure: d.pressure,
            power: d.power,
          }
          const updated = [...h, point]
          if (updated.length > 3600) updated.shift()
          return updated
        })

        const newAlerts: BMSAlert[] = []
        const ts = Date.now()
        const DEBOUNCE_MS = 60_000
        const due = (code: string) => ts - (lastFired.current[code] ?? 0) > DEBOUNCE_MS
        const fire = (alert: BMSAlert) => { lastFired.current[alert.code] = ts; newAlerts.push(alert) }

        if (d.voltageAnomaly && due('VOL-01'))
          fire({ id: `volt-${ts}`, code: 'VOL-01', message: `${d.voltage < 300 ? 'Undervoltage' : 'Overvoltage'} Detected! (${d.voltage.toFixed(1)}V)`, severity: AlertSeverity.CRITICAL, timestamp: ts })
        if (d.currentAnomaly && due('CUR-01'))
          fire({ id: `curr-${ts}`, code: 'CUR-01', message: `Overcurrent Detected! (${d.current.toFixed(1)}A)`, severity: AlertSeverity.CRITICAL, timestamp: ts })
        if (d.thermalRunawayRisk && due('THM-01'))
          fire({ id: `therm-${ts}`, code: 'THM-01', message: 'Thermal Runaway Risk!', severity: AlertSeverity.CRITICAL, timestamp: ts })
        else if (d.packTemp > 45 && due('THM-02'))
          fire({ id: `therm2-${ts}`, code: 'THM-02', message: `Elevated Pack Temperature! (${d.packTemp.toFixed(1)}°C)`, severity: AlertSeverity.SEVERE, timestamp: ts })
        if (d.waterLeakageDetected && due('HUM-01'))
          fire({ id: `leak-${ts}`, code: 'HUM-01', message: 'Water Leak Detected!', severity: AlertSeverity.SEVERE, timestamp: ts })
        if (d.batterySwellDetected && due('PRS-01'))
          fire({ id: `swell-${ts}`, code: 'PRS-01', message: 'Battery Pack Swelling Detected!', severity: AlertSeverity.SEVERE, timestamp: ts })
        if (d.socDropDetected && due('SOC-02'))
          fire({ id: `socdrop-${ts}`, code: 'SOC-02', message: `Rapid SoC Drop! (${prev!.soc.toFixed(1)}% → ${d.soc.toFixed(1)}%)`, severity: AlertSeverity.SEVERE, timestamp: ts })
        if (d.capacityFadeDetected && due('CAP-01'))
          fire({ id: `cap-${ts}`, code: 'CAP-01', message: 'Abnormal Capacity Fade', severity: AlertSeverity.ATTENTION_REQUIRED, timestamp: ts })
        if (d.soc < 20 && due('SOC-01'))
          fire({ id: `soc-${ts}`, code: 'SOC-01', message: 'Low Battery Charge', severity: AlertSeverity.ATTENTION_REQUIRED, timestamp: ts })

        if (newAlerts.length > 0)
          setAlerts((a) => [...newAlerts, ...a].slice(0, 200))

        return d
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return { data, history, alerts }
}
