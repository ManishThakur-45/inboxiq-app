import React, { useMemo, useState } from 'react';
import { Bell, Search, User, ChevronDown, LogOut } from 'lucide-react';

const pageTitles = {
  dashboard: { title: 'Dashboard', sub: 'Inbox intelligence overview' },
  connected: { title: 'Connected Inbox', sub: 'Manage email providers and sync mail' },
  inbox: { title: 'Smart Inbox', sub: 'Organized and prioritized email queue' },
  archived: { title: 'Archived Emails', sub: 'Previously archived triage items' },
  analytics: { title: 'Analytics', sub: 'Insights and performance metrics' },
  settings: { title: 'Settings', sub: 'Configure system preferences' },
};

export default function Topbar({
  currentPage,
  onLogout,
  searchQuery = '',
  onSearchChange,
  userName = 'User',
  notificationCount = 0,
}) {
  const info = pageTitles[currentPage] || pageTitles.dashboard;
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = useMemo(() => {
    const items = [];
    if (notificationCount > 0) {
      items.push(`${notificationCount} inbox alert${notificationCount > 1 ? 's' : ''} available`);
    } else {
      items.push('No new alerts');
    }
    items.push('Search can filter subject, sender, category, and department');
    items.push('Use Smart Inbox panel to archive, route, or mark important');
    return items;
  }, [notificationCount]);

  return (
    <header
      className="h-16 flex items-center justify-between px-8 border-b border-white/5"
      style={{ background: 'rgba(4,13,26,0.8)', backdropFilter: 'blur(12px)' }}
    >
      <div>
        <h1 className="text-base font-semibold text-slate-100">{info.title}</h1>
        <p className="text-xs text-slate-500">{info.sub}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:flex">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange?.(e.target.value)}
            placeholder="Search emails..."
            className="pl-9 pr-4 py-2 text-sm rounded-xl bg-white/5 border border-white/8 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 w-64"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
          >
            <Bell size={16} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl p-3 z-50">
              <div className="text-xs font-semibold text-slate-300 mb-2 px-2">Notifications</div>
              <div className="space-y-2">
                {notifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/8 hover:border-cyan-500/30 transition-all">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
            <User size={12} className="text-white" />
          </div>
          <span className="text-sm text-slate-300 hidden md:block">{userName}</span>
          <ChevronDown size={12} className="text-slate-500" />
        </button>

        <button
          onClick={() => onLogout?.()}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/15 transition-all"
        >
          <LogOut size={14} />
          <span className="text-sm hidden md:block">Logout</span>
        </button>
      </div>
    </header>
  );
}