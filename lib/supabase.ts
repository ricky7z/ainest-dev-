import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface PricingPlan {
  id: string
  title: string // Changed from 'name' to 'title'
  price: number // Single price field
  features: string[]
  currency: string // Add currency field
  tier: string // Add tier field (starter, pro, enterprise)
  billing_period: string
  is_popular: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  company?: string
  role?: string
  content: string
  rating: number
  avatar_url?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
}

export interface CaseStudy {
  id: string
  title: string
  description: string
  client?: string
  category: string
  technologies: string[]
  image_url?: string
  project_url?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  author: string
  category?: string
  tags?: string[]
  image_url?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  avatar_url?: string
  linkedin_url?: string
  twitter_url?: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  budget?: string
  message: string
  selected_package?: string
  selected_addon?: string
  status: 'new' | 'in_progress' | 'completed' | 'closed'
  assigned_to?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}

export interface AddOn {
  id: string
  name: string
  description?: string
  price_ghs: number
  price_usd: number
  is_active: boolean
  created_at: string
}

// New interfaces for admin management
export interface AdminUser {
  id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email: string;
  username: string;
  role: string;
  is_super_admin: boolean;
  is_active: boolean;
  session_timeout: number;
  hourly_rate: number;
  last_login?: string;
  last_activity?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  created_at: string;
}

export interface AdminSession {
  id: string;
  admin_id: string;
  token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface WorkSession {
  id: string
  admin_id: string
  admin?: AdminUser
  start_time: string
  end_time?: string
  duration_minutes?: number
  activity_type: 'active' | 'break' | 'inactive'
  description?: string
  created_at: string
}

export interface SiteStat {
  id: string
  stat_key: string
  stat_value: string
  stat_label: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ChatSession {
  id: string
  session_id: string
  user_name?: string
  user_email?: string
  status: 'active' | 'closed'
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  message: string
  sender: 'user' | 'ai' | 'admin'
  timestamp: string
  metadata?: Record<string, any>
}

export interface ServiceStatus {
  id: string
  name: string
  status: 'operational' | 'maintenance' | 'degraded' | 'outage'
  message?: string
  updated_at: string
  created_at: string
}
