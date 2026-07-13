import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar-nav">
      <div className="sidebar-logo">
        <div className="logo-badge">H</div>
        <h2>Habitly</h2>
      </div>

      <div className="nav-group">
        <button 
          className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <span>📊</span> Dashboard
        </button>
        <button 
          className={`nav-link ${activeTab === 'habits' ? 'active' : ''}`}
          onClick={() => setActiveTab('habits')}
        >
          <span>🎯</span> Habits
        </button>
      </div>
    </aside>
  );
}
