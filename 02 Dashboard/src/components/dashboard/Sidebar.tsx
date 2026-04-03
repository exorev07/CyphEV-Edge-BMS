import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { LayoutDashboard, BarChart3, ScrollText, Settings as SettingsIcon, LogOut, ChevronLeft, ChevronRight, Info, X, BatteryCharging, Navigation, Heart, RotateCw, Thermometer, Cpu, Bell, Wind } from 'lucide-react'
import { colors, fonts, glassCard } from '../../lib/styles'
import type { SystemStatus } from '../../types/bms'

const FEATURE_INFO = [
  { icon: BatteryCharging, label: 'State of Charge', desc: 'How much charge is left in the battery right now - shown as a percentage of the full capacity.' },
  { icon: Navigation, label: 'Estimated Range', desc: 'How far the car can travel based on the current state of charge - estimated from recent driving behavior, energy usage and environmental factors.' },
  { icon: Heart, label: 'State of Health', desc: "A measure of the battery's overall condition compared to when it was new. 100% means perfect - the closer it gets to 0%, the more the battery has degraded over time." },
  { icon: RotateCw, label: 'Remaining Useful Life', desc: 'An estimate of how many more full charge-discharge cycles the battery can handle before it needs replacing. One cycle = charging from empty to full once.' },
  { icon: Wind, label: 'Fan Status', desc: 'The cooling fan activates automatically when pack temperature exceeds 35°C, helping dissipate heat and protect the battery. It stays on until the temperature drops back to a safe range.' },
  { icon: Thermometer, label: 'Battery & Ambient Temp', desc: "Pack temp is the battery's internal heat - high temperatures accelerate degradation and can trigger the cooling fan to maintain temperature or relay disconnection when beyond safe limits, to protect the pack. Ambient temp is the environmental temperature, in and around the vehicle." },
  { icon: Cpu, label: 'Sensor Readings', desc: "Live readings from the vehicles onboard sensors - highlighted in red when a value exceeds safe thresholds." },
  { icon: Bell, label: 'Recent Events', desc: 'The 4 most recent system events - faults, anomalies, and relay actions. Critical alerts appear in red, severe in orange, and informational in yellow. Visit Logs for the full history.' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard/overview' },
  { label: 'Analytics', icon: BarChart3, path: '/dashboard/analytics' },
  { label: 'Logs', icon: ScrollText, path: '/dashboard/logs' },
]

interface SidebarProps {
  status: SystemStatus
}

export function Sidebar({ status }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [closingInfo, setClosingInfo] = useState(false)

  const openInfo = () => setShowInfo(true)
  const closeInfo = () => {
    setClosingInfo(true)
    setTimeout(() => { setShowInfo(false); setClosingInfo(false) }, 250)
  }
  const navigate = useNavigate()
  const location = useLocation()

  const width = collapsed ? 72 : 200

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
        padding: '0 12px 0 20px',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        minHeight: '64px', gap: '8px',
      }}>
        {!collapsed && (
          <span style={{
            fontFamily: fonts.logo, fontSize: '22px',
            fontWeight: 700, letterSpacing: '0.05em', color: '#fff', whiteSpace: 'nowrap',
          }}>
            CYPH<span style={{ color: colors.amethyst.light }}>EV</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          onMouseEnter={() => setHoveredItem('collapse')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
            background: hoveredItem === 'collapse' ? 'rgba(121,71,189,0.18)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${hoveredItem === 'collapse' ? 'rgba(177,141,221,0.35)' : 'rgba(255,255,255,0.08)'}`,
            backdropFilter: 'blur(8px)',
            flexShrink: 0, transition: 'background 0.2s',
          }}
        >
          {collapsed ? <ChevronRight size={18} color={colors.text.secondary} /> : <ChevronLeft size={18} color={colors.text.secondary} />}
        </button>
      </div>

      {/* Status */}
      {(() => {
        const statusColor =
          status === 'CRITICAL' ? colors.status.critical :
          status === 'SEVERE' ? '#f97316' :
          status === 'WARNING' ? colors.status.warning :
          colors.status.nominal
        const label = status === 'NOMINAL' ? 'System Nominal' : status === 'WARNING' ? 'Attention' : status === 'SEVERE' ? 'Severe' : 'Critical'
        return (
          <div style={{ padding: '12px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
            {collapsed ? (
              <div style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '10px 0', borderRadius: '10px',
                background: `${statusColor}14`,
                transition: 'background 0.4s',
              }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: statusColor, boxShadow: `0 0 6px ${statusColor}`,
                  transition: 'background 0.4s, box-shadow 0.4s',
                }} />
              </div>
            ) : (
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '6px 14px', borderRadius: '20px',
                background: `${statusColor}14`,
                border: `1px solid ${statusColor}40`,
                transition: 'background 0.4s, border-color 0.4s',
              }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: '11px', fontWeight: 600,
                  color: statusColor, whiteSpace: 'nowrap',
                  transition: 'color 0.4s',
                }}>
                  {label}
                </span>
              </div>
            )}
          </div>
        )
      })()}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                padding: collapsed ? '9px 0' : '9px 14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '10px', cursor: 'pointer',
                border: active ? '1px solid rgba(177,141,221,0.35)' : '1px solid rgba(177,141,221,0.18)',
                background: active ? 'rgba(121,71,189,0.15)' : hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'background 0.2s',
                width: '100%',
              }}
            >
              <Icon size={20} color={active ? colors.amethyst.light : colors.text.secondary} strokeWidth={active ? 2.2 : 1.8} />
              {!collapsed && (
                <span style={{
                  fontFamily: fonts.body, fontSize: '14px', fontWeight: active ? 600 : 400,
                  color: active ? colors.amethyst.light : hovered ? colors.text.primary : colors.text.secondary,
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
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Info button */}
        <button
          onClick={() => openInfo()}
          onMouseEnter={() => setHoveredItem('info')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '8px 0' : '8px 14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: '10px', cursor: 'pointer',
            border: '1px solid rgba(177,141,221,0.18)',
            background: hoveredItem === 'info' ? 'rgba(121,71,189,0.1)' : 'transparent',
            width: '100%', transition: 'background 0.2s',
          }}
        >
          <Info size={18} color={hoveredItem === 'info' ? colors.amethyst.light : colors.text.secondary} style={{ transition: 'color 0.2s' }} />
          {!collapsed && <span style={{ fontFamily: fonts.body, fontSize: '13px', color: hoveredItem === 'info' ? colors.amethyst.light : colors.text.secondary, transition: 'color 0.2s' }}>About Cards</span>}
        </button>
        {/* Settings button */}
        {(() => {
          const active = location.pathname === '/dashboard/settings'
          const hovered = hoveredItem === 'settings'
          return (
            <button
              onClick={() => navigate('/dashboard/settings')}
              onMouseEnter={() => setHoveredItem('settings')}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: collapsed ? '9px 0' : '9px 14px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '10px', cursor: 'pointer',
                border: active ? '1px solid rgba(177,141,221,0.35)' : '1px solid rgba(177,141,221,0.18)',
                background: active ? 'rgba(121,71,189,0.15)' : hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                transition: 'background 0.2s', width: '100%',
              }}
            >
              <SettingsIcon size={20} color={active ? colors.amethyst.light : colors.text.secondary} strokeWidth={active ? 2.2 : 1.8} />
              {!collapsed && (
                <span style={{
                  fontFamily: fonts.body, fontSize: '14px', fontWeight: active ? 600 : 400,
                  color: active ? colors.amethyst.light : hovered ? colors.text.primary : colors.text.secondary,
                  whiteSpace: 'nowrap',
                }}>
                  Settings
                </span>
              )}
            </button>
          )
        })()}
        {/* Sign out */}
        <button
          onClick={handleSignOut}
          onMouseEnter={() => setHoveredItem('signout')}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: collapsed ? '8px 0' : '8px 14px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: '10px', border: '1px solid rgba(177,141,221,0.18)', cursor: 'pointer',
            background: hoveredItem === 'signout' ? 'rgba(255,255,255,0.04)' : 'transparent',
            width: '100%', transition: 'background 0.2s',
          }}
        >
          <LogOut size={18} color={hoveredItem === 'signout' ? colors.text.primary : colors.text.secondary} />
          {!collapsed && <span style={{ fontFamily: fonts.body, fontSize: '13px', color: hoveredItem === 'signout' ? colors.text.primary : colors.text.secondary }}>Sign Out</span>}
        </button>
      </div>
      {/* Info Modal */}
      {showInfo && (
        <div
          onClick={() => closeInfo()}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              ...glassCard,
              background: 'rgba(12,10,18,0.45)',
              width: '1080px', maxWidth: '90vw', maxHeight: '90vh',
              padding: '36px', overflowY: 'auto',
              border: '1px solid rgba(141,110,179,0.35)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(141,110,179,0.1)',
              animation: closingInfo
                ? 'modalFadeOut 0.25s cubic-bezier(0.4,0,1,1) forwards'
                : 'modalFadeIn 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <h2 style={{
                  fontFamily: fonts.heading, fontSize: '26px', fontWeight: 400,
                  color: colors.amethyst.light,
                  margin: '0 0 6px', letterSpacing: '-0.01em',
                }}>
                  Dashboard Guide
                </h2>
                <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary, margin: 0 }}>
                  Hover over any card's icon box for quick info. Here's a full overview.
                </p>
              </div>
              <button
                onClick={() => closeInfo()}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0, marginLeft: '16px',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <X size={15} color={colors.text.secondary} />
              </button>
            </div>

            {/* Feature cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {FEATURE_INFO.map(({ icon: Icon, label, desc }) => (
                <div key={label} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(141,110,179,0.18)',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(121,71,189,0.12)', border: '1px solid rgba(141,110,179,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={17} color={colors.amethyst.light} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: colors.text.secondary, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary, lineHeight: 1.4, textAlign: 'justify' }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
