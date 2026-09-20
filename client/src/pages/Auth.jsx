import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState('login');

  const [loginEmail, setLoginEmail] = useState('aaruran@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!loginEmail || !loginPassword) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    const sessionUser = {
      name: loginEmail.split('@')[0] || 'Aaruran',
      email: loginEmail.trim(),
      targetRole: 'Full Stack Developer',
      provider: 'email'
    };
    localStorage.setItem('edupath_user', JSON.stringify(sessionUser));
    onLoginSuccess(sessionUser);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    if (regPassword !== regConfirm) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const sessionUser = {
      name: regName.trim(),
      email: regEmail.trim(),
      targetRole: 'Full Stack Developer',
      provider: 'email'
    };
    localStorage.setItem('edupath_user', JSON.stringify(sessionUser));
    onLoginSuccess(sessionUser);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://edupath-ubou.onrender.com/auth/google';
  };

  return (
    <div className="auth-light-layout">
      {/* Left side: Editorial Brand Introduction */}
      <div className="auth-left-brand-panel">
        <div className="brand-header-auth">
          <div className="logo-box-auth">
            <Compass size={22} className="logo-icon-green" />
          </div>
          <span className="brand-title-auth">EDUPATH</span>
        </div>

        <div className="auth-hero-copy">
          <h1 className="hero-headline-light">
            Your career path,<br />
            <span className="headline-green">guided by intelligence.</span>
          </h1>
          <p className="hero-subtext-light">
            EduPath continuously analyzes your skills, identifies gaps, and adapts your learning journey to reach your target career goal.
          </p>
        </div>

        <div className="auth-process-summary-box">
          <div className="step-summary-item">
            <span className="step-dot-green"></span>
            <span>Skill Analysis & Gap Detection</span>
          </div>
          <div className="step-summary-item">
            <span className="step-dot-green"></span>
            <span>Personalized Adaptive Learning Path</span>
          </div>
          <div className="step-summary-item">
            <span className="step-dot-green"></span>
            <span>Real-time Practice Evaluation</span>
          </div>
        </div>

        <div className="auth-footer-tagline">
          <span>EduPath Career Learning Platform</span>
        </div>
      </div>

      {/* Right side: Login & Register Form Container */}
      <div className="auth-right-form-panel">
        <div className="auth-form-card">
          <div className="auth-tabs-header">
            <button
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setErrorMsg(''); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => { setMode('register'); setErrorMsg(''); }}
            >
              Create Account
            </button>
          </div>

          <h2 className="auth-heading-text">
            {mode === 'login' ? 'Welcome back to EduPath' : 'Create your EduPath account'}
          </h2>

          {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form-fields">
              <div className="form-group-clean">
                <label className="form-label-clean">Email Address</label>
                <input
                  type="email"
                  className="input-field-light"
                  placeholder="aaruran@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Password</label>
                <input
                  type="password"
                  className="input-field-light"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <span>Sign in to EduPath</span>
                <ArrowRight size={16} />
              </button>

              <div className="divider-or-row">
                <span>OR</span>
              </div>

              {/* Real Google OAuth Button */}
              <div className="social-auth-column">
                <button
                  type="button"
                  className="btn social-btn-light"
                  onClick={handleGoogleLogin}
                >
                  <svg className="social-svg-icon" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              <div className="auth-switch-text mt-3">
                <span>Don't have an account? </span>
                <button type="button" className="link-button-clean" onClick={() => setMode('register')}>
                  Create account
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form-fields">
              <div className="form-group-clean">
                <label className="form-label-clean">Full Name</label>
                <input
                  type="text"
                  className="input-field-light"
                  placeholder="Aaruran"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Email Address</label>
                <input
                  type="email"
                  className="input-field-light"
                  placeholder="user@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Password</label>
                <input
                  type="password"
                  className="input-field-light"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-clean">
                <label className="form-label-clean">Confirm Password</label>
                <input
                  type="password"
                  className="input-field-light"
                  placeholder="••••••••"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <span>Create Account</span>
                <ArrowRight size={16} />
              </button>

              <div className="auth-switch-text mt-3">
                <span>Already have an account? </span>
                <button type="button" className="link-button-clean" onClick={() => setMode('login')}>
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}