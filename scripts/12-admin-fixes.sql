-- Update admin_users table with missing columns for Supabase Auth
ALTER TABLE admin_users
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS email VARCHAR(255) NOT NULL DEFAULT 'admin@example.com',
ADD COLUMN IF NOT EXISTS username VARCHAR(100) NOT NULL DEFAULT 'admin',
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'admin',
ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS session_timeout INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS hourly_rate DECIMAL(10,2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create admin_roles table if not exists
CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  permissions TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_permissions table if not exists
CREATE TABLE IF NOT EXISTS admin_permissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  resource VARCHAR(50) NOT NULL,
  action VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_sessions table if not exists
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id) NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_roles_name ON admin_roles(name);

-- Create index for super admin
CREATE INDEX IF NOT EXISTS idx_admin_users_super_admin ON admin_users(is_super_admin);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admin users can read their own data" ON admin_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Super admins can manage all admin users" ON admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );

-- Create policies for admin_roles
CREATE POLICY "Admin roles read access" ON admin_roles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Super admins can manage roles" ON admin_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );

-- Create policies for admin_permissions
CREATE POLICY "Admin permissions read access" ON admin_permissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Super admins can manage permissions" ON admin_permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );

-- Create policies for admin_sessions
CREATE POLICY "Admin sessions self access" ON admin_sessions
  FOR ALL USING (admin_id = auth.uid());

CREATE POLICY "Super admins can manage all sessions" ON admin_sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE id = auth.uid() AND is_super_admin = true
    )
  );

-- Create trigger for updating updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_roles_updated_at
  BEFORE UPDATE ON admin_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_sessions_updated_at
  BEFORE UPDATE ON admin_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin role and permissions
INSERT INTO admin_roles (name, description, permissions) VALUES
('admin', 'Default administrator role', ARRAY[
  'dashboard_view',
  'blog_manage',
  'testimonials_manage',
  'case_studies_manage',
  'team_manage',
  'contacts_view',
  'contacts_manage',
  'chat_manage',
  'stats_view'
]) ON CONFLICT (name) DO NOTHING;

INSERT INTO admin_roles (name, description, permissions) VALUES
('super_admin', 'Super administrator role with full access', ARRAY[
  'dashboard_view',
  'blog_manage',
  'testimonials_manage',
  'case_studies_manage',
  'team_manage',
  'contacts_view',
  'contacts_manage',
  'chat_manage',
  'stats_view',
  'stats_manage',
  'admins_manage',
  'roles_manage',
  'work_tracking_view',
  'work_tracking_manage',
  'settings_view',
  'settings_manage'
]) ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO admin_permissions (name, description, resource, action) VALUES
('dashboard_view', 'View admin dashboard', 'dashboard', 'view'),
('blog_manage', 'Manage blog posts', 'blog', 'manage'),
('testimonials_manage', 'Manage testimonials', 'testimonials', 'manage'),
('case_studies_manage', 'Manage case studies', 'case_studies', 'manage'),
('team_manage', 'Manage team members', 'team', 'manage'),
('contacts_view', 'View contact submissions', 'contacts', 'view'),
('contacts_manage', 'Manage contact submissions', 'contacts', 'manage'),
('chat_manage', 'Manage chat sessions', 'chat', 'manage'),
('stats_view', 'View statistics', 'stats', 'view'),
('stats_manage', 'Manage statistics', 'stats', 'manage'),
('admins_manage', 'Manage admin users', 'admins', 'manage'),
('roles_manage', 'Manage roles and permissions', 'roles', 'manage'),
('work_tracking_view', 'View work tracking', 'work_tracking', 'view'),
('work_tracking_manage', 'Manage work tracking', 'work_tracking', 'manage'),
('settings_view', 'View settings', 'settings', 'view'),
('settings_manage', 'Manage settings', 'settings', 'manage')
ON CONFLICT (name) DO NOTHING; 