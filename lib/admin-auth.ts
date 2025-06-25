import { supabase } from "./supabase"

export interface AdminUser {
  id: string
  email: string
  username: string
  role: string
  is_active: boolean
  last_login?: string
}

export interface AdminSession {
  id: string
  user_id: string
  session_token: string
  expires_at: string
}

export class AdminAuth {
  private static readonly SESSION_DURATION = 8 * 60 * 60 * 1000 // 8 hours

  static async login(username: string, password: string): Promise<{ user: AdminUser; token: string } | null> {
    try {
      // Get user by username
      const { data: user, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .eq("is_active", true)
        .single()

      if (error || !user) {
        console.error("User not found:", error)
        return null
      }

      // For demo purposes, check against the default password
      // In production, use proper password hashing
      const isValidPassword = password === "AiNest2024!"

      if (!isValidPassword) {
        console.error("Invalid password")
        return null
      }

      // Generate session token
      const sessionToken = this.generateSessionToken()
      const expiresAt = new Date(Date.now() + this.SESSION_DURATION)

      // Clean up expired sessions first
      await this.cleanExpiredSessions()

      // Create session
      const { error: sessionError } = await supabase.from("admin_sessions").insert([
        {
          user_id: user.id,
          session_token: sessionToken,
          expires_at: expiresAt.toISOString(),
        },
      ])

      if (sessionError) {
        console.error("Session creation error:", sessionError)
        throw sessionError
      }

      // Update last login
      await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          is_active: user.is_active,
          last_login: user.last_login,
        },
        token: sessionToken,
      }
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  static async validateSession(token: string): Promise<AdminUser | null> {
    try {
      if (!token) return null

      const { data: session, error } = await supabase
        .from("admin_sessions")
        .select(`
          *,
          admin_users (*)
        `)
        .eq("session_token", token)
        .gt("expires_at", new Date().toISOString())
        .single()

      if (error || !session || !session.admin_users) {
        console.error("Session validation error:", error)
        return null
      }

      return {
        id: session.admin_users.id,
        email: session.admin_users.email,
        username: session.admin_users.username,
        role: session.admin_users.role,
        is_active: session.admin_users.is_active,
        last_login: session.admin_users.last_login,
      }
    } catch (error) {
      console.error("Session validation error:", error)
      return null
    }
  }

  static async logout(token: string): Promise<boolean> {
    try {
      if (!token) return true

      const { error } = await supabase.from("admin_sessions").delete().eq("session_token", token)
      return !error
    } catch (error) {
      console.error("Logout error:", error)
      return false
    }
  }

  static async changePassword(username: string, oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      // Get user by username
      const { data: user, error } = await supabase.from("admin_users").select("*").eq("username", username).single()

      if (error || !user) return false

      // Verify old password (in production, use proper bcrypt comparison)
      const isValidOldPassword = oldPassword === "AiNest2024!"
      if (!isValidOldPassword) return false

      // In production, hash the new password before storing
      // For demo purposes, we'll store it as is (NOT RECOMMENDED)
      const { error: updateError } = await supabase
        .from("admin_users")
        .update({ password_hash: newPassword }) // In production, hash this
        .eq("id", user.id)

      return !updateError
    } catch (error) {
      console.error("Password change error:", error)
      return false
    }
  }

  static async cleanExpiredSessions(): Promise<void> {
    try {
      await supabase.from("admin_sessions").delete().lt("expires_at", new Date().toISOString())
    } catch (error) {
      console.error("Session cleanup error:", error)
    }
  }

  private static generateSessionToken(): string {
    return `admin_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`
  }
}
