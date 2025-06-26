-- Fix chat_sessions table
ALTER TABLE chat_sessions 
ADD COLUMN IF NOT EXISTS visitor_id UUID,
ADD COLUMN IF NOT EXISTS user_agent VARCHAR(255);

-- Fix admin_users table
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);

-- Create service_status table if not exists
CREATE TABLE IF NOT EXISTS service_status (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('operational', 'maintenance', 'degraded', 'outage')),
  message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_status_name ON service_status(name);
CREATE INDEX IF NOT EXISTS idx_service_status_status ON service_status(status);

-- Insert default service statuses
INSERT INTO service_status (name, status, message) VALUES
('Website', 'operational', 'All systems operational'),
('API', 'operational', 'API services running normally'),
('Database', 'operational', 'Database services running normally'),
('Chat System', 'operational', 'Chat services running normally'),
('Admin Dashboard', 'operational', 'Admin services running normally')
ON CONFLICT (name) DO UPDATE SET
  status = EXCLUDED.status,
  message = EXCLUDED.message,
  updated_at = NOW();

-- Add RLS policies for service_status
ALTER TABLE service_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for service status" ON service_status
    FOR SELECT USING (true);

CREATE POLICY "Admin write access for service status" ON service_status
    FOR ALL USING (true);

-- Update chat_messages schema
ALTER TABLE chat_messages
ADD COLUMN IF NOT EXISTS content TEXT,
ADD COLUMN IF NOT EXISTS sender_type VARCHAR(20) CHECK (sender_type IN ('visitor', 'ai', 'admin')),
ADD COLUMN IF NOT EXISTS message_type VARCHAR(20) DEFAULT 'text';

-- Add missing columns to work_sessions
ALTER TABLE work_sessions
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active',
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add missing columns to contact_submissions
ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS company VARCHAR(100),
ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS project_type VARCHAR(100),
ADD COLUMN IF NOT EXISTS timeline VARCHAR(50),
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES admin_users(id),
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_service_status_updated_at
    BEFORE UPDATE ON service_status
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_sessions_updated_at
    BEFORE UPDATE ON work_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 