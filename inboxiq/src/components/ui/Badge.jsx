import React from 'react';

export default function Badge({ children, color = 'cyan', dot = false }) {
  const colors = {
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    violet: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    green: 'bg-green-500/15 text-green-400 border-green-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    slate: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  };

  const dotColors = {
    cyan: 'bg-cyan-400',
    violet: 'bg-violet-400',
    green: 'bg-green-400',
    red: 'bg-red-400',
    orange: 'bg-orange-400',
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-400',
    slate: 'bg-slate-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${colors[color]}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color]}`} />}
      {children}
    </span>
  );
}
