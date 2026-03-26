import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(8,8,10,0.35)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', animation: 'navFadeDown 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}>
      <style>{`@keyframes navFadeDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div style={{ display: 'flex', alignItems: 'center', height: '64px', padding: '0 24px', width: '100%', position: 'relative', fontFamily: "'DM Sans', sans-serif" }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '22px', fontWeight: 700, letterSpacing: '0.05em', color: '#ffffff' }}>
            CYPH<span style={{ color: '#b18ddd' }}>EV</span>
          </span>
        </a>

        {/* Desktop nav links — absolutely centered */}
        <div className="hidden md:flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <div key={link.label} style={{ display: 'flex', alignItems: 'center' }}>
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{ color: hoveredLink === link.label ? '#b18ddd' : '#9ca3af', fontSize: '14px', padding: '8px 10px', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                {link.label}
              </a>
              {i < navLinks.length - 1 && (
                <span style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1, display: 'flex', alignItems: 'center' }}>·</span>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-3" style={{ marginLeft: 'auto' }}>
          <a
            href="#demo"
            onMouseEnter={() => setHoveredBtn('demo')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{ color: '#9ca3af', border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', borderRadius: '15px', padding: '6px 16px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: hoveredBtn === 'demo' ? '0 0 24px rgba(121,71,189,0.65)' : 'none', transform: hoveredBtn === 'demo' ? 'translateY(-2px)' : 'translateY(0)' }}
          >
            Demo
          </a>
          <a
            href="/auth"
            onMouseEnter={() => setHoveredBtn('getstarted')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{ background: '#ffffff', color: '#08080a', borderRadius: '15px', padding: '6px 18px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', transition: 'box-shadow 0.2s, transform 0.2s', boxShadow: hoveredBtn === 'getstarted' ? '0 0 24px rgba(121,71,189,0.65)' : 'none', transform: hoveredBtn === 'getstarted' ? 'translateY(-2px)' : 'translateY(0)' }}
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
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden relative bg-surface-800/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-3 pt-3 border-t border-white/[0.06]">
            <a href="#demo" className="flex-1 text-center px-4 py-2.5 text-sm text-gray-300 border border-white/[0.1] rounded-lg">
              Demo
            </a>
            <a href="/auth" className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-surface-900 bg-white rounded-lg">
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
