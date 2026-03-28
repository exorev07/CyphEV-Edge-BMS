import { AlertTriangle, ShieldCheck, ShieldOff } from 'lucide-react'
import { fonts, colors } from '../../lib/styles'
import { AlertSeverity } from '../../types/bms'
import type { BMSAlert } from '../../types/bms'

interface MiniAlertPanelProps {
  alerts: BMSAlert[]
  relayStatus: 'CONNECTED' | 'DISCONNECTED'
}

export function MiniAlertPanel({ alerts, relayStatus }: MiniAlertPanelProps) {
  const recent = alerts.slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Relay Status */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 14px', borderRadius: '10px',
        background: relayStatus === 'CONNECTED' ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.1)',
        border: `1px solid ${relayStatus === 'CONNECTED' ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
      }}>
        {relayStatus === 'CONNECTED'
          ? <ShieldCheck size={16} color={colors.status.nominal} />
          : <ShieldOff size={16} color={colors.status.critical} />
        }
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: relayStatus === 'CONNECTED' ? colors.status.nominal : colors.status.critical }}>
            Relay {relayStatus}
          </span>
          <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.text.muted }}>
            Battery Kill Switch
          </span>
        </div>
      </div>

      {/* Recent Alerts */}
      {recent.length === 0 ? (
        <div style={{
          padding: '16px', textAlign: 'center',
          fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted,
        }}>
          No recent alerts
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {recent.map((alert) => (
            <div key={alert.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: '8px',
              padding: '8px 10px', borderRadius: '8px',
              background: alert.severity === AlertSeverity.CRITICAL ? 'rgba(248,113,113,0.06)' : 'rgba(251,191,36,0.06)',
              border: `1px solid ${alert.severity === AlertSeverity.CRITICAL ? 'rgba(248,113,113,0.15)' : 'rgba(251,191,36,0.15)'}`,
            }}>
              <AlertTriangle
                size={12}
                color={alert.severity === AlertSeverity.CRITICAL ? colors.status.critical : colors.status.warning}
                style={{ marginTop: '2px', flexShrink: 0 }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: '10px', fontWeight: 600,
                  color: alert.severity === AlertSeverity.CRITICAL ? colors.status.critical : colors.status.warning,
                }}>
                  {alert.code}
                </span>
                <span style={{
                  fontFamily: fonts.body, fontSize: '11px', color: colors.text.secondary,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {alert.message}
                </span>
                <span style={{ fontFamily: fonts.mono, fontSize: '9px', color: colors.text.muted }}>
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
