import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import carImage from '../assets/Audi_RS5_Auth.png'

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to Firebase Auth
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 80px', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideFromRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* Logo */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate('/') }}
        onMouseEnter={() => setHoveredBtn('logo')}
        onMouseLeave={() => setHoveredBtn(null)}
        style={{ textDecoration: 'none', marginBottom: '12px', transition: 'transform 0.2s', transform: hoveredBtn === 'logo' ? 'translateY(-2px)' : 'translateY(0)', animation: 'fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '32px', fontWeight: 600, letterSpacing: '0.05em', color: '#ffffff' }}>
          CYPH<span style={{ color: '#b18ddd' }}>EV</span>
        </span>
      </a>

      {/* Tagline */}
      <div style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 'clamp(1.5rem, 3vw, 32rem)',
        fontWeight: 800,
        lineHeight: 1.2,
        letterSpacing: '0.04em',
        marginBottom: '80px',
        background: 'linear-gradient(180deg, #c0c0c0 0%, #606060 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign: 'center',
        animation: 'fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both',
      }}>
        You're clear for takeoff. Let's secure the ride.
      </div>

      {/* Car + Form row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '60px' }}>

      {/* Left — Car image */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src={carImage}
          alt="Audi RS5"
          style={{
            width: '100%',
            maxWidth: '800px',
            objectFit: 'contain',
            animation: 'fadeSlideFromLeft 0.8s cubic-bezier(0.22,1,0.36,1) 1s both',
            mixBlendMode: 'lighten',
          }}
        />
      </div>

      {/* Right — Auth form */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Auth card */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          width: '420px',
          borderRadius: '16px',
          border: '1px solid rgba(141, 110, 179, 0.58)',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
          padding: '40px 32px',
          animation: 'fadeSlideFromRight 0.8s cubic-bezier(0.22,1,0.36,1) 1s both',
        }}>

        {/* Heading */}
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', fontWeight: 600, color: '#ffffff', textAlign: 'center', marginBottom: '4px', letterSpacing: '0.03em' }}>
          {mode === 'login' ? 'Welcome!' : 'Create Account'}
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#b18ddd', textAlign: 'center', marginBottom: '32px' }}>
          {mode === 'login' ? 'Sign in to your dashboard' : 'Get started with CyphEV'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {mode === 'register' && (
            <div>
              <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter Your Name"
                style={{
                  width: '100%',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  color: '#ffffffa9',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          )}

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter Account Email Address"
              style={{
                width: '100%',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: '#ffffffa9',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '10px 14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <div>
            <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter Your Password"
              style={{
                width: '100%',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: '#ffffffa9',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '10px 14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            onMouseEnter={() => setHoveredBtn('submit')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: hoveredBtn === 'submit' ? '#ffffff' : '#08080a',
              background: hoveredBtn === 'submit' ? '#b18ddd' : '#ffffff',
              border: 'none',
              borderRadius: '15px',
              padding: '10px 18px',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
              boxShadow: hoveredBtn === 'submit' ? '0 0 24px rgba(121,71,189,0.65)' : 'none',
              transform: hoveredBtn === 'submit' ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#4b5563' }}>or</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
        </div>

        {/* Toggle mode */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            onMouseEnter={() => setHoveredBtn('toggle')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{ color: '#b18ddd', cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s' }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>

        {/* Back to home */}
        <button
          onClick={() => navigate('/')}
          onMouseEnter={() => setHoveredBtn('back')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: '24px',
            transition: 'color 0.2s, transform 0.2s',
            transform: hoveredBtn === 'back' ? 'translateY(-1px)' : 'translateY(0)',
            ...(hoveredBtn === 'back' ? { color: '#9ca3af' } : {}),
            animation: 'fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 1.6s both',
          }}
        >
          ← Back to home
        </button>
      </div>
      </div>
    </div>
  )
}
