-- ROI Forecast Tables Schema
-- This schema stores AI-generated ROI forecasts and their actual results for learning and accuracy tracking

-- Main ROI Forecasts table
CREATE TABLE IF NOT EXISTS roi_forecasts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_type VARCHAR(50) NOT NULL CHECK (product_type IN ('physical', 'digital', 'bundle', 'flash_sale')),
    campaign_type VARCHAR(50) NOT NULL CHECK (campaign_type IN ('instagram', 'facebook', 'tiktok', 'organic', 'influencer', 'email', 'whatsapp')),
    budget DECIMAL(10,2) NOT NULL,
    predicted_revenue DECIMAL(10,2) NOT NULL,
    estimated_spend DECIMAL(10,2) NOT NULL,
    projected_roi DECIMAL(5,2) NOT NULL,
    confidence_level INTEGER NOT NULL CHECK (confidence_level >= 0 AND confidence_level <= 100),
    break_even_point INTEGER NOT NULL, -- hours
    drop_window_impact DECIMAL(3,2) NOT NULL,
    creative_strength_score INTEGER,
    vip_engagement_potential DECIMAL(3,2) NOT NULL,
    reasoning JSONB NOT NULL, -- Array of reasoning strings
    recommendations JSONB NOT NULL, -- Array of recommendation strings
    forecast_ranges JSONB NOT NULL, -- {bestCase, mostLikely, worstCase}
    timeframes JSONB NOT NULL, -- {24h, 3d, 7d, 14d} with roi, revenue, spend
    market_factors JSONB NOT NULL, -- {competitorActivity, cpcTrend, audienceEngagement, seasonalFactor}
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    workspace_id UUID REFERENCES workspaces(id)
);

-- Actual results for completed forecasts
CREATE TABLE IF NOT EXISTS roi_forecast_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    forecast_id UUID NOT NULL REFERENCES roi_forecasts(id) ON DELETE CASCADE,
    actual_revenue DECIMAL(10,2) NOT NULL,
    actual_spend DECIMAL(10,2) NOT NULL,
    actual_roi DECIMAL(5,2) NOT NULL,
    accuracy_percentage DECIMAL(5,2) NOT NULL,
    variance DECIMAL(5,2) NOT NULL, -- Difference between predicted and actual ROI
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id)
);

-- Forecast accuracy tracking for model improvement
CREATE TABLE IF NOT EXISTS roi_forecast_accuracy (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    forecast_id UUID NOT NULL REFERENCES roi_forecasts(id) ON DELETE CASCADE,
    result_id UUID NOT NULL REFERENCES roi_forecast_results(id) ON DELETE CASCADE,
    revenue_accuracy DECIMAL(5,2) NOT NULL,
    spend_accuracy DECIMAL(5,2) NOT NULL,
    roi_accuracy DECIMAL(5,2) NOT NULL,
    overall_accuracy DECIMAL(5,2) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    factors_that_affected_accuracy JSONB, -- Store which factors were most/least accurate
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market data used for forecasts (for learning)
CREATE TABLE IF NOT EXISTS roi_market_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    forecast_id UUID NOT NULL REFERENCES roi_forecasts(id) ON DELETE CASCADE,
    data_type VARCHAR(50) NOT NULL, -- 'competitor', 'cpc', 'engagement', 'seasonal'
    data_value JSONB NOT NULL,
    data_source VARCHAR(100),
    confidence_level INTEGER,
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forecast alerts and notifications
CREATE TABLE IF NOT EXISTS roi_forecast_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    forecast_id UUID NOT NULL REFERENCES roi_forecasts(id) ON DELETE CASCADE,
    alert_type VARCHAR(50) NOT NULL, -- 'accuracy_threshold', 'market_change', 'competitor_activity'
    alert_message TEXT NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_to JSONB -- Array of user IDs or channels
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_roi_forecasts_status ON roi_forecasts(status);
CREATE INDEX IF NOT EXISTS idx_roi_forecasts_created_at ON roi_forecasts(created_at);
CREATE INDEX IF NOT EXISTS idx_roi_forecasts_workspace ON roi_forecasts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_roi_forecast_results_forecast_id ON roi_forecast_results(forecast_id);
CREATE INDEX IF NOT EXISTS idx_roi_forecast_accuracy_overall ON roi_forecast_accuracy(overall_accuracy);
CREATE INDEX IF NOT EXISTS idx_roi_forecast_alerts_unread ON roi_forecast_alerts(is_read) WHERE is_read = FALSE;

-- Row Level Security (RLS) policies
ALTER TABLE roi_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_forecast_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_forecast_accuracy ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_forecast_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roi_forecasts
CREATE POLICY "Users can view their workspace forecasts" ON roi_forecasts
    FOR SELECT USING (workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    ));

CREATE POLICY "Users can insert forecasts in their workspace" ON roi_forecasts
    FOR INSERT WITH CHECK (workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    ));

