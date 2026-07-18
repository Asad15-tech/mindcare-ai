import React, { useState } from 'react';

const COLORS = ['#2e7d32', '#4a7c59', '#81c784', '#c8e6c9', '#1565c0', '#42a5f5', '#e91e63', '#ff7043', '#ffd600', '#9c27b0', '#ffffff', '#000000'];
const GRID_SIZE = 16;

function PixelArt({ onBack }) {
  const [grid, setGrid] = useState(Array(GRID_SIZE * GRID_SIZE).fill('#ffffff'));
  const [selectedColor, setSelectedColor] = useState('#2e7d32');
  const [isDrawing, setIsDrawing] = useState(false);

  const colorCell = (index) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

  const clearGrid = () => setGrid(Array(GRID_SIZE * GRID_SIZE).fill('#ffffff'));

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>
      <h1>🎨 Pixel Art</h1>
      <p className="subtitle">Click or drag to color the grid and create pixel art!</p>

      <div className="card">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Times New Roman', fontWeight: '700', color: '#2e7d32' }}>Colors:</span>
          {COLORS.map(color => (
            <div
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: '32px',
                height: '32px',
                background: color,
                borderRadius: '6px',
                cursor: 'pointer',
                border: selectedColor === color ? '3px solid #333' : '2px solid #ccc',
                boxShadow: selectedColor === color ? '0 0 8px rgba(0,0,0,0.4)' : 'none'
              }}
            />
          ))}
          <button className="toggle-btn" onClick={clearGrid} style={{ marginLeft: 'auto' }}>🗑️ Clear</button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gap: '1px',
            background: '#ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            userSelect: 'none'
          }}
          onMouseLeave={() => setIsDrawing(false)}
        >
          {grid.map((color, index) => (
            <div
              key={index}
              style={{ background: color, aspectRatio: '1', cursor: 'crosshair' }}
              onMouseDown={() => { setIsDrawing(true); colorCell(index); }}
              onMouseUp={() => setIsDrawing(false)}
              onMouseEnter={() => { if (isDrawing) colorCell(index); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PixelArt;
