import { useState, useEffect, useRef } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import { useBMS } from '../DashboardLayout'
import type { HistoryPoint } from '../../../types/bms'

interface TempPoint { time: string; pack: number; ambient: number }

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

function buildSeedHistory(): TempPoint[] {
  const latest = toMinMark(new Date())
  let pack = 22 + Math.random() * 5
  let ambient = 38 + Math.random() * 4
  return Array.from({ length: TOTAL }, (_, i) => {
    const t = new Date(latest.getTime() - (TOTAL - 1 - i) * STEP_MS)
    if (i > 0) {
      pack = Math.max(15, Math.min(65, pack + (Math.random() - 0.5) * 0.3))
      ambient = Math.max(32, Math.min(48, ambient + (Math.random() - 0.5) * 0.2))
    }
    return { time: fmt(t), pack: parseFloat(pack.toFixed(1)), ambient: parseFloat(ambient.toFixed(1)) }
  })
}

export function TemperatureChart({ liveHistory }: { liveHistory?: HistoryPoint[] }) {
  const { data } = useBMS()
  const [points, setPoints] = useState<TempPoint[]>(buildSeedHistory)
  const lastTime = useRef(points[points.length - 1]?.time ?? '')

  // Demo mode: add real data points per minute
  useEffect(() => {
    if (liveHistory) return
    if (!data) return
    const timeStr = fmt(toMinMark(new Date(data.timestamp)))
    if (timeStr === lastTime.current) return
    lastTime.current = timeStr

    setPoints((prev) => {
      const next = [...prev, { time: timeStr, pack: data.packTemp, ambient: data.ambientTemp }]
      if (next.length > TOTAL) next.shift()
      return next
    })
  }, [data, liveHistory])

  const displayPoints = liveHistory
    ? liveHistory.map(h => ({ time: h.time, pack: h.temp, ambient: h.ambientTemp }))
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
    <div style={{ width: '100%', flex: 1, minHeight: 0, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayPoints} margin={{ top: 8, right: 28, bottom: 10, left: -16 }}>
            <defs>
              <linearGradient id="ambGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.amethyst.mid} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.amethyst.mid} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="packGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.2} />
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
              domain={[0, 80]}
              tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }}
              axisLine={false} tickLine={false}
              tickFormatter={(v) => `${v}°`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
                borderRadius: '8px', fontFamily: fonts.mono, fontSize: '11px',
              }}
              labelStyle={{ color: colors.text.muted }}
              formatter={((v: unknown, name: unknown) => [`${Number(v).toFixed(1)}°C`, name]) as never}
              cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
            />
            <Area type="monotone" dataKey="ambient" stroke={colors.amethyst.mid} strokeWidth={2} fill="url(#ambGrad)" dot={false} name="Ambient" />
            <Area type="monotone" dataKey="pack" stroke={chartColors.secondary} strokeWidth={2} fill="url(#packGrad)" dot={false} name="Pack" />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
