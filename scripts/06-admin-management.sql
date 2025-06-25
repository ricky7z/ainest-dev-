-- Create admin_roles table for role-based access control
CREATE TABLE admin_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_permissions table for granular permissions
CREATE TABLE admin_permissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  resource VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Update admin_users table to include role_id and additional fields
ALTER TABLE admin_users ADD COLUMN role_id UUID REFERENCES admin_roles(id);
ALTER TABLE admin_users ADD COLUMN hourly_rate DECIMAL(10,2) DEFAULT 0;
ALTER TABLE admin_users ADD COLUMN is_super_admin BOOLEAN DEFAULT false;
ALTER TABLE admin_users ADD COLUMN last_activity TIMESTAMP WITH TIME ZONE;
ALTER TABLE admin_users ADD COLUMN session_timeout INTEGER DEFAULT 30; -- minutes

-- Create work_sessions table for tracking admin work time
CREATE TABLE work_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  activity_type VARCHAR(50) NOT NULL, -- 'active', 'break', 'inactive'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_stats table for managing homepage statistics
CREATE TABLE site_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stat_key VARCHAR(100) NOT NULL UNIQUE,
  stat_value VARCHAR(100) NOT NULL,
  stat_label VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create case_studies table (if not exists)
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  client VARCHAR(100),
  category VARCHAR(50) NOT NULL,
  technologies TEXT[] NOT NULL,
  image_url TEXT,
  project_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default permissions
INSERT INTO admin_permissions (name, description, resource, action) VALUES
('dashboard_view', 'View admin dashboard', 'dashboard', 'view'),
('contacts_view', 'View contact submissions', 'contacts', 'view'),
('contacts_edit', 'Edit contact submissions', 'contacts', 'edit'),
('contacts_delete', 'Delete contact submissions', 'contacts', 'delete'),
('blog_view', 'View blog posts', 'blog', 'view'),
('blog_create', 'Create blog posts', 'blog', 'create'),
('blog_edit', 'Edit blog posts', 'blog', 'edit'),
('blog_delete', 'Delete blog posts', 'blog', 'delete'),
('testimonials_view', 'View testimonials', 'testimonials', 'view'),
('testimonials_create', 'Create testimonials', 'testimonials', 'create'),
('testimonials_edit', 'Edit testimonials', 'testimonials', 'edit'),
('testimonials_delete', 'Delete testimonials', 'testimonials', 'delete'),
('projects_view', 'View case studies', 'projects', 'view'),
('projects_create', 'Create case studies', 'projects', 'create'),
('projects_edit', 'Edit case studies', 'projects', 'edit'),
('projects_delete', 'Delete case studies', 'projects', 'delete'),
('team_view', 'View team members', 'team', 'view'),
('team_create', 'Create team members', 'team', 'create'),
('team_edit', 'Edit team members', 'team', 'edit'),
('team_delete', 'Delete team members', 'team', 'delete'),
('pricing_view', 'View pricing plans', 'pricing', 'view'),
('pricing_edit', 'Edit pricing plans', 'pricing', 'edit'),
('chat_view', 'View chat messages', 'chat', 'view'),
('chat_reply', 'Reply to chat messages', 'chat', 'reply'),
('stats_view', 'View site statistics', 'stats', 'view'),
('stats_edit', 'Edit site statistics', 'stats', 'edit'),
('admins_view', 'View admin users', 'admins', 'view'),
('admins_create', 'Create admin users', 'admins', 'create'),
('admins_edit', 'Edit admin users', 'admins', 'edit'),
('admins_delete', 'Delete admin users', 'admins', 'delete'),
('roles_view', 'View admin roles', 'roles', 'view'),
('roles_create', 'Create admin roles', 'roles', 'create'),
('roles_edit', 'Edit admin roles', 'roles', 'edit'),
('roles_delete', 'Delete admin roles', 'roles', 'delete'),
('work_tracking_view', 'View work tracking', 'work_tracking', 'view'),
('work_tracking_edit', 'Edit work tracking', 'work_tracking', 'edit');

-- Insert default roles
INSERT INTO admin_roles (name, description, permissions) VALUES
('Super Admin', 'Full access to all features', 
  '["dashboard_view", "contacts_view", "contacts_edit", "contacts_delete", "blog_view", "blog_create", "blog_edit", "blog_delete", "testimonials_view", "testimonials_create", "testimonials_edit", "testimonials_delete", "projects_view", "projects_create", "projects_edit", "projects_delete", "team_view", "team_create", "team_edit", "team_delete", "pricing_view", "pricing_edit", "chat_view", "chat_reply", "stats_view", "stats_edit", "admins_view", "admins_create", "admins_edit", "admins_delete", "roles_view", "roles_create", "roles_edit", "roles_delete", "work_tracking_view", "work_tracking_edit"]'),
('Content Manager', 'Manage content including blog, testimonials, and projects', 
  '["dashboard_view", "blog_view", "blog_create", "blog_edit", "blog_delete", "testimonials_view", "testimonials_create", "testimonials_edit", "testimonials_delete", "projects_view", "projects_create", "projects_edit", "projects_delete", "team_view", "team_create", "team_edit", "team_delete"]'),
('Support Agent', 'Handle customer support and chat', 
  '["dashboard_view", "contacts_view", "contacts_edit", "chat_view", "chat_reply"]'),
('Analyst', 'View analytics and statistics', 
  '["dashboard_view", "stats_view", "work_tracking_view"]');

-- Update existing admin user to be super admin
UPDATE admin_users SET 
  role_id = (SELECT id FROM admin_roles WHERE name = 'Super Admin'),
  is_super_admin = true,
  hourly_rate = 50.00
WHERE username = 'admin';

-- Insert default site stats
INSERT INTO site_stats (stat_key, stat_value, stat_label, sort_order) VALUES
('projects_completed', '50+', 'Projects Completed', 1),
('happy_clients', '30+', 'Happy Clients', 2),
('years_experience', '5+', 'Years Experience', 3),
('support_available', '24/7', 'Support Available', 4);

-- Create indexes for better performance
CREATE INDEX idx_work_sessions_admin_id ON work_sessions(admin_id);
CREATE INDEX idx_work_sessions_start_time ON work_sessions(start_time);
CREATE INDEX idx_admin_users_role_id ON admin_users(role_id);
CREATE INDEX idx_admin_users_last_activity ON admin_users(last_activity); 