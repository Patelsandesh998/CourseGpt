import { Request, Response } from 'express'
import Lesson, { ILesson } from '../models/Lesson'

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { title, description, subtopics } = req.body

    if (!title || !description || !subtopics || !Array.isArray(subtopics)) {
      return res.status(400).json({ message: 'Invalid lesson data' })
    }

    // Transform the subtopics to match the expected schema
    const transformedSubtopics = subtopics.map((subtopic, index) => ({
      title: subtopic.title,
      content: subtopic.definition || subtopic.description,
      duration: subtopic.duration || 30, // Default duration in minutes
      order: index + 1
    }))

    const lesson = new Lesson({
      title,
      description,
      category: req.body.category || 'General',
      level: req.body.level || 'beginner',
      duration: req.body.duration || transformedSubtopics.reduce((total, st) => total + (st.duration || 30), 0),
      subtopics: transformedSubtopics
    })

    const savedLesson = await lesson.save()
    res.status(201).json({
      message: 'Lesson created successfully',
      lesson: savedLesson
    })
  } catch (error) {
    console.error('Error creating lesson:', error)
    res.status(500).json({ message: 'Error creating lesson' })
  }
}

export const getLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 })
    res.json(lessons)
  } catch (error) {
    console.error('Error fetching lessons:', error)
    res.status(500).json({ message: 'Error fetching lessons' })
  }
}

export const getLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }
    res.json(lesson)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    res.status(500).json({ message: 'Error fetching lesson' })
  }
}

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const { title, description, subtopics, category, level, duration } = req.body

    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    lesson.title = title || lesson.title
    lesson.description = description || lesson.description
    lesson.category = category || lesson.category
    lesson.level = level || lesson.level
    lesson.duration = duration || lesson.duration
    lesson.subtopics = subtopics || lesson.subtopics

    const updatedLesson = await lesson.save()
    res.json({
      message: 'Lesson updated successfully',
      lesson: updatedLesson
    })
  } catch (error) {
    console.error('Error updating lesson:', error)
    res.status(500).json({ message: 'Error updating lesson' })
  }
}

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' })
    }

    await lesson.deleteOne()
    res.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    res.status(500).json({ message: 'Error deleting lesson' })
  }
} 