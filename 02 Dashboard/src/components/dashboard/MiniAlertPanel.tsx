import { AlertTriangle, ShieldCheck, ShieldOff, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fonts, colors } from '../../lib/styles'
import { AlertSeverity } from '../../types/bms'
import type { BMSAlert } from '../../types/bms'

interface MiniAlertPanelProps {
  alerts: BMSAlert[]
  relayStatus: 'CONNECTED' | 'DISCONNECTED'
}

export function MiniAlertPanel({ alerts, relayStatus }: MiniAlertPanelProps) {
  const navigate = useNavigate()
  const recent = alerts.slice(0, 3)
  const isConnected = relayStatus === 'CONNECTED'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
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
                display: 'flex', flexDirection: 'column', gap: '2px',
                padding: '10px 0',
                borderBottom: i < recent.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={13} color={alertColor} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600, color: alertColor, flexShrink: 0 }}>
                    {alert.code}
                  </span>
                  <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: 'auto', textAlign: 'right' }}>
                    {alert.message}
                  </span>
                </div>
                <span style={{ fontFamily: fonts.mono, fontSize: '10px', color: colors.text.muted, textAlign: 'right' }}>
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* View Logs button */}
      <button
        onClick={() => navigate('/dashboard/logs')}
        style={{
          marginTop: 'auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          width: '100%', padding: '8px 0', borderRadius: '8px', border: '1px solid rgba(141,110,179,0.3)',
          background: 'rgba(121,71,189,0.08)', cursor: 'pointer',
          fontFamily: fonts.mono, fontSize: '11px', fontWeight: 600,
          color: colors.amethyst.light, letterSpacing: '0.04em',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(121,71,189,0.18)'
          e.currentTarget.style.borderColor = 'rgba(141,110,179,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(121,71,189,0.08)'
          e.currentTarget.style.borderColor = 'rgba(141,110,179,0.3)'
        }}
      >
        View Logs <ArrowUpRight size={12} />
      </button>
    </div>
  )
}
