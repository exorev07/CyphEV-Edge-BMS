import { AlertTriangle, ShieldCheck, ShieldOff } from 'lucide-react'
import { fonts, colors } from '../../lib/styles'
import { AlertSeverity } from '../../types/bms'
import type { BMSAlert } from '../../types/bms'

interface MiniAlertPanelProps {
  alerts: BMSAlert[]
  relayStatus: 'CONNECTED' | 'DISCONNECTED'
}

export function MiniAlertPanel({ alerts, relayStatus }: MiniAlertPanelProps) {
  const recent = alerts.slice(0, 4)
  const isConnected = relayStatus === 'CONNECTED'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
          color: colors.text.muted, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Recent Alerts
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 10px', borderRadius: '20px',
          background: isConnected ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)',
          border: `1px solid ${isConnected ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.25)'}`,
        }}>
          {isConnected
            ? <ShieldCheck size={12} color={colors.status.nominal} />
            : <ShieldOff size={12} color={colors.status.critical} />
          }
          <span style={{
            fontFamily: fonts.body, fontSize: '11px', fontWeight: 600,
            color: isConnected ? colors.status.nominal : colors.status.critical,
          }}>
            Relay {relayStatus}
          </span>
        </div>
      </div>

      {/* Alert list */}
      {recent.length === 0 ? (
        <div style={{
          padding: '24px 0', textAlign: 'center',
          fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted,
        }}>
          No recent alerts
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {recent.map((alert, i) => {
            const isCritical = alert.severity === AlertSeverity.CRITICAL
            const alertColor = isCritical ? colors.status.critical : colors.status.warning
            return (
              <div key={alert.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '10px 0',
                borderBottom: i < recent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <AlertTriangle size={13} color={alertColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600, color: alertColor, flexShrink: 0 }}>
                      {alert.code}
                    </span>
                    <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {alert.message}
                    </span>
                  </div>
                  <span style={{ fontFamily: fonts.mono, fontSize: '10px', color: colors.text.muted }}>
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
