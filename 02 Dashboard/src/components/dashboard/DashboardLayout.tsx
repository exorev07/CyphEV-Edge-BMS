import { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useBMSData } from '../../services/mockBmsService'
import { AlertSeverity } from '../../types/bms'
import type { BMSData, HistoryPoint, BMSAlert, SystemStatus } from '../../types/bms'

interface BMSContextValue {
  data: BMSData | null
  history: HistoryPoint[]
  alerts: BMSAlert[]
}

const BMSContext = createContext<BMSContextValue>({ data: null, history: [], alerts: [] })

export const useBMS = () => useContext(BMSContext)

function deriveStatus(_data: BMSData, alerts: BMSAlert[]): SystemStatus {
  const cutoff = Date.now() - 30_000
  const recent = alerts.filter(a => a.timestamp >= cutoff)

  if (recent.some(a => a.severity === AlertSeverity.CRITICAL)) return 'CRITICAL'
  if (recent.some(a => a.severity === AlertSeverity.SEVERE)) return 'SEVERE'
  if (recent.some(a => a.severity === AlertSeverity.ATTENTION_REQUIRED)) return 'WARNING'

  return 'NOMINAL'
}

export function DashboardLayout() {
  const bms = useBMSData()
  const status = bms.data ? deriveStatus(bms.data, bms.alerts) : 'NOMINAL'

  return (
    <BMSContext.Provider value={bms}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#08080a' }}>
        <Sidebar status={status} />
        <main style={{ flex: 1, overflow: 'auto', padding: 'clamp(16px, 2vw, 28px) clamp(16px, 2.5vw, 32px)' }}>
          <Outlet />
        </main>
      </div>
    </BMSContext.Provider>
  )
}
