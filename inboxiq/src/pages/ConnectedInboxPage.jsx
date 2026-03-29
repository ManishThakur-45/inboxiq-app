import React, { useEffect, useState } from 'react';
import {
  RefreshCw,
  CheckCircle,
  Wifi,
  WifiOff,
  Download,
  Clock,
  Server,
} from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';

export default function ConnectedInboxPage({
  onNavigate,
  onLogout,
  onFetch,
  isFetched,
  emails,
  searchQuery,
  onSearchChange,
  userName,
  notificationCount,
}) {
  const [fetching, setFetching] = useState(false);
  const [fetchDone, setFetchDone] = useState(isFetched);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    setFetchDone(isFetched);
  }, [isFetched]);

  function handleFetch() {
    setFetching(true);
    setFetchDone(false);
    setProgress(0);

    const steps = [
      [300, 15, 'Connecting to Gmail API...'],
      [600, 35, 'Authenticating access token...'],
      [900, 55, 'Fetching email headers...'],
      [1200, 72, 'Loading recent messages...'],
      [1500, 88, 'Running smart triage engine...'],
      [1800, 100, 'Analysis complete!'],
    ];

    steps.forEach(([delay, pct, msg]) => {
      setTimeout(() => {
        setProgress(pct);
        setStatusMsg(msg);
        if (pct === 100) {
          setTimeout(async () => {
            try {
              await onFetch();
              setFetchDone(true);
            } finally {
              setFetching(false);
            }
          }, 400);
        }
      }, delay);
    });
  }

  const usefulCount = emails.filter(e => e.category !== 'Spam').length;

  return (
    <AppLayout
      currentPage="connected"
      onNavigate={onNavigate}
      onLogout={onLogout}
      emailCount={emails.length}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      userName={userName}
      notificationCount={notificationCount}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-slate-100">Connected Inbox</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your email provider connections and sync settings.
          </p>
        </div>

        <Card className="p-6 mb-5" glow={fetchDone}>
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: 'linear-gradient(135deg, #ea4335, #fbbc05)',
                boxShadow: '0 0 20px rgba(234,67,53,0.2)',
              }}
            >
              G
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-slate-100">Gmail</h3>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-green-500/15 border border-green-500/30 text-xs text-green-400 font-medium">
                  <CheckCircle size={11} /> Active
                </span>
              </div>
              <p className="text-sm font-mono text-slate-400">Connected Google Account</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> Last synced: Just now
                </span>
                <span className="flex items-center gap-1">
                  <Server size={11} /> Region: local
                </span>
                <span className="flex items-center gap-1">
                  <Wifi size={11} /> OAuth2 + Gmail API
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/6">
            {!fetching && !fetchDone && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300 font-medium">Ready to sync</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click to pull recent emails and organize them automatically.
                  </p>
                </div>
                <button
                  onClick={handleFetch}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                    color: '#040d1a',
                    boxShadow: '0 0 30px rgba(34,211,238,0.2)',
                  }}
                >
                  <Download size={15} /> Fetch Inbox
                </button>
              </div>
            )}

            {fetching && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-slate-300 font-medium flex items-center gap-2">
                    <RefreshCw size={14} className="text-cyan-400 animate-spin" />
                    {statusMsg}
                  </p>
                  <span className="text-sm font-mono text-cyan-400">{progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #22d3ee, #8b5cf6)',
                    }}
                  />
                </div>
              </div>
            )}

            {!fetching && fetchDone && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-400" />
                    <p className="text-sm text-green-400 font-semibold">
                      Fetch complete — {emails.length} emails processed!
                    </p>
                  </div>

                  <button
                    onClick={handleFetch}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    <RefreshCw size={12} /> Re-fetch
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-cyan-500/8 border border-cyan-500/20 text-center">
                    <div className="text-2xl font-display font-bold text-cyan-400">{emails.length}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Fetched</div>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/8 border border-green-500/20 text-center">
                    <div className="text-2xl font-display font-bold text-green-400">{usefulCount}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Useful</div>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/8 border border-red-500/20 text-center">
                    <div className="text-2xl font-display font-bold text-red-400">
                      {emails.filter(e => e.category === 'Spam').length}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Spam</div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('inbox')}
                  className="mt-4 w-full py-3 rounded-xl text-sm font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-500/8 hover:bg-cyan-500/15 transition-all flex items-center justify-center gap-2"
                >
                  View Smart Inbox →
                </button>
              </div>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Microsoft Outlook', icon: '📧', desc: 'Exchange / Microsoft 365' },
            { name: 'IMAP Server', icon: '🖥️', desc: 'Any IMAP-compatible mailbox' },
          ].map(c => (
            <Card key={c.name} className="p-5 opacity-60 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                  {c.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-300">{c.name}</p>
                  <p className="text-xs text-slate-600">{c.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <WifiOff size={12} className="text-slate-600" />
                <span className="text-xs text-slate-600">Not connected</span>
                <button className="ml-auto text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-slate-400 hover:text-cyan-400 transition-colors">
                  Connect
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}