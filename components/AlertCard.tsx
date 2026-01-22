
import React from 'react';
import { AfroAlert, AlertLevel, SeverityLevel } from '../types';
import { MapPin, Info, ExternalLink, ChevronRight, AlertTriangle } from 'lucide-react';

interface Props {
  alert: AfroAlert;
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

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-500 transition-all duration-300 group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 items-center">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getLevelColor(alert.alert_level)}`}>
              {alert.alert_level}
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              {alert.disease?.code || 'N/A'}
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {new Date(alert.created_at || Date.now()).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
          {alert.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-4">
          <MapPin size={14} className="text-blue-400" />
          <span>{alert.country_iso3}{alert.admin1 ? `, ${alert.admin1}` : ''}</span>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {alert.summary}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-900/40 rounded-lg">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Severity</p>
            <p className="text-sm font-medium">{getSeverityBadge(alert.severity)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Confidence</p>
            <p className="text-sm font-medium">{(alert.confidence * 100).toFixed(0)}% Match</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
            <div className="text-xs text-slate-400 italic leading-snug">
              Evidence: {alert.evidence.signal_count} signals from {alert.evidence.unique_sources} sources 
              ({alert.evidence.source_ids?.join(', ') || 'N/A'})
            </div>
          </div>
          
          <div className="pt-2 border-t border-slate-700/50">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">Recommended Actions</p>
            <div className="flex flex-wrap gap-1.5">
              {alert.recommended_afro_actions?.slice(0, 2).map((action, i) => (
                <span key={i} className="bg-slate-700/50 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-600">
                  {action}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-slate-900/30 border-t border-slate-700 flex justify-between items-center group-hover:bg-slate-900/60 transition-colors">
        <button className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:text-blue-300">
          VIEW FULL CASE <ChevronRight size={14} />
        </button>
        {alert.evidence.top_urls?.[0] && (
          <a href={alert.evidence.top_urls[0]} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-slate-700 text-slate-400">
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
};

export default AlertCard;
