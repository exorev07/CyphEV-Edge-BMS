import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import type { HistoryPoint } from '../../../types/bms'

interface TemperatureChartProps {
  data: HistoryPoint[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.warning} stopOpacity={0.2} />
              <stop offset="95%" stopColor={chartColors.warning} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="ambGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.15} />
              <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
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
          <Area type="monotone" dataKey="temp" stroke={chartColors.warning} strokeWidth={2} fill="url(#tempGrad)" name="Pack °C" />
          <Area type="monotone" dataKey="ambientTemp" stroke={chartColors.secondary} strokeWidth={2} fill="url(#ambGrad)" name="Ambient °C" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
