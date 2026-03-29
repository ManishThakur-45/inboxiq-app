import React from 'react';

export default function Button({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', icon }) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary: 'bg-cyan-500 hover:bg-cyan-400 text-navy-900 shadow-lg hover:shadow-cyan-500/25 active:scale-95',
    secondary: 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-cyan-500/30',
    ghost: 'text-slate-400 hover:text-cyan-400 hover:bg-white/5',
    danger: 'bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30',
    outline: 'border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
