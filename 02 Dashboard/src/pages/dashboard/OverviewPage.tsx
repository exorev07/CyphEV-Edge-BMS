import { Gauge, Zap, Heart, Thermometer, Droplets, Wind, Activity, Bolt, RotateCw, Plug, PlugZap } from 'lucide-react'
import { useBMS } from '../../components/dashboard/DashboardLayout'
import { GlassCard } from '../../components/dashboard/GlassCard'
import { RadialGauge } from '../../components/dashboard/RadialGauge'
import { StatCard } from '../../components/dashboard/StatCard'
import { SensorTile } from '../../components/dashboard/SensorTile'
import { MiniAlertPanel } from '../../components/dashboard/MiniAlertPanel'
import { SocTimeChart } from '../../components/dashboard/charts/SocTimeChart'
import { RangeSocChart } from '../../components/dashboard/charts/RangeSocChart'
import { TemperatureChart } from '../../components/dashboard/charts/TemperatureChart'
import { fonts, colors, chartColors } from '../../lib/styles'

export default function OverviewPage() {
  const { data, history, alerts } = useBMS()

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: fonts.body, color: colors.text.muted }}>
      Initializing telemetry...
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px' }}>
      {/* Page header */}
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '24px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
          Dashboard Overview
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted, marginTop: '4px' }}>
          Live telemetry &middot; Updated every 2s
        </p>
      </div>

      {/* === Row 1: Vehicle Dynamics + Relay Status === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
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
          const isConn = data.relayStatus === 'CONNECTED'
          return (
            <GlassCard style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Header row with title + status badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '-10px' }}>
                <h3 style={{
                  fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
                  color: colors.text.muted, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0,
                }}>
                  Relay Status
                </h3>
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
                    {data.relayStatus}
                  </span>
                </div>
              </div>
              {/* Icon */}
              <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: 110, height: 110, borderRadius: '50%',
                  background: isConn ? 'rgba(121,71,189,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${isConn ? 'rgba(177,141,221,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: isConn ? `0 0 20px rgba(121,71,189,0.2)` : 'none',
                }}>
                  {isConn
                    ? <PlugZap size={40} color={colors.amethyst.light} style={{ transition: 'color 0.3s' }} />
                    : <Plug size={40} color={colors.text.muted} style={{ transition: 'color 0.3s', opacity: 0.5 }} />
                  }
                </div>
              </div>
            </GlassCard>
          )
        })()}
      </div>

      {/* === Row 2: Battery Stats === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '0px' }}>
        <StatCard
          label="State of Health"
          value={data.soh.toFixed(1)}
          unit="%"
          subtext={`Cycle degradation: ${data.soh < 70 ? 'High' : 'Normal'}`}
          icon={Heart}
          color={data.soh < 70 ? colors.status.warning : colors.status.nominal}
        />
        <StatCard
          label="Remaining Useful Life"
          value={data.rulCycles}
          unit="cycles"
          subtext={`${data.rulDays} days remaining`}
          icon={RotateCw}
          color={data.rulCycles < 400 ? colors.status.warning : colors.status.nominal}
        />
        <StatCard
          label="Pack Power"
          value={(data.power / 1000).toFixed(1)}
          unit="kW"
          subtext={`${data.voltage.toFixed(1)}V · ${data.current.toFixed(1)}A`}
          icon={Zap}
          color={chartColors.primary}
        />
        <StatCard
          label="Pack Temp"
          value={data.packTemp.toFixed(1)}
          unit="°C"
          subtext={`Ambient: ${data.ambientTemp.toFixed(1)}°C · Fan: ${data.fanStatus ? 'ON' : 'OFF'}`}
          icon={Thermometer}
          color={data.packTemp > 45 ? colors.status.critical : data.packTemp > 35 ? colors.status.warning : colors.status.nominal}
        />
      </div>

      {/* === Row 3: Charts === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.65fr', gap: '16px' }}>
        <GlassCard title="State of Charge">
          <SocTimeChart />
          <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '12px', color: colors.text.primary, marginTop: '8px' }}>
            {data.soc.toFixed(1)}% &nbsp;·&nbsp; {data.remainingRangeKm.toFixed(0)} km remaining
          </div>
        </GlassCard>
        <GlassCard title="Estimated Range">
          <RangeSocChart />
          <div style={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: '12px', color: colors.text.primary, marginTop: '8px' }}>
            {data.remainingRangeKm.toFixed(0)} km &nbsp;·&nbsp; ~{data.remainingTimeMinutes} min
          </div>
        </GlassCard>
        <GlassCard style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Header row with title + status badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{
              fontFamily: fonts.body, fontSize: '13px', fontWeight: 600,
              color: colors.text.muted, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0,
            }}>
              Fan Status
            </h3>
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
          </div>
          {/* Fan area */}
          <div style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <style>{`
              @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
              @keyframes spinSlow { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
              .fan-svg { animation: spin 0.8s linear infinite; }
              .fan-svg.idle { animation: spinSlow 8s linear infinite; }
            `}</style>
            <svg
              className={data.fanStatus ? 'fan-svg' : 'fan-svg idle'}
              width="150" height="150" viewBox="-15 -15 150 150"
              style={{
                opacity: data.fanStatus ? 1 : 0.35,
                transition: 'opacity 1s ease',
                filter: data.fanStatus ? `drop-shadow(0 0 12px ${colors.amethyst.mid})` : 'none',
              }}
            >
              {/* Outer ring */}
              <circle cx="60" cy="60" r="70" fill="none" stroke={data.fanStatus ? 'rgba(177,141,221,0.25)' : 'rgba(255,255,255,0.08)'} strokeWidth="3" style={{ transition: 'stroke 0.3s' }} />
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
        </GlassCard>
      </div>

      {/* === Row 4: Sensors + Alerts + Temperature === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px' }}>
        <GlassCard title="Sensor Readings">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <SensorTile label="Voltage" value={data.voltage.toFixed(1)} unit="V" icon={Bolt} alert={data.voltageAnomaly} />
            <SensorTile label="Current" value={data.current.toFixed(1)} unit="A" icon={Activity} alert={data.currentAnomaly} />
            <SensorTile label="Humidity" value={data.humidity.toFixed(1)} unit="%" icon={Droplets} alert={data.waterLeakageDetected} />
            <SensorTile label="Pressure" value={data.pressure.toFixed(0)} unit="hPa" icon={Gauge} alert={data.batterySwellDetected} />
            <SensorTile label="Coolant Inlet" value={data.coolantInletTemp.toFixed(1)} unit="°C" icon={Thermometer} />
            <SensorTile label="Heat Exch." value={data.heatExchangerTemp.toFixed(1)} unit="°C" icon={Wind} />
            <SensorTile label="Heatercore" value={data.coolantHeatercoreTemp.toFixed(1)} unit="°C" icon={Thermometer} />
            <SensorTile label="A/C Power" value={data.airconPower.toFixed(0)} unit="W" icon={RotateCw} />
          </div>
        </GlassCard>
        <GlassCard>
          <MiniAlertPanel alerts={alerts} />
        </GlassCard>
        <GlassCard title="Battery & Ambient Temp">
          <TemperatureChart />
        </GlassCard>
      </div>
    </div>
  )
}
