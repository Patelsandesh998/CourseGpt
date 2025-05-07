"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion"
import { GitHubGlobe } from "@/components/ui/github-globe"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Transform Your Course Creation Process
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  CourseGPT empowers educators and content creators to efficiently create, organize, and enhance
                  educational content with AI assistance.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px]">
                <div className="absolute inset-0 flex items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <div className="text-2xl font-bold">CourseGPT</div>
                    <div className="text-sm text-muted-foreground">AI-Powered Course Creation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background via-blue-50/20 to-purple-50/20 dark:from-background dark:via-blue-900/5 dark:to-purple-900/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 translate-y-1/2"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI-Powered Education Platform</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create <span className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent inline-block">Exceptional</span> Educational Content in Minutes
              </h1>
              
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mt-4">
                CourseGPT combines AI-powered tools with intuitive design to help educators create, organize, and enhance educational content efficiently.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row mt-6">
              <Link href="/generate_topics">
                <Button size="lg" className="group px-8 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 h-12 border-primary/20 hover:bg-primary/5">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-background bg-muted overflow-hidden shadow-sm"
                  >
                    <img
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt={`User ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold">1,000+</span> <span className="text-muted-foreground">educators trust CourseGPT</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center relative">
            <div className="relative w-full max-w-[560px] aspect-square">
              <GitHubGlobe />
              
              {/* Feature cards floating around the globe */}
              <div className="absolute top-10 right-0 sm:right-10 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-primary/10 max-w-[160px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-xs font-semibold">AI-Generated Content</div>
                </div>
              </div>
              
              <div className="absolute bottom-10 left-0 sm:left-10 z-10 bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-primary/10 max-w-[160px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-xs font-semibold">Smart Sequencing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
