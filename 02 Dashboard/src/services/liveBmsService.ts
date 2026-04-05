import { useState, useEffect, useRef } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../lib/firebase'
import { AlertSeverity } from '../types/bms'
import type { BMSData, HistoryPoint, BMSAlert } from '../types/bms'

/**
 * Live BMS data hook — subscribes to Firebase RTDB `/bms/live`
 * where the ESP32 pushes telemetry + predictions in real-time.
 * Returns the same shape as useBMSData() so DashboardLayout can swap seamlessly.
 */
export const useLiveBMSData = () => {
  const [data, setData] = useState<BMSData | null>(null)
  const [history, setHistory] = useState<HistoryPoint[]>([])
  const [alerts, setAlerts] = useState<BMSAlert[]>([])
  const lastFired = useRef<Record<string, number>>({})
  const prevDataRef = useRef<BMSData | null>(null)

  useEffect(() => {
    const dbRef = ref(db, 'bms/live')

    const unsub = onValue(dbRef, (snapshot) => {
      const raw = snapshot.val()
      if (!raw) return

      const now = Date.now()
      const prev = prevDataRef.current

      const d: BMSData = {
        soc: raw.soc ?? 0,
        soh: raw.soh ?? 0,
        voltage: raw.voltage ?? 0,
        current: raw.current ?? 0,
        power: raw.power ?? 0,

        velocity: raw.velocity ?? 0,
        throttle: raw.throttle ?? 0,
        elevation: raw.elevation ?? 0,
        motorTorque: raw.motorTorque ?? 0,
        longitudinalAccel: raw.longitudinalAccel ?? 0,

        rulCycles: raw.rulCycles ?? 0,
        rulDays: raw.rulDays ?? 0,
        remainingRangeKm: raw.remainingRangeKm ?? 0,
        remainingTimeMinutes: raw.remainingTimeMinutes ?? 0,

        packTemp: raw.packTemp ?? 0,
        ambientTemp: raw.ambientTemp ?? 0,
        humidity: raw.humidity ?? 35,
        pressure: raw.pressure ?? 1013,

        airconPower: raw.airconPower ?? 0,
        heatExchangerTemp: raw.heatExchangerTemp ?? 30,
        coolantHeatercoreTemp: raw.coolantHeatercoreTemp ?? 55,
        coolantInletTemp: raw.coolantInletTemp ?? 32,

        fanStatus: raw.fanStatus ?? false,
        fanRpm: raw.fanRpm ?? 0,
        relayStatus: raw.relayStatus ?? 'CONNECTED',
        isCharging: raw.isCharging ?? false,

        capacityFadeDetected: raw.capacityFadeDetected ?? false,
        thermalRunawayRisk: raw.thermalRunawayRisk ?? false,
        voltageAnomaly: raw.voltageAnomaly ?? false,
        currentAnomaly: raw.currentAnomaly ?? false,
        batterySwellDetected: raw.batterySwellDetected ?? false,
        waterLeakageDetected: raw.waterLeakageDetected ?? false,
        socDropDetected: prev ? (prev.soc - (raw.soc ?? 0)) > 0.5 : false,

        timestamp: now,
      }

      setData(d)
      prevDataRef.current = d

      // History
      setHistory((h) => {
        const point: HistoryPoint = {
          time: new Date(now).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
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
        const base = h.length >= 300 ? h.slice(1) : h
        return [...base, point]
      })

      // Alert generation (same logic as mock service)
      const newAlerts: BMSAlert[] = []
      const ts = now
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
    })

    return () => unsub()
  }, [])

  const addAlert = (alert: BMSAlert) => {
    setAlerts((a) => [alert, ...a].slice(0, 200))
  }

  const updateAlertAction = (id: string, action: string) => {
    setAlerts((a) => a.map((alert) => alert.id === id ? { ...alert, action } : alert))
  }

  const updateAlertActionsForIds = (ids: string[], action: string) => {
    const idSet = new Set(ids)
    setAlerts((a) => a.map((alert) => idSet.has(alert.id) ? { ...alert, action } : alert))
  }

  return { data, history, alerts, addAlert, updateAlertAction, updateAlertActionsForIds }
}
