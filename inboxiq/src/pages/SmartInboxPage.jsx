import React, { useState, useEffect } from 'react';
import { Inbox, Download } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import InboxQueueTable from '../components/inbox/InboxQueueTable';
import EmailDetailPanel from '../components/inbox/EmailDetailPanel';
import Card from '../components/ui/Card';

export default function SmartInboxPage({
  onNavigate,
  onLogout,
  emails,
  importantEmails,
  onArchiveEmail,
  onRouteEmail,
  onMarkImportant,
  onBlockSender,
  onSaveDraftReply,
  searchQuery,
  onSearchChange,
  userName,
  notificationCount,
}) {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  const filteredEmails = showImportantOnly ? importantEmails : emails;

  useEffect(() => {
    if (!selectedEmail) return;

    const updated = filteredEmails.find(email => email.id === selectedEmail.id);
    if (!updated) {
      setSelectedEmail(null);
      return;
    }

    setSelectedEmail(updated);
  }, [filteredEmails, selectedEmail]);

  const criticalCount = filteredEmails.filter(
    e => (e.priority || '').toLowerCase() === 'critical'
  ).length;

  return (
    <AppLayout
      currentPage="inbox"
      onNavigate={onNavigate}
      onLogout={onLogout}
      emailCount={criticalCount}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      userName={userName}
      notificationCount={notificationCount}
    >
      {filteredEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-center">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/8 flex items-center justify-center mb-6">
            <Inbox size={32} className="text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">Smart Inbox is empty</h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            Connect your inbox and fetch emails to see prioritized results here.
          </p>
          <button
            onClick={() => onNavigate('connected')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', color: '#040d1a' }}
          >
            <Download size={15} /> Go to Connected Inbox
          </button>
        </div>
      ) : (
        <div className={`flex gap-6 ${selectedEmail ? 'xl:flex-row' : ''}`}>
          <div className={`${selectedEmail ? 'flex-1 min-w-0' : 'w-full'}`}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-100">Smart Inbox</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {filteredEmails.length} emails · auto-organized by priority
                  </p>
                </div>

                <button
                  onClick={() => setShowImportantOnly(prev => !prev)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    showImportantOnly
                      ? 'bg-orange-500/15 border-orange-500/30 text-orange-300'
                      : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  {showImportantOnly ? 'Showing Important Only' : 'Show Important Only'}
                </button>
              </div>

              <InboxQueueTable
                emails={filteredEmails}
                onSelect={setSelectedEmail}
                selectedId={selectedEmail?.id}
              />
            </Card>
          </div>

          {selectedEmail && (
            <div className="w-96 shrink-0">
              <div
                className="sticky top-8 rounded-2xl border border-white/8 overflow-hidden h-[calc(100vh-8rem)]"
                style={{ background: 'rgba(7,20,40,0.9)', backdropFilter: 'blur(12px)' }}
              >
                <EmailDetailPanel
                  email={selectedEmail}
                  onClose={() => setSelectedEmail(null)}
                  onArchive={id => {
                    onArchiveEmail(id);
                    setSelectedEmail(null);
                  }}
                  onRoute={onRouteEmail}
                  onMarkImportant={onMarkImportant}
                  onBlockSender={onBlockSender}
                  onSaveDraftReply={onSaveDraftReply}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}