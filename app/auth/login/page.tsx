// app/auth/login/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("is_super_admin")
      .eq("id", session.user.id)
      .single()

    if (adminUser?.is_super_admin) {
      redirect("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your admin account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

