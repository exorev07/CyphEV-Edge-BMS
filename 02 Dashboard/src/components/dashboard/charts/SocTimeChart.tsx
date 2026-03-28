import { useState, useEffect } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'

interface SocPoint { time: string; soc: number }

// 61 points at 1-min intervals = 1 hour of per-minute data
// x-axis labels only at every 15th point (indices 0, 15, 30, 45, 60)
const TOTAL = 61
const STEP_MS = 60 * 1000  // 1 minute per point
const LABEL_EVERY = 15

function toMinMark(d: Date): Date {
  const r = new Date(d)
  r.setSeconds(0, 0)
  return r
}

function fmt(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function buildHistory(): SocPoint[] {
  const latest = toMinMark(new Date())
  let soc = 72 + Math.random() * 10
  return Array.from({ length: TOTAL }, (_, i) => {
    const t = new Date(latest.getTime() - (TOTAL - 1 - i) * STEP_MS)
    if (i > 0) soc = Math.max(5, Math.min(100, soc + (Math.random() - 0.62) * 0.4))
    return { time: fmt(t), soc: parseFloat(soc.toFixed(1)) }
  })
}

export function SocTimeChart() {
  const [points, setPoints] = useState<SocPoint[]>(buildHistory)

  useEffect(() => {
    const timer = setInterval(() => {
      const markTime = fmt(toMinMark(new Date()))
      setPoints((prev) => {
        if (prev[prev.length - 1].time === markTime) return prev
        const lastSoc = prev[prev.length - 1].soc
        const newSoc = parseFloat(Math.max(5, Math.min(100, lastSoc + (Math.random() - 0.62) * 0.4)).toFixed(1))
        return [...prev.slice(1), { time: markTime, soc: newSoc }]
      })
    }, 15_000) // check every 15s
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={points} margin={{ top: 8, right: 28, bottom: 10, left: -16 }}>
          <defs>
            <linearGradient id="socGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.25} />
              <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            ticks={points.filter((_, i) => i % LABEL_EVERY === 0).map(p => p.time)}
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono, dy: 8 }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
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
            cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
          />
          <Area type="monotone" dataKey="soc" stroke={chartColors.secondary} strokeWidth={2} fill="url(#socGrad)" dot={false} name="SoC %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
