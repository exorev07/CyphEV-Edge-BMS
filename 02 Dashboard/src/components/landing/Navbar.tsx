import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import GlassSurface from './GlassSurface'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip'

const navLinks = [
  { label: 'Product Preview', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'About', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80) setActiveSection(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.slice(1))
    const observers: IntersectionObserver[] = []
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <TooltipProvider>
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9998, display: 'flex', justifyContent: 'center', padding: '16px 24px', pointerEvents: 'none' }}>
      <style>{`
        @keyframes navFadeDown { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <GlassSurface
        width={scrolled ? 'calc(100vw - 48px)' : 'calc(75vw)'}
        height={60}
        borderRadius={16}
        brightness={20}
        opacity={0.9}
        blur={5}
        displace={4}
        distortionScale={-30}
        redOffset={0}
        greenOffset={0}
        blueOffset={0}
        backgroundOpacity={0}
        saturation={1}
        borderWidth={0.12}
        style={{
          pointerEvents: 'auto',
          border: '2px solid rgba(255, 255, 255, 0.23)',
          boxShadow: scrolled
            ? 'inset 0 1px 0 rgba(255,255,255,0.07), 0 -4px 24px rgba(0,0,0,0.4), 0 16px 64px rgba(0,0,0,0.85), 0 6px 24px rgba(0,0,0,0.7), 0 30px 80px rgba(0,0,0,0.5), 0 24px 70px rgba(60,40,90,0.2)'
            : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 24px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.3s ease, width 0.4s cubic-bezier(0.22,1,0.36,1)',
          fontFamily: "'DM Sans', sans-serif",
          animation: 'navFadeDown 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          display: 'flex',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '22px', fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            CYPH<span style={{ color: '#b18ddd' }}>EV</span>
          </span>
        </a>

        {/* Desktop nav links — centered */}
        <div className="hidden md:flex" style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <div key={link.label} style={{ display: 'flex', alignItems: 'center' }}>
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ color: hoveredLink === link.label ? '#b18ddd' : '#ffffffa4', fontSize: '14px', letterSpacing: "0.025em", fontWeight:400, padding: '8px 10px', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}
              >
                {link.label}
                <span style={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  borderRadius: '1px',
                  background: '#ddb5ff',
                  opacity: activeSection === link.href.slice(1) ? 0.5 : 0,
                  transition: 'opacity 0.3s ease',
                }} />
              </a>
              {i < navLinks.length - 1 && (
                <span style={{ color: '#efe4ff', fontSize: '18px', lineHeight: 1, display: 'flex', alignItems: 'center' }}>·</span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3" style={{ flexShrink: 0, marginRight: '-8px' }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/auth?demo=true"
                onMouseEnter={() => setHoveredBtn('demo')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ color: '#ffffffc8', border: '1px solid rgba(255, 255, 255, 0.4)', background: 'rgba(51, 51, 51, 0.63)', backdropFilter: 'blur(8px)', borderRadius: '12px', padding: '6px 16px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: hoveredBtn === 'demo' ? '0 0 24px rgba(121,71,189,0.65)' : 'none', transform: hoveredBtn === 'demo' ? 'translateY(-2px)' : 'translateY(0)', display: 'inline-block' }}
              >
                Demo
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Try CyphEV without signing up. The demo account gives you full access to the dashboard with simulated battery & sensor data so you can explore all features and dashboard functionality freely.
            </TooltipContent>
          </Tooltip>
          <a
            href="/auth"
            onMouseEnter={() => setHoveredBtn('getstarted')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{ background: '#ffffff', color: '#08080a', borderRadius: '12px', padding: '6px 18px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: hoveredBtn === 'getstarted' ? '0 0 24px rgba(121,71,189,0.65)' : 'none', transform: hoveredBtn === 'getstarted' ? 'translateY(-2px)' : 'translateY(0)' }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ marginLeft: 'auto', color: '#9ca3af' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </GlassSurface>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden" style={{ position: 'absolute', top: '80px', left: '24px', right: '24px', maxWidth: '1200px', margin: '0 auto', background: 'rgba(18,16,22,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '4px', pointerEvents: 'auto' }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ padding: '10px 12px', fontSize: '14px', color: '#d1d5db', textDecoration: 'none', borderRadius: '10px' }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <a href="/auth?demo=true" style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: '13px', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', textDecoration: 'none' }}>
              Demo
            </a>
            <a href="/auth" style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: '13px', fontWeight: 600, color: '#08080a', background: '#ffffff', borderRadius: '12px', textDecoration: 'none' }}>
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
    </TooltipProvider>
  )
}
