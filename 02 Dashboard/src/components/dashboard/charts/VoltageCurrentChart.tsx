import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import type { HistoryPoint } from '../../../types/bms'

interface VoltageCurrentChartProps {
  data: HistoryPoint[]
  mode: 'voltage' | 'current'
}

export function VoltageCurrentChart({ data, mode }: VoltageCurrentChartProps) {
  const config = mode === 'voltage'
    ? { key: 'voltage' as const, color: chartColors.secondary, label: 'Voltage (V)', domain: [340, 460] as [number, number] }
    : { key: 'current' as const, color: chartColors.primary, label: 'Current (A)', domain: [-10, 60] as [number, number] }

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={config.domain}
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={false} tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
              borderRadius: '8px', fontFamily: fonts.mono, fontSize: '11px',
            }}
            labelStyle={{ color: colors.text.muted }}
          />
          <Line type="monotone" dataKey={config.key} stroke={config.color} strokeWidth={2} dot={false} name={config.label} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
