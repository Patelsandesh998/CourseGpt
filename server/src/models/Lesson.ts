import mongoose, { Schema, Document } from 'mongoose'

export interface ISubTopic {
  title: string
  content: string
  duration: number
  order: number
}

export interface ILesson extends Document {
  title: string
  description: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  subtopics: ISubTopic[]
  createdAt: Date
  updatedAt: Date
}

const SubTopicSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  duration: { type: Number, required: true },
  order: { type: Number, required: true }
})

const LessonSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { 
    type: String, 
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: { type: Number, required: true },
  subtopics: [SubTopicSchema]
}, {
  timestamps: true
})

export default mongoose.model<ILesson>('Lesson', LessonSchema) 