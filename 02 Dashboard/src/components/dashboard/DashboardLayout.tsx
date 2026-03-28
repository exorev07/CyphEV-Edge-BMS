import { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useBMSData } from '../../services/mockBmsService'
import { getSystemStatus } from '../../types/bms'
import type { BMSData, HistoryPoint, BMSAlert } from '../../types/bms'

interface BMSContextValue {
  data: BMSData | null
  history: HistoryPoint[]
  alerts: BMSAlert[]
}

const BMSContext = createContext<BMSContextValue>({ data: null, history: [], alerts: [] })

export const useBMS = () => useContext(BMSContext)

export function DashboardLayout() {
  const bms = useBMSData()
  const status = bms.data ? getSystemStatus(bms.data) : 'NOMINAL'

  return (
    <BMSContext.Provider value={bms}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#08080a' }}>
        <Sidebar status={status} />
        <main style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
          <Outlet />
        </main>
      </div>
    </BMSContext.Provider>
  )
}
