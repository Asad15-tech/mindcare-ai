import React, { useState, useEffect, useRef } from 'react';

const sounds = [
  {
    id: 1,
    name: 'Rain',
    emoji: '🌧️',
    description: 'Gentle rainfall to calm your mind',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-2393.mp3'
  },
  {
    id: 2,
    name: 'Ocean Waves',
    emoji: '🌊',
    description: 'Peaceful ocean waves for relaxation',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-ocean-waves-loop-1196.mp3'
  },
  {
    id: 3,
    name: 'Fireplace',
    emoji: '🔥',
    description: 'Cozy fireplace crackling sounds',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-campfire-crackles-1330.mp3'
  },
  {
    id: 4,
    name: 'White Noise',
    emoji: '🌬️',
    description: 'Soothing white noise to help you focus',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-wind-in-the-trees-loop-1202.mp3'
  },
  {
    id: 5,
    name: 'Forest',
    emoji: '🌲',
    description: 'Peaceful forest ambiance with birds',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-1210.mp3'
  },
  {
    id: 6,
    name: 'Thunder',
    emoji: '⛈️',
    description: 'Distant thunder for deep relaxation',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-thunder-and-rain-2246.mp3'
  }
];

function CalmingSounds() {
  const [playing, setPlaying] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  const playSound = (sound) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (playing === sound.id) {
      setPlaying(null);
      return;
    }
    const audio = new Audio(sound.url);
    audio.volume = volume;
    audio.loop = true;
    audio.play().catch((e) => console.log('Audio error:', e));
    audioRef.current = audio;
    setPlaying(sound.id);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="page">
      <h1>Calming Sounds 🎵</h1>
      <p className="subtitle">Choose a sound to help you relax and focus</p>

      <div className="card">
        <div className="volume-control">
          <span>🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
          <span>🔊</span>
          <span className="volume-label">{Math.round(volume * 100)}%</span>
        </div>
      </div>

      <div className="sounds-grid">
        {sounds.map(sound => (
          <div
            key={sound.id}
            className={`sound-card ${playing === sound.id ? 'playing' : ''}`}
            onClick={() => playSound(sound)}
          >
            <div className="sound-emoji">{sound.emoji}</div>
            <div className="sound-name">{sound.name}</div>
            <div className="sound-desc">{sound.description}</div>
            <div className="sound-btn">
              {playing === sound.id ? '⏸ Pause' : '▶ Play'}
            </div>
          </div>
        ))}
      </div>

      {playing && (
        <div className="now-playing">
          🎵 Now Playing: {sounds.find(s => s.id === playing)?.name}
          <button onClick={() => {
            if (audioRef.current) audioRef.current.pause();
            setPlaying(null);
          }}>Stop ⏹</button>
        </div>
      )}
    </div>
  );
}

export default CalmingSounds;
