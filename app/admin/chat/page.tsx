"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageCircle, User, Bot, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { supabase } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

interface ChatSession {
  session_id: string
  user_name?: string
  user_email?: string
  status: string
  created_at: string
  updated_at: string
  message_count?: number
  last_message?: string
}

interface ChatMessage {
  id: string
  session_id: string
  message: string
  sender: "user" | "ai" | "admin"
  timestamp: string
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchChatSessions()
  }, [])

  useEffect(() => {
    if (selectedSession) {
      fetchSessionMessages(selectedSession.session_id)
    }
  }, [selectedSession])

  const fetchChatSessions = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select(`
          *,
          chat_messages (
            id,
            message,
            timestamp
          )
        `)
        .order("updated_at", { ascending: false })

      if (error) throw error

      const sessionsWithStats = (data || []).map((session) => ({
        ...session,
        message_count: session.chat_messages?.length || 0,
        last_message: session.chat_messages?.[session.chat_messages.length - 1]?.message || "No messages",
      }))

      setSessions(sessionsWithStats)
    } catch (error) {
      console.error("Error fetching chat sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSessionMessages = async (sessionId: string) => {
    setMessagesLoading(true)
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("timestamp", { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setMessagesLoading(false)
    }
  }

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      !searchTerm ||
      session.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.session_id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || session.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 h-96 bg-muted rounded-xl" />
            <div className="lg:col-span-2 h-96 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-3xl font-bold mb-2">Chat Messages</h1>
        <p className="text-muted-foreground">View and manage all chat conversations</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sessions</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sessions List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Chat Sessions ({filteredSessions.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-2 p-4">
                  {filteredSessions.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No chat sessions found</p>
                  ) : (
                    filteredSessions.map((session) => (
                      <div
                        key={session.session_id}
                        onClick={() => setSelectedSession(session)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedSession?.session_id === session.session_id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/20 hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {session.user_name ? session.user_name[0].toUpperCase() : "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{session.user_name || "Anonymous"}</p>
                              {session.user_email && <p className="text-xs opacity-70">{session.user_email}</p>}
                            </div>
                          </div>
                          <Badge variant={session.status === "active" ? "default" : "secondary"} className="text-xs">
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-xs opacity-70 line-clamp-2 mb-2">{session.last_message}</p>
                        <div className="flex items-center justify-between text-xs opacity-70">
                          <span>{session.message_count} messages</span>
                          <span>{formatDate(session.updated_at)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Messages View */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {selectedSession
                      ? `Chat with ${selectedSession.user_name || "Anonymous"}`
                      : "Select a chat session"}
                  </span>
                </div>
                {selectedSession && (
                  <Badge variant={selectedSession.status === "active" ? "default" : "secondary"}>
                    {selectedSession.status}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {selectedSession ? (
                <ScrollArea className="h-96 p-4">
                  {messagesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No messages in this session</p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[80%] ${
                              message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                            }`}
                          >
                            <Avatar className="w-6 h-6 flex-shrink-0">
                              <AvatarFallback
                                className={
                                  message.sender === "user"
                                    ? "bg-primary text-white"
                                    : message.sender === "ai"
                                      ? "bg-muted"
                                      : "bg-orange-500 text-white"
                                }
                              >
                                {message.sender === "user" ? (
                                  <User className="w-3 h-3" />
                                ) : message.sender === "ai" ? (
                                  <Bot className="w-3 h-3" />
                                ) : (
                                  "A"
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 text-sm ${
                                message.sender === "user"
                                  ? "bg-primary text-white"
                                  : message.sender === "ai"
                                    ? "bg-muted"
                                    : "bg-orange-500 text-white"
                              }`}
                            >
                              <div className="whitespace-pre-wrap">{message.message}</div>
                              <div className="text-xs mt-1 opacity-70">
                                {new Date(message.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              ) : (
                <div className="flex items-center justify-center h-96 text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a chat session to view messages</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
