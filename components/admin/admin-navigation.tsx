"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Star,
  Mail,
  DollarSign,
  FolderOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  BarChart3,
  UserCheck,
  Clock,
  Crown,
  Activity,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/contexts/admin-context"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AdminUser } from "@/lib/supabase"

interface AdminNavigationProps {
  user: AdminUser
}

export function AdminNavigation({ user }: AdminNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAdmin()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/admin")
  }

  const isSuperAdmin = user?.is_super_admin || user?.role === 'super_admin'

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
      exact: true
    },
    {
      name: "Contacts",
      href: "/admin/contacts",
      icon: Mail
    },
    {
      name: "Chat",
      href: "/admin/chat",
      icon: MessageSquare
    },
    {
      name: "Blog",
      href: "/admin/blog",
      icon: FileText
    },
    {
      name: "Testimonials",
      href: "/admin/testimonials",
      icon: Star
    },
    {
      name: "Case Studies",
      href: "/admin/case-studies",
      icon: BarChart3
    },
    {
      name: "Team",
      href: "/admin/team",
      icon: Users
    },
    {
      name: "Work Tracking",
      href: "/admin/work-tracking",
      icon: Activity
    }
  ]

  const superAdminLinks = [
    {
      name: "Admins",
      href: "/admin/admins",
      icon: Users
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings
    }
  ]

  return (
    <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-card">
      <div className="flex-1 flex flex-col min-h-0 pt-5">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/admin" className="font-bold text-2xl">
            Admin
          </Link>
        </div>
        <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}

            {user.is_super_admin && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Super Admin
                    </span>
                  </div>
                </div>

                {superAdminLinks.map((item) => {
                  const isActive = pathname.startsWith(item.href)

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
