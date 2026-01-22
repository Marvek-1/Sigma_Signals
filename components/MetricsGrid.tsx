
import React from 'react';
import { AfroEvent, AlertLevel } from '../types';
import { Activity, ShieldAlert, Globe, Radio } from 'lucide-react';

interface Props {
  alerts: AfroEvent[];
}

const MetricsGrid: React.FC<Props> = ({ alerts }) => {
  const signalCount = alerts.filter(a => a.type === 'SIGNAL').length;
  const validatedCount = alerts.filter(a => a.type === 'ALERT').length;
  const highRisk = alerts.filter(a => a.alert_level === AlertLevel.HIGH).length;
  const uniqueCountries = new Set(alerts.map(a => a.country_iso3)).size;

  const stats = [
    { label: 'Raw Signals', value: signalCount, icon: Radio, color: 'text-blue-400' },
    { label: 'Validated Alerts', value: validatedCount, icon: ShieldAlert, color: 'text-amber-400' },
    { label: 'Grade 3 Events', value: highRisk, icon: Activity, color: 'text-red-400' },
    { label: 'AFRO Member States', value: `${uniqueCountries}/47`, icon: Globe, color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-slate-800/40 border border-slate-700 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
          <div className={`p-3.5 rounded-xl bg-slate-900/60 ${stat.color} border border-slate-700/50`}>
            <stat.icon size={22} />
          </div>
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
            <p className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
