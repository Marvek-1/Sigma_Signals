
import React from 'react';
import { AFRO_DISEASES, AFRO_ISO3_LIST } from '../constants';
import { GradeLevel } from '../types';
import { Filter, Globe, Activity, ShieldAlert, Check } from 'lucide-react';

interface Props {
  counts: Record<string, number>;
  filters: { diseases: string[], countries: string[], grades: string[] };
  onFilterChange: (filters: any) => void;
}

const SidebarLeft: React.FC<Props> = ({ counts, filters, onFilterChange }) => {
  const toggleFilter = (key: 'diseases' | 'countries' | 'grades', val: string) => {
    const next = filters[key].includes(val) 
      ? filters[key].filter(v => v !== val) 
      : [...filters[key], val];
    onFilterChange({ ...filters, [key]: next });
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden shrink-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <Filter size={16} className="text-blue-500" />
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategic Filters</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* WHO Grade Levels */}
        <div className="space-y-4">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert size={12} className="text-red-500" /> WHO GRADE LEVELS
          </label>
          <div className="flex flex-col gap-1.5">
            {Object.values(GradeLevel).map(grade => (
              <button 
                key={grade}
                onClick={() => toggleFilter('grades', grade)}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                  filters.grades.includes(grade) 
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                    : 'bg-slate-800/30 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                <span>{grade}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] opacity-40">{counts[grade] || 0}</span>
                  {filters.grades.includes(grade) && <Check size={10} />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pathogens */}
        <div className="space-y-4">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Activity size={12} className="text-emerald-500" /> PATHOGENS
          </label>
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {AFRO_DISEASES.map(d => (
              <button 
                key={d.code}
                onClick={() => toggleFilter('diseases', d.code)}
                className={`w-full text-left px-2 py-1 rounded text-[11px] transition-all flex items-center justify-between ${
                  filters.diseases.includes(d.code) 
                    ? 'bg-blue-500/10 text-blue-400 font-bold' 
                    : 'text-slate-500 hover:bg-slate-800/50'
                }`}
              >
                <span className="truncate">{d.name}</span>
                {filters.diseases.includes(d.code) && <Check size={10} />}
              </button>
            ))}
          </div>
        </div>

        {/* Member States */}
        <div className="space-y-4">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Globe size={12} className="text-blue-400" /> MEMBER STATES
          </label>
          <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {AFRO_ISO3_LIST.map(iso => (
              <button 
                key={iso}
                onClick={() => toggleFilter('countries', iso)}
                className={`px-2 py-1 rounded text-[10px] transition-all border ${
                  filters.countries.includes(iso) 
                    ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 font-bold' 
                    : 'bg-slate-800/30 border-slate-800 text-slate-500 hover:bg-slate-800'
                }`}
              >
                {iso}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarLeft;
