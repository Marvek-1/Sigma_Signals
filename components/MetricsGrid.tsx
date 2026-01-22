
import React from 'react';
import { AfroAlert, AlertLevel } from '../types';
import { Activity, ShieldAlert, Globe, Radio } from 'lucide-react';

interface Props {
  alerts: AfroAlert[];
}

const MetricsGrid: React.FC<Props> = ({ alerts }) => {
  const highAlerts = alerts.filter(a => a.alert_level === AlertLevel.HIGH).length;
  const uniqueCountries = new Set(alerts.map(a => a.country_iso3)).size;
  const totalSignals = alerts.reduce((acc, curr) => acc + (curr.evidence?.signal_count || 0), 0);

  const stats = [
    { label: 'Active Alerts', value: alerts.length, icon: Activity, color: 'text-blue-400' },
    { label: 'Critical Signals', value: highAlerts, icon: ShieldAlert, color: 'text-red-400' },
    { label: 'AFRO Coverage', value: `${uniqueCountries}/50`, icon: Globe, color: 'text-emerald-400' },
    { label: 'Aggregated Signals', value: totalSignals, icon: Radio, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-slate-900/50 ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;
