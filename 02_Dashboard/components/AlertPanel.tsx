import React, { useState } from 'react';
import { AlertTriangle, AlertOctagon, Info, ArrowRight, Download, ChevronLeft, ChevronRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { BMSAlert, AlertSeverity } from '../types';

interface AlertPanelProps {
  alerts: BMSAlert[];
  isMini?: boolean;
  relayStatus?: 'CONNECTED' | 'DISCONNECTED';
  onViewAll?: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, isMini = false, relayStatus, onViewAll }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  if (alerts.length === 0) {
    return (
      <div className="card-hover bg-dark-800/30 backdrop-blur-md shadow-xl border border-dark-700/50 rounded-2xl p-6 h-full flex flex-col text-cyphgray font-doto">
        <div className="w-full flex justify-center mb-6">
          <h2 className="text-lg text-header-purple font-black uppercase tracking-[0.4em] border-b border-dark-700/30 pb-4 px-10">
            SYSTEM ALERTS
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="p-3 bg-dark-700/30 rounded-full">
            <Info size={24} className="text-amethyst-500/50" />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold opacity-70">System Nominal</span>
        </div>
      </div>
    );
  }

  // Map alerts and force descending chronological order (newest first)
  const sortedAlerts = [...(isMini ? alerts.slice(0, 1) : alerts)]
    .sort((a, b) => b.timestamp - a.timestamp);

  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const paginatedAlerts = isMini 
    ? sortedAlerts 
    : sortedAlerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExport = () => {
    if (alerts.length === 0) return;
    
    const headers = ['Timestamp', 'Severity', 'Code', 'Message'];
    const csvRows = alerts.map(alert => {
      const d = new Date(alert.timestamp);
      const time = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}.${String(d.getMilliseconds()).padStart(3,'0')}`;
      const severity = alert.severity.replace('_', ' ');
      return `"${time}",${severity},${alert.code},"${alert.message}"`;
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
    <div className={`group ${isMini ? 'card-hover bg-dark-800/30 shadow-xl border-dark-700/50 rounded-2xl' : 'bg-transparent border-transparent h-full'} backdrop-blur-md border p-6 flex flex-col font-doto relative`}>
      
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

      {/* Relay status — mini only, below heading */}
      {isMini && relayStatus && (
        <div className="flex items-center justify-between mx-2 pb-4 mb-2 border-b border-dark-700/30">
          <div className="flex items-center gap-1.5">
            {relayStatus === 'CONNECTED'
              ? <ShieldCheck size={12} className="text-emerald-400" />
              : <ShieldAlert size={12} className="text-red-400" />
            }
            <span className="text-[12px] text-cyphgray uppercase font-black tracking-widest">RELAY STATUS</span>
          </div>
          <div className={`px-2.5 py-1 rounded border text-[12px] font-black uppercase tracking-widest ${
            relayStatus === 'CONNECTED'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/15 border-red-500/50 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
          }`}>
            {relayStatus}
          </div>
        </div>
      )}

      {isMini ? (
        // Mini view
        <div className="flex flex-col flex-1 overflow-hidden px-2">
          {paginatedAlerts.map((alert) => (
            <div key={alert.id} className="flex flex-col w-full relative z-10 py-2 gap-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12px] font-bold uppercase tracking-wide leading-relaxed text-gray-200 flex-1">
                  {alert.message}
                </p>
                <div className={`px-2.5 py-1 rounded border text-[12px] font-black uppercase tracking-widest shrink-0 ${
                  alert.severity === AlertSeverity.CRITICAL
                    ? 'bg-red-500/15 border-red-500/50 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.15)]'
                    : 'bg-yellow-500/15 border-yellow-500/50 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.1)]'
                }`}>
                  {alert.severity.replace('_', ' ')}
                </div>
              </div>
              <div className="flex justify-between w-full pt-2 border-t border-dark-700/30 font-handjet font-medium text-gray-400">
                <span className="text-[14px] uppercase">{alert.code}</span>
                <span className="text-[14px] uppercase tracking-widest">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            </div>
          ))}
          {alerts.length > 1 && (
            <div className="text-center pt-2">
              <span className="text-[9px] text-cyphgray uppercase font-black tracking-[0.4em] opacity-80">
                + {alerts.length - 1} QUEUED ENTRIES
              </span>
            </div>
          )}
        </div>
      ) : (
        // Full logs view — header / scrollable rows / pagination all in one bounded box
        <div className="flex-1 min-h-0 rounded-xl bg-[#121519] border border-dark-700/30 overflow-hidden" style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
          {/* Fixed column headers */}
          <div className="grid grid-cols-12 gap-4 py-3 px-6 border-b border-dark-700/50 text-[12px] text-header-purple font-black uppercase tracking-[0.2em] bg-dark-900/70 backdrop-blur-lg">
            <div className="col-span-2">TIMESTAMP</div>
            <div className="col-span-3 text-center">SEVERITY</div>
            <div className="col-span-4 text-center">SYS CODE</div>
            <div className="col-span-3 text-right">DIAGNOSTIC MESSAGE</div>
          </div>

          {/* Scrollable rows */}
          <div className="overflow-y-auto custom-scrollbar p-4">
            {paginatedAlerts.map((alert) => (
              <div
                key={alert.id}
                className="grid grid-cols-12 gap-4 items-center py-3 px-2 border-b border-dark-700/30 hover:bg-dark-800/40 transition-colors rounded-lg"
              >
                <div className="col-span-2 text-[14px] font-handjet text-gray-200 tracking-widest flex items-baseline">
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  <span className="text-[11px] text-gray-500 ml-0.5 font-medium">.{new Date(alert.timestamp).getMilliseconds().toString().padStart(3, '0')}</span>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    alert.severity === AlertSeverity.CRITICAL ? 'text-red-400' : 'text-yellow-400'
                  }`}>{alert.severity.replace('_', ' ')}</span>
                </div>
                <div className="col-span-4 text-center text-[12px] text-amethyst-300 font-doto font-bold uppercase tracking-widest">
                  {alert.code}
                </div>
                <div className="col-span-3 text-[11px] font-bold uppercase tracking-wide truncate text-gray-300 text-right">
                  {alert.message}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination — fixed at bottom */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-dark-700/50">
            <span className="text-[12px] text-cyphgray font-black uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, alerts.length)} of {alerts.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous Page"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-dark-600 bg-dark-800 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark-700 hover:text-white transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[12px] text-amethyst-300 font-bold tracking-widest px-2">
                PAGE {currentPage} / {totalPages}
              </span>
              <button
                aria-label="Next Page"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-dark-600 bg-dark-800 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-dark-700 hover:text-white transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      

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