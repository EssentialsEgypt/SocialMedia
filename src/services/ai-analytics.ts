// AI Analytics Service
// Essentials Enhanced OS - Intelligent Business Intelligence

import { metaAdsService, type MetaCampaign, type MetaAd } from './platforms/meta-ads'
import { shopifyService, type ShopifyProduct, type ShopifyOrder } from './platforms/shopify'

export interface AIInsight {
    id: string
    type: 'trend' | 'anomaly' | 'opportunity' | 'risk' | 'recommendation'
    category: 'sales' | 'marketing' | 'inventory' | 'customer' | 'performance'
    title: string
    description: string
    confidence: number
    impact: 'high' | 'medium' | 'low'
    actionable: boolean
    action?: string
    data: any
    timestamp: Date
}

export interface PredictiveMetric {
    metric: string
    currentValue: number
    predictedValue: number
    confidence: number
    timeframe: string
    factors: string[]
    trend: 'increasing' | 'decreasing' | 'stable'
}

export interface CustomerSegment {
    id: string
    name: string
    size: number
    value: number
    behavior: string[]
    risk: 'low' | 'medium' | 'high'
    opportunity: 'high' | 'medium' | 'low'
    recommendations: string[]
}

export interface PerformanceAlert {
    id: string
    type: 'underperformance' | 'overperformance' | 'anomaly' | 'opportunity'
    metric: string
    currentValue: number
    expectedValue: number
    deviation: number
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
    recommendations: string[]
    timestamp: Date
}

export interface BusinessHealth {
    overall: 'excellent' | 'good' | 'fair' | 'poor'
    score: number
    metrics: {
        sales: number
        marketing: number
        customer: number
        inventory: number
        financial: number
    }
    trends: {
        sales: 'up' | 'down' | 'stable'
        marketing: 'up' | 'down' | 'stable'
        customer: 'up' | 'down' | 'stable'
        inventory: 'up' | 'down' | 'stable'
        financial: 'up' | 'down' | 'stable'
    }
    insights: AIInsight[]
    recommendations: string[]
}

export class AIAnalyticsService {
    private openaiApiKey: string
    private isActive: boolean = true

    constructor() {
        this.openaiApiKey = process.env.OPENAI_API_KEY || ''
    }

