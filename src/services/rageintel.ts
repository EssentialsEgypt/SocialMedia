import supabase from '@/utils/supabaseClient'

export interface Competitor {
    id: string
    name: string
    handle: string
    platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin'
    website?: string
    followers_count: number
    engagement_rate: number
    ad_spend: number
    threat_level: 'low' | 'medium' | 'high' | 'critical'
    activity_score: number
    last_activity?: string
    content_count: number
    pricing_info?: any
    funnel_data?: any
    audience_data?: any
    created_at: string
    updated_at: string
    is_active: boolean
}

export interface IntelAlert {
    id: string
    competitor_id: string
    alert_type: 'content' | 'ad' | 'pricing' | 'launch' | 'trend' | 'audience' | 'funnel'
    severity: 'info' | 'warning' | 'critical'
    title: string
    message: string
    action_required: boolean
    action_taken: boolean
    action_taken_at?: string
    metadata?: any
    created_at: string
}

export interface RageAction {
    id: string
    competitor_id: string
    action_type: 'counter-post' | 'ad-clone' | 'funnel-attack' | 'pricing-strike' | 'content-dna' | 'audience-script'
    status: 'pending' | 'ready' | 'executed' | 'failed'
    generated_content: string
    ai_score: number
    ai_analysis?: any
    suggestions?: string[]
    execution_steps?: string[]
    executed_at?: string
    execution_result?: any
    created_at: string
    updated_at: string
}

export interface MarketData {
    id: string
    platform: string
    data_type: 'trending_hashtags' | 'audience_insights' | 'ad_performance' | 'content_patterns'
    data: any
    confidence_score: number
    relevance_score: number
    collected_at: string
}

export interface Campaign {
    id: string
    name: string
    description?: string
    target_competitors: string[]
    campaign_type: 'content_attack' | 'pricing_war' | 'audience_hijack' | 'funnel_optimization'
    status: 'planning' | 'active' | 'paused' | 'completed' | 'failed'
    start_date?: string
    end_date?: string
    budget: number
    spent: number
    results?: any
    created_at: string
    updated_at: string
}

class RageIntelService {
    // Competitor Management
    async getCompetitors(): Promise<Competitor[]> {
        const { data, error } = await supabase
            .from('rageintel_competitors')
            .select('*')
            .eq('is_active', true)
            .order('threat_level', { ascending: false })
            .order('activity_score', { ascending: false })

        if (error) throw error
        return data || []
    }

    async addCompetitor(competitor: Omit<Competitor, 'id' | 'created_at' | 'updated_at'>): Promise<Competitor> {
        const { data, error } = await supabase
            .from('rageintel_competitors')
            .insert([competitor])
            .select()
            .single()

        if (error) throw error
        return data
    }

    async updateCompetitor(id: string, updates: Partial<Competitor>): Promise<Competitor> {
        const { data, error } = await supabase
            .from('rageintel_competitors')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    async deleteCompetitor(id: string): Promise<void> {
        const { error } = await supabase
            .from('rageintel_competitors')
            .delete()
            .eq('id', id)

        if (error) throw error
    }

    // Intel Scanning
    async startIntelScan(competitorIds?: string[]): Promise<{
        competitors: Competitor[]
        alerts: IntelAlert[]
        actions: RageAction[]
    }> {
        try {
            // Simulate AI-powered scanning
            const scanResult = await fetch('/api/rageintel/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ competitors: competitorIds })
            })

            if (!scanResult.ok) throw new Error('Scan failed')

            return await scanResult.json()
        } catch (error) {
            console.error('Intel scan error:', error)
            throw error
        }
    }

