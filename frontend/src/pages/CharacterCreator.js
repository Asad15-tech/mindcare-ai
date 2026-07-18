import React, { useState, useEffect } from 'react';

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

const HATS = [
  { id: 'none', name: 'None' },
  { id: 'antennae', name: 'Antennae' },
  { id: 'crown', name: 'Crown' },
  { id: 'flower', name: 'Flower' },
  { id: 'bow', name: 'Bow' },
  { id: 'swirl', name: 'Swirl' },
  { id: 'sunhat', name: 'Sun Hat' },
  { id: 'tophat', name: 'Top Hat' },
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

function HatSVG({ hatId }) {
  if (hatId === 'antennae') return (<g><line x1="85" y1="55" x2="75" y2="25" stroke="#111" strokeWidth="3" strokeLinecap="round"/><circle cx="75" cy="22" r="6" fill="#e53935"/><line x1="115" y1="55" x2="125" y2="25" stroke="#111" strokeWidth="3" strokeLinecap="round"/><circle cx="125" cy="22" r="6" fill="#e53935"/><path d="M 70 58 Q 100 45 130 58" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round"/></g>);
  if (hatId === 'crown') return (<g><polygon points="65,65 75,40 100,58 125,40 135,65" fill="#FFA000" stroke="#FF6F00" strokeWidth="2"/><rect x="65" y="62" width="70" height="12" rx="4" fill="#FFA000"/><circle cx="75" cy="44" r="4" fill="white"/><circle cx="100" cy="56" r="4" fill="white"/><circle cx="125" cy="44" r="4" fill="white"/></g>);
  if (hatId === 'flower') return (<g><circle cx="100" cy="42" r="14" fill="#e91e8c"/><circle cx="86" cy="36" r="10" fill="#e91e8c"/><circle cx="114" cy="36" r="10" fill="#e91e8c"/><circle cx="100" cy="28" r="10" fill="#e91e8c"/><circle cx="100" cy="42" r="8" fill="#8B4513"/></g>);
  if (hatId === 'bow') return (<g><ellipse cx="82" cy="48" rx="18" ry="12" fill="#e53935"/><ellipse cx="118" cy="48" rx="18" ry="12" fill="#e53935"/><circle cx="100" cy="48" r="8" fill="#e53935"/></g>);
  if (hatId === 'swirl') return (<g><path d="M 100 55 Q 110 45 108 35 Q 106 25 98 28 Q 90 31 92 40 Q 94 48 102 46" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round"/></g>);
  if (hatId === 'sunhat') return (<g><ellipse cx="100" cy="68" rx="52" ry="10" fill="#c6cc00"/><ellipse cx="100" cy="55" rx="35" ry="22" fill="#c6cc00"/><rect x="65" y="58" width="70" height="8" rx="2" fill="#e53935"/></g>);
  if (hatId === 'tophat') return (<g><rect x="72" y="30" width="56" height="38" rx="6" fill="#111"/><rect x="60" y="64" width="80" height="10" rx="4" fill="#111"/><rect x="72" y="64" width="56" height="6" rx="2" fill="#e53935"/></g>);
  return null;
}

function CharacterSVG({ skinColor, faceId, hatId, shirtColor, bottom }) {
  const face = FACES.find(f => f.id === faceId);
  const b = BOTTOMS.find(b => b.id === bottom);

  const renderBottom = () => {
    if (!b) return null;
    if (b.type === 'pants') return (<g><rect x="78" y="195" width="20" height="45" rx="8" fill={b.color}/><rect x="102" y="195" width="20" height="45" rx="8" fill={b.color}/></g>);
    if (b.type === 'shorts') return (<g><path d="M 75 195 L 78 225 L 100 220 L 122 225 L 125 195 Z" fill={b.color}/>{b.id === 'shorts_star' && (<g><text x="88" y="215" fontSize="12" fill="white">★</text></g>)}</g>);
    if (b.type === 'skirt') return (<g><path d="M 72 195 Q 70 230 100 235 Q 130 230 128 195 Z" fill={b.color}/></g>);
  };

  return (
    <svg width="200" height="280" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sG" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor={skinColor}/>
          <stop offset="100%" stopColor={skinColor} stopOpacity="0.85"/>
        </radialGradient>
      </defs>

      {/* Shoes */}
      <ellipse cx="82" cy="255" rx="18" ry="10" fill="#111"/>
      <ellipse cx="118" cy="255" rx="18" ry="10" fill="#111"/>

      {/* Bottom */}
      {renderBottom()}

      {/* Shirt */}
      <path d="M 68 168 L 50 200 L 75 205 L 78 185 L 122 185 L 125 205 L 150 200 L 132 168 L 115 158 L 100 163 L 85 158 Z" fill={shirtColor || '#1565c0'}/>

      {/* Arms */}
      <ellipse cx="52" cy="185" rx="12" ry="20" fill={shirtColor || '#1565c0'}/>
      <ellipse cx="148" cy="185" rx="12" ry="20" fill={shirtColor || '#1565c0'}/>
      <ellipse cx="52" cy="205" rx="10" ry="12" fill="url(#sG)"/>
      <ellipse cx="148" cy="205" rx="10" ry="12" fill="url(#sG)"/>

      {/* Neck */}
      <rect x="88" y="148" width="24" height="20" rx="8" fill="url(#sG)"/>

      {/* Head */}
      <ellipse cx="100" cy="110" rx="52" ry="55" fill="url(#sG)"/>
      <ellipse cx="48" cy="112" rx="10" ry="14" fill="url(#sG)"/>
      <ellipse cx="152" cy="112" rx="10" ry="14" fill="url(#sG)"/>
      <ellipse cx="100" cy="110" rx="50" ry="53" fill="url(#sG)"/>

      {/* Face */}
      {face?.svg}

      {/* Cheeks */}
      <ellipse cx="72" cy="118" rx="10" ry="7" fill="#ffb3b3" opacity="0.35"/>
      <ellipse cx="128" cy="118" rx="10" ry="7" fill="#ffb3b3" opacity="0.35"/>

      {/* Hat */}
      <HatSVG hatId={hatId}/>
    </svg>
  );
}

function CharacterCreator({ onSave, onSkip }) {
  const [skinColor, setSkinColor] = useState('#f5d0c5');
  const [faceId, setFaceId] = useState('cute');
  const [hatId, setHatId] = useState('none');
  const [shirtId, setShirtId] = useState('blue');
  const [bottomId, setBottomId] = useState('pants_black');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('skin');

  useEffect(() => {
    const savedChar = localStorage.getItem('userCharacter');
    if (savedChar) {
      try {
        const data = JSON.parse(savedChar);
        if (data.skinColor) setSkinColor(data.skinColor);
        if (data.faceId) setFaceId(data.faceId);
        if (data.hatId) setHatId(data.hatId);
        if (data.shirtId) setShirtId(data.shirtId);
        if (data.bottomId) setBottomId(data.bottomId);
      } catch(e) {}
    }
  }, []);

  const handleSave = () => {
    const character = { skinColor, faceId, hatId, shirtId, bottomId };
    localStorage.setItem('userCharacter', JSON.stringify(character));
    setSaved(true);
    if (onSave) onSave(character);
    setTimeout(() => setSaved(false), 3000);
  };

  const shirtColor = SHIRTS.find(s => s.id === shirtId)?.color;

  const tabs = [
    { id: 'skin', label: '🎨 Skin' },
    { id: 'face', label: '😊 Face' },
    { id: 'hat', label: '🎩 Hat' },
    { id: 'shirt', label: '👕 Shirt' },
    { id: 'bottom', label: '👖 Bottom' },
  ];

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', textAlign: 'center', fontSize: '24px', marginBottom: '4px' }}>Create Your Character 🎨</h2>
      <p style={{ textAlign: 'center', color: '#888', fontFamily: 'Times New Roman', marginBottom: '20px' }}>Personalize your wellness journey!</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left - Preview */}
        <div>
          <div style={{ background: 'linear-gradient(135deg, #2e7d32, #4a7c59)', borderRadius: '20px', padding: '20px', textAlign: 'center', marginBottom: '16px', position: 'sticky', top: '10px' }}>
            <CharacterSVG skinColor={skinColor} faceId={faceId} hatId={hatId} shirtColor={shirtColor} bottom={bottomId}/>
            <div style={{ color: 'white', fontFamily: 'Times New Roman', fontSize: '16px', fontWeight: '700', marginTop: '8px' }}>Your Character</div>
          </div>
          {saved && <div style={{ background: '#e8f5e9', border: '1px solid #2e7d32', borderRadius: '10px', padding: '12px', textAlign: 'center', color: '#2e7d32', fontFamily: 'Times New Roman', fontWeight: '700', marginBottom: '12px' }}>✅ Character saved!</div>}
          <button onClick={handleSave} style={{ width: '100%', background: 'linear-gradient(135deg, #2e7d32, #4a7c59)', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', cursor: 'pointer', fontWeight: '700', fontFamily: 'Times New Roman' }}>
            💾 Save My Character
          </button>
          {onSkip && (
            <button onClick={onSkip} style={{ width: '100%', background: 'transparent', color: '#aaa', border: '1px solid #ddd', borderRadius: '12px', padding: '10px', fontSize: '14px', cursor: 'pointer', fontFamily: 'Times New Roman', marginTop: '8px' }}>
              Skip for now →
            </button>
          )}
        </div>

        {/* Right - Options */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <div key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ background: activeTab === tab.id ? '#2e7d32' : '#f0f7f0', color: activeTab === tab.id ? 'white' : '#2e7d32', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', fontFamily: 'Times New Roman', fontSize: '12px', fontWeight: '600', border: activeTab === tab.id ? 'none' : '1px solid #c8e6c9' }}>
                {tab.label}
              </div>
            ))}
          </div>

          {/* Skin Colors */}
          {activeTab === 'skin' && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
              <h3 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', marginBottom: '12px', fontSize: '14px' }}>🎨 Skin Color</h3>
              {['Fair - Light', 'Medium - Tan', 'Dark - Deep'].map(group => (
                <div key={group} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#555', fontFamily: 'Times New Roman', marginBottom: '6px' }}>{group}</div>
                  {SKIN_COLORS.filter(s => s.group === group).map(row => (
                    <div key={row.subgroup} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', color: '#aaa', width: '46px', fontFamily: 'Times New Roman', flexShrink: 0 }}>{row.subgroup}</span>
                      {row.colors.map(color => (
                        <div key={color} onClick={() => setSkinColor(color)}
                          style={{ width: '22px', height: '22px', background: color, borderRadius: '50%', cursor: 'pointer', border: skinColor === color ? '3px solid #2e7d32' : '2px solid #ddd', transform: skinColor === color ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s', flexShrink: 0 }} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Faces */}
          {activeTab === 'face' && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
              <h3 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', marginBottom: '12px', fontSize: '14px' }}>😊 Face</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {FACES.map(face => (
                  <div key={face.id} onClick={() => setFaceId(face.id)}
                    style={{ background: faceId === face.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '8px', textAlign: 'center', cursor: 'pointer', border: faceId === face.id ? '2px solid #2e7d32' : '2px solid transparent' }}>
                    <svg width="60" height="45" viewBox="55 78 90 58" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="100" cy="105" rx="40" ry="42" fill="#f5d0c5"/>
                      {face.svg}
                    </svg>
                    <div style={{ fontSize: '10px', color: '#2e7d32', fontFamily: 'Times New Roman', fontWeight: faceId === face.id ? '700' : '400' }}>{face.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hats */}
          {activeTab === 'hat' && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
              <h3 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', marginBottom: '12px', fontSize: '14px' }}>🎩 Hat</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {HATS.map(hat => (
                  <div key={hat.id} onClick={() => setHatId(hat.id)}
                    style={{ background: hatId === hat.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '8px', textAlign: 'center', cursor: 'pointer', border: hatId === hat.id ? '2px solid #2e7d32' : '2px solid transparent' }}>
                    {hat.id !== 'none' ? (
                      <svg width="50" height="38" viewBox="60 18 80 58" xmlns="http://www.w3.org/2000/svg"><HatSVG hatId={hat.id}/></svg>
                    ) : (
                      <div style={{ height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>❌</div>
                    )}
                    <div style={{ fontSize: '10px', color: '#2e7d32', fontFamily: 'Times New Roman', fontWeight: hatId === hat.id ? '700' : '400' }}>{hat.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shirts */}
          {activeTab === 'shirt' && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
              <h3 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', marginBottom: '12px', fontSize: '14px' }}>👕 Shirt</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {SHIRTS.map(shirt => (
                  <div key={shirt.id} onClick={() => setShirtId(shirt.id)}
                    style={{ background: shirtId === shirt.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '10px', textAlign: 'center', cursor: 'pointer', border: shirtId === shirt.id ? '2px solid #2e7d32' : '2px solid transparent' }}>
                    <svg width="50" height="40" viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 8 8 L 2 20 L 10 22 L 12 14 L 38 14 L 40 22 L 48 20 L 42 8 L 32 4 L 25 7 L 18 4 Z" fill={shirt.color}/>
                    </svg>
                    <div style={{ fontSize: '10px', color: '#2e7d32', fontFamily: 'Times New Roman', fontWeight: shirtId === shirt.id ? '700' : '400' }}>{shirt.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottoms */}
          {activeTab === 'bottom' && (
            <div style={{ background: 'white', borderRadius: '14px', padding: '16px', border: '1px solid #c8e6c9' }}>
              <h3 style={{ fontFamily: 'Times New Roman', color: '#2e7d32', marginBottom: '12px', fontSize: '14px' }}>👖 Pants / Shorts / Skirts</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {BOTTOMS.map(b => (
                  <div key={b.id} onClick={() => setBottomId(b.id)}
                    style={{ background: bottomId === b.id ? '#e8f5e9' : '#f0f7f0', borderRadius: '10px', padding: '8px', textAlign: 'center', cursor: 'pointer', border: bottomId === b.id ? '2px solid #2e7d32' : '2px solid transparent' }}>
                    <svg width="50" height="40" viewBox="0 0 50 40" xmlns="http://www.w3.org/2000/svg">
                      {b.type === 'pants' && (<g><rect x="5" y="2" width="17" height="36" rx="6" fill={b.color}/><rect x="28" y="2" width="17" height="36" rx="6" fill={b.color}/></g>)}
                      {b.type === 'shorts' && (<g><path d="M 5 2 L 7 28 L 25 24 L 43 28 L 45 2 Z" fill={b.color}/>{b.id === 'shorts_star' && <text x="18" y="20" fontSize="14" fill="white">★</text>}</g>)}
                      {b.type === 'skirt' && (<path d="M 5 2 Q 4 35 25 38 Q 46 35 45 2 Z" fill={b.color}/>)}
                    </svg>
                    <div style={{ fontSize: '10px', color: '#2e7d32', fontFamily: 'Times New Roman', fontWeight: bottomId === b.id ? '700' : '400' }}>{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCreator;
