import { useState, useEffect, useRef } from 'react'
import { Cpu, Layers, Database, Lock, Code2, FileCode, Zap, BarChart2, Brain } from 'lucide-react'

const techItems = [
  { icon: Cpu,       name: 'ESP32',           category: 'EDGE',     desc: 'Dual-core microcontroller running all sensor polling, ML inference, and relay control on-device.' },
  { icon: Layers,    name: 'FreeRTOS',        category: 'EDGE',     desc: 'Real-time OS managing concurrent tasks - sensing, inference, and communication without blocking.' },
  { icon: Brain,     name: 'TensorFlow Lite', category: 'ML',       desc: 'Quantized TinyML models for SoC, SoH, RUL, and anomaly detection, running entirely on the ESP32.' },
  { icon: Zap,       name: 'TinyML Models',   category: 'ML',       desc: 'Custom trained models for capacity fade, voltage/current anomaly, and battery swell classification.' },
  { icon: Database,  name: 'Firebase RTDB',   category: 'BACKEND',  desc: 'Real-time database syncing live sensor streams from the ESP32 to the web dashboard with sub-second latency.' },
  { icon: Lock,      name: 'Firebase Auth',   category: 'BACKEND',  desc: 'Role-based authentication for fleet operators and vehicle owners with secure session management.' },
  { icon: Code2,     name: 'React 19',        category: 'FRONTEND', desc: 'Component-based UI with real-time hooks consuming Firebase streams for live dashboard updates.' },
  { icon: FileCode,  name: 'TypeScript',      category: 'FRONTEND', desc: 'End-to-end type safety across BMS data models, Firebase schemas, and UI component contracts.' },
  { icon: BarChart2, name: 'Recharts',        category: 'FRONTEND', desc: 'Declarative charting library rendering live voltage, current, and temperature history graphs.' },
]

export function TechStack() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

  useEffect(() => {
    const full = 'Tech Stack'
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
      id="tech"
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
            CyphEV is built on a deliberately minimal stack with every layer chosen to keep inference on the edge, data in real-time, and the UI responsive without compromise. The ESP32 handles everything from raw sensor acquisition to ML model execution and relay actuation. Firebase bridges the gap between edge hardware and the web, while React and Recharts surface that stream as a live, interactive dashboard.
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {techItems.map((t) => (
            <div
              key={t.name}
              onMouseEnter={() => setHoveredCard(t.name)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(141, 110, 179, 0.58)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: hoveredCard === t.name ? '0 0 28px rgba(121,71,189,0.35), inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.07)',
                padding: '20px',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
                transform: hoveredCard === t.name ? 'translateY(-3px)' : 'translateY(0)',
                cursor: 'default',
              }}
            >
              {/* Category badge — top left */}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#6b7280', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '2px 8px', display: 'inline-block', marginBottom: '12px' }}>
                {t.category}
              </span>
              <t.icon size={24} style={{ color: '#9ca3af', display: 'block', margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>{t.name}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#6b7280', lineHeight: 1.6, textAlign: 'center' }}>{t.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px', margin: '60px auto 0' }} />
    </section>
  )
}
