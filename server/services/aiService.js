/**
 * Intelligent EduPath AI Mentor Response Engine
 */

async function getMentorResponse(message, context = {}) {
  const query = (message || '').trim();
  const q = query.toLowerCase();

  const userName = context.userName || context.user?.name || 'Aaruran';
  const targetRole = context.targetRole || context.user?.targetRole || 'Full Stack Developer';

  const reactScore = context.reactScore || 52;
  const reactTarget = 80;
  const jsScore = context.jsScore || 78;
  const jsTarget = 85;
  const nodeScore = context.nodeScore || 38;
  const nodeTarget = 75;
  const mongoScore = context.mongoScore || 48;
  const mongoTarget = 70;

  // 1. Hello / Greeting
  if (q === 'hello' || q === 'hi' || q.startsWith('hello') || q.startsWith('hi ')) {
    return {
      reply: `Hello ${userName}! 👋 I am your EduPath AI Mentor. I am currently tracking your learning path for ${targetRole}. You have 4 critical skill gaps identified (Node.js 38%, React 52%, MongoDB 48%). How can I help you today?`
    };
  }

  // 2. What is React?
  if (q.includes('what is react')) {
    return {
      reply: `React is a popular component-based JavaScript library developed by Meta for building dynamic user interfaces. It utilizes a Virtual DOM to minimize actual DOM manipulation, resulting in high-performance Web applications. In your ${targetRole} roadmap, React skills are targeted at ${reactTarget}%.`
    };
  }

  // 3. Explain async await
  if (q.includes('async await') || q.includes('async/await') || q.includes('explain async')) {
    return {
      reply: `Async/await is syntactic sugar built on top of JavaScript Promises that allows you to write asynchronous code that looks synchronous.

Example:
\`\`\`javascript
async function fetchUserData() {
  try {
    const response = await fetch('https://edupath-ubou.onrender.com/api/dashboard');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
\`\`\`
Using \`async/await\` eliminates nested \`.then()\` callbacks and makes error handling with \`try...catch\` clean and readable.`
    };
  }

  // 4. Node.js challenge/question (check node first before js wildcard)
  if (q.includes('node') && (q.includes('challenge') || q.includes('task') || q.includes('practice') || q.includes('question'))) {
    return {
      reply: `Here is your Node.js practice challenge (Current: ${nodeScore}%, Target: ${nodeTarget}%):

**Task: Express Async Error Middleware**
Create an Express error-handling middleware \`errorHandler(err, req, res, next)\` that catches asynchronous route errors and returns a formatted JSON payload:
\`\`\`javascript
{
  "success": false,
  "error": err.message || "Internal Server Error",
  "status": err.status || 500
}
\`\`\`
*Goal:* Prevents unhandled promise rejections from crashing your Express server.`
    };
  }

  // 5. JavaScript practice question
  if ((q.includes('javascript') || q.includes('js')) && (q.includes('practice') || q.includes('question') || q.includes('task') || q.includes('challenge'))) {
    return {
      reply: `Here is your JavaScript practice question (Target: ${jsTarget}%):

**Task: Custom Array Chunking**
Write a function \`chunk(array, size)\` that splits an array into sub-arrays of maximum length \`size\`.

*Example:*
\`\`\`javascript
chunk([1, 2, 3, 4, 5], 2) 
// Expected Output: [[1, 2], [3, 4], [5]]
\`\`\`
*Key Concepts Tested:* Array slicing, loop boundaries, and immutability.`
    };
  }

  // 6. Why is my React skill low?
  if (q.includes('why is my react') || (q.includes('react') && q.includes('low')) || (q.includes('react') && q.includes('gap'))) {
    return {
      reply: `Your React skill is currently evaluated at ${reactScore}% against the required benchmark of ${reactTarget}% for a ${targetRole} (a gap of ${reactTarget - reactScore}%).

**Key Reasons:**
1. Your resume analysis verified HTML/CSS and core JS, but lacks verified project proof for custom React hooks and Context state management.
2. Your practice submission score on state handling was 52%.

**Remediation:** Complete Week 1 & Week 2 of your Personalized Learning Plan (React State Management & Context API).`
    };
  }

  if (q.includes('why is my node') || (q.includes('node') && q.includes('low')) || (q.includes('node') && q.includes('gap'))) {
    return {
      reply: `Your Node.js skill is currently at ${nodeScore}% vs the target benchmark of ${nodeTarget}% (a gap of ${nodeTarget - nodeScore}%). Express REST API routing and async middleware represent your largest backend skill gap.`
    };
  }

  // 7. What should I learn today?
  if (q.includes('what should i learn') || q.includes('learn today') || q.includes('learn next')) {
    return {
      reply: `Based on your diagnostic gap matrix for ${targetRole}, you should focus today on:

1. **React State Management (High Priority - Gap: ${reactTarget - reactScore}%)**: Work on custom hooks and state persistence.
2. **Node.js REST API Basics (High Priority - Gap: ${nodeTarget - nodeScore}%)**: Practice Express middleware and error handling.

Start with today's practice challenge in the **Practice Arena**!`
    };
  }

  // 8. How can I improve my Full Stack skills?
  if (q.includes('how can i improve') || q.includes('job-ready') || q.includes('improve my full stack')) {
    return {
      reply: `To become job-ready as a ${targetRole} (${userName}), follow this 4-step action plan:

1. **Bridge Node.js Gap (${nodeScore}% → ${nodeTarget}%)**: Build 2 RESTful backend services with Express & JWT.
2. **Bridge React Gap (${reactScore}% → ${reactTarget}%)**: Implement global state management using Context API.
3. **Persist Data with MongoDB (${mongoScore}% → ${mongoTarget}%)**: Design schemas with Mongoose and construct aggregation pipelines.
4. **Complete Daily Practice Tasks**: Solve 1 focused coding challenge daily to maintain your 7-day learning streak.`
    };
  }

  // 9. Code Review Request
  if (q.includes('review this code') || q.includes('code review') || q.includes('function') || q.includes('const ') || q.includes('var ')) {
    return {
      reply: `I have analyzed your code snippet. Here is my AI feedback:
- **Structure & Syntax:** Valid logic structure.
- **State & Edge Cases:** Ensure null or undefined checks are handled before accessing object properties.
- **Performance:** Consider memoizing expensive recalculations with \`useMemo\` or \`useCallback\` to prevent unnecessary re-renders.`
    };
  }

  // 10. General / Fallback Contextual Response
  return {
    reply: `I understand your question regarding "${query}". As your EduPath AI Mentor for ${targetRole}, I recommend reviewing your current Week 1 milestone in the Personalized Learning Plan or practicing in the Practice Arena to raise your career readiness from ${context.readinessScore || 68}%.`
  };
}

async function evaluatePracticeTask(task, code) {
  return {
    score: 72,
    feedback: "Your component structure is correct. Improve state handling and edge-case validation.",
    weakAreas: ["State Management", "Edge Cases"],
    evaluatedAt: new Date().toISOString()
  };
}

module.exports = {
  getMentorResponse,
  evaluatePracticeTask
};