    private async callOpenAI(prompt: string, temperature: number = 0.3): Promise<string> {
        if (!this.openaiApiKey) {
            return 'AI analysis unavailable - API key not configured'
        }

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.openaiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an expert business analyst specializing in e-commerce, digital marketing, and customer behavior. Provide concise, actionable insights based on the data provided.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature,
                    max_tokens: 500
                })
            })

            const data = await response.json()
            return data.choices?.[0]?.message?.content || 'No analysis available'
        } catch (error) {
            console.error('OpenAI API error:', error)
            return 'AI analysis temporarily unavailable'
        }
    }

    // Sales Performance Analysis
    async analyzeSalesPerformance(orders: ShopifyOrder[], timeframe: string = '30d'): Promise<AIInsight[]> {
        const insights: AIInsight[] = []

        // Calculate key metrics
        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0)
        const avgOrderValue = totalRevenue / orders.length
        const orderCount = orders.length

        // Revenue trend analysis
        const recentOrders = orders.filter(order => {
            const orderDate = new Date(order.created_at)
            const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            return orderDate > cutoffDate
        })

        const recentRevenue = recentOrders.reduce((sum, order) => sum + parseFloat(order.total_price), 0)
        const revenueChange = ((recentRevenue - (totalRevenue - recentRevenue)) / (totalRevenue - recentRevenue)) * 100

        if (revenueChange > 20) {
            insights.push({
                id: `sales-${Date.now()}`,
                type: 'trend',
                category: 'sales',
                title: 'Strong Revenue Growth',
                description: `Revenue increased by ${revenueChange.toFixed(1)}% in the last 7 days`,
                confidence: 0.85,
                impact: 'high',
                actionable: true,
                action: 'Consider increasing ad spend to capitalize on momentum',
                data: { revenueChange, recentRevenue, totalRevenue },
                timestamp: new Date()
            })
        } else if (revenueChange < -20) {
            insights.push({
                id: `sales-${Date.now()}`,
                type: 'risk',
                category: 'sales',
                title: 'Revenue Decline Detected',
                description: `Revenue decreased by ${Math.abs(revenueChange).toFixed(1)}% in the last 7 days`,
                confidence: 0.80,
                impact: 'high',
                actionable: true,
                action: 'Review marketing campaigns and customer acquisition strategies',
                data: { revenueChange, recentRevenue, totalRevenue },
                timestamp: new Date()
            })
        }

        // Average order value analysis
        if (avgOrderValue < 50) {
            insights.push({
                id: `aov-${Date.now()}`,
                type: 'opportunity',
                category: 'sales',
                title: 'Low Average Order Value',
                description: `Average order value is $${avgOrderValue.toFixed(2)} - below industry standard`,
                confidence: 0.75,
                impact: 'medium',
                actionable: true,
                action: 'Implement upselling strategies and bundle offers',
                data: { avgOrderValue },
                timestamp: new Date()
            })
        }

        return insights
    }

    // Marketing Performance Analysis
    async analyzeMarketingPerformance(campaigns: MetaCampaign[], ads: MetaAd[]): Promise<AIInsight[]> {
        const insights: AIInsight[] = []

        // Calculate overall performance metrics
        const totalSpend = campaigns.reduce((sum, campaign) => sum + (campaign.insights?.spend || 0), 0)
        const totalClicks = ads.reduce((sum, ad) => sum + (ad.insights?.clicks || 0), 0)
        const totalImpressions = ads.reduce((sum, ad) => sum + (ad.insights?.impressions || 0), 0)
        const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
        const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0

        // CTR analysis
        if (avgCTR < 1.0) {
            insights.push({
                id: `ctr-${Date.now()}`,
                type: 'risk',
                category: 'marketing',
                title: 'Low Click-Through Rate',
                description: `Average CTR is ${avgCTR.toFixed(2)}% - below industry benchmark`,
                confidence: 0.80,
                impact: 'medium',
                actionable: true,
                action: 'Optimize ad creatives and targeting parameters',
                data: { avgCTR, totalClicks, totalImpressions },
                timestamp: new Date()
            })
        }

        // Cost analysis
        if (avgCPC > 2.0) {
            insights.push({
                id: `cpc-${Date.now()}`,
                type: 'risk',
                category: 'marketing',
                title: 'High Cost Per Click',
                description: `Average CPC is $${avgCPC.toFixed(2)} - consider optimizing bids`,
                confidence: 0.75,
                impact: 'medium',
                actionable: true,
                action: 'Review bidding strategy and audience targeting',
                data: { avgCPC, totalSpend, totalClicks },
                timestamp: new Date()
            })
        }

        // Campaign performance analysis
        const underperformingCampaigns = campaigns.filter(campaign =>
            campaign.insights && campaign.insights.ctr < 0.5
        )

        if (underperformingCampaigns.length > 0) {
            insights.push({
                id: `campaigns-${Date.now()}`,
                type: 'anomaly',
                category: 'marketing',
                title: 'Underperforming Campaigns Detected',
                description: `${underperformingCampaigns.length} campaigns have CTR below 0.5%`,
                confidence: 0.85,
                impact: 'high',
                actionable: true,
                action: 'Pause or optimize underperforming campaigns',
                data: { underperformingCampaigns: underperformingCampaigns.length },
                timestamp: new Date()
            })
        }

        return insights
    }

    // Customer Behavior Analysis
    async analyzeCustomerBehavior(orders: ShopifyOrder[]): Promise<AIInsight[]> {
        const insights: AIInsight[] = []

        // Customer segmentation
        const customerSpending = new Map<string, number>()
        const customerOrderCount = new Map<string, number>()

        orders.forEach(order => {
            const customerId = order.customer?.id?.toString() || order.email
            const orderValue = parseFloat(order.total_price)

            customerSpending.set(customerId, (customerSpending.get(customerId) || 0) + orderValue)
            customerOrderCount.set(customerId, (customerOrderCount.get(customerId) || 0) + 1)
        })

        const customers = Array.from(customerSpending.entries()).map(([id, totalSpent]) => ({
            id,
            totalSpent,
            orderCount: customerOrderCount.get(id) || 0
        }))

        // VIP customer analysis
        const vipCustomers = customers.filter(customer => customer.totalSpent > 500)
        const vipRevenue = vipCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0)
        const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
        const vipRevenueShare = (vipRevenue / totalRevenue) * 100

        if (vipRevenueShare > 30) {
            insights.push({
                id: `vip-${Date.now()}`,
                type: 'trend',
                category: 'customer',
                title: 'High VIP Customer Revenue',
                description: `${vipRevenueShare.toFixed(1)}% of revenue comes from VIP customers`,
                confidence: 0.90,
                impact: 'high',
                actionable: true,
                action: 'Implement VIP retention and loyalty programs',
                data: { vipRevenueShare, vipCustomers: vipCustomers.length },
                timestamp: new Date()
            })
        }

        // Customer churn analysis
        const recentOrders = orders.filter(order => {
            const orderDate = new Date(order.created_at)
            const cutoffDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            return orderDate > cutoffDate
        })

        const recentCustomers = new Set(recentOrders.map(order => order.customer?.id?.toString() || order.email))
        const totalCustomers = new Set(customers.map(customer => customer.id))
        const churnRate = ((totalCustomers.size - recentCustomers.size) / totalCustomers.size) * 100

        if (churnRate > 50) {
            insights.push({
                id: `churn-${Date.now()}`,
                type: 'risk',
                category: 'customer',
                title: 'High Customer Churn Rate',
                description: `${churnRate.toFixed(1)}% of customers haven't ordered in 30 days`,
                confidence: 0.85,
                impact: 'high',
                actionable: true,
                action: 'Implement re-engagement campaigns and loyalty programs',
                data: { churnRate, totalCustomers: totalCustomers.size, recentCustomers: recentCustomers.size },
                timestamp: new Date()
            })
        }

        return insights
    }

    // Inventory Analysis
    async analyzeInventory(products: ShopifyProduct[]): Promise<AIInsight[]> {
        const insights: AIInsight[] = []

        // Low stock analysis
        const lowStockProducts = products.filter(product => {
            const totalInventory = product.variants.reduce((sum, variant) => sum + variant.inventory_quantity, 0)
            return totalInventory <= 10
        })

        if (lowStockProducts.length > 0) {
            insights.push({
                id: `inventory-${Date.now()}`,
                type: 'risk',
                category: 'inventory',
                title: 'Low Stock Alert',
                description: `${lowStockProducts.length} products have inventory below 10 units`,
                confidence: 0.95,
                impact: 'high',
                actionable: true,
                action: 'Restock low inventory products or update availability',
                data: { lowStockProducts: lowStockProducts.length },
                timestamp: new Date()
            })
        }

        // High inventory analysis
        const highInventoryProducts = products.filter(product => {
            const totalInventory = product.variants.reduce((sum, variant) => sum + variant.inventory_quantity, 0)
            return totalInventory > 100
        })

        if (highInventoryProducts.length > 0) {
            insights.push({
                id: `overstock-${Date.now()}`,
                type: 'opportunity',
                category: 'inventory',
                title: 'Overstock Opportunity',
                description: `${highInventoryProducts.length} products have high inventory levels`,
                confidence: 0.80,
                impact: 'medium',
                actionable: true,
                action: 'Consider promotional campaigns for overstocked items',
                data: { highInventoryProducts: highInventoryProducts.length },
                timestamp: new Date()
            })
        }

        return insights
    }

    // Predictive Analytics
    async generatePredictions(orders: ShopifyOrder[], campaigns: MetaCampaign[]): Promise<PredictiveMetric[]> {
        const predictions: PredictiveMetric[] = []

        // Revenue prediction
        const recentRevenue = orders
            .filter(order => {
                const orderDate = new Date(order.created_at)
                const cutoffDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                return orderDate > cutoffDate
            })
            .reduce((sum, order) => sum + parseFloat(order.total_price), 0)

        const previousWeekRevenue = orders
            .filter(order => {
                const orderDate = new Date(order.created_at)
                const cutoffDate = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                return orderDate > cutoffDate && orderDate <= weekAgo
            })
            .reduce((sum, order) => sum + parseFloat(order.total_price), 0)

        const revenueGrowth = previousWeekRevenue > 0 ? ((recentRevenue - previousWeekRevenue) / previousWeekRevenue) * 100 : 0
        const predictedRevenue = recentRevenue * (1 + (revenueGrowth / 100))

        predictions.push({
            metric: 'Weekly Revenue',
            currentValue: recentRevenue,
            predictedValue: predictedRevenue,
            confidence: 0.75,
            timeframe: 'Next 7 days',
            factors: ['Historical growth rate', 'Seasonal patterns', 'Marketing spend'],
            trend: revenueGrowth > 0 ? 'increasing' : revenueGrowth < 0 ? 'decreasing' : 'stable'
        })

        // Ad performance prediction
        const totalSpend = campaigns.reduce((sum, campaign) => sum + (campaign.insights?.spend || 0), 0)
        const totalClicks = campaigns.reduce((sum, campaign) => sum + (campaign.insights?.clicks || 0), 0)
        const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0

        predictions.push({
            metric: 'Average CPC',
            currentValue: avgCPC,
            predictedValue: avgCPC * 1.05, // Assuming 5% increase due to competition
            confidence: 0.60,
            timeframe: 'Next 30 days',
            factors: ['Market competition', 'Seasonal trends', 'Ad quality'],
            trend: 'increasing'
        })

        return predictions
    }

    // Business Health Assessment
    async assessBusinessHealth(
        orders: ShopifyOrder[],
        campaigns: MetaCampaign[],
        products: ShopifyProduct[]
    ): Promise<BusinessHealth> {
        const salesInsights = await this.analyzeSalesPerformance(orders)
        const marketingInsights = await this.analyzeMarketingPerformance(campaigns, [])
        const customerInsights = await this.analyzeCustomerBehavior(orders)
        const inventoryInsights = await this.analyzeInventory(products)

        // Calculate health scores
        const salesScore = this.calculateHealthScore(salesInsights)
        const marketingScore = this.calculateHealthScore(marketingInsights)
        const customerScore = this.calculateHealthScore(customerInsights)
        const inventoryScore = this.calculateHealthScore(inventoryInsights)

        const financialScore = this.calculateFinancialScore(orders)

        const overallScore = (salesScore + marketingScore + customerScore + inventoryScore + financialScore) / 5

        // Determine trends
        const trends = {
            sales: this.determineTrend(salesInsights),
            marketing: this.determineTrend(marketingInsights),
            customer: this.determineTrend(customerInsights),
            inventory: this.determineTrend(inventoryInsights),
            financial: this.determineTrend(salesInsights) // Using sales insights for financial trend
        }

        // Generate recommendations
        const allInsights = [...salesInsights, ...marketingInsights, ...customerInsights, ...inventoryInsights]
        const recommendations = allInsights
            .filter(insight => insight.actionable && insight.impact === 'high')
            .map(insight => insight.action)
            .slice(0, 5)

        return {
            overall: this.getOverallHealth(overallScore),
            score: overallScore,
            metrics: {
                sales: salesScore,
                marketing: marketingScore,
                customer: customerScore,
                inventory: inventoryScore,
                financial: financialScore
            },
            trends,
            insights: allInsights,
            recommendations: recommendations.filter((rec): rec is string => rec !== undefined)
        }
    }

    private calculateHealthScore(insights: AIInsight[]): number {
        if (insights.length === 0) return 80 // Default good score if no insights

        const riskInsights = insights.filter(insight => insight.type === 'risk')
        const opportunityInsights = insights.filter(insight => insight.type === 'opportunity')
        const trendInsights = insights.filter(insight => insight.type === 'trend')

        let score = 80 // Base score

        // Reduce score for risks
        score -= riskInsights.length * 10

        // Increase score for opportunities
        score += opportunityInsights.length * 5

        // Adjust for trends
        const positiveTrends = trendInsights.filter(insight => insight.impact === 'high')
        score += positiveTrends.length * 5

        return Math.max(0, Math.min(100, score))
    }

    private calculateFinancialScore(orders: ShopifyOrder[]): number {
        if (orders.length === 0) return 80

        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0)
        const avgOrderValue = totalRevenue / orders.length

        let score = 80

        // Adjust based on average order value
        if (avgOrderValue > 100) score += 10
        else if (avgOrderValue < 50) score -= 10

        // Adjust based on order volume
        if (orders.length > 100) score += 5
        else if (orders.length < 10) score -= 10

        return Math.max(0, Math.min(100, score))
    }

    private determineTrend(insights: AIInsight[]): 'up' | 'down' | 'stable' {
        const positiveInsights = insights.filter(insight =>
            insight.type === 'trend' && insight.impact === 'high'
        )
        const negativeInsights = insights.filter(insight =>
            insight.type === 'risk' && insight.impact === 'high'
        )

        if (positiveInsights.length > negativeInsights.length) return 'up'
        if (negativeInsights.length > positiveInsights.length) return 'down'
        return 'stable'
    }

    private getOverallHealth(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
        if (score >= 85) return 'excellent'
        if (score >= 70) return 'good'
        if (score >= 50) return 'fair'
        return 'poor'
    }

    // Generate AI-powered recommendations
    async generateRecommendations(
        orders: ShopifyOrder[],
        campaigns: MetaCampaign[],
        products: ShopifyProduct[]
    ): Promise<string[]> {
        const prompt = `
    Based on the following business data, provide 5 specific, actionable recommendations:

    Sales Data:
    - Total orders: ${orders.length}
    - Total revenue: $${orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0).toFixed(2)}
    - Average order value: $${orders.length > 0 ? (orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0) / orders.length).toFixed(2) : '0'}

    Marketing Data:
    - Active campaigns: ${campaigns.length}
    - Total ad spend: $${campaigns.reduce((sum, campaign) => sum + (campaign.insights?.spend || 0), 0).toFixed(2)}

    Inventory Data:
    - Total products: ${products.length}
    - Low stock products: ${products.filter(p => p.variants.reduce((sum, v) => sum + v.inventory_quantity, 0) <= 10).length}

    Provide specific, actionable recommendations that would improve business performance.
    `

        const aiResponse = await this.callOpenAI(prompt)
        return aiResponse.split('\n').filter(line => line.trim().length > 0).slice(0, 5)
    }
}

export const aiAnalyticsService = new AIAnalyticsService() 