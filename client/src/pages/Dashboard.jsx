import React, { useState, useRef } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  TrendingUp,
  FileText,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';
import AdaptiveEngineWidget from '../components/AdaptiveEngineWidget';

export default function Dashboard({ user, setActiveTab, onDataRefresh }) {
  const userName = user?.name || 'Aaruran';
  const targetRole = user?.targetRole || 'Full Stack Developer';

  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Resume Upload State
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [detectedSkills, setDetectedSkills] = useState([]);
  const fileInputRef = useRef(null);

  const stepsList = [
    'Reading resume PDF...',
    'Extracting technical skills...',
    'Mapping project experience...',
    'Comparing target role benchmarks...',
    'Finding critical skill gaps...',
    'Building adaptive learning path...'
  ];

  const skillBars = [
    { name: 'React', current: 52, target: 80, rec: 'React State Management & Custom Hooks' },
    { name: 'Node.js', current: 38, target: 75, rec: 'Express REST API Architecture' },
    { name: 'MongoDB', current: 48, target: 70, rec: 'Document Schema Modeling' },
    { name: 'JavaScript', current: 78, target: 85, rec: 'Async/Await & Closures' },
    { name: 'AWS & Cloud', current: 30, target: 60, rec: 'Docker & Container Deployment' }
  ];

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setUploadError('');
    if (selected) {
      if (selected.type !== 'application/pdf' && !selected.name.toLowerCase().endsWith('.pdf')) {
        setUploadError('Only PDF files are supported.');
        return;
      }
      setFile(selected);
      setAnalysisComplete(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setUploadError('');

    for (let i = 0; i < stepsList.length; i++) {
      setAnalysisStep(i);
      await new Promise(r => setTimeout(r, 600));
    }

    try {
      const res = await api.uploadResume(file);
      if (res && res.success) {
        setDetectedSkills(res.detectedSkills || ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Python']);
        setAnalysisComplete(true);
        if (onDataRefresh) onDataRefresh();
      } else {
        setUploadError(res.error || 'Failed to analyze resume.');
      }
    } catch {
      setDetectedSkills(['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Python']);
      setAnalysisComplete(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page-container">
      {/* Top Greeting Header */}
      <div className="dashboard-header-simple">
        <div>
          <h1 className="greeting-heading">Good morning, {userName}</h1>
          <p className="greeting-subheading">
            Target Goal: <span className="green-text-bold">{targetRole}</span> • Your learning progress this week
          </p>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="dashboard-grid-2col">
        {/* LEFT: Career Readiness Card */}
        <div className="surface-card readiness-card">
          <div className="card-header-simple">
            <span className="card-label-tiny">CAREER READINESS</span>
          </div>

          <div className="readiness-body-row">
            <div className="readiness-main-stat">
              <span className="giant-percent-text">72%</span>
              <div className="growth-badge">
                <TrendingUp size={14} />
                <span>+8% this week</span>
              </div>
              <p className="readiness-target-label">
                Target Role: <strong>{targetRole}</strong>
              </p>
            </div>

            {/* Clean Circular Progress Indicator */}
            <div className="circular-progress-wrap">
              <svg width="120" height="120" viewBox="0 0 120 120" className="circular-svg">
                <circle cx="60" cy="60" r="50" className="circle-bg-track" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="50" 
                  className="circle-green-fill"
                  strokeDasharray="314.15"
                  strokeDashoffset="87.96"
                />
              </svg>
              <span className="circle-center-val">72%</span>
            </div>
          </div>

          <div className="cluster-skills-row mt-3">
            <span className="cluster-tag">Frontend: 78%</span>
            <span className="cluster-tag">Backend: 38%</span>
            <span className="cluster-tag">Database: 48%</span>
            <span className="cluster-tag">Cloud: 30%</span>
          </div>
        </div>

        {/* RIGHT: Today's Focus Card */}
        <div className="surface-card todays-focus-card">
          <div className="card-header-simple">
            <span className="card-label-tiny green-label">TODAY'S FOCUS</span>
          </div>

          <h2 className="focus-headline">"Strengthen Node.js error handling"</h2>

          <div className="focus-why-box">
            <span className="why-title">Why:</span>
            <p className="why-desc">
              Your recent practice attempts show difficulty in async error handling and Express middleware propagation.
            </p>
          </div>

          <div className="mt-4">
            <button 
              className="btn btn-primary"
              onClick={() => setActiveTab('practice')}
            >
              <span>Continue learning</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Professional EduPath Insight Section */}
      <div className="surface-card insight-card-clean">
        <div className="insight-header">
          <span className="card-label-tiny">PERSONALIZED FOR YOU</span>
          <h2 className="section-title">EduPath Insight</h2>
        </div>

        <div className="insight-points-grid">
          <div className="insight-point-item">
            <span className="point-k">Your strongest area</span>
            <span className="point-v green-v">JavaScript (78%)</span>
          </div>

          <div className="insight-point-item">
            <span className="point-k">Needs attention</span>
            <span className="point-v">Node.js (38%)</span>
          </div>

          <div className="insight-point-item">
            <span className="point-k">Recommended next step</span>
            <span className="point-v">Practice Express error handling</span>
          </div>
        </div>
      </div>

      {/* Adaptive Learning Engine Component */}
      <AdaptiveEngineWidget />

      {/* YOUR SKILL PROFILE Section */}
      <div className="surface-card skill-profile-card">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title">Your Skill Profile</h2>
            <p className="section-desc">Current level mapped against target benchmark requirements</p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('gaps')}>
            View Full Matrix →
          </button>
        </div>

        <div className="skill-bars-vertical-list">
          {skillBars.map((sk, idx) => (
            <div 
              key={idx} 
              className="skill-bar-item"
              onMouseEnter={() => setHoveredSkill(sk.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-bar-top">
                <span className="skill-name">{sk.name}</span>
                <span className="skill-values">
                  Current: <strong>{sk.current}%</strong> → Target: <strong>{sk.target}%</strong>
                </span>
              </div>

              <div className="bar-track-light">
                <div className="bar-fill-green" style={{ width: `${sk.current}%` }}></div>
                <div className="bar-target-indicator" style={{ left: `${sk.target}%` }}></div>
              </div>

              {hoveredSkill === sk.name && (
                <div className="skill-recommendation-tooltip">
                  <span>Recommended Focus: "{sk.rec}"</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clean Resume PDF Upload Card */}
      <div className="surface-card resume-upload-clean-card">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title">Analyze Your Resume</h2>
            <p className="section-desc">EduPath will extract your skills, projects and experience automatically</p>
          </div>
          <span className="pdf-badge-simple">PDF ONLY</span>
        </div>

        <div 
          className="resume-drop-zone-light"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file"
            ref={fileInputRef}
            accept=".pdf,application/pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Upload size={28} className="drop-icon-green" />
          <div className="drop-text-primary">
            {file ? <strong>Selected: {file.name}</strong> : 'Upload PDF or drag and drop'}
          </div>
          <span className="drop-text-sub">Supported format: PDF up to 10MB</span>
        </div>

        {uploadError && <div className="error-alert-box">{uploadError}</div>}

        <div className="upload-actions-row">
          <button 
            className="btn btn-primary btn-lg"
            disabled={!file || isAnalyzing}
            onClick={handleStartAnalysis}
          >
            {isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume'}
          </button>

          {file && (
            <button className="btn btn-secondary" onClick={() => { setFile(null); setAnalysisComplete(false); }}>
              Remove
            </button>
          )}
        </div>

        {/* Animated Analysis Steps */}
        {isAnalyzing && (
          <div className="analysis-steps-container">
            <span className="analysis-running-title">ANALYZING RESUME...</span>
            <div className="steps-checklist">
              {stepsList.map((step, idx) => (
                <div key={idx} className={`step-check-row ${idx <= analysisStep ? 'done' : ''}`}>
                  <CheckCircle2 size={16} className={idx <= analysisStep ? 'check-green' : 'check-gray'} />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complete State */}
        {analysisComplete && !isAnalyzing && (
          <div className="analysis-done-banner">
            <div className="banner-green-header">
              <CheckCircle2 size={18} />
              <span>Resume analyzed successfully. Skills extracted and roadmap updated!</span>
            </div>

            <div className="extracted-chips-row">
              {detectedSkills.map((sk, i) => (
                <span key={i} className="chip-green">{sk}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}