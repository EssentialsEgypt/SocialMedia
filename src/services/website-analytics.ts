// Website Analytics Service Layer
// Essentials Enhanced Platform

export interface SessionData {
    id: string
    session_id: string
    user_id?: string
    timestamp: string
    device_type: string
    traffic_source: string
    page_path: string
    session_duration: number
    scroll_depth_percentage: number
    rage_clicks: number
    hover_back: boolean
    cart_view: boolean
    checkout_reached: boolean
    converted: boolean
    order_value: number
    session_labels: string[]
    ai_summary: string
    behavior_score?: number
    ai_recommendations?: string[]
}

export interface DropoffData {
    id: string
    page_path: string
    drop_off_type: string
    drop_off_rate: number
    affected_users_count: number
    revenue_impact: number
    ai_insight: string
    severity: string
    created_at: string
    updated_at: string
}

export interface ProductFunnelData {
    product_id: string
    product_name: string
    scroll_percentage: number
    add_to_cart_percentage: number
    zoom_percentage: number
    review_click_percentage: number
    checkout_percentage: number
    conversion_rate: number
}

export interface RevenueHeatmapData {
    page_section: string
    clicks_count: number
    revenue_generated: number
    conversion_rate: number
}

export interface CompetitorBenchmarkData {
    metric_name: string
    industry_average: number
    your_value: number
    difference_percentage: number
    category: string
}

export interface AISummaryData {
    summary_date: string
    sessions_count: number
    total_sales: number
    exits_count: number
    best_product: string
    worst_product: string
    ai_summary: string
    key_insights: string[]
    recommendations: string[]
}

export interface ChatbotQuery {
    id: string
    user_id: string
    query: string
    response: string
    metrics_returned: any
    graphs_generated: string[]
    language: string
    created_at: string
}

export interface AnalyticsSummary {
    total_sessions: number
    conversion_rate: string
    average_session_duration: number
    total_revenue: number
    total_dropoffs: number
    total_revenue_impact: number
    average_drop_off_rate: string
    critical_issues: number
    high_priority_issues: number
}

export interface AIAnalysis {
    labels: string[]
    summary: string
    confidence: number
    suggested_actions?: string[]
}

export interface DropoffAnalysis {
    severity: string
    insight: string
    confidence: number
    suggested_actions: string[]
}

export interface ChatbotResponse {
    response: string
    metrics: any
    graphs: string[]
    confidence: number
}

class WebsiteAnalyticsService {
    private baseUrl = '/api/website-analytics'

    // Session Management
    async getSessions(filters?: {
        device_type?: string
        traffic_source?: string
        date_range?: string
    }): Promise<{ success: boolean; data: SessionData[]; summary: any }> {
        try {
            const params = new URLSearchParams()
            if (filters?.device_type) params.append('device_type', filters.device_type)
            if (filters?.traffic_source) params.append('traffic_source', filters.traffic_source)
            if (filters?.date_range) params.append('date_range', filters.date_range)

            const response = await fetch(`${this.baseUrl}/sessions?${params}`)
            return await response.json()
        } catch (error) {
            console.error('Error fetching sessions:', error)
            throw new Error('Failed to fetch sessions')
        }
    }

