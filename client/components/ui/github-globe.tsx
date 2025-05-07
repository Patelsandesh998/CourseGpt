"use client"

import { useRef, useState, useEffect } from "react"
// import { motion } from "framer-motion"

export function GitHubGlobe() {
  const orbRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  // Auto-rotation when not hovered
  useEffect(() => {
    let animationId: number
    let angle = 0

    const animate = () => {
      if (!isHovered) {
        angle += 0.005
        setRotation({
          x: Math.sin(angle) * 5,
          y: Math.cos(angle) * 5
        })
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return
    
    const rect = orbRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    setMousePosition({ x, y })
    setRotation({ x: -y * 20, y: x * 20 })
  }

  // Generate connection lines between dots
  const generateConnections = () => {
    const connections = []
    const numDots = 30
    
    // Create a fixed set of points to ensure consistent connections
    const dots = Array(numDots).fill(0).map(() => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }))
    
    // Connect some dots with lines (not all, to avoid clutter)
    for (let i = 0; i < 40; i++) {
      const from = Math.floor(Math.random() * numDots)
      const to = Math.floor(Math.random() * numDots)
      if (from !== to) {
        connections.push({
          x1: dots[from].x,
          y1: dots[from].y,
          x2: dots[to].x,
          y2: dots[to].y,
          opacity: Math.random() * 0.2 + 0.1
        })
      }
    }
    
    return { dots, connections }
  }
  
  const { dots, connections } = generateConnections()

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={orbRef}
    >
      <div className="relative w-[min(100%,480px)] aspect-square">
        {/* Background glow effect */}
        <div className="absolute -inset-20 bg-blue-500/5 rounded-full blur-3xl opacity-70" />
        <div className="absolute -inset-10 bg-purple-500/5 rounded-full blur-3xl opacity-70" />
        
        {/* Main globe */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-blue-600/5 to-primary-foreground/5 border border-primary/20 shadow-[0_0_80px_rgba(80,70,230,0.15)] overflow-hidden"
          style={{
            transform: `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg) scale(${isHovered ? 1.05 : 1})`,
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Globe details - grid patterns */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          </div>
          
          {/* Particles/dots - simplified without animations */}
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/70"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                opacity: 0.4,
                boxShadow: '0 0 2px rgba(255,255,255,0.5)'
              }}
            />
          ))}
          
          {/* Connection lines - simplified without animations */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g>
              {connections.map((connection, i) => (
                <line 
                  key={i}
                  x1={`${connection.x1}%`} 
                  y1={`${connection.y1}%`} 
                  x2={`${connection.x2}%`} 
                  y2={`${connection.y2}%`} 
                  stroke="currentColor"
                  strokeWidth="0.5" 
                  strokeOpacity={connection.opacity}
                />
              ))}
            </g>
          </svg>
          
          {/* Additional inner glow */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-blue-500/5 to-transparent" />
        </div>
        
        {/* Floating elements around the globe - simplified without animations */}
        <div
          className="absolute -top-10 -right-6 w-16 h-16 bg-gradient-to-br from-pink-500/70 to-purple-600/70 rounded-lg backdrop-blur-md shadow-lg"
        />
        
        <div
          className="absolute -bottom-12 left-10 w-20 h-20 bg-gradient-to-tr from-blue-500/70 to-cyan-400/70 rounded-full backdrop-blur-md shadow-lg"
        />
        
        <div
          className="absolute -left-8 top-20 w-14 h-14 bg-gradient-to-br from-purple-500/70 to-indigo-600/70 rounded-md rotate-45 backdrop-blur-md shadow-lg"
        />

        {/* Additional floating elements for more visual appeal */}
        <div
          className="absolute right-20 top-4 w-8 h-8 bg-gradient-to-br from-amber-400/70 to-orange-500/70 rounded-full backdrop-blur-md shadow-lg"
        />
        
        <div
          className="absolute left-14 -bottom-6 w-10 h-10 bg-gradient-to-br from-emerald-400/70 to-teal-500/70 rounded-lg backdrop-blur-md shadow-lg"
        />
      </div>
    </div>
  )
} 