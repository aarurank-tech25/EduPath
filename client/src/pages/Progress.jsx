import React from 'react';
import { TrendingUp, Award, CheckCircle2, Clock, Activity, Zap } from 'lucide-react';

export default function Progress() {
  const momentumData = [
    { week: 'Wk 1', score: 48 },
    { week: 'Wk 2', score: 54 },
    { week: 'Wk 3', score: 60 },
    { week: 'Wk 4', score: 64 },
    { week: 'Wk 5', score: 72 }
  ];

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Progress & Analytics</h1>
          <p className="page-subtitle">Track your career momentum, weekly improvement velocity, and skill mastery</p>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="progress-stats-grid">
        <div className="dark-card stat-metric-box">
          <span className="stat-label">Career Readiness</span>
          <span className="stat-value mint-text">72%</span>
          <span className="stat-sub">+12% this month</span>
        </div>

        <div className="dark-card stat-metric-box">
          <span className="stat-label">Weekly Improvement</span>
          <span className="stat-value">+12%</span>
          <span className="stat-sub">Velocity benchmark</span>
        </div>

        <div className="dark-card stat-metric-box">
          <span className="stat-label">Skills Mastered</span>
          <span className="stat-value">5</span>
          <span className="stat-sub">Above target thresholds</span>
        </div>

        <div className="dark-card stat-metric-box">
          <span className="stat-label">Challenges Completed</span>
          <span className="stat-value">8</span>
          <span className="stat-sub">Practice tasks evaluated</span>
        </div>
      </div>

      {/* Career Momentum Chart */}
      <div className="dark-card momentum-chart-card">
        <div className="chart-header-row">
          <div>
            <h2 className="section-title">Career Momentum</h2>
            <span className="section-subtitle">Readiness Trajectory Over Time</span>
          </div>

          <div className="momentum-this-week-banner">
            <div className="this-week-col">
              <span className="tw-val mint-text">+12%</span>
              <span className="tw-lbl">READINESS</span>
            </div>
            <div className="tw-divider"></div>
            <div className="this-week-col">
              <span className="tw-val">5</span>
              <span className="tw-lbl">SKILLS IMPROVED</span>
            </div>
            <div className="tw-divider"></div>
            <div className="this-week-col">
              <span className="tw-val">8</span>
              <span className="tw-lbl">TASKS COMPLETED</span>
            </div>
          </div>
        </div>

        {/* SVG Line / Bar Momentum Chart */}
        <div className="momentum-svg-chart-container mt-4">
          <div className="chart-bars-flex">
            {momentumData.map((d, i) => (
              <div key={i} className="momentum-col">
                <div className="col-bar-wrap">
                  <span className="bar-num-top">{d.score}%</span>
                  <div className="col-bar-fill-mint" style={{ height: `${(d.score / 100) * 160}px` }}></div>
                </div>
                <span className="col-wk-label">{d.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Progress Overview */}
      <div className="dark-card skill-progress-overview-card">
        <h2 className="section-title">Skill Mastery Overview</h2>

        <div className="skill-bars-list mt-3">
          <div className="skill-bar-row">
            <div className="skill-bar-info">
              <span className="skill-bar-name">JavaScript</span>
              <span className="skill-bar-pct">78%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: '78%' }}></div>
            </div>
          </div>

          <div className="skill-bar-row">
            <div className="skill-bar-info">
              <span className="skill-bar-name">React</span>
              <span className="skill-bar-pct">52%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: '52%' }}></div>
            </div>
          </div>

          <div className="skill-bar-row">
            <div className="skill-bar-info">
              <span className="skill-bar-name">Node.js</span>
              <span className="skill-bar-pct">38%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: '38%' }}></div>
            </div>
          </div>

          <div className="skill-bar-row">
            <div className="skill-bar-info">
              <span className="skill-bar-name">MongoDB</span>
              <span className="skill-bar-pct">48%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: '48%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}