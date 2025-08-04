// AdPilot AI Service Layer
// Handles API calls and data management for the AdPilot AI system

export interface Campaign {
    id: string
    name: string
    platform: 'meta' | 'google' | 'tiktok' | 'linkedin' | 'twitter'
    campaignType: 'cold' | 'warm' | 'retargeting' | 'lookalike' | 'custom'
    status: 'active' | 'paused' | 'completed' | 'draft'
    budget: number
    spent: number
    impressions: number
    clicks: number
    conversions: number
    revenue: number
    roas: number
    ctr: number
    cpm: number
    cpc: number
    frequency: number
    healthScore: number
    goalMatchScore: number
    fatigueForecastDate?: string
    aiRecommendations?: any
}

export interface AIAction {
    id: string
    campaignId: string
    actionType: 'increase_budget' | 'decrease_budget' | 'turn_off' | 'duplicate' | 'rotate_creative' | 'merge_audience' | 'expand_audience'
    reason: string
    metrics: any
    confidenceScore: number
    executed: boolean
    executedAt?: string
    result?: any
}

export interface Alert {
    id: string
    type: 'performance_drop' | 'fatigue_warning' | 'budget_limit' | 'overlap_detected' | 'scaling_opportunity' | 'creative_test_complete'
    severity: 'info' | 'warning' | 'critical'
    title: string
    message: string
    campaignId?: string
    adId?: string
    read: boolean
    actionRequired: boolean
    actionTaken: boolean
    timestamp: string
}

export interface ScalingLog {
    id: string
    campaignId: string
    scalingType: 'budget_increase' | 'budget_decrease' | 'audience_expansion' | 'creative_rotation'
    oldValue: number
    newValue: number
    percentageChange: number
    successScore: number
    notes: string
    createdAt: string
}

export interface AudienceOverlap {
    id: string
    adSet1Id: string
    adSet2Id: string
    overlapPercentage: number
    recommendation: 'merge' | 'expand' | 'keep_separate'
    teamId: string
    createdAt: string
}

export interface CreativeTest {
    id: string
    name: string
    testType: 'ab_test' | 'multivariate' | 'sequential'
    status: 'running' | 'completed' | 'paused'
    creativeAId: string
    creativeBId: string
    creativeCId?: string
    winnerId?: string
    testDurationDays: number
    confidenceLevel?: number
    results?: any
    teamId: string
    userId: string
    createdAt: string
    updatedAt: string
}

class AdPilotService {
    private baseUrl = '/api/adpilot'

