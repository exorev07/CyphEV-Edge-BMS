import React from 'react';
import { AlertTriangle, AlertOctagon, Info, ArrowRight, Download } from 'lucide-react';
import { BMSAlert, AlertSeverity } from '../types';

interface AlertPanelProps {
  alerts: BMSAlert[];
  isMini?: boolean;
  onViewAll?: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, isMini = false, onViewAll }) => {
  if (alerts.length === 0) {
    return (
      <div className="card-hover bg-dark-800/30 backdrop-blur-md shadow-xl border border-dark-700/50 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-cyphgray font-doto">
        <div className="w-full flex justify-center mb-6">
          <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
            SYSTEM ALERTS
          </h2>
        </div>
        <div className="p-3 bg-dark-700/30 rounded-full mb-2">
          <Info size={24} className="text-amethyst-500/50" />
        </div>
        <span className="text-xs uppercase tracking-widest font-bold opacity-70">System Nominal</span>
      </div>
    );
  }

  // If mini, only show the first alert (most recent)
  const displayAlerts = isMini ? alerts.slice(0, 1) : alerts;

  const handleExport = () => {
    if (alerts.length === 0) return;
    
    const headers = ['Timestamp', 'Severity', 'Code', 'Message'];
    const csvRows = alerts.map(alert => {
      const time = new Date(alert.timestamp).toISOString();
      return `${time},${alert.severity},${alert.code},"${alert.message}"`;
    });
    
    // Create the CSV content with UTF-8 BOM
    const csvContent = '\uFEFF' + [headers.join(','), ...csvRows].join('\n');
    const filename = `cyphev_logs_${new Date().toISOString().split('T')[0]}.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 150);
  };

  return (
    <div className={`group ${isMini ? 'card-hover bg-dark-800/30 shadow-xl border-dark-700/50 rounded-2xl' : 'bg-transparent border-transparent'} backdrop-blur-md border p-6 h-full overflow-hidden flex flex-col font-doto relative`}>
      
      {/* Primary Centered Heading */}
      <div className="w-full flex justify-center mb-6 relative">
        <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
          SYSTEM ALERTS
        </h2>
        
        {isMini && onViewAll && (
          <button 
            onClick={onViewAll}
            className="absolute right-0 top-0 flex items-center gap-1 text-[8px] text-amethyst-400 font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-amethyst-950/30 px-2 py-1 rounded-md border border-amethyst-500/30 hover:bg-amethyst-900/50"
          >
            LOGS <ArrowRight size={10} />
          </button>
        )}
        
        {!isMini && alerts.length > 0 && (
          <button 
            onClick={handleExport}
            className="absolute right-0 top-0 flex items-center gap-2 text-[10px] text-gray-300 font-black uppercase tracking-widest transition-colors duration-300 bg-dark-800/50 hover:bg-amethyst-900/40 hover:text-amethyst-300 px-3 py-1.5 rounded-lg border border-dark-600 hover:border-amethyst-500/50 cursor-pointer"
          >
            <Download size={14} /> EXPORT CSV
          </button>
        )}
      </div>

      <div className={`pr-4 space-y-2 overflow-y-auto custom-scrollbar ${isMini ? 'max-h-[140px]' : 'flex-1 rounded-xl bg-dark-900/40 border border-dark-700/30 p-4'}`}>
        {!isMini && alerts.length > 0 && (
          <div className="grid grid-cols-12 gap-4 pb-2 border-b border-dark-700/50 text-[10px] text-cyphgray font-black uppercase tracking-widest mb-4 px-2">
            <div className="col-span-2">TIMESTAMP</div>
            <div className="col-span-2">SEVERITY</div>
            <div className="col-span-2">SYS CODE</div>
            <div className="col-span-6">DIAGNOSTIC MESSAGE</div>
          </div>
        )}
        
        {displayAlerts.map((alert) => (
          isMini ? (
            // Mini View
            <div 
              key={alert.id} 
              className={`p-4 rounded-xl border-l-4 flex gap-4 items-start transition-all ${
                alert.severity === AlertSeverity.CRITICAL 
                  ? 'bg-red-950/20 border-red-500/50 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]' 
                  : alert.severity === AlertSeverity.ATTENTION_REQUIRED 
                    ? 'bg-yellow-950/20 border-yellow-500/50' 
                    : 'bg-blue-950/20 border-blue-500/50'
              }`}
            >
              <div className="mt-1 flex-shrink-0">
                 {alert.severity === AlertSeverity.CRITICAL ? (
                   <AlertOctagon size={18} className="text-red-400 animate-pulse" />
                 ) : (
                   <AlertTriangle size={18} className="text-yellow-400" />
                 )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-black uppercase tracking-tight leading-relaxed ${
                  alert.severity === AlertSeverity.CRITICAL ? 'text-red-400' : 'text-gray-200'
                }`}>
                  {alert.message}
                </p>
                <div className="flex justify-between w-full mt-3 border-t border-white/5 pt-2 font-handjet font-extralight">
                  <span className="text-[14px] text-cyphgray uppercase">{alert.code}</span>
                  <span className="text-[14px] text-cyphgray uppercase tracking-widest">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
              </div>
            </div>
          ) : (
            // Full Logs View (Minimalistic Table Row)
            <div 
              key={alert.id} 
              className="grid grid-cols-12 gap-4 items-center py-3 px-2 border-b border-dark-700/30 hover:bg-dark-800/40 transition-colors group/row rounded-lg"
            >
              <div className="col-span-2 text-[12px] font-handjet font-medium text-gray-300 tracking-wider">
                {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}.<span className="text-[10px] text-gray-500">{new Date(alert.timestamp).getMilliseconds().toString().padStart(3, '0')}</span>
              </div>
              
              <div className="col-span-2 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  alert.severity === AlertSeverity.CRITICAL ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 
                  alert.severity === AlertSeverity.ATTENTION_REQUIRED ? 'bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]' : 'bg-blue-500'
                }`}></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  alert.severity === AlertSeverity.CRITICAL ? 'text-red-400' : 
                  alert.severity === AlertSeverity.ATTENTION_REQUIRED ? 'text-yellow-400' : 'text-blue-400'
                }`}>{alert.severity.replace('_', ' ')}</span>
              </div>
              
              <div className="col-span-2 text-[12px] text-amethyst-300 font-doto font-bold uppercase tracking-widest">
                {alert.code}
              </div>
              
              <div className="col-span-6 text-[11px] font-bold uppercase tracking-wide truncate text-gray-300">
                {alert.message}
              </div>
            </div>
          )
        ))}
        
        {isMini && alerts.length > 1 && (
          <div className="text-center pt-2">
            <span className="text-[9px] text-cyphgray uppercase font-black tracking-[0.4em] opacity-80">
              + {alerts.length - 1} QUEUED ENTRIES
            </span>
          </div>
        )}
      </div>

      {isMini && onViewAll && (
        <button 
          onClick={onViewAll}
          className="absolute inset-x-0 bottom-0 top-12 z-10 cursor-pointer hidden sm:block"
          title="Click to view all logs"
        />
      )}
    </div>
  );
};