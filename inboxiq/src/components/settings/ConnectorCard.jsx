import React from 'react';
import { CheckCircle, Circle, RefreshCw, Plug } from 'lucide-react';
import Badge from '../ui/Badge';

export default function ConnectorCard({ name, email, status, icon, lastSync, onConnect }) {
  const isConnected = status === 'connected';
  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 ${
      isConnected
        ? 'border-cyan-500/25 bg-cyan-500/5'
        : 'border-white/8 bg-white/2 hover:border-white/15'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-200">{name}</span>
              {isConnected
                ? <Badge color="green" dot>Connected</Badge>
                : <Badge color="slate">Not Connected</Badge>}
            </div>
            <span className="text-xs text-slate-500 font-mono">{email || 'Not configured'}</span>
          </div>
        </div>
        <button
          onClick={onConnect}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            isConnected
              ? 'bg-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10'
              : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25'
          }`}
        >
          {isConnected ? <><RefreshCw size={12} /> Sync</> : <><Plug size={12} /> Connect</>}
        </button>
      </div>
      {isConnected && lastSync && (
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-600">
          <CheckCircle size={11} className="text-green-500" />
          Last synced: {lastSync}
        </div>
      )}
    </div>
  );
}
