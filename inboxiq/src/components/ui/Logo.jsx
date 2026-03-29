import React from 'react';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 26, text: 'text-xl' },
    lg: { icon: 36, text: 'text-3xl' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: s.icon + 12,
          height: s.icon + 12,
          background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
          boxShadow: '0 0 20px rgba(34,211,238,0.35)',
        }}
      >
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M2 6l10 7 10-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="7" r="3" fill="#a78bfa" stroke="white" strokeWidth="1" />
        </svg>
      </div>
      <span
        className={`font-display font-bold tracking-tight ${s.text}`}
        style={{ background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        InboxIQ
      </span>
    </div>
  );
}
