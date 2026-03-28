import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase'

export function DashboardPage() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <span style={{ fontFamily: "'Bitcount Grid Single', monospace", fontSize: '32px', fontWeight: 600, letterSpacing: '0.05em', color: '#ffffff' }}>
        CYPH<span style={{ color: '#b18ddd' }}>EV</span>
      </span>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#9ca3af', fontSize: '16px' }}>
        Dashboard coming soon.
      </p>
      <button
        onClick={handleSignOut}
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#08080a', background: '#ffffff', border: 'none', borderRadius: '15px', padding: '8px 20px', cursor: 'pointer' }}
      >
        Sign Out
      </button>
    </div>
  )
}
