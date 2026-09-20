import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, Layers } from 'lucide-react';

export default function AdaptiveEngineWidget({ currentScenario }) {
  const [activeStep, setActiveStep] = useState(3); // 04 Practice

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev >= 5 ? 0 : prev + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { num: '01', label: 'Analyze' },
    { num: '02', label: 'Identify Gap' },
    { num: '03', label: 'Plan' },
    { num: '04', label: 'Practice' },
    { num: '05', label: 'Evaluate' },
    { num: '06', label: 'Adapt' }
  ];

  const scenario = currentScenario || {
    stateText: "Your last 3 practice attempts show difficulty with async error handling.",
    adaptationText: "Your next challenge has been adjusted to focus on guided Express error handling."
  };

  return (
    <div className="adaptive-engine-card">
      <div className="adaptive-header">
        <div>
          <span className="section-label-tiny">ADAPTIVE LEARNING ENGINE</span>
          <h3 className="adaptive-title">Continuous Adaptation Loop</h3>
        </div>
        <span className="status-badge-subtle">Engine Active</span>
      </div>

      {/* Clean 6-Step Horizontal Process */}
      <div className="engine-process-bar">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <React.Fragment key={idx}>
              <div className={`process-step-item ${isActive ? 'step-active' : ''}`}>
                <span className="step-number">{step.num}</span>
                <span className="step-name">{step.label}</span>
              </div>
              {idx < steps.length - 1 && <span className="process-arrow">→</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* Clean Observation & Adaptation Split */}
      <div className="adaptation-callout-grid">
        <div className="callout-block">
          <span className="callout-label">CURRENT OBSERVATION</span>
          <p className="callout-text">"{scenario.stateText}"</p>
        </div>

        <div className="callout-block highlight-green">
          <span className="callout-label green-label">ADAPTATION APPLIED</span>
          <p className="callout-text green-text">"{scenario.adaptationText}"</p>
        </div>
      </div>
    </div>
  );
}