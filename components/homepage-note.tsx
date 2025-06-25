"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HomepageNoteProps {
  title?: string
  message?: string
  type?: "info" | "warning" | "success" | "error"
  showBadge?: boolean
}

export function HomepageNote({ 
  title = "Important Information", 
  message = "Welcome to AiNest! We're here to help you with all your AI and development needs. Our team of experts is ready to assist you with custom solutions, consulting, and implementation services.",
  type = "info",
  showBadge = true 
}: HomepageNoteProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return {
          icon: "text-yellow-500",
          border: "border-yellow-200/20",
          bg: "bg-yellow-50/10",
          badge: "bg-yellow-500",
        }
      case "success":
        return {
          icon: "text-green-500",
          border: "border-green-200/20",
          bg: "bg-green-50/10",
          badge: "bg-green-500",
        }
      case "error":
        return {
          icon: "text-red-500",
          border: "border-red-200/20",
          bg: "bg-red-50/10",
          badge: "bg-red-500",
        }
      default:
        return {
          icon: "text-blue-500",
          border: "border-blue-200/20",
          bg: "bg-blue-50/10",
          badge: "bg-blue-500",
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className="relative">
      {/* Compact View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card 
          className={`glass-card border-0 cursor-pointer hover:shadow-lg transition-all duration-300 ${styles.border} ${styles.bg}`}
          onClick={() => setIsExpanded(true)}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`mt-1 ${styles.icon}`}>
                  <Info className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    {showBadge && (
                      <Badge variant="secondary" className="text-xs">
                        Click to read more
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {message}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl"
            >
              <Card className={`glass-card border-0 ${styles.border} ${styles.bg}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${styles.icon}`}>
                        <Info className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {message}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Our Services</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Custom AI Solutions</li>
                          <li>• Development Consulting</li>
                          <li>• System Integration</li>
                          <li>• Technical Support</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Contact Information</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Contact: Use our contact form</li>
                          <li>• Support: 24/7 Available</li>
                          <li>• Response Time: &lt; 2 hours</li>
                          <li>• Location: Accra, Ghana</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        window.location.href = "/contact"
                      }}
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsExpanded(false)}
                    >
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 