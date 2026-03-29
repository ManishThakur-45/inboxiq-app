import React from 'react';
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

function formatRelativeSafe(value) {
  if (!value) return 'Now';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Now';
  return 'Recent';
}

function getSenderName(email) {
  return email.senderName || email.from || email.sender || 'Unknown Sender';
}

function getPriority(email) {
  return email.priority || (email.category === 'Urgent' ? 'Critical' : 'Medium');
}

export default function RecentEmailsTable({ emails, onSelect }) {
  if (!emails || emails.length === 0) {
    return (
      <div className="text-center py-12 text-slate-600 text-sm">
        No emails fetched yet. Connect your inbox and click{' '}
        <span className="text-cyan-500">Sync Inbox</span>.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/5">
            {['Subject', 'Sender', 'Category', 'Priority', 'Time'].map(h => (
              <th
                key={h}
                className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 first:pl-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/4">
          {emails.slice(0, 6).map(email => {
            const priority = getPriority(email);
            return (
              <tr
                key={email.id}
                onClick={() => onSelect && onSelect(email)}
                className="hover:bg-white/3 cursor-pointer transition-colors group"
              >
                <td className="py-3.5 px-2 first:pl-0">
                  <span className="text-slate-200 group-hover:text-cyan-400 transition-colors font-medium line-clamp-1 max-w-xs block">
                    {email.subject}
                  </span>
                </td>
                <td className="py-3.5 px-2">
                  <span className="text-slate-400 text-xs">{getSenderName(email)}</span>
                </td>
                <td className="py-3.5 px-2">
                  <Badge color={catColorMap[email.category] || 'cyan'}>{email.category}</Badge>
                </td>
                <td className="py-3.5 px-2">
                  <Badge color={priColorMap[priority] || 'slate'} dot>
                    {priority}
                  </Badge>
                </td>
                <td className="py-3.5 px-2 text-slate-500 text-xs font-mono">
                  {formatRelativeSafe(email.receivedAt || email.date)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}