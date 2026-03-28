import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import type { HistoryPoint } from '../../../types/bms'

interface RangeSocChartProps {
  data: HistoryPoint[]
}

export function RangeSocChart({ data }: RangeSocChartProps) {
  const points = data.map((d) => ({ soc: parseFloat(d.soc.toFixed(1)), range: parseFloat(d.range.toFixed(1)) }))

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="soc" type="number" domain={[0, 100]} name="SoC"
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
            tickFormatter={(v) => `${v}%`}
            label={{ value: 'SoC (%)', position: 'insideBottom', offset: -2, fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
          />
          <YAxis
            dataKey="range" type="number" name="Range"
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
              borderRadius: '8px', fontFamily: fonts.mono, fontSize: '11px',
            }}
            cursor={{ strokeDasharray: '3 3', stroke: chartColors.grid }}
            formatter={(v: number, name: string) => [name === 'Range' ? `${v} km` : `${v}%`, name]}
          />
          <Scatter data={points} fill={chartColors.tertiary} fillOpacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
