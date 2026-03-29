import React, { useEffect, useMemo, useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ConnectedInboxPage from './pages/ConnectedInboxPage';
import SmartInboxPage from './pages/SmartInboxPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ArchivedPage from './pages/ArchivedPage';

const EMPTY_STATS = {
  total: 0,
  critical: 0,
  spam: 0,
  analyzed: 0,
  categoryBreakdown: {},
  departmentBreakdown: {},
};

function buildStats(emailList) {
  const visibleEmails = emailList.filter(email => !email.archived && !email.blocked);

  const categoryBreakdown = visibleEmails.reduce((acc, email) => {
    const category = email.category || 'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const departmentBreakdown = visibleEmails.reduce((acc, email) => {
    const department = email.department || 'General';
    acc[department] = (acc[department] || 0) + 1;
    return acc;
  }, {});

  const criticalCount = visibleEmails.filter(
    email => email.priority === 'Critical' || email.category === 'Urgent'
  ).length;

  const spamCount = emailList.filter(
    email => email.category === 'Spam' || email.blocked
  ).length;

  return {
    total: visibleEmails.length,
    critical: criticalCount,
    spam: spamCount,
    analyzed: visibleEmails.length,
    categoryBreakdown,
    departmentBreakdown,
  };
}

export default function App() {
  const [page, setPage] = useState('landing');
  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [fetched, setFetched] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      localStorage.setItem('gmail_access_token', accessToken);
      setUser({ name: 'Connected User' });
      setPage('dashboard');
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const savedToken = localStorage.getItem('gmail_access_token');

      if (savedToken) {
        setUser({ name: 'Connected User' });
        setPage('dashboard');
      } else {
        setUser(null);
        setPage('landing');
      }
    }

    setAuthLoading(false);
  }, []);

  async function handleFetch() {
    try {
      const accessToken = localStorage.getItem('gmail_access_token');

      if (!accessToken) {
        alert('Please login with Google first');
        setPage('login');
        return;
      }

      const response = await fetch('http://localhost:5000/emails/inbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch Gmail inbox');
      }

      const preparedEmails = data.emails.map(email => ({
        ...email,
        archived: false,
        blocked: email.blocked || false,
        important: email.important || false,
        draftReply: email.draftReply || '',
      }));

      setEmails(preparedEmails);
      setStats(buildStats(preparedEmails));
      setFetched(true);
    } catch (error) {
      console.error('Fetch Gmail Error:', error);
      alert(error.message || 'Failed to fetch Gmail inbox');
    }
  }

  function updateEmails(nextEmails) {
    setEmails(nextEmails);
    setStats(buildStats(nextEmails));
  }

  function handleArchiveEmail(emailId) {
    const nextEmails = emails.map(email =>
      email.id === emailId ? { ...email, archived: true } : email
    );
    updateEmails(nextEmails);
  }

  function handleRouteEmail(emailId, newDepartment) {
    const nextEmails = emails.map(email =>
      email.id === emailId
        ? { ...email, department: newDepartment }
        : email
    );
    updateEmails(nextEmails);
  }

  function handleMarkImportant(emailId) {
    const nextEmails = emails.map(email =>
      email.id === emailId
        ? {
            ...email,
            important: true,
            priority: 'Critical',
            category: email.category === 'Personal' ? 'Urgent' : email.category,
            urgency: 9,
          }
        : email
    );
    updateEmails(nextEmails);
  }

  function handleBlockSender(emailId) {
    const nextEmails = emails.map(email =>
      email.id === emailId
        ? {
            ...email,
            blocked: true,
            category: 'Spam',
            department: 'Blocked',
            label: 'Spam',
          }
        : email
    );
    updateEmails(nextEmails);
  }

  function handleSaveDraftReply(emailId, draftReply) {
    const nextEmails = emails.map(email =>
      email.id === emailId ? { ...email, draftReply } : email
    );
    updateEmails(nextEmails);
  }

  function navigate(dest) {
    if (
      !user &&
      ['dashboard', 'connected', 'inbox', 'analytics', 'settings', 'archived'].includes(dest)
    ) {
      setPage('login');
      return;
    }

    setPage(dest);
  }

  function handleLogout() {
    localStorage.removeItem('gmail_access_token');
    setUser(null);
    setEmails([]);
    setStats(EMPTY_STATS);
    setFetched(false);
    setSearchQuery('');
    setPage('landing');
  }

  const visibleEmails = useMemo(() => {
    return emails
      .filter(email => !email.archived && !email.blocked)
      .filter(email => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;

        return (
          (email.subject || '').toLowerCase().includes(q) ||
          (email.from || '').toLowerCase().includes(q) ||
          (email.sender || '').toLowerCase().includes(q) ||
          (email.category || '').toLowerCase().includes(q) ||
          (email.department || '').toLowerCase().includes(q)
        );
      });
  }, [emails, searchQuery]);

  const archivedEmails = useMemo(
    () => emails.filter(email => email.archived),
    [emails]
  );

  const importantEmails = useMemo(
    () =>
      visibleEmails.filter(
        email => email.important || email.priority === 'Critical'
      ),
    [visibleEmails]
  );

  const notificationCount = useMemo(() => {
    const priorityAlerts = visibleEmails.filter(
      email => email.priority === 'Critical' || email.category === 'Urgent'
    ).length;

    const spamAlerts = emails.filter(
      email => email.category === 'Spam' || email.blocked
    ).length;

    return priorityAlerts + spamAlerts;
  }, [visibleEmails, emails]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  const commonProps = {
    onNavigate: navigate,
    onLogout: handleLogout,
    emails: visibleEmails,
    stats,
    user,
    importantEmails,
    searchQuery,
    onSearchChange: setSearchQuery,
    userName: user?.name || 'User',
    notificationCount,
  };

  return (
    <>
      {page === 'landing' && <LandingPage onNavigate={navigate} />}
      {page === 'login' && <LoginPage onNavigate={navigate} />}

      {page === 'dashboard' && user && <DashboardPage {...commonProps} />}

      {page === 'connected' && user && (
        <ConnectedInboxPage
          {...commonProps}
          onFetch={handleFetch}
          isFetched={fetched}
        />
      )}

      {page === 'inbox' && user && (
        <SmartInboxPage
          {...commonProps}
          onArchiveEmail={handleArchiveEmail}
          onRouteEmail={handleRouteEmail}
          onMarkImportant={handleMarkImportant}
          onBlockSender={handleBlockSender}
          onSaveDraftReply={handleSaveDraftReply}
        />
      )}

      {page === 'analytics' && user && <AnalyticsPage {...commonProps} />}

      {page === 'archived' && user && (
        <ArchivedPage
          onNavigate={navigate}
          onLogout={handleLogout}
          archivedEmails={archivedEmails}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          userName={user?.name || 'User'}
          notificationCount={notificationCount}
        />
      )}

      {page === 'settings' && user && <SettingsPage {...commonProps} />}
    </>
  );
}