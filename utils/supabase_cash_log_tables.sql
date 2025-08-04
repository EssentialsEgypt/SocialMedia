-- Cash Log Tables for Smart Financial Tracking

-- Main cash log entries table
CREATE TABLE IF NOT EXISTS cash_log_entries (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('income', 'expense')),
    source VARCHAR(50), -- e.g., 'facebook_ads', 'google_ads', 'manual', 'salary', 'bonus'
    platform VARCHAR(50), -- e.g., 'facebook', 'google', 'manual'
    campaign_id VARCHAR(100), -- for ad spend tracking
    paid BOOLEAN DEFAULT FALSE,
    reimbursed BOOLEAN DEFAULT FALSE,
    recurring BOOLEAN DEFAULT FALSE,
    recurring_frequency VARCHAR(20), -- 'monthly', 'weekly', 'yearly'
    tags TEXT[], -- array of tags for better categorization
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Monthly profit summaries table
CREATE TABLE IF NOT EXISTS monthly_profit_summaries (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    total_revenue DECIMAL(10,2) DEFAULT 0,
    total_ad_spend DECIMAL(10,2) DEFAULT 0,
    total_salaries DECIMAL(10,2) DEFAULT 0,
    total_bonuses DECIMAL(10,2) DEFAULT 0,
    total_expenses DECIMAL(10,2) DEFAULT 0,
    net_profit DECIMAL(10,2) DEFAULT 0,
    roi_percentage DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(year, month)
);

