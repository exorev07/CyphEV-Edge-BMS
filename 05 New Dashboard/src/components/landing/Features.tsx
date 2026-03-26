import { useState, useEffect, useRef, useCallback } from 'react'
import {
  BatteryCharging,
  HeartPulse,
  TrendingDown,
  Thermometer,
  ShieldAlert,
  Droplets,
  Gauge,
} from 'lucide-react'

const features = [
  { icon: BatteryCharging, title: 'SoC & Range Prediction',     desc: 'Predicts Real-time Battery charge and estimated Range-to-Empty.', color: '#b18ddd' },
  { icon: HeartPulse,      title: 'SoH & RUL Prediction',       desc: 'Battery health assessment with remaining useful life forecasting.',           color: '#34d399' },
  { icon: TrendingDown,    title: 'Capacity Fade Detection',     desc: 'Anomaly detection for abnormal capacity degradation patterns.',               color: '#fbbf24' },
  { icon: Thermometer,     title: 'Thermal Management',          desc: 'Automatic cooling with relay-based thermal protection.',                      color: '#fb923c' },
  { icon: ShieldAlert,     title: 'Voltage & Current Anomaly',   desc: 'Charging attack detection with automatic relay disconnection.',               color: '#f87171' },
  { icon: Droplets,        title: 'Humidity & Leak Detection',   desc: 'Water leakage monitoring in sealed battery compartments.',                   color: '#22d3ee' },
  { icon: Gauge,           title: 'Battery Swell Detection',     desc: 'Pressure-based monitoring for abnormal battery swelling.',                   color: '#60a5fa' },
]

const BASE_WIDTH = 148
const BASE_HEIGHT = 110
const MAX_SCALE = 1.6
const NEIGHBOR_SCALE = 1.25
const SECOND_NEIGHBOR_SCALE = 1.1

function getDockScale(hoveredIdx: number | null, cardIdx: number): number {
  if (hoveredIdx === null) return 1
  const dist = Math.abs(hoveredIdx - cardIdx)
  if (dist === 0) return MAX_SCALE
  if (dist === 1) return NEIGHBOR_SCALE
  if (dist === 2) return SECOND_NEIGHBOR_SCALE
  return 1
}

export function Features() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const full = 'Features'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelRef.current = false
          setHeadingText('')
          setTypingDone(false)
          let i = 0
          const tick = () => {
            if (cancelRef.current) return
            i++
            setHeadingText(full.slice(0, i))
            if (i < full.length) setTimeout(tick, 80)
            else setTypingDone(true)
          }
          setTimeout(tick, 80)
        } else {
          cancelRef.current = true
          setHeadingText('')
          setTypingDone(false)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseLeave = useCallback(() => setHoveredIdx(null), [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    for (let i = 0; i < cardRefs.current.length; i++) {
      const el = cardRefs.current[i]
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setHoveredIdx(i)
        return
      }
    }
  }, [])

  return (
    <section
      id="features"
      style={{ padding: '0px 24px 96px', scrollMarginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Header */}
        <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: '24px' }}>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {headingText}<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: typingDone ? 'blink 1.1s step-start infinite' : 'none', opacity: headingText.length > 0 ? 1 : 0 }}>{'>'}</span>
          </p>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 300, color: '#9ca3af', textAlign: 'justify', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
            Traditional BMS systems handle the basics i.e. voltage cutoffs, thermal trips, and simple math-based SoC estimation. But, CyphEV goes further with on-device ML models that predict SoH & Remaining Useful Life, flag capacity fade before it becomes critical, and detect anomalies in voltage and current draw, water leakage in battery compartment, and battery swelling in real-time. Environmental parameters and driving patterns are factored into every prediction - things most traditional BMS systems never account for.
          </h2>
        </div>

        {/* Dock row */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '0', height: `${Math.round(BASE_HEIGHT * MAX_SCALE) + 20}px`, overflow: 'visible' }}
        >
          {features.map((f, idx) => {
            const scale = getDockScale(hoveredIdx, idx)
            const isHovered = hoveredIdx === idx
            return (
              <div
                key={f.title}
                ref={(el) => { cardRefs.current[idx] = el }}
                style={{
                  width: `${BASE_WIDTH}px`,
                  height: `${BASE_HEIGHT}px`,
                  display: 'flex',
                  flexDirection: 'column' as const,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '14px',
                  border: '1px solid rgba(141, 110, 179, 0.58)',
                  background: 'rgba(255,255,255,0.04  )',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  boxShadow: isHovered
                    ? '0 0 25px rgba(121,71,189,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.07)',
                  padding: '12px 10px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease',
                  cursor: 'default',
                  overflow: 'hidden',
                  zIndex: isHovered ? 10 : 1,
                  position: 'relative' as const,
                  pointerEvents: 'none' as const,
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', transition: 'transform 0.25s ease', transform: isHovered ? 'translateY(-10px)' : 'translateY(0)' }}>
                  <f.icon size={20} style={{ color: '#9ca3af', display: 'block', margin: '0 auto 6px' }} />
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: '#ffffff', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>{f.title}</h3>
                </div>
                <p style={{ position: 'absolute' as const, bottom: '10px', left: '10px', right: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '8px', color: '#6b7280', lineHeight: 1.4, textAlign: 'center', margin: 0, opacity: isHovered ? 1 : 0, transition: isHovered ? 'opacity 0.2s ease 0.25s' : 'opacity 0.1s ease 0s' }}>{f.desc}</p>
              </div>
            )
          })}
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#9ca2a8', textAlign: 'center', margin: '0 0 0', letterSpacing: '0.03em' }}>Hover to view the details! </p>

      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px', margin: '60px auto 0' }} />
    </section>
  )
}
