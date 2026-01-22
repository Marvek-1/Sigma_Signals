
import React from 'react';
import { AfroEvent } from '../types';
import { ShieldAlert, X } from 'lucide-react';

interface Props {
  events: AfroEvent[];
}

export const ToastContainer: React.FC<Props> = ({ events }) => {
  const highRisk = events.filter(e => e.alert_level === 'HIGH').slice(0, 2);

  return (
    <div className="fixed bottom-12 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      {highRisk.map((event, i) => (
        <div key={i} className="pointer-events-auto bg-slate-900 border border-red-500/30 rounded-2xl p-4 shadow-2xl flex items-center gap-4 animate-slide-in max-w-sm">
           <div className="bg-red-500/20 p-2 rounded-xl text-red-500">
             <ShieldAlert size={20} />
           </div>
           <div className="flex-1">
             <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-0.5">High-Risk Grade 3 Alert</p>
             <p className="text-[11px] font-bold text-slate-100 truncate">{event.title}</p>
           </div>
           <button className="text-slate-600 hover:text-white">
             <X size={14} />
           </button>
        </div>
      ))}
    </div>
  );
};