    // Alert Management
    async getAlerts(): Promise<IntelAlert[]> {
        const { data, error } = await supabase
            .from('rageintel_alerts')
            .select(`
        *,
        rageintel_competitors(name, handle)
      `)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    async createAlert(alert: Omit<IntelAlert, 'id' | 'created_at'>): Promise<IntelAlert> {
        const { data, error } = await supabase
            .from('rageintel_alerts')
            .insert([alert])
            .select()
            .single()

        if (error) throw error
        return data
    }

    async markAlertAsActioned(id: string): Promise<void> {
        const { error } = await supabase
            .from('rageintel_alerts')
            .update({
                action_taken: true,
                action_taken_at: new Date().toISOString()
            })
            .eq('id', id)

        if (error) throw error
    }

    // Rage Actions
    async getRageActions(): Promise<RageAction[]> {
        const { data, error } = await supabase
            .from('rageintel_actions')
            .select(`
        *,
        rageintel_competitors(name, handle)
      `)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    async generateRageAction(action: {
        action_type: RageAction['action_type']
        competitor_id: string
        competitor_content?: string
        platform?: string
        target_audience?: string
    }): Promise<RageAction> {
        try {
            // Call AI generation API
            const response = await fetch('/api/rageintel/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(action)
            })

            if (!response.ok) throw new Error('Generation failed')

            const generatedData = await response.json()

            // Save to database
            const { data, error } = await supabase
                .from('rageintel_actions')
                .insert([{
                    competitor_id: action.competitor_id,
                    action_type: action.action_type,
                    status: 'ready',
                    generated_content: generatedData.generatedContent,
                    ai_score: generatedData.aiAnalysis.overallScore,
                    ai_analysis: generatedData.aiAnalysis,
                    suggestions: generatedData.suggestions,
                    execution_steps: generatedData.executionSteps
                }])
                .select()
                .single()

            if (error) throw error
            return data
        } catch (error) {
            console.error('Rage action generation error:', error)
            throw error
        }
    }

    async executeRageAction(id: string): Promise<void> {
        const { error } = await supabase
            .from('rageintel_actions')
            .update({
                status: 'executed',
                executed_at: new Date().toISOString()
            })
            .eq('id', id)

        if (error) throw error
    }

    // Market Intelligence
    async getMarketData(platform?: string, dataType?: string): Promise<MarketData[]> {
        let query = supabase
            .from('rageintel_market_data')
            .select('*')
            .order('collected_at', { ascending: false })

        if (platform) query = query.eq('platform', platform)
        if (dataType) query = query.eq('data_type', dataType)

        const { data, error } = await query

        if (error) throw error
        return data || []
    }

    async addMarketData(marketData: Omit<MarketData, 'id' | 'collected_at'>): Promise<MarketData> {
        const { data, error } = await supabase
            .from('rageintel_market_data')
            .insert([marketData])
            .select()
            .single()

        if (error) throw error
        return data
    }

    // Campaign Management
    async getCampaigns(): Promise<Campaign[]> {
        const { data, error } = await supabase
            .from('rageintel_campaigns')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    async createCampaign(campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<Campaign> {
        const { data, error } = await supabase
            .from('rageintel_campaigns')
            .insert([campaign])
            .select()
            .single()

        if (error) throw error
        return data
    }

    async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign> {
        const { data, error } = await supabase
            .from('rageintel_campaigns')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    // Analytics and Performance
    async getPerformanceMetrics(actionId: string): Promise<any> {
        const { data, error } = await supabase
            .from('rageintel_performance')
            .select('*')
            .eq('action_id', actionId)
            .order('measured_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    async addPerformanceMetric(metric: {
        action_id: string
        metric_type: 'engagement' | 'conversion' | 'reach' | 'clicks' | 'revenue'
        metric_value: number
        baseline_value?: number
        improvement_percentage?: number
    }): Promise<void> {
        const { error } = await supabase
            .from('rageintel_performance')
            .insert([metric])

        if (error) throw error
    }

    // Threat Analysis
    async analyzeThreatLevel(competitorId: string): Promise<'low' | 'medium' | 'high' | 'critical'> {
        const { data: competitor, error } = await supabase
            .from('rageintel_competitors')
            .select('activity_score, engagement_rate, ad_spend, followers_count')
            .eq('id', competitorId)
            .single()

        if (error) throw error

        // Use the database function to calculate threat level
        const { data: threatLevel, error: functionError } = await supabase
            .rpc('calculate_threat_level', {
                p_activity_score: competitor.activity_score,
                p_engagement_rate: competitor.engagement_rate,
                p_ad_spend: competitor.ad_spend,
                p_followers_count: competitor.followers_count
            })

        if (functionError) throw functionError
        return threatLevel
    }

    // Content Analysis
    async analyzeContentDNA(competitorId: string): Promise<any> {
        const { data: content, error } = await supabase
            .from('rageintel_content')
            .select('*')
            .eq('competitor_id', competitorId)
            .order('posted_at', { ascending: false })
            .limit(50)

        if (error) throw error

        // Analyze content patterns
        const analysis = {
            hookPatterns: this.extractHookPatterns(content),
            ctaFormats: this.extractCTAFormats(content),
            timingStrategy: this.analyzeTimingStrategy(content),
            visualElements: this.analyzeVisualElements(content),
            engagementDrivers: this.analyzeEngagementDrivers(content)
        }

        return analysis
    }

    private extractHookPatterns(content: any[]): any {
        // AI-powered hook pattern analysis
        return {
            mostEffective: ['Scarcity', 'Problem-Agitation-Solution', 'Question'],
            averageHookLength: 45,
            topPerformingHooks: content
                .filter(c => c.engagement_count > 100)
                .map(c => c.content_text?.substring(0, 100))
        }
    }

    private extractCTAFormats(content: any[]): any {
        return {
            formats: ['DM "CODE"', 'Click Link', 'Comment Below', 'Save Post'],
            effectiveness: [85, 72, 68, 45]
        }
    }

    private analyzeTimingStrategy(content: any[]): any {
        return {
            optimalTimes: ['9:00 AM', '12:00 PM', '6:00 PM', '8:00 PM'],
            frequency: '2-3 posts per day',
            bestDays: ['Tuesday', 'Thursday', 'Saturday']
        }
    }

    private analyzeVisualElements(content: any[]): any {
        return {
            colors: ['Red', 'Blue', 'Green'],
            layouts: ['Grid', 'Carousel', 'Single'],
            elements: ['Text Overlay', 'Emojis', 'Arrows']
        }
    }

    private analyzeEngagementDrivers(content: any[]): any {
        return {
            topDrivers: ['User-Generated Content', 'Behind-the-Scenes', 'Educational'],
            engagementRates: [4.2, 3.8, 3.5]
        }
    }

    // Real-time Monitoring
    async startRealTimeMonitoring(competitorIds: string[]): Promise<void> {
        // Set up real-time subscriptions for competitor activity
        supabase
            .channel('rageintel-monitoring')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'rageintel_content',
                filter: `competitor_id=in.(${competitorIds.join(',')})`
            }, (payload) => {
                this.handleNewContent(payload.new)
            })
            .subscribe()
    }

    private async handleNewContent(content: any): Promise<void> {
        // Analyze new content and generate alerts/actions
        const analysis = await this.analyzeContent(content)

        if (analysis.threatScore > 7) {
            await this.createAlert({
                competitor_id: content.competitor_id,
                alert_type: 'content',
                severity: 'critical',
                title: 'High-Engagement Content Detected',
                message: `Competitor posted content with ${content.engagement_count} engagements. Generate counter-strategy now.`,
                action_required: true,
                action_taken: false
            })
        }
    }

    private async analyzeContent(content: any): Promise<{ threatScore: number }> {
        // AI-powered content analysis
        const threatScore = Math.min(10, content.engagement_count / 100)
        return { threatScore }
    }
}

export const rageIntelService = new RageIntelService() 