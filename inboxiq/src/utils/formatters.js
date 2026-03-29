export function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRelative(iso) {
  const now = new Date('2024-06-15T14:30:00Z');
  const d = new Date(iso);
  const diff = Math.floor((now - d) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export const priorityColors = {
  Critical: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30', dot: 'bg-red-400' },
  High:     { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30', dot: 'bg-orange-400' },
  Medium:   { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: 'bg-yellow-400' },
  Low:      { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/30', dot: 'bg-slate-400' },
};

export const categoryColors = {
  Billing:   { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  Technical: { bg: 'bg-violet-500/15', text: 'text-violet-400', border: 'border-violet-500/30' },
  Sales:     { bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/30' },
  Support:   { bg: 'bg-cyan-500/15', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  Spam:      { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
};

export const departmentColors = {
  Finance:     { bg: 'bg-blue-500/10', text: 'text-blue-300' },
  Engineering: { bg: 'bg-violet-500/10', text: 'text-violet-300' },
  Sales:       { bg: 'bg-green-500/10', text: 'text-green-300' },
  Support:     { bg: 'bg-cyan-500/10', text: 'text-cyan-300' },
  Blocked:     { bg: 'bg-red-500/10', text: 'text-red-300' },
};
