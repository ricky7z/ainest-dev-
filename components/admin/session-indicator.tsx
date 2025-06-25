"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInactivityTimeout } from "@/hooks/use-inactivity-timeout"
import { useAdmin } from "@/contexts/admin-context"

export function SessionIndicator() {
  const { user } = useAdmin()
  const { getTimeRemaining, extendSession, isWarningShown } = useInactivityTimeout({
    timeoutMinutes: user?.session_timeout || 30,
    warningMinutes: 5
  })
  
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      const remaining = getTimeRemaining()
      setTimeRemaining(remaining)
      
      // Show indicator when less than 10 minutes remaining
      setIsVisible(remaining < 600)
    }, 1000)

    return () => clearInterval(interval)
  }, [user, getTimeRemaining])

  if (!isVisible || !user) return null

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressColor = () => {
    if (timeRemaining < 300) return "text-red-500" // Less than 5 minutes
    if (timeRemaining < 600) return "text-yellow-500" // Less than 10 minutes
    return "text-blue-500"
  }

  const getProgressWidth = () => {
    const totalTime = (user?.session_timeout || 30) * 60
    const remaining = Math.max(0, timeRemaining)
    return Math.max(5, (remaining / totalTime) * 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-background/95 backdrop-blur-sm border border-border/40 rounded-lg shadow-lg p-3 min-w-[200px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className={`w-4 h-4 ${getProgressColor()}`} />
            <span className="text-sm font-medium">Session Timeout</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={extendSession}
            className="h-6 w-6 p-0"
            title="Extend session"
          >
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Time remaining:</span>
            <span className={`text-sm font-mono font-bold ${getProgressColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-1.5">
            <motion.div
              className={`h-1.5 rounded-full ${
                timeRemaining < 300 ? "bg-red-500" :
                timeRemaining < 600 ? "bg-yellow-500" : "bg-blue-500"
              }`}
              style={{ width: `${getProgressWidth()}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          {isWarningShown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-red-500 font-medium text-center"
            >
              Session expiring soon!
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 