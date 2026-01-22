
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
  Database,
  Cpu
} from 'lucide-react';

const App: React.FC = () => {
  const [events, setEvents] = useState<AfroEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filters, setFilters] = useState({ diseases: [], countries: [], grades: [] });

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    const data = await fetchIntelligence(filters);
    setEvents(data);
    setLoading(false);
    setIsRefreshing(false);
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]); // Added loadData to dependency array for correct effect triggering

  // Compute stats for Left Sidebar
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
    <div className="h-screen flex flex-col bg-[#0b0f1a] overflow-hidden">
      {/* Tactical Header */}
      <header className="h-20 border-b border-slate-800 bg-[#0b0f1a] flex items-center justify-between px-8 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-2.5 rounded-xl">
            <ShieldAlert className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
              AFRO<span className="text-amber-500">ALERT</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Signal & Event Intelligence Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Active</span>
           </div>
           <button 
             onClick={loadData}
             disabled={isRefreshing}
             className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-900/10 active:scale-95"
           >
             {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
             SYNC INTELLIGENCE
           </button>
        </div>
      </header>

      {/* Main Tactical Interface */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Control Panel */}
        <SidebarLeft counts={gradeCounts} onFilterChange={setFilters} />

        {/* Central Intelligence Feed */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/10 to-transparent">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-800 border-t-amber-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu size={32} className="text-amber-500 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Calibrating Sentinel Neural Nets...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-2">
                   <Activity size={18} className="text-blue-500" />
                   <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Situation Overview</h2>
                </div>
                <MetricsGrid alerts={alerts} />
                {/* Fix: Integrated DiseaseCharts component for visualization */}
                <DiseaseCharts alerts={events} />
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Validated Alerts</h2>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">High-precision events graded by WHO AFRO criteria</p>
                  </div>
                  <div className="px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-lg text-red-500 text-[10px] font-black uppercase tracking-widest">
                    {alerts.length} High-Risk Events
                  </div>
                </div>

                {alerts.length === 0 ? (
                  <div className="bg-slate-800/10 border-2 border-dashed border-slate-800 rounded-[2rem] p-20 text-center">
                    <ShieldAlert size={48} className="mx-auto text-slate-800 mb-4" />
                    <p className="text-slate-600 font-black uppercase italic">Zero Validated High-Risk Alerts Found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {alerts.map(alert => (
                      <AlertCard key={alert.id} alert={alert} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Right Persistence Panel (The Signals) */}
        <SidebarRight signals={signals} />
      </div>

      {/* Global Toast Layer */}
      <ToastContainer events={alerts} />

      {/* Futuristic Bottom Status Bar */}
      <footer className="h-10 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
         <div className="flex gap-8">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> CORE: OPERATIONAL
            </div>
            <div className="flex items-center gap-2">
               <Database size={10} /> LATENCY: 240MS
            </div>
         </div>
         <div className="flex gap-8">
            <span className="text-slate-400">RESTRICTED ACCESS: WHO-AFRO-WHE-INTELLIGENCE</span>
            <span className="text-blue-500 font-black tracking-tighter">v2.1.0-SENTINEL</span>
         </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-slide-in { animation: slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-progress { animation: progress 8s linear forwards; }
      `}</style>
    </div>
  );
};

export default App;
