import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, confirmPasswordReset, sendEmailVerification, applyActionCode, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'
import carImage from '../assets/Audi_RS5_Auth.png'
import { Eye, EyeOff } from 'lucide-react'

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
  const verifyAttempted = useRef(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlMode = params.get('mode')
    const code = params.get('oobCode')
    if (urlMode === 'resetPassword' && code) {
      setOobCode(code); setMode('reset')
    } else if (urlMode === 'verifyEmail' && code) {
      if (verifyAttempted.current) return
      verifyAttempted.current = true
      applyActionCode(auth, code)
        .then(() => {
          const savedEmail = localStorage.getItem('cyphev_pending_email') ?? ''
          localStorage.removeItem('cyphev_pending_email')
          localStorage.removeItem('cyphev_verify_sent')
          setFormData(fd => ({ ...fd, email: savedEmail }))
          setVerifySent(false)
          setCountdown(null)
          setVerifyDone(true)
          setMode('login')
        })
        .catch(() => {
          localStorage.removeItem('cyphev_verify_sent')
          setVerifySent(false)
          setCountdown(null)
          setError('Verification link has expired or already been used.')
          setMode('login')
        })
    }
    if (localStorage.getItem('cyphev_verify_sent')) {
      setVerifySent(true)
      setCountdown(10)
    }
  }, [])

  useEffect(() => {
    if (countdown === null) return
    if (countdown === 0) {
      if (verifySent || resetSent) {
        window.close()
        setTimeout(() => navigate('/', { replace: true }), 300)
      } else {
        const savedEmail = localStorage.getItem('cyphev_reset_email') ?? ''
        localStorage.removeItem('cyphev_reset_email')
        setFormData(fd => ({ ...fd, email: savedEmail }))
        setMode('login'); setResetSent(false); setResetDone(false); setNewPassword(''); setCountdown(null); window.history.replaceState(null, '', '/auth')
      }
      return
    }
    const t = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, navigate, verifySent, resetSent])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if (mode === 'login' && !formData.email) return setError('Please enter your email.')
    if (mode === 'login' && !formData.password) return setError('Please enter your password.')
    if (mode === 'register' && !formData.email) return setError('Please enter your email.')
    if (mode === 'register' && !formData.password) return setError('Please enter a password.')
    if (mode === 'forgot' && !formData.email) return setError('Please enter your email.')
    if (mode === 'reset' && !newPassword) return setError('Please enter a new password.')
    setLoading(true)
    try {
      if (mode === 'reset') {
        await confirmPasswordReset(auth, oobCode!, newPassword)
        setResetDone(true); setCountdown(5)
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, formData.email)
        localStorage.setItem('cyphev_reset_email', formData.email)
        setResetSent(true)
        setCountdown(10)
      } else if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        if (formData.name) await updateProfile(cred.user, { displayName: formData.name })
        await sendEmailVerification(cred.user)
        localStorage.setItem('cyphev_pending_email', formData.email)
        localStorage.setItem('cyphev_verify_sent', 'true')
        await signOut(auth)
        setVerifySent(true)
        setCountdown(10)
      } else {
        const cred = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        await cred.user.reload()
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 80px', paddingTop: '140px', position: 'relative', overflow: 'hidden' }}>

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
        input[type="password"] { height: 40px !important; box-sizing: border-box !important; }
        input[type="password"]:not(:placeholder-shown) { font-size: 18px !important; letter-spacing: 1px !important; line-height: 1 !important; }
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
          fontSize: 'clamp(1.5rem, 3vw, 5rem)',
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '60px', width: '100%', maxWidth: '1400px' }}>

      {/* Left — Car image */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', maxWidth: '800px' }}>
        <img
          src={carImage}
          alt="Audi RS5"
          style={{
            width: '100%',
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
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', fontWeight: 600, color: '#ffffff', textAlign: 'center', marginBottom: (resetSent || resetDone || verifySent) ? '16px' : '0px', letterSpacing: '0.03em' }}>
          {verifySent ? 'Check Your Email' : verifyDone ? 'Email Verified!' : mode === 'login' ? 'Welcome!' : mode === 'register' ? 'Create Account' : 'Password Reset'}
        </h1>
        {!resetSent && !resetDone && !verifySent && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#b18ddd', textAlign: 'center', marginBottom: '32px' }}>
            {mode === 'login' ? 'Sign in to your dashboard' : mode === 'register' ? 'Get started with CyphEV' : mode === 'reset' ? 'Choose a new password for your account' : 'We\'ll send a reset link to your email'}
          </p>
        )}

        {(resetSent || resetDone || verifySent) ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#9ca3af', marginBottom: '24px', lineHeight: 1.4, textAlign: 'justify' }}>
              {resetSent
                ? 'Reset email sent! Check your Inbox and follow the link to reset your password. If no email arrives, please check your Spam folder, and also make sure that this address was used before to register - if not, please sign up instead.'
                : verifySent
                ? 'Verification email sent! Click the link sent to you in your inbox to verify your email address and complete your registration.'
                : 'Password updated! You can now sign in with your new password.'}
            </p>
            <button
              onClick={() => { if (verifySent || resetSent) { localStorage.removeItem('cyphev_verify_sent'); localStorage.removeItem('cyphev_reset_email'); navigate('/', { replace: true }); return } const savedEmail = localStorage.getItem('cyphev_reset_email') ?? ''; localStorage.removeItem('cyphev_reset_email'); setFormData(fd => ({ ...fd, email: savedEmail })); setMode('login'); setResetDone(false); setNewPassword(''); setCountdown(null); setShowPassword(false); setShowNewPassword(false); window.history.replaceState(null, '', '/auth') }}
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
              {(verifySent || resetSent) && countdown !== null ? `Closing this window... (${countdown})` : resetDone && countdown !== null ? `Back to Sign in (${countdown})` : 'Back to Sign in'}
            </button>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {mode === 'reset' ? (
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, color: '#9ca3af', display: 'block', marginBottom: '6px' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter New Password"
                      style={{ width: '100%', height: '40px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 40px 10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} onMouseEnter={() => setHoveredBtn('eyeNew')} onMouseLeave={() => setHoveredBtn(null)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: hoveredBtn === 'eyeNew' ? '#b18ddd' : '#6b7280', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                      {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
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
                        style={{ width: '100%', height: '40px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
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
                      style={{ width: '100%', height: '40px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
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
                            onClick={() => { setMode('forgot'); setError(null); setShowPassword(false); setVerifyDone(false) }}
                            onMouseEnter={() => setHoveredBtn('forgot')}
                            onMouseLeave={() => setHoveredBtn(null)}
                            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: hoveredBtn === 'forgot' ? '#b18ddd' : '#6b7280', cursor: 'pointer', transition: 'color 0.2s' }}
                          >
                            Forgot password?
                          </span>
                        )}
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Enter Your Password"
                          style={{ width: '100%', height: '40px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#ffffffa9', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 40px 10px 14px', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                          onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(121,71,189,0.5)'}
                          onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} onMouseEnter={() => setHoveredBtn('eye')} onMouseLeave={() => setHoveredBtn(null)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: hoveredBtn === 'eye' ? '#b18ddd' : '#6b7280', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
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
                  : (mode === 'login' ? 'Sign In' : mode === 'register' ? 'Submit' : mode === 'reset' ? 'Password Reset' : 'Send Reset Email')}
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
                    onClick={() => { setMode(mode === 'register' ? 'login' : mode === 'forgot' ? 'login' : 'register'); setError(null); setFormData(fd => ({ ...fd, password: '' })); setShowPassword(false); setShowNewPassword(false); setVerifyDone(false) }}
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
      </div>
      </div>

      {/* Back to home — centered at bottom */}
      <div style={{ position: 'absolute', bottom: '32px', left: 0, right: 0, display: 'flex', justifyContent: 'center', animation: 'fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 1.6s both' }}>
        <button
          onClick={() => navigate('/')}
          onMouseEnter={() => setHoveredBtn('back')}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            color: hoveredBtn === 'back' ? '#9ca3af' : '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s, transform 0.2s',
            transform: hoveredBtn === 'back' ? 'translateY(-1px)' : 'translateY(0)',
          }}
        >
          ← Back to home
        </button>
      </div>
    </div>
  )
}
