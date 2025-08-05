-- AI Strategy Composer Database Schema
-- This schema supports the AI Strategy Composer module with goals, strategies, actions, and analytics

-- Strategy Goals Table
CREATE TABLE IF NOT EXISTS strategy_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('revenue', 'orders', 'engagement', 'reach', 'custom')),
    target VARCHAR(255) NOT NULL,
    timeframe INTEGER NOT NULL CHECK (timeframe > 0 AND timeframe <= 365),
    urgency VARCHAR(10) NOT NULL CHECK (urgency IN ('low', 'medium', 'high')),
    budget DECIMAL(12,2) DEFAULT 0,
    constraints TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'paused')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Strategy Plans Table
CREATE TABLE IF NOT EXISTS strategy_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    goal_id UUID NOT NULL REFERENCES strategy_goals(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL CHECK (duration > 0),
    confidence INTEGER NOT NULL CHECK (confidence >= 0 AND confidence <= 100),
    predicted_outcome JSONB NOT NULL DEFAULT '{}',
    data_sources TEXT[] DEFAULT '{}',
    reasoning TEXT[] DEFAULT '{}',
    recommendations TEXT[] DEFAULT '{}',
    risk_factors TEXT[] DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'paused')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Strategy Actions Table
CREATE TABLE IF NOT EXISTS strategy_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    strategy_id UUID NOT NULL REFERENCES strategy_plans(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('drop', 'ad', 'content', 'vip', 'timing', 'budget', 'reminder')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    day INTEGER NOT NULL CHECK (day > 0),
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'skipped')),
    estimated_impact INTEGER NOT NULL CHECK (estimated_impact >= 0 AND estimated_impact <= 100),
    budget DECIMAL(12,2) DEFAULT 0,
    platform TEXT[] DEFAULT '{}',
    target_audience VARCHAR(255),
    creative_type VARCHAR(255),
    timing VARCHAR(255),
    dependencies TEXT[] DEFAULT '{}',
    completion_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Strategy Metrics Table
CREATE TABLE IF NOT EXISTS strategy_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    total_strategies INTEGER NOT NULL DEFAULT 0,
    active_strategies INTEGER NOT NULL DEFAULT 0,
    completed_strategies INTEGER NOT NULL DEFAULT 0,
    average_confidence DECIMAL(5,2) NOT NULL DEFAULT 0,
    average_success_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
    total_predicted_revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_actual_revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
    top_performing_actions TEXT[] DEFAULT '{}',
    last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Strategy Performance Tracking Table
CREATE TABLE IF NOT EXISTS strategy_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    strategy_id UUID NOT NULL REFERENCES strategy_plans(id) ON DELETE CASCADE,
    action_id UUID NOT NULL REFERENCES strategy_actions(id) ON DELETE CASCADE,
    actual_revenue DECIMAL(12,2),
    actual_orders INTEGER,
    actual_engagement DECIMAL(5,2),
    actual_reach INTEGER,
    completion_time TIMESTAMP WITH TIME ZONE,
    success_score DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Strategy Alerts Table
