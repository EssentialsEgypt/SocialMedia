// CRM Service Layer
// Essentials Enhanced OS - CRM Module

export interface Lead {
    id: string
    name: string
    email: string
    phone: string
    company: string
    position: string
    source: string
    status: string
    value: number
    probability: number
    stage: string
    lastContact: string
    nextFollowUp: string
    notes: string
    tags: string[]
    activities: Array<{
        type: string
        date: string
        notes: string
    }>
    aiInsights: {
        readinessScore: number
        riskFactors: string[]
        recommendedActions: string[]
        nextBestAction: string
    }
}

export interface Deal {
    id: string
    name: string
    lead: string
    value: number
    stage: string
    probability: number
    closeDate: string
    owner: string
    products: string[]
    notes: string
    activities: Array<{
        type: string
        date: string
        notes?: string
        value?: number
    }>
}

export interface Activity {
    id: string
    type: string
    lead: string
    date: string
    duration: number
    notes: string
    outcome: string
    nextAction: string
    aiInsights?: {
        sentiment: string
        priority: string
        recommendedFollowUp: string
    }
}

export interface Customer {
    id: string
    name: string
    plan: string
    status: string
    healthScore: number
    lastActivity: string
    nextRenewal: string
    value: number
    usage: {
        features: string[]
        adoptionRate: number
        activeUsers: number
        totalUsers: number
    }
    support: {
        tickets: number
        resolved: number
        open: number
        satisfaction: number
    }
    aiInsights: {
        riskLevel: string
        expansionOpportunity: string
        recommendedActions: string[]
        churnRisk: number
    }
}

export interface PipelineStage {
    name: string
    count: number
    value: number
    probability: number
}

export interface PipelineSummary {
    totalValue: number
    totalLeads: number
    averageProbability: number
    stages: PipelineStage[]
}

export interface AIInsights {
    topPerformingSources: string[]
    averageTimeToClose: number
    conversionRates: {
        leadToQualified: number
        qualifiedToProposal: number
        proposalToWon: number
        overall: number
    }
    recommendations: string[]
    riskAlerts: string[]
}

export interface LeadSummary {
    totalValue: number
    averageProbability: number
    highValueLeads: number
    readyToClose: number
}

export interface DealSummary {
    totalValue: number
    averageValue: number
    averageProbability: number
    highProbabilityDeals: number
    expectedValue: number
}

export interface ActivitySummary {
    totalDuration: number
    averageDuration: number
    positiveOutcomes: number
    activitiesByType: Record<string, number>
}

// CRM Service Class
export class CRMService {
    private baseUrl = '/api/crm'

    // Lead Management
    async getLeads(filters?: {
        status?: string
        stage?: string
        source?: string
        search?: string
    }): Promise<{ success: boolean; data: Lead[]; total: number; summary: LeadSummary }> {
        const params = new URLSearchParams()
        if (filters?.status) params.append('status', filters.status)
        if (filters?.stage) params.append('stage', filters.stage)
        if (filters?.source) params.append('source', filters.source)
        if (filters?.search) params.append('search', filters.search)

        const response = await fetch(`${this.baseUrl}/leads?${params}`)
        return response.json()
    }

