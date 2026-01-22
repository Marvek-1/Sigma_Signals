
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { AfroAlert } from '../types';

interface Props {
  alerts: AfroAlert[];
}

const DiseaseCharts: React.FC<Props> = ({ alerts }) => {
  // Aggregate by disease name
  const diseaseDataMap: Record<string, number> = {};
  alerts.forEach(alert => {
    const name = alert.disease?.name || 'Unknown';
    diseaseDataMap[name] = (diseaseDataMap[name] || 0) + 1;
  });

  const chartData = Object.entries(diseaseDataMap).map(([name, count]) => ({ name, count }));

  // Aggregate by Country
  const countryDataMap: Record<string, number> = {};
  alerts.forEach(alert => {
    countryDataMap[alert.country_iso3] = (countryDataMap[alert.country_iso3] || 0) + 1;
  });
  const countryData = Object.entries(countryDataMap).map(([name, value]) => ({ name, value }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Signals by Disease Type</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={100} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Hotspot Countries (Alert Vol.)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={countryData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {countryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {countryData.map((entry, idx) => (
               <div key={idx} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{entry.name}</span>
               </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseCharts;
