// In-Memory Data Store & Initial Demo State
const state = {
  user: {
    name: 'Aaruran',
    email: 'aaruran.it@example.com',
    degree: 'B.Tech - Information Technology',
    institution: 'National Institute of Technology',
    currentRole: 'Final Year IT Student',
    targetRole: 'Full Stack Developer',
    learningLevel: 'Intermediate',
    bio: 'Self-motivated IT student building modern web apps. Seeking to bridge gaps in backend architectures, microservices, and modern DevOps to excel as a Full Stack Software Engineer.',
    projects: [
      {
        id: 1,
        title: 'TaskFlow Agile Kanban',
        description: 'Collaborative task management dashboard built with React and Tailwind with drag-and-drop workflow.',
        techStack: ['React', 'JavaScript', 'HTML5', 'CSS3'],
        link: 'https://github.com/aaruran/taskflow'
      },
      {
        id: 2,
        title: 'Campus Food Delivery Portal',
        description: 'E-commerce style food ordering app with REST APIs and basic Express backend.',
        techStack: ['Node.js', 'Express', 'MongoDB', 'React'],
        link: 'https://github.com/aaruran/campus-bites'
      }
    ],
    certificates: [
      { id: 1, title: 'Responsive Web Design Certification', issuer: 'freeCodeCamp', year: '2024' },
      { id: 2, title: 'JavaScript Algorithms and Data Structures', issuer: 'freeCodeCamp', year: '2024' },
      { id: 3, title: 'Git & GitHub Essentials', issuer: 'Coursera', year: '2023' }
    ]
  },

  skills: [
    { name: 'JavaScript', category: 'Languages', proficiency: 75, verifiedFromResume: true },
    { name: 'React', category: 'Frontend', proficiency: 70, verifiedFromResume: true },
    { name: 'HTML/CSS', category: 'Frontend', proficiency: 85, verifiedFromResume: true },
    { name: 'Node.js', category: 'Backend', proficiency: 45, verifiedFromResume: true },
    { name: 'Git', category: 'DevOps & Tools', proficiency: 65, verifiedFromResume: true },
    { name: 'MongoDB', category: 'Database', proficiency: 40, verifiedFromResume: true },
    { name: 'SQL', category: 'Database', proficiency: 50, verifiedFromResume: false },
    { name: 'Python', category: 'Languages', proficiency: 60, verifiedFromResume: false },
    { name: 'REST APIs', category: 'Backend', proficiency: 55, verifiedFromResume: true },
    { name: 'Docker', category: 'DevOps & Tools', proficiency: 20, verifiedFromResume: false },
    { name: 'AWS', category: 'DevOps & Tools', proficiency: 15, verifiedFromResume: false },
    { name: 'Data Structures', category: 'Core CS', proficiency: 58, verifiedFromResume: false }
  ],

  roleRequirements: {
    'Full Stack Developer': [
      { skill: 'JavaScript', category: 'Languages', requiredScore: 85 },
      { skill: 'React', category: 'Frontend', requiredScore: 80 },
      { skill: 'Node.js', category: 'Backend', requiredScore: 80 },
      { skill: 'Express', category: 'Backend', requiredScore: 75 },
      { skill: 'MongoDB', category: 'Database', requiredScore: 70 },
      { skill: 'REST APIs', category: 'Backend', requiredScore: 80 },
      { skill: 'HTML/CSS', category: 'Frontend', requiredScore: 85 },
      { skill: 'Git', category: 'DevOps & Tools', requiredScore: 75 },
      { skill: 'SQL', category: 'Database', requiredScore: 65 },
      { skill: 'Docker', category: 'DevOps & Tools', requiredScore: 60 }
    ],
    'Frontend Developer': [
      { skill: 'JavaScript', category: 'Languages', requiredScore: 90 },
      { skill: 'React', category: 'Frontend', requiredScore: 88 },
      { skill: 'HTML/CSS', category: 'Frontend', requiredScore: 92 },
      { skill: 'TypeScript', category: 'Languages', requiredScore: 75 },
      { skill: 'Git', category: 'DevOps & Tools', requiredScore: 75 },
      { skill: 'REST APIs', category: 'Backend', requiredScore: 70 }
    ],
    'Backend Developer': [
      { skill: 'Node.js', category: 'Backend', requiredScore: 88 },
      { skill: 'Express', category: 'Backend', requiredScore: 85 },
      { skill: 'SQL', category: 'Database', requiredScore: 80 },
      { skill: 'MongoDB', category: 'Database', requiredScore: 78 },
      { skill: 'REST APIs', category: 'Backend', requiredScore: 88 },
      { skill: 'Docker', category: 'DevOps & Tools', requiredScore: 70 },
      { skill: 'JavaScript', category: 'Languages', requiredScore: 80 }
    ]
  },

  learningPlan: {
    targetRole: 'Full Stack Developer',
    generatedAt: new Date().toISOString(),
    weeks: [
      {
        weekNumber: 1,
        title: 'Node.js Core Architecture & Async Programming',
        focusSkills: ['Node.js', 'JavaScript'],
        estimatedHours: 12,
        status: 'in-progress',
        objectives: [
          'Understand Node.js Event Loop, Call Stack, and libuv Worker Pool',
          'Master Asynchronous Control Flow: Promises, async/await, and EventEmitter',
          'File System (fs/promises) operations and Stream buffering',
          'Build robust asynchronous error handling wrappers'
        ],
        completedObjectives: [
          'Understand Node.js Event Loop, Call Stack, and libuv Worker Pool'
        ],
        resources: [
          { title: 'Node.js Architecture Deep Dive', type: 'Doc', url: 'https://nodejs.org/en/learn', duration: '45 mins' },
          { title: 'Mastering Async/Await & Event Loop', type: 'Video', url: 'https://youtube.com', duration: '1.5 hrs' }
        ],
        practiceProject: 'CLI log parser utilizing Node.js streams and event listeners'
      },
      {
        weekNumber: 2,
        title: 'Express.js REST API Architecture & Middleware Pipelines',
        focusSkills: ['Express', 'Node.js', 'REST APIs'],
        estimatedHours: 14,
        status: 'upcoming',
        objectives: [
          'Design RESTful resource URI routing conventions',
          'Implement custom authentication & input validation middlewares',
          'Centralized global error handling middleware with proper HTTP status codes',
          'CORS, Rate Limiting, and Helmet security headers configuration'
        ],
        completedObjectives: [],
        resources: [
          { title: 'Express.js Production Routing Guide', type: 'Doc', url: 'https://expressjs.com', duration: '1 hr' },
          { title: 'Building Secure REST APIs with Express', type: 'Article', url: 'https://dev.to', duration: '50 mins' }
        ],
        practiceProject: 'E-commerce Product Catalog RESTful API with validation and error middleware'
      },
      {
        weekNumber: 3,
        title: 'MongoDB Schema Modeling & Mongoose Data Layer',
        focusSkills: ['MongoDB', 'Backend'],
        estimatedHours: 12,
        status: 'upcoming',
        objectives: [
          'One-to-many and Many-to-many relationship modeling in NoSQL',
          'Mongoose validation, pre/post middleware hooks, and virtuals',
          'Mongoose Aggregation Pipeline for analytics and complex filtering',
          'Database indexing strategies for high-frequency queries'
        ],
        completedObjectives: [],
        resources: [
          { title: 'MongoDB University: Schema Design Patterns', type: 'Course', url: 'https://university.mongodb.com', duration: '3 hrs' }
        ],
        practiceProject: 'User analytics aggregator using Mongoose pipeline operators ($match, $group, $sort)'
      },
      {
        weekNumber: 4,
        title: 'Full Stack Integration, JWT Authentication & State Sync',
        focusSkills: ['React', 'Express', 'Node.js'],
        estimatedHours: 15,
        status: 'upcoming',
        objectives: [
          'JSON Web Token (JWT) stateless auth and HTTP-Only cookie storage',
          'Protected routes on both frontend (React) and backend (Express)',
          'Optimistic UI state updates and Axios interceptor token refresh',
          'Handling file uploads via Multer and cloud storage'
        ],
        completedObjectives: [],
        resources: [
          { title: 'JWT Best Practices & Token Rotation', type: 'Doc', url: 'https://jwt.io/introduction', duration: '1 hr' }
        ],
        practiceProject: 'Authenticated User Dashboard with role-based permissions'
      },
      {
        weekNumber: 5,
        title: 'Docker Containerization & Multi-Container Orchestration',
        focusSkills: ['Docker', 'DevOps & Tools'],
        estimatedHours: 10,
        status: 'upcoming',
        objectives: [
          'Dockerfile creation for React (multi-stage Nginx) and Node.js',
          'Docker Compose multi-service architecture (Client, Server, MongoDB)',
          'Environment variable injection and persistent named volumes',
          'Container networking and healthchecks'
        ],
        completedObjectives: [],
        resources: [
          { title: 'Docker for Full-Stack Developers', type: 'Course', url: 'https://docs.docker.com', duration: '2 hrs' }
        ],
        practiceProject: 'Dockerized multi-container app with Mongo, Express, and React'
      },
      {
        weekNumber: 6,
        title: 'Production Deployment, CI/CD & Performance Optimization',
        focusSkills: ['DevOps & Tools', 'Full Stack Developer'],
        estimatedHours: 12,
        status: 'upcoming',
        objectives: [
          'Automated CI pipeline with GitHub Actions (linting, build, test)',
          'Cloud deployment (Render / Vercel / Railway / AWS EC2)',
          'Redis caching layer for database query acceleration',
          'Frontend code-splitting, lazy loading, and bundle size reduction'
        ],
        completedObjectives: [],
        resources: [
          { title: 'Full Stack Production Checklist', type: 'Doc', url: 'https://github.com', duration: '1.5 hrs' }
        ],
        practiceProject: 'Complete production deployment of the Capstone project with live demo link'
      }
    ]
  },

  practiceTask: {
    id: 'task-101',
    title: 'Build Express Error-Handling Middleware with Async/Await',
    skill: 'Node.js / Express',
    category: 'Backend',
    difficulty: 'Intermediate',
    estimatedTime: '25 mins',
    description: 'Implement a production-grade Express error-handling middleware function that catches asynchronous exceptions, formats consistent JSON responses, and returns appropriate HTTP status codes.',
    instructions: [
      'Write an Express error-handling middleware function with the standard 4 parameters: (err, req, res, next).',
      'If the error object contains a "status" or "statusCode" property, use it; otherwise default to HTTP 500.',
      'Return a JSON payload formatted as: { success: false, message: err.message || "Internal Server Error", error: err.name }',
      'Ensure that in production mode, sensitive stack traces are omitted.',
      'Provide an async route wrapper (or demonstrate handling an async route) that catches unhandled Promise rejections and forwards them via next(err).'
    ],
    starterCode: "/**\n * Express Async Error-Handling Middleware\n * Parameter signature: (err, req, res, next)\n */\n\nfunction errorHandler(err, req, res, next) {\n  // 1. Determine HTTP status code (err.statusCode || 500)\n  const statusCode = err.statusCode || err.status || 500;\n\n  // 2. Format standard JSON error response\n  res.status(statusCode).json({\n    success: false,\n    message: err.message || 'Internal Server Error',\n    stack: process.env.NODE_ENV === 'production' ? null : err.stack\n  });\n}\n\n// Helper for async route handlers\nconst asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\nmodule.exports = { errorHandler, asyncHandler };",
    submissions: []
  },

  agentEvents: [
    {
      id: 1,
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      type: 'ANALYZE',
      message: 'Agent completed resume parse & baseline skill extraction. 12 skills identified.'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      type: 'FIND_GAP',
      message: 'Agent compared skills against Full Stack Developer benchmarks. Detected critical gaps in Node.js (-35%), Express (-75%), and MongoDB (-30%).'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      type: 'PLAN',
      message: 'Generated personalized 6-week curriculum prioritized by critical backend & DevOps gaps.'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      type: 'TASK',
      message: 'Assigned targeted practice challenge: "Build Express Error-Handling Middleware with Async/Await".'
    }
  ],

  chatHistory: [
    {
      id: 'chat-1',
      sender: 'ai',
      message: 'Hello Aaruran! 👋 I am your EduPath AI Learning Agent. I have analyzed your profile for the Full Stack Developer role. Your React and JavaScript foundations are strong (70-75%), but we need to accelerate your Node.js, Express, and Docker skills. Would you like to tackle your active practice challenge or explore Week 1 topics?',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    }
  ]
};

module.exports = state;
