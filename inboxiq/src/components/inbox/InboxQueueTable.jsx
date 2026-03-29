import React, { useState } from 'react';
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

const FILTERS = ['All', 'Critical', 'Billing', 'Technical', 'Sales', 'Support', 'Spam', 'Work', 'Promotions', 'Personal'];

function formatRelativeSafe(value) {
  if (!value) return 'Recent';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recent';
  return 'Recent';
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

function getSenderName(email) {
  return email.senderName || email.from || email.sender || 'Unknown Sender';
}

function getSenderRaw(email) {
  return email.sender || email.from || '—';
}

export default function InboxQueueTable({ emails, onSelect, selectedId }) {
  const [filter, setFilter] = useState('All');
  const [sortField, setSortField] = useState('priority');

  const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };

  const filtered = emails.filter(e => {
    if (filter === 'All') return true;
    if (filter === 'Critical') return getPriority(e) === 'Critical';
    return e.category === filter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'priority') {
      return (priorityOrder[getPriority(b)] || 0) - (priorityOrder[getPriority(a)] || 0);
    }
    if (sortField === 'time') {
      return new Date(b.receivedAt || b.date || 0) - new Date(a.receivedAt || a.date || 0);
    }
    return 0;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              filter === f
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/35'
                : 'text-slate-500 hover:text-slate-300 bg-white/3 border border-white/6'
            }`}
          >
            {f}
            {f !== 'All' && (
              <span className="ml-1.5 text-[10px] opacity-60">
                {emails.filter(e => (f === 'Critical' ? getPriority(e) === 'Critical' : e.category === f)).length}
              </span>
            )}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setSortField('priority')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              sortField === 'priority'
                ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                : 'text-slate-500 border-white/6 bg-white/3'
            }`}
          >
            Sort: Priority
          </button>
          <button
            onClick={() => setSortField('time')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              sortField === 'time'
                ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                : 'text-slate-500 border-white/6 bg-white/3'
            }`}
          >
            Sort: Time
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/6 bg-white/2">
              {['Time', 'Subject', 'Sender', 'Category', 'Priority', 'Department', 'Confidence'].map(h => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/4">
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-600 text-sm">
                  No emails in this category.
                </td>
              </tr>
            ) : (
              sorted.map(email => {
                const isSelected = email.id === selectedId;
                const priority = getPriority(email);
                const department = getDepartment(email);
                const confidence = getConfidence(email);

                return (
                  <tr
                    key={email.id}
                    onClick={() => onSelect(email)}
                    className={`cursor-pointer transition-all duration-150 group ${
                      isSelected ? 'bg-cyan-500/8 border-l-2 border-l-cyan-500' : 'hover:bg-white/3'
                    }`}
                  >
                    <td className="px-4 py-3.5 text-xs font-mono text-slate-500 whitespace-nowrap">
                      {formatRelativeSafe(email.receivedAt || email.date)}
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`font-medium text-sm line-clamp-1 max-w-xs block transition-colors ${
                          isSelected ? 'text-cyan-400' : 'text-slate-200 group-hover:text-cyan-400'
                        }`}
                      >
                        {email.subject}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="text-xs text-slate-400">{getSenderName(email)}</div>
                      <div className="text-[11px] text-slate-600 font-mono">{getSenderRaw(email)}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge color={catColorMap[email.category] || 'cyan'}>{email.category}</Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge color={priColorMap[priority] || 'slate'} dot>
                        {priority}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-lg ${
                          department === 'Blocked'
                            ? 'bg-red-500/10 text-red-400'
                            : department === 'Engineering'
                            ? 'bg-violet-500/10 text-violet-400'
                            : department === 'Finance'
                            ? 'bg-blue-500/10 text-blue-400'
                            : department === 'Sales'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-cyan-500/10 text-cyan-400'
                        }`}
                      >
                        {department}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${confidence}%`,
                              background:
                                confidence >= 90
                                  ? '#22c55e'
                                  : confidence >= 75
                                  ? '#22d3ee'
                                  : '#f59e0b',
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono text-slate-400">{confidence}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-600 text-right">
        {sorted.length} email{sorted.length !== 1 ? 's' : ''} shown
      </p>
    </div>
  );
}