import React, { useState } from 'react';
import { Send, Loader2, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export default function AIMentor({ studentState }) {
  const user = studentState?.user;
  const userName = user?.name || 'Aaruran';
  const targetRole = user?.targetRole || 'Full Stack Developer';

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'mentor',
      text: `Hello ${userName}. I am your EduPath Academic Mentor. I'm tracking your progress for ${targetRole} (Current readiness: 72%). What would you like to discuss about your learning path today?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    'What should I learn today?',
    'Why is Node.js my biggest gap?',
    'Give me a practice challenge.',
    'Explain this topic simply.'
  ];

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    const context = {
      userName,
      targetRole,
      readinessScore: 72,
      reactScore: 52,
      jsScore: 78,
      nodeScore: 38,
      mongoScore: 48
    };

    try {
      const res = await api.sendChatMessage(text, context);
      if (res && res.reply) {
        setMessages(prev => [...prev, {
          id: 'ai-' + Date.now(),
          sender: 'mentor',
          text: res.reply
        }]);
      } else {
        throw new Error('No response');
      }
    } catch {
      setMessages(prev => [...prev, {
        id: 'ai-' + Date.now(),
        sender: 'mentor',
        text: `Based on your profile, your biggest bottleneck is Node.js backend development (38% current vs 75% target). I recommend starting with the Express authentication middleware challenge in Practice Arena to boost your readiness.`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-display-title">Your Learning Mentor</h1>
          <p className="page-subtitle">Ask anything about your learning path, skills, or career progress.</p>
        </div>
      </div>

      {/* Small Context Bar */}
      <div className="surface-card mentor-context-strip">
        <div className="ctx-item">
          <span className="ctx-k">Current Goal:</span>
          <span className="ctx-v">{targetRole}</span>
        </div>
        <span className="ctx-dot">•</span>
        <div className="ctx-item">
          <span className="ctx-k">Current Focus:</span>
          <span className="ctx-v">Backend Development</span>
        </div>
        <span className="ctx-dot">•</span>
        <div className="ctx-item">
          <span className="ctx-k">Readiness:</span>
          <span className="ctx-v green-text-bold">72%</span>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="suggested-questions-row">
        <span className="suggested-label">SUGGESTED QUESTIONS:</span>
        <div className="suggested-chips-wrap">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              className="chip-button-light"
              disabled={loading}
              onClick={() => handleSend(q)}
            >
              "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Clean Academic Chat Conversation */}
      <div className="surface-card academic-chat-card">
        <div className="chat-messages-container">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div key={m.id} className={`academic-chat-row ${isUser ? 'row-user' : 'row-mentor'}`}>
                <div className={`chat-bubble-clean ${isUser ? 'user-bubble-light' : 'mentor-bubble-light'}`}>
                  <span className="bubble-sender-name">{isUser ? userName : 'ACADEMIC MENTOR'}</span>
                  <p className="bubble-body-text">{m.text}</p>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="academic-chat-row row-mentor">
              <div className="chat-bubble-clean mentor-bubble-light">
                <span className="bubble-sender-name">ACADEMIC MENTOR</span>
                <div className="mentor-thinking-row">
                  <Loader2 size={14} className="animate-spin green-icon" />
                  <span>Preparing personalized response...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form 
          className="academic-chat-input-bar"
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <input
            type="text"
            className="input-field-clean"
            placeholder="Ask anything about your learning path..."
            value={inputValue}
            disabled={loading}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!inputValue.trim() || loading}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}