-- AdPilot AI Database Schema for Next-Generation Ad Performance System

-- Users and Teams
CREATE TABLE IF NOT EXISTS adpilot_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'analyst', 'user')),
    team_id UUID,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS adpilot_teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    plan VARCHAR(50) DEFAULT 'basic' CHECK (plan IN ('basic', 'pro', 'enterprise')),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns
CREATE TABLE IF NOT EXISTS adpilot_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('meta', 'google', 'tiktok', 'linkedin', 'twitter')),
    campaign_type VARCHAR(50) NOT NULL CHECK (campaign_type IN ('cold', 'warm', 'retargeting', 'lookalike', 'custom')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'draft')),
    budget DECIMAL(12,2) DEFAULT 0,
    spent DECIMAL(12,2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    roas DECIMAL(5,2) DEFAULT 0,
    ctr DECIMAL(5,2) DEFAULT 0,
    cpm DECIMAL(8,2) DEFAULT 0,
    cpc DECIMAL(8,2) DEFAULT 0,
    frequency DECIMAL(5,2) DEFAULT 0,
    health_score INTEGER DEFAULT 0,
    goal_match_score INTEGER DEFAULT 0,
    fatigue_forecast_date TIMESTAMP WITH TIME ZONE,
    ai_recommendations JSONB,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES adpilot_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ad Sets
CREATE TABLE IF NOT EXISTS adpilot_ad_sets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES adpilot_campaigns(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    audience_type VARCHAR(50) CHECK (audience_type IN ('custom', 'lookalike', 'interest', 'retargeting')),
    audience_data JSONB,
    budget DECIMAL(12,2) DEFAULT 0,
    spent DECIMAL(12,2) DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    frequency DECIMAL(5,2) DEFAULT 0,
    overlap_percentage DECIMAL(5,2) DEFAULT 0,
    saturation_score INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ads
CREATE TABLE IF NOT EXISTS adpilot_ads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_set_id UUID REFERENCES adpilot_ad_sets(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    creative_id UUID,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'rejected', 'pending')),
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    spend DECIMAL(12,2) DEFAULT 0,
    ctr DECIMAL(5,2) DEFAULT 0,
    cpc DECIMAL(8,2) DEFAULT 0,
    roas DECIMAL(5,2) DEFAULT 0,
    fatigue_score INTEGER DEFAULT 0,
    performance_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creatives
CREATE TABLE IF NOT EXISTS adpilot_creatives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('image', 'video', 'carousel', 'story')),
    platform VARCHAR(50) NOT NULL,
    media_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    dimensions JSONB,
    duration INTEGER, -- for videos
    hook_strength INTEGER DEFAULT 0,
    cta_placement_score INTEGER DEFAULT 0,
    color_contrast_score INTEGER DEFAULT 0,
    visual_clutter_score INTEGER DEFAULT 0,
    branding_clarity_score INTEGER DEFAULT 0,
    overall_score INTEGER DEFAULT 0,
    ai_analysis JSONB,
    tags TEXT[],
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES adpilot_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Actions and Recommendations
CREATE TABLE IF NOT EXISTS adpilot_ai_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES adpilot_campaigns(id) ON DELETE CASCADE,
    ad_id UUID REFERENCES adpilot_ads(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('increase_budget', 'decrease_budget', 'turn_off', 'duplicate', 'rotate_creative', 'merge_audience', 'expand_audience')),
    reason TEXT NOT NULL,
    metrics JSONB,
    confidence_score INTEGER DEFAULT 0,
    executed BOOLEAN DEFAULT false,
    executed_at TIMESTAMP WITH TIME ZONE,
    result JSONB,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES adpilot_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scaling Logs
CREATE TABLE IF NOT EXISTS adpilot_scaling_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES adpilot_campaigns(id) ON DELETE CASCADE,
    scaling_type VARCHAR(50) NOT NULL CHECK (scaling_type IN ('budget_increase', 'budget_decrease', 'audience_expansion', 'creative_rotation')),
    old_value DECIMAL(12,2),
    new_value DECIMAL(12,2),
    percentage_change DECIMAL(5,2),
    performance_before JSONB,
    performance_after JSONB,
    success_score INTEGER DEFAULT 0,
    notes TEXT,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES adpilot_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts
