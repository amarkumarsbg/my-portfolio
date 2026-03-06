import mongoose from 'mongoose'

export function isConnected(): boolean {
  return mongoose.connection.readyState === 1
}

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn(
      'MONGODB_URI not set - API will return empty data. Add .env with your MongoDB URI.'
    )
    return
  }
  try {
    await mongoose.connect(uri)
    console.info('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    console.warn('Server will run without DB - /api/projects returns []')
  }
}
