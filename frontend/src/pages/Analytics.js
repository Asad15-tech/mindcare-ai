import React, { useState, useEffect } from 'react';
import { getMoods, getActivities } from '../api';

function Analytics({ user }) {
  const [moods, setMoods] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moodsRes = await getMoods();
        const activitiesRes = await getActivities();
        setMoods(moodsRes.data);
        setActivities(activitiesRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const avgMood = moods.length > 0
    ? (moods.reduce((sum, m) => sum + m.moodScore, 0) / moods.length).toFixed(1)
    : null;

  const bestMood = moods.length > 0
    ? moods.reduce((best, m) => m.moodScore > best.moodScore ? m : best, moods[0])
    : null;

  const last7 = moods.slice(0, 7).reverse();

  const getCorrelation = () => {
    if (moods.length === 0 || activities.length === 0) return null;
    let withExercise = [];
    let withoutExercise = [];
    moods.forEach(mood => {
      const moodDate = new Date(mood.createdAt).toDateString();
      const activity = activities.find(a => new Date(a.createdAt).toDateString() === moodDate);
      if (activity && activity.exercise > 0) {
        withExercise.push(mood.moodScore);
      } else {
        withoutExercise.push(mood.moodScore);
      }
    });
    const avgWith = withExercise.length > 0
      ? (withExercise.reduce((a, b) => a + b, 0) / withExercise.length).toFixed(1)
      : null;
    const avgWithout = withoutExercise.length > 0
      ? (withoutExercise.reduce((a, b) => a + b, 0) / withoutExercise.length).toFixed(1)
      : null;
    return { avgWith, avgWithout };
  };

  const correlation = getCorrelation();
  const moodEmojis = { 1: '😣', 2: '😕', 3: '😐', 4: '🙂', 5: '😄' };
  const moodColors = { 1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#22c55e', 5: '#7c3aed' };
  const moodLabels = { 1: 'Awful', 2: 'Bad', 3: 'Okay', 4: 'Good', 5: 'Great' };

  return (
    <div className="page">
      <h1>Analytics 📊</h1>
      <p className="subtitle">Your mood patterns over time</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">AVERAGE MOOD</div>
          <div className="stat-value">{avgMood || '—'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">TOTAL LOGS</div>
          <div className="stat-value green">{moods.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">BEST MOOD</div>
          <div className="stat-value orange">{bestMood ? bestMood.mood : '—'}</div>
        </div>
      </div>

      <div className="card">
        <h3>Last 7 Mood Entries</h3>
        {last7.length === 0 ? (
          <p className="empty-msg">No data yet. Start logging your mood!</p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', padding: '10px 0 0 0', borderBottom: '2px solid #f0f0f0' }}>
            {last7.map((entry, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '13px', color: '#666', fontWeight: '700' }}>{entry.moodScore}/5</span>
                <div style={{
                  width: '50px',
                  height: `${(entry.moodScore / 5) * 140}px`,
                  background: moodColors[entry.moodScore],
                  borderRadius: '8px 8px 0 0',
                  minHeight: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }} />
                <span style={{ fontSize: '22px' }}>{moodEmojis[entry.moodScore]}</span>
                <span style={{ fontSize: '11px', color: '#aaa', textAlign: 'center' }}>
                  {new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <span style={{ fontSize: '10px', color: moodColors[entry.moodScore], fontWeight: '600' }}>
                  {moodLabels[entry.moodScore]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>💡 Mood & Exercise Correlation</h3>
        {!correlation || (!correlation.avgWith && !correlation.avgWithout) ? (
          <p className="empty-msg">Log both mood and activity on same days to see correlation!</p>
        ) : (
          <div className="correlation-grid">
            <div className="correlation-item good">
              <span className="corr-icon">🏋️</span>
              <div className="corr-label">Days with Exercise</div>
              <div className="corr-value">{correlation.avgWith ? `${correlation.avgWith}/5` : 'No data'}</div>
              <div className="corr-sub">Average Mood</div>
            </div>
            <div className="correlation-item bad">
              <span className="corr-icon">🛋️</span>
              <div className="corr-label">Days without Exercise</div>
              <div className="corr-value">{correlation.avgWithout ? `${correlation.avgWithout}/5` : 'No data'}</div>
              <div className="corr-sub">Average Mood</div>
            </div>
            {correlation.avgWith && correlation.avgWithout && (
              <div className="correlation-insight">
                {parseFloat(correlation.avgWith) > parseFloat(correlation.avgWithout)
                  ? '✅ Exercise improves your mood! Keep it up!'
                  : '💡 Try adding exercise to boost your mood!'}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <h3>💧 Water & Sleep Stats</h3>
        {activities.length === 0 ? (
          <p className="empty-msg">Log activities to see water intake insights!</p>
        ) : (
          <div className="water-stats">
            <div className="water-item">
              <span>💧</span>
              <div>
                <div className="corr-value">
                  {(activities.reduce((sum, a) => sum + a.water, 0) / activities.length).toFixed(1)}
                </div>
                <div className="corr-sub">Avg glasses/day</div>
              </div>
            </div>
            <div className="water-item">
              <span>😴</span>
              <div>
                <div className="corr-value">
                  {(activities.reduce((sum, a) => sum + a.sleep, 0) / activities.length).toFixed(1)}
                </div>
                <div className="corr-sub">Avg sleep hours/day</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
