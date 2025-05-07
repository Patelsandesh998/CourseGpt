"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  GripVertical,
  X,
  Wand2,
  Loader2,
  BookOpen,
  Clock,
  GraduationCap,
  BarChart,
  CheckCircle2,
  Info,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Lesson {
  id: string
  title: string
  description?: string
  difficulty?: string
  duration?: string
}

export default function CreateCoursePage() {
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([])
  const [selectedLessons, setSelectedLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [suggestingSequence, setSuggestingSequence] = useState(false)
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    // Fetch lessons from your API
    const fetchLessons = async () => {
      try {
        // Make actual API call to backend
        const response = await fetch("http://localhost:5000/api/lessons")
        
        if (!response.ok) {
          throw new Error("Failed to fetch lessons")
        }
        
        const data = await response.json()
        
        // Transform the lesson data to match our interface
        const transformedLessons: Lesson[] = data.map((lesson: any) => ({
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          difficulty: lesson.category, // Using the category field as difficulty
          duration: `${lesson.duration} min`,
        }))
        
        setAvailableLessons(transformedLessons)
      } catch (error) {
        console.error("Error fetching lessons:", error)
        toast({
          title: "Error",
          description: "Failed to load lessons. Please try again later.",
          variant: "destructive",
        })
        
        // Fallback to empty array if fetch fails
        setAvailableLessons([])
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [toast])

  const handleAddLesson = (lesson: Lesson) => {
    setSelectedLessons([...selectedLessons, lesson])
    setAvailableLessons(availableLessons.filter((l) => l.id !== lesson.id))
  }

  const handleRemoveLesson = (lesson: Lesson) => {
    setAvailableLessons([...availableLessons, lesson])
    setSelectedLessons(selectedLessons.filter((l) => l.id !== lesson.id))
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(selectedLessons)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSelectedLessons(items)
  }

  const handleSuggestSequence = () => {
    // In a real implementation, this would call an AI endpoint to suggest the best sequence
    setSuggestingSequence(true)

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, we'll sort by difficulty level
      const sortedLessons = [...selectedLessons].sort((a, b) => {
        const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 }
        const aDifficulty = a.difficulty || "Intermediate"
        const bDifficulty = b.difficulty || "Intermediate"
        return (
          difficultyOrder[aDifficulty as keyof typeof difficultyOrder] -
          difficultyOrder[bDifficulty as keyof typeof difficultyOrder]
        )
      })

      setSelectedLessons(sortedLessons)
      setSuggestingSequence(false)

      toast({
        title: "Sequence Optimized",
        description: "The AI has suggested an optimal learning sequence for your course.",
        variant: "default",
      })
    }, 2000)
  }

  const handleCreateCourse = () => {
    if (!courseTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a course title.",
        variant: "destructive",
      })
      return
    }

    if (selectedLessons.length === 0) {
      toast({
        title: "No Lessons Selected",
        description: "Please add at least one lesson to your course.",
        variant: "destructive",
      })
      return
    }

    // In a real implementation, this would save the course to MongoDB
    toast({
      title: "Course Created Successfully",
      description: "Your course has been created and is now available.",
    })

    // Reset the form
    setCourseTitle("")
    setCourseDescription("")
    setDifficulty("")
    setEstimatedTime("")
    // We would typically reload the lessons from the API here
  }

  const getDifficultyColor = (difficulty = "Beginner") => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-blue-100 text-blue-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get unique difficulty levels
  const difficultyLevels = ["all", ...new Set(availableLessons.map(lesson => lesson.difficulty || "unspecified"))].filter(Boolean)
  
  // Filter lessons by difficulty
  const filteredLessons = difficultyFilter === "all" 
    ? availableLessons 
    : availableLessons.filter(lesson => lesson.difficulty === difficultyFilter)

  if (loading) {
    return (
      <div className="container py-6 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading available lessons...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground mt-1">Combine lessons into a structured learning experience</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Course Templates</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose from pre-designed course templates</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card className="bg-gradient-to-b from-background to-muted/30 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Course Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Course Title <span className="text-destructive">*</span>
                </label>
                <Input
                  id="title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Enter course title"
                  className="bg-background"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Enter course description"
                  rows={4}
                  className="bg-background"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium mb-1">
                    Difficulty Level
                  </label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-1">
                    Estimated Completion Time
                  </label>
                  <Input
                    id="time"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="e.g., 10 hours"
                    className="bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Available Lessons
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Filter by:</span>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="h-8 w-[160px]">
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level === 'all' 
                            ? 'All Levels' 
                            : level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {availableLessons.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    No lessons available. Create new lessons in the Generate Topics section.
                  </p>
                </div>
              ) : filteredLessons.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    No lessons found with the selected difficulty level. Try a different filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLessons.map((lesson) => (
                    <Card key={lesson.id} className="border shadow-sm hover:shadow-md transition-all duration-200">
                      <CardHeader className="py-3 px-4 bg-muted/20">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium">{lesson.title}</CardTitle>
                          {lesson.difficulty && (
                            <Badge className={`${getDifficultyColor(lesson.difficulty)}`}>
                              {lesson.difficulty}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="py-3">
                        <div className="space-y-3">
                          {lesson.description && (
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4">
                            {lesson.duration && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{lesson.duration}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <BarChart className="h-4 w-4" />
                              <span>Difficulty: {lesson.difficulty || "Not specified"}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddLesson(lesson)}
                            className="w-full mt-2"
                          >
                            Add to Course
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-to-b from-background to-muted/30 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Course Structure
              </CardTitle>
              {selectedLessons.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSuggestSequence}
                  disabled={suggestingSequence}
                  className="gap-2"
                >
                  {suggestingSequence ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Optimize Sequence
                    </>
                  )}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {selectedLessons.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-md">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Add lessons from the available list to build your course</p>
                  <p className="text-sm text-muted-foreground mt-2">Drag and drop to reorder lessons once added</p>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="lessons">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                        {selectedLessons.map((lesson, index) => (
                          <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="flex items-center p-3 border rounded-md bg-background shadow-sm"
                              >
                                <div {...provided.dragHandleProps} className="mr-3 text-muted-foreground">
                                  <GripVertical className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                      {index + 1}. {lesson.title}
                                    </span>
                                    {lesson.difficulty && (
                                      <Badge
                                        className={`${getDifficultyColor(lesson.difficulty)} ml-auto`}
                                        variant="outline"
                                      >
                                        {lesson.difficulty}
                                      </Badge>
                                    )}
                                  </div>
                                  {lesson.description && (
                                    <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                                  )}
                                  {lesson.duration && (
                                    <div className="flex items-center gap-2 text-sm mt-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span>{lesson.duration}</span>
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveLesson(lesson)}
                                  className="text-destructive ml-2"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}

              {selectedLessons.length > 0 && (
                <div className="mt-6 p-4 bg-muted/50 rounded-md border border-dashed flex items-start gap-3">
                  <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Course Summary</p>
                    <p className="mt-1">Total lessons: {selectedLessons.length}</p>
                    <p>
                      Estimated duration:{" "}
                      {selectedLessons.reduce((total, lesson) => {
                        if (!lesson.duration) return total
                        const match = lesson.duration.match(/(\d+(\.\d+)?)/)
                        if (!match) return total
                        return total + Number.parseFloat(match[1])
                      }, 0)}{" "}
                      hours
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-end">
            <Button
              size="lg"
              onClick={handleCreateCourse}
              className="gap-2 shadow-md"
              disabled={!courseTitle || selectedLessons.length === 0}
            >
              <CheckCircle2 className="h-4 w-4" />
              Create Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