    // Campaign Management
    async getCampaigns(): Promise<Campaign[]> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching campaigns:', error)
            return []
        }
    }

    async createCampaign(campaignData: Partial<Campaign>): Promise<Campaign | null> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaignData),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error creating campaign:', error)
            return null
        }
    }

    async updateCampaign(campaignId: string, updates: Partial<Campaign>): Promise<Campaign | null> {
        try {
            const response = await fetch(`${this.baseUrl}/campaigns`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ campaignId, updates }),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error updating campaign:', error)
            return null
        }
    }

    // AI Actions
    async getAIActions(): Promise<AIAction[]> {
        try {
            const response = await fetch(`${this.baseUrl}/actions`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching AI actions:', error)
            return []
        }
    }

    async createAIAction(actionData: Partial<AIAction>): Promise<AIAction | null> {
        try {
            const response = await fetch(`${this.baseUrl}/actions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(actionData),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error creating AI action:', error)
            return null
        }
    }

    async executeAIAction(actionId: string): Promise<AIAction | null> {
        try {
            const response = await fetch(`${this.baseUrl}/actions`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ actionId, executed: true }),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error executing AI action:', error)
            return null
        }
    }

    // Alerts
    async getAlerts(): Promise<Alert[]> {
        try {
            const response = await fetch(`${this.baseUrl}/alerts`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching alerts:', error)
            return []
        }
    }

    async createAlert(alertData: Partial<Alert>): Promise<Alert | null> {
        try {
            const response = await fetch(`${this.baseUrl}/alerts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alertData),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error creating alert:', error)
            return null
        }
    }

    async updateAlert(alertId: string, updates: Partial<Alert>): Promise<Alert | null> {
        try {
            const response = await fetch(`${this.baseUrl}/alerts`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ alertId, updates }),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error updating alert:', error)
            return null
        }
    }

    // Analytics
    async getScalingLogs(): Promise<ScalingLog[]> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics?type=scaling-logs`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching scaling logs:', error)
            return []
        }
    }

    async getAudienceOverlaps(): Promise<AudienceOverlap[]> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics?type=audience-overlaps`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching audience overlaps:', error)
            return []
        }
    }

    async getPerformanceMetrics(): Promise<any[]> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics?type=performance-metrics`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching performance metrics:', error)
            return []
        }
    }

    async getCostEfficiencyData(): Promise<any[]> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics?type=cost-efficiency`)
            const data = await response.json()
            return data.success ? data.data : []
        } catch (error) {
            console.error('Error fetching cost efficiency data:', error)
            return []
        }
    }

    async createScalingLog(scalingData: Partial<ScalingLog>): Promise<ScalingLog | null> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'scaling-log', data: scalingData }),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error creating scaling log:', error)
            return null
        }
    }

    async createAudienceOverlap(overlapData: Partial<AudienceOverlap>): Promise<AudienceOverlap | null> {
        try {
            const response = await fetch(`${this.baseUrl}/analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'audience-overlap', data: overlapData }),
            })
            const data = await response.json()
            return data.success ? data.data : null
        } catch (error) {
            console.error('Error creating audience overlap:', error)
            return null
        }
    }

    // AI Analysis Methods
    async analyzeCampaignPerformance(campaignId: string): Promise<any> {
        try {
            // Simulate AI analysis
            const analysis = {
                healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
                recommendations: [
                    {
                        action: 'increase_budget',
                        reason: 'ROAS above 2.5x with low frequency',
                        confidence: Math.floor(Math.random() * 30) + 70
                    }
                ],
                fatigueForecast: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                riskFactors: ['High frequency', 'Declining CTR'],
                opportunities: ['Ready for scaling', 'Creative rotation needed']
            }
            return analysis
        } catch (error) {
            console.error('Error analyzing campaign performance:', error)
            return null
        }
    }

    async generateScalingPlan(): Promise<any> {
        try {
            // Simulate AI scaling plan generation
            const plan = {
                topAdsToScale: [
                    { id: '1', name: 'Summer Sale Video A', recommendedIncrease: 50 },
                    { id: '2', name: 'Product Showcase Image', recommendedIncrease: 25 }
                ],
                budgetReallocation: [
                    { campaignId: '1', currentBudget: 5000, suggestedBudget: 7500 },
                    { campaignId: '2', currentBudget: 3000, suggestedBudget: 4500 }
                ],
                creativeRotation: [
                    { campaignId: '1', nextRotationDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() }
                ],
                audienceExpansion: [
                    { adSetId: 'adset-1', currentSize: 100000, suggestedSize: 150000 }
                ]
            }
            return plan
        } catch (error) {
            console.error('Error generating scaling plan:', error)
            return null
        }
    }

    async analyzeCreative(creativeData: any): Promise<any> {
        try {
            // Simulate AI creative analysis
            const analysis = {
                hookStrength: Math.floor(Math.random() * 40) + 60,
                ctaPlacementScore: Math.floor(Math.random() * 40) + 60,
                colorContrastScore: Math.floor(Math.random() * 40) + 60,
                visualClutterScore: Math.floor(Math.random() * 40) + 60,
                brandingClarityScore: Math.floor(Math.random() * 40) + 60,
                overallScore: Math.floor(Math.random() * 40) + 60,
                suggestions: [
                    'Add more dynamic movement in first 3 seconds',
                    'Improve CTA button contrast',
                    'Reduce visual clutter in background'
                ]
            }
            return analysis
        } catch (error) {
            console.error('Error analyzing creative:', error)
            return null
        }
    }

    // Utility Methods
    calculateHealthScore(campaign: Campaign): number {
        const roasWeight = 0.4
        const ctrWeight = 0.3
        const frequencyWeight = 0.3

        const roasScore = Math.min(campaign.roas * 20, 100) // Max 100 for 5x ROAS
        const ctrScore = Math.min(campaign.ctr * 10, 100) // Max 100 for 10% CTR
        const frequencyScore = Math.max(100 - campaign.frequency * 20, 0) // Lower frequency = higher score

        return Math.round(roasScore * roasWeight + ctrScore * ctrWeight + frequencyScore * frequencyWeight)
    }

    calculateFatigueScore(campaign: Campaign): number {
        const frequencyThreshold = 3.0
        const ctrDeclineThreshold = -0.5

        let fatigueScore = 0

        if (campaign.frequency > frequencyThreshold) {
            fatigueScore += 40
        }

        // Simulate CTR decline (in real implementation, this would be calculated from historical data)
        const simulatedCtrDecline = -0.2
        if (simulatedCtrDecline < ctrDeclineThreshold) {
            fatigueScore += 30
        }

        return Math.min(fatigueScore, 100)
    }
}

export const adPilotService = new AdPilotService() 