import { useState } from 'react'
import { auth } from '../../lib/firebase'
import { GlassCard } from '../../components/dashboard/GlassCard'
import { fonts, colors } from '../../lib/styles'

export default function SettingsPage() {
  const user = auth.currentUser
  const [refreshRate, setRefreshRate] = useState('2')
  const [notifications, setNotifications] = useState({
    critical: true,
    attention: true,
    soc: true,
    thermal: true,
  })

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '40px', height: '22px', borderRadius: '11px', border: 'none', cursor: 'pointer',
        background: checked ? colors.amethyst.mid : 'rgba(255,255,255,0.1)',
        position: 'relative', transition: 'background 0.2s',
      }}
    >
      <div style={{
        width: '16px', height: '16px', borderRadius: '50%', background: '#fff',
        position: 'absolute', top: '3px',
        left: checked ? '21px' : '3px',
        transition: 'left 0.2s',
      }} />
    </button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '24px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
          Settings
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted, marginTop: '4px' }}>
          Configure your dashboard preferences
        </p>
      </div>

      {/* Profile */}
      <GlassCard title="Profile">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.text.secondary }}>Name</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.primary }}>{user?.displayName || '—'}</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.text.secondary }}>Email</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.primary }}>{user?.email || '—'}</span>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.text.secondary }}>Email Verified</span>
            <span style={{
              fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
              padding: '3px 10px', borderRadius: '6px',
              background: user?.emailVerified ? 'rgba(52,211,153,0.1)' : 'rgba(251,191,36,0.1)',
              color: user?.emailVerified ? colors.status.nominal : colors.status.warning,
            }}>
              {user?.emailVerified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Data */}
      <GlassCard title="Data Refresh">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.text.secondary }}>Refresh Rate</span>
            <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted, marginTop: '2px' }}>
              How often telemetry data updates
            </div>
          </div>
          <div style={{ display: 'flex', gap: '4px', padding: '4px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {['1', '2', '5'].map((r) => (
              <button
                key={r}
                onClick={() => setRefreshRate(r)}
                style={{
                  fontFamily: fonts.mono, fontSize: '12px', fontWeight: 500,
                  padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: refreshRate === r ? 'rgba(121,71,189,0.2)' : 'transparent',
                  color: refreshRate === r ? colors.amethyst.light : colors.text.muted,
                  transition: 'background 0.2s',
                }}
              >
                {r}s
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard title="Notification Preferences">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { key: 'critical' as const, label: 'Critical Alerts', desc: 'Relay disconnect, thermal runaway, leaks, swelling' },
            { key: 'attention' as const, label: 'Attention Required', desc: 'Capacity fade, voltage/current anomalies' },
            { key: 'soc' as const, label: 'Low SoC Warnings', desc: 'Alert when battery drops below 20%' },
            { key: 'thermal' as const, label: 'Thermal Warnings', desc: 'Fan activation and high temperature alerts' },
          ].map((item, i) => (
            <div key={item.key}>
              {i > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '16px' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.text.secondary }}>{item.label}</span>
                  <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.text.muted, marginTop: '2px' }}>{item.desc}</div>
                </div>
                <Toggle checked={notifications[item.key]} onChange={(v) => setNotifications((n) => ({ ...n, [item.key]: v }))} />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* About */}
      <GlassCard title="About">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted }}>Version</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '13px', color: colors.text.secondary }}>1.0.0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted }}>Platform</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '13px', color: colors.text.secondary }}>ESP32 Edge + Firebase</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted }}>Built by</span>
            <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary }}>Ekansh Arohi & Akshita Sondhi</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
