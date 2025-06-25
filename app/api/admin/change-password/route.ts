import { type NextRequest, NextResponse } from "next/server"
import { AdminAuth } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const { username, oldPassword, newPassword } = await request.json()

    if (!username || !oldPassword || !newPassword) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ message: "New password must be at least 8 characters long" }, { status: 400 })
    }

    const success = await AdminAuth.changePassword(username, oldPassword, newPassword)

    if (success) {
      return NextResponse.json({ message: "Password changed successfully" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "Invalid current password" }, { status: 401 })
    }
  } catch (error) {
    console.error("Password change error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
