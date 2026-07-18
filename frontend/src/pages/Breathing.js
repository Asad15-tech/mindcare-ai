import React, { useState, useEffect } from 'react';

const exercises = [
  {
    id: 1,
    name: '4-7-8 Breathing',
    emoji: '😮‍💨',
    description: 'Inhale 4s, Hold 7s, Exhale 8s — great for anxiety relief',
    steps: [
      { label: 'Inhale', duration: 4, color: '#2e7d32' },
      { label: 'Hold', duration: 7, color: '#f59e0b' },
      { label: 'Exhale', duration: 8, color: '#3b82f6' }
    ]
  },
  {
    id: 2,
    name: 'Box Breathing',
    emoji: '📦',
    description: 'Inhale 4s, Hold 4s, Exhale 4s, Hold 4s — used by Navy SEALs',
    steps: [
      { label: 'Inhale', duration: 4, color: '#2e7d32' },
      { label: 'Hold', duration: 4, color: '#f59e0b' },
      { label: 'Exhale', duration: 4, color: '#3b82f6' },
      { label: 'Hold', duration: 4, color: '#f59e0b' }
    ]
  },
  {
    id: 3,
    name: 'Deep Breathing',
    emoji: '🌬️',
    description: 'Inhale 5s, Exhale 5s — simple and effective',
    steps: [
      { label: 'Inhale', duration: 5, color: '#2e7d32' },
      { label: 'Exhale', duration: 5, color: '#3b82f6' }
    ]
  }
];

function Breathing() {
  const [selected, setSelected] = useState(null);
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!running || !selected) return;
    const steps = selected.steps;
    const currentStep = steps[stepIndex];
    setCountdown(currentStep.duration);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          const nextIndex = (stepIndex + 1) % steps.length;
          if (nextIndex === 0) setCycles(c => c + 1);
          setStepIndex(nextIndex);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, stepIndex, selected]);

  const startExercise = (exercise) => {
    setSelected(exercise);
    setRunning(false);
    setStepIndex(0);
    setCycles(0);
    setCountdown(exercise.steps[0].duration);
  };

  const toggleRunning = () => {
    if (!running) {
      setStepIndex(0);
      setCycles(0);
    }
    setRunning(!running);
  };

  const currentStep = selected ? selected.steps[stepIndex] : null;
  const progress = currentStep ? ((currentStep.duration - countdown) / currentStep.duration) * 100 : 0;

  return (
    <div className="page">
      <h1>Breathing Exercises 🫁</h1>
      <p className="subtitle">Practice mindful breathing to reduce stress and anxiety</p>

      {!selected ? (
        <div className="breathing-grid">
          {exercises.map(ex => (
            <div key={ex.id} className="breathing-card" onClick={() => startExercise(ex)}>
              <div className="breathing-emoji">{ex.emoji}</div>
              <div className="breathing-name">{ex.name}</div>
              <div className="breathing-desc">{ex.description}</div>
              <div className="breathing-start-btn">Start Exercise →</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="breathing-active">
          <button className="back-btn" onClick={() => { setSelected(null); setRunning(false); }}>← Back</button>
          <div className="card" style={{ textAlign: 'center' }}>
            <h2>{selected.emoji} {selected.name}</h2>
            <p style={{ color: '#888', marginBottom: '30px', fontFamily: 'Times New Roman' }}>{selected.description}</p>

            <div className="breathing-circle-wrap">
              <div
                className="breathing-circle"
                style={{
                  background: currentStep ? currentStep.color : '#2e7d32',
                  transform: currentStep?.label === 'Inhale' ? 'scale(1.2)' : currentStep?.label === 'Exhale' ? 'scale(0.8)' : 'scale(1)',
                  transition: `transform ${currentStep?.duration}s ease`
                }}
              >
                <div className="breathing-step-label">{running ? currentStep?.label : 'Ready'}</div>
                <div className="breathing-countdown">{running ? countdown : '?'}</div>
              </div>
            </div>

            <div className="breathing-progress">
              <div className="breathing-progress-bar" style={{ width: `${progress}%`, background: currentStep?.color }} />
            </div>

            <div className="breathing-cycles">Cycles completed: {cycles}</div>

            <div className="breathing-steps">
              {selected.steps.map((step, i) => (
                <div key={i} className={`breathing-step ${running && i === stepIndex ? 'active-step' : ''}`} style={{ borderColor: step.color }}>
                  <span style={{ color: step.color }}>{step.label}</span>
                  <span>{step.duration}s</span>
                </div>
              ))}
            </div>

            <button className="breathing-btn" onClick={toggleRunning}>
              {running ? '⏸ Pause' : '▶ Start'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Breathing;
