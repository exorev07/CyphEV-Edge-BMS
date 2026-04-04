import { useState, useEffect, useRef } from 'react'

const members = [
  {
    name: 'Akshita Sondhi',
    discipline: 'Electronics & Communication Engineering',
    institute: 'IIIT Naya Raipur',
    email: 'akshitasondhi223@gmail.com',
    github: 'https://github.com/akshita24101',
    linkedin: 'https://www.linkedin.com/in/akshita-sondhi/',
    desc: 'An ECE undergraduate and NXP WIT 2026 Scholar, Akshita spearheads the system\'s hardware architecture. As the first author of the team\'s core research on TinyML-based Intrusion Detection, she engineered the initial ESP32 prototype that runs a quantised model at the edge. Her technical expertise in the field is further validated by recent wins at national hackathons, including Techexpo: Scientific 2026 and Hardwired 2025 - IIITM Gwalior.',
  },
  {
    name: 'Ekansh Arohi',
    discipline: 'Data Science & Artificial Intelligence',
    institute: 'IIIT Naya Raipur',
    email: 'ekansharohi135@gmail.com',
    github: 'https://github.com/exorev07',
    linkedin: 'https://www.linkedin.com/in/ekansharohi/',
    desc: 'A student of Data Science & AI, Ekansh leads the system\'s algorithmic core. He spearheads the comparative analysis of machine learning models, optimising them to achieve high accuracy despite physical hardware constraints. His ability to deliver robust technical solutions under pressure is evidenced by consecutive wins at national hackathons, including Techexpo: Scientific 2026 and Hardwired 2025 - IIITM Gwalior.',
  },
]

export function Contact() {
  const [headingText, setHeadingText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
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
      style={{ padding: '0px 0px 96px', scrollMarginTop: '75px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
          {members.map((m) => (
            <div
              key={m.name}
              onMouseEnter={() => setHoveredCard(m.name)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: '12px',
                border: '1px solid rgba(141, 110, 179, 0.58)',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                boxShadow: hoveredCard === m.name ? '0 0 24px rgba(121,71,189,0.65), inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.07)',
                padding: '28px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'box-shadow 0.2s, transform 0.2s',
                transform: hoveredCard === m.name ? 'translateY(-3px)' : 'translateY(0)',
                cursor: 'default',
              }}
            >
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '24px', fontWeight: 300, letterSpacing: '0.05em', color: '#ffffff', marginBottom: '0px', textAlign: 'center' }}>{m.name}</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '16px', color: '#b18ddd', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '0px', textAlign: 'center' }}>{m.discipline}</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '16px', color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '18px', textAlign: 'center' }}>{m.institute}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", fontSize: '14px', color: '#d1d5db', marginBottom: '16px', textAlign: 'center' }}>{m.email}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#9ca3af', lineHeight: 1.6, textAlign: 'justify', marginBottom: '20px' }}>{m.desc}</p>

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
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#9ca3af',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '15px',
                    padding: '7px 12px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'color 0.2s, box-shadow 0.2s, transform 0.2s',
                    boxShadow: hoveredBtn === `${m.name}-gh` ? '0 0 24px rgba(121,71,189,0.65)' : 'none',
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
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#9ca3af',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '15px',
                    padding: '7px 12px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'color 0.2s, box-shadow 0.2s, transform 0.2s',
                    boxShadow: hoveredBtn === `${m.name}-li` ? '0 0 24px rgba(121,71,189,0.65)' : 'none',
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
