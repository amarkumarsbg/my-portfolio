import type { Project } from '../types/project'

export const dummyProjects: Project[] = [
  {
    _id: '1',
    title: 'E-Commerce Store',
    description:
      'Full-stack online store with cart, checkout, and user authentication. Built with React and Node.js.',
    imageUrl: 'https://placehold.co/600x400/1a1a2e/eee?text=E-Commerce',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    order: 0,
  },
  {
    _id: '2',
    title: 'Task Management App',
    description:
      'Kanban-style task board with drag-and-drop. Real-time updates and team collaboration features.',
    imageUrl: 'https://placehold.co/600x400/16213e/eee?text=Task+App',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    techStack: ['React', 'TypeScript', 'Firebase'],
    order: 1,
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description:
      'Clean weather app with forecasts, maps, and multiple city support. Uses OpenWeather API.',
    imageUrl: 'https://placehold.co/600x400/0f3460/eee?text=Weather',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    techStack: ['React', 'API', 'Tailwind CSS'],
    order: 2,
  },
]

export const dummySkills = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Git',
  'REST APIs',
  'HTML/CSS',
]

export const dummyAbout = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  bio: 'Passionate about building clean, efficient web applications. I enjoy turning complex problems into simple solutions through code.',
  email: 'your.email@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
}
