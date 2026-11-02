const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      },
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      },
      {
        name: 'Redux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      },
      {
        name: 'React Native',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'HTML5',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        name: 'Bootstrap',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      },
      {
        name: 'Sass',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      },
      { name: 'Zustand', icon: '/icons/zustand.svg' },
      { name: 'Radix UI', icon: '/icons/radix-ui.svg' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Express',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'GraphQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      },
      {
        name: 'Socket.io',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
      },
      {
        name: 'REST APIs',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      },
      {
        name: 'JWT Authentication',
        icon: '/icons/jwt.svg',
      },
      {
        name: 'SQL',
        icon: '/icons/sql.svg',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      },
      {
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      },
      { name: 'Prisma ORM', icon: '/icons/prisma.svg' },
      {
        name: 'Redis',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      },
    ],
  },
  {
    title: 'DevOps & Tools',
    skills: [
      {
        name: 'Docker',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      {
        name: 'AWS',
        icon: '/icons/aws.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'GitHub',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      },
      {
        name: 'VS Code',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      },
      {
        name: 'Linux',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      },
      {
        name: 'Postman',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
      },
      { name: 'CI/CD', icon: '/icons/cicd.svg' },
    ],
  },
  {
    title: 'Testing & QA',
    skills: [
      { name: 'Vitest', icon: '/icons/vitest.svg' },
      { name: 'Mocha', icon: '/icons/mocha.svg' },
      { name: 'Chai', icon: '/icons/chai.svg' },
    ],
  },
  {
    title: 'Cloud & Integrations',
    skills: [
      { name: 'Render', icon: '/icons/render.svg' },
      { name: 'Tally', icon: '/icons/tally.svg' },
      { name: 'Zoho', icon: '/icons/zoho.svg' },
      { name: 'QuickBooks', icon: '/icons/quickbooks.svg' },
      {
        name: 'Vercel',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
      },
    ],
  },
  {
    title: 'AI & ML Tools',
    skills: [
      {
        name: 'ChatGPT',
        icon: '/icons/ai.svg',
      },
      { name: 'OpenAI APIs', icon: '/icons/ai.svg' },
      {
        name: 'GitHub Copilot',
        icon: '/icons/copilot.svg',
      },
      {
        name: 'Gemini',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      },
      { name: 'Cursor', icon: '/icons/ai.svg' },
      {
        name: 'LangChain',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'Prompt Eng.',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
      },
    ],
  },
]

const skillBrandIconUrls: Record<string, string> = {
  aws: '/icons/aws.svg',
  ai: '/icons/ai.svg',
  'artificial intelligence': '/icons/ai.svg',
  'openai apis':
    'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  chatgpt:
    'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  cursor: 'https://www.cursor.com/favicon.ico',
  'cursor ai': 'https://www.cursor.com/favicon.ico',
  'github copilot':
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/githubcopilot.svg',
  gemini:
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg',
  langchain:
    'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg',
  'prompt eng.': '/icons/prompt-eng.svg',
}

const skillBrandIconFallbacks: Record<string, string> = {
  aws: '/icons/aws.svg',
  ai: '/icons/ai.svg',
  'artificial intelligence': '/icons/ai.svg',
  'openai apis': '/icons/openai.svg',
  chatgpt: '/icons/openai.svg',
  cursor: '/icons/cursor.svg',
  'cursor ai': '/icons/cursor.svg',
  'github copilot': '/icons/copilot.svg',
  gemini: '/icons/gemini.svg',
  langchain: '/icons/langchain.svg',
  'prompt eng.': '/icons/prompt-eng.svg',
}

function resolveSkillIcon(name: string, iconUrl?: string) {
  const normalizedName = name.trim().toLowerCase()
  return skillBrandIconUrls[normalizedName] || iconUrl || ''
}

const skillCategoryOverrides: Record<string, string> = {
  react: 'Frontend',
  'next.js': 'Frontend',
  typescript: 'Frontend',
  redux: 'Frontend',
  'tailwind css': 'Frontend',
  'react native': 'Frontend',
  bootstrap: 'Frontend',
  sass: 'Frontend',
  zustand: 'Frontend',
  'radix ui': 'Frontend',
  html: 'Frontend',
  html5: 'Frontend',
  css: 'Frontend',
  css3: 'Frontend',
  javascript: 'Frontend',
  'node.js': 'Backend',
  express: 'Backend',
  'express.js': 'Backend',
  mongodb: 'Backend',
  mysql: 'Backend',
  postgresql: 'Backend',
  prisma: 'Backend',
  graphql: 'Backend',
  'socket.io': 'Backend',
  'rest apis': 'Backend',
  redis: 'Backend',
  sql: 'Backend',
  'jwt authentication': 'Backend',
  docker: 'DevOps & Tools',
  aws: 'DevOps & Tools',
  git: 'DevOps & Tools',
  github: 'DevOps & Tools',
  'vs code': 'DevOps & Tools',
  linux: 'DevOps & Tools',
  postman: 'DevOps & Tools',
  vercel: 'Cloud & Integrations',
  render: 'Cloud & Integrations',
  tally: 'Cloud & Integrations',
  zoho: 'Cloud & Integrations',
  quickbooks: 'Cloud & Integrations',
  ai: 'AI & ML Tools',
  chatgpt: 'AI & ML Tools',
  gemini: 'AI & ML Tools',
  'cursor ai': 'AI & ML Tools',
  langchain: 'AI & ML Tools',
  'prompt eng.': 'AI & ML Tools',
  'github copilot': 'AI & ML Tools',
  'openai apis': 'AI & ML Tools',
  vitest: 'Testing & QA',
  mocha: 'Testing & QA',
  chai: 'Testing & QA',
  'ci/cd': 'DevOps & Tools',
}

const categoryOrder = [
  'Frontend',
  'Backend',
  'Testing & QA',
  'Cloud & Integrations',
  'DevOps & Tools',
  'AI & ML Tools',
]

export function Skills() {
  const { skills } = usePortfolioData()
  const categories =
    skills.length > 0
      ? (() => {
          const normalizedSkills = skills.map((skill) => {
            const name = String(skill.name || '')
            const fallbackIcon = skillCategories
              .flatMap((category) => category.skills)
              .find(
                (fallback) => fallback.name.toLowerCase() === name.toLowerCase()
              )?.icon
            return {
              name,
              title:
                skillCategoryOverrides[name.trim().toLowerCase()] ||
                String(skill.category || 'Other'),
              icon: resolveSkillIcon(
                name,
                typeof skill.iconUrl === 'string' && skill.iconUrl
                  ? skill.iconUrl
                  : fallbackIcon
              ),
              order: Number(skill.order ?? 0),
            }
          })
          const titles = Array.from(
            new Set(normalizedSkills.map((skill) => skill.title))
          ).sort((a, b) => {
            const aIndex = categoryOrder.indexOf(a)
            const bIndex = categoryOrder.indexOf(b)
            return (
              (aIndex < 0 ? categoryOrder.length : aIndex) -
              (bIndex < 0 ? categoryOrder.length : bIndex)
            )
          })
          return titles.map((title) => ({
            title,
            skills: normalizedSkills
              .filter((skill) => skill.title === title)
              .sort((a, b) => a.order - b.order)
              .map(({ name, icon }) => ({ name, icon })),
          }))
        })()
      : skillCategories.map((category) => ({
          ...category,
          skills: category.skills.map((skill) => ({
            ...skill,
            icon: resolveSkillIcon(skill.name, skill.icon),
          })),
        }))
  return (
    <section className="section" id="skills">
      <div className="skills-header">
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="skills-subtitle">
          Technologies I&apos;ve been working with over the past{' '}
          <strong>4+ years</strong>
        </p>
      </div>

      <div className="skills-categories">
        {categories.map((category) => (
          <div key={category.title} className="skills-category">
            <h3 className="skills-category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-card-inner">
                    <div className="skill-card-face skill-card-front">
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt=""
                          className="skill-icon"
                          loading="lazy"
                          onError={(event) => {
                            const image = event.currentTarget
                            const fallback =
                              skillBrandIconFallbacks[
                                skill.name.trim().toLowerCase()
                              ]
                            if (
                              fallback &&
                              image.dataset.fallbackApplied !== 'true'
                            ) {
                              image.dataset.fallbackApplied = 'true'
                              image.src = fallback
                            } else {
                              image.style.display = 'none'
                            }
                          }}
                        />
                      )}
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div
                      className="skill-card-face skill-card-back"
                      aria-hidden="true"
                    >
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-category-label">
                        {category.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
import { usePortfolioData } from '../context/PortfolioData'
