"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertTriangle, XCircle, Info, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { supabase, type ServiceStatus } from "@/lib/supabase"

interface ServiceStatusProps {
  className?: string
}

export function ServiceStatus({ className }: ServiceStatusProps) {
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    fetchServiceStatus()
  }, [])

  const fetchServiceStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("service_status")
        .select("*")
        .order("name")

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error fetching service status:", error)
    } finally {
      setLoading(false)
    }
  }

  const getOverallStatus = () => {
    if (services.length === 0) return "operational"
    
    const hasOutage = services.some(s => s.status === "outage")
    const hasDegraded = services.some(s => s.status === "degraded")
    const hasMaintenance = services.some(s => s.status === "maintenance")
    
    if (hasOutage) return "outage"
    if (hasDegraded) return "degraded"
    if (hasMaintenance) return "maintenance"
    return "operational"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "outage":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "degraded":
        return "bg-orange-500"
      case "outage":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "All Systems Operational"
      case "maintenance":
        return "Scheduled Maintenance"
      case "degraded":
        return "Performance Issues"
      case "outage":
        return "Service Outage"
      default:
        return "Unknown Status"
    }
  }

  const overallStatus = getOverallStatus()

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-muted rounded w-48" />
      </div>
    )
  }

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-2 hover:bg-muted/50"
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(overallStatus)}`} />
              <span className="text-sm font-medium">
                {getStatusText(overallStatus)}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {getStatusIcon(overallStatus)}
              <span>System Status</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {services.length === 0 ? (
              <div className="text-center py-4">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">All services are operational</p>
              </div>
            ) : (
              services.map((service) => (
                <Card key={service.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(service.status)}
                        <div>
                          <h4 className="font-medium text-sm">{service.name}</h4>
                          {service.message && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {service.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          service.status === "operational" ? "border-green-200 text-green-700" :
                          service.status === "maintenance" ? "border-yellow-200 text-yellow-700" :
                          service.status === "degraded" ? "border-orange-200 text-orange-700" :
                          "border-red-200 text-red-700"
                        }`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Last updated: {new Date(service.updated_at).toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 