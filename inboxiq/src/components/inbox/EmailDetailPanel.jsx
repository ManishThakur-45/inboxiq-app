import React, { useMemo, useState } from 'react';
import {
  X,
  Tag,
  Zap,
  Brain,
  MessageSquare,
  Reply,
  Archive,
  Flag,
  CheckCircle2,
  Copy,
  Send,
} from 'lucide-react';
import Badge from '../ui/Badge';

const catColorMap = {
  Billing: 'blue',
  Technical: 'violet',
  Sales: 'green',
  Support: 'cyan',
  Spam: 'red',
  Promotions: 'orange',
  Work: 'violet',
  Personal: 'green',
  Urgent: 'red',
};

const priColorMap = {
  Critical: 'red',
  High: 'orange',
  Medium: 'yellow',
  Low: 'slate',
};

const ROUTE_OPTIONS = ['General', 'Business', 'Finance', 'Support', 'Marketing', 'Blocked'];

function Section({ icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-cyan-500">{icon}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function getPriority(email) {
  return email.priority || (email.category === 'Urgent' ? 'Critical' : 'Medium');
}

function getDepartment(email) {
  return email.department || 'General';
}

function getConfidence(email) {
  return email.confidence || 90;
}

function getUrgency(email) {
  return email.urgency || (getPriority(email) === 'Critical' ? 9 : 6);
}

function getLabel(email) {
  return email.label || (email.category === 'Spam' ? 'Spam' : 'Useful');
}

function getSummary(email) {
  if (email.summary) return email.summary;
  return `This email was categorized as ${email.category}. Review it for next action.`;
}

function getBody(email) {
  return email.body || email.snippet || 'No additional message body available.';
}

function getSuggestedReply(email) {
  if (email.suggestedReply) return email.suggestedReply;

  switch (email.category) {
    case 'Work':
      return 'Thank you for your email. I have reviewed it and will follow up shortly.';
    case 'Billing':
      return 'Thank you for reaching out. This has been noted and will be reviewed by the finance team.';
    case 'Promotions':
      return 'Thank you for the information.';
    case 'Spam':
      return 'No reply recommended for this email.';
    default:
      return 'Thank you for your email. I will review it and get back to you soon.';
  }
}

function getSuggestedActions(email) {
  switch (email.category) {
    case 'Urgent':
      return ['Reply Immediately', 'Mark Important', 'Route to Operations'];
    case 'Work':
      return ['Route to Business', 'Review Soon', 'Mark Important'];
    case 'Billing':
      return ['Route to Finance', 'Review Payment Details', 'Mark Important'];
    case 'Promotions':
      return ['Keep Low Priority', 'Archive', 'Review Later'];
    case 'Spam':
      return ['Archive', 'Mark as Spam', 'Block Sender'];
    default:
      return ['Keep in General Inbox', 'Review Later', 'Archive'];
  }
}

function formatDateSafe(value) {
  if (!value) return 'Today';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Today';
  return date.toLocaleDateString();
}

function formatTimeSafe(value) {
  if (!value) return 'Now';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Now';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function EmailDetailPanel({
  email,
  onClose,
  onArchive,
  onRoute,
  onMarkImportant,
}) {
  const [routeValue, setRouteValue] = useState(getDepartment(email));
  const [message, setMessage] = useState('');

  const priority = getPriority(email);
  const confidence = getConfidence(email);
  const urgency = getUrgency(email);
  const urgencyPct = Math.min(100, Math.max(0, urgency * 10));
  const urgencyColor = urgency >= 9 ? '#ef4444' : urgency >= 6 ? '#f97316' : '#22d3ee';

  const suggestedActions = useMemo(() => getSuggestedActions(email), [email]);

  if (!email) return null;

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(''), 1800);
  }

  async function handleCopyReply() {
    try {
      await navigator.clipboard.writeText(getSuggestedReply(email));
      showMessage('Suggested reply copied');
    } catch {
      showMessage('Could not copy reply');
    }
  }

  function handleArchive() {
    onArchive?.(email.id);
    showMessage('Email archived');
  }

  function handleMarkImportantClick() {
    onMarkImportant?.(email.id);
    showMessage('Marked as important');
  }

  function handleRouteChange(e) {
    const nextDept = e.target.value;
    setRouteValue(nextDept);
    onRoute?.(email.id, nextDept);
    showMessage(`Routed to ${nextDept}`);
  }

  return (
    <div className="h-full flex flex-col animate-slide-in">
      <div className="flex items-start justify-between p-5 border-b border-white/6">
        <div className="flex-1 pr-4">
          <h3 className="text-sm font-semibold text-slate-100 leading-snug">{email.subject}</h3>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            {email.sender || email.from || 'Unknown Sender'}
          </p>
          <p className="text-xs text-slate-600 mt-0.5">
            {formatDateSafe(email.receivedAt || email.date)} ·{' '}
            {formatTimeSafe(email.receivedAt || email.date)}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-all shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 p-4 border-b border-white/5">
        <Badge color={catColorMap[email.category] || 'cyan'}>{email.category}</Badge>
        <Badge color={priColorMap[priority] || 'slate'} dot>
          {priority}
        </Badge>
        <Badge color={getLabel(email) === 'Spam' ? 'red' : 'green'}>{getLabel(email)}</Badge>
      </div>

      {message && (
        <div className="mx-4 mt-4 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs flex items-center gap-2">
          <CheckCircle2 size={14} />
          {message}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-xs text-slate-500 mb-1">Department</div>
            <div className="text-sm font-semibold text-slate-200">{routeValue}</div>
          </div>

          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-xs text-slate-500 mb-1">Confidence</div>
            <div className="text-sm font-semibold text-cyan-400 font-mono">{confidence}%</div>
          </div>

          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-xs text-slate-500 mb-1">Category</div>
            <div className="text-sm font-semibold text-slate-200">{email.category}</div>
          </div>

          <div className="p-3 rounded-xl bg-white/3 border border-white/5">
            <div className="text-xs text-slate-500 mb-1">Urgency</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${urgencyPct}%`, background: urgencyColor }}
                />
              </div>
              <span className="text-xs font-mono" style={{ color: urgencyColor }}>
                {urgency}/10
              </span>
            </div>
          </div>
        </div>

        <Section icon={<Brain size={14} />} title="Summary">
          <p className="text-xs text-slate-400 leading-relaxed bg-white/3 border border-white/5 rounded-xl p-3">
            {getSummary(email)}
          </p>
        </Section>

        <Section icon={<Zap size={14} />} title="Suggested Action">
          <div className="space-y-2">
            {suggestedActions.map(action => (
              <div
                key={action}
                className="p-3 rounded-xl bg-orange-500/8 border border-orange-500/20 text-xs text-orange-300 leading-relaxed"
              >
                {action}
              </div>
            ))}
          </div>
        </Section>

        {email.keywords?.length > 0 && (
          <Section icon={<Tag size={14} />} title="Signal Keywords">
            <div className="flex flex-wrap gap-2">
              {email.keywords.map(kw => (
                <span
                  key={kw}
                  className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs text-violet-400 font-mono"
                >
                  {kw}
                </span>
              ))}
            </div>
          </Section>
        )}

        <Section icon={<Send size={14} />} title="Route Email">
          <select
            value={routeValue}
            onChange={handleRouteChange}
            className="w-full px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/40"
          >
            {ROUTE_OPTIONS.map(option => (
              <option
                key={option}
                value={option}
                className="bg-slate-900 text-slate-200"
              >
                {option}
              </option>
            ))}
          </select>
        </Section>

        <Section icon={<MessageSquare size={14} />} title="Email Body">
          <div className="p-3 rounded-xl bg-white/2 border border-white/5 text-xs text-slate-500 font-mono leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
            {getBody(email)}
          </div>
        </Section>

        <Section icon={<Reply size={14} />} title="Suggested Reply">
          <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-slate-400 font-mono leading-relaxed whitespace-pre-wrap">
            {getSuggestedReply(email)}
          </div>
          <button
            onClick={handleCopyReply}
            className="mt-3 w-full py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Copy size={14} />
            Copy Suggested Reply
          </button>
        </Section>
      </div>

      <div className="p-4 border-t border-white/5 grid grid-cols-3 gap-2">
        <button
          onClick={handleMarkImportantClick}
          className="py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-300 text-xs font-semibold hover:bg-orange-500/15 transition-all flex items-center justify-center gap-2"
        >
          <Flag size={14} />
          Mark Important
        </button>

        <button
          onClick={handleArchive}
          className="py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <Archive size={14} />
          Archive
        </button>

        <button
          onClick={() => showMessage(`Ready to route to ${routeValue}`)}
          className="py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/25 transition-all"
        >
          Route to {routeValue}
        </button>
      </div>
    </div>
  );
}