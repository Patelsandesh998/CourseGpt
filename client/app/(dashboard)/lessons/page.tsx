"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, BookOpen, BrainCircuit, Target, CheckCircle2, Clock, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SubTopic {
  title: string
  content: string
  duration: number
  order: number
}

interface Lesson {
  _id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  subtopics: SubTopic[]
  createdAt: string
  updatedAt: string
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const { toast } = useToast()

  // Get unique difficulty levels from lessons
  const difficultyLevels = ['all', ...new Set(lessons.map(lesson => lesson.category))].filter(Boolean)

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("http://localhost:5000/api/lessons")
      
      if (!response.ok) {
        throw new Error("Failed to fetch lessons")
      }

      const data = await response.json()
      setLessons(data)
    } catch (error) {
      console.error("Error fetching lessons:", error)
      setError("Failed to load lessons. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to load lessons. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLesson = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/lessons/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete lesson");
      }
      
      // Remove the deleted lesson from state
      setLessons(prevLessons => prevLessons.filter(lesson => lesson._id !== id));
      
      toast({
        title: "Success",
        description: "Lesson successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast({
        title: "Error",
        description: "Failed to delete lesson. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to extract 3-4 random key components from subtopics
  const getRandomSubtopicHighlights = (subtopics: SubTopic[]) => {
    if (!subtopics.length) return [];
    
    // Shuffle the subtopics array and take 3-4 items
    const shuffled = [...subtopics].sort(() => 0.5 - Math.random());
    const count = Math.min(Math.max(3, Math.floor(Math.random() * 2) + 3), subtopics.length);
    return shuffled.slice(0, count).map(subtopic => subtopic.title);
  };

  // Filter lessons by selected difficulty level
  const filteredLessons = selectedDifficulty === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedDifficulty)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Lessons</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all your created lessons
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Filter by difficulty:</span>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              aria-label="Filter lessons by difficulty level"
            >
              {difficultyLevels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {lessons.length === 0 
                  ? "No lessons found. Create your first lesson to get started." 
                  : "No lessons found in this difficulty level."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredLessons.map((lesson) => {
            const keyHighlights = getRandomSubtopicHighlights(lesson.subtopics);
            return (
              <Card key={lesson._id} className="overflow-hidden border-2 hover:shadow-md transition-all duration-200">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                  <CardTitle className="flex items-center justify-between">
                    <span>{lesson.title}</span>
                    <div className="flex items-center gap-3 text-sm font-normal">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{lesson.category}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {lesson.duration} min
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                  <div className="pt-2">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Difficulty: {lesson.category}
                    </span>
                  </div>
                </CardHeader>
                {keyHighlights.length > 0 && (
                  <div className="px-6 py-3 bg-secondary/5 border-y">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm font-medium text-muted-foreground">Key components:</span>
                      {keyHighlights.map((highlight, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className={cn(
                            "bg-primary/5 hover:bg-primary/10 border-primary/20",
                            idx % 3 === 0 ? "bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/20" : 
                            idx % 3 === 1 ? "bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/20" : 
                            "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20"
                          )}
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <CardContent className="pt-4">
                  <Accordion type="multiple" className="w-full">
                    {lesson.subtopics.map((subtopic, index) => (
                      <AccordionItem key={index} value={`subtopic-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Subtopic {index + 1}:</span>
                              <span>{subtopic.title}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {subtopic.duration} min
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-2">
                              <h3 className="font-medium">Content</h3>
                              <p className="text-muted-foreground whitespace-pre-line">{subtopic.content}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-end p-4 pt-0">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteLesson(lesson._id)}
                    className="gap-1 transition-all hover:bg-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  )
}
