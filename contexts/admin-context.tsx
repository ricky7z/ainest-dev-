"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { AdminAuth, type AdminUser } from "@/lib/admin-auth"

interface AdminContextType {
  user: AdminUser | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      if (token) {
        const validUser = await AdminAuth.validateSession(token)
        if (validUser) {
          setUser(validUser)
        } else {
          localStorage.removeItem("admin_token")
        }
      }
    } catch (error) {
      console.error("Auth check error:", error)
      localStorage.removeItem("admin_token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await AdminAuth.login(username, password)
      if (result) {
        setUser(result.user)
        localStorage.setItem("admin_token", result.token)
        return true
      }
      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      if (token) {
        await AdminAuth.logout(token)
        localStorage.removeItem("admin_token")
      }
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      localStorage.removeItem("admin_token")
      setUser(null)
    }
  }

  return (
    <AdminContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
