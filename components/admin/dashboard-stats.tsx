import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ArrowUpRight, BarChart3, Clock, DollarSign, FileText, Mail, MessageSquare, Star } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalContacts: number
    totalChats: number
    totalBlogPosts: number
    totalTestimonials: number
    totalCaseStudies: number
    totalTeamMembers: number
    totalWorkHours: number
    totalRevenue: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
            <p className="text-2xl font-bold">{stats.totalContacts}</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Recent activity
            </div>
          </div>
          <div className="p-3 rounded-full bg-blue-100">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Chat Sessions</p>
            <p className="text-2xl font-bold">{stats.totalChats}</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Active today
            </div>
          </div>
          <div className="p-3 rounded-full bg-green-100">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Work Hours</p>
            <p className="text-2xl font-bold">{stats.totalWorkHours.toFixed(1)}h</p>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              This week
            </div>
          </div>
          <div className="p-3 rounded-full bg-orange-100">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              This month
            </div>
          </div>
          <div className="p-3 rounded-full bg-green-100">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Blog Posts</p>
            <p className="text-2xl font-bold">{stats.totalBlogPosts}</p>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <FileText className="w-3 h-3 mr-1" />
              Published
            </div>
          </div>
          <div className="p-3 rounded-full bg-purple-100">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Testimonials</p>
            <p className="text-2xl font-bold">{stats.totalTestimonials}</p>
            <div className="flex items-center text-xs text-yellow-600 mt-1">
              <Star className="w-3 h-3 mr-1" />
              Active
            </div>
          </div>
          <div className="p-3 rounded-full bg-yellow-100">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Case Studies</p>
            <p className="text-2xl font-bold">{stats.totalCaseStudies}</p>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <BarChart3 className="w-3 h-3 mr-1" />
              Published
            </div>
          </div>
          <div className="p-3 rounded-full bg-purple-100">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Team Members</p>
            <p className="text-2xl font-bold">{stats.totalTeamMembers}</p>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Active
            </div>
          </div>
          <div className="p-3 rounded-full bg-blue-100">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </Card>
    </div>
  )
} 