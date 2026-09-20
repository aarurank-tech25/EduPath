const mongoose = require('mongoose');

// Optional MongoDB schemas for persistent enterprise mode
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Aaruran' },
  email: { type: String, default: 'aaruran@example.com' },
  currentRole: { type: String, default: 'B.Tech IT Student' },
  targetRole: { type: String, default: 'Full Stack Developer' },
  learningLevel: { type: String, default: 'Intermediate' },
  bio: { type: String, default: 'Passionate computer science student aiming to become a full-stack engineer building scalable web applications.' },
  projects: [{
    title: String,
    description: String,
    techStack: [String],
    link: String
  }],
  certificates: [{
    title: String,
    issuer: String,
    year: String
  }],
  createdAt: { type: Date, default: Date.now }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  proficiency: { type: Number, min: 0, max: 100, default: 50 },
  verifiedFromResume: { type: Boolean, default: false },
  lastUpdated: { type: Date, default: Date.now }
});

const SkillGapSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  category: { type: String, default: 'General' },
  currentScore: { type: Number, default: 0 },
  requiredScore: { type: Number, default: 80 },
  gap: { type: Number, default: 0 },
  status: { type: String, enum: ['Strong', 'Improve', 'Critical'], default: 'Improve' },
  priority: { type: Number, default: 1 }
});

const LearningPlanSchema = new mongoose.Schema({
  targetRole: { type: String, default: 'Full Stack Developer' },
  weeks: [{
    weekNumber: Number,
    title: String,
    focusSkills: [String],
    objectives: [String],
    completedObjectives: [String],
    resources: [{
      title: String,
      type: { type: String, default: 'article' },
      url: String,
      duration: String
    }],
    practiceProject: String,
    isCompleted: { type: Boolean, default: false },
    isAdapted: { type: Boolean, default: false },
    adaptationReason: String
  }],
  updatedAt: { type: Date, default: Date.now }
});

const PracticeTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  skill: { type: String, required: true },
  difficulty: { type: String, default: 'Intermediate' },
  description: { type: String, required: true },
  instructions: [String],
  starterCode: String,
  submissions: [{
    code: String,
    score: Number,
    feedback: String,
    weakAreas: [String],
    submittedAt: { type: Date, default: Date.now }
  }]
});

module.exports = {
  UserSchema,
  SkillSchema,
  SkillGapSchema,
  LearningPlanSchema,
  PracticeTaskSchema
};
