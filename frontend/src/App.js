import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MoodLog from './pages/MoodLog';
import Journal from './pages/Journal';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Activity from './pages/Activity';
import Reminders from './pages/Reminders';
import CalmingSounds from './pages/CalmingSounds';
import Breathing from './pages/Breathing';
import Hotlines from './pages/Hotlines';
import Affirmations from './pages/Affirmations';
import Games from './pages/Games';
import AICustomization, { AvatarIcon } from './pages/AICustomization';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiData, setAiData] = useState({
    name: 'Luna',
    color: '#2e7d32',
    skinColor: '#f5d0c5',
    faceId: 'cute',
    hatId: 'none',
    shirtId: 'blue',
    bottomId: 'pants_black',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    if (token && username) setUser({ token, username, userId });
    const savedAi = localStorage.getItem('aiCustomization');
    if (savedAi) setAiData(prev => ({ ...prev, ...JSON.parse(savedAi) }));
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userId', userData.userId);
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setUser(null);
    setCurrentPage('home');
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const goToPage = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', emoji: '🏠', label: 'Home' },
    { id: 'mood', emoji: '😊', label: 'Mood' },
    { id: 'activity', emoji: '🏃', label: 'Activity' },
    { id: 'journal', emoji: '📓', label: 'Journal' },
    { id: 'aichat', emoji: '🤖', label: aiData.name || 'AI Chat' },
    { id: 'analytics', emoji: '📊', label: 'Analytics' },
    { id: 'sounds', emoji: '🎵', label: 'Sounds' },
    { id: 'breathing', emoji: '🫁', label: 'Breathing' },
    { id: 'hotlines', emoji: '📞', label: 'Hotlines' },
    { id: 'affirmations', emoji: '🌟', label: 'Affirmations' },
    { id: 'games', emoji: '🎮', label: 'Games' },
    { id: 'reminders', emoji: '⏰', label: 'Reminders' },
  ];

  return (
    <div className="app-container">
      {/* Hamburger button - only visible on mobile via CSS */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Dark overlay behind sidebar on mobile */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <span>🧠</span>
          <div>
            <div className="sidebar-title">MindHaven</div>
            <div className="sidebar-sub">WELLNESS TRACKER</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <div key={item.id} className={`nav-item ${currentPage === item.id ? 'active' : ''}`} onClick={() => goToPage(item.id)}>
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-user-section">
          {/* Customize link - styled like other nav items */}
          <div
            className="nav-item"
            onClick={() => goToPage('aiCustomization')}
            title="Customize your character & AI"
          >
            <span>✏️</span>
            <span>Customize</span>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">{user.username[0].toUpperCase()}</div>
            <div>
              <div className="user-name">{user.username}</div>
              <div className="user-signout" onClick={handleLogout}>Sign out</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {currentPage === 'home' && <Dashboard user={user} setCurrentPage={setCurrentPage} />}
        {currentPage === 'mood' && <MoodLog user={user} />}
        {currentPage === 'activity' && <Activity user={user} />}
        {currentPage === 'journal' && <Journal user={user} />}
        {currentPage === 'aichat' && <Chat user={user} aiData={aiData} setCurrentPage={setCurrentPage} />}
        {currentPage === 'analytics' && <Analytics user={user} />}
        {currentPage === 'sounds' && <CalmingSounds user={user} />}
        {currentPage === 'breathing' && <Breathing user={user} />}
        {currentPage === 'hotlines' && <Hotlines user={user} />}
        {currentPage === 'affirmations' && <Affirmations user={user} />}
        {currentPage === 'games' && <Games user={user} />}
        {currentPage === 'reminders' && <Reminders user={user} />}
        {currentPage === 'aiCustomization' && <AICustomization onSave={(data) => { setAiData(prev => ({ ...prev, ...data })); }} />}
      </main>

      {/* Floating avatar icon - shows on every page, right side. Full body only shows on Customize page */}
      <div
        className="floating-avatar-btn"
        onClick={() => setCurrentPage('aiCustomization')}
        title="Customize your character & AI"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          background: 'white',
          borderRadius: '50%',
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(46,125,50,0.35)',
          border: '2px solid #2e7d32',
        }}
      >
        <AvatarIcon
          skinColor={aiData.skinColor}
          faceId={aiData.faceId}
          hatId={aiData.hatId}
          size={56}
        />
      </div>
    </div>
  );
}

export default App;