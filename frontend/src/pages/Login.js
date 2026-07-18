import React, { useState } from 'react';
import { login, signup, sendOTP, resetPassword } from '../api';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const data = isSignup
        ? await signup({ username, email, password })
        : await login({ email, password });
      onLogin(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const handleSendOTP = async () => {
    if (!email.trim()) { setError('Please enter your email'); return; }
    setLoading(true);
    setError('');
    try {
      await sendOTP({ email });
      setSuccess('OTP sent to your email! Check your inbox.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!otp.trim()) { setError('Please enter the OTP'); return; }
    if (!newPassword.trim()) { setError('Please enter new password'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setError('');
    try {
      await resetPassword({ email, otp, newPassword });
      setSuccess('Password reset successfully!');
      setTimeout(() => {
        setIsForgot(false);
        setStep(1);
        setSuccess('');
        setError('');
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const resetForgot = () => {
    setIsForgot(false);
    setStep(1);
    setError('');
    setSuccess('');
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // Forgot Password Screen
  if (isForgot) {
    return (
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <span className="login-brain">🧠</span>
            <h1>MindCare AI</h1>
          </div>
          <p className="login-tagline">Your personal mental wellness companion</p>
          <div className="login-features">
            <div className="login-feature-card">
              <span>📧</span>
              <div>
                <strong>Email Verification</strong>
                <p>We'll send a 6-digit OTP to your email</p>
              </div>
            </div>
            <div className="login-feature-card">
              <span>🔐</span>
              <div>
                <strong>Secure Reset</strong>
                <p>OTP expires in 10 minutes for your security</p>
              </div>
            </div>
            <div className="login-feature-card">
              <span>✅</span>
              <div>
                <strong>Quick Process</strong>
                <p>Reset your password in just 2 simple steps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-box-brain">{step === 1 ? '📧' : '🔐'}</div>
            <h2 className="login-box-title">Reset Password</h2>

            {/* Steps indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '6px', borderRadius: '3px', background: step >= 1 ? '#2e7d32' : '#ddd' }} />
              <div style={{ width: '32px', height: '6px', borderRadius: '3px', background: step >= 2 ? '#2e7d32' : '#ddd' }} />
            </div>

            <p className="login-box-sub">
              {step === 1 ? 'Step 1: Enter your email to receive OTP' : 'Step 2: Enter OTP and set new password'}
            </p>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg" style={{ marginBottom: '12px', fontSize: '14px', padding: '10px', borderRadius: '8px', background: '#e8f5e9' }}>{success}</div>}

            {step === 1 && (
              <>
                <input
                  className="login-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                />
                <button className="login-btn" onClick={handleSendOTP} disabled={loading}>
                  {loading ? '⏳ Sending OTP...' : '📧 Send OTP to Email'}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ background: '#e8f5e9', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#2e7d32', fontFamily: 'Times New Roman' }}>
                  📧 OTP sent to <strong>{email}</strong>
                </div>
                <input
                  className="login-input"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  maxLength={6}
                  style={{ textAlign: 'center', fontSize: '22px', letterSpacing: '8px', fontWeight: '700' }}
                />
                <input
                  className="login-input"
                  type="password"
                  placeholder="New Password (min 6 characters)"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <input
                  className="login-input"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button className="login-btn" onClick={handleResetPassword} disabled={loading}>
                  {loading ? '⏳ Resetting...' : '✅ Reset Password'}
                </button>
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  style={{ width: '100%', background: 'transparent', border: 'none', color: '#2e7d32', cursor: 'pointer', fontFamily: 'Times New Roman', fontSize: '13px', marginTop: '4px' }}
                >
                  🔄 Resend OTP
                </button>
              </>
            )}

            <p className="toggle-auth" style={{ marginTop: '16px' }}>
              Remember your password?
              <span onClick={resetForgot}> Sign in</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login / Signup Screen
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-brand">
          <span className="login-brain">🧠</span>
          <h1>MindCare AI</h1>
        </div>
        <p className="login-tagline">Your personal mental wellness companion</p>
        <div className="login-features">
          <div className="login-feature-card">
            <span>😊</span>
            <div>
              <strong>Mood Tracking</strong>
              <p>Log your daily emotions and discover patterns over time</p>
            </div>
          </div>
          <div className="login-feature-card">
            <span>🤖</span>
            <div>
              <strong>AI Support</strong>
              <p>Chat with an empathetic AI trained in CBT techniques</p>
            </div>
          </div>
          <div className="login-feature-card">
            <span>📓</span>
            <div>
              <strong>Private Journal</strong>
              <p>Reflect and express yourself in a safe, private space</p>
            </div>
          </div>
          <div className="login-feature-card">
            <span>📊</span>
            <div>
              <strong>Analytics</strong>
              <p>Visualize your emotional trends with insightful charts</p>
            </div>
          </div>
        </div>
        <div className="login-testimonial">
          <p>"MindCare AI helped me understand my emotional patterns and build healthier habits."</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <div className="login-box-brain">🧠</div>
          <h2 className="login-box-title">MindCare AI</h2>
          <p className="login-box-sub">Your mental wellness companion</p>
          <h3 className="login-welcome">{isSignup ? 'Create Account' : 'Welcome back'}</h3>
          <p className="login-welcome-sub">{isSignup ? 'Start your wellness journey' : 'Sign in to continue your journey'}</p>

          {error && <div className="error-msg">{error}</div>}

          {isSignup && (
            <input className="login-input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          )}
          <input className="login-input" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} type="email" />
          <input className="login-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

          {!isSignup && (
            <div style={{ textAlign: 'right', marginBottom: '12px', marginTop: '-4px' }}>
              <span
                onClick={() => { setIsForgot(true); setError(''); setEmail(''); }}
                style={{ fontSize: '13px', color: '#2e7d32', cursor: 'pointer', fontFamily: 'Times New Roman', fontWeight: '600' }}
              >
                Forgot Password?
              </span>
            </div>
          )}

          <button className="login-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? '🚀 Sign Up' : '🚀 Sign In'}
          </button>

          <p className="toggle-auth">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={() => { setIsSignup(!isSignup); setError(''); }}>
              {isSignup ? ' Sign in' : ' Sign up free'}
            </span>
          </p>

          <div className="login-trust">
            <p>TRUSTED WELLNESS PLATFORM</p>
            <div className="login-trust-stats">
              <div><strong>10k+</strong><span>Active Users</span></div>
              <div><strong>4.9★</strong><span>User Rating</span></div>
              <div><strong>100%</strong><span>Private & Secure</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
