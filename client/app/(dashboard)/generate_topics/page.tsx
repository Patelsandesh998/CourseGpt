"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertCircle,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Loader2,
  Sparkles,
  Target,
  Wand2,
  X,
  Edit,
  Plus,
  Trash2,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SubTopic {
  title: string
  description: string
  definition: string
  outcome: string
  activities: string[]
  keyConcepts: string[]
}

interface LessonContent {
  title: string
  description: string
  subtopics: SubTopic[]
  category: string
}

export default function GenerateTopicsPage() {
  const [topicName, setTopicName] = useState("")
  const [loading, setLoading] = useState(false)
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeSubtopic, setActiveSubtopic] = useState<number>(0)
  const [subtopicCount, setSubtopicCount] = useState<string>("5")
  const [activeAccordionItem, setActiveAccordionItem] = useState<string>("title")
  const [focusTitle, setFocusTitle] = useState(false)
  const [category, setCategory] = useState<string>("beginner")
  const titleInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Effect to focus the title input when a new subtopic is added
  useEffect(() => {
    if (focusTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
      setFocusTitle(false)
    }
  }, [focusTitle, activeSubtopic])

  // Function to generate lesson content using Gemini API
  const generateLessonContent = async (topic: string) => {
    setLoading(true)
    setError(null)

    try {
      if (!process.env.NEXT_PUBLIC_API_GEMINI_KEY) {
        throw new Error("API key is not configured. Please check your environment variables.")
      }

      // Construct the prompt for Gemini API
      const prompt = `
You are an AI educational assistant.

Create a structured and comprehensive lesson plan based on the topic: "${topic}". 

Break down this topic into ${subtopicCount} different subtopics. The output should be a well-formatted JSON object with the following structure:

{
  "title": "A compelling and creative title for the main lesson",
  "description": "A concise yet engaging overview of what the lesson is about",
  "subtopics": [
    {
      "title": "Subtopic 1 Title",
      "description": "A concise yet engaging overview of this subtopic",
      "definition": "Clear definition of this subtopic",
      "outcome": "What learners will achieve after studying this subtopic",
      "activities": ["2-3 interactive or reflective activities to reinforce learning"],
      "keyConcepts": ["2-3 core concepts specific to this subtopic"]
    },
    {
      "title": "Subtopic 2 Title",
      "description": "A concise yet engaging overview of this subtopic",
      "definition": "Clear definition of this subtopic",
      "outcome": "What learners will achieve after studying this subtopic",
      "activities": ["2-3 interactive or reflective activities to reinforce learning"],
      "keyConcepts": ["2-3 core concepts specific to this subtopic"]
    }
    // And so on for all ${subtopicCount} subtopics
  ]
}

Make the content suitable for learners and educators. Ensure clarity, educational value, and alignment with pedagogical best practices.

Return ONLY the JSON object, without any extra explanation or formatting.
`

      // Call Gemini API
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          process.env.NEXT_PUBLIC_API_GEMINI_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4096,
            },
          }),
        },
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `API request failed with status ${response.status}: ${errorData?.error?.message || "Unknown error"}`,
        )
      }

      const data = await response.json()

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from API")
      }

      // Extract the text content from the response
      const textContent = data.candidates[0].content.parts[0].text.trim()

      // Try to parse the JSON directly
      let parsedContent
      try {
        parsedContent = JSON.parse(textContent)
      } catch (parseError) {
        // If direct parsing fails, try to extract JSON from markdown
        const jsonMatch = textContent.match(/```json\n([\s\S]*?)\n```/) || textContent.match(/{[\s\S]*}/)
        if (!jsonMatch) {
          throw new Error("Could not find valid JSON in the response")
        }
        parsedContent = JSON.parse(jsonMatch[1] || jsonMatch[0])
      }

      // Validate the parsed content structure
      const requiredFields = ["title", "description", "subtopics"]
      const missingFields = requiredFields.filter((field) => !(field in parsedContent))
      if (missingFields.length > 0) {
        throw new Error(`Response is missing required fields: ${missingFields.join(", ")}`)
      }

      // Set the lesson content
      setLessonContent({
        ...parsedContent,
        category
      })
      setActiveSubtopic(0)
      setActiveAccordionItem("title")

      toast({
        title: "Content Generated",
        description: `Lesson content for '${topic}' with ${parsedContent.subtopics.length} subtopics has been generated successfully.`,
      })
    } catch (error) {
      console.error("Error generating content:", error)
      setError(error instanceof Error ? error.message : "Failed to generate lesson content. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate lesson content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (topicName.trim()) {
      generateLessonContent(topicName)
    }
  }

  const handleOpenConfirmDialog = () => {
    setConfirmDialogOpen(true)
  }

  const handleCreateLesson = async () => {
    try {
      if (!lessonContent) {
        throw new Error("No lesson content to save")
      }

      // Check if server is available
      try {
        const healthCheck = await fetch("http://localhost:5000/health")
        if (!healthCheck.ok) {
          throw new Error("Backend server is not responding")
        }
      } catch (error) {
        throw new Error("Cannot connect to backend server. Please make sure it's running.")
      }

      const response = await fetch("http://localhost:5000/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(lessonContent),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          errorData?.message || 
          `Failed to save lesson. Status: ${response.status}`
        )
      }

      const data = await response.json()

      toast({
        title: "Lesson Created",
        description: data.message || "Your lesson has been saved successfully.",
      })

      // Reset the form
      setTopicName("")
      setLessonContent(null)
      setConfirmDialogOpen(false)
    } catch (error) {
      console.error("Error saving lesson:", error)
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to save lesson. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Update handlers for editable content
  const updateSubtopicField = (subtopicIndex: number, field: keyof SubTopic, value: string | string[]) => {
    if (!lessonContent) return
    const updatedSubtopics = [...lessonContent.subtopics]

    if (field === "activities" || field === "keyConcepts") {
      // Handle array fields
      updatedSubtopics[subtopicIndex] = {
        ...updatedSubtopics[subtopicIndex],
        [field]: value as string[],
      }
    } else {
      // Handle string fields
      updatedSubtopics[subtopicIndex] = {
        ...updatedSubtopics[subtopicIndex],
        [field]: value as string,
      }
    }

    setLessonContent({ ...lessonContent, subtopics: updatedSubtopics })
  }

  const updateArrayItem = (
    subtopicIndex: number,
    field: "activities" | "keyConcepts",
    itemIndex: number,
    value: string,
  ) => {
    if (!lessonContent) return
    const updatedSubtopics = [...lessonContent.subtopics]
    const updatedArray = [...updatedSubtopics[subtopicIndex][field]]
    updatedArray[itemIndex] = value

    updatedSubtopics[subtopicIndex] = {
      ...updatedSubtopics[subtopicIndex],
      [field]: updatedArray,
    }

    setLessonContent({ ...lessonContent, subtopics: updatedSubtopics })
  }

  const addArrayItem = (subtopicIndex: number, field: "activities" | "keyConcepts") => {
    if (!lessonContent) return
    const updatedSubtopics = [...lessonContent.subtopics]
    const updatedArray = [...updatedSubtopics[subtopicIndex][field], ""]

    updatedSubtopics[subtopicIndex] = {
      ...updatedSubtopics[subtopicIndex],
      [field]: updatedArray,
    }

    setLessonContent({ ...lessonContent, subtopics: updatedSubtopics })
  }

  const removeArrayItem = (subtopicIndex: number, field: "activities" | "keyConcepts", itemIndex: number) => {
    if (!lessonContent) return
    const updatedSubtopics = [...lessonContent.subtopics]
    const updatedArray = [...updatedSubtopics[subtopicIndex][field]]
    updatedArray.splice(itemIndex, 1)

    updatedSubtopics[subtopicIndex] = {
      ...updatedSubtopics[subtopicIndex],
      [field]: updatedArray,
    }

    setLessonContent({ ...lessonContent, subtopics: updatedSubtopics })
  }

  const updateTitle = (value: string) => {
    if (!lessonContent) return
    setLessonContent({ ...lessonContent, title: value })
  }

  const updateDescription = (value: string) => {
    if (!lessonContent) return
    setLessonContent({ ...lessonContent, description: value })
  }

  const updateCategory = (value: string) => {
    if (!lessonContent) return
    setLessonContent({ ...lessonContent, category: value })
  }

  const addSubtopic = () => {
    if (!lessonContent) return
    const newSubtopic: SubTopic = {
      title: "New Subtopic",
      description: "Description of the new subtopic",
      definition: "Definition of the new subtopic",
      outcome: "Learning outcome for this subtopic",
      activities: ["Activity 1"],
      keyConcepts: ["Key concept 1"],
    }

    setLessonContent({
      ...lessonContent,
      subtopics: [...lessonContent.subtopics, newSubtopic],
    })

    // Set the new subtopic as active and open the title accordion
    setActiveSubtopic(lessonContent.subtopics.length)
    setActiveAccordionItem("title")
    setFocusTitle(true)
  }

  const removeSubtopic = (index: number) => {
    if (!lessonContent || lessonContent.subtopics.length <= 1) return

    const updatedSubtopics = [...lessonContent.subtopics]
    updatedSubtopics.splice(index, 1)

    setLessonContent({
      ...lessonContent,
      subtopics: updatedSubtopics,
    })

    // Adjust active subtopic if needed
    if (activeSubtopic >= updatedSubtopics.length) {
      setActiveSubtopic(updatedSubtopics.length - 1)
    }
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create New Lesson</h1>
          <p className="text-muted-foreground mt-1">Generate AI-powered lesson content with multiple subtopics</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Wand2 className="h-4 w-4" />
                <span>AI Templates</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose from pre-designed lesson templates</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className="mb-8 border-dashed bg-muted/30">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label htmlFor="topic" className="text-sm font-medium">
                  Topic Name
                </label>
                <Input
                  id="topic"
                  placeholder="Enter a topic name (e.g., Machine Learning, Photosynthesis, World War II)"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="w-full md:w-48 space-y-2">
                <label htmlFor="subtopicCount" className="text-sm font-medium">
                  Number of Subtopics
                </label>
                <Select value={subtopicCount} onValueChange={setSubtopicCount}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 subtopics</SelectItem>
                    <SelectItem value="6">6 subtopics</SelectItem>
                    <SelectItem value="7">7 subtopics</SelectItem>
                    <SelectItem value="8">8 subtopics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading || !topicName.trim()} className="min-w-[140px] gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {lessonContent && (
        <div className="space-y-6">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Lesson Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={lessonContent.title}
                      onChange={(e) => updateTitle(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2 w-full md:w-1/3">
                    <label className="text-sm font-medium">Difficulty Level</label>
                    <Select value={lessonContent.category} onValueChange={updateCategory}>
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
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={lessonContent.description}
                    onChange={(e) => updateDescription(e.target.value)}
                    className="min-h-[100px] bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Subtopics List */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Subtopics</CardTitle>
                    <Button variant="outline" size="sm" onClick={addSubtopic} className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lessonContent.subtopics.map((subtopic, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                          activeSubtopic === index ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                        onClick={() => {
                          setActiveSubtopic(index)
                          setActiveAccordionItem("title")
                        }}
                      >
                        <div className="flex items-center gap-2 min-w-0 max-w-[calc(100%-40px)]">
                          <span className="font-medium flex-shrink-0">{index + 1}.</span>
                          <span className="truncate">{subtopic.title}</span>
                        </div>
                        {lessonContent.subtopics.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeSubtopic(index)
                            }}
                            className={`h-8 w-8 p-0 flex-shrink-0 ${
                              activeSubtopic === index ? "hover:bg-primary/90" : "hover:bg-muted/90"
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Subtopic Content */}
            <div className="w-full md:w-2/3">
              {lessonContent.subtopics.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        Subtopic {activeSubtopic + 1}: {lessonContent.subtopics[activeSubtopic].title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion 
                      type="single" 
                      collapsible 
                      value={activeAccordionItem} 
                      onValueChange={setActiveAccordionItem} 
                      className="w-full"
                    >
                      <AccordionItem value="title">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            <span>Title & Description</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Title</label>
                              <Input
                                ref={titleInputRef}
                                value={lessonContent.subtopics[activeSubtopic].title}
                                onChange={(e) => updateSubtopicField(activeSubtopic, "title", e.target.value)}
                                className="bg-background"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Textarea
                                value={lessonContent.subtopics[activeSubtopic].description}
                                onChange={(e) => updateSubtopicField(activeSubtopic, "description", e.target.value)}
                                className="min-h-[80px] bg-background"
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="definition">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            <span>Definition</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            <Textarea
                              value={lessonContent.subtopics[activeSubtopic].definition}
                              onChange={(e) => updateSubtopicField(activeSubtopic, "definition", e.target.value)}
                              className="min-h-[100px] bg-background"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="outcome">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span>Learning Outcome</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            <Textarea
                              value={lessonContent.subtopics[activeSubtopic].outcome}
                              onChange={(e) => updateSubtopicField(activeSubtopic, "outcome", e.target.value)}
                              className="min-h-[100px] bg-background"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="activities">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Activities</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            {lessonContent.subtopics[activeSubtopic].activities.map((activity, index) => (
                              <div key={index} className="flex gap-2">
                                <Textarea
                                  value={activity}
                                  onChange={(e) => updateArrayItem(activeSubtopic, "activities", index, e.target.value)}
                                  className="min-h-[80px] bg-background flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeArrayItem(activeSubtopic, "activities", index)}
                                  disabled={lessonContent.subtopics[activeSubtopic].activities.length <= 1}
                                  className="h-10 w-10 shrink-0 self-start"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addArrayItem(activeSubtopic, "activities")}
                              className="gap-1"
                            >
                              <Plus className="h-4 w-4" />
                              Add Activity
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="keyConcepts">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-2">
                            <BrainCircuit className="h-4 w-4" />
                            <span>Key Concepts</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            {lessonContent.subtopics[activeSubtopic].keyConcepts.map((concept, index) => (
                              <div key={index} className="flex gap-2">
                                <Textarea
                                  value={concept}
                                  onChange={(e) =>
                                    updateArrayItem(activeSubtopic, "keyConcepts", index, e.target.value)
                                  }
                                  className="min-h-[80px] bg-background flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeArrayItem(activeSubtopic, "keyConcepts", index)}
                                  disabled={lessonContent.subtopics[activeSubtopic].keyConcepts.length <= 1}
                                  className="h-10 w-10 shrink-0 self-start"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addArrayItem(activeSubtopic, "keyConcepts")}
                              className="gap-1"
                            >
                              <Plus className="h-4 w-4" />
                              Add Key Concept
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleOpenConfirmDialog} size="lg" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Create Lesson
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Lesson Creation</DialogTitle>
            <DialogDescription>
              Are you sure you want to create this lesson with {lessonContent?.subtopics.length} subtopics? Once
              created, it will be saved to your lessons library.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-medium">{lessonContent?.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{lessonContent?.description}</p>
            {lessonContent && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-medium">Difficulty Level:</p>
                  <span className="text-sm text-muted-foreground">{lessonContent.category.charAt(0).toUpperCase() + lessonContent.category.slice(1)}</span>
                </div>
                <p className="text-sm font-medium">Subtopics:</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc pl-5">
                  {lessonContent.subtopics.slice(0, 3).map((subtopic, index) => (
                    <li key={index}>{subtopic.title}</li>
                  ))}
                  {lessonContent.subtopics.length > 3 && <li>And {lessonContent.subtopics.length - 3} more...</li>}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreateLesson} className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Confirm Creation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
