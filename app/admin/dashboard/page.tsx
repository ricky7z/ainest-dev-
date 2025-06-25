async function fetchDashboardData() {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    // Fetch essential data first
    const [contactsResult, chatResult, adminResult] = await Promise.all([
      supabase.from('contact_submissions').select('count').single(),
      supabase.from('chat_sessions').select('count').single(),
      supabase.from('admin_users').select('count').single()
    ]);

    // Fetch optional data with Promise.allSettled
    const optionalTables = [
      { name: 'blog_posts', promise: supabase.from('blog_posts').select('count').single() },
      { name: 'testimonials', promise: supabase.from('testimonials').select('count').single() },
      { name: 'case_studies', promise: supabase.from('case_studies').select('count').single() },
      { name: 'team_members', promise: supabase.from('team_members').select('count').single() },
      { name: 'work_sessions', promise: supabase.from('work_sessions').select('duration, hourly_rate').gt('status', 'completed') }
    ];

    const optionalResults = await Promise.allSettled(optionalTables.map(table => table.promise));
    
    // Initialize stats with essential data
    const stats = {
      totalContacts: contactsResult.data?.count || 0,
      totalChatSessions: chatResult.data?.count || 0,
      totalAdmins: adminResult.data?.count || 0,
      totalBlogPosts: 0,
      totalTestimonials: 0,
      totalCaseStudies: 0,
      totalTeamMembers: 0,
      totalWorkHours: 0,
      totalRevenue: 0
    };

    // Process optional results
    optionalResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const tableName = optionalTables[index].name;
        if (tableName === 'work_sessions') {
          const sessions = result.value.data || [];
          stats.totalWorkHours = sessions.reduce((total, session) => total + (session.duration || 0), 0);
          stats.totalRevenue = sessions.reduce((total, session) => total + ((session.duration || 0) * (session.hourly_rate || 0)), 0);
        } else {
          stats[`total${tableName.charAt(0).toUpperCase() + tableName.slice(1)}`] = result.value.data?.count || 0;
        }
      }
    });

    // Fetch recent activity
    const recentActivity = await Promise.all([
      supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('chat_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('work_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    return {
      stats,
      recentContacts: recentActivity[0].data || [],
      recentChats: recentActivity[1].data || [],
      recentWorkSessions: recentActivity[2].data || []
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

export default async function AdminDashboard() {
  try {
    const { stats, recentContacts, recentChats, recentWorkSessions } = await fetchDashboardData();

    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <DashboardStats stats={stats} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RecentActivity
            title="Recent Contacts"
            items={recentContacts}
            type="contacts"
          />
          <RecentActivity
            title="Recent Chats"
            items={recentChats}
            type="chats"
          />
          <RecentActivity
            title="Recent Work"
            items={recentWorkSessions}
            type="work"
          />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-medium">Error Loading Dashboard</h2>
          <p className="text-red-600 mt-1">
            There was an error loading the dashboard data. Please try refreshing the page or contact support if the issue persists.
          </p>
        </div>
      </div>
    );
  }
}
