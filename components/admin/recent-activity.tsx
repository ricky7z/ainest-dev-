import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { Activity, Clock, Eye, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"

interface RecentActivityProps {
  title: string
  items: any[]
  type: 'contacts' | 'chats' | 'work'
}

export function RecentActivity({ title, items, type }: RecentActivityProps) {
  const getIcon = () => {
    switch (type) {
      case 'contacts':
        return <Mail className="w-5 h-5" />
      case 'chats':
        return <MessageSquare className="w-5 h-5" />
      case 'work':
        return <Activity className="w-5 h-5" />
    }
  }

  const getEmptyIcon = () => {
    switch (type) {
      case 'contacts':
        return <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
      case 'chats':
        return <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
      case 'work':
        return <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
    }
  }

  const getViewAllLink = () => {
    switch (type) {
      case 'contacts':
        return '/admin/contacts'
      case 'chats':
        return '/admin/chat'
      case 'work':
        return '/admin/work-tracking'
    }
  }

  const renderItem = (item: any) => {
    switch (type) {
      case 'contacts':
        return (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.email}</p>
              <p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {item.budget || 'No budget'}
            </Badge>
          </div>
        )
      case 'chats':
        return (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <p className="font-medium text-sm">Session #{item.id.slice(0, 8)}</p>
              <p className="text-xs text-muted-foreground">{item.visitor_name || 'Anonymous'}</p>
              <p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
            </div>
            <Badge variant={item.status === 'active' ? 'default' : 'secondary'} className="text-xs">
              {item.status}
            </Badge>
          </div>
        )
      case 'work':
        return (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
            <div>
              <p className="font-medium text-sm">{item.admin?.username}</p>
              <p className="text-xs text-muted-foreground">
                {item.duration ? `${(item.duration / 60).toFixed(1)}h` : 'Active'}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(item.created_at)}</p>
            </div>
            <Badge variant={
              item.status === 'active' ? 'default' :
              item.status === 'break' ? 'secondary' : 'outline'
            } className="text-xs">
              {item.status}
            </Badge>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getIcon()}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8">
            {getEmptyIcon()}
            <p className="text-sm text-muted-foreground">No recent {type}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(renderItem)}
          </div>
        )}
        <div className="mt-4">
          <Link href={getViewAllLink()}>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View All {title}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 