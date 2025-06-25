"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Eye, Clock, DollarSign, Calendar, User, Play, Pause, Square, TrendingUp, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { supabase, type WorkSession, type AdminUser } from "@/lib/supabase"
import { toast } from "sonner"

interface WorkSessionWithAdmin extends WorkSession {
  admin: AdminUser
}

export default function WorkTrackingPage() {
  const [sessions, setSessions] = useState<WorkSessionWithAdmin[]>([])
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAdmin, setSelectedAdmin] = useState<string>("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<WorkSessionWithAdmin | null>(null)

  useEffect(() => {
    fetchSessions()
    fetchAdmins()
  }, [selectedAdmin, dateRange])

  const fetchSessions = async () => {
    try {
      let query = supabase
        .from("work_sessions")
        .select(`
          *,
          admin:admin_users(
            id,
            first_name,
            last_name,
            email,
            hourly_rate
          )
        `)
        .order("start_time", { ascending: false })

      if (selectedAdmin) {
        query = query.eq("admin_id", selectedAdmin)
      }

      if (dateRange.from) {
        query = query.gte("start_time", dateRange.from.toISOString())
      }

      if (dateRange.to) {
        query = query.lte("start_time", dateRange.to.toISOString())
      }

      const { data, error } = await query

      if (error) throw error
      setSessions(data || [])
    } catch (error) {
      console.error("Error fetching sessions:", error)
      toast.error("Failed to fetch work sessions")
    } finally {
      setLoading(false)
    }
  }

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id, first_name, last_name, email, hourly_rate")
        .eq("is_active", true)
        .order("first_name")

      if (error) throw error
      setAdmins(data || [])
    } catch (error) {
      console.error("Error fetching admins:", error)
    }
  }

  const handleSessionAction = async (sessionId: string, action: "start" | "pause" | "stop") => {
    try {
      const now = new Date().toISOString()
      let updateData: any = {}

      if (action === "start") {
        updateData = {
          status: "active",
          start_time: now,
          last_activity: now,
        }
      } else if (action === "pause") {
        updateData = {
          status: "paused",
          last_activity: now,
        }
      } else if (action === "stop") {
        updateData = {
          status: "completed",
          end_time: now,
          last_activity: now,
        }
      }

      const { error } = await supabase
        .from("work_sessions")
        .update(updateData)
        .eq("id", sessionId)

      if (error) throw error
      toast.success(`Session ${action}ed successfully`)
      fetchSessions()
    } catch (error) {
      console.error("Error updating session:", error)
      toast.error("Failed to update session")
    }
  }

  const calculateDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime)
    const end = endTime ? new Date(endTime) : new Date()
    const diffMs = end.getTime() - start.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const calculatePay = (session: WorkSessionWithAdmin) => {
    if (!session.admin.hourly_rate || !session.end_time) return 0
    const start = new Date(session.start_time)
    const end = new Date(session.end_time)
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return hours * session.admin.hourly_rate
  }

  const getTotalStats = () => {
    const totalSessions = sessions.length
    const activeSessions = sessions.filter(s => s.status === "active").length
    const completedSessions = sessions.filter(s => s.status === "completed").length
    const totalHours = sessions
      .filter(s => s.end_time)
      .reduce((total, session) => {
        const start = new Date(session.start_time)
        const end = new Date(session.end_time!)
        return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      }, 0)
    const totalPay = sessions
      .filter(s => s.end_time)
      .reduce((total, session) => total + calculatePay(session), 0)

    return { totalSessions, activeSessions, completedSessions, totalHours, totalPay }
  }

  const filteredSessions = sessions.filter((session) =>
    session.admin.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.admin.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = getTotalStats()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-xl" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Work Tracking</h1>
            <p className="text-muted-foreground">Monitor admin work sessions and productivity</p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="glass-card border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Sessions</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.totalSessions}</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Active Sessions</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.activeSessions}</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">Total Hours</span>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.totalHours.toFixed(1)}h</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Total Pay</span>
            </div>
            <p className="text-2xl font-bold mt-2">${stats.totalPay.toFixed(2)}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Admins</SelectItem>
            {admins.map((admin) => (
              <SelectItem key={admin.id} value={admin.id}>
                {admin.first_name} {admin.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DatePicker
          placeholder="From date"
          date={dateRange.from}
          onSelect={(date) => setDateRange({ ...dateRange, from: date })}
        />

        <DatePicker
          placeholder="To date"
          date={dateRange.to}
          onSelect={(date) => setDateRange({ ...dateRange, to: date })}
        />
      </motion.div>

      {/* Sessions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="space-y-4"
      >
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
          >
            <Card className="glass-card border-0 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">
                        {session.admin.first_name} {session.admin.last_name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        ${session.admin.hourly_rate}/hr
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(session.start_time).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{calculateDuration(session.start_time, session.end_time)}</span>
                      </div>
                      {session.end_time && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3" />
                          <span>${calculatePay(session).toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    {session.description && (
                      <p className="text-sm text-muted-foreground">{session.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        session.status === "active" ? "default" :
                        session.status === "paused" ? "secondary" :
                        session.status === "completed" ? "outline" : "destructive"
                      }
                      className="text-xs"
                    >
                      {session.status}
                    </Badge>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSession(session)}
                          className="h-8 px-2"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Session Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Admin</Label>
                            <p className="text-sm text-muted-foreground">
                              {session.admin.first_name} {session.admin.last_name} ({session.admin.email})
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <p className="text-sm text-muted-foreground">
                              {session.description || "No description provided"}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Start Time</Label>
                              <p className="text-sm text-muted-foreground">
                                {new Date(session.start_time).toLocaleString()}
                              </p>
                            </div>
                            {session.end_time && (
                              <div>
                                <Label className="text-sm font-medium">End Time</Label>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(session.end_time).toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Duration</Label>
                            <p className="text-sm text-muted-foreground">
                              {calculateDuration(session.start_time, session.end_time)}
                            </p>
                          </div>
                          {session.end_time && (
                            <div>
                              <Label className="text-sm font-medium">Pay</Label>
                              <p className="text-sm text-muted-foreground">
                                ${calculatePay(session).toFixed(2)}
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {session.status === "active" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSessionAction(session.id, "pause")}
                        className="h-8 px-2"
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}

                    {session.status === "paused" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSessionAction(session.id, "start")}
                        className="h-8 px-2"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}

                    {(session.status === "active" || session.status === "paused") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSessionAction(session.id, "stop")}
                        className="h-8 px-2"
                      >
                        <Square className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredSessions.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No work sessions found</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedAdmin || dateRange.from || dateRange.to
              ? "Try adjusting your filters."
              : "No work sessions have been recorded yet."}
          </p>
        </motion.div>
      )}
    </div>
  )
} 