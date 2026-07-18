import React, { useState, useEffect } from 'react';
import { saveActivity, getActivities, deleteActivity } from '../api';

function Activity({ user }) {
  const [exercise, setExercise] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [water, setWater] = useState(0);
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await getActivities();
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      await saveActivity({ exercise, sleep, water });
      setMessage('Activity saved!');
      setExercise(0);
      setSleep(0);
      setWater(0);
      fetchActivities();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving activity');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity entry?')) return;
    try {
      await deleteActivity(id);
      fetchActivities();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h1>Activity Log 🏃</h1>
      <p className="subtitle">Track your daily habits for better wellness insights</p>
      <div className="card">
        <h3>Today's Activities</h3>
        <div className="activity-grid">
          <div className="activity-item">
            <span className="activity-icon">🏋️</span>
            <label>Exercise (minutes)</label>
            <div className="activity-counter">
              <button onClick={() => setExercise(Math.max(0, exercise - 5))}>−</button>
              <span>{exercise}</span>
              <button onClick={() => setExercise(exercise + 5)}>+</button>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">😴</span>
            <label>Sleep (hours)</label>
            <div className="activity-counter">
              <button onClick={() => setSleep(Math.max(0, sleep - 0.5))}>−</button>
              <span>{sleep}</span>
              <button onClick={() => setSleep(sleep + 0.5)}>+</button>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💧</span>
            <label>Water (glasses)</label>
            <div className="activity-counter">
              <button onClick={() => setWater(Math.max(0, water - 1))}>−</button>
              <span>{water}</span>
              <button onClick={() => setWater(water + 1)}>+</button>
            </div>
          </div>
        </div>
        {message && <div className="success-msg">{message}</div>}
        <button className="save-btn" onClick={handleSave}>💾 Save Activities</button>
      </div>
      <h3>Recent Entries</h3>
      {entries.length === 0 ? (
        <p className="empty-msg">No entries yet. Log your first activity above!</p>
      ) : (
        entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <div className="entry-top">
              <span className="entry-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
              <button className="delete-btn" onClick={() => handleDelete(entry._id)}>🗑️</button>
            </div>
            <div className="activity-summary">
              <span>🏋️ {entry.exercise} mins</span>
              <span>😴 {entry.sleep} hrs</span>
              <span>💧 {entry.water} glasses</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Activity;
