"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Minimize2, Maximize2, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase, type ChatSession, type ChatMessage } from "@/lib/supabase"
import { toast } from "sonner"

interface ChatWidgetProps {
  className?: string
}

export function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      initializeChat()
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChat = async () => {
    try {
      // Create or get existing session
      const existingSession = localStorage.getItem('chat_session_id')
      
      if (existingSession) {
        // Verify the session still exists and is active
        const { data: session, error: sessionError } = await supabase
          .from('chat_sessions')
          .select('*')
          .eq('session_id', existingSession)
          .eq('status', 'active')
          .single()

        if (sessionError || !session) {
          // Session not found or inactive, remove from storage
          localStorage.removeItem('chat_session_id')
          return initializeChat() // Retry with new session
        }

        setSessionId(existingSession)
        await loadMessages(existingSession)
      } else {
        const sessionId = generateVisitorId()
        const { data: session, error } = await supabase
          .from('chat_sessions')
          .insert([
            {
              session_id: sessionId,
              status: 'active'
            }
          ])
          .select()
          .single()

        if (error) throw error
        
        setSessionId(sessionId)
        localStorage.setItem('chat_session_id', sessionId)
        
        // Send welcome message
        await sendMessage("Hello! I'm interested in your services.", sessionId)
      }

      setIsConnected(true)
    } catch (error) {
      console.error('Error initializing chat:', error)
      toast.error('Failed to initialize chat')
      setIsConnected(false)
    }
  }

  const loadMessages = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
      toast.error('Failed to load messages')
    }
  }

  const sendMessage = async (content: string, sessionIdToUse?: string) => {
    const currentSessionId = sessionIdToUse || sessionId
    if (!currentSessionId || !content.trim()) return

    const newMessage = {
      session_id: currentSessionId,
      message: content.trim(),
      sender: 'user' as const
    }

    try {
      // Optimistically add message to UI
      const tempMessage = {
        id: `temp-${Date.now()}`,
        session_id: currentSessionId,
        message: content.trim(),
        sender: 'user' as const,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, tempMessage])
      setInputMessage("")
      setIsTyping(true)

      // Send to database
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([newMessage])
        .select()
        .single()

      if (error) throw error

      // Replace temp message with real one
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? data : msg
      ))

      // Simulate admin response
      setTimeout(() => {
        handleAdminResponse(currentSessionId)
      }, 1000 + Math.random() * 2000)

    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message')
      setIsTyping(false)
    }
  }

  const handleAdminResponse = async (sessionId: string) => {
    const responses = [
      "Thank you for your message! Our team will get back to you shortly.",
      "We'd love to help you with your project. Could you tell us more about your requirements?",
      "Great question! Let me connect you with one of our specialists.",
      "We offer comprehensive AI and web development solutions. What specific services are you interested in?",
      "Thanks for reaching out! We typically respond within 24 hours during business days."
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            session_id: sessionId,
            message: randomResponse,
            sender: 'ai'
          }
        ])
        .select()
        .single()

      if (error) throw error

      setMessages(prev => [...prev, data])
      setIsTyping(false)
    } catch (error) {
      console.error('Error sending admin response:', error)
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      sendMessage(inputMessage)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const generateVisitorId = () => {
    return 'visitor_' + Math.random().toString(36).substr(2, 9)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-4"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-14 h-14 shadow-lg gradient-primary hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="w-80 sm:w-96"
          >
            <Card className="shadow-2xl border-0 glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">AiNest Support</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span className="text-xs text-muted-foreground">
                          {isConnected ? 'Online' : 'Connecting...'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0"
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="pt-0">
                      {/* Messages */}
                      <div className="h-64 overflow-y-auto mb-4 space-y-3">
                        {messages.length === 0 ? (
                          <div className="text-center py-8">
                            <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Start a conversation with our team</p>
                          </div>
                        ) : (
                          messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    message.sender === 'user' 
                                      ? 'bg-primary text-primary-foreground' 
                                      : 'bg-muted text-muted-foreground'
                                  }`}>
                                    {message.sender === 'user' ? (
                                      <User className="w-3 h-3" />
                                    ) : (
                                      <Bot className="w-3 h-3" />
                                    )}
                                  </div>
                                  <div className={`rounded-lg px-3 py-2 text-sm ${
                                    message.sender === 'user'
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted text-foreground'
                                  }`}>
                                    <p>{message.message}</p>
                                    <p className={`text-xs mt-1 ${
                                      message.sender === 'user' 
                                        ? 'text-primary-foreground/70' 
                                        : 'text-muted-foreground'
                                    }`}>
                                      {formatTime(message.timestamp)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                        
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                                <Bot className="w-3 h-3 text-muted-foreground" />
                              </div>
                              <div className="bg-muted rounded-lg px-3 py-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Input */}
                      <form onSubmit={handleSubmit} className="flex space-x-2">
                        <Input
                          ref={inputRef}
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1"
                          disabled={!isConnected}
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!inputMessage.trim() || !isConnected}
                          className="px-3"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </form>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 