    async createSession(sessionData: Partial<SessionData>): Promise<{ success: boolean; data: SessionData; ai_analysis: AIAnalysis }> {
        try {
            const response = await fetch(`${this.baseUrl}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sessionData),
            })
            return await response.json()
        } catch (error) {
            console.error('Error creating session:', error)
            throw new Error('Failed to create session')
        }
    }

    // Drop-off Detection
    async getDropoffs(filters?: {
        severity?: string
        drop_off_type?: string
        page_path?: string
    }): Promise<{ success: boolean; data: DropoffData[]; summary: any; recommendations: string[] }> {
        try {
            const params = new URLSearchParams()
            if (filters?.severity) params.append('severity', filters.severity)
            if (filters?.drop_off_type) params.append('drop_off_type', filters.drop_off_type)
            if (filters?.page_path) params.append('page_path', filters.page_path)

            const response = await fetch(`${this.baseUrl}/dropoffs?${params}`)
            return await response.json()
        } catch (error) {
            console.error('Error fetching drop-offs:', error)
            throw new Error('Failed to fetch drop-offs')
        }
    }

    async createDropoff(dropoffData: Partial<DropoffData>): Promise<{ success: boolean; data: DropoffData; ai_analysis: DropoffAnalysis }> {
        try {
            const response = await fetch(`${this.baseUrl}/dropoffs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dropoffData),
            })
            return await response.json()
        } catch (error) {
            console.error('Error creating drop-off record:', error)
            throw new Error('Failed to create drop-off record')
        }
    }

    // AI Chatbot
    async queryChatbot(query: string, language: string = 'en'): Promise<{ success: boolean; data: ChatbotQuery; ai_analysis: ChatbotResponse }> {
        try {
            const response = await fetch(`${this.baseUrl}/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, language }),
            })
            return await response.json()
        } catch (error) {
            console.error('Error querying chatbot:', error)
            throw new Error('Failed to query chatbot')
        }
    }

    // Analytics Summary
    async getAnalyticsSummary(): Promise<AnalyticsSummary> {
        try {
            const [sessionsResponse, dropoffsResponse] = await Promise.all([
                this.getSessions(),
                this.getDropoffs()
            ])

            const sessions = sessionsResponse.data
            const dropoffs = dropoffsResponse.data

            return {
                total_sessions: sessions.length,
                conversion_rate: sessionsResponse.summary?.conversion_rate || '0.0',
                average_session_duration: sessionsResponse.summary?.average_session_duration || 0,
                total_revenue: sessionsResponse.summary?.total_revenue || 0,
                total_dropoffs: dropoffs.length,
                total_revenue_impact: dropoffsResponse.summary?.total_revenue_impact || 0,
                average_drop_off_rate: dropoffsResponse.summary?.average_drop_off_rate || '0.0',
                critical_issues: dropoffsResponse.summary?.critical_issues || 0,
                high_priority_issues: dropoffsResponse.summary?.high_priority_issues || 0
            }
        } catch (error) {
            console.error('Error getting analytics summary:', error)
            throw new Error('Failed to get analytics summary')
        }
    }

    // Real-time Analytics
    async getRealTimeAnalytics(): Promise<{
        active_sessions: number
        conversions_today: number
        revenue_today: number
        top_performing_pages: string[]
    }> {
        try {
            // Simulate real-time data
            return {
                active_sessions: Math.floor(Math.random() * 50) + 10,
                conversions_today: Math.floor(Math.random() * 20) + 5,
                revenue_today: Math.floor(Math.random() * 10000) + 5000,
                top_performing_pages: [
                    '/collections/hoodies',
                    '/products/bape-shark-hoodie',
                    '/collections/new-arrivals'
                ]
            }
        } catch (error) {
            console.error('Error getting real-time analytics:', error)
            throw new Error('Failed to get real-time analytics')
        }
    }

    // AI-Powered Insights
    async generateAIInsights(): Promise<{
        behavior_insights: string[]
        optimization_recommendations: string[]
        predicted_trends: string[]
    }> {
        try {
            // Simulate AI-generated insights
            return {
                behavior_insights: [
                    "Mobile users convert 23% better than desktop users",
                    "Users spend 45% more time on product pages with size guides",
                    "Instagram traffic has 18% higher average order value",
                    "Cart abandonment peaks at 3 PM local time"
                ],
                optimization_recommendations: [
                    "Add size guide popup for mobile users",
                    "Optimize checkout process for faster completion",
                    "Implement one-click checkout for returning customers",
                    "Add customer reviews to product pages"
                ],
                predicted_trends: [
                    "Mobile conversion rates expected to increase by 15% next month",
                    "BAPE collection will continue trending for 2 more weeks",
                    "Checkout abandonment will decrease by 8% with new optimizations"
                ]
            }
        } catch (error) {
            console.error('Error generating AI insights:', error)
            throw new Error('Failed to generate AI insights')
        }
    }

    // Competitor Analysis
    async getCompetitorBenchmarks(): Promise<CompetitorBenchmarkData[]> {
        try {
            // Simulate competitor benchmark data
            return [
                {
                    metric_name: "bounce_rate",
                    industry_average: 45.2,
                    your_value: 38.7,
                    difference_percentage: -14.4,
                    category: "fashion"
                },
                {
                    metric_name: "aov",
                    industry_average: 850.00,
                    your_value: 1250.00,
                    difference_percentage: 47.1,
                    category: "fashion"
                },
                {
                    metric_name: "retention",
                    industry_average: 12.3,
                    your_value: 18.7,
                    difference_percentage: 52.0,
                    category: "fashion"
                }
            ]
        } catch (error) {
            console.error('Error getting competitor benchmarks:', error)
            throw new Error('Failed to get competitor benchmarks')
        }
    }

    // Revenue Analysis
    async getRevenueHeatmaps(): Promise<RevenueHeatmapData[]> {
        try {
            // Simulate revenue heatmap data
            return [
                {
                    page_section: "Best Sellers",
                    clicks_count: 2847,
                    revenue_generated: 42500.00,
                    conversion_rate: 8.9
                },
                {
                    page_section: "New Arrivals",
                    clicks_count: 1923,
                    revenue_generated: 28750.00,
                    conversion_rate: 6.2
                },
                {
                    page_section: "Sale Section",
                    clicks_count: 3456,
                    revenue_generated: 52100.00,
                    conversion_rate: 12.4
                }
            ]
        } catch (error) {
            console.error('Error getting revenue heatmaps:', error)
            throw new Error('Failed to get revenue heatmaps')
        }
    }

    // Product Funnel Analysis
    async getProductFunnels(): Promise<ProductFunnelData[]> {
        try {
            // Simulate product funnel data
            return [
                {
                    product_id: "bape-shark-hoodie",
                    product_name: "BAPE Shark Hoodie",
                    scroll_percentage: 85.2,
                    add_to_cart_percentage: 12.8,
                    zoom_percentage: 45.3,
                    review_click_percentage: 8.7,
                    checkout_percentage: 6.2,
                    conversion_rate: 6.2
                },
                {
                    product_id: "supreme-box-logo",
                    product_name: "Supreme Box Logo Tee",
                    scroll_percentage: 72.1,
                    add_to_cart_percentage: 9.4,
                    zoom_percentage: 38.9,
                    review_click_percentage: 6.2,
                    checkout_percentage: 4.1,
                    conversion_rate: 4.1
                }
            ]
        } catch (error) {
            console.error('Error getting product funnels:', error)
            throw new Error('Failed to get product funnels')
        }
    }

    // AI Daily Summary
    async generateDailySummary(): Promise<AISummaryData> {
        try {
            // Simulate AI daily summary
            return {
                summary_date: new Date().toISOString().split('T')[0],
                sessions_count: 5240,
                total_sales: 74100.00,
                exits_count: 1892,
                best_product: "BAPE Shark Hoodie",
                worst_product: "Supreme Box Logo Tee",
                ai_summary: "Today showed strong mobile traffic from Instagram with high conversion rates. The BAPE collection performed exceptionally well, while Supreme items need better product descriptions.",
                key_insights: [
                    "Mobile users convert 23% better than desktop",
                    "Instagram traffic has 18% higher AOV",
                    "Size guide visibility increases conversion by 34%"
                ],
                recommendations: [
                    "Optimize Supreme product pages with better descriptions",
                    "Add size guide popup for mobile users",
                    "Increase Instagram ad spend during peak hours"
                ]
            }
        } catch (error) {
            console.error('Error generating daily summary:', error)
            throw new Error('Failed to generate daily summary')
        }
    }

    // Export Analytics
    async exportAnalyticsReport(format: 'pdf' | 'csv' | 'json' = 'pdf'): Promise<string> {
        try {
            // Simulate report generation
            const reportUrl = `/api/website-analytics/export?format=${format}`
            return reportUrl
        } catch (error) {
            console.error('Error exporting analytics report:', error)
            throw new Error('Failed to export analytics report')
        }
    }

    // Track User Action
    async trackUserAction(action: {
        session_id: string
        action_type: string
        element_selector?: string
        position_x?: number
        position_y?: number
        product_id?: string
        metadata?: any
    }): Promise<void> {
        try {
            await fetch(`${this.baseUrl}/actions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(action),
            })
        } catch (error) {
            console.error('Error tracking user action:', error)
            // Don't throw error for tracking failures to avoid breaking user experience
        }
    }

    // Get Session Behavior Score
    calculateBehaviorScore(session: SessionData): number {
        let score = 0
        
        // Base score from scroll depth
        score += Math.floor(session.scroll_depth_percentage / 10)
        
        // Penalty for rage clicks
        score -= session.rage_clicks * 5
        
        // Bonus for longer sessions
        if (session.session_duration > 300) {
            score += 20
        }
        
        // Bonus for conversion
        if (session.converted) {
            score += 50
        }
        
        return Math.max(0, Math.min(100, score))
    }

    // Detect Session Labels
    detectSessionLabels(session: SessionData): string[] {
        const labels = []
        
        if (session.scroll_depth_percentage > 70 && session.session_duration > 180) {
            labels.push("intent")
        }
        
        if (session.rage_clicks > 2) {
            labels.push("frustration")
        }
        
        if (session.scroll_depth_percentage < 30 && session.session_duration > 120) {
            labels.push("confusion")
        }
        
        if (session.converted || (session.scroll_depth_percentage > 80 && session.session_duration > 300)) {
            labels.push("high_intent")
        }
        
        return labels
    }
}

export const websiteAnalyticsService = new WebsiteAnalyticsService() 