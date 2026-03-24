import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Contact', href: '#contact' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(8,8,10,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>

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
                style={{ color: '#9ca3af', fontSize: '14px', padding: '8px 10px', textDecoration: 'none' }}
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
            className="text-sm transition-colors"
            style={{ color: '#b18ddd', border: '1px solid #7947BD', borderRadius: '8px', padding: '6px 16px' }}
          >
            Demo
          </a>
          <a
            href="#get-started"
            className="text-sm font-semibold transition-colors"
            style={{ background: '#ffffff', color: '#08080a', borderRadius: '8px', padding: '6px 18px' }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2"
          style={{ marginLeft: 'auto' }}
          style={{ color: '#9ca3af' }}
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
            <a href="#get-started" className="flex-1 text-center px-4 py-2.5 text-sm font-medium text-surface-900 bg-white rounded-lg">
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
