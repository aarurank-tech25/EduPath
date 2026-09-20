import React, { useState } from 'react';
import { User, Save, CheckCircle2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { api } from '../services/api';

export default function Profile({ user, onProfileUpdated }) {
  const [name, setName] = useState(user?.name || 'Aaruran');
  const [email, setEmail] = useState(user?.email || 'aaruran@example.com');
  const [education, setEducation] = useState('B.Tech Information Technology');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack Developer');
  const [skillsStr, setSkillsStr] = useState('HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Git, Python');
  const [projectsStr, setProjectsStr] = useState('EduPath AI Agent, E-Commerce Platform, REST API Service');
  const [certsStr, setCertsStr] = useState('Full Stack Web Developer Certificate, React Advanced Patterns');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      targetRole: targetRole.trim()
    };
    localStorage.setItem('edupath_user', JSON.stringify(updated));
    if (onProfileUpdated) onProfileUpdated(updated);
    api.updateProfile(updated).catch(() => {});

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your student profile, education, target career role, projects, and certificates</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="profile-form-grid">
        {savedSuccess && (
          <div className="success-banner grid-span-full">
            <CheckCircle2 size={18} />
            <span>Profile changes saved successfully!</span>
          </div>
        )}

        {/* Basic Personal Card */}
        <div className="simple-card profile-section-card">
          <div className="card-header-icon-row">
            <User size={18} />
            <h2 className="card-section-title">Personal Information</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Career & Education Card */}
        <div className="simple-card profile-section-card">
          <div className="card-header-icon-row">
            <GraduationCap size={18} />
            <h2 className="card-section-title">Career & Education</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Target Career Role</label>
            <select
              className="form-input"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Frontend Engineer">Frontend Engineer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="AI / ML Engineer">AI / ML Engineer</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Education / Degree</label>
            <input
              type="text"
              className="form-input"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          </div>
        </div>

        {/* Skills Catalog Card */}
        <div className="simple-card profile-section-card grid-span-full">
          <div className="card-header-icon-row">
            <Briefcase size={18} />
            <h2 className="card-section-title">Verified Skills & Projects</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Technical Skills (comma-separated)</label>
            <textarea
              className="form-input"
              rows={2}
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Projects (comma-separated)</label>
            <textarea
              className="form-input"
              rows={2}
              value={projectsStr}
              onChange={(e) => setProjectsStr(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Certificates (comma-separated)</label>
            <input
              type="text"
              className="form-input"
              value={certsStr}
              onChange={(e) => setCertsStr(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <button type="submit" className="btn btn-primary btn-lg">
              <Save size={16} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}