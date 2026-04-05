import { useState } from 'react'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { Gauge, Zap, Heart, Thermometer, Droplets, Wind, Activity, Bolt, RotateCw, Power, Cable, BatteryCharging, Navigation, Cpu, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { useBMS } from '../../components/dashboard/DashboardLayout'
import { GlassCard } from '../../components/dashboard/GlassCard'
import { RadialGauge } from '../../components/dashboard/RadialGauge'
import { StatCard } from '../../components/dashboard/StatCard'
import { SensorTile } from '../../components/dashboard/SensorTile'
import { MiniAlertPanel } from '../../components/dashboard/MiniAlertPanel'
import { SocTimeChart } from '../../components/dashboard/charts/SocTimeChart'
import { RangeSocChart } from '../../components/dashboard/charts/RangeSocChart'
import { TemperatureChart } from '../../components/dashboard/charts/TemperatureChart'
import { fonts, colors, chartColors, glassCard } from '../../lib/styles'

function TipIconBox({ icon: Icon, tooltip, tipWidth = '210px' }: { icon: React.ElementType; tooltip: string; tipWidth?: string }) {
  const [show, setShow] = useState(false)
  return (
    <div style={{ position: 'relative' }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
        <Icon size={16} color={colors.text.muted} />
      </div>
      {show && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 10px)', right: 0, width: tipWidth,
          padding: '10px 13px', background: 'rgba(10,8,16,0.94)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(141,110,179,0.28)', borderRadius: '10px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(141,110,179,0.06)',
          fontFamily: fonts.body, fontSize: '12px', color: colors.text.secondary,
          lineHeight: 1.55, zIndex: 50, pointerEvents: 'none', textAlign: 'justify',
        }}>
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default function OverviewPage() {
  const { data, history, alerts, addAlert, relayOverride, setRelayOverride, disconnectCause, setDisconnectCause, relayLatchedRef } = useBMS()
  const [showRelayModal, setShowRelayModal] = useState(false)
  const [relayPassword, setRelayPassword] = useState('')
  const [relayAuthError, setRelayAuthError] = useState('')
  const [relayLoading, setRelayLoading] = useState(false)
  const [showRelayPassword, setShowRelayPassword] = useState(false)

  const isDemo = auth.currentUser?.email === 'demo@cyphev.app'

  const isRelayConnected = relayOverride

  const cutoff = Date.now() - 30_000
  const recentCodes = new Set(alerts.filter(a => a.timestamp >= cutoff).map(a => a.code))
  const hasAlert = (code: string) => recentCodes.has(code)

  const openRelayModal = () => {
    setRelayPassword('')
    setRelayAuthError('')
    setShowRelayModal(true)
  }

  const handleRelayToggle = async () => {
    const wantConnect = !isRelayConnected
    if (!wantConnect) {
      // Disconnecting — no password needed
      const ts = Date.now()
      relayLatchedRef.current = true
      setRelayOverride(false)
      setDisconnectCause({ message: 'Manually Disconnected', timestamp: ts })
      addAlert({ id: `rly-${ts}`, code: 'RLY-01', message: 'Relay manually disconnected by operator', severity: 'ATTENTION_REQUIRED', timestamp: ts, action: 'Relay Disconnected' })
      setShowRelayModal(false)
      return
    }
    // Reconnecting — requires password
    const user = auth.currentUser
    if (!user || !user.email) { setRelayAuthError('No authenticated user'); return }
    setRelayLoading(true)
    setRelayAuthError('')
    try {
      const cred = EmailAuthProvider.credential(user.email, relayPassword)
      await reauthenticateWithCredential(user, cred)
      const ts = Date.now()
      setRelayOverride(true)
      setDisconnectCause(null)
      relayLatchedRef.current = false
      addAlert({ id: `rly-${ts}`, code: 'RLY-02', message: 'Relay reconnected after admin verification', severity: 'ATTENTION_REQUIRED', timestamp: ts, action: 'Relay Reconnected' })
      setShowRelayModal(false)
    } catch {
      setRelayAuthError('Incorrect password')
    } finally {
      setRelayLoading(false)
    }
  }

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: fonts.body, color: colors.text.muted }}>
      Initializing telemetry...
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 1.5vw, 24px)', maxWidth: '1800px', margin: '0 auto', width: '100%' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: fonts.heading, fontSize: '24px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
            Dashboard Overview
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary, marginTop: '4px', marginBottom: 0 }}>
            {isDemo ? 'Simulated data · Updated every 2s' : 'Live ESP32 telemetry · Updated every 3s'}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '15px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `1px solid ${colors.amethyst.light}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7, flexShrink: 0 }}>
            <span style={{ fontFamily: fonts.mono, fontSize: '10px', fontWeight: 700, color: colors.amethyst.light, lineHeight: 1 }}>i</span>
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.amethyst.light }}>
            Hover over card icons to learn more
          </span>
        </div>
      </div>


      {/* === Row 1: Vehicle Dynamics + Relay Status === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(12px, 1vw, 16px)' }}>
        <GlassCard title="Vehicle Dynamics" style={{ gridColumn: 'span 3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px' }}>
            <RadialGauge value={data.velocity} max={180} label="Speed" unit="km/h" color={chartColors.secondary} decimals={1} />
            <RadialGauge value={data.throttle} max={100} label="Throttle" unit="%" color={chartColors.secondary} />
            <RadialGauge value={data.motorTorque} max={500} label="Torque" unit="Nm" color={chartColors.secondary} decimals={1} />
            <RadialGauge value={Math.abs(data.longitudinalAccel)} max={6} label="Accel" unit="m/s²" color={chartColors.secondary} decimals={2} />
            <RadialGauge value={data.elevation} max={1000} label="Elevation" unit="m" color={chartColors.secondary} />
          </div>
        </GlassCard>
        {(() => {
          const isConn = isRelayConnected
          return (
            <GlassCard style={{ display: 'flex', flexDirection: 'column', paddingBottom: '12px' }}>
              {/* Header row with title + status badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '-10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <h3 style={{
                    fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
                    color: colors.text.secondary, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0,
                  }}>
                    Relay Status
                  </h3>
                  <span style={{
                    fontFamily: fonts.mono, fontSize: '11px', color: colors.text.muted,
                    opacity: disconnectCause ? 1 : 0, transition: 'opacity 0.3s',
                  }}>
                    {disconnectCause ? new Date(disconnectCause.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '4px 10px', borderRadius: '20px',
                    background: isConn ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)',
                    border: `1px solid ${isConn ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.25)'}`,
                  }}>
                    <span style={{
                      fontFamily: fonts.mono, fontSize: '10px', fontWeight: 600,
                      color: isConn ? colors.status.nominal : colors.status.critical,
                    }}>
                      {isConn ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                  </div>
                  <button
                    onClick={openRelayModal}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
                      background: 'rgba(121,71,189,0.12)', border: '1px solid rgba(141,110,179,0.35)',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(121,71,189,0.22)'
                      e.currentTarget.style.borderColor = 'rgba(141,110,179,0.6)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(121,71,189,0.12)'
                      e.currentTarget.style.borderColor = 'rgba(141,110,179,0.35)'
                    }}
                  >
                    <Power size={15} color={colors.amethyst.light} />
                  </button>
                </div>
              </div>
              {/* Plug & Socket SVG */}
              <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '16px' }}>
                {(() => {
                  const fill = isConn ? colors.amethyst.light : colors.text.muted
                  const fillDark = isConn ? colors.amethyst.mid : 'rgba(75,85,99,0.8)'
                  const op = 1
                  const tr = { transition: 'fill 0.6s, opacity 0.6s' }
                  // All coords on a 200x100 canvas, centered at y=50
                  return (
                    <svg width="240" height="120" viewBox="0 0 220 100" style={{ display: 'block', margin: '0 auto' }}>
                      <g style={{ transition: 'transform 1s cubic-bezier(0.4,0,0.2,1)', transform: isConn ? 'translateX(-12px)' : 'translateX(0px)' }}>
                      {/* === WIRES (behind everything) === */}
                      <g style={{ transition: 'transform 1s cubic-bezier(0.4,0,0.2,1)', transform: isConn ? 'translateX(44px)' : 'translateX(18px)' }}>
                        <rect x="2" y="44" width="24" height="12" rx="6" fill={fill} opacity={op * 0.65} style={tr} />
                      </g>
                      <g style={{ transition: 'transform 1s cubic-bezier(0.4,0,0.2,1)', transform: 'translateX(0px)' }}>
                        <rect x="174" y="44" width="24" height="12" rx="6" fill={fill} opacity={op * 0.65} style={tr} />
                      </g>
                      {/* === PLUG (left side) === */}
                      <g style={{ transition: 'transform 1s cubic-bezier(0.4,0,0.2,1)', transform: isConn ? 'translateX(44px)' : 'translateX(18px)' }}>
                        {/* Body: flat right edge, rounded left */}
                        <path d="M72,22 L72,78 L52,78 C34,78 22,66 22,50 C22,34 34,22 52,22 Z"
                          fill={fill} opacity={op} style={tr} />
                        {/* Top prong */}
                        <rect x="72" y="34" width="22" height="7" rx="3" fill={fill} opacity={op} style={tr} />
                        <rect x="89" y="34" width="5" height="7" rx="2" fill={fillDark} opacity={op} style={tr} />
                        {/* Bottom prong */}
                        <rect x="72" y="59" width="22" height="7" rx="3" fill={fill} opacity={op} style={tr} />
                        <rect x="89" y="59" width="5" height="7" rx="2" fill={fillDark} opacity={op} style={tr} />
                      </g>
                      {/* === SOCKET (right side) === */}
                      <g style={{ transition: 'transform 1s cubic-bezier(0.4,0,0.2,1)', transform: 'translateX(0px)' }}>
                        {/* Body: flat left edge, rounded right */}
                        <path d="M126,14 L126,86 L148,86 C166,86 178,70 178,50 C178,30 166,14 148,14 Z"
                          fill={isConn ? colors.amethyst.mid : 'rgba(55,65,81,0.8)'} opacity={op} style={tr} />
                        {/* Flat face recess on left side */}
                        <rect x="119" y="24" width="7" height="52" rx="2" fill={fillDark} opacity={0.55} style={tr} />
                      </g>
                      {/* Glow at junction */}
                      {isConn && (
                        <ellipse cx="108" cy="50" rx="8" ry="16"
                          fill="rgba(177,141,221,0.2)" style={{ filter: 'blur(5px)' }} />
                      )}
                      </g>
                    </svg>
                  )
                })()}
              </div>
              <div style={{ opacity: disconnectCause ? 1 : 0, transition: 'opacity 0.3s' }}>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 4px 8px' }} />
              </div>
              <div style={{ height: '24px', padding: '0 4px 4px', textAlign: 'center', opacity: disconnectCause ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                {disconnectCause?.code && (
                  <span style={{ fontFamily: fonts.mono, fontSize: '10px', fontWeight: 700, color: colors.status.critical, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '4px', padding: '1px 5px' }}>
                    {disconnectCause.code}
                  </span>
                )}
                <span style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 500, color: colors.status.critical }}>
                  {disconnectCause?.message ?? ''}
                </span>
              </div>
            </GlassCard>
          )
        })()}
      </div>

      {/* === Row 2: Charts === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.65fr', gap: 'clamp(12px, 1vw, 16px)' }}>
        <GlassCard title="State of Charge" headerRight={<TipIconBox icon={BatteryCharging} tooltip="How much charge is left in the battery right now - shown as a percentage of the full capacity." />}>
          <SocTimeChart liveHistory={isDemo ? undefined : history} />
          <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '12px', color: colors.text.primary, marginTop: '8px' }}>
            {data.soc.toFixed(1)}%
          </div>
        </GlassCard>
        <GlassCard title="Estimated Range" headerRight={<TipIconBox icon={Navigation} tooltip="How far the car can travel based on the current state of charge - estimated from recent driving behavior, energy usage and environmental factors." />}>
          <RangeSocChart liveHistory={isDemo ? undefined : history} />
          <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '12px', color: colors.text.primary, marginTop: '8px' }}>
            {data.remainingRangeKm.toFixed(0)} km &nbsp;·&nbsp; ~{data.remainingTimeMinutes} min
          </div>
        </GlassCard>
        <GlassCard style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Header row with title + status badge + info icon */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{
              fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
              color: colors.text.secondary, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0,
            }}>
              Fan Status
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '4px 10px', borderRadius: '20px',
                background: data.fanStatus ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.fanStatus ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.08)'}`,
              }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: '10px', fontWeight: 600,
                  color: data.fanStatus ? colors.status.nominal : colors.text.muted,
                }}>
                  {data.fanStatus ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>
              <TipIconBox icon={Wind} tooltip="The cooling fan activates automatically when pack temperature exceeds 35°C, helping dissipate heat and protect the battery. It stays on until the temperature drops back to a safe range." />
            </div>
          </div>
          {/* Fan area */}
          <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>{`
              @keyframes spin { from { transform: rotate(360deg) } to { transform: rotate(0deg) } }
              .fan-svg {
                animation: spin 0.8s linear infinite;
                transition: animation-duration 1.5s ease;
              }
              .fan-svg.idle {
                animation-play-state: paused;
              }
            `}</style>
            <svg
              className={data.fanStatus ? 'fan-svg' : 'fan-svg idle'}
              width="150" height="150" viewBox="-22 -22 164 164"
              style={{
                opacity: data.fanStatus ? 1 : 0.35,
                transition: 'opacity 1s ease',
                filter: data.fanStatus ? `drop-shadow(0 0 12px ${colors.amethyst.mid})` : 'none',
              }}
            >
              {/* Outer ring */}
              <circle cx="60" cy="60" r="78" fill="none" stroke={data.fanStatus ? 'rgba(177,141,221,0.25)' : 'rgba(255,255,255,0.25)'} strokeWidth="3" style={{ transition: 'stroke 0.3s' }} />
              {/* 3 wide curved blades */}
              {[0, 120, 240].map((angle) => (
                <path
                  key={angle}
                  d="M60 50 C46 36, 28 22, 12 10 C2 22, 6 44, 20 52 C34 58, 50 58, 50 60 Z"
                  fill={data.fanStatus ? colors.amethyst.light : colors.text.muted}
                  stroke={data.fanStatus ? colors.amethyst.mid : 'rgba(255,255,255,0.15)'}
                  strokeWidth="1"
                  strokeLinejoin="round"
                  transform={`rotate(${angle} 60 60)`}
                  style={{ transition: 'fill 0.3s, stroke 0.3s' }}
                />
              ))}
              {/* Center hub */}
              <circle cx="60" cy="60" r="13" fill={data.fanStatus ? 'rgba(121,71,189,0.3)' : 'rgba(255,255,255,0.06)'} stroke={data.fanStatus ? colors.amethyst.mid : 'rgba(255,255,255,0.12)'} strokeWidth="1.5" style={{ transition: 'fill 0.3s' }} />
              <circle cx="60" cy="60" r="5" fill={data.fanStatus ? colors.amethyst.light : 'rgba(255,255,255,0.2)'} style={{ transition: 'fill 0.3s' }} />
            </svg>
          </div>
          <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '12px', color: colors.text.primary, marginTop: '8px' }}>
            {data.fanRpm > 0 ? `${data.fanRpm.toLocaleString()} RPM` : '0 RPM'}
          </div>
        </GlassCard>
      </div>

      {/* === Row 3: Battery Stats === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(12px, 1vw, 16px)' }}>
        <StatCard
          label="State of Health"
          value={data.soh.toFixed(1)}
          unit="%"
          subtext={`Cycle degradation: ${data.soh < 70 ? 'High' : 'Normal'}`}
          icon={Heart}
          color={data.soh < 70 ? colors.status.warning : colors.status.nominal}
          tooltip="A measure of the battery's overall condition compared to when it was new. 100% means perfect - the closer it gets to 0%, the more the battery has degraded over time."
        />
        <StatCard
          label="Remaining Useful Life"
          value={data.rulCycles}
          unit="cycles"
          subtext={`${data.rulDays} days remaining`}
          icon={RotateCw}
          color={data.rulCycles < 400 ? colors.status.warning : colors.status.nominal}
          tooltip="An estimate of how many more full charge-discharge cycles the battery can handle before it needs replacing. One cycle = charging from empty to full once."
        />
        <StatCard
          label="Pack Power"
          value={data.isCharging ? 'Charging' : (data.power / 1000).toFixed(1)}
          unit={data.isCharging ? undefined : 'kW'}
          subtext={data.isCharging ? 'N/A' : `${data.voltage.toFixed(1)}V · ${data.current.toFixed(1)}A`}
          icon={Zap}
          color={chartColors.primary}
        />
        <StatCard
          label="Port Status"
          value={data.isCharging ? (data.power / 1000).toFixed(1) : '—'}
          unit={data.isCharging ? 'kW' : undefined}
          subtext={data.isCharging ? 'Plugged In' : 'Unplugged'}
          icon={Cable}
          color={data.isCharging ? colors.status.nominal : colors.text.muted}
        />
      </div>

      {/* === Row 4: Sensors + Alerts + Temperature === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 'clamp(12px, 1vw, 16px)' }}>
        <GlassCard title="Sensor Readings" headerRight={<TipIconBox icon={Cpu} tipWidth="260px" tooltip="Live readings from the vehicles onboard sensors - highlighted in red when a value exceeds safe thresholds." />}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <SensorTile label="Voltage" value={data.voltage.toFixed(1)} unit="V" icon={Bolt} alert={hasAlert('VOL-01')} />
            <SensorTile label="Current" value={data.current.toFixed(1)} unit="A" icon={Activity} alert={hasAlert('CUR-01')} />
            <SensorTile label="Pack Hum." value={data.humidity.toFixed(1)} unit="%" icon={Droplets} alert={hasAlert('HUM-01')} />
            <SensorTile label="Pressure" value={data.pressure.toFixed(0)} unit="hPa" icon={Gauge} alert={hasAlert('PRS-01')} />
            <SensorTile label="Coolant Inlet" value={data.coolantInletTemp.toFixed(1)} unit="°C" icon={Thermometer} />
            <SensorTile label="Heat Exch." value={data.heatExchangerTemp.toFixed(1)} unit="°C" icon={Wind} />
            <SensorTile label="Heatercore" value={data.coolantHeatercoreTemp.toFixed(1)} unit="°C" icon={Thermometer} />
            <SensorTile label="A/C Power" value={data.airconPower.toFixed(0)} unit="W" icon={RotateCw} />
          </div>
        </GlassCard>
        <GlassCard>
          <MiniAlertPanel alerts={alerts} />
        </GlassCard>
        <GlassCard title="Battery & Ambient Temp" style={{ display: 'flex', flexDirection: 'column' }} headerRight={
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {[{ label: 'Ambient', color: '#7947BD' }, { label: 'Pack', color: '#b18ddd' }].map(({ label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6b7280' }}>{label}</span>
              </div>
            ))}
            <TipIconBox icon={Thermometer} tipWidth="280px" tooltip="Pack temp is the battery's internal heat - high temperatures accelerate degradation and can trigger the cooling fan to maintain temperature or relay disconnection when beyond safe limits, to protect the pack. Ambient temp is the environmental temperature, in and around the vehicle." />
          </div>
        }>
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <TemperatureChart liveHistory={isDemo ? undefined : history} />
            <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '12px', color: colors.text.primary, marginTop: '8px' }}>
              {data.ambientTemp.toFixed(1)}°C ambient &nbsp;·&nbsp; {data.packTemp.toFixed(1)}°C pack
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Relay Override Modal */}
      {showRelayModal && (
        <div
          onClick={() => setShowRelayModal(false)}
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
              width: '400px', padding: '32px',
              border: '1px solid rgba(141,110,179,0.35)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(141,110,179,0.1)',
              animation: 'modalFadeIn 0.3s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{
                fontFamily: fonts.heading, fontSize: '22px', fontWeight: 400,
                color: colors.amethyst.light,
                margin: 0, letterSpacing: '-0.01em',
              }}>
                {isRelayConnected ? 'Disconnect Relay' : 'Reconnect Relay'}
              </h3>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AlertTriangle size={16} color={colors.text.secondary} />
              </div>
            </div>
            <p style={{
              fontFamily: fonts.body, fontSize: '13px', color: colors.text.secondary,
              margin: '0 0 16px', lineHeight: 1.6, letterSpacing: '0.01em',
            }}>
              {isRelayConnected
                ? 'This will manually disconnect the battery relay. No authentication required.'
                : 'Reconnecting the relay after an anomaly requires admin verification.'}
            </p>

            {isRelayConnected && (
              <div style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                padding: '10px 14px', borderRadius: '8px', marginBottom: '24px',
                background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)',
              }}>
                <AlertTriangle size={14} color={colors.status.critical} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.status.critical, lineHeight: 1.55, opacity: 0.85 }}>
                  Disconnecting will cut the vehicle from the battery pack. Use only in the event of a fault, emergency, or scheduled maintenance.
                </span>
              </div>
            )}

            {!isRelayConnected && (
              <>
                <label style={{
                  fontFamily: fonts.body, fontSize: '11px', fontWeight: 500,
                  color: colors.amethyst.light, display: 'block', marginBottom: '8px',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="relay-pwd-input"
                    type={showRelayPassword ? 'text' : 'password'}
                    value={relayPassword}
                    onChange={e => { setRelayPassword(e.target.value); setRelayAuthError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleRelayToggle()}
                    placeholder="Enter your password"
                    autoFocus
                    style={{
                      width: '100%', height: '40px', padding: '10px 40px 10px 14px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(141,110,179,0.25)',
                      fontFamily: fonts.body, fontSize: '13px', color: colors.text.primary,
                      outline: 'none', boxSizing: 'border-box',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(121,71,189,0.5)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(121,71,189,0.12)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(141,110,179,0.25)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRelayPassword(!showRelayPassword)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      color: colors.text.muted, display: 'flex', alignItems: 'center',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = colors.amethyst.light)}
                    onMouseLeave={e => (e.currentTarget.style.color = colors.text.muted)}
                  >
                    {showRelayPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {relayAuthError && (
                  <p style={{
                    fontFamily: fonts.body, fontSize: '12px', color: colors.status.critical,
                    margin: '10px 0 0',
                  }}>
                    {relayAuthError}
                  </p>
                )}
              </>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowRelayModal(false)}
                style={{
                  padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: fonts.body, fontSize: '13px', fontWeight: 500, color: colors.text.secondary,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRelayToggle}
                disabled={relayLoading}
                style={{
                  padding: '10px 22px', borderRadius: '10px', cursor: relayLoading ? 'wait' : 'pointer',
                  background: isRelayConnected ? 'rgba(248,113,113,0.12)' : 'rgba(121,71,189,0.2)',
                  border: `1px solid ${isRelayConnected ? 'rgba(248,113,113,0.3)' : 'rgba(121,71,189,0.4)'}`,
                  fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
                  color: isRelayConnected ? colors.status.critical : colors.amethyst.light,
                  opacity: relayLoading ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  if (!relayLoading) {
                    e.currentTarget.style.background = isRelayConnected ? 'rgba(248,113,113,0.2)' : 'rgba(121,71,189,0.3)'
                    e.currentTarget.style.boxShadow = isRelayConnected ? '0 0 16px rgba(248,113,113,0.15)' : '0 0 16px rgba(121,71,189,0.2)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isRelayConnected ? 'rgba(248,113,113,0.12)' : 'rgba(121,71,189,0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {relayLoading ? 'Verifying...' : isRelayConnected ? 'Disconnect' : 'Reconnect'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
