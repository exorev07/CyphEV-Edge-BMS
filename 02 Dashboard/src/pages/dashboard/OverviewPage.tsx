import { Gauge, Zap, Heart, Thermometer, Droplets, Wind, Activity, Bolt, RotateCw } from 'lucide-react'
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

      {/* === Row 1: Vehicle Dynamics Gauges === */}
      <GlassCard title="Vehicle Dynamics">
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px' }}>
          <RadialGauge value={data.velocity} max={180} label="Speed" unit="km/h" color={chartColors.secondary} decimals={1} />
          <RadialGauge value={data.throttle} max={100} label="Throttle" unit="%" color={chartColors.secondary} />
          <RadialGauge value={data.motorTorque} max={500} label="Torque" unit="Nm" color={chartColors.secondary} decimals={1} />
          <RadialGauge value={Math.abs(data.longitudinalAccel)} max={6} label="Accel" unit="m/s²" color={chartColors.secondary} decimals={2} />
          <RadialGauge value={data.elevation} max={1000} label="Elevation" unit="m" color={chartColors.secondary} />
        </div>
      </GlassCard>

      {/* === Row 2: Battery Stats === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
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
        <GlassCard>
          <MiniAlertPanel alerts={alerts} relayStatus={data.relayStatus} />
        </GlassCard>
      </div>

      {/* === Row 4: Sensors + Fan + Temperature === */}
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
        <GlassCard title="Fan Status">
          <div style={{ width: '100%', height: '100%', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '4px' }}>
            {/* Fan area */}
            <div style={{ width: '100%', height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
              <svg
                width="180" height="180" viewBox="0 0 120 120"
                style={{
                  animation: data.fanStatus ? 'spin 0.8s linear infinite' : 'none',
                  opacity: data.fanStatus ? 1 : 0.35,
                  transition: 'opacity 0.3s',
                  filter: data.fanStatus ? `drop-shadow(0 0 12px ${colors.amethyst.mid})` : 'none',
                }}
              >
                {/* Outer ring */}
                <circle cx="60" cy="60" r="56" fill="none" stroke={data.fanStatus ? 'rgba(177,141,221,0.15)' : 'rgba(255,255,255,0.06)'} strokeWidth="2" style={{ transition: 'stroke 0.3s' }} />
                {/* Blades */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <path
                    key={angle}
                    d="M60 60 C54 42, 46 26, 52 14 C60 18, 64 30, 66 42 C68 50, 64 56, 60 60Z"
                    fill={data.fanStatus ? colors.amethyst.light : colors.text.muted}
                    transform={`rotate(${angle} 60 60)`}
                    style={{ transition: 'fill 0.3s' }}
                  />
                ))}
                {/* Center hub outer */}
                <circle cx="60" cy="60" r="12" fill={data.fanStatus ? 'rgba(121,71,189,0.3)' : 'rgba(255,255,255,0.06)'} style={{ transition: 'fill 0.3s' }} />
                {/* Center hub inner */}
                <circle cx="60" cy="60" r="7" fill={data.fanStatus ? colors.amethyst.mid : 'rgba(255,255,255,0.12)'} style={{ transition: 'fill 0.3s' }} />
                <circle cx="60" cy="60" r="3" fill={data.fanStatus ? colors.amethyst.light : 'rgba(255,255,255,0.2)'} style={{ transition: 'fill 0.3s' }} />
              </svg>
            </div>
            {/* Status label — aligned with temp legend */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '4px 14px', borderRadius: '20px',
                background: data.fanStatus ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${data.fanStatus ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.08)'}`,
              }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: '11px', fontWeight: 700,
                  color: data.fanStatus ? colors.status.nominal : colors.text.muted,
                }}>
                  {data.fanStatus ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
        <GlassCard title="Battery & Ambient Temp">
          <TemperatureChart />
        </GlassCard>
      </div>
    </div>
  )
}
