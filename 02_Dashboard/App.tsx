import React, { useState } from 'react';
import {
  Zap,
  Thermometer,
  Droplets,
  ShieldCheck,
  ShieldAlert,
  Fan,
  LayoutDashboard,
  TrendingUp,
  History,
  Wind,
  LogOut,
  User
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { useBMSData } from './services/bmsService';
import { RadialGauge } from './components/RadialGauge';
import { AlertPanel } from './components/AlertPanel';
import { Login } from './components/Login';
import { MouseFollower } from './components/MouseFollower';

type ViewState = 'dashboard' | 'logs';

const App = () => {
  const { data, history, alerts } = useBMSData();
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'operator' | 'owner' | null>(null);

  const handleLogin = (role: 'operator' | 'owner') => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const renderDashboard = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 font-doto relative z-20">
      
      {/* Vehicle Performance Hero Section */}
      <div className="card-hover bg-dark-800/30 backdrop-blur-md border border-dark-700/50 rounded-3xl pt-6 pb-12 lg:pt-8 lg:pb-16 px-12 lg:px-20 mb-8 relative overflow-hidden flex flex-col items-center gap-6">
        <div className="w-full flex justify-center">
          <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
            VEHICLE DYNAMICS
          </h2>
        </div>
        <div className="grid grid-cols-5 items-center w-full gap-4 md:gap-8 mt-4">
          <div className="flex justify-center">
            <RadialGauge value={data.velocity} max={200} label="Velocity" unit="KM/H" size={160} color="text-amethyst-500" />
          </div>
          <div className="flex justify-center">
            <RadialGauge value={data.throttle} max={100} label="Throttle" unit="%" size={160} color="text-amethyst-500" />
          </div>
          <div className="flex justify-center">
            <RadialGauge value={data.elevation} max={5000} label="Elevation" unit="M" size={160} color="text-amethyst-500" />
          </div>
          <div className="flex justify-center">
            <RadialGauge value={data.motorTorque} max={500} label="Motor Torque" unit="NM" size={160} color="text-amethyst-500" />
          </div>
          <div className="flex justify-center">
            <RadialGauge value={data.longitudinalAccel} max={10} label="Long. Acceleration" unit="M/S²" size={160} color="text-amethyst-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Core Battery Stats Overview */}
        <div className="lg:col-span-8">
          <div className="card-hover bg-dark-800/30 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6 flex flex-col gap-8">
            <div className="w-full flex justify-center">
              <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
                IMPORTANT BATTERY STATS
              </h2>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-cyphgray uppercase tracking-widest mb-2 font-bold">State of charge</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-6xl font-handjet font-extralight ${data.soc < 20 ? 'text-red-500' : 'text-amethyst-400'}`}>{data.soc}%</span>
                  {data.isCharging && <Zap size={18} className="text-amethyst-400 animate-pulse fill-current" />}
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-dark-700/50"></div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-cyphgray uppercase tracking-widest mb-2 font-bold">State of Health</span>
                <span className="text-6xl font-handjet font-extralight text-emerald-500">{data.soh}%</span>
                <span className="text-[10px] text-cyphgray uppercase tracking-widest font-black mt-1">RUL: {data.rulCycles} Cycles / ~{data.rulDays} Days</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-dark-700/50"></div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-cyphgray uppercase tracking-widest mb-2 font-bold">Pack Power</span>
                <span className="text-6xl font-handjet font-extralight text-blue-400">{data.power}W</span>
              </div>
            </div>
            
          </div>
        </div>

        {/* Quick Alerts Side panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AlertPanel alerts={alerts} isMini relayStatus={data.relayStatus} onViewAll={() => setCurrentView('logs')} />
        </div>
      </div>

      {/* Detailed Graphs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Estimated Range / SOC Graph */}
        <div className="card-hover bg-dark-800/30 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6 flex flex-col gap-6 min-h-[550px]">
          <div className="w-full flex justify-center">
            <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
              ESTIMATED RANGE
            </h2>
          </div>
          <div className="flex justify-center items-baseline gap-2 -mt-2">
            <span className="text-5xl font-handjet font-extralight text-white">{data.remainingRangeKm}</span>
            <span className="text-[10px] text-cyphgray uppercase font-black">KM REMAINING</span>
            <span className="text-[10px] text-cyphgray font-black mx-2">|</span>
            <span className="text-2xl font-handjet font-extralight text-amethyst-400">{data.remainingTimeMinutes}</span>
            <span className="text-[10px] text-cyphgray uppercase font-black">MINUTES</span>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5665" opacity={0.3} vertical={false} />
                <XAxis dataKey="time" stroke="#475569" tick={{fontSize: 9, fontFamily: 'Handjet', fontWeight: 200}} interval="preserveStartEnd" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 400]} stroke="#475569" tick={{fontSize: 9, fontFamily: 'Handjet', fontWeight: 200}} axisLine={false} tickLine={false} width={25} />
                <Tooltip contentStyle={{ backgroundColor: '#262E36', border: '1px solid #4A5665', borderRadius: '8px', fontSize: '10px', fontFamily: 'Handjet', fontWeight: 200 }} itemStyle={{ color: '#7947BD' }} />
                <Line type="monotone" dataKey="range" stroke="#7947BD" strokeWidth={3} dot={false} activeDot={{ r: 4, fill: '#f6f3fc', stroke: '#7947BD', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column with two separate stacked boxes */}
        <div className="flex flex-col gap-6 min-h-[550px]">
          {/* Pack Thermals Card */}
          <div className="card-hover bg-dark-800/30 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6 flex flex-col gap-4 flex-1">
            <div className="w-full flex justify-center">
              <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">PACK THERMALS</h2>
            </div>
            <div className="flex flex-1 min-h-0 gap-0">
              {/* Left: temp value + chart */}
              <div className="flex flex-col flex-1 min-w-0 gap-3">
                <div className="flex justify-center items-baseline gap-2">
                  <span className={`text-4xl font-handjet font-extralight ${data.thermalRunawayRisk ? 'text-red-500' : 'text-white'}`}>{data.packTemp}</span>
                  <span className="text-[10px] text-cyphgray uppercase font-black">°C PACK</span>
                </div>
                <div className="flex-1 w-full min-h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#4A5665" opacity={0.3} vertical={false} />
                      <XAxis dataKey="time" stroke="#475569" tick={{fontSize: 8, fill: '#64748b', fontFamily: 'Handjet', fontWeight: 200}} interval="preserveStartEnd" axisLine={false} tickLine={false} />
                      <YAxis domain={['auto', 'auto']} stroke="#475569" tick={{fontSize: 8, fill: '#64748b', fontFamily: 'Handjet', fontWeight: 200}} axisLine={false} tickLine={false} width={25} />
                      <Tooltip contentStyle={{ backgroundColor: '#262E36', border: '1px solid #4A5665', fontSize: '10px', fontFamily: 'Handjet', fontWeight: 200 }} />
                      <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 4, fill: '#fffbeb', stroke: '#f59e0b', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-dark-700/50 mx-5 self-stretch"></div>

              {/* Right: animated fan + RPM */}
              <div className="flex flex-col items-center justify-center gap-3 w-20 shrink-0">
                <Fan
                  size={52}
                  className={`transition-colors duration-500 ${data.fanStatus ? 'text-blue-400' : 'text-cyphgray/25'}`}
                  style={{ animation: data.fanStatus ? `spin ${Math.max(0.3, 1.8 - (data.packTemp - 40) / 35)}s linear infinite` : 'none' }}
                />
                <div className="flex flex-col items-center gap-0.5">
                  <span className={`text-2xl font-handjet font-extralight leading-none ${data.fanStatus ? 'text-blue-400' : 'text-cyphgray/40'}`}>
                    {data.fanStatus ? Math.round(800 + (data.packTemp - 40) / 30 * 2200) : 0}
                  </span>
                  <span className="text-[9px] text-cyphgray uppercase font-black tracking-widest">RPM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ambient Temp Card */}
          <div className="card-hover bg-dark-800/30 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6 flex flex-col gap-4 flex-1">
            <div className="w-full flex justify-center">
              <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">AMBIENT TEMP</h2>
            </div>
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-4xl font-handjet font-extralight text-blue-400">{data.ambientTemp}</span>
              <span className="text-[10px] text-cyphgray uppercase font-black">°C AMB</span>
            </div>
            <div className="flex-1 w-full min-h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4A5665" opacity={0.3} vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" tick={{fontSize: 8, fill: '#64748b', fontFamily: 'Handjet', fontWeight: 200}} interval="preserveStartEnd" axisLine={false} tickLine={false} />
                  <YAxis domain={['auto', 'auto']} stroke="#475569" tick={{fontSize: 8, fill: '#64748b', fontFamily: 'Handjet', fontWeight: 200}} axisLine={false} tickLine={false} width={25} />
                  <Tooltip contentStyle={{ backgroundColor: '#262E36', border: '1px solid #4A5665', fontSize: '10px', fontFamily: 'Handjet', fontWeight: 200 }} />
                  <Line type="monotone" dataKey="ambientTemp" stroke="#60a5fa" strokeWidth={3} dot={false} activeDot={{ r: 4, fill: '#eff6ff', stroke: '#60a5fa', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Data Grid */}
      <div className="card-hover mt-8 bg-dark-800/30 backdrop-blur-md border border-dark-700/50 rounded-2xl p-6 flex flex-col gap-8 shadow-xl">
        <div className="w-full flex justify-center">
          <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
            SENSOR DATA
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Voltage</span>
              <TrendingUp size={12} className="text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.voltage}</span>
              <span className="text-[9px] text-cyphgray uppercase">Volts</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Current</span>
              <Zap size={12} className="text-amethyst-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.current}</span>
              <span className="text-[9px] text-cyphgray uppercase">Amps</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Aircon</span>
              <Wind size={12} className="text-blue-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.airconPower.toFixed(0)}</span>
              <span className="text-[9px] text-cyphgray uppercase">Watts</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Exch. Temp</span>
              <TrendingUp size={12} className="text-orange-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.heatExchangerTemp}</span>
              <span className="text-[9px] text-cyphgray uppercase">°C</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Heatercore</span>
              <Thermometer size={12} className="text-red-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.coolantHeatercoreTemp}</span>
              <span className="text-[9px] text-cyphgray uppercase">°C</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Inlet</span>
              <Thermometer size={12} className="text-blue-300" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.coolantInletTemp}</span>
              <span className="text-[9px] text-cyphgray uppercase">°C</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Humidity</span>
              <Droplets size={12} className="text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-handjet font-extralight">{data.humidity.toFixed(0)}</span>
              <span className="text-[9px] text-cyphgray uppercase">%</span>
            </div>
          </div>
          <div className="bg-dark-800/40 border border-dark-700/50 rounded-xl p-4 flex flex-col justify-between hover:bg-dark-800/60 transition-colors flex-1 w-full relative overflow-hidden group">
            <div className={`absolute inset-0 bg-red-500/5 opacity-0 ${data.pressure > 1025 ? 'opacity-100 animate-pulse' : 'group-hover:opacity-10'} transition-opacity`}></div>
            <div className="flex justify-between items-center mb-1 relative z-10">
              <span className="text-[10px] text-cyphgray uppercase font-bold tracking-tighter">Pressure</span>
              {data.pressure > 1025 ? <ShieldAlert size={12} className="text-red-500" /> : <ShieldCheck size={12} className="text-emerald-500" />}
            </div>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className={`text-3xl font-handjet font-extralight ${data.pressure > 1025 ? 'text-red-400' : 'text-white'}`}>{data.pressure.toFixed(0)}</span>
              <span className="text-[9px] text-cyphgray uppercase">hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden text-gray-100 font-sans selection:bg-amethyst-500 selection:text-white">
      <MouseFollower />

      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <header className="shrink-0 bg-dark-900/70 backdrop-blur-lg border-b border-dark-700/50 px-6 py-5 grid grid-cols-3 items-center shadow-lg font-doto z-50">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border uppercase tracking-tighter ${
                  currentView === 'dashboard' ? 'bg-amethyst-900/40 text-amethyst-400 border-amethyst-500/50' : 'bg-dark-800 hover:bg-dark-700 text-gray-300 border-dark-600'
                }`}
              >
                <LayoutDashboard size={14} /> Overview
              </button>
              <button 
                onClick={() => setCurrentView('logs')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border uppercase tracking-tighter ${
                  currentView === 'logs' ? 'bg-amethyst-900/40 text-amethyst-400 border-amethyst-500/50' : 'bg-dark-800 hover:bg-dark-700 text-gray-300 border-dark-600'
                }`}
              >
                <History size={14} /> Logs
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-black tracking-[0.2em] text-white uppercase">VEHICLE DASHBOARD</h1>
              <p className="text-[10px] text-cyphgray tracking-[0.3em] uppercase mt-2 font-bold">CyphEV V1</p>
            </div>
            <div className="flex justify-end items-center gap-6">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-amethyst-400 mb-1 opacity-90">
                  <User size={10} />
                  <span className="text-[9px] font-black uppercase tracking-widest">{userRole} AUTHENTICATED</span>
                </div>
                <span className="text-[10px] text-cyphgray uppercase tracking-[0.1em] font-black border-t border-dark-700/50 pt-1 w-full text-right">System Status</span>
                <div className="flex items-center gap-2 mt-0.5">
                  {(() => {
                    const hasCritical = data.thermalRunawayRisk || data.voltageAnomaly || data.currentAnomaly || data.waterLeakageDetected || data.batterySwellDetected;
                    const hasWarning = data.capacityFadeDetected || data.soc < 20;
                    return (
                      <>
                        <span className={`w-2 h-2 rounded-full ${hasCritical ? 'bg-red-500 animate-pulse' : hasWarning ? 'bg-yellow-500' : 'bg-emerald-500'}`}></span>
                        <span className="text-[10px] font-black tracking-widest uppercase">{hasCritical ? 'CRITICAL' : hasWarning ? 'WARNING' : 'NOMINAL'}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-all"
                title="Terminate Session"
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <main className="max-w-[1800px] mx-auto px-4 sm:px-6 mt-8 pb-10 font-doto relative z-20">
              {!data ? (
                <div className="min-h-[60vh] flex items-center justify-center text-amethyst-400 flex-col gap-4 font-doto">
                  <div className="w-16 h-16 border-4 border-amethyst-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="animate-pulse tracking-widest text-sm uppercase">INITIALIZING SYSTEM...</p>
                </div>
              ) : (
                <>
                  {currentView === 'dashboard' && renderDashboard()}
                  {currentView === 'logs' && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-300 h-[calc(100vh-180px)]">
                      <AlertPanel alerts={alerts} />
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;