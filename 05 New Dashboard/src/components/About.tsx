import { useState, useEffect, useRef } from 'react'

export function About() {
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const full = 'About'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let i = 0
          const tick = () => {
            i++
            setHeadingText(full.slice(0, i))
            if (i < full.length) setTimeout(tick, 80)
            else setTypingDone(true)
          }
          setTimeout(tick, 80)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: '0px 24px 96px', scrollMarginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>

        <div style={{ textAlign: 'center' }}>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {headingText}<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: typingDone ? 'blink 1.1s step-start infinite' : 'none', opacity: headingText.length > 0 ? 1 : 0 }}>{'>'}</span>
          </p>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 300, color: '#9ca3af', textAlign: 'justify', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
            CyphEV was built as a Minor Project at IIIT Naya Raipur which is an end-to-end edge-native Battery Monitoring System spanning three tightly integrated layers: an ESP32 firmware layer handling real-time sensor acquisition and relay actuation, an on-device TinyML inference layer running quantized models for SoC estimation, SoH prediction, remaining useful life forecasting, and multi-class anomaly detection, and a live React dashboard consuming a Firebase real-time stream to surface every prediction and alert as it happens.
            <br /><br />
            The core thesis was simple - intelligent BMS capabilities don't belong in the cloud. Sending raw battery telemetry off-device introduces latency, privacy concerns, and a hard dependency on connectivity. CyphEV eliminates all three. Every model runs locally on the ESP32 using TensorFlow Lite Micro, keeping inference well under a few ms per cycle. The entire system from sensor read to relay decision, operates on a hardware setup that costs less than {'<'}500₹.
            <br /><br />
            Beyond performance, CyphEV monitors parameters that most commercial BMS hardware ignores entirely i.e. battery swelling via pressure sensors, and water leakage detection in sealed battery compartments. Environmental context is factored into every prediction, not treated as an afterthought. The result is a BMS that behaves less like a simple circuit and more like a continuously reasoning health monitor for the battery pack.
          </h2>
        </div>

      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '1152px', margin: '60px auto 0' }} />
    </section>
  )
}
