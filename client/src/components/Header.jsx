import React from 'react';
import { UploadCloud, Bot, Bell, ShieldCheck, Sparkles } from 'lucide-react';

export default function Header({ user, onOpenUpload, onAskAI, readinessScore }) {
  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="header-greeting">
          Welcome, <span className="highlight-text">{user?.name || 'Aaruran'}</span> 👋
        </h1>
        <div className="career-trajectory">
          <span className="badge-role current">{user?.currentRole || 'IT Student'}</span>
          <span className="trajectory-arrow">➜</span>
          <span className="badge-role target">{user?.targetRole || 'Full Stack Developer'}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="agent-loop-ticker">
          <Sparkles size={16} className="text-cyan animate-pulse" />
          <span className="ticker-text">
            <strong>Agent Loop:</strong> ANALYZE → GAP → PLAN → TASK → ADAPT
          </span>
        </div>

        <button className="header-action-btn primary" onClick={onOpenUpload}>
          <UploadCloud size={16} />
          <span>Analyze Resume</span>
        </button>

        <button className="header-action-btn secondary" onClick={onAskAI}>
          <Bot size={16} />
          <span>Ask Mentor</span>
        </button>
      </div>
    </header>
  );
}
