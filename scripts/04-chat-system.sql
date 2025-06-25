-- Create chat_sessions table
CREATE TABLE chat_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_name VARCHAR(100),
  user_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL REFERENCES chat_sessions(session_id),
  message TEXT NOT NULL,
  sender VARCHAR(20) NOT NULL CHECK (sender IN ('user', 'ai', 'admin')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Create indexes for better performance
CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp);

-- Insert some sample chat data
INSERT INTO chat_sessions (session_id, user_name, user_email, status) VALUES
('demo-session-1', 'John Doe', 'john@example.com', 'active'),
('demo-session-2', 'Jane Smith', 'jane@example.com', 'closed');

INSERT INTO chat_messages (session_id, message, sender) VALUES
('demo-session-1', 'Hello! I need help with AI integration for my business.', 'user'),
('demo-session-1', 'Hi John! I''d be happy to help you with AI integration. What specific areas are you looking to automate or enhance?', 'ai'),
('demo-session-1', 'I want to add a chatbot to my e-commerce website.', 'user'),
('demo-session-1', 'That''s a great choice! AI chatbots can significantly improve customer service and sales conversion. We offer custom chatbot development that can handle product recommendations, order tracking, and customer support. Would you like to schedule a consultation to discuss your specific requirements?', 'ai'),
('demo-session-2', 'What are your pricing plans?', 'user'),
('demo-session-2', 'We have three main pricing tiers: Starter (₵1,188/month), Pro (₵2,988/month), and Enterprise (custom pricing). Each plan includes different features and support levels. Would you like me to explain what''s included in each plan?', 'ai');
