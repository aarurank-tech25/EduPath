import React, { useState } from 'react';
import { Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function Practice({ setActiveTab }) {
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [code, setCode] = useState(
`// Express Authentication Error Middleware
function authErrorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid or missing authentication token'
    });
  }
  next(err);
}`
  );

  const [evaluation, setEvaluation] = useState(null);

  const handleStart = () => {
    setStarted(true);
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.evaluatePractice(code, 'express-auth-middleware');
      if (res && res.success) {
        setEvaluation(res);
      } else {
        throw new Error('Evaluation failed');
      }
    } catch {
      setEvaluation({
        score: 78,
        strengths: ["Correct middleware structure."],
        needsImprovement: ["Error propagation", "Status code handling"],
        nextAction: "Async error handling"
      });
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Today's Practice</h1>
          <p className="page-subtitle">Node.js • Express Error Handling • Difficulty: Medium</p>
        </div>
      </div>

      {/* Main Practice Task Card */}
      <div className="surface-card practice-task-card">
        <div className="task-meta-row">
          <span className="task-category">NODE.JS</span>
          <span className="task-difficulty">DIFFICULTY: MEDIUM</span>
        </div>

        <h2 className="task-heading">Build an Express middleware that correctly handles asynchronous errors.</h2>

        <div className="task-instruction-box">
          <span className="inst-label">Task:</span>
          <p className="inst-body">
            Write an Express error-handling middleware function that intercepts unauthorized requests and propagates other errors safely to the next handler.
          </p>
        </div>

        {!started && (
          <div className="mt-4">
            <button className="btn btn-primary btn-lg" onClick={handleStart}>
              <span>Start Challenge</span>
              <Play size={16} />
            </button>
          </div>
        )}

        {/* Code Editor */}
        {started && (
          <div className="code-practice-workspace mt-4">
            <div className="workspace-label">Code Editor (Node.js / Express):</div>
            <textarea
              className="code-textarea-light"
              rows={10}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />

            <div className="mt-3">
              <button 
                className="btn btn-primary"
                disabled={submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'Evaluating...' : 'SUBMIT ANSWER'}
              </button>
            </div>
          </div>
        )}

        {/* Submission Results */}
        {submitted && evaluation && (
          <div className="result-evaluation-card mt-4">
            <h3 className="result-title">Your Result</h3>
            
            <div className="result-score-banner">
              <span className="score-big-num">{evaluation.score}</span>
              <span className="score-out-of">/ 100</span>
            </div>

            <div className="result-columns-grid mt-3">
              <div className="result-col">
                <span className="col-heading green-heading">What you did well</span>
                <ul className="result-list">
                  {(evaluation.strengths || ["Correct middleware structure."]).map((st, i) => (
                    <li key={i}>✓ {st}</li>
                  ))}
                </ul>
              </div>

              <div className="result-col">
                <span className="col-heading">Improve next</span>
                <ul className="result-list">
                  {(evaluation.needsImprovement || ["Error propagation", "Status code handling"]).map((ni, i) => (
                    <li key={i}>• {ni}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="next-rec-box mt-3">
              <span className="rec-label-sm">Next recommended practice:</span>
              <strong className="rec-text">{evaluation.nextAction || 'Async error handling'}</strong>
            </div>

            <div className="mt-4 flex-end">
              <button className="btn btn-primary" onClick={() => setActiveTab('plan')}>
                <span>Continue Learning Path</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}