import React, { useState, useEffect } from 'react';
import { getMoods, getJournals } from '../api';

const moods = [
  { emoji: '😣', label: 'Awful', score: 1, color: '#e53935' },
  { emoji: '😕', label: 'Bad', score: 2, color: '#fb8c00' },
  { emoji: '😐', label: 'Okay', score: 3, color: '#fdd835' },
  { emoji: '🙂', label: 'Good', score: 4, color: '#7cb342' },
  { emoji: '😄', label: 'Great', score: 5, color: '#2e7d32' },
];

function Dashboard({ user, setCurrentPage }) {
  const [moodCount, setMoodCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [recentMoods, setRecentMoods] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [hoveredMood, setHoveredMood] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moodsRes = await getMoods();
        const journalsRes = await getJournals();
        setMoodCount(moodsRes.data.length);
        setJournalCount(journalsRes.data.length);
        const sorted = [...moodsRes.data].sort((a, b) => {
          const da = new Date(a.createdAt || a.date || 0);
          const db = new Date(b.createdAt || b.date || 0);
          return da - db;
        });
        setRecentMoods(sorted.slice(-7));
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoaded(true), 100);
      }
    };
    fetchData();
  }, []);

  const moodByScore = (score) => moods.find(m => m.score === score) || moods[2];

  return (
    <div className="page" style={{ fontFamily: 'Times New Roman' }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
        }
        @keyframes fillBar {
          from { width: 0%; }
        }
        @keyframes pulseSoft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46,125,50,0.25); }
          50% { box-shadow: 0 0 0 8px rgba(46,125,50,0); }
        }
        .dash-fade { animation: fadeSlideUp 0.5s ease both; }
        .wave-emoji { display: inline-block; animation: wave 2.2s ease-in-out infinite; transform-origin: 70% 70%; }
      `}</style>

      {/* Hero header */}
      <div
        className="dash-fade"
        style={{
          background: 'linear-gradient(135deg, #2e7d32, #4a7c59)',
          borderRadius: '20px',
          padding: '28px 32px',
          marginBottom: '20px',
          color: 'white',
          boxShadow: '0 6px 20px rgba(46,125,50,0.25)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '28px', fontFamily: 'Times New Roman' }}>
          Welcome back, {user.username}! <span className="wave-emoji">👋</span>
        </h1>
        <p style={{ margin: '6px 0 0', fontFamily: 'Times New Roman', opacity: 0.9, fontSize: '15px' }}>
          How are you feeling today?
        </p>
      </div>

      <div
        className="dash-fade"
        style={{
          background: '#fff8e1',
          border: '1px solid #ffe082',
          borderRadius: '14px',
          padding: '14px 18px',
          marginBottom: '20px',
          color: '#8d6e00',
          fontFamily: 'Times New Roman',
          fontSize: '14px',
          animationDelay: '0.05s',
        }}
      >
        ⚠️ MindHaven is a wellness tool — not a substitute for professional therapy. In a crisis, please contact emergency services.
      </div>

      {/* Stats grid */}
      <div
        className="dash-fade"
        style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: '18px', marginBottom: '20px', animationDelay: '0.1s' }}
      >
        {/* Mood trend mini chart - replaces the old avg mood number */}
        <div
          onMouseEnter={() => setHoveredStat('mood')}
          onMouseLeave={() => setHoveredStat(null)}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #c8e6c9',
            transition: 'all 0.25s ease',
            transform: hoveredStat === 'mood' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredStat === 'mood' ? '0 10px 22px rgba(46,125,50,0.18)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888', fontFamily: 'Times New Roman', marginBottom: '10px' }}>
            MOOD TREND {recentMoods.length > 0 ? `(Last ${recentMoods.length})` : ''}
          </div>
          {recentMoods.length === 0 ? (
            <div style={{ fontFamily: 'Times New Roman', color: '#aaa', fontSize: '14px', padding: '18px 0' }}>
              Log a mood to see your trend here 📈
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '76px', position: 'relative' }}>
              {recentMoods.map((entry, i) => {
                const m = moodByScore(entry.moodScore);
                const heightPct = loaded ? (entry.moodScore / 5) * 100 : 0;
                return (
                  <div
                    key={entry._id || i}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', cursor: 'pointer', position: 'relative' }}
                  >
                    {hoveredBar === i && (
                      <div style={{
                        position: 'absolute',
                        bottom: `${heightPct}%`,
                        marginBottom: '6px',
                        background: '#2e7d32',
                        color: 'white',
                        fontSize: '11px',
                        fontFamily: 'Times New Roman',
                        padding: '3px 7px',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                        zIndex: 2,
                      }}>
                        {m.emoji} {m.label}
                      </div>
                    )}
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '22px',
                        height: `${heightPct}%`,
                        minHeight: '6px',
                        borderRadius: '6px',
                        background: m.color,
                        transition: 'height 0.6s ease',
                        opacity: hoveredBar === null || hoveredBar === i ? 1 : 0.5,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => setHoveredStat('total')}
          onMouseLeave={() => setHoveredStat(null)}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #c8e6c9',
            transition: 'all 0.25s ease',
            transform: hoveredStat === 'total' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredStat === 'total' ? '0 10px 22px rgba(46,125,50,0.18)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888', fontFamily: 'Times New Roman', marginBottom: '10px' }}>
            TOTAL MOOD ENTRIES
          </div>
          <div style={{ fontSize: '34px', fontWeight: '800', color: '#2e7d32', fontFamily: 'Times New Roman' }}>
            {moodCount} <span style={{ fontSize: '20px' }}>😊</span>
          </div>
        </div>

        <div
          onMouseEnter={() => setHoveredStat('journal')}
          onMouseLeave={() => setHoveredStat(null)}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #c8e6c9',
            transition: 'all 0.25s ease',
            transform: hoveredStat === 'journal' ? 'translateY(-4px)' : 'translateY(0)',
            boxShadow: hoveredStat === 'journal' ? '0 10px 22px rgba(46,125,50,0.18)' : '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888', fontFamily: 'Times New Roman', marginBottom: '10px' }}>
            JOURNAL ENTRIES
          </div>
          <div style={{ fontSize: '34px', fontWeight: '800', color: '#1565c0', fontFamily: 'Times New Roman' }}>
            {journalCount} <span style={{ fontSize: '20px' }}>📓</span>
          </div>
        </div>
      </div>

      {/* Quick check-in */}
      <div
        className="dash-fade"
        style={{
          background: 'white',
          borderRadius: '18px',
          padding: '22px',
          border: '1px solid #c8e6c9',
          marginBottom: '20px',
          animationDelay: '0.18s',
        }}
      >
        <h3 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', marginTop: 0, marginBottom: '16px' }}>
          Quick Check-in ⚡
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {moods.map(m => (
            <div
              key={m.label}
              onClick={() => setCurrentPage('mood')}
              onMouseEnter={() => setHoveredMood(m.label)}
              onMouseLeave={() => setHoveredMood(null)}
              style={{
                background: hoveredMood === m.label ? '#e8f5e9' : '#f7fbf7',
                borderRadius: '14px',
                padding: '18px 8px',
                textAlign: 'center',
                cursor: 'pointer',
                border: hoveredMood === m.label ? `2px solid ${m.color}` : '2px solid transparent',
                transform: hoveredMood === m.label ? 'scale(1.06) translateY(-3px)' : 'scale(1)',
                transition: 'all 0.2s ease',
                boxShadow: hoveredMood === m.label ? '0 8px 16px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '6px' }}>{m.emoji}</div>
              <div style={{ fontFamily: 'Times New Roman', fontSize: '13px', color: '#333', fontWeight: hoveredMood === m.label ? '700' : '400' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div
        className="dash-fade"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', animationDelay: '0.24s' }}
      >
        {[
          { id: 'aichat', emoji: '🤖', label: 'Chat with AI' },
          { id: 'journal', emoji: '📓', label: 'Write in Journal' },
          { id: 'analytics', emoji: '📊', label: 'View Analytics' },
        ].map(action => (
          <button
            key={action.id}
            onClick={() => setCurrentPage(action.id)}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            style={{
              background: hoveredAction === action.id ? 'linear-gradient(135deg, #2e7d32, #4a7c59)' : 'white',
              color: hoveredAction === action.id ? 'white' : '#2e7d32',
              border: '1.5px solid #2e7d32',
              borderRadius: '14px',
              padding: '16px',
              fontSize: '15px',
              fontWeight: '700',
              fontFamily: 'Times New Roman',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              transform: hoveredAction === action.id ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: hoveredAction === action.id ? '0 10px 20px rgba(46,125,50,0.3)' : '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            {action.emoji} {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;