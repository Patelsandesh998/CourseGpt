import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarSrc: string
}

export function TestimonialCard({ quote, author, role, avatarSrc }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden border border-purple-500/10 shadow-md bg-gradient-to-b from-background/80 to-purple-50/30 dark:from-background/80 dark:to-purple-900/5 transition-all hover:shadow-lg backdrop-blur-sm relative group">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -inset-px bg-gradient-to-b from-transparent to-transparent via-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4 relative">
        <div className="relative">
          <svg
            className="absolute -top-6 -left-6 h-12 w-12 text-purple-500/20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p className="text-muted-foreground italic">{quote}</p>
        <div className="pt-4">
          <Avatar className="h-14 w-14 mx-auto mb-3 ring-2 ring-purple-500/10 ring-offset-2 ring-offset-background">
            <AvatarImage src={avatarSrc} alt={author} />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-500/20">{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="font-medium text-lg">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </CardContent>
    </Card>
  )
}
