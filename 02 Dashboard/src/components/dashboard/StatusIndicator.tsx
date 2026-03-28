import { colors } from '../../lib/styles'
import type { SystemStatus } from '../../types/bms'

const statusColors: Record<SystemStatus, string> = {
  NOMINAL: colors.status.nominal,
  WARNING: colors.status.warning,
  CRITICAL: colors.status.critical,
}

export function StatusIndicator({ status }: { status: SystemStatus }) {
  const color = statusColors[status]
  return (
    <div style={{ position: 'relative', width: '10px', height: '10px' }}>
      <div style={{
        width: '10px', height: '10px', borderRadius: '50%', background: color,
        boxShadow: `0 0 8px ${color}`,
      }} />
      {status === 'CRITICAL' && (
        <style>{`
          @keyframes statusPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>
      )}
      {status === 'CRITICAL' && (
        <div style={{
          position: 'absolute', top: '-3px', left: '-3px',
          width: '16px', height: '16px', borderRadius: '50%',
          border: `2px solid ${color}`, opacity: 0.5,
          animation: 'statusPulse 1.5s ease-in-out infinite',
        }} />
      )}
    </div>
  )
}
