import { portfolioAbout, portfolioSkills } from './portfolioContext.js'
import { categoryForSkill, resumeSkills } from './resumeSkills.js'

export const fallbackCmsContent = {
  settings: {
    name: portfolioAbout.name,
    title: portfolioAbout.title,
    bio: portfolioAbout.bio,
    email: portfolioAbout.email,
    github: portfolioAbout.github,
    linkedin: portfolioAbout.linkedin,
    avatarUrl: '',
    resumeUrl: '/resume.pdf',
    seoTitle: `${portfolioAbout.name} — ${portfolioAbout.title}`,
    seoDescription: portfolioAbout.bio,
    chatbotSystemPrompt: '',
    chatbotWelcomeMessage: '',
  },
  projects: [
    {
      _id: 'fallback-mydetailos',
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
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-sk-academy',
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
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-1',
      title: 'MERN Blog',
      description:
        'Full-stack blogging platform with user authentication, CRUD operations, and a clean UI built with Tailwind CSS.',
      imageUrl:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
      liveUrl: '',
      repoUrl: 'https://github.com/amarkumarsbg/mern-blog',
      techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      order: 2,
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-2',
      title: 'Chat App',
      description:
        'Real-time messaging application with user authentication, online status, and instant message delivery.',
      imageUrl:
        'https://plus.unsplash.com/premium_vector-1724612296564-45d0558558f5?q=80&w=600&h=400&fit=crop',
      liveUrl: 'https://chat-app-50ne.onrender.com/',
      repoUrl: 'https://github.com/amarkumarsbg/chat-app',
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      order: 3,
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-3',
      title: 'Movix',
      description:
        'Movie discovery app with search, trending films, trailers, and detailed info powered by TMDB API.',
      imageUrl:
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop',
      liveUrl: '',
      repoUrl: 'https://github.com/amarkumarsbg/movix',
      techStack: ['React', 'Redux', 'TMDB API', 'CSS'],
      order: 4,
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-4',
      title: 'Food Delivery',
      description:
        'Online food ordering platform with cart management, order tracking, and a responsive storefront.',
      imageUrl:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      liveUrl: '',
      repoUrl: 'https://github.com/amarkumarsbg/food-del',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      order: 5,
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-5',
      title: 'Netflix Clone',
      description:
        'A Netflix-inspired streaming UI with movie browsing, trailers, and responsive design deployed on Vercel.',
      imageUrl:
        'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
      liveUrl: 'https://netflix-clone-three-flax.vercel.app',
      repoUrl: 'https://github.com/amarkumarsbg/netflix-clone',
      techStack: ['React', 'TMDB API', 'CSS'],
      order: 6,
      isPublished: true,
      isFeatured: true,
    },
    {
      _id: 'fallback-6',
      title: 'Gemini Clone',
      description:
        'A Google Gemini AI clone with conversational interface and AI-powered responses.',
      imageUrl:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      liveUrl: 'https://gemini-clone-five.vercel.app',
      repoUrl: 'https://github.com/amarkumarsbg/gemini-clone',
      techStack: ['React', 'AI', 'API', 'JavaScript'],
      order: 7,
      isPublished: true,
      isFeatured: true,
    },
  ],
  skills: portfolioSkills.map((name, order) => {
    const resumeSkill = resumeSkills.find(
      (skill) => skill.name.toLowerCase() === name.toLowerCase()
    )
    const extras: Record<string, { category: string; iconUrl: string }> = {
      Redux: {
        category: 'Frontend',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
      },
      'Socket.io': {
        category: 'Backend',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
      },
      Docker: {
        category: 'DevOps & Tools',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      },
      GraphQL: {
        category: 'Backend',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      },
      'React Native': {
        category: 'Frontend',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      AI: { category: 'AI & ML Tools', iconUrl: '/icons/ai.svg' },
      Gemini: { category: 'AI & ML Tools', iconUrl: '/icons/ai.svg' },
      LangChain: {
        category: 'AI & ML Tools',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      'Prompt Eng.': {
        category: 'AI & ML Tools',
        iconUrl:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
      },
    }
    const fallback = extras[name]
    return {
      _id: `fallback-skill-${order}`,
      name,
      category: categoryForSkill(name) ?? fallback?.category ?? 'Other',
      iconUrl: resumeSkill?.iconUrl ?? fallback?.iconUrl ?? '',
      order,
      isPublished: true,
    }
  }),
  services: [
    {
      _id: 'fallback-service-1',
      title: 'AI-Powered Applications',
      description:
        'Building intelligent apps with AI integrations, chatbots, and smart automation.',
      order: 0,
      isPublished: true,
    },
    {
      _id: 'fallback-service-2',
      title: 'Web Development',
      description:
        'Responsive, high-performance web applications with modern frameworks.',
      order: 1,
      isPublished: true,
    },
    {
      _id: 'fallback-service-3',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications using React Native.',
      order: 2,
      isPublished: true,
    },
    {
      _id: 'fallback-service-4',
      title: 'API Development',
      description:
        'Secure REST and GraphQL APIs with optimized database queries.',
      order: 3,
      isPublished: true,
    },
    {
      _id: 'fallback-service-5',
      title: 'UI/UX Design',
      description:
        'Accessible, responsive interfaces focused on clear user experiences.',
      order: 4,
      isPublished: true,
    },
    {
      _id: 'fallback-service-6',
      title: 'Content Writing',
      description: 'Technical blogs, documentation, and clear product copy.',
      order: 5,
      isPublished: true,
    },
  ],
  experience: [
    {
      _id: 'fallback-exp-1',
      role: 'Full Stack Developer',
      company: 'Startappss System India Pvt. Ltd.',
      period: 'Jul 2025 — Present',
      description:
        'Contributed to BluDot Rewards, a cashback platform using receipt uploads and linked cards. Built and maintained responsive React interfaces, integrated REST APIs, and delivered frontend features for Optima AI and Exiqo. Investigated production UI issues and worked with backend, QA, and product teams in an Agile workflow.',
      tech: [
        'React',
        'JavaScript',
        'REST APIs',
        'Tailwind CSS',
        'Bootstrap',
        'Sass',
      ],
      order: 0,
      isPublished: true,
    },
    {
      _id: 'fallback-exp-2',
      role: 'Back End Developer',
      company: 'Vyapar TaxOne',
      period: 'Mar 2025 — May 2025',
      description:
        'Developed accounting automation features with Node.js, Express, and MongoDB. Integrated Tally, Zoho, QuickBooks, and OpenAI APIs, optimized database queries, and resolved backend issues.',
      tech: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'OpenAI APIs',
        'Tally',
        'Zoho',
        'QuickBooks',
      ],
      order: 1,
      isPublished: true,
    },
    {
      _id: 'fallback-exp-3',
      role: 'Engineer',
      company: 'Virtusa · Clients: Google (IMA) and Bank of Montreal (BMO)',
      period: 'Aug 2021 — Nov 2024',
      description:
        'Developed and maintained Node.js REST APIs, supported Google IMA frontend issue resolution, and improved backend performance with Redis. Performed unit testing with Mocha and Chai, contributed to API migrations, and collaborated with client teams in Agile delivery.',
      tech: [
        'Node.js',
        'REST APIs',
        'Redis',
        'React',
        'Mocha',
        'Chai',
        'CI/CD',
      ],
      order: 2,
      isPublished: true,
    },
  ],
  certifications: [
    {
      _id: 'fallback-cert-1',
      title: 'Full Stack Web Development',
      issuer: 'Udemy',
      year: '2023',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      order: 0,
      isPublished: true,
    },
    {
      _id: 'fallback-cert-2',
      title: 'React — The Complete Guide',
      issuer: 'Udemy',
      year: '2023',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      order: 1,
      isPublished: true,
    },
    {
      _id: 'fallback-cert-3',
      title: 'Node.js & Express Masterclass',
      issuer: 'Udemy',
      year: '2022',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      order: 2,
      isPublished: true,
    },
    {
      _id: 'fallback-cert-4',
      title: 'MongoDB for Developers',
      issuer: 'MongoDB University',
      year: '2022',
      iconUrl:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      order: 3,
      isPublished: true,
    },
  ],
  testimonials: [
    {
      _id: 'fallback-testimonial-1',
      name: 'Rahul Sharma',
      role: 'Product Manager',
      text: 'Amar delivered an exceptional web application that exceeded our expectations. His attention to detail and clean code practices made the collaboration smooth and productive.',
      avatar: 'RS',
      order: 0,
      isPublished: true,
    },
    {
      _id: 'fallback-testimonial-2',
      name: 'Priya Verma',
      role: 'Startup Founder',
      text: 'Working with Amar was a great experience. He turned our rough idea into a polished, production-ready application.',
      avatar: 'PV',
      order: 1,
      isPublished: true,
    },
    {
      _id: 'fallback-testimonial-3',
      name: 'Vikram Patel',
      role: 'Senior Developer',
      text: 'Amar is a dedicated developer who solves complex problems and delivers quality code on time.',
      avatar: 'VP',
      order: 2,
      isPublished: true,
    },
  ],
  blog: [
    {
      _id: 'fallback-blog-1',
      title: 'Building Real-Time Apps with Socket.io and React',
      slug: 'realtime-apps-socket-io-react',
      excerpt:
        'Implementing WebSocket-based real-time communication in modern web applications.',
      date: 'Feb 2026',
      readTime: '8 min read',
      tag: 'Tutorial',
      content: '',
      order: 0,
      isPublished: true,
    },
    {
      _id: 'fallback-blog-2',
      title: 'Why I Switched from REST to GraphQL',
      slug: 'rest-to-graphql',
      excerpt:
        'Trade-offs and lessons from migrating an API from REST to GraphQL.',
      date: 'Jan 2026',
      readTime: '6 min read',
      tag: 'Opinion',
      content: '',
      order: 1,
      isPublished: true,
    },
    {
      _id: 'fallback-blog-3',
      title: 'Deploying MERN Apps with Docker & AWS',
      slug: 'deploy-mern-docker-aws',
      excerpt: 'Containerizing a MERN application and deploying it with CI/CD.',
      date: 'Dec 2025',
      readTime: '10 min read',
      tag: 'DevOps',
      content: '',
      order: 2,
      isPublished: true,
    },
  ],
}
