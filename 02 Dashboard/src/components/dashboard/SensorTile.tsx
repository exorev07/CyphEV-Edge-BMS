import { fonts, colors } from '../../lib/styles'
import type { LucideIcon } from 'lucide-react'

interface SensorTileProps {
  label: string
  value: string | number
  unit: string
  icon: LucideIcon
  alert?: boolean
}

export function SensorTile({ label, value, unit, icon: Icon, alert }: SensorTileProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '12px 14px', borderRadius: '12px',
      background: alert ? 'rgba(248,113,113,0.08)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${alert ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.06)'}`,
    }}>
      <Icon size={16} color={alert ? colors.status.critical : colors.text.muted} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
        <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted }}>
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span style={{ fontFamily: fonts.mono, fontSize: '15px', fontWeight: 600, color: alert ? colors.status.critical : colors.text.primary }}>
            {value}
          </span>
          <span style={{ fontFamily: fonts.mono, fontSize: '10px', color: colors.text.muted }}>
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}
