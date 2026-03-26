import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, confirmPasswordReset, sendEmailVerification, applyActionCode, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import carImage from '../assets/Audi_RS5_Auth.png'

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login')
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [newPassword, setNewPassword] = useState('')
  const [oobCode, setOobCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)
  const [resetDone, setResetDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [verifySent, setVerifySent] = useState(false)
  const [verifyDone, setVerifyDone] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlMode = params.get('mode')
    const code = params.get('oobCode')
    if (urlMode === 'resetPassword' && code) {
      setOobCode(code); setMode('reset')
    } else if (urlMode === 'verifyEmail' && code) {
      applyActionCode(auth, code)
        .then(() => {
          const savedEmail = localStorage.getItem('cyphev_pending_email') ?? ''
          localStorage.removeItem('cyphev_pending_email')
          setFormData(fd => ({ ...fd, email: savedEmail }))
          setVerifyDone(true)
          setMode('login')
        })
        .catch(() => {
          setError('Verification link has expired or already been used.')
          setMode('login')
        })
    }
  }, [])

  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      setMode('login'); setResetSent(false); setResetDone(false); setNewPassword(''); navigate('/auth', { replace: true })
      return
    }
    const t = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'reset') {
        await confirmPasswordReset(auth, oobCode!, newPassword)
        setResetDone(true); setCountdown(5)
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, formData.email)
        setResetSent(true)
      } else if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        if (formData.name) await updateProfile(cred.user, { displayName: formData.name })
        await sendEmailVerification(cred.user)
        localStorage.setItem('cyphev_pending_email', formData.email)
        await signOut(auth)
        setVerifySent(true)
      } else {
        const cred = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        if (!cred.user.emailVerified) {
          await signOut(auth)
          setError('Please verify your email before signing in. Check your inbox.')
          return
        }
        navigate('/dashboard')
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      if (code === 'auth/email-already-in-use') setError('An account with this email already exists.')
      else if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') setError('Invalid email or password.')
      else if (code === 'auth/weak-password') setError('Password must be at least 6 characters.')
      else if (code === 'auth/invalid-email') setError('Please enter a valid email address.')
      else if (code === 'auth/invalid-action-code') setError('This reset link has expired or already been used.')
      else setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 80px', paddingTop: '190px', position: 'relative', overflow: 'hidden' }}>

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

      {/* Logo + Tagline — fixed at top, won't shift with card height */}
      <div style={{ position: 'absolute', top: '32px', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/') }}
          onMouseEnter={() => setHoveredBtn('logo')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{ textDecoration: 'none', transition: 'transform 0.2s', transform: hoveredBtn === 'logo' ? 'translateY(-2px)' : 'translateY(0)', animation: 'fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '32px', fontWeight: 600, letterSpacing: '0.05em', color: '#ffffff' }}>
            CYPH<span style={{ color: '#b18ddd' }}>EV</span>
          </span>
        </a>

        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(1.5rem, 3vw, 32rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '0.04em',
          background: 'linear-gradient(180deg, #c0c0c0 0%, #606060 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          animation: 'fadeSlideDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both',
        }}>
          You're clear for takeoff. Let's secure the ride.
        </div>
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
          {verifySent ? 'Check Your Email' : mode === 'login' ? 'Welcome!' : mode === 'register' ? 'Create Account' : 'Password Reset'}
        </h1>
        {!resetSent && !resetDone && !verifySent && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#b18ddd', textAlign: 'center', marginBottom: '32px' }}>
            {mode === 'login' ? 'Sign in to your dashboard' : mode === 'register' ? 'Get started with CyphEV' : mode === 'reset' ? 'Choose a new password for your account' : 'We\'ll send a reset link to your email'}
          </p>
        )}

        {(resetSent || resetDone || verifySent) ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#9ca3af', marginBottom: '24px', lineHeight: 1.6 }}>
              {resetSent
                ? 'Reset email sent! Check your inbox and follow the link to set a new password.'
                : verifySent
                ? 'Verification email sent! Click the link in your inbox to verify and complete your registration.'
                : 'Password updated! You can now sign in with your new password.'}
            </p>
            <button
              onClick={() => { setMode('login'); setResetSent(false); setResetDone(false); setVerifySent(false); setNewPassword(''); setCountdown(null); navigate('/auth', { replace: true }) }}
              onMouseEnter={() => setHoveredBtn('backtologin')}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: hoveredBtn === 'backtologin' ? '#ffffff' : '#9ca3af',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(141,110,179,0.4)',
                borderRadius: '15px',
                padding: '5px 14px',
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                transition: 'color 0.2s, box-shadow 0.2s, transform 0.2s',
                boxShadow: hoveredBtn === 'backtologin' ? '0 0 24px rgba(121,71,189,0.65)' : 'none',
                transform: hoveredBtn === 'backtologin' ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {resetDone && countdown !== null ? `Back to Sign in (${countdown})` : 'Back to Sign in'}
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {mode === 'reset' ? (
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                    style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              ) : (
                <>
                  {mode === 'register' && (
                    <div>
                      <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter Your Name"
                        style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
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
                      style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  {mode !== 'forgot' && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af' }}>Password</label>
                        {mode === 'login' && (
                          <span
                            onClick={() => { setMode('forgot'); setError(null) }}
                            onMouseEnter={() => setHoveredBtn('forgot')}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: hoveredBtn === 'forgot' ? '#b18ddd' : '#6b7280', cursor: 'pointer', transition: 'color 0.2s' }}
                          >
                            Forgot password?
                          </span>
                        )}
                      </div>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter Your Password"
                        style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                        onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
                        onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                  )}
                </>
              )}

              {verifyDone && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#9ca3af', textAlign: 'center', marginTop: '4px' }}>
                  Email verified! Enter your password to sign in.
                </p>
              )}

              {error && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#f87171', textAlign: 'center', marginTop: '4px' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setHoveredBtn('submit')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  color: hoveredBtn === 'submit' && !loading ? '#ffffff' : '#08080a',
                  background: hoveredBtn === 'submit' && !loading ? '#b18ddd' : '#ffffff',
                  border: 'none',
                  borderRadius: '15px',
                  padding: '10px 18px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: '8px',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s',
                  boxShadow: hoveredBtn === 'submit' && !loading ? '0 0 24px rgba(121,71,189,0.65)' : 'none',
                  transform: hoveredBtn === 'submit' && !loading ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                {loading
                  ? (mode === 'login' ? 'Signing in...' : mode === 'register' ? 'Creating account...' : mode === 'reset' ? 'Updating...' : 'Sending...')
                  : (mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : mode === 'reset' ? 'Set New Password' : 'Send Reset Email')}
              </button>
            </form>

            {mode !== 'reset' && (
              <>
                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#4b5563' }}>or</span>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)' }} />
                </div>

                {/* Toggle mode */}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
                  {mode === 'forgot'
                    ? 'Remember your password? '
                    : mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <span
                    onClick={() => { setMode(mode === 'register' ? 'login' : mode === 'forgot' ? 'login' : 'register'); setError(null) }}
                    onMouseEnter={() => setHoveredBtn('toggle')}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{ color: '#b18ddd', cursor: 'pointer', fontWeight: 500, transition: 'color 0.2s' }}
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </span>
                </p>
              </>
            )}
          </>
        )}
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
