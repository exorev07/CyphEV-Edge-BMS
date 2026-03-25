import { useState, useEffect, useRef } from 'react'

const members = [
  {
    name: 'Ekansh Arohi',
    discipline: 'Data Science & AI',
    institute: 'IIIT Naya Raipur',
    email: 'ekansharohi135@gmail.com',
    github: 'https://github.com/exorev07',
    linkedin: 'https://www.linkedin.com/in/ekansharohi/',
  },
  {
    name: 'Akshita Sondhi',
    discipline: 'Electronics & Communication Engineering',
    institute: 'IIIT Naya Raipur',
    email: 'akshitasondhi223@gmail.com',
    github: 'https://github.com/akshita24101',
    linkedin: 'https://www.linkedin.com/in/akshita-sondhi/',
  },
]

export function Contact() {
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef(false)

  useEffect(() => {
    const full = 'Contact Us'
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
      id="contact"
      style={{ padding: '0px 24px 96px', scrollMarginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Header */}
        <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: '56px' }}>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {headingText}<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: typingDone ? 'blink 1.1s step-start infinite' : 'none', opacity: headingText.length > 0 ? 1 : 0 }}>{'>'}</span>
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '720px', margin: '0 auto' }}>
          {members.map((m) => (
            <div
              key={m.name}
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(141, 110, 179, 0.58)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                padding: '28px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{m.name}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#b18ddd', fontWeight: 400, marginBottom: '2px' }}>{m.discipline}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#6b7280', letterSpacing: '0.05em', marginBottom: '16px' }}>{m.institute}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#6b7280', marginBottom: '20px' }}>{m.email}</p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredBtn(`${m.name}-gh`)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#9ca3af',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    padding: '7px 12px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transition: 'color 0.2s, box-shadow 0.2s, transform 0.2s',
                    boxShadow: hoveredBtn === `${m.name}-gh` ? '0 0 18px rgba(121,71,189,0.45)' : 'none',
                    transform: hoveredBtn === `${m.name}-gh` ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  GitHub
                </a>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredBtn(`${m.name}-li`)}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#9ca3af',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    padding: '7px 12px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transition: 'color 0.2s, box-shadow 0.2s, transform 0.2s',
                    boxShadow: hoveredBtn === `${m.name}-li` ? '0 0 18px rgba(121,71,189,0.45)' : 'none',
                    transform: hoveredBtn === `${m.name}-li` ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
