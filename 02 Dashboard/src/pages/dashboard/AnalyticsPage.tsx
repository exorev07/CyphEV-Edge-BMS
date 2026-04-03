import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceLine } from 'recharts'
import { BatteryCharging, Navigation, Heart, RotateCw, Thermometer, Zap, Activity, AlertTriangle, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react'
import { useBMS } from '../../components/dashboard/DashboardLayout'
import { fonts, colors, chartColors, glassCard } from '../../lib/styles'
import type { HistoryPoint } from '../../types/bms'

/* ── Calendar helpers (same as LogsPage) ── */
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (Date | null)[] = []
  for (let i = 0; i < offset; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d))
  return days
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function isInRange(d: Date, from: Date | null, to: Date | null) {
  if (!from || !to) return false
  return d >= from && d <= to
}

/* ── Time string → ms since midnight ── */
function timeStrToMs(t: string): number {
  const parts = t.split(':').map(Number)
  return ((parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0)) * 1000
}

/* ── Metric Definitions ── */
const METRICS = [
  { key: 'soc',     label: 'SoC',         fullLabel: 'State of Charge',          unit: '%',   icon: BatteryCharging, dataKey: 'soc',     domain: [0, 100] as [number, number],   liveKey: 'soc',              gradId: 'aGrad' },
  { key: 'range',   label: 'Range',        fullLabel: 'Estimated Range',          unit: 'km',  icon: Navigation,      dataKey: 'range',   domain: [0, 400] as [number, number],   liveKey: 'remainingRangeKm', gradId: 'aGrad' },
  { key: 'soh',     label: 'SoH',          fullLabel: 'State of Health',          unit: '%',   icon: Heart,           dataKey: 'soh',     domain: [60, 100] as [number, number],  liveKey: 'soh',              gradId: 'aGrad' },
  { key: 'temp',    label: 'Temperature',  fullLabel: 'Pack Temperature',         unit: '°C',  icon: Thermometer,     dataKey: 'temp',    domain: [10, 70] as [number, number],   liveKey: 'packTemp',         gradId: 'aGrad' },
  { key: 'voltage', label: 'Voltage',      fullLabel: 'Pack Voltage',             unit: 'V',   icon: Zap,             dataKey: 'voltage', domain: [(v: number) => Math.floor(v - 8),  (v: number) => Math.ceil(v + 8)]  as unknown as [number, number], liveKey: 'voltage',          gradId: 'aGrad' },
  { key: 'current', label: 'Current',      fullLabel: 'Pack Current',             unit: 'A',   icon: Activity,        dataKey: 'current', domain: [(v: number) => Math.floor(v - 15), (v: number) => Math.ceil(v + 15)] as unknown as [number, number], liveKey: 'current',          gradId: 'aGrad' },
  { key: 'alerts',  label: 'Alert Events', fullLabel: 'Alert Event Frequency',    unit: '',    icon: AlertTriangle,   dataKey: 'count',   domain: [0, 'auto'] as [number, string],liveKey: '',                 gradId: 'aGrad' },
] as const

type MetricKey = typeof METRICS[number]['key']

/* ── Alert bucketing ── */
function bucketAlerts(alerts: { timestamp: number }[], bucketCount: number, fromMs: number, toMs: number) {
  if (alerts.length === 0 || bucketCount < 1) return []
  const bucketSize = (toMs - fromMs) / bucketCount
  return Array.from({ length: bucketCount }, (_, i) => {
    const bStart = fromMs + i * bucketSize
    const bEnd = bStart + bucketSize
    return {
      time: new Date(bStart + bucketSize / 2).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }),
      count: alerts.filter(a => a.timestamp >= bStart && a.timestamp < bEnd).length,
    }
  })
}

/* ── X-axis ticks: 5 evenly-spaced (same as SocTimeChart) ── */
function calcTicks(pts: { time: string }[]): string[] {
  if (pts.length === 0) return []
  const n = pts.length - 1
  const seen = new Set<string>()
  return [0, 1, 2, 3, 4]
    .map(i => pts[Math.round(i * n / 4)])
    .filter(Boolean)
    .map(p => p.time)
    .filter(t => { if (seen.has(t)) return false; seen.add(t); return true })
}