CREATE TABLE IF NOT EXISTS adpilot_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type VARCHAR(50) NOT NULL CHECK (type IN ('performance_drop', 'fatigue_warning', 'budget_limit', 'overlap_detected', 'scaling_opportunity', 'creative_test_complete')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    campaign_id UUID REFERENCES adpilot_campaigns(id) ON DELETE CASCADE,
    ad_id UUID REFERENCES adpilot_ads(id) ON DELETE CASCADE,
    read BOOLEAN DEFAULT false,
    action_required BOOLEAN DEFAULT false,
    action_taken BOOLEAN DEFAULT false,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES adpilot_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audience Overlaps
CREATE TABLE IF NOT EXISTS adpilot_audience_overlaps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_set_1_id UUID REFERENCES adpilot_ad_sets(id) ON DELETE CASCADE,
    ad_set_2_id UUID REFERENCES adpilot_ad_sets(id) ON DELETE CASCADE,
    overlap_percentage DECIMAL(5,2) NOT NULL,
    recommendation VARCHAR(50) CHECK (recommendation IN ('merge', 'expand', 'keep_separate')),
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creative Testing
CREATE TABLE IF NOT EXISTS adpilot_creative_tests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    test_type VARCHAR(50) NOT NULL CHECK (test_type IN ('ab_test', 'multivariate', 'sequential')),
    status VARCHAR(50) DEFAULT 'running' CHECK (status IN ('running', 'completed', 'paused')),
    creative_a_id UUID REFERENCES adpilot_creatives(id) ON DELETE CASCADE,
    creative_b_id UUID REFERENCES adpilot_creatives(id) ON DELETE CASCADE,
    creative_c_id UUID REFERENCES adpilot_creatives(id) ON DELETE CASCADE,
    winner_id UUID REFERENCES adpilot_creatives(id) ON DELETE CASCADE,
    test_duration_days INTEGER DEFAULT 7,
    confidence_level DECIMAL(5,2),
    results JSONB,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES adpilot_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Metrics (Daily)
CREATE TABLE IF NOT EXISTS adpilot_daily_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES adpilot_campaigns(id) ON DELETE CASCADE,
    ad_id UUID REFERENCES adpilot_ads(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    spend DECIMAL(12,2) DEFAULT 0,
    revenue DECIMAL(12,2) DEFAULT 0,
    ctr DECIMAL(5,2) DEFAULT 0,
    cpc DECIMAL(8,2) DEFAULT 0,
    roas DECIMAL(5,2) DEFAULT 0,
    frequency DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, ad_id, date)
);

-- AI Models and Configurations
CREATE TABLE IF NOT EXISTS adpilot_ai_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    configuration JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    performance_metrics JSONB,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Autopilot Settings
CREATE TABLE IF NOT EXISTS adpilot_autopilot_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE,
    enabled BOOLEAN DEFAULT false,
    daily_budget_limit DECIMAL(12,2),
    max_scaling_percentage DECIMAL(5,2),
    min_roas_threshold DECIMAL(5,2),
    max_frequency_threshold DECIMAL(5,2),
    auto_pause_enabled BOOLEAN DEFAULT true,
    auto_creative_rotation BOOLEAN DEFAULT false,
    notification_preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funnel Tracking
