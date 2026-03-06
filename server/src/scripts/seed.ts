import 'dotenv/config'
import mongoose from 'mongoose'
import { ProjectModel } from '../models/Project.js'

const sampleProjects = [
  {
    title: 'Project One',
    description: 'A full-stack app built with React and Node.js',
    techStack: ['React', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
    order: 0,
  },
  {
    title: 'Project Two',
    description: 'Another great project showcasing my skills',
    techStack: ['TypeScript', 'Express'],
    order: 1,
  },
]

async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI required. Add it to .env')
    process.exit(1)
  }
  await mongoose.connect(uri)
  await ProjectModel.deleteMany({})
  await ProjectModel.insertMany(sampleProjects)
  console.log('Seeded', sampleProjects.length, 'projects')
  await mongoose.disconnect()
}

seed().catch(console.error)
