
import React from 'react';
import { AfroEvent, AlertLevel } from '../types';
import { MapPin, ExternalLink, MessageSquare, AlertCircle, Zap } from 'lucide-react';

interface Props {
  alert: AfroEvent;
}

const AlertCard: React.FC<Props> = ({ alert }) => {
  const getLevelColor = (level: AlertLevel) => {
    switch (level) {
      case AlertLevel.HIGH: return 'bg-red-500/10 text-red-400 border-red-500/20';
      case AlertLevel.WARNING: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case AlertLevel.WATCH: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    if (sentiment === 'panic') return <AlertCircle size={14} className="text-red-500" />;
    return <MessageSquare size={14} className="text-blue-400" />;
  };

  const pulse = alert.community_pulse || { 
    sentiment: 'neutral', 
    informal_signal_volume: 'low', 
    vernacular_terms: [] 
  };

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full shadow-lg">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 items-center">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black border uppercase tracking-wider ${getLevelColor(alert.alert_level)}`}>
              {alert.alert_level} Priority
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/40 px-2 py-0.5 rounded border border-slate-700/50">
              {alert.disease?.syndrome || 'Syndromic'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900/60 rounded-full border border-slate-700/50">
             <div className={`w-1.5 h-1.5 rounded-full ${alert.status === 'validated' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></div>
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{alert.status || 'pending'}</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-100 mb-2 leading-tight tracking-tight">
          {alert.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-4">
          <MapPin size={12} />
          <span className="uppercase tracking-wide">{alert.country_name} {alert.admin1 ? `• ${alert.admin1}` : ''}</span>
        </div>

        {/* Local Vernacular / Community Pulse Section */}
        <div className="mb-5 p-3.5 bg-slate-900/60 rounded-xl border border-slate-700/30">
           <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                {getSentimentIcon(pulse.sentiment)} Community Pulse
              </span>
              <span className={`text-[9px] font-bold px-1.5 rounded ${(pulse.informal_signal_volume || 'low') === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {(pulse.informal_signal_volume || 'low').toUpperCase()} VOL
              </span>
           </div>
           <div className="flex flex-wrap gap-1.5">
              {pulse.vernacular_terms?.map((term, i) => (
                <span key={i} className="text-[10px] text-emerald-400 italic bg-emerald-500/5 px-2 rounded border border-emerald-500/10">
                  "{term}"
                </span>
              ))}
              {(!pulse.vernacular_terms || pulse.vernacular_terms.length === 0) && (
                <span className="text-[10px] text-slate-600 italic">No specific vernacular patterns detected</span>
              )}
           </div>
        </div>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed line-clamp-3 font-medium">
          {alert.summary}
        </p>

        {/* Field Readiness Actions */}
        <div className="space-y-3 mt-auto">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase tracking-widest">
            <Zap size={14} /> Field Readiness Protocol
          </div>
          <div className="space-y-1.5">
            {alert.field_readiness?.slice(0, 3).map((action, i) => (
              <div key={i} className="flex gap-2 text-[11px] text-slate-300 bg-slate-700/20 p-2 rounded-lg border border-slate-700/50">
                <span className="text-blue-500 font-black">•</span>
                <span className="truncate">{action}</span>
              </div>
            )) || (
              <p className="text-[10px] text-slate-600 italic">Protocol definition in progress...</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-700/50 flex justify-between items-center">
        <div className="flex -space-x-2">
           {alert.evidence?.source_types?.map((type, i) => (
             <div key={i} title={type} className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-400 uppercase shadow-sm">
               {type[0]}
             </div>
           )) || <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700"></div>}
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
             {alert.created_at ? new Date(alert.created_at).toLocaleDateString() : 'N/A'}
           </span>
           {alert.evidence?.top_urls?.[0] && (
             <a href={alert.evidence.top_urls[0]} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600/10 hover:bg-blue-600/20 rounded-lg text-blue-400 transition-all">
               <ExternalLink size={14} />
             </a>
           )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
