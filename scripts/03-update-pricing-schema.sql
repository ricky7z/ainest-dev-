-- Update pricing_plans table to match new schema
ALTER TABLE pricing_plans 
RENAME COLUMN name TO title;

ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'GHS';

ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS tier VARCHAR(20);

-- Drop the old price columns and add new single price column
ALTER TABLE pricing_plans 
DROP COLUMN IF EXISTS price_ghs,
DROP COLUMN IF EXISTS price_usd;

ALTER TABLE pricing_plans 
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) NOT NULL DEFAULT 0;

-- Update existing data
UPDATE pricing_plans SET 
  tier = CASE 
    WHEN title = 'Starter' THEN 'starter'
    WHEN title = 'Pro' THEN 'pro'
    WHEN title = 'Enterprise' THEN 'enterprise'
    ELSE 'starter'
  END,
  price = CASE 
    WHEN title = 'Starter' THEN 1188.00
    WHEN title = 'Pro' THEN 2988.00
    WHEN title = 'Enterprise' THEN 0.00
    ELSE 0.00
  END,
  currency = 'GHS';

-- Insert USD versions of the plans
INSERT INTO pricing_plans (title, price, currency, tier, billing_period, features, is_popular) VALUES
('Starter', 99.00, 'USD', 'starter', 'monthly', ARRAY['Basic Website Design', 'Mobile Responsive', '5 Pages', 'Contact Form', 'Basic SEO', '1 Month Support'], false),
('Pro', 249.00, 'USD', 'pro', 'monthly', ARRAY['Advanced Website Design', 'Mobile Responsive', '10 Pages', 'Contact Form', 'Advanced SEO', 'AI Chatbot Integration', 'Analytics Dashboard', '3 Months Support', 'Content Management'], true),
('Enterprise', 0.00, 'USD', 'enterprise', 'custom', ARRAY['Custom Solution', 'Unlimited Pages', 'Advanced AI Features', 'Custom Integrations', 'Priority Support', 'Dedicated Account Manager', '12 Months Support', 'Training & Consultation'], false);
