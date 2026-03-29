import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

function getPriority(email) {
  return email.priority || (email.category === 'Urgent' ? 'Critical' : 'Medium');
}

function getConfidence(email) {
  return email.confidence || 90;
}

export default function InsightsCard({ emails }) {
  const criticalCount = emails.filter(e => getPriority(e) === 'Critical').length;
  const spamCount = emails.filter(e => e.category === 'Spam').length;
  const avgConfidence = emails.length
    ? Math.round(emails.reduce((s, e) => s + getConfidence(e), 0) / emails.length)
    : 0;

  const workCount = emails.filter(
    e => e.category === 'Work' || e.category === 'Technical' || e.category === 'Billing'
  ).length;

  const insights = [
    {
      icon: <AlertTriangle size={14} />,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      text:
        criticalCount > 0
          ? `${criticalCount} priority email${criticalCount > 1 ? 's' : ''} require immediate attention.`
          : 'No priority emails detected in current batch.',
    },
    {
      icon: <Shield size={14} />,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      text:
        spamCount > 0
          ? `${spamCount} spam email${spamCount > 1 ? 's' : ''} identified automatically.`
          : 'Inbox is clean — no spam detected.',
    },
    {
      icon: <TrendingUp size={14} />,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      text: `Classification confidence averaging ${avgConfidence}% across fetched emails.`,
    },
    {
      icon: <Lightbulb size={14} />,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      text:
        workCount > 0
          ? `${workCount} work-related thread${workCount > 1 ? 's' : ''} detected for action.`
          : 'No major work-related threads detected.',
    },
  ];

  return (
    <div className="space-y-3">
      {insights.map((ins, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5"
        >
          <div
            className={`mt-0.5 w-6 h-6 rounded-lg ${ins.bg} flex items-center justify-center ${ins.color} shrink-0`}
          >
            {ins.icon}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{ins.text}</p>
        </div>
      ))}
    </div>
  );
}