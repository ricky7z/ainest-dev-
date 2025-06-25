-- Add pricing_plan_id and add_on_ids to contact_submissions
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS pricing_plan_id UUID;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS add_on_ids UUID[]; 