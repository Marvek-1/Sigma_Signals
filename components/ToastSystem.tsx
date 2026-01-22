
import React, { useState, useEffect } from 'react';
import { AfroEvent } from '../types';
import { ShieldAlert, X, Activity, MessageSquare } from 'lucide-react';

interface Props {
  events: AfroEvent[];
}

export const ToastContainer: React.FC<Props> = ({ events }) => {
  const [visibleToasts, setVisibleToasts] = useState<string[]>([]);
  // Only show high-priority or high-confidence signals
  const urgent = events.filter(e => e.alert_level === 'HIGH' || (e.type === 'SIGNAL' && e.confidence > 0.85)).slice(0, 3);

  useEffect(() => {
    if (urgent.length > 0) {
      setVisibleToasts(urgent.map(e => e.id));
      const timer = setTimeout(() => setVisibleToasts([]), 10000);
      return () => clearTimeout(timer);
    }
  }, [events]);

  const removeToast = (id: string) => {
    setVisibleToasts(prev => prev.filter(t => t !== id));
  };

  if (visibleToasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none w-80">
      {urgent.filter(e => visibleToasts.includes(e.id)).map((event) => (
        <div key={event.id} className="pointer-events-auto bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl flex items-start gap-4 animate-slide-in relative overflow-hidden group">
           <div className={`absolute left-0 top-0 bottom-0 w-1 ${event.type === 'ALERT' ? 'bg-red-500' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'}`}></div>
           
           <div className={`p-2 rounded-xl flex-shrink-0 ${event.type === 'ALERT' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
             {event.type === 'ALERT' ? <ShieldAlert size={20} /> : <Activity size={20} />}
           </div>
           
           <div className="flex-1 min-w-0">
             <div className="flex items-center gap-2 mb-1">
                <span className={`text-[8px] font-black uppercase tracking-widest ${event.type === 'ALERT' ? 'text-red-500' : 'text-blue-500'}`}>
                  {event.type === 'ALERT' ? 'Validated Priority' : 'High-Confidence Signal'}
                </span>
                <span className="text-[7px] text-slate-600 font-bold">•</span>
                <span className="text-[8px] text-slate-500 font-bold uppercase">{event.country_iso3}</span>
             </div>
             <p className="text-[11px] font-black text-slate-100 leading-tight mb-2 truncate group-hover:whitespace-normal">
               {event.title}
             </p>
             <div className="flex items-center gap-1.5">
               <MessageSquare size={10} className="text-slate-600" />
               <p className="text-[9px] text-slate-500 font-medium italic truncate">
                 "{event.community_pulse.vernacular_terms?.[0] || 'Community signal detected...'}"
               </p>
             </div>
           </div>

           <button onClick={() => removeToast(event.id)} className="text-slate-600 hover:text-white transition-colors">
             <X size={14} />
           </button>
        </div>
      ))}
      <style>{`
        @keyframes slide-in-toast {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in-toast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
