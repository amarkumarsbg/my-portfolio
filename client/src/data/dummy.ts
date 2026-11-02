import type { Project } from '../types/project'

export const dummyProjects: Project[] = [
  {
    _id: 'featured-mydetailos',
    title: 'MyDetailOS — Workshop Management Platform',
    description:
      'A workshop platform connecting bookings, inspections, job cards, inventory, billing, staff workflows, and a customer portal.',
    imageUrl: '/projects/mydetailos-overview.png',
    liveUrl: 'https://www.mydetailos.com/',
    repoUrl: '',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
    ],
    order: 0,
  },
  {
    _id: 'featured-sk-academy',
    title: 'SK Academy — School Management System',
    description:
      'A full-stack school platform pairing a public admissions and information site with a staff portal for site content, student records, and admission inquiries.',
    imageUrl:
      'https://res.cloudinary.com/drlpwb53a/image/upload/v1783538312/sk-academy/images/wduka7m9tzycgatgthmt.jpg',
    liveUrl: 'https://www.skacademy.net/',
    repoUrl: '',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
    ],
    order: 1,
  },
  {
    _id: '1',
    title: 'MERN Blog',
    description:
      'Full-stack blogging platform with user authentication, CRUD operations, and a clean UI built with Tailwind CSS.',
    imageUrl:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: 'https://github.com/amarkumarsbg/mern-blog',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    order: 0,
  },
  {
    _id: '2',
    title: 'Chat App',
    description:
      'Real-time messaging application with user authentication, online status, and instant message delivery.',
    imageUrl:
      'https://plus.unsplash.com/premium_vector-1724612296564-45d0558558f5?q=80&w=600&h=400&fit=crop',
    liveUrl: 'https://chat-app-50ne.onrender.com/',
    repoUrl: 'https://github.com/amarkumarsbg/chat-app',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    order: 1,
  },
  {
    _id: '3',
    title: 'Movix',
    description:
      'Movie discovery app with search, trending films, trailers, and detailed info powered by TMDB API.',
    imageUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: 'https://github.com/amarkumarsbg/movix',
    techStack: ['React', 'Redux', 'TMDB API', 'CSS'],
    order: 2,
  },
  {
    _id: '4',
    title: 'Food Delivery',
    description:
      'Online food ordering platform with cart management, order tracking, and a responsive storefront.',
    imageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    liveUrl: '',
    repoUrl: 'https://github.com/amarkumarsbg/food-del',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    order: 3,
  },
  {
    _id: '5',
    title: 'Netflix Clone',
    description:
      'A Netflix-inspired streaming UI with movie browsing, trailers, and responsive design deployed on Vercel.',
    imageUrl:
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
    liveUrl: 'https://netflix-clone-three-flax.vercel.app',
    repoUrl: 'https://github.com/amarkumarsbg/netflix-clone',
    techStack: ['React', 'TMDB API', 'CSS'],
    order: 4,
  },
  {
    _id: '6',
    title: 'Gemini Clone',
    description:
      'A Google Gemini AI clone with conversational interface and AI-powered responses.',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    liveUrl: 'https://gemini-clone-five.vercel.app',
    repoUrl: 'https://github.com/amarkumarsbg/gemini-clone',
    techStack: ['React', 'AI', 'API', 'JavaScript'],
    order: 5,
  },
]

export const dummySkills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Redux',
  'Socket.io',
  'Tailwind CSS',
  'Docker',
  'AWS',
  'GraphQL',
  'REST APIs',
  'Git',
  'React Native',
  'AI',
]

export const dummyAbout = {
  name: 'Amar',
  title: 'Full Stack Developer',
  bio: 'Passionate about building clean, efficient web applications. I enjoy turning complex problems into simple solutions through code.',
  email: 'amarkumarsbg13@gmail.com',
  github: 'https://github.com/amarkumarsbg',
  linkedin: 'https://www.linkedin.com/in/amarkumarsbg/',
}
