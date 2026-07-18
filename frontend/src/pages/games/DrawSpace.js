import React, { useRef, useState, useEffect } from 'react';

const COLORS = ['#2e7d32', '#4a7c59', '#1565c0', '#e91e63', '#ff7043', '#ffd600', '#9c27b0', '#000000', '#ffffff'];
const SIZES = [2, 5, 10, 20];

function DrawSpace({ onBack }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#2e7d32');
  const [size, setSize] = useState(5);
  const [tool, setTool] = useState('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e) => {
    setDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPos(e);
    ctx.lineWidth = tool === 'eraser' ? size * 3 : size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => setDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'mindcare-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Back to Games</button>
      <h1>✏️ Draw Space</h1>
      <p className="subtitle">Express yourself freely through drawing!</p>

      <div className="card">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Times New Roman', fontWeight: '700', color: '#2e7d32' }}>Color:</span>
          {COLORS.map(c => (
            <div key={c} onClick={() => { setColor(c); setTool('pen'); }}
              style={{ width: '28px', height: '28px', background: c, borderRadius: '50%', cursor: 'pointer', border: color === c && tool === 'pen' ? '3px solid #333' : '2px solid #ccc' }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Times New Roman', fontWeight: '700', color: '#2e7d32' }}>Size:</span>
          {SIZES.map(s => (
            <div key={s} onClick={() => setSize(s)}
              style={{ width: `${s * 3}px`, height: `${s * 3}px`, background: '#2e7d32', borderRadius: '50%', cursor: 'pointer', border: size === s ? '2px solid #333' : 'none', minWidth: '8px', minHeight: '8px' }}
            />
          ))}
          <button className="toggle-btn" onClick={() => setTool(tool === 'eraser' ? 'pen' : 'eraser')}>
            {tool === 'eraser' ? '✏️ Pen' : '⬜ Eraser'}
          </button>
          <button className="toggle-btn" onClick={clearCanvas}>🗑️ Clear</button>
          <button className="toggle-btn" onClick={downloadCanvas}>💾 Save</button>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          style={{ width: '100%', border: '2px solid #c8e6c9', borderRadius: '12px', cursor: tool === 'eraser' ? 'cell' : 'crosshair', touchAction: 'none' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
        />
      </div>
    </div>
  );
}

export default DrawSpace;