-- Budget categories and limits
CREATE TABLE IF NOT EXISTS budget_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL UNIQUE,
    monthly_limit DECIMAL(10,2),
    yearly_limit DECIMAL(10,2),
    alert_threshold DECIMAL(5,2) DEFAULT 80.00, -- percentage threshold for alerts
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automatic tracking rules
CREATE TABLE IF NOT EXISTS auto_tracking_rules (
    id SERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- 'ad_spend', 'revenue', 'commission'
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    description_template TEXT,
    active BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recurring transactions template
CREATE TABLE IF NOT EXISTS recurring_transactions (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('income', 'expense')),
    frequency VARCHAR(20) NOT NULL, -- 'monthly', 'weekly', 'yearly'
    start_date DATE NOT NULL,
    end_date DATE,
    next_due_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    auto_create BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default budget categories
INSERT INTO budget_categories (category, monthly_limit, yearly_limit) VALUES
('Ad Spend', 5000.00, 60000.00),
('Salaries', 10000.00, 120000.00),
('Bonuses', 2000.00, 24000.00),
('Office Expenses', 1000.00, 12000.00),
('Software & Tools', 500.00, 6000.00),
('Marketing', 2000.00, 24000.00),
('Travel', 1000.00, 12000.00),
('Equipment', 2000.00, 24000.00)
ON CONFLICT (category) DO NOTHING;

-- Insert default auto-tracking rules
INSERT INTO auto_tracking_rules (platform, rule_type, category, subcategory, description_template) VALUES
('facebook', 'ad_spend', 'Ad Spend', 'Facebook Ads', 'Facebook Ad Campaign: {campaign_name}'),
('google', 'ad_spend', 'Ad Spend', 'Google Ads', 'Google Ad Campaign: {campaign_name}'),
('tiktok', 'ad_spend', 'Ad Spend', 'TikTok Ads', 'TikTok Ad Campaign: {campaign_name}'),
('linkedin', 'ad_spend', 'Ad Spend', 'LinkedIn Ads', 'LinkedIn Ad Campaign: {campaign_name}'),
('snapchat', 'ad_spend', 'Ad Spend', 'Snapchat Ads', 'Snapchat Ad Campaign: {campaign_name}')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cash_log_entries_date ON cash_log_entries(date);
CREATE INDEX IF NOT EXISTS idx_cash_log_entries_category ON cash_log_entries(category);
CREATE INDEX IF NOT EXISTS idx_cash_log_entries_source ON cash_log_entries(source);
CREATE INDEX IF NOT EXISTS idx_cash_log_entries_platform ON cash_log_entries(platform);
CREATE INDEX IF NOT EXISTS idx_monthly_profit_summaries_year_month ON monthly_profit_summaries(year, month);

-- Create function to update monthly summaries
CREATE OR REPLACE FUNCTION update_monthly_summary(entry_year INTEGER, entry_month INTEGER)
RETURNS VOID AS $$
DECLARE
    revenue_total DECIMAL(10,2);
    ad_spend_total DECIMAL(10,2);
    salary_total DECIMAL(10,2);
    bonus_total DECIMAL(10,2);
    expense_total DECIMAL(10,2);
    net_profit_calc DECIMAL(10,2);
    roi_calc DECIMAL(5,2);
BEGIN
    -- Calculate totals for the month
    SELECT 
        COALESCE(SUM(CASE WHEN transaction_type = 'income' AND category NOT IN ('Salary', 'Bonus') THEN amount ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN category = 'Ad Spend' THEN ABS(amount) ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN category = 'Salary' THEN ABS(amount) ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN category = 'Bonus' THEN ABS(amount) ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN transaction_type = 'expense' AND category NOT IN ('Ad Spend', 'Salary', 'Bonus') THEN ABS(amount) ELSE 0 END), 0)
    INTO revenue_total, ad_spend_total, salary_total, bonus_total, expense_total
    FROM cash_log_entries 
    WHERE EXTRACT(YEAR FROM date) = entry_year 
    AND EXTRACT(MONTH FROM date) = entry_month;
    
    -- Calculate net profit and ROI
    net_profit_calc := revenue_total - ad_spend_total - salary_total - bonus_total - expense_total;
    roi_calc := CASE 
        WHEN (ad_spend_total + salary_total + bonus_total + expense_total) > 0 
        THEN (net_profit_calc / (ad_spend_total + salary_total + bonus_total + expense_total)) * 100 
        ELSE 0 
    END;
    
    -- Insert or update monthly summary
    INSERT INTO monthly_profit_summaries (
        year, month, total_revenue, total_ad_spend, total_salaries, 
        total_bonuses, total_expenses, net_profit, roi_percentage, updated_at
    ) VALUES (
        entry_year, entry_month, revenue_total, ad_spend_total, salary_total,
        bonus_total, expense_total, net_profit_calc, roi_calc, NOW()
    )
    ON CONFLICT (year, month) 
    DO UPDATE SET
        total_revenue = EXCLUDED.total_revenue,
        total_ad_spend = EXCLUDED.total_ad_spend,
        total_salaries = EXCLUDED.total_salaries,
        total_bonuses = EXCLUDED.total_bonuses,
        total_expenses = EXCLUDED.total_expenses,
        net_profit = EXCLUDED.net_profit,
        roi_percentage = EXCLUDED.roi_percentage,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update monthly summaries
CREATE OR REPLACE FUNCTION trigger_update_monthly_summary()
RETURNS TRIGGER AS $$
BEGIN
    -- Update summary for the new/updated entry
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        PERFORM update_monthly_summary(EXTRACT(YEAR FROM NEW.date)::INTEGER, EXTRACT(MONTH FROM NEW.date)::INTEGER);
    END IF;
    
    -- Update summary for the old entry if date changed
    IF TG_OP = 'UPDATE' AND OLD.date != NEW.date THEN
        PERFORM update_monthly_summary(EXTRACT(YEAR FROM OLD.date)::INTEGER, EXTRACT(MONTH FROM OLD.date)::INTEGER);
    END IF;
    
    -- Update summary for deleted entry
    IF TG_OP = 'DELETE' THEN
        PERFORM update_monthly_summary(EXTRACT(YEAR FROM OLD.date)::INTEGER, EXTRACT(MONTH FROM OLD.date)::INTEGER);
        RETURN OLD;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS update_monthly_summary_trigger ON cash_log_entries;
CREATE TRIGGER update_monthly_summary_trigger
    AFTER INSERT OR UPDATE OR DELETE ON cash_log_entries
    FOR EACH ROW EXECUTE FUNCTION trigger_update_monthly_summary();

-- Enable Row Level Security
ALTER TABLE cash_log_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_profit_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_tracking_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Users can view all cash log entries" ON cash_log_entries FOR SELECT USING (true);
CREATE POLICY "Users can insert cash log entries" ON cash_log_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update cash log entries" ON cash_log_entries FOR UPDATE USING (true);
CREATE POLICY "Users can delete cash log entries" ON cash_log_entries FOR DELETE USING (true);

CREATE POLICY "Users can view monthly summaries" ON monthly_profit_summaries FOR SELECT USING (true);
CREATE POLICY "Users can view budget categories" ON budget_categories FOR SELECT USING (true);
CREATE POLICY "Users can view auto tracking rules" ON auto_tracking_rules FOR SELECT USING (true);
CREATE POLICY "Users can view recurring transactions" ON recurring_transactions FOR SELECT USING (true);
