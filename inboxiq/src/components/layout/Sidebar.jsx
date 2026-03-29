import React from 'react';
import {
  LayoutDashboard,
  Inbox,
  Mail,
  BarChart2,
  Settings,
  Zap,
  ChevronRight,
  Archive,
} from 'lucide-react';
import Logo from '../ui/Logo';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'connected', label: 'Connected Inbox', icon: Mail },
  { id: 'inbox', label: 'Smart Inbox', icon: Inbox },
  { id: 'archived', label: 'Archived', icon: Archive },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 z-40 flex flex-col"
      style={{
        background: 'rgba(4, 13, 26, 0.95)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="p-6 border-b border-white/5">
        <Logo />
        <div className="mt-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-500 font-mono">System Active</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                ${
                  active
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
            >
              <Icon
                size={16}
                className={active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}
              />
              {label}
              {active && <ChevronRight size={14} className="ml-auto text-cyan-500/50" />}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div
          className="rounded-xl p-4"
          style={{
            background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(139,92,246,0.08))',
            border: '1px solid rgba(34,211,238,0.12)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} className="text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400">Triage Engine</span>
          </div>
          <div className="text-xs text-slate-500 mb-2">Smart classification engine</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full w-4/5 rounded-full"
                style={{ background: 'linear-gradient(90deg, #22d3ee, #8b5cf6)' }}
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">94%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}