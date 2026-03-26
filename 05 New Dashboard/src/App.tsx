import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from './lib/firebase'
import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | 'loading'>('loading')
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])
  if (user === 'loading') return null
  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}

function RootRoute() {
  const params = new URLSearchParams(window.location.search)
  const mode = params.get('mode')
  if (mode === 'resetPassword' || mode === 'verifyEmail') {
    return <Navigate to={`/auth${window.location.search}`} replace />
  }
  return <LandingPage />
}

function App() {
  return (
    <div className="min-h-screen w-full bg-[#08080a] text-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
