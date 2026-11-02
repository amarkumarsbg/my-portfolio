import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
      index: true,
    },
  },
  { timestamps: true }
)

export type Contact = InferSchemaType<typeof contactSchema>
export const ContactModel = mongoose.model('Contact', contactSchema)
