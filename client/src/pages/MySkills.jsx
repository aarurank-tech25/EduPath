import React, { useState } from 'react';
import { Plus, CheckCircle, Tag } from 'lucide-react';
import { api } from '../services/api';

export default function MySkills({ skills = [], onSkillsUpdated }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(70);

  const defaultSkills = [
    { name: 'JavaScript', proficiency: 60, verified: true },
    { name: 'React', proficiency: 45, verified: true },
    { name: 'Node.js', proficiency: 30, verified: false },
    { name: 'HTML & CSS', proficiency: 85, verified: true },
    { name: 'Git', proficiency: 75, verified: true },
    { name: 'Python', proficiency: 65, verified: true },
    { name: 'MongoDB', proficiency: 25, verified: false }
  ];

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const added = {
      name: newSkillName.trim(),
      proficiency: Number(newSkillLevel),
      verifiedFromResume: false
    };

    api.addSkill(added).then(res => {
      if (onSkillsUpdated && res.skills) {
        onSkillsUpdated(res.skills);
      }
    }).catch(() => {});

    setNewSkillName('');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-simple">
        <div>
          <h1 className="page-title">My Skills</h1>
          <p className="page-subtitle">Catalog of all detected and verified technical competencies</p>
        </div>
      </div>

      {/* Add Skill Quick Bar */}
      <div className="simple-card skill-add-card mb-4">
        <form onSubmit={handleAddSkill} className="add-skill-form">
          <input
            type="text"
            className="form-input flex-1"
            placeholder="Add a new skill (e.g. TypeScript, GraphQL)..."
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
          />
          <input
            type="number"
            className="form-input w-24"
            min="10"
            max="100"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            title="Proficiency score (10-100)"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={16} /> Add Skill
          </button>
        </form>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid-simple">
        {displaySkills.map((s, idx) => {
          const name = s.name || s.skillName || s;
          const prof = s.proficiency ?? 60;
          return (
            <div key={idx} className="simple-card skill-item-card">
              <div className="skill-card-top">
                <span className="skill-item-name">{name}</span>
                <span className="skill-item-score">{prof}%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: `${prof}%` }}></div>
              </div>
              <div className="skill-card-bottom">
                <span className="skill-verified-tag">
                  {s.verifiedFromResume || s.verified ? 'Verified from Resume' : 'Self-Reported'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}