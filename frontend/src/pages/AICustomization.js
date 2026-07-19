import React, { useState, useEffect } from 'react';

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
    svg: (<g><rect x="72" y="30" width="56" height="38" rx="6" fill="#111"/><rect x="60" y="64" width="80" height="10" rx="4" fill="#111"/><rect x="72" y="64" width="56" height="6" rx="2" fill="#e53935"/><rect x="72" y="30" width="56" height="10" rx="4" fill="#222"/></g>)
  },
  {
    id: 'propeller', name: 'Propeller Cap',
    svg: (<g><rect x="96" y="14" width="8" height="18" rx="3" fill="#888"/><ellipse cx="100" cy="12" rx="20" ry="5" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5"/><ellipse cx="100" cy="12" rx="4" ry="4" fill="#F9A825"/><path d="M 70 62 Q 100 34 130 62 Q 100 50 70 62 Z" fill="#42a5f5"/><rect x="68" y="58" width="64" height="10" rx="5" fill="#1565c0"/></g>)
  },
];

const FACES = [
  { id: 'cute', name: 'Cute', svg: (<g><circle cx="82" cy="95" r="4" fill="#111"/><circle cx="118" cy="95" r="4" fill="#111"/><path d="M 85 112 Q 100 122 115 112" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/></g>) },
  { id: 'bigteeth', name: 'Big Smile', svg: (<g><circle cx="82" cy="95" r="5" fill="#111"/><circle cx="118" cy="95" r="5" fill="#111"/><path d="M 78 110 Q 100 128 122 110" stroke="#111" strokeWidth="2" fill="#ff6b8a"/><rect x="86" y="112" width="28" height="12" rx="2" fill="white"/><line x1="93" y1="112" x2="93" y2="124" stroke="#ddd" strokeWidth="1"/><line x1="100" y1="112" x2="100" y2="124" stroke="#ddd" strokeWidth="1"/><line x1="107" y1="112" x2="107" y2="124" stroke="#ddd" strokeWidth="1"/></g>) },
  { id: 'sleepy', name: 'Sleepy', svg: (<g><path d="M 70 92 Q 82 86 94 92" stroke="#ff69b4" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 106 92 Q 118 86 130 92" stroke="#ff69b4" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 72 90 Q 82 98 92 90" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 108 90 Q 118 98 128 90" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 85 114 Q 100 122 115 114" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/></g>) },
  { id: 'hearts', name: 'Hearts', svg: (<g><path d="M 82 88 C 82 84 76 84 76 88 C 76 92 82 96 82 96 C 82 96 88 92 88 88 C 88 84 82 84 82 88Z" fill="#e91e8c"/><path d="M 118 88 C 118 84 112 84 112 88 C 112 92 118 96 118 96 C 118 96 124 92 124 88 C 124 84 118 84 118 88Z" fill="#e91e8c"/><path d="M 85 114 Q 100 126 115 114" stroke="#e91e8c" strokeWidth="3" fill="none" strokeLinecap="round"/></g>) },
  { id: 'wink', name: 'Wink', svg: (<g><ellipse cx="82" cy="95" rx="10" ry="11" fill="white"/><circle cx="84" cy="96" r="6" fill="#6d4c41"/><circle cx="86" cy="94" r="2" fill="white"/><path d="M 108 93 Q 118 86 128 93" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 85 114 Q 100 124 115 114" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/></g>) },
  { id: 'blueeye', name: 'Blue Eyes', svg: (<g><path d="M 70 93 Q 82 86 94 93" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="82" cy="98" rx="10" ry="7" fill="#42a5f5"/><path d="M 106 93 Q 118 86 130 93" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="118" cy="98" rx="10" ry="7" fill="#42a5f5"/><path d="M 85 116 Q 100 126 115 116" stroke="#42a5f5" strokeWidth="2.5" fill="none" strokeLinecap="round"/></g>) },
  { id: 'greeneye', name: 'Green Eyes', svg: (<g><path d="M 70 93 Q 82 86 94 93" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="82" cy="98" rx="10" ry="7" fill="#26a69a"/><path d="M 106 93 Q 118 86 130 93" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><ellipse cx="118" cy="98" rx="10" ry="7" fill="#26a69a"/><path d="M 85 116 Q 100 126 115 116" stroke="#26a69a" strokeWidth="2.5" fill="none" strokeLinecap="round"/></g>) },
  { id: 'happy', name: 'Happy', svg: (<g><path d="M 72 97 Q 82 89 92 97" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 108 97 Q 118 89 128 97" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M 82 114 Q 100 128 118 114" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round"/></g>) },
  { id: 'omouth', name: 'Surprised', svg: (<g><circle cx="82" cy="95" r="5" fill="#111"/><circle cx="118" cy="95" r="5" fill="#111"/><ellipse cx="100" cy="116" rx="12" ry="14" fill="#111"/><ellipse cx="100" cy="116" rx="8" ry="10" fill="#cc4444"/></g>) },
  { id: 'serious', name: 'Serious', svg: (<g><line x1="72" y1="93" x2="90" y2="93" stroke="#111" strokeWidth="4" strokeLinecap="round"/><line x1="110" y1="93" x2="128" y2="93" stroke="#111" strokeWidth="4" strokeLinecap="round"/><line x1="82" y1="116" x2="118" y2="116" stroke="#111" strokeWidth="3.5" strokeLinecap="round"/></g>) },
];

const SHIRTS = [
  { id: 'black', name: 'Black', color: '#111111' },
  { id: 'blue', name: 'Blue', color: '#1565c0' },
  { id: 'gray', name: 'Gray', color: '#9e9e9e' },
  { id: 'red', name: 'Red', color: '#c62828' },
  { id: 'orange', name: 'Orange', color: '#e65100' },
];

const BOTTOMS = [
  { id: 'pants_orange', name: 'Orange Pants', type: 'pants', color: '#e65100' },
  { id: 'pants_black', name: 'Black Pants', type: 'pants', color: '#111111' },
  { id: 'pants_blue', name: 'Blue Pants', type: 'pants', color: '#42a5f5' },
  { id: 'pants_gray', name: 'Gray Pants', type: 'pants', color: '#9e9e9e' },
  { id: 'shorts_star', name: 'Star Shorts', type: 'shorts', color: '#111111' },
  { id: 'shorts_blue', name: 'Blue Shorts', type: 'shorts', color: '#1565c0' },
  { id: 'shorts_black', name: 'Black Shorts', type: 'shorts', color: '#111111' },
  { id: 'skirt_blue', name: 'Blue Skirt', type: 'skirt', color: '#1565c0' },
  { id: 'skirt_black', name: 'Black Skirt', type: 'skirt', color: '#111111' },
];

const SKIN_COLORS = [
  { group: 'Fair - Light', subgroup: 'Cool', colors: ['#f8e0d8','#f5d0c5','#f0c4b5','#eab8a8','#e5b0a0'] },
  { group: 'Fair - Light', subgroup: 'Warm', colors: ['#fce8d5','#f8ddc0','#f5d0aa','#f0c495','#eab880'] },
  { group: 'Fair - Light', subgroup: 'Neutral', colors: ['#f8e0cc','#f5d4b8','#f0c8a0','#eabc8c','#e0b078'] },
  { group: 'Medium - Tan', subgroup: 'Cool', colors: ['#e8a898','#e09888','#d88878','#cc7868','#c06858'] },
  { group: 'Medium - Tan', subgroup: 'Warm', colors: ['#e8b888','#e0a870','#d89858','#cc8840','#c07828'] },
  { group: 'Medium - Tan', subgroup: 'Neutral', colors: ['#d4956e','#c8855e','#bc754e','#b0653e','#a4552e'] },
  { group: 'Dark - Deep', subgroup: 'Cool', colors: ['#c87848','#b06838','#985828','#804818','#683808'] },
  { group: 'Dark - Deep', subgroup: 'Warm', colors: ['#a06830','#886020','#705010','#584000','#403000'] },
  { group: 'Dark - Deep', subgroup: 'Neutral', colors: ['#886040','#704830','#583820','#402810','#281800'] },
];

const AI_NAMES = ['Luna', 'Max', 'Buddy', 'Aria', 'Sage', 'Nova', 'Zara', 'Leo'];

export function HatSVG({ hatId }) {
  const hat = HATS.find(h => h.id === hatId);
  return hat?.svg || null;
}

export function AvatarIcon({ skinColor, faceId, hatId, size = 56 }) {
  const face = FACES.find(f => f.id === faceId);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="96" fill="#e8f5e9"/>
      <ellipse cx="100" cy="108" rx="52" ry="55" fill={skinColor}/>
      <ellipse cx="48" cy="110" rx="10" ry="14" fill={skinColor}/>
      <ellipse cx="152" cy="110" rx="10" ry="14" fill={skinColor}/>
      {face?.svg}
      <ellipse cx="72" cy="118" rx="10" ry="7" fill="#ffb3b3" opacity="0.3"/>
      <ellipse cx="128" cy="118" rx="10" ry="7" fill="#ffb3b3" opacity="0.3"/>
      <HatSVG hatId={hatId} />
    </svg>
  );
}

export function CharacterSVG({ skinColor, faceId, hatId, shirtId, bottomId, width = 200, height = 280 }) {
  const face = FACES.find(f => f.id === faceId);
  const shirtColor = SHIRTS.find(s => s.id === shirtId)?.color || '#1565c0';
  const b = BOTTOMS.find(b => b.id === bottomId);

  const renderBottom = () => {
    if (!b) return null;
    if (b.type === 'pants') return (<g><rect x="78" y="195" width="20" height="45" rx="8" fill={b.color}/><rect x="102" y="195" width="20" height="45" rx="8" fill={b.color}/></g>);
    if (b.type === 'shorts') return (<g><path d="M 75 195 L 78 225 L 100 220 L 122 225 L 125 195 Z" fill={b.color}/>{b.id === 'shorts_star' && (<text x="88" y="215" fontSize="12" fill="white">★</text>)}</g>);
    if (b.type === 'skirt') return (<path d="M 72 195 Q 70 230 100 235 Q 130 230 128 195 Z" fill={b.color}/>);
    return null;
  };

  return (
    <svg width={width} height={height} viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="skinG" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor={skinColor} stopOpacity="1"/>
          <stop offset="100%" stopColor={skinColor} stopOpacity="0.85"/>
        </radialGradient>
      </defs>

      {/* Shoes */}
      <ellipse cx="82" cy="255" rx="18" ry="10" fill="#111"/>
      <ellipse cx="118" cy="255" rx="18" ry="10" fill="#111"/>

      {/* Bottom (pants/shorts/skirt) */}
      {renderBottom()}

      {/* Shirt */}
      <path d="M 68 168 L 50 200 L 75 205 L 78 185 L 122 185 L 125 205 L 150 200 L 132 168 L 115 158 L 100 163 L 85 158 Z" fill={shirtColor}/>
      <ellipse cx="52" cy="185" rx="12" ry="20" fill={shirtColor}/>
      <ellipse cx="148" cy="185" rx="12" ry="20" fill={shirtColor}/>
      <ellipse cx="52" cy="205" rx="10" ry="12" fill="url(#skinG)"/>
      <ellipse cx="148" cy="205" rx="10" ry="12" fill="url(#skinG)"/>

      {/* Neck */}
      <rect x="88" y="148" width="24" height="20" rx="8" fill="url(#skinG)"/>

      {/* Head */}
      <ellipse cx="100" cy="110" rx="52" ry="55" fill="url(#skinG)"/>
      <ellipse cx="48" cy="112" rx="10" ry="14" fill="url(#skinG)"/>
      <ellipse cx="152" cy="112" rx="10" ry="14" fill="url(#skinG)"/>

      {/* Face */}
      {face?.svg}

      {/* Cheeks */}
      <ellipse cx="72" cy="118" rx="10" ry="7" fill="#ffb3b3" opacity="0.3"/>
      <ellipse cx="128" cy="118" rx="10" ry="7" fill="#ffb3b3" opacity="0.3"/>

      {/* Hat */}
      <HatSVG hatId={hatId}/>
    </svg>
  );
}

function AICustomization({ onSave }) {
  const [skinColor, setSkinColor] = useState('#f5d0c5');
  const [faceId, setFaceId] = useState('cute');
  const [hatId, setHatId] = useState('none');
  const [shirtId, setShirtId] = useState('blue');
  const [bottomId, setBottomId] = useState('pants_black');
  const [name, setName] = useState('Luna');
  const [customName, setCustomName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('aiCustomization');
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.skinColor) setSkinColor(data.skinColor);
      if (data.faceId) setFaceId(data.faceId);
      if (data.hatId) setHatId(data.hatId);
      if (data.shirtId) setShirtId(data.shirtId);
      if (data.bottomId) setBottomId(data.bottomId);
      if (data.name) setName(data.name);
    }
  }, []);

  const handleSave = () => {
    const data = { name: customName || name, skinColor, faceId, hatId, shirtId, bottomId, color: '#B0D0A8', face: '🤖' };
    localStorage.setItem('aiCustomization', JSON.stringify(data));
    if (onSave) onSave(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page">
      <h1>Customize AI Assistant 🎨</h1>
      <p className="subtitle">Personalize your AI wellness companion</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left - Preview + Name */}
        <div>
          <div style={{ background: '#B0D0A8', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '16px' }}>
            <CharacterSVG skinColor={skinColor} faceId={faceId} hatId={hatId} shirtId={shirtId} bottomId={bottomId} />
            <div style={{ color: '#3A5C35', fontFamily: 'Times New Roman', fontSize: '20px', fontWeight: '800', marginTop: '8px' }}>{customName || name}</div>
            <div style={{ color: 'rgba(58,92,53,0.8)', fontSize: '13px', fontFamily: 'Times New Roman' }}>Your AI Assistant</div>
          </div>
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Times New Roman', color: '#3A5C35', marginBottom: '12px', fontSize: '15px' }}>🏷️ Name</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '10px' }}>
              {AI_NAMES.map(n => (
                <div key={n} onClick={() => { setName(n); setCustomName(''); }}
                  style={{ background: name === n && !customName ? '#e8f5e9' : '#f0f7f0', borderRadius: '8px', padding: '8px', textAlign: 'center', cursor: 'pointer', border: name === n && !customName ? '2px solid #3A5C35' : '2px solid transparent', fontFamily: 'Times New Roman', color: '#3A5C35', fontSize: '13px', fontWeight: name === n && !customName ? '700' : '400' }}>
                  {n}
                </div>
              ))}
            </div>
            <input placeholder="Custom name..." value={customName} onChange={e => setCustomName(e.target.value)}
              style={{ width: '100%', border: '1.5px solid #c8e6c9', borderRadius: '8px', padding: '8px 12px', fontFamily: 'Times New Roman', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>

          {/* Shirt */}
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Times New Roman', color: '#3A5C35', marginBottom: '12px', fontSize: '15px' }}>👕 Shirt</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {SHIRTS.map(shirt => (
                <div key={shirt.id} onClick={() => setShirtId(shirt.id)}
                  style={{ background: shirtId === shirt.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '8px', textAlign: 'center', cursor: 'pointer', border: shirtId === shirt.id ? '2px solid #3A5C35' : '2px solid transparent' }}>
                  <svg width="40" height="34" viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 8 8 L 2 20 L 10 22 L 12 14 L 38 14 L 40 22 L 48 20 L 42 8 L 32 4 L 25 7 L 18 4 Z" fill={shirt.color}/>
                  </svg>
                  <div style={{ fontSize: '9px', color: '#3A5C35', fontFamily: 'Times New Roman', fontWeight: shirtId === shirt.id ? '700' : '400' }}>{shirt.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
            <h3 style={{ fontFamily: 'Times New Roman', color: '#3A5C35', marginBottom: '12px', fontSize: '15px' }}>👖 Pants / Shorts / Skirt</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {BOTTOMS.map(b => (
                <div key={b.id} onClick={() => setBottomId(b.id)}
                  style={{ background: bottomId === b.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '8px', textAlign: 'center', cursor: 'pointer', border: bottomId === b.id ? '2px solid #3A5C35' : '2px solid transparent' }}>
                  <svg width="40" height="34" viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
                    {b.type === 'pants' && (<g><rect x="5" y="2" width="17" height="36" rx="6" fill={b.color}/><rect x="28" y="2" width="17" height="36" rx="6" fill={b.color}/></g>)}
                    {b.type === 'shorts' && (<g><path d="M 5 2 L 7 28 L 25 24 L 43 28 L 45 2 Z" fill={b.color}/>{b.id === 'shorts_star' && <text x="18" y="20" fontSize="14" fill="white">★</text>}</g>)}
                    {b.type === 'skirt' && (<path d="M 5 2 Q 4 35 25 38 Q 46 35 45 2 Z" fill={b.color}/>)}
                  </svg>
                  <div style={{ fontSize: '9px', color: '#3A5C35', fontFamily: 'Times New Roman', fontWeight: bottomId === b.id ? '700' : '400' }}>{b.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Hat, Face, Skin */}
        <div>
          {/* Hats */}
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Times New Roman', color: '#3A5C35', marginBottom: '12px', fontSize: '15px' }}>🎩 Hat</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {HATS.map(hat => (
                <div key={hat.id} onClick={() => setHatId(hat.id)}
                  style={{ background: hatId === hat.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '6px', textAlign: 'center', cursor: 'pointer', border: hatId === hat.id ? '2px solid #3A5C35' : '2px solid transparent' }}>
                  {hat.svg ? (
                    <svg width="50" height="40" viewBox="60 20 80 55" xmlns="http://www.w3.org/2000/svg">{hat.svg}</svg>
                  ) : (
                    <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>❌</div>
                  )}
                  <div style={{ fontSize: '10px', color: '#3A5C35', fontFamily: 'Times New Roman', fontWeight: hatId === hat.id ? '700' : '400' }}>{hat.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Faces */}
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9', marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Times New Roman', color: '#3A5C35', marginBottom: '12px', fontSize: '15px' }}>😊 Face</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
              {FACES.map(face => (
                <div key={face.id} onClick={() => setFaceId(face.id)}
                  style={{ background: faceId === face.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '6px', textAlign: 'center', cursor: 'pointer', border: faceId === face.id ? '2px solid #3A5C35' : '2px solid transparent' }}>
                  <svg width="50" height="40" viewBox="60 80 80 55" xmlns="http://www.w3.org/2000/svg">{face.svg}</svg>
                  <div style={{ fontSize: '9px', color: '#3A5C35', fontFamily: 'Times New Roman', fontWeight: faceId === face.id ? '700' : '400' }}>{face.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skin Colors */}
          <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
            <h3 style={{ fontFamily: 'Times New Roman', color: '#3A5C35', marginBottom: '12px', fontSize: '15px' }}>🎨 Skin Color</h3>
            {['Fair - Light', 'Medium - Tan', 'Dark - Deep'].map(group => (
              <div key={group} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#555', fontFamily: 'Times New Roman', marginBottom: '6px' }}>{group}</div>
                {SKIN_COLORS.filter(s => s.group === group).map(row => (
                  <div key={row.subgroup} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#aaa', width: '48px', fontFamily: 'Times New Roman', flexShrink: 0 }}>{row.subgroup}</span>
                    {row.colors.map(color => (
                      <div key={color} onClick={() => setSkinColor(color)}
                        style={{ width: '22px', height: '22px', background: color, borderRadius: '50%', cursor: 'pointer', border: skinColor === color ? '3px solid #3A5C35' : '2px solid #ddd', transform: skinColor === color ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s', flexShrink: 0 }} />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {saved && <div style={{ background: '#e8f5e9', border: '1px solid #3A5C35', borderRadius: '10px', padding: '12px', textAlign: 'center', color: '#3A5C35', fontFamily: 'Times New Roman', fontWeight: '700', marginTop: '16px' }}>✅ Saved!</div>}
      <button onClick={handleSave} style={{ width: '100%', background: '#B0D0A8', color: '#3A5C35', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', cursor: 'pointer', fontWeight: '700', fontFamily: 'Times New Roman', marginTop: '16px' }}>
        💾 Save AI Assistant
      </button>
    </div>
  );
}

export default AICustomization;