
import React, { useState, useEffect, useCallback } from 'react';
import { fetchDiseaseAlerts } from './services/geminiService';
import { AfroAlert, DiseaseInfo } from './types';
import { AFRO_DISEASES, AFRO_ISO3_LIST } from './constants';
import AlertCard from './components/AlertCard';
import MetricsGrid from './components/MetricsGrid';
import DiseaseCharts from './components/DiseaseCharts';
import { 
  Search, 
  RefreshCw, 
  Filter, 
  Settings, 
  Bell, 
  ShieldCheck, 
  Database,
  ArrowUpRight,
  Loader2
} from 'lucide-react';

const App: React.FC = () => {
  const [alerts, setAlerts] = useState<AfroAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDisease, setSelectedDisease] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    const data = await fetchDiseaseAlerts(selectedDisease || undefined, selectedCountry || undefined);
    setAlerts(data);
    setLoading(false);
    setIsRefreshing(false);
  }, [selectedDisease, selectedCountry]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
                AFRO<span className="text-blue-500">SENTINEL</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">
                WHO regional signal intelligence
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm font-semibold text-slate-400">
              <a href="#" className="text-blue-400 border-b-2 border-blue-400 pb-1">Surveillance</a>
              <a href="#" className="hover:text-white transition-colors">Risk Maps</a>
              <a href="#" className="hover:text-white transition-colors">Reports</a>
              <a href="#" className="hover:text-white transition-colors">Labs</a>
            </nav>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
              </button>
              <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
                <Settings size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 border border-white/20"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Filter Bar */}
        <section className="bg-slate-800/30 border border-slate-700 p-4 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedDisease}
                  onChange={(e) => setSelectedDisease(e.target.value)}
                >
                  <option value="">All Priority Diseases</option>
                  {AFRO_DISEASES.map(d => (
                    <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">All AFRO Countries</option>
                  {AFRO_ISO3_LIST.map(iso => (
                    <option key={iso} value={iso}>{iso}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button 
                onClick={loadData}
                disabled={isRefreshing}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all shadow-lg shadow-blue-900/20 active:scale-95 whitespace-nowrap"
              >
                {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                SYNC PIPELINE
              </button>
              <div className="bg-slate-900 border border-slate-700 p-1 rounded-lg flex gap-1">
                <button className="p-1.5 bg-slate-800 rounded text-blue-400">
                  <Database size={18} />
                </button>
                <button className="p-1.5 text-slate-500 hover:text-slate-300">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <div className="text-center">
              <h3 className="text-xl font-bold">Initializing Signal Extraction...</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Gemini is querying ProMED, GDELT, and official WHO channels for live AFRO signals.</p>
            </div>
          </div>
        ) : (
          <>
            <MetricsGrid alerts={alerts} />
            
            <DiseaseCharts alerts={alerts} />

            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">Live Signals Feed</h2>
                <p className="text-slate-500 text-sm font-medium">Real-time extracted events from multi-source digital surveillance</p>
              </div>
              <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest border border-slate-800 px-3 py-1 rounded">
                Updated {new Date().toLocaleTimeString()}
              </div>
            </div>

            {alerts.length === 0 ? (
              <div className="bg-slate-800/20 border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center">
                <ShieldCheck size={48} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-xl font-bold text-slate-400">No signals detected for selected parameters</h3>
                <p className="text-slate-600">Try broadening your disease or country selection.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {alerts.map(alert => (
                  <AlertCard key={alert.alert_id} alert={alert} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-blue-500" size={32} />
                <h2 className="text-2xl font-black text-white italic tracking-tighter">AFRO SENTINEL</h2>
              </div>
              <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                A high-fidelity disease surveillance platform leveraging advanced NLP and generative AI 
                to aggregate, extract, and verify public health signals across the 50 WHO AFRO member states. 
                Built for epidemiological preparedness and rapid response coordination.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Master Data Sources</h4>
              <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> ProMED-mail
                </li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> WHO Global Health Obs.
                </li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> GDELT Knowledge Graph
                </li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Africa CDC Digital Surveillance
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Protocol Support</h4>
              <ul className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">IHR (2005) Compliance</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">IDSR Guidelines</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">STAR WASH Risk</li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">NASA Hazard Integration</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
            <div>© 2024 WHO AFRO Digital Health Preparedness Unit. Internal Access Only.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Security Policy</a>
              <a href="#" className="hover:text-white">API Access</a>
              <a href="#" className="hover:text-white">Governance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
