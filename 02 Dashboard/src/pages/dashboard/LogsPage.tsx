import { useState, useRef, useEffect } from 'react'
import { AlertTriangle, Download, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useBMS } from '../../components/dashboard/DashboardLayout'
import { GlassCard } from '../../components/dashboard/GlassCard'
import { fonts, colors } from '../../lib/styles'
import { AlertSeverity } from '../../types/bms'

type SeverityFilter = 'ALL' | 'CRITICAL' | 'SEVERE' | 'ATTENTION_REQUIRED' | 'RELAY'

const PAGE_SIZE = 15

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  // Convert Sunday=0 to Monday=0
  const offset = (firstDay === 0 ? 6 : firstDay - 1)
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

export default function LogsPage() {
  const { alerts } = useBMS()
  const [filter, setFilter] = useState<SeverityFilter>('ALL')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [pickerMonth, setPickerMonth] = useState(() => new Date())
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowDatePicker(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleDayClick = (day: Date) => {
    if (!dateFrom || (dateFrom && dateTo)) {
      // Start new selection
      setDateFrom(day)
      setDateTo(null)
    } else {
      // Set end date
      if (day < dateFrom) {
        setDateTo(dateFrom)
        setDateFrom(day)
      } else {
        setDateTo(day)
      }
      setShowDatePicker(false)
    }
  }

  const clearDates = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDateFrom(null)
    setDateTo(null)
  }

  const prevMonth = () => setPickerMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const nextMonth = () => setPickerMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const calDays = getCalendarDays(pickerMonth.getFullYear(), pickerMonth.getMonth())

  // Effective range for hover preview — supports hovering both before and after dateFrom
  const hoverEffectiveFrom = (dateFrom && !dateTo && hoverDate && hoverDate < dateFrom) ? hoverDate : dateFrom
  const effectiveTo = dateTo ?? (dateFrom && hoverDate ? (hoverDate >= dateFrom ? hoverDate : dateFrom) : null)

  const filtered = alerts.filter((a) => {
    if (filter === 'RELAY' && !(a.code.startsWith('RLY') || (!!a.action && a.action.toLowerCase().includes('relay')))) return false
    if (filter !== 'ALL' && filter !== 'RELAY' && a.severity !== filter) return false
    const d = new Date(a.timestamp)
    const q = search.toLowerCase()
    if (search) {
      const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toLowerCase()
      const timeStr = d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }).toLowerCase()
      if (!a.code.toLowerCase().includes(q) && !a.message.toLowerCase().includes(q) && !(a.action ?? '').toLowerCase().includes(q) && !dateStr.includes(q) && !timeStr.includes(q)) return false
    }
    if (dateFrom) {
      const from = new Date(dateFrom); from.setHours(0, 0, 0, 0)
      if (d < from) return false
      if (dateTo) {
        const to = new Date(dateTo); to.setHours(23, 59, 59, 999)
        if (d > to) return false
      } else {
        const to = new Date(dateFrom); to.setHours(23, 59, 59, 999)
        if (d > to) return false
      }
    }
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)
  const paginated = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE)

  const exportCSV = () => {
    const header = 'Date,Time,Code,Severity,Message,Action Taken\n'
    const rows = filtered.map((a) => {
      const d = new Date(a.timestamp)
      return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},${d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })},${a.code},${a.severity},"${a.message}","${a.action ?? ''}"`
    }).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = 'cyphev-logs.csv'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const filterBtns: { label: string; value: SeverityFilter }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Critical', value: 'CRITICAL' },
    { label: 'Severe', value: 'SEVERE' },
    { label: 'Attention', value: 'ATTENTION_REQUIRED' },
    { label: 'Relay', value: 'RELAY' },
  ]

  const dateLabel = dateFrom
    ? dateTo
      ? `${dateFrom.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} – ${dateTo.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`
      : dateFrom.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Date'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1800px', margin: '0 auto', width: '100%' }}>
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '24px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
          Event Logs
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary, marginTop: '4px' }}>
          {alerts.length} total events captured
        </p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* 1: Date picker */}
        <div ref={pickerRef} style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setShowDatePicker(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontFamily: fonts.body, fontSize: '12px', fontWeight: 500,
                padding: '0 12px', height: '40px', boxSizing: 'border-box',
                borderRadius: '10px', cursor: 'pointer',
                background: dateFrom ? 'rgba(121,71,189,0.2)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${dateFrom ? 'rgba(121,71,189,0.4)' : 'rgba(255,255,255,0.12)'}`,
                color: dateFrom ? colors.amethyst.light : colors.text.secondary,
                transition: 'background 0.2s, border 0.2s, color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {dateLabel}
              {dateFrom && (
                <span
                  onClick={clearDates}
                  style={{ display: 'flex', alignItems: 'center', marginLeft: '2px', opacity: 0.7, cursor: 'pointer' }}
                >
                  <X size={11} />
                </span>
              )}
            </button>

            {/* Calendar popup */}
            {showDatePicker && (
              <div style={{
                position: 'absolute', top: '46px', left: 0, zIndex: 200,
                background: 'rgba(12,10,18,0.97)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(141,110,179,0.35)',
                borderRadius: '14px',
                padding: '16px',
                width: '272px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(121,71,189,0.1)',
              }}>
                {/* Month navigation */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', color: colors.text.muted }}>
                    <ChevronLeft size={15} />
                  </button>
                  <span style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: colors.text.primary }}>
                    {MONTHS[pickerMonth.getMonth()]} {pickerMonth.getFullYear()}
                  </span>
                  <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', color: colors.text.muted }}>
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* Weekday headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '6px' }}>
                  {WEEKDAYS.map(d => (
                    <div key={d} style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '10px', fontWeight: 600, color: colors.text.muted, padding: '4px 0' }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                  {calDays.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} />
                    const isFrom = dateFrom && isSameDay(day, dateFrom)
                    const isTo = dateTo && isSameDay(day, dateTo)
                    const inRange = isInRange(day, hoverEffectiveFrom, effectiveTo)
                    const isToday = isSameDay(day, new Date())
                    const isSelected = isFrom || isTo

                    return (
                      <div
                        key={day.toISOString()}
                        onClick={() => handleDayClick(day)}
                        onMouseEnter={() => !dateTo && dateFrom && setHoverDate(day)}
                        onMouseLeave={() => setHoverDate(null)}
                        style={{
                          textAlign: 'center',
                          padding: '6px 0',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: fonts.mono,
                          fontSize: '11px',
                          fontWeight: isSelected ? 700 : 400,
                          background: isSelected
                            ? 'rgba(121,71,189,0.8)'
                            : inRange
                            ? 'rgba(121,71,189,0.15)'
                            : 'transparent',
                          color: isSelected
                            ? '#fff'
                            : isToday
                            ? colors.amethyst.light
                            : colors.text.secondary,
                          border: isToday && !isSelected ? '1px solid rgba(121,71,189,0.3)' : '1px solid transparent',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                      >
                        {day.getDate()}
                      </div>
                    )
                  })}
                </div>

                {/* Footer */}
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted }}>
                    {dateFrom && !dateTo ? 'Select end date' : dateFrom && dateTo ? `${filtered.length} results` : 'Select start date'}
                  </span>
                  {dateFrom && (
                    <button
                      onClick={(e) => { clearDates(e); setShowDatePicker(false) }}
                      style={{
                        fontFamily: fonts.body, fontSize: '11px', fontWeight: 500,
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: colors.text.muted, padding: '2px 6px', borderRadius: '4px',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
        </div>

        {/* 2: Severity filter */}
        <div style={{ display: 'flex', gap: '0px', padding: '4px', borderRadius: '10px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', height: '40px', alignItems: 'center', flexShrink: 0 }}>
          {filterBtns.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              style={{
                fontFamily: fonts.body, fontSize: '12px', fontWeight: 500,
                padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: filter === btn.value ? 'rgba(121,71,189,0.3)' : 'transparent',
                color: filter === btn.value ? colors.amethyst.light : colors.text.secondary,
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* 3: Search */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search by error code, message, action taken, or date/time"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, fontFamily: fonts.body, fontSize: '13px',
              padding: '0 12px', height: '40px', boxSizing: 'border-box',
              borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.07)', color: colors.text.primary,
              outline: 'none',
            }}
          />
        </div>

        {/* 4: Export CSV */}
        <button
          onClick={exportCSV}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
            fontFamily: fonts.body, fontSize: '12px', fontWeight: 500,
            padding: '0 16px', height: '40px', boxSizing: 'border-box', borderRadius: '10px', cursor: 'pointer',
            background: colors.amethyst.light, color: '#1a0a2e',
            border: '1px solid rgba(121,71,189,0.6)',
            transition: 'background 0.2s',
          }}
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <GlassCard style={{ padding: 0, overflow: 'hidden', height: '682px', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '100px 110px 100px 160px 1fr 220px', columnGap: '16px',
          padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['Date', 'Time', 'Code', 'Severity', 'Message', 'Action Taken'].map((h) => (
            <span key={h} style={{
              fontFamily: fonts.body, fontSize: '11px', fontWeight: 600,
              color: colors.amethyst.light, textTransform: 'uppercase', letterSpacing: '0.06em',
              textAlign: h === 'Action Taken' ? 'center' : 'left',
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div style={{ flex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted }}>
              No events match the current filter
            </div>
          ) : paginated.map((alert) => {
              const d = new Date(alert.timestamp)
              return <div key={alert.id} style={{
                display: 'grid', gridTemplateColumns: '100px 110px 100px 160px 1fr 220px', columnGap: '16px',
                padding: '10px 24px', borderBottom: '1px solid rgba(255,255,255,0.03)',
                transition: 'background 0.15s',
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
              <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.secondary }}>
                {d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.secondary }}>
                {d.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span style={{ fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600, color: colors.text.primary }}>
                {alert.code}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {(() => {
                  const c = alert.severity === AlertSeverity.CRITICAL ? colors.status.critical
                    : alert.severity === AlertSeverity.SEVERE ? '#f97316'
                    : colors.status.warning
                  const label = alert.severity === AlertSeverity.CRITICAL ? 'CRITICAL'
                    : alert.severity === AlertSeverity.SEVERE ? 'SEVERE'
                    : 'ATTENTION'
                  return <>
                    <AlertTriangle size={11} color={c} />
                    <span style={{ fontFamily: fonts.mono, fontSize: '10px', fontWeight: 600, color: c }}>{label}</span>
                  </>
                })()}
              </div>
              <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.secondary }}>
                {alert.message}
              </span>
              <span style={{ fontFamily: fonts.mono, fontSize: '11px', fontWeight: 500, color: alert.action ? colors.amethyst.light : colors.text.muted, textAlign: 'center' }}>
                {alert.action ?? '—'}
              </span>
            </div>
          })}
        </div>

        {/* Pagination footer */}
        {filtered.length > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 24px', borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <span style={{ fontFamily: fonts.mono, fontSize: '11px', color: colors.text.secondary }}>
              Showing {safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, filtered.length)} of {filtered.length} events
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={safePage === 0}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none', cursor: safePage === 0 ? 'default' : 'pointer',
                  color: safePage === 0 ? colors.text.muted : colors.text.secondary,
                  opacity: safePage === 0 ? 0.3 : 1, padding: '4px',
                }}
              >
                <ChevronLeft size={14} />
              </button>

              {(() => {
                const half = 3
                let start = Math.max(0, safePage - half)
                const end = Math.min(totalPages - 1, start + 6)
                if (end - start < 6) start = Math.max(0, end - 6)
                return Array.from({ length: end - start + 1 }, (_, i) => start + i)
              })().map(i => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: '30px', height: '30px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    fontFamily: fonts.mono, fontSize: '11px', fontWeight: 600,
                    background: i === safePage ? 'rgba(121,71,189,0.35)' : 'rgba(255,255,255,0.07)',
                    color: i === safePage ? colors.amethyst.light : colors.text.secondary,
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={safePage === totalPages - 1}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none', cursor: safePage === totalPages - 1 ? 'default' : 'pointer',
                  color: safePage === totalPages - 1 ? colors.text.muted : colors.text.secondary,
                  opacity: safePage === totalPages - 1 ? 0.3 : 1, padding: '4px',
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  )
}
