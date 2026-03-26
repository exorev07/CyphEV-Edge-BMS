import { ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const phrases = [
  { before: 'Tired of constant ',    bold: 'Range Anxiety', after: '?' },
  { before: 'Manufacturers hiding ', bold: 'Sensor Data',   after: '?' },
  { before: 'Unexplainable ',        bold: 'Error Codes',   after: '?' },
]

function TypewriterLine() {
  const [segs, setSegs]           = useState({ s1: '', s2: '', s3: '' })
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let phraseIdx = 0
    let charIdx   = 0
    let deleting  = false
    let tid: ReturnType<typeof setTimeout>

    const tick = () => {
      const p    = phrases[phraseIdx]
      const full = p.before + p.bold + p.after

      // Finished typing — pause then reverse
      if (!deleting && charIdx === full.length) {
        tid = setTimeout(() => { deleting = true; tick() }, 2200)
        return
      }

      // Finished deleting — next phrase
      if (deleting && charIdx === 0) {
        deleting  = false
        phraseIdx = (phraseIdx + 1) % phrases.length
      } else {
        charIdx += deleting ? -1 : 1
      }

      const cp    = phrases[phraseIdx]
      const typed = (cp.before + cp.bold + cp.after).slice(0, charIdx)
      const bS    = cp.before.length
      const bE    = bS + cp.bold.length

      setSegs({
        s1: typed.slice(0, Math.min(typed.length, bS)),
        s2: typed.length > bS ? typed.slice(bS, Math.min(typed.length, bE)) : '',
        s3: typed.length > bE ? typed.slice(bE) : '',
      })

      tid = setTimeout(tick, deleting ? 35 : 65)
    }

    tid = setTimeout(tick, 65)
    return () => clearTimeout(tid)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setShowCursor(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 2vw, 3.25rem)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '0.05em', color: '#ffffff', minHeight: '1.2em' }}>
      {segs.s1}
      <span style={{ color: '#b18ddd' }}>{segs.s2}</span>
      {segs.s3}
      <span style={{ opacity: showCursor ? 1 : 0, color: '#b18ddd', marginLeft: '2px' }}>|</span>
    </div>
  )
}

export function Hero() {
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center"
      style={{ paddingTop: '10rem', paddingBottom: '6rem' }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(121,71,189,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Text content */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px',
        padding: '0 80px', textAlign: 'center', marginBottom: '64px',
        marginLeft: 'auto', marginRight: 'auto',
      }}>
        {/* Typewriter */}
        <div style={{ marginBottom: '75px' }}>
          <TypewriterLine />
        </div>

        {/* Glass tagline */}
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(3rem, 5.5vw, 6rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '0.04em',
          marginBottom: '26px',
          background: 'linear-gradient(180deg, #c0c0c0 0%, #606060 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Give your EV the Battery Intelligence it deserves!
        </div>
        <p style={{ fontSize: '20px', fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', color: '#ddceefae', marginTop: '0px' }}>
          Edge-based, All Private, with Sub-Millisecond Inference time - all on a single Device
        </p>
      </div>

      {/* Dashboard preview */}
      <div id="product" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', padding: '0 24px', marginLeft: 'auto', marginRight: 'auto', scrollMarginTop: '100px' }}>
        <div style={{ borderRadius: '12px', border: '1px solid rgba(121,71,189,0.3)', overflow: 'hidden', boxShadow: '0 20px 80px rgba(121,71,189,0.4), 0 8px 30px rgba(121,71,189,0.2)', background: '#09090c', position: 'relative' as const, zIndex: 2 }}>
          {/* Browser chrome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{ padding: '2px 16px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', fontSize: '10px', color: '#6b7280', fontFamily: 'monospace' }}>
                cyphev.vercel.app/dashboard
              </div>
            </div>
            <div style={{ width: '48px' }} />
          </div>

          {/* Screenshot placeholder */}
          <div style={{ aspectRatio: '16/9', background: '#09090c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: '14px', color: '#374151', letterSpacing: '0.05em' }}>
              Dashboard preview - add screenshot here
            </p>
          </div>
        </div>

        {/* Glow under preview */}
        <div style={{
          position: 'absolute', bottom: '-32px', left: '50%', transform: 'translateX(-50%)',
          width: '70%', height: '96px',
          background: 'rgba(121,71,189,0.35)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
          zIndex: 1,
        }} />
      </div>

      {/* Main heading + subtitle */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', padding: '0 80px', textAlign: 'center', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 2vw, 3.25rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '0.03em', marginBottom: '24px', whiteSpace: 'nowrap' }}>
          <span style={{ color: '#ffffff' }}>Intelligent Battery Management for </span>
          <span style={{ color: '#b18ddd' }}>EVs</span>
        </h1>
        <p style={{ fontSize: '16px', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: '#9ca3af', lineHeight: 1.4, maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'justify' }}>
          CyphEV is an edge-native Battery Management System (BMS) built on the ESP32, running TinyML inference models entirely on-device, it requires no cloud dependency, and has no latency and privacy concerns. Raw sensor data from the battery pack is processed locally in real-time, streamed to a Firebase backend, and surfaced on this dashboard - giving fleet operators and owners complete visibility into the vehicle's battery conditions, every second.
        </p>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '48px' }}>
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
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px', margin: '60px auto 0' }} />
    </section>
  )
}
