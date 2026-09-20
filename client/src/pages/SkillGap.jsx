import React, { useState } from 'react';
import { Target, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export default function SkillGap({ setActiveTab }) {
  const gapsData = [
    {
      skill: 'React',
      currentLevel: 52,
      targetLevel: 80,
      gap: 28,
      priority: 'High',
      recommendation: 'React State Management & Custom Hooks',
      whyItMatters: 'React is essential for your selected Full Stack Developer role.'
    },
    {
      skill: 'Node.js',
      currentLevel: 38,
      targetLevel: 75,
      gap: 37,
      priority: 'High',
      recommendation: 'Express REST API Architecture & Middleware',
      whyItMatters: 'Server-side API architecture is required for backend services.'
    },
    {
      skill: 'MongoDB',
      currentLevel: 48,
      targetLevel: 70,
      gap: 22,
      priority: 'Medium',
      recommendation: 'Document Schema Modeling & Aggregations',
      whyItMatters: 'Database document modeling is critical for full stack persistence.'
    },
    {
      skill: 'JavaScript',
      currentLevel: 78,
      targetLevel: 85,
      gap: 7,
      priority: 'Low',
      recommendation: 'Async/Await & Closures',
      whyItMatters: 'Core JavaScript language concepts are well established.'
    },
    {
      skill: 'AWS & Cloud',
      currentLevel: 30,
      targetLevel: 60,
      gap: 30,
      priority: 'Medium',
      recommendation: 'Docker Containerization & EC2 Deployment',
      whyItMatters: 'Cloud containerization is necessary for production deployment.'
    }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Where You Stand vs Where You Need To Be</h1>
          <p className="page-subtitle">Detailed skill gap calculations against Full Stack Developer benchmarks</p>
        </div>
      </div>

      {/* Skill Gap Cards List */}
      <div className="gap-cards-list">
        {gapsData.map((item, idx) => (
          <div key={idx} className="dark-card gap-item-card">
            <div className="gap-card-header">
              <div className="gap-skill-title-group">
                <h3 className="gap-skill-name">{item.skill}</h3>
                <span className={`priority-badge-dark priority-${item.priority.toLowerCase()}`}>
                  Priority: {item.priority}
                </span>
              </div>

              <div className="gap-nums-summary">
                <span className="gap-pct-delta">Gap: -{item.gap}%</span>
              </div>
            </div>

            {/* Interactive Level Comparison Bar */}
            <div className="gap-bar-block">
              <div className="gap-bar-label-row">
                <span>Current: <strong>{item.currentLevel}%</strong></span>
                <span>Required: <strong>{item.targetLevel}%</strong></span>
              </div>
              <div className="gap-bar-track">
                <div className="gap-bar-fill" style={{ width: `${item.currentLevel}%` }}></div>
                <div className="gap-bar-target-line" style={{ left: `${item.targetLevel}%` }}></div>
              </div>
            </div>

            {/* Why This Matters & Recommended Action */}
            <div className="why-matters-container">
              <div className="why-row">
                <Info size={14} className="mint-icon" />
                <span><strong>Why this matters:</strong> {item.whyItMatters}</span>
              </div>
              <div className="rec-row mt-1">
                <span className="rec-label">Recommended:</span>
                <span className="rec-val">"{item.recommendation}"</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex-justify-end">
        <button 
          className="btn btn-mint btn-lg"
          onClick={() => setActiveTab('plan')}
        >
          <span>View Personalized Learning Path</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}