import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import type { HistoryPoint } from '../../../types/bms'

interface SocRangeChartProps {
  data: HistoryPoint[]
}

export function SocRangeChart({ data }: SocRangeChartProps) {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="soc" domain={[0, 100]}
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            yAxisId="range" orientation="right" domain={[0, 350]}
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
          <Line yAxisId="soc" type="monotone" dataKey="soc" stroke={chartColors.primary} strokeWidth={2} dot={false} name="SoC %" />
          <Line yAxisId="range" type="monotone" dataKey="range" stroke={chartColors.tertiary} strokeWidth={2} dot={false} name="Range km" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