CREATE TABLE IF NOT EXISTS adpilot_funnel_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES adpilot_campaigns(id) ON DELETE CASCADE,
    ad_id UUID REFERENCES adpilot_ads(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('impression', 'click', 'landing_page_view', 'add_to_cart', 'purchase', 'signup')),
    event_data JSONB,
    user_identifier VARCHAR(255),
    session_id VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    team_id UUID REFERENCES adpilot_teams(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_adpilot_campaigns_team_id ON adpilot_campaigns(team_id);
CREATE INDEX IF NOT EXISTS idx_adpilot_campaigns_status ON adpilot_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_adpilot_campaigns_health_score ON adpilot_campaigns(health_score);
CREATE INDEX IF NOT EXISTS idx_adpilot_ads_ad_set_id ON adpilot_ads(ad_set_id);
CREATE INDEX IF NOT EXISTS idx_adpilot_ads_status ON adpilot_ads(status);
CREATE INDEX IF NOT EXISTS idx_adpilot_ai_actions_campaign_id ON adpilot_ai_actions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_adpilot_ai_actions_executed ON adpilot_ai_actions(executed);
CREATE INDEX IF NOT EXISTS idx_adpilot_alerts_team_id ON adpilot_alerts(team_id);
CREATE INDEX IF NOT EXISTS idx_adpilot_alerts_read ON adpilot_alerts(read);
CREATE INDEX IF NOT EXISTS idx_adpilot_daily_metrics_date ON adpilot_daily_metrics(date);
CREATE INDEX IF NOT EXISTS idx_adpilot_daily_metrics_campaign_id ON adpilot_daily_metrics(campaign_id);

-- Enable RLS
ALTER TABLE adpilot_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_ad_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_ai_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_scaling_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_audience_overlaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_creative_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_ai_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_autopilot_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE adpilot_funnel_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own data" ON adpilot_users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own data" ON adpilot_users
    FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Team members can view team data" ON adpilot_campaigns
    FOR SELECT USING (team_id IN (
        SELECT team_id FROM adpilot_users WHERE id::text = auth.uid()::text
    ));

CREATE POLICY "Team members can insert team data" ON adpilot_campaigns
    FOR INSERT WITH CHECK (team_id IN (
        SELECT team_id FROM adpilot_users WHERE id::text = auth.uid()::text
    ));

CREATE POLICY "Team members can update team data" ON adpilot_campaigns
    FOR UPDATE USING (team_id IN (
        SELECT team_id FROM adpilot_users WHERE id::text = auth.uid()::text
    ));

-- Similar policies for other tables...

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_adpilot_users_updated_at BEFORE UPDATE ON adpilot_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_adpilot_teams_updated_at BEFORE UPDATE ON adpilot_teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_adpilot_campaigns_updated_at BEFORE UPDATE ON adpilot_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_adpilot_creatives_updated_at BEFORE UPDATE ON adpilot_creatives
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate health score
CREATE OR REPLACE FUNCTION calculate_campaign_health_score(
    p_roas DECIMAL,
    p_ctr DECIMAL,
    p_frequency DECIMAL,
    p_spend DECIMAL
) RETURNS INTEGER AS $$
BEGIN
    -- Complex health score calculation based on multiple factors
    RETURN CASE
        WHEN p_roas >= 4.0 AND p_ctr >= 2.0 AND p_frequency <= 2.0 THEN 90
        WHEN p_roas >= 3.0 AND p_ctr >= 1.5 AND p_frequency <= 3.0 THEN 75
        WHEN p_roas >= 2.0 AND p_ctr >= 1.0 AND p_frequency <= 4.0 THEN 60
        WHEN p_roas >= 1.5 AND p_ctr >= 0.8 THEN 45
        ELSE 30
    END;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate fatigue score
CREATE OR REPLACE FUNCTION calculate_fatigue_score(
    p_frequency DECIMAL,
    p_ctr_trend DECIMAL,
    p_impressions INTEGER
) RETURNS INTEGER AS $$
BEGIN
    -- Fatigue calculation based on frequency and CTR decline
    RETURN CASE
        WHEN p_frequency > 5.0 OR p_ctr_trend < -0.5 THEN 90
        WHEN p_frequency > 3.0 OR p_ctr_trend < -0.3 THEN 70
        WHEN p_frequency > 2.0 OR p_ctr_trend < -0.1 THEN 50
        ELSE 30
    END;
END;
$$ LANGUAGE plpgsql; 