-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES admin_users(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  client_title VARCHAR(100),
  client_company VARCHAR(100),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  client_name VARCHAR(100),
  industry VARCHAR(100),
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  featured_image TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  bio TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_sessions table if not exists
CREATE TABLE IF NOT EXISTS work_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id) NOT NULL,
  description TEXT NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  project_type VARCHAR(50),
  billable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_work_sessions_admin ON work_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_work_sessions_status ON work_sessions(status);

-- Add RLS policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_sessions ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read access for published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for approved testimonials" ON testimonials
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public read access for published case studies" ON case_studies
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for active team members" ON team_members
  FOR SELECT USING (is_active = true);

-- Admin access policies
CREATE POLICY "Admin full access to blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to case studies" ON case_studies
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to team members" ON team_members
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin access to work sessions" ON work_sessions
  FOR ALL USING (
    auth.role() = 'authenticated' AND (
      admin_id = auth.uid() OR 
      EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid() AND (is_super_admin = true OR role = 'super_admin')
      )
    )
  );

-- Add updated_at triggers
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at
    BEFORE UPDATE ON case_studies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_sessions_updated_at
    BEFORE UPDATE ON work_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 