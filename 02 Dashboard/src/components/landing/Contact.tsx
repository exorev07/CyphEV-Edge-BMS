import { useState, useEffect, useRef } from 'react'
import akshitaImg from '../../assets/CyphEV_Dev_Akshita.png'
import ekanshImg from '../../assets/CyphEV_Dev_Ekansh.png'

const members = [
  {
    name: 'Akshita Sondhi',
    discipline: 'Electronics & Communication Engineering',
    institute: 'IIIT Naya Raipur',
    email: 'akshitasondhi223@gmail.com',
    github: 'https://github.com/akshita24101',
    linkedin: 'https://www.linkedin.com/in/akshita-sondhi/',
    desc: 'An ECE undergraduate and NXP WIT 2026 Scholar, Akshita spearheads the system\'s hardware architecture. As the first author of the team\'s core research on TinyML-based Intrusion Detection, she engineered the initial ESP32 prototype that runs a quantised model at the edge. Her technical expertise in the field is further validated by recent wins at national hackathons, including Techexpo: Scientific 2026 and Hardwired 2025 - IIITM Gwalior.',
    img: akshitaImg,
  },
  {
    name: 'Ekansh Arohi',
    discipline: 'Data Science & Artificial Intelligence',
    institute: 'IIIT Naya Raipur',
    email: 'ekansharohi135@gmail.com',
    github: 'https://github.com/exorev07',
    linkedin: 'https://www.linkedin.com/in/ekansharohi/',
    desc: 'A student of Data Science & AI, Ekansh leads the system\'s algorithmic core. He spearheads the comparative analysis of machine learning models, optimising them to achieve high accuracy despite physical hardware constraints. His ability to deliver robust technical solutions under pressure is evidenced by consecutive wins at national hackathons, including Techexpo: Scientific 2026 and Hardwired 2025 - IIITM Gwalior.',
    img: ekanshImg,
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
    const full = 'contact us'
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
            if (i < full.length) {
              setTimeout(tick, 80)
            } else {
              setTypingDone(true)
            }
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
      style={{ padding: '0px 0px 96px', scrollMarginTop: '130px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
    >
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Leave: photo fades back in after info has slid back down (~0.6s total) */
        .contact-photo {
          transition: opacity 0.25s ease 0.55s, transform 0.3s cubic-bezier(0.22,1,0.36,1) 0.55s;
        }
        /* Hover-in: photo fades out immediately */
        .contact-card:hover .contact-photo {
          opacity: 0;
          transform: scale(0.85) translateY(-6px);
          transition: opacity 0.22s ease 0s, transform 0.28s cubic-bezier(0.22,1,0.36,1) 0s;
          pointer-events: none;
        }

        /* Leave: wait for desc to fade before sliding back down */
        .contact-info {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1) 0.25s;
        }
        /* Hover-in: slide up after a small delay */
        .contact-card:hover .contact-info {
          transform: translateY(-136px);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1) 0.1s;
        }

        /* Leave: fade out in place, no movement */
        .contact-desc {
          opacity: 0;
          transition: opacity 0.2s ease 0s;
          pointer-events: none;
        }
        /* Hover-in: fade in after info has started sliding */
        .contact-card:hover .contact-desc {
          opacity: 1;
          transition: opacity 0.25s ease 0.2s;
          pointer-events: auto;
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: '1080px', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: '56px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 3vw, 4rem)', fontWeight: 600, color: '#b18ddd', letterSpacing: '0.05em', marginBottom: '12px' }}>
            {headingText}<span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.75em', color: '#6829c1', marginLeft: '5px', animation: typingDone ? 'blink 1.1s step-start infinite' : 'none', opacity: headingText.length > 0 ? 1 : 0 }}>{'>'}</span>
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
          {members.map((m) => {
            const hovered = hoveredCard === m.name
            return (
              <div
                key={m.name}
                className="contact-card"
                onMouseEnter={() => setHoveredCard(m.name)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: '16px',
                  border: '2px solid rgba(255,255,255,0.23)',
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: hovered ? '0 0 24px rgba(121,71,189,0.65), inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.07)',
                  padding: '72px 24px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden',
                  height: '460px',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                  transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                  cursor: 'default',
                  position: 'relative',
                }}
              >
                {/* Photo — in normal flow, fades out on hover */}
                <img
                  className="contact-photo"
                  src={m.img}
                  alt={m.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '16px',
                    flexShrink: 0,
                  }}
                />

                {/* Info block slides up on hover, revealing description */}
                <div className="contact-info" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 400, letterSpacing: '0.025em', color: '#ffffff', marginBottom: '4px', textAlign: 'center' }}>{m.name}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', color: '#b18ddd', fontWeight: 400, letterSpacing: '0.025em', textAlign: 'center', marginBottom: '2px' }}>{m.discipline}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', color: '#b18ddd', letterSpacing: '0.025em', marginBottom: '18px', textAlign: 'center' }}>{m.institute}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic', fontSize: '13px', color: '#d1d5db', marginBottom: '28px', textAlign: 'center' }}>{m.email}</p>

                  {/* Description fades in — zero height so it doesn't push buttons */}
                  <div style={{ width: '100%', height: 0, overflow: 'visible', position: 'relative' }}>
                    <p className="contact-desc" style={{ position: 'absolute', top: 0, left: 0, right: 0, fontFamily: "'Playfair Display', serif", fontSize: '13px', fontWeight: 400, color: '#c1c4cac5', lineHeight: 1.45, textAlign: 'justify', letterSpacing: '0.025em' }}>{m.desc}</p>
                  </div>
                </div>

                {/* Buttons — pinned to card bottom, always visible */}
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', gap: '10px' }}>
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
            )
          })}
        </div>

      </div>
    </section>
  )
}
