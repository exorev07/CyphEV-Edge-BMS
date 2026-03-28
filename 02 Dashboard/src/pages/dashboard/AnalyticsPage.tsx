import { useBMS } from '../../components/dashboard/DashboardLayout'
import { GlassCard } from '../../components/dashboard/GlassCard'
import { SocRangeChart } from '../../components/dashboard/charts/SocRangeChart'
import { TemperatureChart } from '../../components/dashboard/charts/TemperatureChart'
import { VoltageCurrentChart } from '../../components/dashboard/charts/VoltageCurrentChart'
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { fonts, colors, chartColors } from '../../lib/styles'

const tooltipStyle = {
  background: 'rgba(8,8,10,0.95)', border: `1px solid ${colors.amethyst.mid}`,
  borderRadius: '8px', fontFamily: fonts.mono, fontSize: '11px',
}

export default function AnalyticsPage() {
  const { data, history } = useBMS()

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', fontFamily: fonts.body, color: colors.text.muted }}>
      Initializing telemetry...
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px' }}>
      <div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: '24px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
          Analytics
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text.muted, marginTop: '4px' }}>
          Deep-dive into all 7 BMS features
        </p>
      </div>

      {/* 1. SoC & Range */}
      <GlassCard title="1 &middot; State of Charge & Range Prediction">
        <div style={{ display: 'flex', gap: '32px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: colors.text.primary }}>{data.soc.toFixed(1)}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> %</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Current SoC</div>
          </div>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: chartColors.tertiary }}>{data.remainingRangeKm.toFixed(0)}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> km</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Est. Range</div>
          </div>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: colors.text.secondary }}>{data.remainingTimeMinutes}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> min</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Est. Time</div>
          </div>
        </div>
        <SocRangeChart data={history} />
      </GlassCard>

      {/* 2. SoH & RUL */}
      <GlassCard title="2 &middot; State of Health & Remaining Useful Life">
        <div style={{ display: 'flex', gap: '32px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: data.soh > 80 ? colors.status.nominal : colors.status.warning }}>{data.soh.toFixed(1)}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> %</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Battery Health</div>
          </div>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: colors.text.primary }}>{data.rulCycles}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> cycles</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Remaining Life</div>
          </div>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: colors.text.secondary }}>{data.rulDays}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> days</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Est. Days Left</div>
          </div>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <AreaChart data={history} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="sohGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.tertiary} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={chartColors.tertiary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={{ stroke: chartColors.grid }} tickLine={false} interval="preserveStartEnd" />
              <YAxis domain={[80, 100]} tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: colors.text.muted }} />
              <Area type="monotone" dataKey="soh" stroke={chartColors.tertiary} strokeWidth={2} fill="url(#sohGrad)" name="SoH %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 3. Capacity Fade Detection */}
      <GlassCard title="3 &middot; Capacity Fade Detection">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.capacityFadeDetected ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.capacityFadeDetected ? colors.status.warning : colors.status.nominal,
            border: `1px solid ${data.capacityFadeDetected ? 'rgba(251,191,36,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            {data.capacityFadeDetected ? 'FADE DETECTED' : 'NOMINAL'}
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>
            Monitoring capacity degradation via edge ML model
          </span>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={history} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={{ stroke: chartColors.grid }} tickLine={false} interval="preserveStartEnd" />
              <YAxis domain={[0, 100]} tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: colors.text.muted }} />
              <Line type="monotone" dataKey="soc" stroke={chartColors.primary} strokeWidth={2} dot={false} name="SoC %" />
              <Line type="monotone" dataKey="soh" stroke={chartColors.tertiary} strokeWidth={2} dot={false} name="SoH %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 4. Thermal Management */}
      <GlassCard title="4 &middot; Thermal Management">
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.fanStatus ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.fanStatus ? colors.status.warning : colors.status.nominal,
            border: `1px solid ${data.fanStatus ? 'rgba(251,191,36,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            Fan: {data.fanStatus ? 'ACTIVE' : 'OFF'}
          </div>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.thermalRunawayRisk ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.thermalRunawayRisk ? colors.status.critical : colors.status.nominal,
            border: `1px solid ${data.thermalRunawayRisk ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            Thermal Risk: {data.thermalRunawayRisk ? 'HIGH' : 'LOW'}
          </div>
        </div>
        <TemperatureChart data={history} />
      </GlassCard>

      {/* 5. Voltage / Current Anomaly */}
      <GlassCard title="5 &middot; Voltage & Current Anomaly Detection">
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.voltageAnomaly ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.voltageAnomaly ? colors.status.critical : colors.status.nominal,
            border: `1px solid ${data.voltageAnomaly ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            Voltage: {data.voltageAnomaly ? 'ANOMALY' : 'NORMAL'}
          </div>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.currentAnomaly ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.currentAnomaly ? colors.status.critical : colors.status.nominal,
            border: `1px solid ${data.currentAnomaly ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            Current: {data.currentAnomaly ? 'ANOMALY' : 'NORMAL'}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <VoltageCurrentChart data={history} mode="voltage" />
          <VoltageCurrentChart data={history} mode="current" />
        </div>
      </GlassCard>

      {/* 6. Humidity / Leak Detection */}
      <GlassCard title="6 &middot; Humidity & Leak Detection">
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: colors.text.primary }}>{data.humidity.toFixed(1)}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> %</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Compartment Humidity</div>
          </div>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.waterLeakageDetected ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.waterLeakageDetected ? colors.status.critical : colors.status.nominal,
            border: `1px solid ${data.waterLeakageDetected ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            Leak: {data.waterLeakageDetected ? 'DETECTED' : 'NONE'}
          </div>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={history} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={{ stroke: chartColors.grid }} tickLine={false} interval="preserveStartEnd" />
              <YAxis domain={[30, 70]} tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: colors.text.muted }} />
              <Line type="monotone" dataKey="humidity" stroke="#38bdf8" strokeWidth={2} dot={false} name="Humidity %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 7. Battery Swell Detection */}
      <GlassCard title="7 &middot; Battery Swell Detection">
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: fonts.mono, fontSize: '32px', fontWeight: 700, color: colors.text.primary }}>{data.pressure.toFixed(0)}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: '14px', color: colors.text.muted }}> hPa</span>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text.muted }}>Pack Pressure</div>
          </div>
          <div style={{
            padding: '6px 14px', borderRadius: '8px', fontFamily: fonts.mono, fontSize: '12px', fontWeight: 600,
            background: data.batterySwellDetected ? 'rgba(248,113,113,0.12)' : 'rgba(52,211,153,0.1)',
            color: data.batterySwellDetected ? colors.status.critical : colors.status.nominal,
            border: `1px solid ${data.batterySwellDetected ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
          }}>
            Swell: {data.batterySwellDetected ? 'DETECTED' : 'NONE'}
          </div>
        </div>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <LineChart data={history} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={{ stroke: chartColors.grid }} tickLine={false} interval="preserveStartEnd" />
              <YAxis domain={[1000, 1030]} tick={{ fill: chartColors.axis, fontSize: 10, fontFamily: fonts.mono }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: colors.text.muted }} />
              <Line type="monotone" dataKey="pressure" stroke={chartColors.warning} strokeWidth={2} dot={false} name="Pressure hPa" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  )
}
