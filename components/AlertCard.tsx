
import React from 'react';
import { AfroEvent, AlertLevel, SeverityLevel } from '../types';
import { MapPin, Info, ExternalLink, MessageSquare, Zap, ShieldCheck, Activity, Clock, TrendingUp, Smile, Frown, Meh, Search } from 'lucide-react';

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

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case SeverityLevel.CRITICAL: return '🔴 Critical';
      case SeverityLevel.HIGH: return '🟠 High';
      case SeverityLevel.MODERATE: return '🟡 Moderate';
      default: return '🟢 Low';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    const s = sentiment.toLowerCase();
    if (s.includes('positive') || s.includes('calm')) return <Smile size={14} className="text-emerald-400" />;
    if (s.includes('panic') || s.includes('fear') || s.includes('alarm')) return <Frown size={14} className="text-red-400" />;
    return <Meh size={14} className="text-amber-400" />;
  };

  const formattedDate = alert.created_at 
    ? new Date(alert.created_at).toLocaleString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit'
      })
    : 'Pending detection...';

  const timeline = alert.community_pulse?.signal_timeline || [];

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full shadow-2xl group relative">
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/60 rounded-lg border border-slate-700">
        <Activity size={10} className="text-blue-500 animate-pulse" />
        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{alert.grade}</span>
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2 items-center">
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider ${getLevelColor(alert.alert_level)}`}>
              {alert.alert_level} Priority
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-700">
              {alert.disease?.syndrome || 'N/A'}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-100 mb-2 leading-tight group-hover:text-blue-400 transition-colors italic tracking-tight">
          {alert.title}
        </h3>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-500/5 px-3 py-1.5 rounded-xl border border-blue-500/10 w-fit">
            <MapPin size={14} />
            <span>{alert.country_name} • {alert.admin1 || 'Regional'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-[9px] font-black uppercase tracking-widest">
            <Clock size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Severity</p>
            <p className="text-xs font-black italic">{getSeverityBadge(alert.epidemiology?.severity || SeverityLevel.LOW)}</p>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700">
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1.5">Confidence</p>
            <p className="text-xs font-black italic">{(alert.confidence * 100).toFixed(0)}% Accuracy</p>
          </div>
        </div>

        {/* Enhanced Community Signal Pulse */}
        <div className="mb-8 p-6 bg-slate-900/60 rounded-3xl border border-slate-700/50 shadow-inner">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                    <MessageSquare size={16} className="text-emerald-500" />
                 </div>
                 <span className="text-[11px] font-black text-slate-200 uppercase tracking-widest">Signal Intelligence</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 rounded-xl border border-slate-700">
                 {getSentimentIcon(alert.community_pulse?.sentiment || 'Neutral')}
                 <span className="text-[9px] font-black text-slate-400 uppercase">{alert.community_pulse?.sentiment}</span>
              </div>
           </div>

           {alert.community_pulse?.context_explanation && (
             <p className="text-[11px] text-slate-300 mb-5 leading-relaxed bg-slate-800/20 p-4 rounded-2xl border border-slate-800/50">
               {alert.community_pulse.context_explanation}
             </p>
           )}

           {/* Vernacular Breakdown */}
           <div className="space-y-3 mb-6">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Search size={10} /> Linguistic Symptom Mapping
              </p>
              <div className="grid gap-2">
                 {alert.community_pulse?.vernacular_mapping?.map((mapping, i) => (
                   <div key={i} className="flex items-center justify-between bg-slate-950/50 p-2.5 rounded-xl border border-slate-800 group/map hover:border-emerald-500/30 transition-colors">
                      <span className="text-[10px] font-black text-emerald-400 italic">"{mapping.term}"</span>
                      <div className="h-px flex-1 bg-slate-800 mx-3 opacity-30"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter group-hover/map:text-slate-200">{mapping.symptom_mapping}</span>
                   </div>
                 )) || alert.community_pulse?.vernacular_terms?.map((v, i) => (
                   <span key={i} className="text-[10px] font-black text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10 italic w-fit">
                     "{v}"
                   </span>
                 ))}
              </div>
           </div>

           {/* Signal Timeline Sparkline-esque visualization */}
           {timeline.length > 0 && (
             <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <TrendingUp size={10} /> Propagation Timeline
                   </p>
                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{alert.community_pulse.informal_signal_volume} Volume</span>
                </div>
                <div className="flex items-end gap-1.5 h-12">
                   {timeline.map((point, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500/20 rounded-t-sm relative group/point"
                        style={{ height: `${point.volume}%` }}
                      >
                         <div className="absolute inset-x-0 bottom-0 bg-blue-500 rounded-t-sm group-hover/point:bg-blue-400 transition-colors"></div>
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-[8px] px-1.5 py-0.5 rounded border border-slate-700 opacity-0 group-hover/point:opacity-100 transition-opacity whitespace-nowrap z-20">
                            {point.volume}% • {new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="space-y-4 mt-auto">
          <div className="flex items-center gap-2 text-[11px] font-black text-amber-500 uppercase tracking-widest">
            <Zap size={16} fill="currentColor" /> Strategic Response
          </div>
          <div className="space-y-3">
            {alert.field_readiness?.slice(0, 2).map((action, i) => (
              <div key={i} className="flex gap-3 text-xs text-slate-300 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
                <ShieldCheck size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-8 py-5 bg-slate-900/60 border-t border-slate-700 flex justify-between items-center group-hover:bg-slate-900 transition-colors">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Verified Source</span>
            {alert.evidence?.reliability_note && (
              <span className="text-[8px] font-black bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                {alert.evidence.reliability_note}
              </span>
            )}
          </div>
          <span className="text-xs font-black text-slate-200 uppercase italic truncate max-w-[200px]">{alert.evidence?.source_platform || 'AFRO Sentinel Hub'}</span>
        </div>
        {alert.evidence?.top_urls?.[0] && (
          <a href={alert.evidence.top_urls[0]} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600/10 hover:bg-blue-600 hover:text-white rounded-2xl text-blue-400 transition-all border border-blue-500/20 shadow-lg">
            <ExternalLink size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
