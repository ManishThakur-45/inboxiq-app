import React from 'react';

export default function Card({ children, className = '', glow = false, hover = false }) {
  return (
    <div
      className={`
        rounded-2xl border border-white/6 
        bg-gradient-to-br from-slate-900/80 to-navy-800/60
        ${glow ? 'glow-cyan' : ''}
        ${hover ? 'hover-lift cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
