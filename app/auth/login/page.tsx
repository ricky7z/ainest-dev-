import { LoginForm } from "@/components/auth/login-form"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/admin")
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