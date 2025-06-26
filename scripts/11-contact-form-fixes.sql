-- Drop and recreate contact_submissions table with correct schema
DROP TABLE IF EXISTS contact_submissions;

CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(100),
  phone VARCHAR(50),
  budget VARCHAR(50),
  message TEXT NOT NULL,
  selected_package UUID REFERENCES pricing_plans(id),
  selected_addon UUID REFERENCES add_ons(id),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'closed')),
  assigned_to UUID REFERENCES admin_users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_assigned_to ON contact_submissions(assigned_to);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public insert access for contact submissions" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access to contact submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger for updating updated_at
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO contact_submissions (name, email, message, status) VALUES
  ('John Doe', 'john@example.com', 'Interested in AI integration services', 'new'),
  ('Jane Smith', 'jane@example.com', 'Looking for web development consultation', 'in_progress'); 