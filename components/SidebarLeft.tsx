
import React from 'react';
import { AFRO_DISEASES, AFRO_ISO3_LIST } from '../constants';
import { Filter, Layers, Zap } from 'lucide-react';

interface Props {
  counts: Record<string, number>;
  onFilterChange: (filters: any) => void;
}

const SidebarLeft: React.FC<Props> = ({ counts, onFilterChange }) => {
  return (
    <aside className="w-72 border-r border-slate-800 bg-[#0b0f1a] overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={14} className="text-blue-500" />
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Surveillance Filter</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Member State</label>
            {/* Added onChange handler to trigger intelligence sync */}
            <select 
              onChange={(e) => onFilterChange((prev: any) => ({ ...prev, countries: e.target.value ? [e.target.value] : [] }))}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">All 47 Countries</option>
              {AFRO_ISO3_LIST.map(iso => <option key={iso} value={iso}>{iso}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-600 uppercase ml-1">Pathogen/syndrome</label>
            {/* Added onChange handler to trigger intelligence sync */}
            <select 
              onChange={(e) => onFilterChange((prev: any) => ({ ...prev, diseases: e.target.value ? [e.target.value] : [] }))}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">Priority pathogens</option>
              {AFRO_DISEASES.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Layers size={14} className="text-amber-500" />
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grade Distribution</h3>
        </div>
        <div className="space-y-2">
           {['Grade 3', 'Grade 2', 'Grade 1', 'Ungraded'].map(grade => (
             <div key={grade} className="flex justify-between items-center bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
               <span className="text-[10px] font-bold text-slate-400">{grade}</span>
               <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{counts[grade] || 0}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="mt-auto">
        <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 p-4 rounded-2xl border border-blue-500/20">
           <Zap size={20} className="text-amber-500 mb-3" />
           <p className="text-[10px] font-bold text-slate-300 leading-relaxed mb-4">
             AI detects vernacular signals in 8 regional languages to identify outbreaks before official clinical confirmation.
           </p>
           <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all">
             Protocol Docs
           </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarLeft;
