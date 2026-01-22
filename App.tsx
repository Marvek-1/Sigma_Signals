
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchIntelligence } from './services/geminiService';
import { AfroEvent, GradeLevel } from './types';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import AlertCard from './components/AlertCard';
import MetricsGrid from './components/MetricsGrid';
import DiseaseCharts from './components/DiseaseCharts';
import { ToastContainer } from './components/ToastSystem';
import { 
  ShieldAlert, 
  Activity, 
  RefreshCw,
  Loader2,
  Wifi,
  Database,
  TriangleAlert
} from 'lucide-react';

const App: React.FC = () => {
  const [events, setEvents] = useState<AfroEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ diseases: [], countries: [], grades: [] });

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    setFetchError(null);
    const result = await fetchIntelligence(filters);
    
    if (result.error) {
      setFetchError(result.error);
    } else {
      setEvents(result.events);
    }
    
    setLoading(false);
    setIsRefreshing(false);
  }, [filters]);

  useEffect(() => {
    loadData();
    // Frequency reduced to 10 minutes (600,000ms) to prevent RESOURCE_EXHAUSTED
    const interval = setInterval(() => {
      console.log("10-minute intelligence pulse cycle triggered...");
      loadData();
    }, 600000);
    return () => clearInterval(interval);
  }, [loadData]);

  const gradeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(e => {
      counts[e.grade] = (counts[e.grade] || 0) + 1;
    });
    return counts;
  }, [events]);

  const alerts = useMemo(() => events.filter(e => e.type === 'ALERT'), [events]);
  const signals = useMemo(() => events.filter(e => e.type === 'SIGNAL'), [events]);

  return (
    <div className="h-screen flex flex-col bg-[#0b1120] text-slate-100 overflow-hidden font-['Inter']">
      {/* Tactical Header */}
      <header className="h-16 border-b border-slate-800 bg-[#0b1120]/95 backdrop-blur-md flex items-center justify-between px-8 z-50 shadow-xl shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2 rounded-lg shadow-lg shadow-red-900/20 relative">
            <ShieldAlert className="text-white" size={24} />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-30"></div>
          </div>
          <div>
            <h1 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
              AFRO<span className="text-blue-500">SENTINEL</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Live Intelligence Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg">
             <Wifi size={12} className={fetchError ? "text-red-500" : "text-emerald-500 animate-pulse"} />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               {fetchError ? "Connection Limited" : "Signal Locked"}
             </span>
           </div>
           <button 
             onClick={loadData}
             disabled={isRefreshing}
             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black px-5 py-2 rounded-lg text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 group"
           >
             {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />}
             SYNC INTELLIGENCE
           </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        <SidebarLeft counts={gradeCounts} filters={filters} onFilterChange={setFilters} />

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 to-transparent pointer-events-none"></div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-slate-800 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Activity size={32} className="text-blue-500 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-black uppercase tracking-[0.4em] animate-pulse">Scanning Community Digital Signals...</p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto animate-fade-in relative z-10">
              {fetchError === "QUOTA_EXHAUSTED" && (
                <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-4 text-amber-200 shadow-lg">
                  <TriangleAlert size={24} className="flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase tracking-widest">AI Quota Exceeded (429)</p>
                    <p className="text-[11px] opacity-70">Automated sync frequency adjusted. Displaying last known intelligence. System will retry in 10 minutes.</p>
                  </div>
                </div>
              )}

              {/* Aggregated view */}
              <MetricsGrid alerts={alerts} />
              
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                  <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Epidemic SitRep</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Validated High-Precision Graded Events</p>
                  </div>
                </div>

                {alerts.length === 0 ? (
                  <div className="bg-slate-800/10 border-2 border-dashed border-slate-800 rounded-3xl p-24 text-center">
                    <ShieldAlert size={64} className="mx-auto text-slate-800 mb-6 opacity-40" />
                    <p className="text-slate-600 text-lg font-black uppercase italic tracking-widest">
                      {fetchError ? "Sync Suspended: Quota Exhausted" : "No Graded Alerts Detected"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {alerts.map(alert => (
                      <AlertCard key={alert.id} alert={alert} />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12">
                 <DiseaseCharts alerts={events} />
              </div>
            </div>
          )}
        </main>

        <SidebarRight signals={signals} />
      </div>

      <ToastContainer events={events} />

      <footer className="h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-8 text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] shrink-0">
         <div className="flex gap-8">
            <div className="flex items-center gap-2 text-emerald-500/70">
               <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> SYSTEM CORE: NOMINAL
            </div>
            <div className="flex items-center gap-2">
               <Database size={10} className="text-blue-500" /> REFRESH CYCLE: 600S
            </div>
         </div>
         <div className="flex gap-8">
            <span className="text-slate-500 border-r border-slate-800 pr-8 uppercase">IHR (2005) CLASSIFIED SENTINEL</span>
            <span className="text-blue-500 font-black tracking-tighter">WHO-AFRO-HUB-v4.0.0-PRO</span>
         </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
