import type { CSSProperties, ReactNode } from 'react'
import { glassCard, fonts, colors } from '../../lib/styles'

interface GlassCardProps {
  title?: string
  children: ReactNode
  style?: CSSProperties
}

export function GlassCard({ title, children, style }: GlassCardProps) {
  return (
    <div style={{ ...glassCard, ...style }}>
      {title && (
        <h3 style={{
          fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
          color: colors.text.muted, letterSpacing: '0.06em',
          textTransform: 'uppercase', marginBottom: '16px',
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
