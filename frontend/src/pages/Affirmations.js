// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';

const affirmations = [
  { day: 1,  text: "You got this!", emoji: "💪" },
  { day: 2,  text: "I believe in you.", emoji: "🌟" },
  { day: 3,  text: "You matter.", emoji: "💚" },
  { day: 4,  text: "You belong.", emoji: "🤗" },
  { day: 5,  text: "You are lovable.", emoji: "💝" },
  { day: 6,  text: "You are brave.", emoji: "🦁" },
  { day: 7,  text: "You are capable of amazing things.", emoji: "✨" },
  { day: 8,  text: "I love you.", emoji: "❤️" },
  { day: 9,  text: "You are confident.", emoji: "😎" },
  { day: 10, text: "You are unstoppable.", emoji: "🚀" },
  { day: 11, text: "You are enough.", emoji: "🙏" },
  { day: 12, text: "One breath at a time.", emoji: "🌬️" },
  { day: 13, text: "Every day is a new opportunity.", emoji: "🌅" },
  { day: 14, text: "You can achieve your goals.", emoji: "🎯" },
  { day: 15, text: "You are resilient.", emoji: "🏔️" },
  { day: 16, text: "I believe in your potential.", emoji: "🌱" },
  { day: 17, text: "You are amazing.", emoji: "🌈" },
  { day: 18, text: "You are respectable.", emoji: "👑" },
  { day: 19, text: "You will never stop growing.", emoji: "🦋" },
  { day: 20, text: "You are not alone.", emoji: "🤝" },
  { day: 21, text: "Just breathe.", emoji: "😮‍💨" },
  { day: 22, text: "You are perfect.", emoji: "⭐" },
  { day: 23, text: "Your smile is beautiful.", emoji: "😊" },
  { day: 24, text: "You're perfect just as you are.", emoji: "🌸" },
  { day: 25, text: "People who are jealous are always the ones putting you down.", emoji: "🛡️" },
  { day: 26, text: "Everything about you is amazing.", emoji: "💫" },
  { day: 27, text: "You're so cool.", emoji: "😄" },
  { day: 28, text: "I love your style.", emoji: "🎨" },
  { day: 29, text: "I love how you're so unique.", emoji: "🦄" },
  { day: 30, text: "Don't change yourself for others, you're amazing.", emoji: "💎" },
  { day: 31, text: "Your ideas are amazing.", emoji: "💡" },
];

function Affirmations() {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const todayAffirmation = affirmations.find(a => a.day === dayOfMonth) || affirmations[0];
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * affirmations.length));
  const [liked, setLiked] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const monthName = today.toLocaleDateString('en-US', { month: 'long' });
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

  const getNew = () => {
    setRandomIndex(Math.floor(Math.random() * affirmations.length));
    setLiked(false);
  };

  return (
    <div className="page">
      <h1>Daily Affirmations 🌟</h1>
      <p className="subtitle">Start your day with positive thoughts</p>

      {/* Today's Affirmation */}
      <div className="affirmation-today">
        <div className="affirmation-badge">✨ Daily Affirmation — {dayName}, {monthName} {dayOfMonth}</div>
        <div className="affirmation-emoji-big">{todayAffirmation.emoji}</div>
        <div className="affirmation-text-big">"{todayAffirmation.text}"</div>
        <button
          className={`affirmation-like ${liked ? 'liked' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          {liked ? '❤️ Saved to favorites' : '🤍 Save to favorites'}
        </button>
      </div>

      {/* Random Affirmation */}
      <div className="card">
        <h3>🎲 Random Affirmation</h3>
        <div className="affirmation-random">
          <span className="affirmation-emoji-med">{affirmations[randomIndex].emoji}</span>
          <p className="affirmation-text-med">"{affirmations[randomIndex].text}"</p>
        </div>
        <button className="save-btn" onClick={getNew}>🔀 Get New Affirmation</button>
      </div>

      {/* All Affirmations */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>📋 All 31 Affirmations</h3>
          <button className="toggle-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Hide' : 'Show All'}
          </button>
        </div>
        {showAll && (
          <div className="affirmations-list">
            {affirmations.map((a, i) => (
              <div key={i} className={`affirmation-item ${a.day === dayOfMonth ? 'today-item' : ''}`}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{a.emoji}</span>
                <span style={{ flex: 1 }}>"{a.text}"</span>
                <span style={{ fontSize: '11px', color: '#aaa', flexShrink: 0, fontFamily: 'Times New Roman' }}>Day {a.day}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Affirmations;
