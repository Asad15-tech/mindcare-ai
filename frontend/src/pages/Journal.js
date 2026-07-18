import React, { useState, useEffect } from 'react';
import { saveJournal, getJournals, deleteJournal } from '../api';

function Journal({ user }) {
  const [content, setContent] = useState('');
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await getJournals();
      setEntries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return;
    try {
      await saveJournal({ content });
      setMessage('Journal entry saved!');
      setContent('');
      fetchJournals();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving entry');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal entry?')) return;
    try {
      await deleteJournal(id);
      fetchJournals();
    } catch (err) {
      console.log(err);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="page">
      <h1>Journal 📓</h1>
      <p className="subtitle">Your private space to reflect and express yourself</p>
      <div className="card">
        <h3>Today's Entry — {today}</h3>
        <textarea
          placeholder="What happened today? How are you feeling? This is your private space — no judgement..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {message && <div className="success-msg">{message}</div>}
        <button className="save-btn" onClick={handleSave}>📓 Save Entry</button>
      </div>
      <h3>Past Entries</h3>
      {entries.length === 0 ? (
        <p className="empty-msg">No entries yet. Write your first one above!</p>
      ) : (
        entries.map(entry => (
          <div key={entry._id} className="entry-card">
            <div className="entry-top">
              <span className="entry-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
              <button className="delete-btn" onClick={() => handleDelete(entry._id)}>🗑️</button>
            </div>
            <p>{entry.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Journal;
