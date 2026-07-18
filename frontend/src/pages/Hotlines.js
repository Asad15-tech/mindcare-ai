import React from 'react';

const hotlines = [
  {
    id: 1,
    name: '988 Suicide & Crisis Lifeline',
    emoji: '🆘',
    contact: 'Call or Text 988',
    description: 'For suicidal thoughts, emotional distress, anxiety, depression, or any mental health crisis.',
    available: '24/7',
    color: '#c62828'
  },
  {
    id: 2,
    name: 'Crisis Text Line',
    emoji: '💬',
    contact: 'Text HOME to 741741',
    description: 'For people who prefer texting instead of calling during a crisis.',
    available: '24/7',
    color: '#1565c0'
  },
  {
    id: 3,
    name: 'The Trevor Project',
    emoji: '🏳️‍🌈',
    contact: 'Call 1-866-488-7386 • Text START to 678678',
    description: 'Crisis support for LGBTQ+ youth.',
    available: '24/7',
    color: '#6a1b9a'
  },
  {
    id: 4,
    name: 'Childhelp National Child Abuse Hotline',
    emoji: '👶',
    contact: 'Call or Text 1-800-422-4453',
    description: 'Abuse, neglect, or unsafe home situations.',
    available: '24/7',
    color: '#bf360c'
  },
  {
    id: 5,
    name: 'National Domestic Violence Hotline',
    emoji: '🤝',
    contact: 'Call 1-800-799-7233 • Text START to 88788',
    description: 'Dating violence, family violence, or unhealthy relationships.',
    available: '24/7',
    color: '#e65100'
  },
  {
    id: 6,
    name: 'RAINN National Sexual Assault Hotline',
    emoji: '🛡️',
    contact: 'Call 1-800-656-4673',
    description: 'Sexual assault or sexual abuse support.',
    available: '24/7',
    color: '#880e4f'
  },
  {
    id: 7,
    name: 'Emergency Services',
    emoji: '🚨',
    contact: 'Call 911',
    description: 'Immediate life-threatening emergencies.',
    available: '24/7',
    color: '#b71c1c'
  },
];

function Hotlines() {
  return (
    <div className="page">
      <h1>Crisis Hotlines 📞</h1>
      <p className="subtitle">You are not alone — help is always available</p>

      <div className="warning-banner">
        ⚠️ If you are in immediate danger or experiencing a mental health crisis, call <strong>911</strong> or contact the <strong>988 Suicide & Crisis Lifeline</strong> immediately.
      </div>

      <div className="hotlines-grid">
        {hotlines.map(h => (
          <div key={h.id} className="hotline-card">
            <div className="hotline-top">
              <span className="hotline-emoji">{h.emoji}</span>
              <div>
                <div className="hotline-name">{h.name}</div>
                <div className="hotline-desc">{h.description}</div>
                <div style={{ fontSize: '12px', color: '#2e7d32', fontFamily: 'Times New Roman', marginTop: '4px', fontWeight: '600' }}>🕐 Available {h.available}</div>
              </div>
            </div>
            <div className="hotline-number" style={{ background: h.color }}>
              📞 {h.contact}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <p style={{ color: '#555', fontFamily: 'Times New Roman', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
          <strong style={{ color: '#2e7d32' }}>Disclaimer:</strong> This app is not affiliated with or endorsed by the organizations listed. Contact information is provided to help users access publicly available support services. This app is designed to provide mental health education and wellness tools. It is not a replacement for professional medical care, diagnosis, therapy, or emergency services.
        </p>
      </div>

      <div className="card" style={{ marginTop: '16px', textAlign: 'center' }}>
        <p style={{ color: '#2e7d32', fontFamily: 'Times New Roman', fontSize: '16px', fontWeight: '600', margin: 0 }}>
          💚 Remember: Reaching out for help is a sign of strength, not weakness.
        </p>
      </div>
    </div>
  );
}

export default Hotlines;
