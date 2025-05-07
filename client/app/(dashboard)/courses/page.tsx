"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, Search, Filter, PlusCircle, Clock, BookOpen, Loader2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  lessonCount: number
  createdAt: string
  updatedAt: string
  progress?: number
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // In a real implementation, this would fetch courses from your API
    const fetchCourses = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockCourses: Course[] = [
          {
            id: "1",
            title: "Complete Machine Learning Bootcamp",
            description:
              "A comprehensive course covering all aspects of machine learning from basics to advanced techniques.",
            difficulty: "Intermediate",
            estimatedTime: "40 hours",
            lessonCount: 12,
            createdAt: "2025-03-10T12:00:00Z",
            updatedAt: "2025-04-05T14:30:00Z",
            progress: 75,
          },
          {
            id: "2",
            title: "Web Development Masterclass",
            description: "Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.",
            difficulty: "Beginner",
            estimatedTime: "30 hours",
            lessonCount: 10,
            createdAt: "2025-02-15T10:00:00Z",
            updatedAt: "2025-03-20T16:45:00Z",
            progress: 40,
          },
          {
            id: "3",
            title: "Advanced Algorithms and Data Structures",
            description: "Deep dive into complex algorithms and data structures for software engineering interviews.",
            difficulty: "Advanced",
            estimatedTime: "25 hours",
            lessonCount: 8,
            createdAt: "2025-01-05T09:30:00Z",
            updatedAt: "2025-02-12T11:15:00Z",
            progress: 20,
          },
          {
            id: "4",
            title: "Introduction to Psychology",
            description: "Explore the fundamentals of psychology and human behavior.",
            difficulty: "Beginner",
            estimatedTime: "20 hours",
            lessonCount: 8,
            createdAt: "2024-12-10T14:20:00Z",
            updatedAt: "2025-01-15T09:45:00Z",
            progress: 90,
          },
          {
            id: "5",
            title: "Financial Literacy for Beginners",
            description: "Learn essential financial concepts and strategies for personal finance management.",
            difficulty: "Beginner",
            estimatedTime: "15 hours",
            lessonCount: 6,
            createdAt: "2024-11-20T11:30:00Z",
            updatedAt: "2024-12-05T13:15:00Z",
            progress: 60,
          },
          {
            id: "6",
            title: "Climate Science and Sustainability",
            description: "Understand climate science and explore sustainable solutions for environmental challenges.",
            difficulty: "Intermediate",
            estimatedTime: "22 hours",
            lessonCount: 9,
            createdAt: "2024-10-15T10:00:00Z",
            updatedAt: "2024-11-10T16:30:00Z",
            progress: 10,
          },
        ]

        setCourses(mockCourses)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Advanced":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="container py-6 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Courses</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your educational courses</p>
        </div>
        <Link href="/create_course">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create New Course
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Courses</DropdownMenuItem>
              <DropdownMenuItem>Beginner</DropdownMenuItem>
              <DropdownMenuItem>Intermediate</DropdownMenuItem>
              <DropdownMenuItem>Advanced</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-4 mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">
              No courses found. Try adjusting your search or create a new course.
            </p>
            <Link href="/create_course">
              <Button>Create Your First Course</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2 bg-muted/30">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                </div>
                <CardDescription className="line-clamp-2 h-10">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{course.lessonCount} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-1.5 text-muted-foreground">
                        <span>Last Updated:</span>
                        <span className="font-medium text-foreground">{formatDate(course.updatedAt)}</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Course Timeline</h4>
                          <div className="flex items-center pt-2">
                            <span className="text-xs text-muted-foreground w-24">Created:</span>
                            <span className="text-xs">{formatDate(course.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground w-24">Last Updated:</span>
                            <span className="text-xs">{formatDate(course.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/20 p-3">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </Button>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive gap-1">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
