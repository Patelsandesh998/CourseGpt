import Link from "next/link"
import { ArrowRight, BookOpen, Brain, CheckCircle2, GraduationCap, Sparkles, Lightbulb, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureCard } from "@/components/landing/feature-card"
import { TestimonialCard } from "@/components/landing/testimonial-card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-blue-500/10 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-gradient-to-r from-primary to-blue-600" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">CourseGPT</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
                Log in
              </Button>
            </Link>
            <Link href="/generate_topics">
              <Button size="sm" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-blue-50/30 to-purple-50/20 dark:from-blue-900/5 dark:to-purple-900/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 translate-y-1/2"></div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Transform Your <span className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent inline-block">Course Creation</span> Process
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                CourseGPT combines AI-powered content generation with intuitive organization tools to streamline your
                workflow
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="AI-Powered Content"
                description="Generate comprehensive lesson content with a single click. Our AI creates key concepts, terminology, learning outcomes, and more."
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-primary" />}
                title="Structured Templates"
                description="Maintain consistency across your courses with professionally designed templates that follow educational best practices."
              />
              <FeatureCard
                icon={<GraduationCap className="h-10 w-10 text-primary" />}
                title="Intelligent Sequencing"
                description="Our AI analyzes your course content and suggests the optimal sequence for maximum learning effectiveness."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-b from-background via-purple-50/10 to-blue-50/20 dark:from-background dark:via-purple-900/5 dark:to-blue-900/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-20 -translate-x-1/2"></div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Simple Process</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How <span className="bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent inline-block">CourseGPT</span> Works
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Create professional educational content in minutes, not hours
              </p>
            </div>

            <div className="mt-12">
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-full">
                  <TabsTrigger value="create" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white">Create Lessons</TabsTrigger>
                  <TabsTrigger value="organize" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white">Organize Content</TabsTrigger>
                  <TabsTrigger value="publish" className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white">Build Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="create" className="mt-8">
                  <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div className="space-y-5">
                      <h3 className="text-2xl font-bold">Generate AI-Powered Lessons</h3>
                      <p className="text-muted-foreground">
                        Simply enter a topic, and CourseGPT generates comprehensive lesson content including key
                        concepts, terminology, learning outcomes, activities, and examples.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span>Comprehensive lesson structure</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span>Editable content to match your voice</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          </div>
                          <span>Save time on content creation</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-primary/10 bg-background/80 backdrop-blur-sm p-6 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                      <div className="relative space-y-4">
                        <div className="h-8 w-2/3 rounded-md bg-primary/5 animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 rounded-md bg-primary/5 animate-pulse" />
                          <div className="h-4 rounded-md bg-primary/5 animate-pulse" />
                          <div className="h-4 w-2/3 rounded-md bg-primary/5 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="h-4 rounded-md bg-primary/5 animate-pulse" />
                            <div className="h-4 rounded-md bg-primary/5 animate-pulse" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-4 rounded-md bg-primary/5 animate-pulse" />
                            <div className="h-4 rounded-md bg-primary/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="organize" className="mt-8">
                  <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div className="space-y-5">
                      <h3 className="text-2xl font-bold">Organize Your Content</h3>
                      <p className="text-muted-foreground">
                        Easily organize and categorize your lessons with our intuitive interface. Add tags, set
                        difficulty levels, and estimate completion times.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          </div>
                          <span>Intuitive drag-and-drop interface</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          </div>
                          <span>Categorize content by topic and difficulty</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                          </div>
                          <span>Track progress and completion metrics</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-blue-500/10 bg-background/80 backdrop-blur-sm p-6 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                      <div className="relative space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="h-6 w-1/3 rounded-md bg-blue-500/5 animate-pulse" />
                          <div className="h-6 w-1/4 rounded-md bg-blue-500/5 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 rounded-md border border-blue-500/10">
                            <div className="h-4 w-4 rounded-md bg-blue-500/5 animate-pulse" />
                            <div className="h-4 w-2/3 rounded-md bg-blue-500/5 animate-pulse" />
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md border border-blue-500/10">
                            <div className="h-4 w-4 rounded-md bg-blue-500/5 animate-pulse" />
                            <div className="h-4 w-2/3 rounded-md bg-blue-500/5 animate-pulse" />
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md border border-blue-500/10">
                            <div className="h-4 w-4 rounded-md bg-blue-500/5 animate-pulse" />
                            <div className="h-4 w-2/3 rounded-md bg-blue-500/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="publish" className="mt-8">
                  <div className="grid gap-8 md:grid-cols-2 items-center">
                    <div className="space-y-5">
                      <h3 className="text-2xl font-bold">Build Complete Courses</h3>
                      <p className="text-muted-foreground">
                        Combine your lessons into comprehensive courses with our intelligent sequencing suggestions.
                        Create a logical flow that maximizes learning outcomes.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                          </div>
                          <span>AI-powered sequencing suggestions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                          </div>
                          <span>Customizable course structure</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                          </div>
                          <span>Export to various formats</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-purple-500/10 bg-background/80 backdrop-blur-sm p-6 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                      <div className="relative space-y-4">
                        <div className="h-6 w-1/2 rounded-md bg-purple-500/5 animate-pulse" />
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="h-4 rounded-md bg-purple-500/5 animate-pulse" />
                            <div className="h-4 rounded-md bg-purple-500/5 animate-pulse" />
                            <div className="h-4 w-2/3 rounded-md bg-purple-500/5 animate-pulse" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-20 rounded-md bg-purple-500/5 animate-pulse" />
                            <div className="h-4 w-1/2 rounded-md bg-purple-500/5 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-50/30 to-purple-50/20 dark:from-blue-900/5 dark:to-purple-900/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 translate-y-1/2"></div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Lightbulb className="h-3.5 w-3.5" />
                <span>Testimonials</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by <span className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent inline-block">Educators</span> Worldwide
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                See what our users are saying about CourseGPT
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <TestimonialCard
                quote="CourseGPT has revolutionized how I create content for my online courses. What used to take days now takes minutes."
                author="Sarah Johnson"
                role="Online Course Creator"
                avatarSrc="/placeholder.svg?height=80&width=80"
              />
              <TestimonialCard
                quote="The AI-generated content is surprisingly good and saves me hours of work. The intelligent sequencing feature is a game-changer."
                author="Michael Chen"
                role="University Professor"
                avatarSrc="/placeholder.svg?height=80&width=80"
              />
              <TestimonialCard
                quote="As an instructional designer, CourseGPT has become an essential tool in my workflow. It helps me create consistent, high-quality content."
                author="Emily Rodriguez"
                role="Instructional Designer"
                avatarSrc="/placeholder.svg?height=80&width=80"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-blue-600 dark:from-primary/90 dark:to-blue-700 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20"></div>
          
          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-3xl">
                Ready to Transform Your Course Creation?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed opacity-90">
                Join thousands of educators who are saving time and creating better content with CourseGPT
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/generate_topics">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-lg group">
                    <span>Get Started Free</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-blue-500/10 py-12 bg-gradient-to-b from-background to-blue-50/20 dark:from-background dark:to-blue-950/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">CourseGPT</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered course creation platform for educators and content creators
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground hover:text-blue-600 transition-colors">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-500/10 text-center text-sm text-muted-foreground">
            © 2025 CourseGPT. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
