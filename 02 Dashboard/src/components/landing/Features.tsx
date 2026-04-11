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
import { MotionCarousel } from './MotionCarousel'

const features = [
  { icon: BatteryCharging, title: 'SoC & Range Estimation',     desc: 'CyphEV continuously monitors the battery pack and uses on-device ML models to give an accurate charge status and range estimate based on the driving patterns and environmental factors. No guesswork, no nasty surprises mid-trip.', color: '#b18ddd' },
  { icon: HeartPulse,      title: 'SoH & RUL Prediction',       desc: 'Think of this as a health report of the battery pack. CyphEV tracks the battery aging pattern and predicts how many charge cycles it is left with, so you know well in advance when a replacement might be needed.', color: '#34d399' },
  { icon: TrendingDown,    title: 'Capacity Fade Detection',     desc: 'Batteries lose capacity over time, but sometimes it happens faster than it should. CyphEV watches for early signs of abnormal degradation and alerts you before it becomes a costly problem.', color: '#fbbf24' },
  { icon: Thermometer,     title: 'Thermal Management',          desc: 'Heat is a battery\'s worst enemy. CyphEV automatically activates an adaptive cooling system when the pack gets abnormally warm and disconnects the battery pack if temperatures reach a dangerous level, protecting both the vehicle and your safety.', color: '#fb923c' },
  { icon: ShieldAlert,     title: 'Voltage & Current Anomaly',   desc: 'Unusual spikes in voltage or current can indicate a faulty charger or even a deliberate attack on the charging system. CyphEV detects these anomalies instantly and cuts off the connection to prevent damage.', color: '#f87171' },
  { icon: Droplets,        title: 'Humidity & Leak Detection',   desc: 'Water and batteries do not mix well. CyphEV monitors humidity levels inside the sealed battery compartment and immediately raises an alarm if any moisture or leakage is detected, catching a dangerous situation before it escalates.', color: '#22d3ee' },
  { icon: Gauge,           title: 'Battery Swell Detection',     desc: 'A swelling battery is a serious warning sign that should never be ignored. CyphEV uses pressure sensors to detect abnormal expansion inside the pack early, giving you time to act safely before it becomes an active hazard.', color: '#60a5fa' },
]

export function Features() {
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [carouselActive, setCarouselActive] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionElRef = useRef<HTMLElement>(null)
  const cancelRef = useRef(false)

  useEffect(() => {
    const el = sectionElRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setCarouselActive(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
      ref={sectionElRef}
      style={{ padding: '0px 0px 96px', scrollMarginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Header */}
        <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {headingText}<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: typingDone ? 'blink 1.1s step-start infinite' : 'none', opacity: headingText.length > 0 ? 1 : 0 }}>{'>'}</span>
          </p>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', fontWeight: 300, color: '#9ca3af', textAlign: 'justify', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.4 }}>
            Traditional BMS systems handle the basics i.e. voltage cutoffs, thermal trips, and simple math-based SoC estimation. But, CyphEV goes further with on-device ML models that predict SoH & Remaining Useful Life, flag capacity fade before it becomes critical, and detect anomalies in voltage and current draw, water leakage in battery compartment, and battery swelling in real-time. Environmental parameters and driving patterns are factored into every prediction - things most traditional BMS systems never account for.
          </h2>
        </div>

        {/* Motion Carousel */}
        <MotionCarousel slides={features} active={carouselActive} />

      </div>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.26)', width: '100%', maxWidth: '75%', margin: '60px auto 0' }} />
    </section>
  )
}
