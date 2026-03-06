import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    repoUrl: { type: String, default: '' },
    techStack: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export type Project = InferSchemaType<typeof projectSchema>
export const ProjectModel = mongoose.model('Project', projectSchema)
