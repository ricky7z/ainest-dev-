// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname

  // 1. If user is NOT logged in and is trying to access /admin, redirect to login
  if (!session && pathname.startsWith('/admin')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/login'
    redirectUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // 2. If user IS logged in but visits /auth/login, redirect to dashboard only if super admin
  if (session && pathname.startsWith('/auth/login')) {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('is_super_admin')
      .eq('id', session.user.id)
      .single()

    if (adminUser?.is_super_admin) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // 3. If user is logged in but NOT super admin, and tries to access /admin, block them
  if (session && pathname.startsWith('/admin')) {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('is_super_admin')
      .eq('id', session.user.id)
      .single()

    if (!adminUser?.is_super_admin) {
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
