import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Key, Shield, Bell, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [autoAdapt, setAutoAdapt] = useState(true);
  const [difficultyMode, setDifficultyMode] = useState('adaptive');

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Settings</h1>
          <p className="page-subtitle">Configure AI engine parameters, OAuth keys, and application preferences</p>
        </div>
      </div>

      <div className="dark-card max-w-2xl">
        <form onSubmit={handleSave} className="settings-form">
          {saved && (
            <div className="mint-banner mb-4">
              <CheckCircle2 size={16} />
              <span>Settings updated successfully!</span>
            </div>
          )}

          <div className="section-title-row mb-3">
            <h2 className="section-title">AI Engine Preferences</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Adaptive Mode</label>
            <div className="flex-row-gap">
              <button 
                type="button" 
                className={`btn ${autoAdapt ? 'btn-mint' : 'btn-outline'} btn-sm`}
                onClick={() => setAutoAdapt(true)}
              >
                Auto-Adapt Roadmap (Recommended)
              </button>
              <button 
                type="button" 
                className={`btn ${!autoAdapt ? 'btn-mint' : 'btn-outline'} btn-sm`}
                onClick={() => setAutoAdapt(false)}
              >
                Manual Approval
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Practice Challenge Scaling</label>
            <select 
              className="form-input"
              value={difficultyMode}
              onChange={(e) => setDifficultyMode(e.target.value)}
            >
              <option value="adaptive">Dynamic AI Scaling (Based on score)</option>
              <option value="step">Linear Sequential</option>
              <option value="hard">Hardcore Benchmark Drills</option>
            </select>
          </div>

          <hr className="divider-dark my-4" />

          <div className="section-title-row mb-3">
            <h2 className="section-title">API & Authentication Keys</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Custom OpenAI / Gemini API Key (Optional)</label>
            <input
              type="password"
              className="form-input"
              placeholder="sk-proj-••••••••••••••••"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <span className="file-hint mt-1">If unconfigured, EduPath uses its built-in intelligent query engine.</span>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-mint btn-lg">
              <Save size={16} />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}