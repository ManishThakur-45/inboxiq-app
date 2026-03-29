import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({
  currentPage,
  onNavigate,
  onLogout,
  children,
  emailCount = 0,
  searchQuery = '',
  onSearchChange,
  userName = 'User',
  notificationCount = 0,
}) {
  return (
    <div className="min-h-screen bg-grid" style={{ backgroundColor: '#040d1a' }}>
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="ml-64 flex flex-col min-h-screen">
        <Topbar
          currentPage={currentPage}
          emailCount={emailCount}
          onLogout={onLogout}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          userName={userName}
          notificationCount={notificationCount}
        />
        <main className="flex-1 p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}