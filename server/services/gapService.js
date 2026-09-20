const demoData = require('../data/demoData');

/**
 * Calculate skill gaps for a target role against current user skills.
 * Produces structured gaps with Gap value and Status (Strong, Improve, Critical).
 */
function calculateGaps(currentSkills, targetRole = 'Full Stack Developer') {
  const roleReqs = demoData.roleRequirements[targetRole] || demoData.roleRequirements['Full Stack Developer'];
  const skillMap = new Map();

  // Index user's current skills (case-insensitive)
  (currentSkills || []).forEach(s => {
    skillMap.set(s.name.toLowerCase(), s.proficiency || 0);
  });

  const gaps = roleReqs.map(req => {
    const key = req.skill.toLowerCase();
    const currentScore = skillMap.has(key) ? skillMap.get(key) : 0;
    const gap = Math.max(0, req.requiredScore - currentScore);

    let status = 'Strong';
    if (currentScore === 0 || gap > 25) {
      status = 'Critical';
    } else if (gap > 0) {
      status = 'Improve';
    }

    return {
      skill: req.skill,
      category: req.category,
      currentScore,
      requiredScore: req.requiredScore,
      gap,
      status,
      priority: status === 'Critical' ? 1 : (status === 'Improve' ? 2 : 3)
    };
  });

  // Sort: Critical first, then biggest gap descending
  gaps.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.gap - a.gap;
  });

  return gaps;
}

module.exports = { calculateGaps };