    async createLead(leadData: Omit<Lead, 'id' | 'aiInsights'>): Promise<{ success: boolean; data: Lead; message: string }> {
        const response = await fetch(`${this.baseUrl}/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        })
        return response.json()
    }

    async updateLead(id: string, leadData: Partial<Lead>): Promise<{ success: boolean; data: Lead; message: string }> {
        const response = await fetch(`${this.baseUrl}/leads?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        })
        return response.json()
    }

    async deleteLead(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${this.baseUrl}/leads?id=${id}`, {
            method: 'DELETE'
        })
        return response.json()
    }

    // Deal Management
    async getDeals(filters?: {
        stage?: string
        owner?: string
        search?: string
        minValue?: number
        maxValue?: number
    }): Promise<{ success: boolean; data: Deal[]; total: number; summary: DealSummary }> {
        const params = new URLSearchParams()
        if (filters?.stage) params.append('stage', filters.stage)
        if (filters?.owner) params.append('owner', filters.owner)
        if (filters?.search) params.append('search', filters.search)
        if (filters?.minValue) params.append('minValue', filters.minValue.toString())
        if (filters?.maxValue) params.append('maxValue', filters.maxValue.toString())

        const response = await fetch(`${this.baseUrl}/deals?${params}`)
        return response.json()
    }

    async createDeal(dealData: Omit<Deal, 'id' | 'activities'>): Promise<{ success: boolean; data: Deal; message: string }> {
        const response = await fetch(`${this.baseUrl}/deals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dealData)
        })
        return response.json()
    }

    async updateDeal(id: string, dealData: Partial<Deal>): Promise<{ success: boolean; data: Deal; message: string }> {
        const response = await fetch(`${this.baseUrl}/deals?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dealData)
        })
        return response.json()
    }

    async deleteDeal(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${this.baseUrl}/deals?id=${id}`, {
            method: 'DELETE'
        })
        return response.json()
    }

    // Activity Management
    async getActivities(filters?: {
        lead?: string
        type?: string
        outcome?: string
        dateFrom?: string
        dateTo?: string
    }): Promise<{ success: boolean; data: Activity[]; total: number; summary: ActivitySummary }> {
        const params = new URLSearchParams()
        if (filters?.lead) params.append('lead', filters.lead)
        if (filters?.type) params.append('type', filters.type)
        if (filters?.outcome) params.append('outcome', filters.outcome)
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
        if (filters?.dateTo) params.append('dateTo', filters.dateTo)

        const response = await fetch(`${this.baseUrl}/activities?${params}`)
        return response.json()
    }

    async createActivity(activityData: Omit<Activity, 'id' | 'aiInsights'>): Promise<{ success: boolean; data: Activity; message: string }> {
        const response = await fetch(`${this.baseUrl}/activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        })
        return response.json()
    }

    async updateActivity(id: string, activityData: Partial<Activity>): Promise<{ success: boolean; data: Activity; message: string }> {
        const response = await fetch(`${this.baseUrl}/activities?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        })
        return response.json()
    }

    async deleteActivity(id: string): Promise<{ success: boolean; message: string }> {
        const response = await fetch(`${this.baseUrl}/activities?id=${id}`, {
            method: 'DELETE'
        })
        return response.json()
    }

    // Customer Success
    async getCustomers(): Promise<{ success: boolean; data: Customer[]; metrics: any }> {
        const response = await fetch(`${this.baseUrl}/customers`)
        return response.json()
    }

    // Pipeline Analytics
    async getPipelineSummary(): Promise<PipelineSummary> {
        // This would typically call a dedicated analytics endpoint
        // For now, we'll simulate the data
        return {
            totalValue: 90000,
            totalLeads: 3,
            averageProbability: 68,
            stages: [
                { name: 'Lead', count: 3, value: 90000, probability: 68 },
                { name: 'Qualified', count: 1, value: 50000, probability: 75 },
                { name: 'Proposal', count: 1, value: 50000, probability: 75 },
                { name: 'Negotiation', count: 1, value: 15000, probability: 90 },
                { name: 'Closed Won', count: 0, value: 0, probability: 100 },
                { name: 'Closed Lost', count: 0, value: 0, probability: 0 }
            ]
        }
    }

    // AI Insights
    async getAIInsights(): Promise<AIInsights> {
        // This would typically call an AI service endpoint
        // For now, we'll return mock data
        return {
            topPerformingSources: ['Website', 'Referral', 'Social Media'],
            averageTimeToClose: 45,
            conversionRates: {
                leadToQualified: 33,
                qualifiedToProposal: 100,
                proposalToWon: 0,
                overall: 0
            },
            recommendations: [
                'Focus on Ahmed Hassan deal - high probability to close',
                'Sara Mahmoud needs more nurturing - schedule discovery call',
                'Mohamed Ali ready to close - send contract immediately'
            ],
            riskAlerts: [
                'Sara Mahmoud deal at risk - no recent activity',
                'Ahmed Hassan deal needs follow-up within 48 hours'
            ]
        }
    }

    // Lead Scoring
    async calculateLeadScore(leadId: string): Promise<number> {
        // This would typically call an AI service
        // For now, we'll return a mock score
        return Math.floor(Math.random() * 40) + 60 // 60-100
    }

    // Follow-up Scheduling
    async scheduleFollowUp(leadId: string, date: string, notes: string): Promise<{ success: boolean; message: string }> {
        const activityData = {
            type: 'follow_up',
            lead: leadId,
            date: new Date().toISOString().split('T')[0],
            duration: 30,
            notes: `Scheduled follow-up for ${date}: ${notes}`,
            outcome: 'Scheduled',
            nextAction: 'Prepare for follow-up call'
        }

        return this.createActivity(activityData)
    }

    // Deal Closing
    async closeDeal(dealId: string, outcome: 'won' | 'lost', value?: number): Promise<{ success: boolean; message: string }> {
        const stage = outcome === 'won' ? 'Closed Won' : 'Closed Lost'
        const finalValue = outcome === 'won' ? (value || 0) : 0

        return this.updateDeal(dealId, {
            stage,
            value: finalValue,
            probability: outcome === 'won' ? 100 : 0
        })
    }

    // Customer Health Monitoring
    async updateCustomerHealth(customerId: string, healthScore: number): Promise<{ success: boolean; message: string }> {
        // This would update customer health in the database
        return Promise.resolve({ success: true, message: 'Customer health updated successfully' })
    }

    // AI Recommendations
    async getRecommendations(): Promise<{
        highPriorityLeads: Array<{ id: string; name: string; value: number; probability: number; recommendedAction: string }>
        atRiskDeals: Array<{ id: string; name: string; stage: string; recommendedAction: string }>
        nextActions: Array<{ type: string; leadId: string; leadName: string; action: string; priority: string }>
    }> {
        // This would call an AI service for recommendations
        return {
            highPriorityLeads: [
                {
                    id: 'lead_001',
                    name: 'Ahmed Hassan',
                    value: 50000,
                    probability: 75,
                    recommendedAction: 'Schedule follow-up call'
                }
            ],
            atRiskDeals: [
                {
                    id: 'deal_002',
                    name: 'Fashion Retail Social Media',
                    stage: 'Discovery',
                    recommendedAction: 'Re-engage with new proposal'
                }
            ],
            nextActions: [
                {
                    type: 'follow_up',
                    leadId: 'lead_002',
                    leadName: 'Sara Mahmoud',
                    action: 'Schedule discovery call',
                    priority: 'high'
                }
            ]
        }
    }

    // Export and Reporting
    async exportData(type: 'leads' | 'deals' | 'activities', format: 'csv' | 'json'): Promise<Blob> {
        const response = await fetch(`${this.baseUrl}/${type}?export=true&format=${format}`)
        return response.blob()
    }

    async generateReport(reportType: string, filters: any): Promise<{ success: boolean; data: any; message: string }> {
        const response = await fetch(`${this.baseUrl}/reports`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportType, filters })
        })
        return response.json()
    }
}

// Export singleton instance
export const crmService = new CRMService() 