/* ── Custom Recharts Tooltip ── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
      borderRadius: '8px', padding: '8px 12px',
      fontFamily: fonts.mono, fontSize: '11px',
    }}>
      <div style={{ color: colors.text.muted, marginBottom: '4px' }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: chartColors.secondary, fontWeight: 600 }}>
          {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
          {p.name?.includes('count') || p.name === 'Alerts' ? ' alerts' : ''}
        </div>
      ))}
    </div>
  )
}

/* ── Page ── */
export default function AnalyticsPage() {
  const { data, history, alerts } = useBMS()

  const [activeMetric, setActiveMetric] = useState<MetricKey>('soc')
  const [hoveredMetric, setHoveredMetric] = useState<MetricKey | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)

  // Date picker state (same as LogsPage)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [pickerMonth, setPickerMonth] = useState(() => new Date())
  const datePickerRef = useRef<HTMLDivElement>(null)

  // Time range picker state
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [timeFrom, setTimeFrom] = useState('')   // 'HH:MM'
  const [timeTo, setTimeTo] = useState('')
  const timePickerRef = useRef<HTMLDivElement>(null)

  // Close pickers on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) setShowDatePicker(false)
      if (timePickerRef.current && !timePickerRef.current.contains(e.target as Node)) setShowTimePicker(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleDayClick = (day: Date) => {
    if (!dateFrom || (dateFrom && dateTo)) {
      setDateFrom(day); setDateTo(null)
    } else {
      if (day < dateFrom) { setDateTo(dateFrom); setDateFrom(day) }
      else setDateTo(day)
      setShowDatePicker(false)
    }
  }
  const clearDates = (e: React.MouseEvent) => { e.stopPropagation(); setDateFrom(null); setDateTo(null) }
  const clearTimes = (e: React.MouseEvent) => { e.stopPropagation(); setTimeFrom(''); setTimeTo('') }
  const calDays = getCalendarDays(pickerMonth.getFullYear(), pickerMonth.getMonth())
  const effectiveTo = dateTo ?? (dateFrom && hoverDate && hoverDate > dateFrom ? hoverDate : null)

  const metric = METRICS.find(m => m.key === activeMetric)!

  // Filter history by selected date & time range
  const filteredHistory = useMemo((): HistoryPoint[] => {
    if (!dateFrom && !timeFrom && !timeTo) return history

    const fromMidnight = timeFrom ? timeStrToMs(timeFrom + ':00') : 0
    const toMidnight   = timeTo   ? timeStrToMs(timeTo   + ':00') : 86399999

    return history.filter(pt => {
      const ptMs = timeStrToMs(pt.time)
      // Date filter: since HistoryPoint.time is HH:MM:SS and all data is live (today),
      // date filter only removes data if a specific date range is set and today is not in it.
      if (dateFrom) {
        const today = new Date(); today.setHours(0,0,0,0)
        const from  = new Date(dateFrom); from.setHours(0,0,0,0)
        const to    = dateTo ? new Date(dateTo) : new Date(dateFrom); to.setHours(23,59,59,999)
        if (today < from || today > to) return false
      }
      // Time filter
      return ptMs >= fromMidnight && ptMs <= toMidnight
    })
  }, [history, dateFrom, dateTo, timeFrom, timeTo])

  // Alert data for the selected window
  const alertData = useMemo(() => {
    if (activeMetric !== 'alerts') return []
    let alertsInRange = alerts
    if (dateFrom || timeFrom || timeTo) {
      const todayDate = new Date(); todayDate.setHours(0, 0, 0, 0)
      const fromDate  = dateFrom ? new Date(dateFrom) : todayDate
      fromDate.setHours(0, 0, 0, 0)
      const toDate = dateTo ? new Date(dateTo) : (dateFrom ? new Date(dateFrom) : new Date())
      toDate.setHours(23, 59, 59, 999)

      alertsInRange = alerts.filter(a => {
        const d = new Date(a.timestamp)
        if (d < fromDate || d > toDate) return false
        if (timeFrom || timeTo) {
          const ms = (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) * 1000
          const lo = timeFrom ? timeStrToMs(timeFrom + ':00') : 0
          const hi = timeTo   ? timeStrToMs(timeTo   + ':00') : 86399999
          if (ms < lo || ms > hi) return false
        }
        return true
      })
    }
    const now = Date.now()
    const windowMs = 30 * 60 * 1000
    return bucketAlerts(alertsInRange, 20, now - windowMs, now)
  }, [alerts, activeMetric, dateFrom, dateTo, timeFrom, timeTo])

  const chartData = activeMetric === 'alerts' ? alertData : filteredHistory

  // Summary stats
  const stats = useMemo(() => {
    if (activeMetric === 'alerts') {
      const total = alertData.reduce((s, b) => s + b.count, 0)
      const max = Math.max(...alertData.map(b => b.count), 0)
      return { current: total.toString(), min: '0', max: max.toString(), avg: alertData.length ? (total / alertData.length).toFixed(1) : '0', unit: '' }
    }
    const key = metric.dataKey as keyof HistoryPoint
    const vals = filteredHistory.map(p => p[key] as number).filter(v => typeof v === 'number')
    if (vals.length === 0) return { current: '—', min: '—', max: '—', avg: '—', unit: metric.unit }
    return {
      current: vals[vals.length - 1]?.toFixed(1) ?? '—',
      min: Math.min(...vals).toFixed(1),
      max: Math.max(...vals).toFixed(1),
      avg: (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1),
      unit: metric.unit,
    }
  }, [filteredHistory, alertData, activeMetric, metric])

  const handleChartHover = useCallback((state: any) => {
    if (state?.activePayload?.length) setHoveredPoint(state.activePayload[0].payload)
  }, [])
  const handleChartLeave = useCallback(() => setHoveredPoint(null), [])

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: fonts.body, color: colors.text.muted }}>
      Initializing telemetry...
    </div>
  )

  const Icon = metric.icon
  const dateLabel = dateFrom
    ? dateTo
      ? `${dateFrom.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – ${dateTo.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`
      : dateFrom.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Date'
  const timeLabel = timeFrom || timeTo
    ? `${timeFrom || '--:--'} – ${timeTo || '--:--'}`
    : 'Time'
  const hasDateFilter  = !!dateFrom
  const hasTimeFilter  = !!(timeFrom || timeTo)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>

      {/* Header */}
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '24px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
          Analytics
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary, marginTop: '4px' }}>
          Explore telemetry trends across key battery metrics
        </p>
      </div>

      {/* ── Metric Selector ── */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ ...glassCard, padding: '6px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
        {METRICS.map(m => {
          const MIcon = m.icon
          const active  = activeMetric === m.key
          const hovered = hoveredMetric === m.key
          return (
            <button
              key={m.key}
              onClick={() => { setActiveMetric(m.key); setHoveredPoint(null) }}
              onMouseEnter={() => setHoveredMetric(m.key)}
              onMouseLeave={() => setHoveredMetric(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 11px', borderRadius: '8px', cursor: 'pointer',
                border: active
                  ? `1px solid rgba(177,141,221,0.45)`
                  : `1px solid ${hovered ? 'rgba(141,110,179,0.3)' : 'rgba(255,255,255,0.12)'}`,
                background: active
                  ? 'rgba(121,71,189,0.18)'
                  : hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                transition: 'all 0.2s',
              }}
            >
              <MIcon size={14} color={active ? colors.amethyst.light : colors.text.secondary} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{
                fontFamily: fonts.body, fontSize: '13px', fontWeight: active ? 600 : 400,
                color: active ? colors.amethyst.light : hovered ? colors.text.primary : colors.text.secondary,
                whiteSpace: 'nowrap',
              }}>
                {m.label}
              </span>
            </button>
          )
        })}
      </div>
      </div>

      {/* ── Date & Time Pickers ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

        {/* Date picker */}
        <div ref={datePickerRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => { setShowDatePicker(v => !v); setShowTimePicker(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: fonts.body, fontSize: '12px', fontWeight: 500,
              padding: '0 12px', height: '36px',
              borderRadius: '10px', cursor: 'pointer',
              background: hasDateFilter ? 'rgba(121,71,189,0.2)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${hasDateFilter ? 'rgba(121,71,189,0.4)' : 'rgba(255,255,255,0.12)'}`,
              color: hasDateFilter ? colors.amethyst.light : colors.text.secondary,
              transition: 'background 0.2s, border 0.2s, color 0.2s', whiteSpace: 'nowrap',
            }}
          >
            {dateLabel}
            {hasDateFilter && (
              <span onClick={clearDates} style={{ display: 'flex', alignItems: 'center', marginLeft: '2px', opacity: 0.7, cursor: 'pointer' }}>
                <X size={11} />
              </span>
            )}
          </button>

          {showDatePicker && (
            <div style={{
              position: 'absolute', top: '42px', left: 0, zIndex: 200,
              background: 'rgba(12,10,18,0.97)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(141,110,179,0.35)', borderRadius: '14px',
              padding: '16px', width: '272px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(121,71,189,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <button onClick={() => setPickerMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', color: colors.text.muted }}>
                  <ChevronLeft size={15} />
                </button>
                <span style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: colors.text.primary }}>
                  {MONTHS[pickerMonth.getMonth()]} {pickerMonth.getFullYear()}
                </span>
                <button onClick={() => setPickerMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', color: colors.text.muted }}>
                  <ChevronRight size={15} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '6px' }}>
                {WEEKDAYS.map(d => (
                  <div key={d} style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '10px', fontWeight: 600, color: colors.text.muted, padding: '4px 0' }}>
                    {d}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                {calDays.map((day, i) => {
                  if (!day) return <div key={`e-${i}`} />
                  const isFrom = dateFrom && isSameDay(day, dateFrom)
                  const isTo = dateTo && isSameDay(day, dateTo)
                  const inRange = isInRange(day, dateFrom, effectiveTo)
                  const isToday = isSameDay(day, new Date())
                  const isSelected = isFrom || isTo
                  return (
                    <div key={day.toISOString()} onClick={() => handleDayClick(day)}
                      onMouseEnter={() => !dateTo && dateFrom && setHoverDate(day)}
                      onMouseLeave={() => setHoverDate(null)}
                      style={{
                        textAlign: 'center', padding: '6px 0', borderRadius: '6px', cursor: 'pointer',
                        fontFamily: fonts.mono, fontSize: '11px', fontWeight: isSelected ? 700 : 400,
                        background: isSelected ? 'rgba(121,71,189,0.8)' : inRange ? 'rgba(121,71,189,0.15)' : 'transparent',
                        color: isSelected ? '#fff' : isToday ? colors.amethyst.light : colors.text.secondary,
                        border: isToday && !isSelected ? '1px solid rgba(121,71,189,0.3)' : '1px solid transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      {day.getDate()}
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted }}>
                  {dateFrom && !dateTo ? 'Select end date' : 'Select date range'}
                </span>
                {dateFrom && (
                  <button onClick={(e) => { clearDates(e); setShowDatePicker(false) }}
                    style={{ fontFamily: fonts.body, fontSize: '11px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: colors.text.muted, padding: '2px 6px', borderRadius: '4px' }}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Time range picker */}
        <div ref={timePickerRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => { setShowTimePicker(v => !v); setShowDatePicker(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: fonts.body, fontSize: '12px', fontWeight: 500,
              padding: '0 12px', height: '36px',
              borderRadius: '10px', cursor: 'pointer',
              background: hasTimeFilter ? 'rgba(121,71,189,0.2)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${hasTimeFilter ? 'rgba(121,71,189,0.4)' : 'rgba(255,255,255,0.12)'}`,
              color: hasTimeFilter ? colors.amethyst.light : colors.text.secondary,
              transition: 'background 0.2s, border 0.2s, color 0.2s', whiteSpace: 'nowrap',
            }}
          >
            <Clock size={12} />
            {timeLabel}
            {hasTimeFilter && (
              <span onClick={clearTimes} style={{ display: 'flex', alignItems: 'center', marginLeft: '2px', opacity: 0.7, cursor: 'pointer' }}>
                <X size={11} />
              </span>
            )}
          </button>

          {showTimePicker && (
            <div style={{
              position: 'absolute', top: '42px', left: 0, zIndex: 200,
              background: 'rgba(12,10,18,0.97)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(141,110,179,0.35)', borderRadius: '14px',
              padding: '18px 20px', width: '240px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(121,71,189,0.1)',
            }}>
              <div style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: colors.text.primary, marginBottom: '14px' }}>
                Time Range
              </div>
              {[
                { label: 'From', value: timeFrom, setter: setTimeFrom },
                { label: 'To',   value: timeTo,   setter: setTimeTo   },
              ].map(({ label, value, setter }) => (
                <div key={label} style={{ marginBottom: '12px' }}>
                  <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted, marginBottom: '5px' }}>{label}</div>
                  <input
                    type="time"
                    value={value}
                    onChange={e => setter(e.target.value)}
                    style={{
                      width: '100%', height: '36px', padding: '0 10px',
                      borderRadius: '8px', border: '1px solid rgba(141,110,179,0.25)',
                      background: 'rgba(255,255,255,0.04)',
                      fontFamily: fonts.mono, fontSize: '13px', color: colors.text.primary,
                      outline: 'none', colorScheme: 'dark',
                    }}
                  />
                </div>
              ))}
              <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted }}>
                  {filteredHistory.length} data points shown
                </span>
                {hasTimeFilter && (
                  <button onClick={(e) => { clearTimes(e); setShowTimePicker(false) }}
                    style={{ fontFamily: fonts.body, fontSize: '11px', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', color: colors.text.muted, padding: '2px 6px', borderRadius: '4px' }}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active filter summary */}
        {(hasDateFilter || hasTimeFilter) && (
          <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>
            Showing {activeMetric === 'alerts' ? alertData.reduce((s, b) => s + b.count, 0) + ' alerts' : filteredHistory.length + ' points'}
          </span>
        )}
      </div>

      {/* ── Main Chart Card ── */}
      <div style={{ ...glassCard, padding: '24px' }}>
        {/* Chart header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{
            fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
            color: colors.amethyst.light, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {metric.fullLabel}{metric.unit ? ` (${metric.unit})` : ''}
          </span>

        </div>

        {/* Chart */}
        <div style={{ width: '100%', height: 460 }}>
          <ResponsiveContainer>
            {activeMetric === 'alerts' ? (
              <BarChart data={chartData as any} margin={{ top: 8, right: 28, bottom: 24, left: -16 }}
                onMouseMove={handleChartHover} onMouseLeave={handleChartLeave}
              >
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColors.secondary} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={chartColors.secondary} stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time"
                  ticks={calcTicks(chartData)}
                  tick={{ fill: colors.text.secondary, fontSize: 10, fontFamily: fonts.mono, dy: 16 }}
                  axisLine={{ stroke: chartColors.grid }} tickLine={false}
                />
                <YAxis allowDecimals={false}
                  tick={{ fill: colors.text.secondary, fontSize: 10, fontFamily: fonts.mono }}
                  axisLine={false} tickLine={false}
                />
                <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="count" fill="url(#barGrad)" radius={[4, 4, 0, 0]} name="Alerts" />
              </BarChart>
            ) : (
              <AreaChart data={chartData as any} margin={{ top: 8, right: 28, bottom: 24, left: -16 }}
                onMouseMove={handleChartHover} onMouseLeave={handleChartLeave}
              >
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={chartColors.secondary} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time"
                  ticks={calcTicks(filteredHistory)}
                  tick={{ fill: colors.text.secondary, fontSize: 10, fontFamily: fonts.mono, dy: 16 }}
                  axisLine={{ stroke: chartColors.grid }} tickLine={false}
                />
                <YAxis domain={metric.domain as any}
                  tick={{ fill: colors.text.secondary, fontSize: 10, fontFamily: fonts.mono }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}${metric.unit === '°C' ? '°' : ''}`}
                />
                <RechartsTooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
                {stats.avg !== '—' && (
                  <ReferenceLine y={parseFloat(stats.avg)} stroke={chartColors.secondary} strokeDasharray="6 4" strokeOpacity={0.3} />
                )}
                <Area type="monotone" dataKey={metric.dataKey}
                  stroke={chartColors.secondary} strokeWidth={2}
                  fill="url(#aGrad)" dot={false}
                  name={`${metric.label} ${metric.unit}`}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          {[
            { label: activeMetric === 'alerts' ? 'Total' : 'Current', value: stats.current },
            { label: 'Min',     value: stats.min },
            { label: 'Max',     value: stats.max },
            { label: 'Average', value: stats.avg },
          ].map(s => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'baseline', gap: '6px',
              padding: '7px 16px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.07)',
            }}>
              <span style={{ fontFamily: fonts.mono, fontSize: '11px', fontWeight: 600, color: chartColors.secondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {s.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontFamily: fonts.mono, fontSize: '15px', fontWeight: 600, color: colors.text.primary }}>
                  {s.value}
                </span>
                {metric.unit && s.value !== '—' && (
                  <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.muted }}>{metric.unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hovered Point Detail */}
        {hoveredPoint && (
          <div style={{
            marginTop: '14px', padding: '10px 16px', borderRadius: '10px',
            background: 'rgba(177,141,221,0.06)',
            border: '1px solid rgba(177,141,221,0.18)',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <Icon size={14} color={colors.amethyst.light} />
            <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.muted }}>
              {hoveredPoint.time}
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', fontWeight: 600, color: chartColors.secondary }}>
              {typeof hoveredPoint[metric.dataKey] === 'number'
                ? hoveredPoint[metric.dataKey].toFixed(1)
                : hoveredPoint[metric.dataKey]}
              {' '}{metric.unit}
            </span>
            {activeMetric !== 'alerts' && hoveredPoint.soc !== undefined && activeMetric !== 'soc' && (
              <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.muted, marginLeft: 'auto' }}>
                SoC: {hoveredPoint.soc}% · Temp: {hoveredPoint.temp}°C · V: {hoveredPoint.voltage}V
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '4px' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.secondary }}>
          {chartData.length} data points · 2s sampling interval
        </span>
      </div>
    </div>
  )
}
