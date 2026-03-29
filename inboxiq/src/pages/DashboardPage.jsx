import React from 'react';
import { Mail, AlertTriangle, ShieldOff, Brain, ArrowRight, Clock } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import StatCard from '../components/dashboard/StatCard';
import RecentEmailsTable from '../components/dashboard/RecentEmailsTable';
import InsightsCard from '../components/dashboard/InsightsCard';
import { CategoryChart, DepartmentChart } from '../components/dashboard/ChartCards';
import Card from '../components/ui/Card';

export default function DashboardPage({ onNavigate, onLogout, emails, stats }) {
  const fetched = emails.length;

  const activityItems =
    fetched > 0
      ? [
          {
            text: `${stats.total} emails fetched from Gmail`,
            time: 'Just now',
            color: 'bg-cyan-400',
          },
          {
            text: `${stats.analyzed} emails auto-classified`,
            time: 'Just now',
            color: 'bg-violet-400',
          },
          {
            text: `${stats.spam} spam emails identified`,
            time: 'Just now',
            color: 'bg-red-400',
          },
          {
            text: `${stats.critical} priority emails highlighted`,
            time: 'Just now',
            color: 'bg-orange-400',
          },
        ]
      : [
          {
            text: 'Waiting for inbox connection',
            time: 'Now',
            color: 'bg-slate-500',
          },
          {
            text: 'Go to Connected Inbox to fetch emails',
            time: '',
            color: 'bg-slate-600',
          },
        ];

  return (
    <AppLayout
      currentPage="dashboard"
      onNavigate={onNavigate}
      onLogout={onLogout}
      emailCount={stats.critical}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Welcome back 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {fetched > 0
              ? `${fetched} emails fetched and organized · Last sync: just now`
              : 'No emails fetched yet — connect your inbox to get started.'}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Smart email prioritization system
          </p>
        </div>

        <button
          onClick={() => onNavigate('connected')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25 transition-all"
        >
          <Mail size={15} />
          Sync Inbox
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Fetched Emails"
          value={stats.total || '—'}
          icon={<Mail size={18} />}
          color="cyan"
          sub="Current batch"
        />
        <StatCard
          label="Priority Emails"
          value={stats.critical || '—'}
          icon={<AlertTriangle size={18} />}
          color="red"
          sub="Need attention"
        />
        <StatCard
          label="Spam Detected"
          value={stats.spam || '—'}
          icon={<ShieldOff size={18} />}
          color="orange"
          sub="Filtered automatically"
        />
        <StatCard
          label="Auto Classified"
          value={stats.analyzed || '—'}
          icon={<Brain size={18} />}
          color="violet"
          sub="System processed"
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-slate-100">Recent Emails</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latest entries from smart inbox
                </p>
              </div>

              <button
                onClick={() => onNavigate('inbox')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View all
                <ArrowRight size={12} />
              </button>
            </div>

            <RecentEmailsTable emails={emails} onSelect={() => onNavigate('inbox')} />
          </Card>
        </div>

        <div>
          <Card className="p-6 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Brain size={16} className="text-violet-400" />
              <h3 className="font-semibold text-slate-100">Smart Insights</h3>
            </div>
            <InsightsCard emails={emails} />
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <h3 className="font-semibold text-slate-100">Category Mix</h3>
            </div>

            {fetched === 0 ? (
              <p className="text-xs text-slate-600 text-center py-8">
                Fetch emails to see breakdown
              </p>
            ) : (
              <CategoryChart breakdown={stats.categoryBreakdown} />
            )}
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <h3 className="font-semibold text-slate-100">Department Routing</h3>
            </div>

            {fetched === 0 ? (
              <p className="text-xs text-slate-600 text-center py-8">
                Fetch emails to see routing
              </p>
            ) : (
              <DepartmentChart breakdown={stats.departmentBreakdown} />
            )}
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={14} className="text-slate-500" />
              <h3 className="font-semibold text-slate-100">Activity Log</h3>
            </div>

            <div className="space-y-3">
              {activityItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${item.color} mt-1.5 shrink-0`}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{item.text}</p>
                    {item.time && (
                      <p className="text-[11px] text-slate-600 mt-0.5 font-mono">
                        {item.time}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}