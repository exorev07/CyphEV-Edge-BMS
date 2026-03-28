import { fonts, colors } from '../../lib/styles'

interface RadialGaugeProps {
  value: number
  max: number
  label: string
  unit: string
  size?: number
  color?: string
  decimals?: number
}

export function RadialGauge({ value, max, label, unit, size = 120, color = colors.amethyst.mid, decimals = 0 }: RadialGaugeProps) {
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(Math.max(value / max, 0), 1)
  const strokeDashoffset = circumference * (1 - progress)
  const center = size / 2

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"
        />
        {/* Progress */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {/* Value text */}
        <text
          x={center} y={center - 4}
          textAnchor="middle" dominantBaseline="central"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${center}px ${center}px` }}
          fill={colors.text.primary}
          fontFamily={fonts.mono} fontSize={size * 0.2} fontWeight={600}
        >
          {value.toFixed(decimals)}
        </text>
        <text
          x={center} y={center + size * 0.14}
          textAnchor="middle" dominantBaseline="central"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${center}px ${center}px` }}
          fill={colors.text.muted}
          fontFamily={fonts.body} fontSize={size * 0.1}
        >
          {unit}
        </text>
      </svg>
      <span style={{
        fontFamily: fonts.body, fontSize: '12px', fontWeight: 500,
        color: colors.text.secondary, textAlign: 'center',
      }}>
        {label}
      </span>
    </div>
  )
}
