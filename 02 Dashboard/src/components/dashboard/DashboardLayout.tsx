import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useBMSData } from '../../services/mockBmsService'
import { AlertSeverity } from '../../types/bms'
import type { BMSData, HistoryPoint, BMSAlert, SystemStatus } from '../../types/bms'
import { auth } from '../../lib/firebase'
import { X } from 'lucide-react'

const DEMO_EMAIL = 'demo@cyphev.app'

type DisconnectCause = { code?: string; message: string; timestamp: number } | null

interface BMSContextValue {
  data: BMSData | null
  history: HistoryPoint[]
  alerts: BMSAlert[]
  addAlert: (alert: BMSAlert) => void
  updateAlertAction: (id: string, action: string) => void
  updateAlertActionsForIds: (ids: string[], action: string) => void
  relayOverride: boolean
  setRelayOverride: (v: boolean) => void
  disconnectCause: DisconnectCause
  setDisconnectCause: (v: DisconnectCause) => void
  relayLatchedRef: React.MutableRefObject<boolean>
}

const BMSContext = createContext<BMSContextValue>({
  data: null, history: [], alerts: [],
  addAlert: () => {}, updateAlertAction: () => {}, updateAlertActionsForIds: () => {},
  relayOverride: true, setRelayOverride: () => {},
  disconnectCause: null, setDisconnectCause: () => {},
  relayLatchedRef: { current: false },
})

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
  const [relayOverride, setRelayOverride] = useState(true)
  const [disconnectCause, setDisconnectCause] = useState<DisconnectCause>(null)
  const relayLatchedRef = useRef(false)
  const [showDemoWelcome, setShowDemoWelcome] = useState(false)
  const [demoCountdown, setDemoCountdown] = useState(10)
  const [hoveredDemoClose, setHoveredDemoClose] = useState(false)

  useEffect(() => {
    const isDemo = auth.currentUser?.email === DEMO_EMAIL
    if (!isDemo) return
    const t = setTimeout(() => setShowDemoWelcome(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!showDemoWelcome) return
    setDemoCountdown(30)
    const interval = setInterval(() => {
      setDemoCountdown(v => {
        if (v <= 1) { setShowDemoWelcome(false); clearInterval(interval); return 0 }
        return v - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [showDemoWelcome])

  const cutoff = Date.now() - 30_000
  const criticalAlertTriggered = bms.alerts.some(
    a => a.timestamp >= cutoff && a.severity === 'CRITICAL' && !a.code.startsWith('RLY')
  )

  useEffect(() => {
    if (!criticalAlertTriggered || relayLatchedRef.current) return
    relayLatchedRef.current = true
    const now = Date.now() - 30_000
    const causes = bms.alerts.filter(
      a => a.timestamp >= now && a.severity === 'CRITICAL' && !a.code.startsWith('RLY')
    )
    const primary = causes.sort((a, b) => b.timestamp - a.timestamp)[0]
    setRelayOverride(false)
    if (primary) {
      setDisconnectCause({ code: primary.code, message: primary.message, timestamp: primary.timestamp })
      bms.updateAlertActionsForIds(causes.map(c => c.id), 'Relay Disconnected')
    }
  }, [criticalAlertTriggered])

  const status = bms.data ? deriveStatus(bms.data, bms.alerts) : 'NOMINAL'

  return (
    <BMSContext.Provider value={{ ...bms, relayOverride, setRelayOverride, disconnectCause, setDisconnectCause, relayLatchedRef }}>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#08080a' }}>
        <Sidebar status={status} />
        <main style={{ flex: 1, overflow: 'auto', padding: 'clamp(16px, 2vw, 28px) clamp(16px, 2.5vw, 32px)' }}>
          <Outlet />
        </main>
      </div>

      {/* Demo welcome modal */}
      {showDemoWelcome && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}>
          <div style={{ width: '460px', borderRadius: '16px', border: '1px solid rgba(141,110,179,0.58)', background: 'rgba(12,10,18,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)', padding: '32px 32px 28px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.03em', margin: '0 0 4px' }}>
                  Welcome aboard,
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  You're in demo mode
                </p>
              </div>
              <button
                onClick={() => setShowDemoWelcome(false)}
                onMouseEnter={() => setHoveredDemoClose(true)}
                onMouseLeave={() => setHoveredDemoClose(false)}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: hoveredDemoClose ? '#ffffff' : '#6b7280', transition: 'color 0.2s', flexShrink: 0 }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#9ca3af', lineHeight: 1.4, textAlign: 'justify', margin: '0 0 16px' }}>
              You're exploring CyphEV's dashboard with a demo account - no real battery pack, no real EV, just the whole dashboard experience running on simulated data. Poke around freely. Check the alerts, inspect the relay, dig through the logs. Nothing here will catch fire. We promise.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#b18ddd', lineHeight: 1.4, margin: '0 0 24px' }}>
              When you're ready to connect your device, contact our team and sign up for a full account and we'll take it from there. See ya!
            </p>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', fontStyle: "italic", justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#6b7280' }}>
                closes in {demoCountdown}s
              </span>
              <button
                onClick={() => setShowDemoWelcome(false)}
                onMouseEnter={() => setHoveredDemoClose(true)}
                onMouseLeave={() => setHoveredDemoClose(false)}
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: hoveredDemoClose ? '#ffffff' : '#08080a', background: hoveredDemoClose ? '#b18ddd' : '#ffffff', border: 'none', borderRadius: '12px', padding: '7px 20px', cursor: 'pointer', transition: 'background 0.2s, color 0.2s, box-shadow 0.2s', boxShadow: hoveredDemoClose ? '0 0 20px rgba(121,71,189,0.5)' : 'none' }}
              >
                Got it
              </button>
            </div>

          </div>
        </div>
      )}
    </BMSContext.Provider>
  )
}
