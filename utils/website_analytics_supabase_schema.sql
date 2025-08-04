-- Website Analytics AI System - Supabase Schema
-- Essentials Enhanced Platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- Users table (extends existing auth.users)
CREATE TABLE IF NOT EXISTS website_analytics_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    preferences JSONB DEFAULT '{}',
    UNIQUE(user_id)
);

-- Sessions table
CREATE TABLE IF NOT EXISTS website_analytics_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES website_analytics_users(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    device_type TEXT CHECK (device_type IN ('mobile', 'desktop', 'tablet')),
    traffic_source TEXT,
    page_path TEXT,
    session_duration INTEGER, -- in seconds
    scroll_depth_percentage INTEGER,
    rage_clicks INTEGER DEFAULT 0,
    hover_back BOOLEAN DEFAULT FALSE,
    cart_view BOOLEAN DEFAULT FALSE,
    checkout_reached BOOLEAN DEFAULT FALSE,
    converted BOOLEAN DEFAULT FALSE,
    order_value DECIMAL(10,2) DEFAULT 0,
    session_labels TEXT[] DEFAULT '{}',
    ai_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id)
);

-- User actions/clicks tracking
CREATE TABLE IF NOT EXISTS website_analytics_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES website_analytics_sessions(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL, -- 'click', 'scroll', 'hover', 'rage_click'
    element_selector TEXT,
    position_x INTEGER,
    position_y INTEGER,
    product_id TEXT, -- Shopify product ID
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Product interactions
CREATE TABLE IF NOT EXISTS website_analytics_product_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES website_analytics_sessions(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL, -- Shopify product ID
    product_name TEXT,
    view_time_seconds INTEGER DEFAULT 0,
    image_zoomed BOOLEAN DEFAULT FALSE,
    review_clicked BOOLEAN DEFAULT FALSE,
    size_guide_clicked BOOLEAN DEFAULT FALSE,
    added_to_cart BOOLEAN DEFAULT FALSE,
    purchased BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Drop-off detection
CREATE TABLE IF NOT EXISTS website_analytics_dropoffs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path TEXT NOT NULL,
    drop_off_type TEXT CHECK (drop_off_type IN ('filter', 'search', 'popup', 'collection', 'product')),
    drop_off_rate DECIMAL(5,2),
    affected_users_count INTEGER,
    revenue_impact DECIMAL(10,2),
    ai_insight TEXT,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competitor benchmarks
CREATE TABLE IF NOT EXISTS website_analytics_competitor_benchmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name TEXT NOT NULL, -- 'bounce_rate', 'aov', 'retention'
    industry_average DECIMAL(10,4),
    your_value DECIMAL(10,4),
    difference_percentage DECIMAL(5,2),
    category TEXT, -- 'fashion', 'electronics', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue heatmaps
CREATE TABLE IF NOT EXISTS website_analytics_revenue_heatmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_section TEXT NOT NULL, -- 'best_sellers', 'new_arrivals', 'sale'
    clicks_count INTEGER,
    revenue_generated DECIMAL(10,2),
    conversion_rate DECIMAL(5,2),
    date_range TEXT, -- 'last_week', 'last_month'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exit intent predictions
CREATE TABLE IF NOT EXISTS website_analytics_exit_intent (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES website_analytics_sessions(id) ON DELETE CASCADE,
    scroll_speed INTEGER, -- pixels per second
    hover_back_detected BOOLEAN DEFAULT FALSE,
    cart_idle_time INTEGER, -- seconds
    exit_probability DECIMAL(3,2), -- 0.00 to 1.00
    trigger_action TEXT, -- 'whatsapp_chat', 'offer_popup', 'none'
    action_triggered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product funnel attribution
CREATE TABLE IF NOT EXISTS website_analytics_product_funnels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id TEXT NOT NULL,
    product_name TEXT,
    scroll_percentage DECIMAL(5,2),
    add_to_cart_percentage DECIMAL(5,2),
    zoom_percentage DECIMAL(5,2),
    review_click_percentage DECIMAL(5,2),
    checkout_percentage DECIMAL(5,2),
    conversion_rate DECIMAL(5,2),
    date_range TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Segment-specific insights
CREATE TABLE IF NOT EXISTS website_analytics_segment_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    segment_name TEXT NOT NULL, -- 'returning_users_iphone', 'tiktok_traffic'
    device_type TEXT,
    traffic_source TEXT,
    buyer_type TEXT,
    conversion_rate DECIMAL(5,2),
    average_order_value DECIMAL(10,2),
    session_duration INTEGER,
    ai_insight TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content impact tracking
CREATE TABLE IF NOT EXISTS website_analytics_content_impact (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type TEXT NOT NULL, -- 'blog', 'video', 'lookbook'
    content_title TEXT,
    content_url TEXT,
    views_count INTEGER,
    downstream_sales DECIMAL(10,2),
    products_linked TEXT[], -- Shopify product IDs
    conversion_attribution DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign attribution
CREATE TABLE IF NOT EXISTS website_analytics_campaign_attribution (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id TEXT, -- Meta Ads campaign ID
    campaign_name TEXT,
    ad_set_id TEXT,
    ad_id TEXT,
    creative_id TEXT,
    spend DECIMAL(10,2),
    clicks INTEGER,
    impressions INTEGER,
    roas DECIMAL(5,2),
    sessions_generated INTEGER,
    conversions INTEGER,
    revenue_attributed DECIMAL(10,2),
    ai_analysis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI daily summaries
CREATE TABLE IF NOT EXISTS website_analytics_ai_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    summary_date DATE NOT NULL,
    sessions_count INTEGER,
    total_sales DECIMAL(10,2),
    exits_count INTEGER,
    best_product TEXT,
    worst_product TEXT,
    ai_summary TEXT,
    key_insights TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(summary_date)
);

-- Chatbot queries and responses
CREATE TABLE IF NOT EXISTS website_analytics_chatbot (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES website_analytics_users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    response TEXT,
    metrics_returned JSONB,
    graphs_generated TEXT[], -- URLs to generated charts
    language TEXT DEFAULT 'en', -- 'en' or 'ar'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI insights and recommendations
CREATE TABLE IF NOT EXISTS website_analytics_ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    insight_type TEXT NOT NULL, -- 'behavior', 'dropoff', 'trend', 'recommendation'
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
    affected_metrics JSONB,
    suggested_actions TEXT[],
    ai_confidence DECIMAL(3,2),
    is_actioned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- External API integrations
CREATE TABLE IF NOT EXISTS website_analytics_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL, -- 'shopify', 'meta_ads', 'google_analytics'
    api_key TEXT,
    api_secret TEXT,
    webhook_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    sync_status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON website_analytics_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_timestamp ON website_analytics_sessions(timestamp);
CREATE INDEX IF NOT EXISTS idx_sessions_device_type ON website_analytics_sessions(device_type);
CREATE INDEX IF NOT EXISTS idx_sessions_traffic_source ON website_analytics_sessions(traffic_source);
CREATE INDEX IF NOT EXISTS idx_actions_session_id ON website_analytics_actions(session_id);
CREATE INDEX IF NOT EXISTS idx_product_interactions_product_id ON website_analytics_product_interactions(product_id);
CREATE INDEX IF NOT EXISTS idx_dropoffs_page_path ON website_analytics_dropoffs(page_path);
CREATE INDEX IF NOT EXISTS idx_exit_intent_session_id ON website_analytics_exit_intent(session_id);
CREATE INDEX IF NOT EXISTS idx_product_funnels_product_id ON website_analytics_product_funnels(product_id);
CREATE INDEX IF NOT EXISTS idx_campaign_attribution_campaign_id ON website_analytics_campaign_attribution(campaign_id);

-- Enable Row Level Security
ALTER TABLE website_analytics_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_product_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_dropoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_competitor_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_revenue_heatmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_exit_intent ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_product_funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_segment_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_content_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_campaign_attribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_ai_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_chatbot ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analytics_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - adjust based on your auth setup)
CREATE POLICY "Users can view own data" ON website_analytics_users
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON website_analytics_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own actions" ON website_analytics_actions
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM website_analytics_sessions 
            WHERE user_id = auth.uid()
        )
    );

-- Helper functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_website_analytics_users_updated_at 
    BEFORE UPDATE ON website_analytics_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_analytics_sessions_updated_at 
    BEFORE UPDATE ON website_analytics_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_analytics_dropoffs_updated_at 
    BEFORE UPDATE ON website_analytics_dropoffs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_website_analytics_integrations_updated_at 
    BEFORE UPDATE ON website_analytics_integrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate session behavior score
CREATE OR REPLACE FUNCTION calculate_session_behavior_score(
    p_scroll_depth INTEGER,
    p_rage_clicks INTEGER,
    p_session_duration INTEGER,
    p_converted BOOLEAN
) RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Base score from scroll depth
    score := score + (p_scroll_depth / 10);
    
    -- Penalty for rage clicks
    score := score - (p_rage_clicks * 5);
    
    -- Bonus for longer sessions
    IF p_session_duration > 300 THEN -- 5 minutes
        score := score + 20;
    END IF;
    
    -- Bonus for conversion
    IF p_converted THEN
        score := score + 50;
    END IF;
    
    -- Ensure score is between 0 and 100
    RETURN GREATEST(0, LEAST(100, score));
END;
$$ LANGUAGE plpgsql;

-- Function to detect session labels
CREATE OR REPLACE FUNCTION detect_session_labels(
    p_scroll_depth INTEGER,
    p_rage_clicks INTEGER,
    p_session_duration INTEGER,
    p_converted BOOLEAN
) RETURNS TEXT[] AS $$
DECLARE
    labels TEXT[] := '{}';
BEGIN
    -- Intent label
    IF p_scroll_depth > 70 AND p_session_duration > 180 THEN
        labels := array_append(labels, 'intent');
    END IF;
    
    -- Frustration label
    IF p_rage_clicks > 2 THEN
        labels := array_append(labels, 'frustration');
    END IF;
    
    -- Confusion label
    IF p_scroll_depth < 30 AND p_session_duration > 120 THEN
        labels := array_append(labels, 'confusion');
    END IF;
    
    -- High intent label
    IF p_converted OR (p_scroll_depth > 80 AND p_session_duration > 300) THEN
        labels := array_append(labels, 'high_intent');
    END IF;
    
    RETURN labels;
END;
$$ LANGUAGE plpgsql; 