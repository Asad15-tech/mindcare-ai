import React, { useState } from 'react';
import Puzzle from './games/Puzzle';
import PixelArt from './games/PixelArt';
import DrawSpace from './games/DrawSpace';

function Games() {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'puzzle',
      name: 'Sliding Puzzle',
      emoji: '🧩',
      description: 'Arrange the tiles in the correct order — great for focus and mindfulness',
      color: '#2e7d32'
    },
    {
      id: 'pixelart',
      name: 'Pixel Art',
      emoji: '🎨',
      description: 'Color the pixel grid to create beautiful art — relaxing and creative',
      color: '#1565c0'
    },
    {
      id: 'draw',
      name: 'Draw Space',
      emoji: '✏️',
      description: 'Free drawing space — express yourself through art',
      color: '#6a1b9a'
    }
  ];

  if (selectedGame === 'puzzle') return <Puzzle onBack={() => setSelectedGame(null)} />;
  if (selectedGame === 'pixelart') return <PixelArt onBack={() => setSelectedGame(null)} />;
  if (selectedGame === 'draw') return <DrawSpace onBack={() => setSelectedGame(null)} />;

  return (
    <div className="page">
      <h1>Games 🎮</h1>
      <p className="subtitle">Relax and have fun with mindful games</p>
      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className="game-card" onClick={() => setSelectedGame(game.id)}>
            <div className="game-emoji">{game.emoji}</div>
            <div className="game-name">{game.name}</div>
            <div className="game-desc">{game.description}</div>
            <div className="game-btn" style={{ background: game.color }}>Play Now →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
