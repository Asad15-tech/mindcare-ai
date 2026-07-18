import React, { useState, useEffect } from 'react';

function Puzzle({ onBack }) {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  const initPuzzle = () => {
    const arr = [1,2,3,4,5,6,7,8,null];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setTiles(arr);
    setMoves(0);
    setSolved(false);
  };

  useEffect(() => { initPuzzle(); }, []);

  useEffect(() => {
    const goal = [1,2,3,4,5,6,7,8,null];
    if (JSON.stringify(tiles) === JSON.stringify(goal)) setSolved(true);
  }, [tiles]);

  const moveTile = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
    if (!validMoves.includes(index)) return;
    if ((index === emptyIndex - 1 || index === emptyIndex + 1) && Math.floor(index / 3) !== Math.floor(emptyIndex / 3)) return;
    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    setTiles(newTiles);
    setMoves(m => m + 1);
  };

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>
      <h1>🧩 Sliding Puzzle</h1>
      <p className="subtitle">Arrange tiles 1-8 in order — empty space is bottom right</p>
      <div className="card" style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <span style={{ fontFamily: 'Times New Roman', color: '#2e7d32', fontWeight: '700' }}>Moves: {moves}</span>
          <button className="toggle-btn" onClick={initPuzzle}>🔀 Shuffle</button>
        </div>
        {solved && (
          <div style={{ background: '#e8f5e9', borderRadius: '12px', padding: '16px', marginBottom: '16px', color: '#2e7d32', fontWeight: '700', fontFamily: 'Times New Roman', fontSize: '18px' }}>
            🎉 Solved in {moves} moves!
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '300px', margin: '0 auto' }}>
          {tiles.map((tile, index) => (
            <div
              key={index}
              onClick={() => moveTile(index)}
              style={{
                width: '90px',
                height: '90px',
                background: tile ? 'linear-gradient(135deg, #2e7d32, #4a7c59)' : '#f0f7f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: '800',
                color: 'white',
                cursor: tile ? 'pointer' : 'default',
                fontFamily: 'Times New Roman',
                boxShadow: tile ? '0 4px 12px rgba(46,125,50,0.3)' : 'none',
                border: tile ? 'none' : '2px dashed #c8e6c9'
              }}
            >
              {tile}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Puzzle;
