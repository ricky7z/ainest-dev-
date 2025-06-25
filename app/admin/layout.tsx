import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AdminNavigation } from '@/components/admin/admin-navigation'
import { AdminHeader } from '@/components/admin/admin-header'
import AdminClientProvider from '@/components/admin/admin-client-provider'

async function getSession() {
  const supabase = createServerComponentClient({ cookies })
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      redirect('/auth/login')
    }
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', session.user.id)
      .single()
    if (!adminUser || !adminUser.is_active || !adminUser.is_super_admin) {
      redirect('/auth/login')
    }
    return {
      session,
      adminUser
    }
  } catch (error) {
    console.error('Error getting session:', error)
    redirect('/auth/login')
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session, adminUser } = await getSession()
  return (
    <div className="flex h-screen">
      <AdminNavigation user={adminUser} />
      <div className="flex-1 flex flex-col min-h-0">
        <AdminHeader user={adminUser} />
        <main className="flex-1 overflow-y-auto bg-muted/10">
          <AdminClientProvider>
            {children}
          </AdminClientProvider>
        </main>
      </div>
    </div>
  )
}
