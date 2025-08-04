-- AI Chat and Multi-Agent Collaboration System Database Schema
-- Essentials Enhanced SaaS Platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- Users table (extends existing auth.users)
CREATE TABLE IF NOT EXISTS ai_chat_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat sessions table
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  session_name TEXT,
  session_type TEXT CHECK (session_type IN ('chat', 'collab_room', 'automation_builder')),
  scenario TEXT,
  selected_agents TEXT[],
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  message_type TEXT CHECK (message_type IN ('user', 'ai', 'agent', 'system')),
  agent_name TEXT,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  function_calls JSONB,
  tool_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User memory and context table
CREATE TABLE IF NOT EXISTS ai_user_memory (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  memory_type TEXT CHECK (memory_type IN ('campaign', 'drop', 'performance', 'preference', 'interaction')),
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  embedding VECTOR(1536),
  importance_score FLOAT DEFAULT 1.0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent definitions and capabilities
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  capabilities TEXT[],
  api_endpoints JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent collaboration logs
CREATE TABLE IF NOT EXISTS ai_agent_collaborations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  agent1_name TEXT NOT NULL,
  agent2_name TEXT NOT NULL,
  scenario TEXT NOT NULL,
  conversation_flow JSONB,
  final_summary TEXT,
  user_feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation rules table
CREATE TABLE IF NOT EXISTS ai_automation_rules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  trigger_condition JSONB NOT NULL,
  actions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  last_triggered TIMESTAMP WITH TIME ZONE,
  trigger_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation execution logs
CREATE TABLE IF NOT EXISTS ai_automation_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  rule_id UUID REFERENCES ai_automation_rules(id) ON DELETE CASCADE,
  trigger_data JSONB,
  execution_result JSONB,
  success BOOLEAN,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI feedback and learning system
CREATE TABLE IF NOT EXISTS ai_feedback_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  action_data JSONB,
  user_response TEXT CHECK (user_response IN ('accepted', 'ignored', 'modified', 'rejected')),
  feedback_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Real-time data connections
CREATE TABLE IF NOT EXISTS ai_data_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  connection_type TEXT CHECK (connection_type IN ('meta_ads', 'shopify', 'google_sheets', 'custom')),
  connection_name TEXT NOT NULL,
  credentials JSONB,
  is_active BOOLEAN DEFAULT true,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Voice and language preferences
CREATE TABLE IF NOT EXISTS ai_user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES ai_chat_users(id) ON DELETE CASCADE,
  preferred_language TEXT DEFAULT 'en',
  voice_enabled BOOLEAN DEFAULT false,
  auto_translate BOOLEAN DEFAULT false,
  notification_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_chat_sessions_user_id ON ai_chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_messages_session_id ON ai_chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_ai_user_memory_user_id ON ai_user_memory(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_user_memory_embedding ON ai_user_memory USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_ai_automation_rules_user_id ON ai_automation_rules(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_feedback_logs_user_id ON ai_feedback_logs(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE ai_chat_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_user_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_data_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON ai_chat_users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can view own sessions" ON ai_chat_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own messages" ON ai_chat_messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own memory" ON ai_user_memory FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "All users can view agents" ON ai_agents FOR SELECT USING (true);
CREATE POLICY "Users can view own collaborations" ON ai_agent_collaborations FOR ALL USING (auth.uid() = (SELECT user_id FROM ai_chat_sessions WHERE id = session_id));
CREATE POLICY "Users can view own automations" ON ai_automation_rules FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own automation logs" ON ai_automation_logs FOR ALL USING (auth.uid() = (SELECT user_id FROM ai_automation_rules WHERE id = rule_id));
CREATE POLICY "Users can view own feedback" ON ai_feedback_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own connections" ON ai_data_connections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own preferences" ON ai_user_preferences FOR ALL USING (auth.uid() = user_id);

-- Helper functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_ai_chat_users_updated_at BEFORE UPDATE ON ai_chat_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_chat_sessions_updated_at BEFORE UPDATE ON ai_chat_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_user_memory_updated_at BEFORE UPDATE ON ai_user_memory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_agents_updated_at BEFORE UPDATE ON ai_agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_automation_rules_updated_at BEFORE UPDATE ON ai_automation_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_data_connections_updated_at BEFORE UPDATE ON ai_data_connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_user_preferences_updated_at BEFORE UPDATE ON ai_user_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default agents
INSERT INTO ai_agents (name, display_name, description, icon, capabilities) VALUES
('ad_expert', 'Ad Expert Agent', 'Analyzes Meta/Google Ads performance, ROAS, CTR, and fatigue patterns', '🧠', ARRAY['meta_ads', 'google_ads', 'performance_analysis', 'fatigue_detection']),
('budget_planner', 'Budget Planner Agent', 'Optimizes budget allocation and creates scaling plans', '💸', ARRAY['budget_optimization', 'scaling_plans', 'roi_analysis', 'cost_efficiency']),
('seo_agent', 'SEO Agent', 'Optimizes product copy, keywords, and SEO metadata', '🎯', ARRAY['seo_optimization', 'keyword_research', 'copy_optimization', 'metadata_analysis']),
('product_analytics', 'Product Analytics Agent', 'Analyzes sales, refunds, and product performance', '📦', ARRAY['sales_analysis', 'refund_tracking', 'product_ranking', 'inventory_optimization']),
('launch_strategist', 'Launch Strategist Agent', 'Plans drop calendars and offer strategies', '📆', ARRAY['launch_planning', 'offer_strategy', 'timing_optimization', 'campaign_scheduling']),
('creative_strategist', 'Creative Strategist Agent', 'Optimizes hooks, visuals, and detects creative fatigue', '🎨', ARRAY['creative_optimization', 'hook_analysis', 'visual_strategy', 'fatigue_detection']),
('targeting_specialist', 'Targeting Specialist Agent', 'Optimizes audience targeting and placement', '🧠', ARRAY['audience_targeting', 'geo_optimization', 'interest_groups', 'placement_strategy']),
('funnel_fixer', 'Funnel Fixer Agent', 'Analyzes and optimizes conversion funnels', '🗂️', ARRAY['funnel_analysis', 'conversion_optimization', 'drop_off_tracking', 'checkout_optimization']),
('data_analyst', 'Data Analyst Agent', 'Finds patterns across time segments and campaigns', '📊', ARRAY['pattern_analysis', 'trend_detection', 'data_visualization', 'insight_generation']),
('offer_strategist', 'Offer Strategist Agent', 'Suggests urgency offers and product bundles', '🧵', ARRAY['offer_optimization', 'urgency_creation', 'bundle_strategy', 'pricing_optimization']),
('automation_agent', 'Automation Agent', 'Creates automation rules and workflows', '🤖', ARRAY['workflow_automation', 'rule_creation', 'trigger_setup', 'action_automation']),
('customer_behavior', 'Customer Behavior Agent', 'Analyzes returning customers and VIP buyers', '🧑‍🤝‍🧑', ARRAY['customer_analysis', 'vip_identification', 'retention_strategy', 'loyalty_optimization']),
('content_distributor', 'Content Distributor Agent', 'Distributes content across platforms', '📲', ARRAY['content_distribution', 'platform_optimization', 'cross_posting', 'engagement_tracking']);

-- Insert default scenarios
INSERT INTO ai_chat_sessions (user_id, session_name, session_type, scenario, selected_agents) VALUES
(uuid_generate_v4(), 'Default Chat', 'chat', 'General Ad Performance Discussion', ARRAY[]),
(uuid_generate_v4(), 'ROAS Optimization', 'collab_room', 'Fix low ROAS campaign', ARRAY['ad_expert', 'budget_planner']),
(uuid_generate_v4(), 'Creative Fatigue', 'collab_room', 'Address creative fatigue and refresh strategy', ARRAY['creative_strategist', 'data_analyst']),
(uuid_generate_v4(), 'Launch Planning', 'collab_room', 'Plan next product drop', ARRAY['launch_strategist', 'offer_strategist']),
(uuid_generate_v4(), 'Funnel Optimization', 'collab_room', 'Optimize conversion funnel', ARRAY['funnel_fixer', 'targeting_specialist']);

COMMIT; 