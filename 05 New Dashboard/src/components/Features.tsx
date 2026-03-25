import { useState } from 'react'
import {
  BatteryCharging,
  HeartPulse,
  TrendingDown,
  Thermometer,
  ShieldAlert,
  Droplets,
  Gauge,
  ArrowUpRight,
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
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section
      id="features"
      style={{ padding: '0px 24px 96px', marginTop: '-48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {/* CTA Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', width: '100%' }}>
        <a
          href="#get-started"
          onMouseEnter={() => setHoveredBtn('getstarted')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#08080a', background: '#ffffff', borderRadius: '8px', padding: '6px 18px', textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: hoveredBtn === 'getstarted' ? '0 0 24px rgba(121,71,189,0.55)' : 'none', transform: hoveredBtn === 'getstarted' ? 'translateY(-2px)' : 'translateY(0)' }}
        >
          Get Started
        </a>
        <a
          href="https://github.com/exorev07/TinyML-based-Battery-Management-System.git"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredBtn('github')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{ display: 'inline-flex', alignItems: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#9ca3af', background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: '8px', padding: '6px 18px', textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: hoveredBtn === 'github' ? '0 0 24px rgba(121,71,189,0.4)' : 'none', transform: hoveredBtn === 'github' ? 'translateY(-2px)' : 'translateY(0)' }}
        >
          GitHub <ArrowUpRight size={13} style={{ marginLeft: '4px' }} />
        </a>
      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px', marginBottom: '100px' }} />

      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Features<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: 'blink 1.1s step-start infinite' }}>{'>'}</span>
          </p>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 300, color: '#9ca3af', textAlign: 'justify', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
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
                border: '1px solid rgba(255,255,255,0.1)',
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
              <f.icon size={18} style={{ color: f.color, marginBottom: '12px' }} />
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{f.title}</h3>
              <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
