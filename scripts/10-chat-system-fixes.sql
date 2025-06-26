-- Drop existing chat tables if they exist
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS chat_sessions;

-- Create chat_sessions table with correct schema
CREATE TABLE chat_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_name VARCHAR(100),
  user_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table with correct schema
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL REFERENCES chat_sessions(session_id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'ai', 'admin')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better performance
CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);

-- Enable Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for chat_sessions
CREATE POLICY "Public insert access for chat sessions" ON chat_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access for active chat sessions" ON chat_sessions
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admin full access to chat sessions" ON chat_sessions
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for chat_messages
CREATE POLICY "Public insert access for chat messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access for chat messages" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chat_sessions
      WHERE chat_sessions.session_id = chat_messages.session_id
      AND chat_sessions.status = 'active'
    )
  );

CREATE POLICY "Admin full access to chat messages" ON chat_messages
  FOR ALL USING (auth.role() = 'authenticated');

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating updated_at
CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO chat_sessions (session_id, status) VALUES
  ('demo-session-1', 'active'),
  ('demo-session-2', 'active');

INSERT INTO chat_messages (session_id, message, sender) VALUES
  ('demo-session-1', 'Hello! How can I help you today?', 'ai'),
  ('demo-session-1', 'I need help with AI integration', 'user'),
  ('demo-session-2', 'Welcome to AiNest! What brings you here today?', 'ai'),
  ('demo-session-2', 'Looking for web development services', 'user'); 