CREATE TABLE IF NOT EXISTS strategy_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    strategy_id UUID NOT NULL REFERENCES strategy_plans(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('underperformance', 'milestone', 'risk', 'opportunity')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    severity VARCHAR(10) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_strategy_goals_workspace ON strategy_goals(workspace_id);
CREATE INDEX IF NOT EXISTS idx_strategy_goals_user ON strategy_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_strategy_goals_status ON strategy_goals(status);
CREATE INDEX IF NOT EXISTS idx_strategy_goals_type ON strategy_goals(type);

CREATE INDEX IF NOT EXISTS idx_strategy_plans_workspace ON strategy_plans(workspace_id);
CREATE INDEX IF NOT EXISTS idx_strategy_plans_user ON strategy_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_strategy_plans_goal ON strategy_plans(goal_id);
CREATE INDEX IF NOT EXISTS idx_strategy_plans_status ON strategy_plans(status);

CREATE INDEX IF NOT EXISTS idx_strategy_actions_strategy ON strategy_actions(strategy_id);
CREATE INDEX IF NOT EXISTS idx_strategy_actions_status ON strategy_actions(status);
CREATE INDEX IF NOT EXISTS idx_strategy_actions_priority ON strategy_actions(priority);
CREATE INDEX IF NOT EXISTS idx_strategy_actions_day ON strategy_actions(day);

CREATE INDEX IF NOT EXISTS idx_strategy_metrics_workspace ON strategy_metrics(workspace_id);

CREATE INDEX IF NOT EXISTS idx_strategy_performance_strategy ON strategy_performance(strategy_id);
CREATE INDEX IF NOT EXISTS idx_strategy_performance_action ON strategy_performance(action_id);

CREATE INDEX IF NOT EXISTS idx_strategy_alerts_workspace ON strategy_alerts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_strategy_alerts_strategy ON strategy_alerts(strategy_id);
CREATE INDEX IF NOT EXISTS idx_strategy_alerts_unread ON strategy_alerts(is_read) WHERE is_read = FALSE;

-- Row Level Security (RLS) policies
ALTER TABLE strategy_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE strategy_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for strategy_goals
CREATE POLICY "Users can view their workspace goals" ON strategy_goals FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their workspace goals" ON strategy_goals FOR INSERT WITH CHECK (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their workspace goals" ON strategy_goals FOR UPDATE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can delete their workspace goals" ON strategy_goals FOR DELETE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

-- RLS Policies for strategy_plans
CREATE POLICY "Users can view their workspace strategies" ON strategy_plans FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their workspace strategies" ON strategy_plans FOR INSERT WITH CHECK (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their workspace strategies" ON strategy_plans FOR UPDATE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can delete their workspace strategies" ON strategy_plans FOR DELETE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

-- RLS Policies for strategy_actions
CREATE POLICY "Users can view their workspace actions" ON strategy_actions FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their workspace actions" ON strategy_actions FOR INSERT WITH CHECK (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their workspace actions" ON strategy_actions FOR UPDATE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can delete their workspace actions" ON strategy_actions FOR DELETE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

-- RLS Policies for strategy_metrics
CREATE POLICY "Users can view their workspace metrics" ON strategy_metrics FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their workspace metrics" ON strategy_metrics FOR UPDATE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

-- RLS Policies for strategy_performance
CREATE POLICY "Users can view their workspace performance" ON strategy_performance FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their workspace performance" ON strategy_performance FOR INSERT WITH CHECK (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their workspace performance" ON strategy_performance FOR UPDATE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

-- RLS Policies for strategy_alerts
CREATE POLICY "Users can view their workspace alerts" ON strategy_alerts FOR SELECT USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert their workspace alerts" ON strategy_alerts FOR INSERT WITH CHECK (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can update their workspace alerts" ON strategy_alerts FOR UPDATE USING (
    workspace_id IN (
        SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_strategy_goals_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_strategy_plans_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_strategy_actions_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_strategy_metrics_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic updated_at
CREATE TRIGGER trigger_update_strategy_goals_updated_at 
    BEFORE UPDATE ON strategy_goals 
    FOR EACH ROW EXECUTE FUNCTION update_strategy_goals_updated_at();

CREATE TRIGGER trigger_update_strategy_plans_updated_at 
    BEFORE UPDATE ON strategy_plans 
    FOR EACH ROW EXECUTE FUNCTION update_strategy_plans_updated_at();

CREATE TRIGGER trigger_update_strategy_actions_updated_at 
    BEFORE UPDATE ON strategy_actions 
    FOR EACH ROW EXECUTE FUNCTION update_strategy_actions_updated_at();

CREATE TRIGGER trigger_update_strategy_metrics_updated_at 
    BEFORE UPDATE ON strategy_metrics 
    FOR EACH ROW EXECUTE FUNCTION update_strategy_metrics_updated_at();

-- Function to calculate strategy metrics
CREATE OR REPLACE FUNCTION calculate_strategy_metrics(p_workspace_id UUID) RETURNS TABLE(
    total_strategies INTEGER,
    active_strategies INTEGER,
    completed_strategies INTEGER,
    average_confidence DECIMAL(5,2),
    average_success_rate DECIMAL(5,2),
    total_predicted_revenue DECIMAL(12,2),
    total_actual_revenue DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(sp.id)::INTEGER as total_strategies,
        COUNT(CASE WHEN sp.status = 'active' THEN 1 END)::INTEGER as active_strategies,
        COUNT(CASE WHEN sp.status = 'completed' THEN 1 END)::INTEGER as completed_strategies,
        AVG(sp.confidence)::DECIMAL(5,2) as average_confidence,
        AVG(sperf.success_score)::DECIMAL(5,2) as average_success_rate,
        SUM((sp.predicted_outcome->>'revenue')::DECIMAL(12,2)) as total_predicted_revenue,
        SUM(sperf.actual_revenue) as total_actual_revenue
    FROM strategy_plans sp
    LEFT JOIN strategy_performance sperf ON sp.id = sperf.strategy_id
    WHERE sp.workspace_id = p_workspace_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get top performing actions
CREATE OR REPLACE FUNCTION get_top_performing_actions(p_workspace_id UUID, p_limit INTEGER DEFAULT 5) RETURNS TABLE(
    action_title VARCHAR(255),
    success_score DECIMAL(5,2),
    actual_revenue DECIMAL(12,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sa.title as action_title,
        sperf.success_score,
        sperf.actual_revenue
    FROM strategy_actions sa
    JOIN strategy_performance sperf ON sa.id = sperf.action_id
    JOIN strategy_plans sp ON sa.strategy_id = sp.id
    WHERE sp.workspace_id = p_workspace_id
    AND sperf.success_score IS NOT NULL
    ORDER BY sperf.success_score DESC, sperf.actual_revenue DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to update strategy metrics
CREATE OR REPLACE FUNCTION update_strategy_metrics(p_workspace_id UUID) RETURNS VOID AS $$
DECLARE
    v_metrics RECORD;
    v_top_actions TEXT[];
    v_action RECORD;
BEGIN
    -- Calculate metrics
    SELECT * INTO v_metrics FROM calculate_strategy_metrics(p_workspace_id);
    
    -- Get top performing actions
    v_top_actions := ARRAY[]::TEXT[];
    FOR v_action IN SELECT action_title FROM get_top_performing_actions(p_workspace_id, 5)
    LOOP
        v_top_actions := array_append(v_top_actions, v_action.action_title);
    END LOOP;
    
    -- Insert or update metrics
    INSERT INTO strategy_metrics (
        workspace_id, total_strategies, active_strategies, completed_strategies,
        average_confidence, average_success_rate, total_predicted_revenue,
        total_actual_revenue, top_performing_actions, last_calculated_at
    ) VALUES (
        p_workspace_id, v_metrics.total_strategies, v_metrics.active_strategies,
        v_metrics.completed_strategies, v_metrics.average_confidence,
        v_metrics.average_success_rate, v_metrics.total_predicted_revenue,
        v_metrics.total_actual_revenue, v_top_actions, NOW()
    )
    ON CONFLICT (workspace_id) DO UPDATE SET
        total_strategies = EXCLUDED.total_strategies,
        active_strategies = EXCLUDED.active_strategies,
        completed_strategies = EXCLUDED.completed_strategies,
        average_confidence = EXCLUDED.average_confidence,
        average_success_rate = EXCLUDED.average_success_rate,
        total_predicted_revenue = EXCLUDED.total_predicted_revenue,
        total_actual_revenue = EXCLUDED.total_actual_revenue,
        top_performing_actions = EXCLUDED.top_performing_actions,
        last_calculated_at = EXCLUDED.last_calculated_at;
END;
$$ LANGUAGE plpgsql; 