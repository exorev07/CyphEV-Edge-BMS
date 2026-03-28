import { useState, useEffect } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'

interface TempPoint { time: string; pack: number; ambient: number }

const TOTAL = 61
const STEP_MS = 60 * 1000
const LABEL_EVERY = 15

function toMinMark(d: Date): Date {
  const r = new Date(d)
  r.setSeconds(0, 0)
  return r
}

function fmt(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function buildHistory(): TempPoint[] {
  const latest = toMinMark(new Date())
  let ambient = 36 + Math.random() * 4
  let pack = 28 + Math.random() * 4
  return Array.from({ length: TOTAL }, (_, i) => {
    const t = new Date(latest.getTime() - (TOTAL - 1 - i) * STEP_MS)
    if (i > 0) {
      ambient = Math.max(28, Math.min(45, ambient + (Math.random() - 0.5) * 0.4))
      pack = Math.max(20, Math.min(40, pack + (Math.random() - 0.5) * 0.3))
    }
    return { time: fmt(t), ambient: parseFloat(ambient.toFixed(1)), pack: parseFloat(pack.toFixed(1)) }
  })
}

export function TemperatureChart() {
  const [points, setPoints] = useState<TempPoint[]>(buildHistory)

  useEffect(() => {
    const timer = setInterval(() => {
      const markTime = fmt(toMinMark(new Date()))
      setPoints((prev) => {
        if (prev[prev.length - 1].time === markTime) return prev
        const last = prev[prev.length - 1]
        const newAmbient = parseFloat(Math.max(28, Math.min(45, last.ambient + (Math.random() - 0.5) * 0.4)).toFixed(1))
        const newPack = parseFloat(Math.max(20, Math.min(40, last.pack + (Math.random() - 0.5) * 0.3)).toFixed(1))
        return [...prev.slice(1), { time: markTime, ambient: newAmbient, pack: newPack }]
      })
    }, 15_000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={points} margin={{ top: 8, right: 28, bottom: 10, left: -16 }}>
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
            ticks={points.filter((_, i) => i % LABEL_EVERY === 0).map(p => p.time)}
            tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono, dy: 8 }}
            axisLine={{ stroke: chartColors.grid }} tickLine={false}
          />
          <YAxis
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
            formatter={(v: number, name: string) => [`${v.toFixed(1)}°C`, name]}
            cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }}
          />
          <Area type="monotone" dataKey="ambient" stroke={colors.amethyst.mid} strokeWidth={2} fill="url(#ambGrad)" dot={false} name="Ambient" />
          <Area type="monotone" dataKey="pack" stroke={chartColors.secondary} strokeWidth={2} fill="url(#packGrad)" dot={false} name="Pack" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
