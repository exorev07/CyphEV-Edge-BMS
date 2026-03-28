import { useState, useEffect, useRef } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { chartColors, fonts, colors } from '../../../lib/styles'
import { useBMS } from '../DashboardLayout'

interface TempPoint { time: string; pack: number; ambient: number }

const MAX_POINTS = 60
const LABEL_EVERY = 15

function fmt(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function buildSeedHistory(packTemp: number, ambientTemp: number): TempPoint[] {
  const now = Date.now()
  let pack = packTemp
  let ambient = ambientTemp
  const pts: TempPoint[] = []
  for (let i = MAX_POINTS - 1; i >= 0; i--) {
    const t = new Date(now - i * 2000)
    pack = Math.max(25, Math.min(40, pack + (Math.random() - 0.5) * 0.3))
    ambient = Math.max(50, Math.min(60, ambient + (Math.random() - 0.5) * 0.4))
    pts.push({ time: fmt(t), pack: parseFloat(pack.toFixed(1)), ambient: parseFloat(ambient.toFixed(1)) })
  }
  return pts
}

export function TemperatureChart() {
  const { data } = useBMS()
  const [points, setPoints] = useState<TempPoint[]>([])
  const seeded = useRef(false)

  useEffect(() => {
    if (!data) return
    if (!seeded.current) {
      seeded.current = true
      setPoints(buildSeedHistory(data.packTemp, data.ambientTemp))
      return
    }
    const timeStr = fmt(new Date(data.timestamp))
    setPoints((prev) => {
      const next = [...prev, { time: timeStr, pack: data.packTemp, ambient: data.ambientTemp }]
      if (next.length > MAX_POINTS) next.shift()
      return next
    })
  }, [data])

  if (points.length === 0) return null

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '4px' }}>
      <div style={{ width: '100%', height: 270 }}>
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
      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: colors.amethyst.mid }} />
          <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.muted }}>Ambient</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: chartColors.secondary }} />
          <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.muted }}>Pack</span>
        </div>
      </div>
    </div>
  )
}
