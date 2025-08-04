-- RageIntel™ Database Schema for Competitor Intelligence & Attack System

-- Competitors table
CREATE TABLE IF NOT EXISTS rageintel_competitors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    handle VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok', 'youtube', 'linkedin')),
    website VARCHAR(500),
    followers_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0,
    ad_spend DECIMAL(12,2) DEFAULT 0,
    threat_level VARCHAR(20) DEFAULT 'low' CHECK (threat_level IN ('low', 'medium', 'high', 'critical')),
    activity_score INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE,
    content_count INTEGER DEFAULT 0,
    pricing_info JSONB,
    funnel_data JSONB,
    audience_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Competitor content tracking
CREATE TABLE IF NOT EXISTS rageintel_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    competitor_id UUID REFERENCES rageintel_competitors(id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('post', 'story', 'reel', 'ad', 'video')),
    platform VARCHAR(50) NOT NULL,
    content_text TEXT,
    content_url VARCHAR(500),
    engagement_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    hashtags TEXT[],
    mentions TEXT[],
    posted_at TIMESTAMP WITH TIME ZONE,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ai_analysis JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Intel alerts
CREATE TABLE IF NOT EXISTS rageintel_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    competitor_id UUID REFERENCES rageintel_competitors(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('content', 'ad', 'pricing', 'launch', 'trend', 'audience', 'funnel')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_required BOOLEAN DEFAULT false,
    action_taken BOOLEAN DEFAULT false,
    action_taken_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Rage actions (AI-generated counter-strategies)
CREATE TABLE IF NOT EXISTS rageintel_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    competitor_id UUID REFERENCES rageintel_competitors(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL CHECK (action_type IN ('counter-post', 'ad-clone', 'funnel-attack', 'pricing-strike', 'content-dna', 'audience-script')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'ready', 'executed', 'failed')),
    generated_content TEXT NOT NULL,
    ai_score INTEGER DEFAULT 0,
    ai_analysis JSONB,
    suggestions TEXT[],
    execution_steps TEXT[],
    executed_at TIMESTAMP WITH TIME ZONE,
    execution_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Market intelligence data
CREATE TABLE IF NOT EXISTS rageintel_market_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    data_type VARCHAR(50) NOT NULL CHECK (data_type IN ('trending_hashtags', 'audience_insights', 'ad_performance', 'content_patterns')),
    data JSONB NOT NULL,
    confidence_score DECIMAL(5,2) DEFAULT 0,
    relevance_score DECIMAL(5,2) DEFAULT 0,
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Attack campaigns
CREATE TABLE IF NOT EXISTS rageintel_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_competitors UUID[],
    campaign_type VARCHAR(50) NOT NULL CHECK (campaign_type IN ('content_attack', 'pricing_war', 'audience_hijack', 'funnel_optimization')),
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'paused', 'completed', 'failed')),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    budget DECIMAL(12,2) DEFAULT 0,
    spent DECIMAL(12,2) DEFAULT 0,
    results JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Campaign actions
CREATE TABLE IF NOT EXISTS rageintel_campaign_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    campaign_id UUID REFERENCES rageintel_campaigns(id) ON DELETE CASCADE,
    action_id UUID REFERENCES rageintel_actions(id) ON DELETE CASCADE,
    execution_order INTEGER DEFAULT 0,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    executed_at TIMESTAMP WITH TIME ZONE,
    result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance tracking
CREATE TABLE IF NOT EXISTS rageintel_performance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    action_id UUID REFERENCES rageintel_actions(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL CHECK (metric_type IN ('engagement', 'conversion', 'reach', 'clicks', 'revenue')),
    metric_value DECIMAL(10,2) NOT NULL,
    baseline_value DECIMAL(10,2),
    improvement_percentage DECIMAL(5,2),
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- AI models and configurations
CREATE TABLE IF NOT EXISTS rageintel_ai_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    configuration JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    performance_metrics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rageintel_competitors_user_id ON rageintel_competitors(user_id);
CREATE INDEX IF NOT EXISTS idx_rageintel_competitors_threat_level ON rageintel_competitors(threat_level);
CREATE INDEX IF NOT EXISTS idx_rageintel_content_competitor_id ON rageintel_content(competitor_id);
CREATE INDEX IF NOT EXISTS idx_rageintel_content_posted_at ON rageintel_content(posted_at);
CREATE INDEX IF NOT EXISTS idx_rageintel_alerts_severity ON rageintel_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_rageintel_alerts_created_at ON rageintel_alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_rageintel_actions_status ON rageintel_actions(status);
CREATE INDEX IF NOT EXISTS idx_rageintel_actions_ai_score ON rageintel_actions(ai_score);
CREATE INDEX IF NOT EXISTS idx_rageintel_campaigns_status ON rageintel_campaigns(status);

-- Create RLS policies
ALTER TABLE rageintel_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_campaign_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE rageintel_ai_config ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rageintel_competitors
CREATE POLICY "Users can view their own competitors" ON rageintel_competitors
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own competitors" ON rageintel_competitors
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own competitors" ON rageintel_competitors
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own competitors" ON rageintel_competitors
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for rageintel_content
CREATE POLICY "Users can view their own content" ON rageintel_content
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own content" ON rageintel_content
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for rageintel_alerts
CREATE POLICY "Users can view their own alerts" ON rageintel_alerts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alerts" ON rageintel_alerts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" ON rageintel_alerts
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for rageintel_actions
CREATE POLICY "Users can view their own actions" ON rageintel_actions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own actions" ON rageintel_actions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own actions" ON rageintel_actions
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for rageintel_campaigns
CREATE POLICY "Users can view their own campaigns" ON rageintel_campaigns
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own campaigns" ON rageintel_campaigns
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" ON rageintel_campaigns
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" ON rageintel_campaigns
    FOR DELETE USING (auth.uid() = user_id);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_rageintel_competitors_updated_at BEFORE UPDATE ON rageintel_competitors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rageintel_actions_updated_at BEFORE UPDATE ON rageintel_actions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rageintel_campaigns_updated_at BEFORE UPDATE ON rageintel_campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate threat level
CREATE OR REPLACE FUNCTION calculate_threat_level(
    p_activity_score INTEGER,
    p_engagement_rate DECIMAL,
    p_ad_spend DECIMAL,
    p_followers_count INTEGER
) RETURNS VARCHAR AS $$
BEGIN
    IF p_activity_score > 90 AND p_engagement_rate > 5.0 AND p_ad_spend > 20000 THEN
        RETURN 'critical';
    ELSIF p_activity_score > 75 AND p_engagement_rate > 3.0 AND p_ad_spend > 10000 THEN
        RETURN 'high';
    ELSIF p_activity_score > 50 AND p_engagement_rate > 2.0 AND p_ad_spend > 5000 THEN
        RETURN 'medium';
    ELSE
        RETURN 'low';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate AI score
CREATE OR REPLACE FUNCTION calculate_ai_score(
    p_hook_strength INTEGER,
    p_urgency_score INTEGER,
    p_conversion_potential INTEGER,
    p_uniqueness_score INTEGER
) RETURNS INTEGER AS $$
BEGIN
    RETURN (p_hook_strength + p_urgency_score + p_conversion_potential + p_uniqueness_score) / 4;
END;
$$ LANGUAGE plpgsql; 