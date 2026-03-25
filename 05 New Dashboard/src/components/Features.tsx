import { useState, useEffect, useRef } from 'react'
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
  { icon: BatteryCharging, title: 'SoC & Range Prediction',     desc: 'Real-time charge estimation with distance and time-based range prediction.', color: '#b18ddd' },
  { icon: HeartPulse,      title: 'SoH & RUL Prediction',       desc: 'Battery health assessment with remaining useful life forecasting.',           color: '#34d399' },
  { icon: TrendingDown,    title: 'Capacity Fade Detection',     desc: 'Anomaly detection for abnormal capacity degradation patterns.',               color: '#fbbf24' },
  { icon: Thermometer,     title: 'Thermal Management',          desc: 'Automatic cooling with relay-based thermal protection.',                      color: '#fb923c' },
  { icon: ShieldAlert,     title: 'Voltage & Current Anomaly',   desc: 'Charging attack detection with automatic relay disconnection.',               color: '#f87171' },
  { icon: Droplets,        title: 'Humidity & Leak Detection',   desc: 'Water leakage monitoring in sealed battery compartments.',                   color: '#22d3ee' },
  { icon: Gauge,           title: 'Battery Swell Detection',     desc: 'Pressure-based monitoring for abnormal battery swelling.',                   color: '#60a5fa' },
]

export function Features() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

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

  return (
    <section
      id="features"
      style={{ padding: '0px 24px 96px', scrollMarginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Header */}
        <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {headingText}<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: typingDone ? 'blink 1.1s step-start infinite' : 'none', opacity: headingText.length > 0 ? 1 : 0 }}>{'>'}</span>
          </p>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 300, color: '#9ca3af', textAlign: 'justify', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
            Traditional BMS systems handle the basics i.e. voltage cutoffs, thermal trips, and simple math-based SoC estimation. But, CyphEV goes further with on-device ML models that predict SoH & Remaining Useful Life, flag capacity fade before it becomes critical, and detect anomalies in voltage and current draw, water leakage in battery compartment, and battery swelling in real-time. Environmental parameters and driving patterns are factored into every prediction - things most traditional BMS systems never account for.
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {features.map((f) => (
            <div
              key={f.title}
              onMouseEnter={() => setHoveredCard(f.title)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(141, 110, 179, 0.58)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: hoveredCard === f.title ? '0 0 28px rgba(121,71,189,0.35), inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.07)',
                padding: '20px',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
                transform: hoveredCard === f.title ? 'translateY(-3px)' : 'translateY(0)',
                cursor: 'default',
              }}
            >
              <f.icon size={24} style={{ color: '#9ca3af', marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '6px', textAlign: 'center' }}>{f.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#6b7280', lineHeight: 1.6, textAlign: 'center' }}>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px', margin: '60px auto 0' }} />
    </section>
  )
}
