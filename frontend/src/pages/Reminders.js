import React, { useState, useEffect } from 'react';

function Reminders({ user }) {
  const [reminders, setReminders] = useState([]);
  const [time, setTime] = useState('08:00');
  const [label, setLabel] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('reminders');
    if (saved) setReminders(JSON.parse(saved));
    // Ask notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Check reminders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const saved = localStorage.getItem('reminders');
      if (!saved) return;
      const rems = JSON.parse(saved);
      rems.forEach(r => {
        if (r.active && r.time === currentTime) {
          if (Notification.permission === 'granted') {
            new Notification('MindCare AI Reminder 🧠', {
              body: r.label,
              icon: '/favicon.ico'
            });
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    if (!label.trim()) return;
    const newReminder = { id: Date.now(), time, label, active: true };
    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
    setLabel('');
    setMessage('Reminder added!');
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleReminder = (id) => {
    const updated = reminders.map(r => r.id === id ? { ...r, active: !r.active } : r);
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
  };

  return (
    <div className="page">
      <h1>Reminders ⏰</h1>
      <p className="subtitle">Set daily reminders for your wellness habits</p>
      {Notification.permission === 'denied' && (
        <div className="warning-banner">⚠️ Browser notifications are blocked. Please allow notifications in your browser settings.</div>
      )}
      {Notification.permission === 'granted' && (
        <div className="success-msg" style={{marginBottom: '16px'}}>✅ Browser notifications are enabled!</div>
      )}
      <div className="card">
        <h3>Add New Reminder</h3>
        <div className="reminder-form">
          <input
            className="reminder-input"
            placeholder="Reminder label (e.g. Log your mood)"
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
          <input
            className="reminder-time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        {message && <div className="success-msg">{message}</div>}
        <button className="save-btn" onClick={handleAdd}>⏰ Add Reminder</button>
      </div>

      <h3>Your Reminders</h3>
      {reminders.length === 0 ? (
        <p className="empty-msg">No reminders yet. Add your first one above!</p>
      ) : (
        reminders.map(r => (
          <div key={r.id} className={`reminder-card ${r.active ? 'active' : 'inactive'}`}>
            <div className="reminder-info">
              <span className="reminder-time-badge">🕐 {r.time}</span>
              <span className="reminder-label">{r.label}</span>
            </div>
            <div className="reminder-actions">
              <button className="toggle-btn" onClick={() => toggleReminder(r.id)}>
                {r.active ? '✅ Active' : '⏸ Paused'}
              </button>
              <button className="delete-btn" onClick={() => deleteReminder(r.id)}>🗑️</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Reminders;
