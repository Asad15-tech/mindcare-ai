import React, { useState, useEffect, useRef } from 'react';

const HATS = [
  { id: 'none', name: 'None', svg: null },
  {
    id: 'antennae', name: 'Antennae',
    svg: (<g><line x1="85" y1="55" x2="75" y2="25" stroke="#111" strokeWidth="3" strokeLinecap="round"/><circle cx="75" cy="22" r="6" fill="#e53935"/><line x1="115" y1="55" x2="125" y2="25" stroke="#111" strokeWidth="3" strokeLinecap="round"/><circle cx="125" cy="22" r="6" fill="#e53935"/><path d="M 70 58 Q 100 45 130 58" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>)
  },
  {
    id: 'crown', name: 'Crown',
    svg: (<g><polygon points="65,65 75,40 100,58 125,40 135,65" fill="#FFA000" stroke="#FF6F00" strokeWidth="2"/><rect x="65" y="62" width="70" height="12" rx="4" fill="#FFA000"/><circle cx="75" cy="44" r="4" fill="white"/><circle cx="100" cy="56" r="4" fill="white"/><circle cx="125" cy="44" r="4" fill="white"/></g>)
  },
  {
    id: 'flower', name: 'Flower',
    svg: (<g><circle cx="100" cy="42" r="14" fill="#e91e8c"/><circle cx="86" cy="36" r="10" fill="#e91e8c"/><circle cx="114" cy="36" r="10" fill="#e91e8c"/><circle cx="100" cy="28" r="10" fill="#e91e8c"/><circle cx="100" cy="42" r="8" fill="#8B4513"/></g>)
  },
  {
    id: 'bow', name: 'Bow',
    svg: (<g><ellipse cx="82" cy="48" rx="18" ry="12" fill="#e53935"/><ellipse cx="118" cy="48" rx="18" ry="12" fill="#e53935"/><circle cx="100" cy="48" r="8" fill="#e53935"/><circle cx="78" cy="44" r="3" fill="#111" opacity="0.5"/><circle cx="86" cy="50" r="3" fill="#111" opacity="0.5"/><circle cx="114" cy="44" r="3" fill="#111" opacity="0.5"/><circle cx="122" cy="50" r="3" fill="#111" opacity="0.5"/></g>)
  },
  {
    id: 'swirl', name: 'Swirl',
    svg: (<g><path d="M 100 55 Q 110 45 108 35 Q 106 25 98 28 Q 90 31 92 40 Q 94 48 102 46" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/></g>)
  },
  {
    id: 'sunhat', name: 'Sun Hat',
    svg: (<g><ellipse cx="100" cy="68" rx="52" ry="10" fill="#c6cc00"/><ellipse cx="100" cy="55" rx="35" ry="22" fill="#c6cc00"/><rect x="65" y="58" width="70" height="8" rx="2" fill="#e53935"/></g>)
  },
  {
    id: 'tophat', name: 'Top Hat',
    svg: (<g><rect x="72" y="30" width="56" height="38" rx="6" fill="#111"/><rect x="60" y="64" width="80" height="10" rx="4" fill="#111"/><rect x="72" y="64" width="56" height="6" rx="2" fill="#e53935"/></g>)
  },
  {
    id: 'propeller', name: 'Propeller Cap',
    svg: (<g><rect x="96" y="14" width="8" height="18" rx="3" fill="#888"/><ellipse cx="100" cy="12" rx="20" ry="5" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5"/><ellipse cx="100" cy="12" rx="4" ry="4" fill="#F9A825"/><path d="M 70 62 Q 100 34 130 62 Q 100 50 70 62 Z" fill="#42a5f5"/><rect x="68" y="58" width="64" height="10" rx="5" fill="#1565c0"/></g>)
  },
];

function AIHead({ hatId, skinColor }) {
  const hat = HATS.find(h => h.id === hatId);
  return (
    <svg width="80" height="80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="96" fill="#e8f5e9"/>
      <ellipse cx="100" cy="115" rx="52" ry="55" fill={skinColor || '#f5d0c5'}/>
      <ellipse cx="48" cy="116" rx="10" ry="14" fill={skinColor || '#f5d0c5'}/>
      <ellipse cx="152" cy="116" rx="10" ry="14" fill={skinColor || '#f5d0c5'}/>
      <circle cx="82" cy="108" r="4" fill="#111"/>
      <circle cx="118" cy="108" r="4" fill="#111"/>
      <path d="M 85 125 Q 100 135 115 125" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="72" cy="120" rx="10" ry="7" fill="#ffb3b3" opacity="0.3"/>
      <ellipse cx="128" cy="120" rx="10" ry="7" fill="#ffb3b3" opacity="0.3"/>
      {hat?.svg}
    </svg>
  );
}

function Chat({ user, aiData, setCurrentPage }) {
  const ai = aiData || { name: 'Luna', color: '#2e7d32' };
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I am ${ai.name}, your MindHaven wellness assistant. How are you feeling today? 💙` }
  ]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedHat, setSelectedHat] = useState('none');
  const [skinColor, setSkinColor] = useState('#f5d0c5');
  const bottomRef = useRef(null);

  useEffect(() => {
    const key = localStorage.getItem('groqApiKey');
    if (key) { setSavedKey(key); setApiKey(key); setKeySaved(true); }
    const savedAi = localStorage.getItem('aiCustomization');
    if (savedAi) {
      const data = JSON.parse(savedAi);
      if (data.hatId) setSelectedHat(data.hatId);
      if (data.skinColor) setSkinColor(data.skinColor);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem('groqApiKey', apiKey);
    setSavedKey(apiKey);
    setKeySaved(true);
  };

  const sendMessage = async () => {
    if (!input.trim() || !savedKey) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ messages: [...messages, userMsg], apiKey: savedKey })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to AI.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="page chat-page" style={{ position: 'relative' }}>
      {/* AI Header */}
      <div className="chat-ai-header" style={{ background: `linear-gradient(135deg, ${ai.color || '#2e7d32'}, #4a7c59)` }}>
        <div className="chat-ai-avatar" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '16px', padding: '8px' }}>
          <AIHead hatId={selectedHat} skinColor={skinColor} />
        </div>
        <div className="chat-ai-info">
          <div className="chat-ai-name">{ai.name || 'Luna'}</div>
          <div className="chat-ai-status">🟢 Online — Your AI Wellness Assistant</div>
        </div>
        {/* Personalize Button - goes straight to the full Customize page */}
        <button
          onClick={() => setCurrentPage && setCurrentPage('aiCustomization')}
          style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', border: '2px solid white', color: 'white', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontFamily: 'Times New Roman', fontSize: '13px', fontWeight: '600' }}
        >
          🎨 Personalize
        </button>
      </div>

      {/* API Key */}
      <div className="api-key-bar">
        <span>🔑 Groq API Key:</span>
        <input placeholder="gsk_xxxx..." value={apiKey} onChange={e => { setApiKey(e.target.value); setKeySaved(false); }} type="password" />
        <button onClick={saveKey}>Save</button>
      </div>
      {keySaved && <div className="success-msg" style={{ marginBottom: '12px' }}>✅ API Key saved!</div>}
      {!savedKey && <div className="warning-msg">Please enter your Groq API key to start chatting.</div>}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg-wrap ${msg.role}`}>
            {msg.role === 'assistant' && (
              <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                <AIHead hatId={selectedHat} skinColor={skinColor} />
              </div>
            )}
            <div className={`chat-bubble ${msg.role}`}>{msg.content}</div>
            {msg.role === 'user' && (
              <div className="chat-msg-avatar user-avatar-chat">{user?.username?.[0]?.toUpperCase()}</div>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-msg-wrap assistant">
            <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
              <AIHead hatId={selectedHat} skinColor={skinColor} />
            </div>
            <div className="chat-bubble assistant">Thinking... 💭</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-bar">
        <input placeholder={`Message ${ai.name || 'Luna'}...`} value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} />
        <button onClick={sendMessage}>Send 🚀</button>
      </div>
    </div>
  );
}

export default Chat;