const devicon = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`

export const resumeSkills = [
  { name: 'React', category: 'Frontend', iconUrl: devicon('react') },
  { name: 'Next.js', category: 'Frontend', iconUrl: devicon('nextjs') },
  {
    name: 'TypeScript',
    category: 'Frontend',
    iconUrl: devicon('typescript'),
  },
  { name: 'HTML5', category: 'Frontend', iconUrl: devicon('html5') },
  { name: 'CSS3', category: 'Frontend', iconUrl: devicon('css3') },
  {
    name: 'JavaScript',
    category: 'Frontend',
    iconUrl: devicon('javascript'),
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    iconUrl: devicon('tailwindcss'),
  },
  { name: 'Bootstrap', category: 'Frontend', iconUrl: devicon('bootstrap') },
  { name: 'Sass', category: 'Frontend', iconUrl: devicon('sass') },
  {
    name: 'Zustand',
    category: 'Frontend',
    iconUrl: '/icons/zustand.svg',
  },
  {
    name: 'Radix UI',
    category: 'Frontend',
    iconUrl: '/icons/radix-ui.svg',
  },
  { name: 'Node.js', category: 'Backend', iconUrl: devicon('nodejs') },
  { name: 'Express.js', category: 'Backend', iconUrl: devicon('express') },
  { name: 'REST APIs', category: 'Backend', iconUrl: devicon('fastapi') },
  {
    name: 'JWT Authentication',
    category: 'Backend',
    iconUrl: '/icons/jwt.svg',
  },
  { name: 'SQL', category: 'Backend', iconUrl: '/icons/sql.svg' },
  {
    name: 'PostgreSQL',
    category: 'Backend',
    iconUrl: devicon('postgresql'),
  },
  { name: 'MongoDB', category: 'Backend', iconUrl: devicon('mongodb') },
  { name: 'MySQL', category: 'Backend', iconUrl: devicon('mysql') },
  { name: 'Prisma ORM', category: 'Backend', iconUrl: '/icons/prisma.svg' },
  { name: 'Redis', category: 'Backend', iconUrl: devicon('redis') },
  { name: 'Vitest', category: 'Testing & QA', iconUrl: '/icons/vitest.svg' },
  { name: 'Mocha', category: 'Testing & QA', iconUrl: '/icons/mocha.svg' },
  { name: 'Chai', category: 'Testing & QA', iconUrl: '/icons/chai.svg' },
  { name: 'CI/CD', category: 'DevOps & Tools', iconUrl: '/icons/cicd.svg' },
  { name: 'AWS', category: 'DevOps & Tools', iconUrl: '/icons/aws.svg' },
  { name: 'Git', category: 'DevOps & Tools', iconUrl: devicon('git') },
  { name: 'GitHub', category: 'DevOps & Tools', iconUrl: devicon('github') },
  { name: 'Postman', category: 'DevOps & Tools', iconUrl: devicon('postman') },
  { name: 'VS Code', category: 'DevOps & Tools', iconUrl: devicon('vscode') },
  {
    name: 'Vercel',
    category: 'Cloud & Integrations',
    iconUrl: devicon('vercel'),
  },
  {
    name: 'Render',
    category: 'Cloud & Integrations',
    iconUrl: '/icons/render.svg',
  },
  {
    name: 'Tally',
    category: 'Cloud & Integrations',
    iconUrl: '/icons/tally.svg',
  },
  {
    name: 'Zoho',
    category: 'Cloud & Integrations',
    iconUrl: '/icons/zoho.svg',
  },
  {
    name: 'QuickBooks',
    category: 'Cloud & Integrations',
    iconUrl: '/icons/quickbooks.svg',
  },
  {
    name: 'OpenAI APIs',
    category: 'AI & ML Tools',
    iconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  },
  {
    name: 'ChatGPT',
    category: 'AI & ML Tools',
    iconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  },
  {
    name: 'Cursor',
    category: 'AI & ML Tools',
    iconUrl: 'https://www.cursor.com/favicon.ico',
  },
  {
    name: 'GitHub Copilot',
    category: 'AI & ML Tools',
    iconUrl:
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/githubcopilot.svg',
  },
  {
    name: 'Gemini',
    category: 'AI & ML Tools',
    iconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg',
  },
  {
    name: 'LangChain',
    category: 'AI & ML Tools',
    iconUrl:
      'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg',
  },
  {
    name: 'Prompt Eng.',
    category: 'AI & ML Tools',
    iconUrl: '/icons/prompt-eng.svg',
  },
] as const

export function categoryForSkill(name: string) {
  return resumeSkills.find(
    (skill) => skill.name.toLowerCase() === name.trim().toLowerCase()
  )?.category
}
