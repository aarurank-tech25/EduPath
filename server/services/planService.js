const demoData = require('../data/demoData');

/**
 * Dynamic learning plan generator and updater.
 * Re-prioritizes curriculum based on current gaps and evaluation weaknesses.
 */
function generateAdaptivePlan(gaps, targetRole = 'Full Stack Developer') {
  const basePlan = JSON.parse(JSON.stringify(demoData.learningPlan));
  basePlan.targetRole = targetRole;
  basePlan.updatedAt = new Date().toISOString();

  // Identify top critical gaps
  const critical = (gaps || []).filter(g => g.status === 'Critical');
  if (critical.length > 0) {
    const topGapNames = critical.slice(0, 3).map(g => g.skill);
    // Mark early weeks that address these gaps
    basePlan.weeks.forEach(w => {
      const touchesCritical = w.focusSkills.some(fs => topGapNames.includes(fs));
      if (touchesCritical) {
        w.isHighPriority = true;
      }
    });
  }

  return basePlan;
}

/**
 * Agent Adaptation Hook:
 * When practice task evaluation detects weak areas, inject targeted adaptations into the active week.
 */
function adaptPlanWithWeakAreas(learningPlan, weakAreas, feedbackSummary) {
  if (!learningPlan || !learningPlan.weeks) return learningPlan;

  const currentWeek = learningPlan.weeks.find(w => w.status === 'in-progress') || learningPlan.weeks[0];

  if (currentWeek && weakAreas && weakAreas.length > 0) {
    const adaptiveObjectives = weakAreas.map(w => `⚡ AI Agent Drill: ${w}`);

    // Add unique objectives
    adaptiveObjectives.forEach(obj => {
      if (!currentWeek.objectives.includes(obj)) {
        currentWeek.objectives.splice(1, 0, obj); // inject near top of current week
      }
    });

    currentWeek.isAdapted = true;
    currentWeek.adaptationReason = `Weak areas diagnosed during task evaluation: ${weakAreas.join(', ')}`;
    learningPlan.lastAdaptedAt = new Date().toISOString();
  }

  return learningPlan;
}

module.exports = {
  generateAdaptivePlan,
  adaptPlanWithWeakAreas
};
