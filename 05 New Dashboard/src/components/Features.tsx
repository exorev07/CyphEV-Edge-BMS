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
  return (
    <section
      id="features"
      style={{ padding: '24px 24px 96px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Features
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: '#ffffff' }}>
            7 Core BMS Capabilities
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                padding: '20px',
                transition: 'border-color 0.2s, background 0.2s',
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
