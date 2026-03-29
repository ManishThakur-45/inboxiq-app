import React, { useState } from 'react';
import { Settings, Sliders, Route, Bell, Save } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import ConnectorCard from '../components/settings/ConnectorCard';

function Toggle({ value, onChange, label, sub }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm text-slate-300 font-medium">{label}</p>
        {sub && <p className="text-xs text-slate-600 mt-0.5">{sub}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-all duration-200 ${value ? 'bg-cyan-500' : 'bg-white/10'}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

function SliderInput({ label, value, onChange, min, max, unit }) {
  return (
    <div className="py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-300 font-medium">{label}</p>
        <span className="text-sm font-mono text-cyan-400">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-cyan-500"
        style={{ height: '4px' }}
      />
      <div className="flex justify-between text-xs text-slate-600 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function SettingsPage({
  onNavigate,
  onLogout,
  searchQuery,
  onSearchChange,
  userName,
  notificationCount,
}) {
  const [autoTriage, setAutoTriage] = useState(true);
  const [autoRoute, setAutoRoute] = useState(true);
  const [spamBlock, setSpamBlock] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [slackNotifs, setSlackNotifs] = useState(true);
  const [priorityThreshold, setPriorityThreshold] = useState(75);
  const [spamSensitivity, setSpamSensitivity] = useState(80);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AppLayout
      currentPage="settings"
      onNavigate={onNavigate}
      onLogout={onLogout}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      userName={userName}
      notificationCount={notificationCount}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-100">Settings</h2>
            <p className="text-sm text-slate-500 mt-1">Configure rules, connectors, and automation.</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              saved
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'text-navy-900'
            }`}
            style={saved ? {} : { background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', color: '#040d1a' }}
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <Card className="p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Settings size={16} className="text-cyan-400" />
            <h3 className="font-semibold text-slate-100">Inbox Connectors</h3>
          </div>
          <div className="space-y-3">
            <ConnectorCard
              name="Gmail"
              email="Connected Google Account"
              status="connected"
              icon="G"
              lastSync="Just now"
            />
            <ConnectorCard
              name="Microsoft Outlook"
              status="disconnected"
              icon="📧"
            />
            <ConnectorCard
              name="IMAP Server"
              status="disconnected"
              icon="🖥️"
            />
          </div>
        </Card>

        <Card className="p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Sliders size={16} className="text-violet-400" />
            <h3 className="font-semibold text-slate-100">Triage Rules</h3>
          </div>

          <SliderInput
            label="Priority Confidence Threshold"
            value={priorityThreshold}
            onChange={setPriorityThreshold}
            min={50}
            max={99}
            unit="%"
          />
          <SliderInput
            label="Spam Sensitivity"
            value={spamSensitivity}
            onChange={setSpamSensitivity}
            min={50}
            max={99}
            unit="%"
          />

          <div className="mt-2">
            <Toggle value={autoTriage} onChange={setAutoTriage} label="Auto-Triage" sub="Automatically classify all incoming emails" />
            <Toggle value={spamBlock} onChange={setSpamBlock} label="Spam Auto-Block" sub="Block detected spam without manual review" />
          </div>
        </Card>

        <Card className="p-6 mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Route size={16} className="text-green-400" />
            <h3 className="font-semibold text-slate-100">Email Routing</h3>
          </div>

          <Toggle
            value={autoRoute}
            onChange={setAutoRoute}
            label="Auto-Route to Departments"
            sub="Automatically send emails to Finance, Support, Marketing, and General queues"
          />

          <div className="mt-4 rounded-xl border border-white/6 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/3 border-b border-white/5">
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Category</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Routes To</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">SLA</th>
                  <th className="px-4 py-2 text-left text-slate-500 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {[
                  { cat: 'Billing', dept: 'Finance', sla: '4 hours' },
                  { cat: 'Technical', dept: 'Support', sla: '1 hour' },
                  { cat: 'Work', dept: 'Business', sla: '24 hours' },
                  { cat: 'Promotions', dept: 'Marketing', sla: '48 hours' },
                  { cat: 'Spam', dept: 'Blocked', sla: 'Instant' },
                ].map(r => (
                  <tr key={r.cat} className="hover:bg-white/2 transition-colors">
                    <td className="px-4 py-2.5 text-slate-300">{r.cat}</td>
                    <td className="px-4 py-2.5 text-slate-400">{r.dept}</td>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{r.sla}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[11px]">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell size={16} className="text-orange-400" />
            <h3 className="font-semibold text-slate-100">Notifications</h3>
          </div>

          <Toggle value={emailNotifs} onChange={setEmailNotifs} label="Email Alerts" sub="Receive notifications for critical emails" />
          <Toggle value={slackNotifs} onChange={setSlackNotifs} label="Slack Integration" sub="Send alerts to internal notification channel" />

          <div className="mt-4 p-4 rounded-xl bg-white/3 border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300 font-medium">Webhook URL</p>
              <p className="text-xs font-mono text-slate-600 mt-0.5">https://hooks.slack.com/services/T00000/B00000/XXXXX</p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
              Edit
            </button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}