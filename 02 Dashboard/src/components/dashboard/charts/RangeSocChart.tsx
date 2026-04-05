import { useState, useEffect } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import type { HistoryPoint } from '../../../types/bms'

interface RangePoint { time: string; range: number }

const TOTAL = 61
const STEP_MS = 60 * 1000


function toMinMark(d: Date): Date {
  const r = new Date(d)
  r.setSeconds(0, 0)
  return r
}

function fmt(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function buildHistory(): RangePoint[] {
  const latest = toMinMark(new Date())
  let range = 270 + Math.random() * 10
  return Array.from({ length: TOTAL }, (_, i) => {
    const t = new Date(latest.getTime() - (TOTAL - 1 - i) * STEP_MS)
    if (i > 0) range = Math.max(0, Math.min(350, range + (Math.random() - 0.62) * 1.5))
    return { time: fmt(t), range: parseFloat(range.toFixed(1)) }
  })
}

export function RangeSocChart({ liveHistory }: { liveHistory?: HistoryPoint[] }) {
  const [points, setPoints] = useState<RangePoint[]>(buildHistory)

  // Demo mode: self-updating random data
  useEffect(() => {
    if (liveHistory) return
    const timer = setInterval(() => {
      const markTime = fmt(toMinMark(new Date()))
      setPoints((prev) => {
        if (prev[prev.length - 1].time === markTime) return prev
        const lastRange = prev[prev.length - 1].range
        const newRange = parseFloat(Math.max(0, Math.min(350, lastRange + (Math.random() - 0.62) * 1.5)).toFixed(1))
        return [...prev.slice(1), { time: markTime, range: newRange }]
      })
    }, 15_000)
    return () => clearInterval(timer)
  }, [liveHistory])

  const displayPoints = liveHistory
    ? liveHistory.map(h => ({ time: h.time, range: h.range }))
    : points

  const xTicks = (() => {
    const n = displayPoints.length - 1
    if (n < 1) return displayPoints.map(p => p.time)
    const indices = [0, Math.round(n/4), Math.round(n/2), Math.round(3*n/4), n]
    const seen = new Set<string>()
    return indices.map(i => displayPoints[i]?.time).filter((t): t is string => {
      if (!t || seen.has(t)) return false
      seen.add(t)
      return true
    })
  })()

  return (
    <div style={{ width: '100%', height: 'clamp(180px, 20vh, 280px)' }}>
      <ResponsiveContainer>
        <AreaChart data={displayPoints} margin={{ top: 8, right: 28, bottom: 10, left: -16 }}>
          <defs>
            <linearGradient id="rangeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.25} />
              <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            ticks={xTicks}
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono, dy: 8 }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
          />
          <YAxis
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
              borderRadius: '8px', fontFamily: fonts.mono, fontSize: '11px',
            }}
            labelStyle={{ color: colors.text.muted }}
            formatter={(v: number) => [`${v.toFixed(1)} km`, 'Range']}
            cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
          />
          <Area type="monotone" dataKey="range" stroke={chartColors.secondary} strokeWidth={2} fill="url(#rangeGrad)" dot={false} name="Range" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
