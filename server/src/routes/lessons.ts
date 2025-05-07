import express, { Request, Response } from 'express'
import {
  createLesson,
  getLessons,
  getLesson,
  updateLesson,
  deleteLesson
} from '../controllers/lessonController'
import Lesson from '../models/Lesson'

const router = express.Router()

// Lesson routes
router.post('/', createLesson)
router.get('/', getLessons)
// Get all lessons - specific routes must come before parameter routes
router.get('/all', async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 })
    res.status(200).json(lessons)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lessons' })
  }
})
router.get('/:id', getLesson)
router.put('/:id', updateLesson)
router.delete('/:id', deleteLesson)

export { router } 