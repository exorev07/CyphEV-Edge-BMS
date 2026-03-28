import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { LayoutDashboard, BarChart3, ScrollText, Settings as SettingsIcon, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { colors, fonts } from '../../lib/styles'
import { StatusIndicator } from './StatusIndicator'
import type { SystemStatus } from '../../types/bms'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard/overview' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Logs', icon: ScrollText, path: '/dashboard/logs' },
  { label: 'Settings', icon: SettingsIcon, path: '/dashboard/settings' },
]

interface SidebarProps {
  status: SystemStatus
}

export function Sidebar({ status }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  const width = collapsed ? 72 : 220

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <aside style={{
      width, minWidth: width, height: '100vh', position: 'sticky', top: 0,
      display: 'flex', flexDirection: 'column',
      background: 'rgba(255,255,255,0.02)',
      borderRight: '1px solid rgba(141,110,179,0.2)',
      transition: 'width 0.25s ease, min-width 0.25s ease',
      overflow: 'hidden',
      zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 20px',
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
        gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        minHeight: '64px',
      }}>
        <span style={{
          fontFamily: fonts.logo, fontSize: collapsed ? '18px' : '22px',
          fontWeight: 700, letterSpacing: '0.05em', color: '#fff', whiteSpace: 'nowrap',
        }}>
          {collapsed ? 'C' : 'CYPH'}
          <span style={{ color: colors.amethyst.light }}>{collapsed ? 'E' : 'EV'}</span>
        </span>
      </div>

      {/* Status */}
      <div style={{
        padding: collapsed ? '16px 0' : '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
        gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <StatusIndicator status={status} />
        {!collapsed && (
          <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted, whiteSpace: 'nowrap' }}>
            {status === 'NOMINAL' ? 'System Nominal' : status === 'WARNING' ? 'Warning' : 'Critical Alert'}
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path || (item.path === '/dashboard/overview' && location.pathname === '/dashboard')
          const hovered = hoveredItem === item.label
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: collapsed ? '12px 0' : '12px 14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: active ? 'rgba(121,71,189,0.15)' : hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'background 0.2s',
                width: '100%',
              }}
            >
              <Icon size={20} color={active ? colors.amethyst.light : colors.text.muted} strokeWidth={active ? 2.2 : 1.8} />
              {!collapsed && (
                <span style={{
                  fontFamily: fonts.body, fontSize: '14px', fontWeight: active ? 600 : 400,
                  color: active ? colors.amethyst.light : hovered ? colors.text.secondary : colors.text.muted,
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          onMouseEnter={() => setHoveredItem('collapse')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '10px 0' : '10px 14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: hoveredItem === 'collapse' ? 'rgba(255,255,255,0.04)' : 'transparent',
            width: '100%', transition: 'background 0.2s',
          }}
        >
          {collapsed ? <ChevronRight size={18} color={colors.text.muted} /> : <ChevronLeft size={18} color={colors.text.muted} />}
          {!collapsed && <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted }}>Collapse</span>}
        </button>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          onMouseEnter={() => setHoveredItem('signout')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '10px 0' : '10px 14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: hoveredItem === 'signout' ? 'rgba(255,255,255,0.04)' : 'transparent',
            width: '100%', transition: 'background 0.2s',
          }}
        >
          <LogOut size={18} color={colors.text.muted} />
          {!collapsed && <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted }}>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
