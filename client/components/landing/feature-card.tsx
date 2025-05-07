import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden border border-blue-500/10 shadow-md bg-gradient-to-b from-background/80 to-blue-50/30 dark:from-background/80 dark:to-blue-900/5 transition-all hover:shadow-lg backdrop-blur-sm relative group">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -inset-px bg-gradient-to-b from-transparent to-transparent via-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4 relative">
        <div className="p-3 rounded-full bg-gradient-to-b from-primary/10 to-blue-500/10 text-primary shadow-sm">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
