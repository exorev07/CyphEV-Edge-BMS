import { glassCard, fonts, colors } from '../../lib/styles'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  unit?: string
  subtext?: string
  icon: LucideIcon
  color?: string
}

export function StatCard({ label, value, unit, subtext, icon: Icon, color = colors.amethyst.light }: StatCardProps) {
  return (
    <div style={{
      ...glassCard,
      display: 'flex', flexDirection: 'column', gap: '12px',
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: fonts.body, fontSize: '13px', fontWeight: 500,
          color: colors.text.muted, textTransform: 'uppercase', letterSpacing: '0.05em',
        }}>
          {label}
        </span>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={16} color={colors.text.muted} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: '24px', fontWeight: 700,
          color: colors.text.primary, lineHeight: 1,
        }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}>
            {unit}
          </span>
        )}
      </div>
      {subtext && (
        <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted, textAlign: 'center' }}>
          {subtext}
        </span>
      )}
    </div>
  )
}
