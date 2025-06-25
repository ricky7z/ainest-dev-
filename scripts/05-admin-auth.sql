-- Create admin_users table (if not exists)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_super_admin BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for super admin
CREATE INDEX IF NOT EXISTS idx_admin_users_super_admin ON admin_users(is_super_admin);

-- Insert default super admin user (replace with your UUID and email)
INSERT INTO admin_users (id, email, username, role, is_super_admin, is_active)
VALUES ('00000000-0000-0000-0000-000000000001', 'superadmin@ainest.com', 'superadmin', 'super_admin', true, true)
ON CONFLICT (id) DO NOTHING;

-- Create admin_sessions table for custom session management (if needed)
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
