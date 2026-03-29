import React from 'react';
import Card from '../ui/Card';

export default function StatCard({ label, value, icon, trend, color = 'cyan', sub }) {
  const colors = {
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    green: { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  };

  const c = colors[color] || colors.cyan;

  return (
    <Card className="p-6 hover-lift">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text}`}
        >
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-mono px-2 py-1 rounded-lg ${
              trend >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}
          >
            {trend >= 0 ? '+' : ''}
            {trend}%
          </span>
        )}
      </div>

      <div className={`text-3xl font-display font-bold ${c.text} mb-1`}>{value}</div>
      <div className="text-sm text-slate-400 font-medium">{label}</div>
      {sub && <div className="text-xs text-slate-600 mt-1">{sub}</div>}
    </Card>
  );
}