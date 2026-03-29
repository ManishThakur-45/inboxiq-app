import React from 'react';
import { Archive } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';

export default function ArchivedPage({
  onNavigate,
  onLogout,
  archivedEmails,
  searchQuery,
  onSearchChange,
  userName,
  notificationCount,
}) {
  return (
    <AppLayout
      currentPage="archived"
      onNavigate={onNavigate}
      onLogout={onLogout}
      emailCount={archivedEmails.length}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      userName={userName}
      notificationCount={notificationCount}
    >
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-slate-100">Archived Emails</h2>
        <p className="text-sm text-slate-500 mt-1">
          Emails archived from smart inbox actions.
        </p>
      </div>

      {archivedEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/8 flex items-center justify-center mb-6">
            <Archive size={32} className="text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No archived emails</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Archived emails will appear here after you archive them from the detail panel.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {archivedEmails.map(email => (
            <Card key={email.id} className="p-5">
              <div className="text-sm font-semibold text-slate-100">{email.subject}</div>
              <div className="text-xs text-slate-500 mt-1">{email.from || email.sender}</div>
              <div className="text-xs text-slate-600 mt-3">
                {email.summary || email.snippet}
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
}