CREATE POLICY "Users can update their workspace forecasts" ON roi_forecasts
    FOR UPDATE USING (workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    ));

-- RLS Policies for roi_forecast_results
CREATE POLICY "Users can view results for their workspace forecasts" ON roi_forecast_results
    FOR SELECT USING (forecast_id IN (
        SELECT id FROM roi_forecasts WHERE workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
        )
    ));

CREATE POLICY "Users can insert results for their workspace forecasts" ON roi_forecast_results
    FOR INSERT WITH CHECK (forecast_id IN (
        SELECT id FROM roi_forecasts WHERE workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
        )
    ));

-- RLS Policies for roi_forecast_accuracy
CREATE POLICY "Users can view accuracy for their workspace forecasts" ON roi_forecast_accuracy
    FOR SELECT USING (forecast_id IN (
        SELECT id FROM roi_forecasts WHERE workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
        )
    ));

-- RLS Policies for roi_market_data
CREATE POLICY "Users can view market data for their workspace forecasts" ON roi_market_data
    FOR SELECT USING (forecast_id IN (
        SELECT id FROM roi_forecasts WHERE workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
        )
    ));

-- RLS Policies for roi_forecast_alerts
CREATE POLICY "Users can view alerts for their workspace forecasts" ON roi_forecast_alerts
    FOR SELECT USING (forecast_id IN (
        SELECT id FROM roi_forecasts WHERE workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
        )
    ));

CREATE POLICY "Users can update their workspace alerts" ON roi_forecast_alerts
    FOR UPDATE USING (forecast_id IN (
        SELECT id FROM roi_forecasts WHERE workspace_id IN (
            SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
        )
    ));

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_roi_forecast_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_roi_forecast_updated_at
    BEFORE UPDATE ON roi_forecasts
    FOR EACH ROW
    EXECUTE FUNCTION update_roi_forecast_updated_at();

-- Function to calculate forecast accuracy
CREATE OR REPLACE FUNCTION calculate_forecast_accuracy(
    p_forecast_id UUID,
    p_actual_revenue DECIMAL,
    p_actual_spend DECIMAL,
    p_actual_roi DECIMAL
)
RETURNS TABLE(
    revenue_accuracy DECIMAL,
    spend_accuracy DECIMAL,
    roi_accuracy DECIMAL,
    overall_accuracy DECIMAL
) AS $$
DECLARE
    v_predicted_revenue DECIMAL;
    v_estimated_spend DECIMAL;
    v_projected_roi DECIMAL;
BEGIN
    -- Get forecast data
    SELECT predicted_revenue, estimated_spend, projected_roi
    INTO v_predicted_revenue, v_estimated_spend, v_projected_roi
    FROM roi_forecasts
    WHERE id = p_forecast_id;
    
    -- Calculate accuracies
    RETURN QUERY SELECT
        GREATEST(0, 100 - ABS(v_predicted_revenue - p_actual_revenue) / v_predicted_revenue * 100) as revenue_accuracy,
        GREATEST(0, 100 - ABS(v_estimated_spend - p_actual_spend) / v_estimated_spend * 100) as spend_accuracy,
        GREATEST(0, 100 - ABS(v_projected_roi - p_actual_roi) / v_projected_roi * 100) as roi_accuracy,
        GREATEST(0, 100 - (ABS(v_predicted_revenue - p_actual_revenue) / v_predicted_revenue + 
                           ABS(v_estimated_spend - p_actual_spend) / v_estimated_spend + 
                           ABS(v_projected_roi - p_actual_roi) / v_projected_roi) / 3 * 100) as overall_accuracy;
END;
$$ LANGUAGE plpgsql;

-- Function to get forecast statistics
CREATE OR REPLACE FUNCTION get_forecast_statistics(p_workspace_id UUID)
RETURNS TABLE(
    total_forecasts INTEGER,
    completed_forecasts INTEGER,
    average_accuracy DECIMAL,
    high_accuracy_count INTEGER,
    total_predicted_revenue DECIMAL,
    total_actual_revenue DECIMAL
) AS $$
BEGIN
    RETURN QUERY SELECT
        COUNT(f.id)::INTEGER as total_forecasts,
        COUNT(r.id)::INTEGER as completed_forecasts,
        AVG(a.overall_accuracy) as average_accuracy,
        COUNT(CASE WHEN a.overall_accuracy >= 80 THEN 1 END)::INTEGER as high_accuracy_count,
        SUM(f.predicted_revenue) as total_predicted_revenue,
        SUM(r.actual_revenue) as total_actual_revenue
    FROM roi_forecasts f
    LEFT JOIN roi_forecast_results r ON f.id = r.forecast_id
    LEFT JOIN roi_forecast_accuracy a ON f.id = a.forecast_id
    WHERE f.workspace_id = p_workspace_id;
END;
$$ LANGUAGE plpgsql; 