-- CRM & Sales Pipeline Database Schema
-- Essentials Enhanced OS - CRM Module

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- CRM Leads Table
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    position VARCHAR(255),
    source VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL DEFAULT 'New',
    value DECIMAL(15,2) DEFAULT 0,
    probability INTEGER DEFAULT 0,
    stage VARCHAR(100) NOT NULL DEFAULT 'Lead',
    last_contact TIMESTAMP WITH TIME ZONE,
    next_follow_up TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    tags TEXT[],
    ai_insights JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Deals Table
CREATE TABLE IF NOT EXISTS crm_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
    value DECIMAL(15,2) NOT NULL,
    stage VARCHAR(100) NOT NULL DEFAULT 'Discovery',
    probability INTEGER DEFAULT 0,
    close_date DATE,
    owner_id UUID REFERENCES auth.users(id),
    products TEXT[],
    notes TEXT,
    ai_insights JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Activities Table
CREATE TABLE IF NOT EXISTS crm_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL,
    lead_id UUID REFERENCES crm_leads(id) ON DELETE CASCADE,
    deal_id UUID REFERENCES crm_deals(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER DEFAULT 0,
    notes TEXT,
    outcome VARCHAR(100),
    next_action TEXT,
    ai_insights JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Customers Table (Customer Success)
CREATE TABLE IF NOT EXISTS crm_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    plan VARCHAR(100),
    status VARCHAR(100) DEFAULT 'Active',
    health_score INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE,
    next_renewal DATE,
    value DECIMAL(15,2) DEFAULT 0,
    usage_data JSONB,
    support_data JSONB,
    ai_insights JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Pipeline Stages Table
CREATE TABLE IF NOT EXISTS crm_pipeline_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    order_index INTEGER NOT NULL,
    probability INTEGER DEFAULT 0,
    color VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Sales Goals Table
CREATE TABLE IF NOT EXISTS crm_sales_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    target_value DECIMAL(15,2) NOT NULL,
    current_value DECIMAL(15,2) DEFAULT 0,
    period VARCHAR(50) NOT NULL, -- monthly, quarterly, yearly
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM AI Insights Table
CREATE TABLE IF NOT EXISTS crm_ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL, -- lead, deal, customer, activity
    entity_id UUID NOT NULL,
    insight_type VARCHAR(100) NOT NULL,
    insight_data JSONB NOT NULL,
    confidence_score DECIMAL(3,2),
    is_actionable BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Alerts Table
CREATE TABLE IF NOT EXISTS crm_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium',
    entity_type VARCHAR(50),
    entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CRM Reports Table
CREATE TABLE IF NOT EXISTS crm_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    filters JSONB,
    data JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_crm_leads_user_id ON crm_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_stage ON crm_leads(stage);
CREATE INDEX IF NOT EXISTS idx_crm_leads_source ON crm_leads(source);
CREATE INDEX IF NOT EXISTS idx_crm_leads_created_at ON crm_leads(created_at);

CREATE INDEX IF NOT EXISTS idx_crm_deals_user_id ON crm_deals(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_stage ON crm_deals(stage);
CREATE INDEX IF NOT EXISTS idx_crm_deals_lead_id ON crm_deals(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_deals_close_date ON crm_deals(close_date);

CREATE INDEX IF NOT EXISTS idx_crm_activities_user_id ON crm_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_lead_id ON crm_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_deal_id ON crm_activities(deal_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_type ON crm_activities(type);
CREATE INDEX IF NOT EXISTS idx_crm_activities_date ON crm_activities(date);

CREATE INDEX IF NOT EXISTS idx_crm_customers_user_id ON crm_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_customers_status ON crm_customers(status);
CREATE INDEX IF NOT EXISTS idx_crm_customers_health_score ON crm_customers(health_score);

CREATE INDEX IF NOT EXISTS idx_crm_ai_insights_user_id ON crm_ai_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_ai_insights_entity ON crm_ai_insights(entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_crm_alerts_user_id ON crm_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_crm_alerts_is_read ON crm_alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_crm_alerts_priority ON crm_alerts(priority);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON crm_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_deals_updated_at BEFORE UPDATE ON crm_deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_activities_updated_at BEFORE UPDATE ON crm_activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_customers_updated_at BEFORE UPDATE ON crm_customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_pipeline_stages_updated_at BEFORE UPDATE ON crm_pipeline_stages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_sales_goals_updated_at BEFORE UPDATE ON crm_sales_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Helper functions
CREATE OR REPLACE FUNCTION calculate_lead_score(lead_id UUID)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
    lead_record RECORD;
BEGIN
    SELECT * INTO lead_record FROM crm_leads WHERE id = lead_id;
    
    -- Base score from probability
    score := lead_record.probability;
    
    -- Bonus for high value
    IF lead_record.value > 50000 THEN
        score := score + 10;
    ELSIF lead_record.value > 25000 THEN
        score := score + 5;
    END IF;
    
    -- Bonus for recent activity
    IF lead_record.last_contact > NOW() - INTERVAL '7 days' THEN
        score := score + 5;
    END IF;
    
    RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_pipeline_summary(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_value', COALESCE(SUM(value), 0),
        'total_leads', COUNT(*),
        'average_probability', COALESCE(AVG(probability), 0),
        'stages', json_agg(
            json_build_object(
                'stage', stage,
                'count', COUNT(*),
                'value', SUM(value),
                'probability', AVG(probability)
            )
        )
    ) INTO result
    FROM crm_leads
    WHERE user_id = user_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_ai_recommendations(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    recommendations JSON;
BEGIN
    SELECT json_build_object(
        'high_priority_leads', (
            SELECT json_agg(json_build_object(
                'id', id,
                'name', name,
                'value', value,
                'probability', probability,
                'recommended_action', 'Schedule follow-up call'
            ))
            FROM crm_leads
            WHERE user_id = user_uuid 
            AND probability > 80 
            AND last_contact < NOW() - INTERVAL '3 days'
            LIMIT 5
        ),
        'at_risk_deals', (
            SELECT json_agg(json_build_object(
                'id', id,
                'name', name,
                'stage', stage,
                'recommended_action', 'Re-engage with new proposal'
            ))
            FROM crm_deals
            WHERE user_id = user_uuid 
            AND stage = 'Proposal' 
            AND updated_at < NOW() - INTERVAL '7 days'
            LIMIT 3
        ),
        'next_actions', (
            SELECT json_agg(json_build_object(
                'type', 'follow_up',
                'lead_id', id,
                'lead_name', name,
                'action', 'Schedule discovery call',
                'priority', 'high'
            ))
            FROM crm_leads
            WHERE user_id = user_uuid 
            AND status = 'New'
            LIMIT 3
        )
    ) INTO recommendations;
    
    RETURN recommendations;
END;
$$ LANGUAGE plpgsql;

-- RLS Policies
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_sales_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_reports ENABLE ROW LEVEL SECURITY;

-- CRM Leads RLS Policies
CREATE POLICY "Users can view their own leads" ON crm_leads
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own leads" ON crm_leads
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" ON crm_leads
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads" ON crm_leads
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Deals RLS Policies
CREATE POLICY "Users can view their own deals" ON crm_deals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own deals" ON crm_deals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own deals" ON crm_deals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own deals" ON crm_deals
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Activities RLS Policies
CREATE POLICY "Users can view their own activities" ON crm_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities" ON crm_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" ON crm_activities
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities" ON crm_activities
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Customers RLS Policies
CREATE POLICY "Users can view their own customers" ON crm_customers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customers" ON crm_customers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers" ON crm_customers
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers" ON crm_customers
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Pipeline Stages RLS Policies
CREATE POLICY "Users can view their own pipeline stages" ON crm_pipeline_stages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pipeline stages" ON crm_pipeline_stages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pipeline stages" ON crm_pipeline_stages
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pipeline stages" ON crm_pipeline_stages
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Sales Goals RLS Policies
CREATE POLICY "Users can view their own sales goals" ON crm_sales_goals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sales goals" ON crm_sales_goals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sales goals" ON crm_sales_goals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sales goals" ON crm_sales_goals
    FOR DELETE USING (auth.uid() = user_id);

-- CRM AI Insights RLS Policies
CREATE POLICY "Users can view their own AI insights" ON crm_ai_insights
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI insights" ON crm_ai_insights
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI insights" ON crm_ai_insights
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI insights" ON crm_ai_insights
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Alerts RLS Policies
CREATE POLICY "Users can view their own alerts" ON crm_alerts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alerts" ON crm_alerts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" ON crm_alerts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts" ON crm_alerts
    FOR DELETE USING (auth.uid() = user_id);

-- CRM Reports RLS Policies
CREATE POLICY "Users can view their own reports" ON crm_reports
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reports" ON crm_reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" ON crm_reports
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reports" ON crm_reports
    FOR DELETE USING (auth.uid() = user_id);

-- Insert default pipeline stages
INSERT INTO crm_pipeline_stages (name, order_index, probability, color) VALUES
('Lead', 1, 10, '#6B7280'),
('Qualified', 2, 25, '#3B82F6'),
('Proposal', 3, 50, '#F59E0B'),
('Negotiation', 4, 75, '#F97316'),
('Closed Won', 5, 100, '#10B981'),
('Closed Lost', 6, 0, '#EF4444')
ON CONFLICT DO NOTHING;

-- Create views for common queries
CREATE OR REPLACE VIEW crm_lead_summary AS
SELECT 
    user_id,
    COUNT(*) as total_leads,
    COUNT(CASE WHEN status = 'Qualified' THEN 1 END) as qualified_leads,
    COUNT(CASE WHEN probability > 80 THEN 1 END) as high_probability_leads,
    SUM(value) as total_pipeline_value,
    AVG(probability) as average_probability
FROM crm_leads
GROUP BY user_id;

CREATE OR REPLACE VIEW crm_deal_summary AS
SELECT 
    user_id,
    COUNT(*) as total_deals,
    COUNT(CASE WHEN stage = 'Closed Won' THEN 1 END) as won_deals,
    COUNT(CASE WHEN stage = 'Closed Lost' THEN 1 END) as lost_deals,
    SUM(CASE WHEN stage = 'Closed Won' THEN value ELSE 0 END) as won_value,
    AVG(CASE WHEN stage != 'Closed Won' AND stage != 'Closed Lost' THEN probability ELSE NULL END) as average_probability
FROM crm_deals
GROUP BY user_id;

-- Comments
COMMENT ON TABLE crm_leads IS 'CRM leads with AI insights and scoring';
COMMENT ON TABLE crm_deals IS 'Sales deals with pipeline tracking';
COMMENT ON TABLE crm_activities IS 'Sales activities and interactions';
COMMENT ON TABLE crm_customers IS 'Customer success and health tracking';
COMMENT ON TABLE crm_pipeline_stages IS 'Configurable sales pipeline stages';
COMMENT ON TABLE crm_sales_goals IS 'Sales targets and goals tracking';
COMMENT ON TABLE crm_ai_insights IS 'AI-generated insights and recommendations';
COMMENT ON TABLE crm_alerts IS 'CRM alerts and notifications';
COMMENT ON TABLE crm_reports IS 'Saved CRM reports and analytics'; 