
import React from 'react';
import { AfroEvent } from '../types';
import { Radio, ArrowUpRight, MessageSquare, Globe, Tv, Facebook, Share2 } from 'lucide-react';

interface Props {
  signals: AfroEvent[];
}

const SidebarRight: React.FC<Props> = ({ signals }) => {
  const getSourceIcon = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('tiktok') || s.includes('tv') || s.includes('video')) return <Tv size={12} className="text-red-500" />;
    if (s.includes('facebook') || s.includes('instagram')) return <Facebook size={12} className="text-blue-500" />;
    return <Radio size={12} className="text-blue-400" />;
  };

  return (
    <aside className="w-72 border-l border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio size={14} className="text-blue-500" />
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          </div>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Street Signals</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
           <span className="text-[8px] font-black text-blue-400 uppercase">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        {signals.length === 0 ? (
          <div className="py-20 text-center opacity-30 flex flex-col items-center gap-3">
            <Radio size={24} className="animate-pulse text-slate-600" />
            <p className="text-[9px] uppercase font-black tracking-widest">Scanning Digital Airwaves...</p>
          </div>
        ) : (
          signals.map((signal) => (
            <div key={signal.id} className="group bg-slate-800/40 border border-slate-800 rounded-xl p-3.5 hover:border-blue-500/40 transition-all shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-2 relative z-10">
                 <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-700">
                      {getSourceIcon(signal.evidence.source_platform)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">
                        {signal.evidence.source_platform || 'Digital Signal'}
                      </span>
                      <span className="text-[7px] font-bold text-blue-400 uppercase mt-1">{signal.country_iso3}</span>
                    </div>
                 </div>
                 {signal.evidence.top_urls?.[0] && (
                   <a 
                     href={signal.evidence.top_urls[0]} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="p-1 hover:bg-slate-700 rounded-lg transition-colors text-slate-500 hover:text-blue-400"
                   >
                     <ArrowUpRight size={14} />
                   </a>
                 )}
              </div>
              
              <h4 className="text-[11px] font-bold text-slate-200 leading-tight mb-2 line-clamp-2">
                {signal.title}
              </h4>

              <div className="flex flex-wrap gap-1 mb-3">
                 {signal.community_pulse.vernacular_terms?.slice(0, 3).map((v, i) => (
                   <span key={i} className="text-[8px] font-black text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 italic">
                     "{v}"
                   </span>
                 ))}
              </div>

              {signal.community_pulse.anecdote_snippet && (
                <p className="text-[10px] text-slate-500 italic mb-3 leading-relaxed border-l-2 border-slate-700 pl-2">
                  "{signal.community_pulse.anecdote_snippet}"
                </p>
              )}

              <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/50">
                 <div className="flex items-center gap-1 text-[8px] font-black text-slate-600 uppercase tracking-widest">
                    <Share2 size={10} /> {signal.evidence.signal_count} Mentions
                 </div>
                 <div className="text-[8px] font-black text-blue-500/60 uppercase">
                    CONF: {Math.round(signal.confidence * 100)}%
                 </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default SidebarRight;
