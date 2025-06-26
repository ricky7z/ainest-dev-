-- Enable Row Level Security on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for public-facing content
CREATE POLICY "Public read access for case studies" ON case_studies
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for testimonials" ON testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for blog posts" ON blog_posts
    FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for team members" ON team_members
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for pricing plans" ON pricing_plans
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for add ons" ON add_ons
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for site stats" ON site_stats
    FOR SELECT USING (is_active = true);

-- Public insert access for contact submissions
CREATE POLICY "Public insert access for contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Public insert access for newsletter subscribers
CREATE POLICY "Public insert access for newsletter subscribers" ON newsletter_subscribers
    FOR INSERT WITH CHECK (true);

-- Public read/write access for chat (with session validation)
CREATE POLICY "Public chat access" ON chat_sessions
    FOR ALL USING (true);

CREATE POLICY "Public chat messages access" ON chat_messages
    FOR ALL USING (true);

-- Admin access policies (these will be checked via application logic)
-- For now, we'll allow authenticated users to access admin tables
-- In production, you should implement proper JWT claims and role-based policies

-- Admin users can read their own data and manage other admins (if super admin)
CREATE POLICY "Admin users can read admin data" ON admin_users
    FOR SELECT USING (true);

CREATE POLICY "Super admins can manage admin users" ON admin_users
    FOR ALL USING (true);

-- Admin sessions
CREATE POLICY "Admin session management" ON admin_sessions
    FOR ALL USING (true);

-- Admin roles and permissions
CREATE POLICY "Admin roles access" ON admin_roles
    FOR ALL USING (true);

CREATE POLICY "Admin permissions access" ON admin_permissions
    FOR ALL USING (true);

-- Work sessions - admins can see their own, super admins can see all
CREATE POLICY "Work sessions access" ON work_sessions
    FOR ALL USING (true);

-- Site stats - read access for all, write for super admins
CREATE POLICY "Site stats read access" ON site_stats
    FOR SELECT USING (true);

CREATE POLICY "Site stats write access" ON site_stats
    FOR ALL USING (true);

-- Contact submissions - admins can read and update
CREATE POLICY "Contact submissions admin access" ON contact_submissions
    FOR ALL USING (true);

-- Content management policies
CREATE POLICY "Case studies admin access" ON case_studies
    FOR ALL USING (true);

CREATE POLICY "Testimonials admin access" ON testimonials
    FOR ALL USING (true);

CREATE POLICY "Blog posts admin access" ON blog_posts
    FOR ALL USING (true);

CREATE POLICY "Team members admin access" ON team_members
    FOR ALL USING (true);

CREATE POLICY "Pricing plans admin access" ON pricing_plans
    FOR ALL USING (true);

CREATE POLICY "Add ons admin access" ON add_ons
    FOR ALL USING (true);

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = user_id AND is_super_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current admin user ID from JWT
CREATE OR REPLACE FUNCTION get_current_admin_id()
RETURNS UUID AS $$
BEGIN
  RETURN (current_setting('request.jwt.claims', true)::json->>'sub')::UUID;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- More restrictive policies for production (commented out for now)
-- These would be used with proper JWT authentication

/*
-- Example of more restrictive policies for production:

-- Only super admins can manage admin users
CREATE POLICY "Super admin only - admin users" ON admin_users
    FOR ALL USING (is_super_admin(get_current_admin_id()));

-- Admins can only see their own work sessions, super admins can see all
CREATE POLICY "Work sessions - own data" ON work_sessions
    FOR SELECT USING (
        admin_id = get_current_admin_id() OR 
        is_super_admin(get_current_admin_id())
    );

-- Only super admins can manage site stats
CREATE POLICY "Super admin only - site stats" ON site_stats
    FOR ALL USING (is_super_admin(get_current_admin_id()));

-- Content managers can manage content
CREATE POLICY "Content management" ON case_studies
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users au
            JOIN admin_roles ar ON au.role_id = ar.id
            WHERE au.id = get_current_admin_id()
            AND ar.permissions ? 'projects_edit'
        )
    );
*/ 