import React, { useState, useEffect } from 'react';
import { saveMood, getMoods, deleteMood } from '../api';

function MoodLog({ user }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  const moods = [
    { emoji: '😣', label: 'Awful', score: 1 },
    { emoji: '😕', label: 'Bad', score: 2 },
    { emoji: '😐', label: 'Okay', score: 3 },
    { emoji: '🙂', label: 'Good', score: 4 },
    { emoji: '😄', label: 'Great', score: 5 },
  ];

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await getMoods();
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!selectedMood) return;
    try {
      await saveMood({ mood: selectedMood.label, moodScore: selectedMood.score, note });
      setMessage('Mood saved!');
      setNote('');
      setSelectedMood(null);
      fetchMoods();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving mood');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this mood entry?')) return;
    try {
      await deleteMood(id);
      fetchMoods();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h1>Mood Log 😊</h1>
      <p className="subtitle">Track your mood every day to discover patterns</p>
      <div className="card">
        <h3>How are you feeling right now?</h3>
        <div className="mood-grid">
          {moods.map(m => (
            <div
              key={m.label}
              className={`mood-btn ${selectedMood?.label === m.label ? 'selected' : ''}`}
              onClick={() => setSelectedMood(m)}
            >
              <span className="mood-emoji">{m.emoji}</span>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Add a note about how you're feeling... (optional)"
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        {message && <div className="success-msg">{message}</div>}
        <button className="save-btn" onClick={handleSave}>✅ Save Entry</button>
      </div>
      <h3>Recent Entries</h3>
      {entries.length === 0 ? (
        <p className="empty-msg">No entries yet. Log your first mood above!</p>
      ) : (
        entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <div className="entry-top">
              <span>{moods.find(m => m.label === entry.mood)?.emoji} {entry.mood}</span>
              <div className="entry-actions">
                <span className="entry-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
                <button className="delete-btn" onClick={() => handleDelete(entry._id)}>🗑️</button>
              </div>
            </div>
            {entry.note && <p>{entry.note}</p>}
          </div>
        ))
      )}
    </div>
  );
}

export default MoodLog;
