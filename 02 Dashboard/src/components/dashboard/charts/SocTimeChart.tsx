import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import type { HistoryPoint } from '../../../types/bms'

interface SocTimeChartProps {
  data: HistoryPoint[]
}

export function SocTimeChart({ data }: SocTimeChartProps) {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="socGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.25} />
              <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
            interval={Math.max(1, Math.floor((data.length - 1) / 4))}
            tickFormatter={(t: string) => t.slice(0, 5)}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
              borderRadius: '8px', fontFamily: fonts.mono, fontSize: '11px',
            }}
            labelStyle={{ color: colors.text.muted }}
            formatter={(v: number) => [`${v.toFixed(1)}%`, 'SoC']}
          />
          <Area type="monotone" dataKey="soc" stroke={chartColors.secondary} strokeWidth={2} fill="url(#socGrad)" dot={false} name="SoC %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
