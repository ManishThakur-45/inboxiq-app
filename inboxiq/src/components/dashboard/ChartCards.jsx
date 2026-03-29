import React from 'react';

const CAT_COLORS = {
  Billing: '#3b82f6',
  Technical: '#8b5cf6',
  Sales: '#22c55e',
  Support: '#22d3ee',
  Spam: '#ef4444',
};

const DEPT_COLORS = {
  Finance: '#3b82f6',
  Engineering: '#8b5cf6',
  Sales: '#22c55e',
  Support: '#22d3ee',
  Blocked: '#ef4444',
};

function MiniBar({ label, value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-400 w-20 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs font-mono text-slate-500 w-4 text-right">{value}</span>
    </div>
  );
}

export function CategoryChart({ breakdown }) {
  const entries = Object.entries(breakdown || {});
  const max = Math.max(...entries.map(([, v]) => v), 1);
  return (
    <div className="space-y-3">
      {entries.length === 0
        ? <p className="text-xs text-slate-600 text-center py-4">No data yet</p>
        : entries.map(([cat, count]) => (
            <MiniBar key={cat} label={cat} value={count} max={max} color={CAT_COLORS[cat] || '#64748b'} />
          ))}
    </div>
  );
}

export function DepartmentChart({ breakdown }) {
  const entries = Object.entries(breakdown || {});
  const max = Math.max(...entries.map(([, v]) => v), 1);
  return (
    <div className="space-y-3">
      {entries.length === 0
        ? <p className="text-xs text-slate-600 text-center py-4">No data yet</p>
        : entries.map(([dept, count]) => (
            <MiniBar key={dept} label={dept} value={count} max={max} color={DEPT_COLORS[dept] || '#64748b'} />
          ))}
    </div>
  );
}
