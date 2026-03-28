import { Gauge, Zap, Battery, Heart, Thermometer, Droplets, Wind, Activity, Bolt, RotateCw } from 'lucide-react'
import { useBMS } from '../../components/dashboard/DashboardLayout'
import { GlassCard } from '../../components/dashboard/GlassCard'
import { RadialGauge } from '../../components/dashboard/RadialGauge'
import { StatCard } from '../../components/dashboard/StatCard'
import { SensorTile } from '../../components/dashboard/SensorTile'
import { MiniAlertPanel } from '../../components/dashboard/MiniAlertPanel'
import { SocRangeChart } from '../../components/dashboard/charts/SocRangeChart'
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
          Dashboard
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted, marginTop: '4px' }}>
          Live telemetry &middot; Updated every 2s
        </p>
      </div>

      {/* === Row 1: Vehicle Dynamics Gauges === */}
      <GlassCard title="Vehicle Dynamics">
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px' }}>
          <RadialGauge value={data.velocity} max={180} label="Speed" unit="km/h" color={chartColors.secondary} decimals={1} />
          <RadialGauge value={data.throttle} max={100} label="Throttle" unit="%" color={chartColors.primary} />
          <RadialGauge value={data.motorTorque} max={500} label="Torque" unit="Nm" color={chartColors.tertiary} decimals={1} />
          <RadialGauge value={Math.abs(data.longitudinalAccel)} max={6} label="Accel" unit="m/s²" color={chartColors.warning} decimals={2} />
          <RadialGauge value={data.elevation} max={1000} label="Elevation" unit="m" color={chartColors.secondary} />
        </div>
      </GlassCard>

      {/* === Row 2: Battery Stats === */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard
          label="State of Charge"
          value={data.soc.toFixed(1)}
          unit="%"
          subtext={`Range: ${data.remainingRangeKm.toFixed(0)} km · ${data.remainingTimeMinutes} min`}
          icon={Battery}
          color={data.soc < 20 ? colors.status.critical : colors.amethyst.light}
        />
        <StatCard
          label="State of Health"
          value={data.soh.toFixed(1)}
          unit="%"
          subtext={`RUL: ${data.rulCycles} cycles · ${data.rulDays} days`}
          icon={Heart}
          color={data.soh < 70 ? colors.status.warning : colors.status.nominal}
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <GlassCard title="SoC & Range Trend">
          <SocRangeChart data={history} />
        </GlassCard>
        <GlassCard title="Temperature">
          <TemperatureChart data={history} />
        </GlassCard>
      </div>

      {/* === Row 4: Sensors + Alerts === */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Sensor Grid */}
        <GlassCard title="Sensor Readings">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <SensorTile label="Voltage" value={data.voltage.toFixed(1)} unit="V" icon={Bolt} alert={data.voltageAnomaly} />
            <SensorTile label="Current" value={data.current.toFixed(1)} unit="A" icon={Activity} alert={data.currentAnomaly} />
            <SensorTile label="Humidity" value={data.humidity.toFixed(1)} unit="%" icon={Droplets} alert={data.waterLeakageDetected} />
            <SensorTile label="Pressure" value={data.pressure.toFixed(0)} unit="hPa" icon={Gauge} alert={data.batterySwellDetected} />
            <SensorTile label="Coolant Inlet" value={data.coolantInletTemp.toFixed(1)} unit="°C" icon={Thermometer} />
            <SensorTile label="Heat Exchanger" value={data.heatExchangerTemp.toFixed(1)} unit="°C" icon={Wind} />
            <SensorTile label="Heatercore" value={data.coolantHeatercoreTemp.toFixed(1)} unit="°C" icon={Thermometer} />
            <SensorTile label="A/C Power" value={data.airconPower.toFixed(0)} unit="W" icon={RotateCw} />
          </div>
        </GlassCard>

        {/* Alerts & Relay */}
        <GlassCard title="System Status & Alerts">
          <MiniAlertPanel alerts={alerts} relayStatus={data.relayStatus} />
        </GlassCard>
      </div>
    </div>
  )
}
