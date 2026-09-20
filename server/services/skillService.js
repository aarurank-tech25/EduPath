// Comprehensive Skill Dictionary with boundary-aware regular expressions
const SKILL_PATTERNS = [
  { name: 'JavaScript', category: 'Languages', pattern: /\b(javascript|es6|es202\d|vanilla js)\b/i, weight: 1.0 },
  { name: 'TypeScript', category: 'Languages', pattern: /\b(typescript|ts)\b/i, weight: 1.0 },
  { name: 'Python', category: 'Languages', pattern: /\b(python|python3|py)\b/i, weight: 1.0 },
  { name: 'Java', category: 'Languages', pattern: /\b(java)\b(?!script)/i, weight: 1.0 },
  { name: 'C++', category: 'Languages', pattern: /\b(c\+\+)\b/i, weight: 1.0 },
  { name: 'C', category: 'Languages', pattern: /\b(c)\b(?!\+\+|#|ss)/i, weight: 0.8 },
  
  // Frontend
  { name: 'React', category: 'Frontend', pattern: /\b(react|reactjs|react\.js)\b/i, weight: 1.0 },
  { name: 'HTML/CSS', category: 'Frontend', pattern: /\b(html|html5|css|css3|sass|scss)\b/i, weight: 1.0 },
  { name: 'Tailwind CSS', category: 'Frontend', pattern: /\b(tailwind|tailwindcss)\b/i, weight: 0.9 },
  { name: 'Next.js', category: 'Frontend', pattern: /\b(next|nextjs|next\.js)\b/i, weight: 1.0 },
  { name: 'Redux', category: 'Frontend', pattern: /\b(redux|redux toolkit)\b/i, weight: 0.9 },
  { name: 'Vue', category: 'Frontend', pattern: /\b(vue|vuejs|vue\.js)\b/i, weight: 1.0 },
  { name: 'Angular', category: 'Frontend', pattern: /\b(angular|angularjs)\b/i, weight: 1.0 },

  // Backend
  { name: 'Node.js', category: 'Backend', pattern: /\b(node|nodejs|node\.js)\b/i, weight: 1.0 },
  { name: 'Express', category: 'Backend', pattern: /\b(express|expressjs|express\.js)\b/i, weight: 1.0 },
  { name: 'REST APIs', category: 'Backend', pattern: /\b(rest|restful|rest api|rest apis|api development)\b/i, weight: 1.0 },
  { name: 'GraphQL', category: 'Backend', pattern: /\b(graphql)\b/i, weight: 1.0 },
  { name: 'FastAPI', category: 'Backend', pattern: /\b(fastapi)\b/i, weight: 0.9 },
  { name: 'Django', category: 'Backend', pattern: /\b(django)\b/i, weight: 0.9 },

  // Database
  { name: 'MongoDB', category: 'Database', pattern: /\b(mongodb|mongo|mongoose)\b/i, weight: 1.0 },
  { name: 'SQL', category: 'Database', pattern: /\b(sql|mysql|postgresql|postgres|sqlite)\b/i, weight: 1.0 },
  { name: 'Redis', category: 'Database', pattern: /\b(redis)\b/i, weight: 0.9 },
  { name: 'PostgreSQL', category: 'Database', pattern: /\b(postgresql|postgres)\b/i, weight: 1.0 },

  // DevOps & Cloud
  { name: 'Git', category: 'DevOps & Tools', pattern: /\b(git|github|version control)\b/i, weight: 1.0 },
  { name: 'Docker', category: 'DevOps & Tools', pattern: /\b(docker|containers|dockerfile)\b/i, weight: 1.0 },
  { name: 'Kubernetes', category: 'DevOps & Tools', pattern: /\b(kubernetes|k8s)\b/i, weight: 1.0 },
  { name: 'AWS', category: 'DevOps & Tools', pattern: /\b(aws|amazon web services|ec2|s3|lambda)\b/i, weight: 1.0 },
  { name: 'Linux', category: 'DevOps & Tools', pattern: /\b(linux|ubuntu|bash|shell scripting)\b/i, weight: 0.9 },
  { name: 'CI/CD', category: 'DevOps & Tools', pattern: /\b(ci\/cd|github actions|jenkins)\b/i, weight: 0.9 },

  // Core CS & AI
  { name: 'Data Structures', category: 'Core CS', pattern: /\b(data structures|algorithms|dsa|problem solving)\b/i, weight: 1.0 },
  { name: 'Machine Learning', category: 'AI & Data', pattern: /\b(machine learning|ml|scikit-learn|pandas|numpy)\b/i, weight: 1.0 },
  { name: 'Artificial Intelligence', category: 'AI & Data', pattern: /\b(artificial intelligence|ai|deep learning|llm|nlp)\b/i, weight: 1.0 }
];

/**
 * Scan text to detect matching skills and contextual scores
 */
function extractSkillsFromText(text) {
  if (!text || typeof text !== 'string') return [];

  const foundSkills = [];
  const lower = text.toLowerCase();

  for (const item of SKILL_PATTERNS) {
    const matches = lower.match(new RegExp(item.pattern, 'gi'));
    if (matches && matches.length > 0) {
      // Estimate score based on occurrence frequency, context clues (e.g. project, lead, senior, certified)
      const count = matches.length;
      let score = 55; // baseline detected score

      if (count >= 3) score += 15;
      else if (count >= 2) score += 10;

      // Check for proximity to positive indicators
      if (/(\byears\b|\bproficient\b|\bexperienced\b|\bcertified\b|\barchitected\b)/i.test(text)) {
        score += 10;
      }

      // Cap between 40 and 95
      score = Math.min(Math.max(score, 40), 95);

      foundSkills.push({
        name: item.name,
        category: item.category,
        proficiency: score,
        verifiedFromResume: true,
        matchCount: count
      });
    }
  }

  return foundSkills;
}

module.exports = {
  SKILL_PATTERNS,
  extractSkillsFromText
};
