import React from 'react';
import { Target, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CareerMap({ setActiveTab }) {
  const stages = [
    {
      id: 'current',
      level: 'CURRENT LEVEL',
      title: 'Student / Beginner Baseline',
      status: 'Completed',
      skills: ['HTML5', 'CSS3', 'Basic JavaScript'],
      tasks: '3 / 3 completed'
    },
    {
      id: 'foundation',
      level: 'FOUNDATION',
      title: 'JavaScript Core & Async Patterns',
      status: 'In Progress',
      skills: ['Async/Await', 'Closures', 'Promises', 'ES6+'],
      tasks: '4 / 5 completed'
    },
    {
      id: 'fullstack',
      level: 'FULL STACK',
      title: 'React & Node.js Architecture',
      status: 'In Progress',
      skills: ['React Hooks', 'Context API', 'Express REST APIs', 'MongoDB'],
      tasks: '2 / 6 completed'
    },
    {
      id: 'production',
      level: 'PRODUCTION',
      title: 'Authentication, APIs & Testing',
      status: 'Upcoming',
      skills: ['Google OAuth 2.0', 'JWT Security', 'Docker', 'AWS EC2'],
      tasks: '0 / 4 completed'
    },
    {
      id: 'jobready',
      level: 'JOB READY',
      title: 'Projects, Interview Practice & Deployment',
      status: 'Target Goal',
      skills: ['Capstone Portfolio', 'System Design', 'CI/CD Deployment'],
      tasks: 'Target readiness: 85%+'
    }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Career Map</h1>
          <p className="page-subtitle">Your structured career trajectory from baseline student to Job Ready engineer</p>
        </div>
        <div className="target-pill-light">
          <Target size={14} className="green-icon" />
          <span>Goal: Full Stack Developer</span>
        </div>
      </div>

      {/* Clean Timeline Section */}
      <div className="surface-card timeline-vertical-card">
        <div className="timeline-flow-list">
          {stages.map((st, i) => (
            <div key={st.id} className="timeline-stage-wrapper">
              <div className="timeline-stage-content">
                <div className="stage-level-indicator">
                  <div className={`level-circle ${st.status === 'Completed' ? 'circle-done' : st.status === 'In Progress' ? 'circle-active' : ''}`}>
                    {st.status === 'Completed' ? '✓' : i + 1}
                  </div>
                  <span className="level-name-tag">{st.level}</span>
                  <span className={`status-badge-inline status-${st.status.toLowerCase().replace(' ', '-')}`}>
                    {st.status}
                  </span>
                </div>

                <div className="stage-details-box">
                  <h3 className="stage-title">{st.title}</h3>
                  <div className="stage-skills-list">
                    {st.skills.map((sk, k) => (
                      <span key={k} className="skill-chip-subtle">{sk}</span>
                    ))}
                  </div>

                  <div className="stage-footer-info">
                    <span className="info-tasks">Tasks: <strong>{st.tasks}</strong></span>
                    {st.status === 'In Progress' && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setActiveTab('practice')}
                      >
                        <span>Practice Milestone</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {i < stages.length - 1 && (
                <div className="timeline-connector-line">
                  <span className="down-arrow-symbol">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}