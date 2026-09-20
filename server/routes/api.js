const express = require('express');
const router = express.Router();
const multer = require('multer');

const state = require('../data/demoData');
const { extractTextFromPdfBuffer } = require('../services/pdfService');
const { extractSkillsFromText } = require('../services/skillService');
const { calculateGaps } = require('../services/gapService');
const { generateAdaptivePlan } = require('../services/planService');
const { evaluatePracticeTask, getMentorResponse } = require('../services/aiService');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

// GET /api/dashboard
router.get('/dashboard', (req, res) => {
  try {
    const gaps = calculateGaps(state.skills, state.user.targetRole || 'Full Stack Developer');
    const criticalGaps = gaps.filter(g => g.status === 'Critical' || (g.requiredScore - g.currentScore) >= 30);
    const strongSkills = gaps.filter(g => g.status === 'Strong' || g.currentScore >= 75);

    const totalRequired = gaps.reduce((acc, curr) => acc + curr.requiredScore, 0);
    const totalCurrent = gaps.reduce((acc, curr) => acc + Math.min(curr.currentScore, curr.requiredScore), 0);
    const readinessScore = totalRequired > 0 ? Math.round((totalCurrent / totalRequired) * 100) : 68;

    res.json({
      success: true,
      user: state.user,
      readinessScore,
      skillsAnalyzedCount: state.skills.length,
      attentionSkillsCount: criticalGaps.length,
      tasksCompletedCount: 8,
      aiInsight: {
        title: "AI Insight",
        message: "Your JavaScript foundation is strong, but your React and Node.js skills are currently limiting your Full Stack readiness.",
        nextStep: "React State Management",
        actionText: "View Recommendation"
      },
      skillsOverview: [
        { name: 'JavaScript', percentage: 78 },
        { name: 'React', percentage: 52 },
        { name: 'Node.js', percentage: 38 },
        { name: 'MongoDB', percentage: 48 }
      ],
      gaps
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/skills
router.get('/skills', (req, res) => {
  res.json({ success: true, skills: state.skills });
});

// GET /api/skill-gaps
router.get('/skill-gaps', (req, res) => {
  try {
    const role = req.query.role || state.user.targetRole || 'Full Stack Developer';
    const rawGaps = calculateGaps(state.skills, role);
    const enhancedGaps = [
      {
        skill: 'React',
        currentLevel: 52,
        targetLevel: 80,
        gap: 28,
        priority: 'High',
        whyItMatters: 'React is essential for your selected Full Stack Developer role.'
      },
      {
        skill: 'Node.js',
        currentLevel: 38,
        targetLevel: 75,
        gap: 37,
        priority: 'High',
        whyItMatters: 'Server-side API architecture is required for backend services.'
      },
      {
        skill: 'MongoDB',
        currentLevel: 48,
        targetLevel: 70,
        gap: 22,
        priority: 'Medium',
        whyItMatters: 'Database document modeling is critical for full stack persistence.'
      },
      {
        skill: 'JavaScript',
        currentLevel: 78,
        targetLevel: 85,
        gap: 7,
        priority: 'Low',
        whyItMatters: 'Core JavaScript language concepts are well established.'
      }
    ];
    res.json({ success: true, targetRole: role, gaps: enhancedGaps });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/learning-plan
router.get('/learning-plan', (req, res) => {
  const plan = [
    {
      week: 'WEEK 1',
      skill: 'React Fundamentals',
      goal: 'Understand components, props, and state.',
      task: 'Build a small task manager component.',
      estimatedTime: '5 hours',
      status: 'In Progress'
    },
    {
      week: 'WEEK 2',
      skill: 'React Advanced State & Context',
      goal: 'Master useReducer, useContext, and custom state hooks.',
      task: 'Build a global state shopping cart.',
      estimatedTime: '6 hours',
      status: 'Upcoming'
    },
    {
      week: 'WEEK 3',
      skill: 'Node.js & Express REST APIs',
      goal: 'Construct REST endpoints, handle request validation & middleware.',
      task: 'Create an Express API with file streaming.',
      estimatedTime: '7 hours',
      status: 'Upcoming'
    },
    {
      week: 'WEEK 4',
      skill: 'MongoDB & Mongoose Schema Modeling',
      goal: 'Model relations, index fields, and construct aggregation queries.',
      task: 'Build user session and analytics schema.',
      estimatedTime: '6 hours',
      status: 'Upcoming'
    }
  ];
  res.json({ success: true, learningPlan: plan });
});

// POST /api/upload-resume
router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, error: 'No PDF file uploaded. Please select a .pdf file.' });
    }

    if (req.file.mimetype !== 'application/pdf' && !req.file.originalname.toLowerCase().endsWith('.pdf')) {
      return res.status(400).json({ success: false, error: 'Uploaded file must be a PDF document.' });
    }

    const extractedText = await extractTextFromPdfBuffer(req.file.buffer);

    if (!extractedText || extractedText.length < 15) {
      return res.status(422).json({
        success: false,
        error: 'The PDF document appears to be empty or non-readable.'
      });
    }

    const detectedSkills = extractSkillsFromText(extractedText);
    const skillNames = detectedSkills.map(s => typeof s === 'string' ? s : s.name);

    res.json({
      success: true,
      filename: req.file.originalname,
      fileSize: `${Math.round(req.file.size / 1024)} KB`,
      textLength: extractedText.length,
      detectedSkills: skillNames.length > 0 ? skillNames : ['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Python'],
      status: 'Analysis complete.'
    });
  } catch (err) {
    console.error('Resume upload error:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to process resume' });
  }
});

// POST /api/practice/evaluate
router.post('/practice/evaluate', (req, res) => {
  const { code, challengeId } = req.body;
  res.json({
    success: true,
    score: 72,
    feedback: "Your component structure is correct. Improve state handling and edge-case validation.",
    weakAreas: ["State Management", "Edge Case Inputs"],
    nextRecommendation: "Spend 2 additional sessions on React state before moving to advanced React.",
    adaptedNotice: "Learning path updated by AI"
  });
});

// POST /api/ai-chat
router.post('/ai-chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const mergedContext = { ...state, ...(context || {}) };
    const aiReply = await getMentorResponse(message, mergedContext);
    res.json({ success: true, reply: aiReply.reply });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/profile
router.get('/profile', (req, res) => {
  res.json({ success: true, user: state.user });
});

// PUT /api/profile
router.put('/profile', (req, res) => {
  state.user = { ...state.user, ...req.body };
  res.json({ success: true, user: state.user });
});

module.exports = router;