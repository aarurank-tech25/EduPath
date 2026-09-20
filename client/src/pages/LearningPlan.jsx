import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Lock } from 'lucide-react';

export default function LearningPlan({ setActiveTab }) {
  const [modules, setModules] = useState([
    {
      num: '01',
      title: 'JavaScript Async Programming',
      progress: 65,
      lessons: '3 lessons',
      tasks: '2 practice tasks',
      status: 'In Progress',
      locked: false,
      adaptedNotice: null
    },
    {
      num: '02',
      title: 'Node.js API Development',
      progress: 30,
      lessons: '4 lessons',
      tasks: '3 practice tasks',
      status: 'In Progress',
      locked: false,
      adaptedNotice: 'AI ADAPTED: Added Express error-handling drill'
    },
    {
      num: '03',
      title: 'MongoDB & Schema Modeling',
      progress: 0,
      lessons: '3 lessons',
      tasks: '2 practice tasks',
      status: 'Locked',
      locked: true,
      adaptedNotice: null
    },
    {
      num: '04',
      title: 'Authentication & Security',
      progress: 0,
      lessons: '4 lessons',
      tasks: '2 practice tasks',
      status: 'Locked',
      locked: true,
      adaptedNotice: null
    }
  ]);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Your Learning Plan</h1>
          <p className="page-subtitle">Structured roadmap personalized for your target career goal</p>
        </div>
        <span className="status-badge-subtle">This Week</span>
      </div>

      {/* Modules List */}
      <div className="learning-planner-list">
        {modules.map((item, idx) => (
          <div key={idx} className={`surface-card planner-module-card ${item.locked ? 'card-locked' : ''}`}>
            <div className="module-top-row">
              <div className="module-num-box">{item.num}</div>
              <div className="module-title-wrap">
                <h3 className="module-title">{item.title}</h3>
                <span className="module-sub-info">
                  {item.lessons} • {item.tasks}
                </span>
              </div>
              <div className="module-status-wrap">
                {item.locked ? (
                  <span className="locked-badge">
                    <Lock size={12} />
                    <span>Locked until previous milestone</span>
                  </span>
                ) : (
                  <span className="in-progress-badge">Progress {item.progress}%</span>
                )}
              </div>
            </div>

            {/* AI Adaptation Banner */}
            {item.adaptedNotice && (
              <div className="planner-adapted-banner">
                <span>{item.adaptedNotice}</span>
              </div>
            )}

            {!item.locked && (
              <div className="module-bottom-row mt-3">
                <div className="module-progress-bar">
                  <div className="bar-fill-green" style={{ width: `${item.progress}%` }}></div>
                </div>

                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => setActiveTab('practice')}
                >
                  <span>Continue</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}