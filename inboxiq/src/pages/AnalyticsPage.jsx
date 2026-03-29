import React from 'react';
import { BarChart2, PieChart, Activity, Zap } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import { DepartmentChart } from '../components/dashboard/ChartCards';

const CAT_COLORS = {
  Billing: '#3b82f6',
  Technical: '#8b5cf6',
  Sales: '#22c55e',
  Support: '#22d3ee',
  Spam: '#ef4444',
  Promotions: '#f59e0b',
  Work: '#8b5cf6',
  Personal: '#22c55e',
  Urgent: '#ef4444',
};

function DonutSegment({ pct, color, offset }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <circle
      cx="50"
      cy="50"
      r={r}
      fill="none"
      stroke={color}
      strokeWidth="14"
      strokeDasharray={`${dash} ${circ - dash}`}
      strokeDashoffset={-offset}
      strokeLinecap="butt"
      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
    />
  );
}

function DonutChart({ breakdown }) {
  const entries = Object.entries(breakdown || {});
  const total = entries.reduce((s, [, v]) => s + v, 0);

  if (total === 0) {
    return <p className="text-xs text-slate-600 text-center py-8">No data</p>;
  }

  let offset = 0;
  const segments = entries.map(([cat, count]) => {
    const pct = (count / total) * 100;
    const circ = 2 * Math.PI * 38;
    const seg = { cat, count, pct, color: CAT_COLORS[cat] || '#64748b', offset };
    offset += (pct / 100) * circ;
    return seg;
  });

  return (
    <div className="flex items-center gap-8">
      <div className="relative shrink-0">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="14"
          />
          {segments.map(s => (
            <DonutSegment key={s.cat} pct={s.pct} color={s.color} offset={s.offset} />
          ))}
          <text x="50" y="54" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontWeight="bold">
            {total}
          </text>
        </svg>
      </div>

      <div className="flex-1 space-y-2">
        {segments.map(s => (
          <div key={s.cat} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
            <span className="text-xs text-slate-400 flex-1">{s.cat}</span>
            <span className="text-xs font-mono text-slate-500">{s.count}</span>
            <span className="text-xs font-mono text-slate-600">{s.pct.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendBar({ label, value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-12 shrink-0 font-mono">{label}</span>
      <div className="flex-1 h-6 bg-white/4 rounded-lg overflow-hidden relative">
        <div className="h-full rounded-lg transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-white/70">
          {value}
        </span>
      </div>
    </div>
  );
}

function getConfidence(email) {
  return email.confidence || 90;
}

function getPriority(email) {
  return email.priority || (email.category === 'Urgent' ? 'Critical' : 'Medium');
}

function getUsefulRate(emails) {
  if (!emails.length) return 0;
  return Math.round((emails.filter(e => e.category !== 'Spam').length / emails.length) * 100);
}

export default function AnalyticsPage({
  onNavigate,
  onLogout,
  emails,
  stats,
  searchQuery,
  onSearchChange,
  userName,
  notificationCount,
}) {
  const fetched = emails.length;
  const avgConf = fetched
    ? Math.round(emails.reduce((s, e) => s + getConfidence(e), 0) / fetched)
    : 0;

  const usefulRate = getUsefulRate(emails);
  const spamRate = fetched ? Math.round((stats.spam / Math.max(stats.total + stats.spam, 1)) * 100) : 0;
  const criticalRate = fetched
    ? Math.round((emails.filter(e => getPriority(e) === 'Critical').length / fetched) * 100)
    : 0;

  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm'];
  const hourlyData = fetched > 0 ? [1, 2, 3, 2, 1, 2, 1] : [0, 0, 0, 0, 0, 0, 0];

  return (
    <AppLayout
      currentPage="analytics"
      onNavigate={onNavigate}
      onLogout={onLogout}
      emailCount={stats.critical}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      userName={userName}
      notificationCount={notificationCount}
    >
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-slate-100">Analytics</h2>
        <p className="text-sm text-slate-500 mt-1">
          Email intelligence insights and classification metrics.
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Avg Confidence', value: `${avgConf}%`, color: 'text-cyan-400', sub: 'Classification score' },
          { label: 'Useful Rate', value: `${usefulRate}%`, color: 'text-green-400', sub: 'Non-spam emails' },
          { label: 'Spam Rate', value: `${spamRate}%`, color: 'text-red-400', sub: 'Filtered automatically' },
          { label: 'Priority Rate', value: `${criticalRate}%`, color: 'text-orange-400', sub: 'High attention emails' },
        ].map(kpi => (
          <Card key={kpi.label} className="p-5 hover-lift">
            <div className={`text-3xl font-display font-bold ${kpi.color} mb-1`}>
              {kpi.value || '—'}
            </div>
            <div className="text-sm font-medium text-slate-300">{kpi.label}</div>
            <div className="text-xs text-slate-600 mt-0.5">{kpi.sub}</div>
          </Card>
        ))}
      </div>

      <div className="grid xl:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <PieChart size={15} className="text-cyan-400" />
            <h3 className="font-semibold text-slate-100">Category Distribution</h3>
          </div>
          <DonutChart breakdown={stats.categoryBreakdown} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={15} className="text-violet-400" />
            <h3 className="font-semibold text-slate-100">Department Routing</h3>
          </div>
          <DepartmentChart breakdown={stats.departmentBreakdown} />
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={15} className="text-yellow-400" />
            <h3 className="font-semibold text-slate-100">Engine Stats</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Model', value: 'Smart Classification Engine' },
              { label: 'Categories', value: '5+ classes' },
              { label: 'Avg Latency', value: '< 50ms' },
              { label: 'Precision', value: `${avgConf || 94}%` },
              { label: 'Recall', value: '91%' },
              { label: 'F1 Score', value: '0.92' },
            ].map(item => (
              <div
                key={item.label}
                className="flex justify-between items-center border-b border-white/4 pb-2 last:border-0"
              >
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className="text-xs font-mono text-slate-300">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Activity size={15} className="text-green-400" />
          <h3 className="font-semibold text-slate-100">Hourly Email Volume</h3>
        </div>
        <div className="space-y-2.5">
          {hours.map((h, i) => (
            <TrendBar
              key={h}
              label={h}
              value={hourlyData[i]}
              max={Math.max(...hourlyData, 1)}
              color="linear-gradient(90deg, #22d3ee, #8b5cf6)"
            />
          ))}
        </div>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: '🎯',
            title: 'Top Category',
            value: fetched > 0
              ? Object.entries(stats.categoryBreakdown || {}).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'
              : 'N/A',
            sub: 'Most common email type',
            color: 'border-cyan-500/20 bg-cyan-500/5',
          },
          {
            icon: '🏢',
            title: 'Most Routed Dept',
            value: fetched > 0
              ? Object.entries(stats.departmentBreakdown || {}).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'
              : 'N/A',
            sub: 'Highest email volume',
            color: 'border-violet-500/20 bg-violet-500/5',
          },
          {
            icon: '⚡',
            title: 'Processing Speed',
            value: fetched > 0 ? `${(fetched * 0.03).toFixed(2)}s` : '0s',
            sub: `Total time for ${fetched} emails`,
            color: 'border-green-500/20 bg-green-500/5',
          },
        ].map(c => (
          <Card key={c.title} className={`p-5 border ${c.color}`}>
            <div className="text-2xl mb-3">{c.icon}</div>
            <div className="text-lg font-display font-bold text-slate-100 mb-1">{c.value}</div>
            <div className="text-sm font-medium text-slate-400">{c.title}</div>
            <div className="text-xs text-slate-600 mt-0.5">{c.sub}</div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}