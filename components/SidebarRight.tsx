
import React from 'react';
import { AfroEvent } from '../types';
import { Radio, ArrowUpRight } from 'lucide-react';

interface Props {
  signals: AfroEvent[];
}

const SidebarRight: React.FC<Props> = ({ signals }) => {
  return (
    <aside className="w-80 border-l border-slate-800 bg-[#0b0f1a] overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-blue-500 animate-pulse" />
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Raw Signal Feed</h3>
        </div>
        <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">{signals.length} New</span>
      </div>

      <div className="space-y-4">
        {signals.map((signal, idx) => (
          <div key={idx} className="group cursor-pointer bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-2">
               <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{signal.country_iso3} • {signal.admin1 || 'Regional'}</span>
               <ArrowUpRight size={12} className="text-slate-700 group-hover:text-blue-400" />
            </div>
            <h4 className="text-[11px] font-black text-slate-200 leading-tight mb-2 line-clamp-2">{signal.title}</h4>
            <div className="flex flex-wrap gap-1 mb-2">
               {signal.community_pulse.vernacular_terms.slice(0, 2).map((v, i) => (
                 <span key={i} className="text-[8px] font-bold text-emerald-500/70">#{v}</span>
               ))}
            </div>
            <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{signal.summary}</p>
          </div>
        ))}
        {signals.length === 0 && (
          <div className="p-10 text-center opacity-30 italic text-[10px]">No unvalidated signals active...</div>
        )}
      </div>
    </aside>
  );
};

export default SidebarRight;
