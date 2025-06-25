import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is not signed in and the current path starts with /admin
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set(`redirectedFrom`, request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is signed in, check if they are a super admin
  if (session && request.nextUrl.pathname.startsWith('/admin')) {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('is_super_admin')
      .eq('id', session.user.id)
      .single()
    if (!adminUser || !adminUser.is_super_admin) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
} 