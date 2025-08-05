// AI Auto Messages Service
// Handles AI-powered messaging engine with behavior triggers, tone adaptation, and smart channel selection

export interface BehaviorTrigger {
    id: string
    userId: string
    triggerType: 'shopify' | 'ga4' | 'meta_pixel' | 'instagram' | 'whatsapp'
    triggerCondition: {
        event: string
        threshold: number
        timeWindow: number // in minutes
        segment?: string
    }
    actions: AutoMessageAction[]
    isActive: boolean
    lastTriggered?: Date
    triggerCount: number
    createdAt: Date
    updatedAt: Date
}

export interface AutoMessageAction {
    id: string
    triggerId: string
    actionType: 'message' | 'sequence' | 'voice_message'
    channel: 'whatsapp' | 'email' | 'instagram_dm'
    content: string
    aiGenerated: boolean
    tone?: 'casual' | 'professional' | 'urgent' | 'friendly' | 'loyalty'
    segment?: string
    delay?: number // in minutes
    sequence?: MessageSequence
    isActive: boolean
}

export interface MessageSequence {
    id: string
    name: string
    steps: SequenceStep[]
    totalSteps: number
    currentStep: number
    isActive: boolean
}

export interface SequenceStep {
    id: string
    sequenceId: string
    stepNumber: number
    delay: number // in minutes
    message: string
    channel: 'whatsapp' | 'email' | 'instagram_dm'
    condition?: string // optional condition to skip step
    isActive: boolean
}

export interface CustomerSegment {
    id: string
    userId: string
    segmentName: string
    criteria: {
        purchaseHistory?: number
        lastPurchase?: number // days ago
        engagementLevel?: 'high' | 'medium' | 'low'
        preferredChannel?: 'whatsapp' | 'email' | 'instagram'
        ageGroup?: 'gen_z' | 'millennial' | 'gen_x' | 'boomer'
        location?: string
    }
    tone: 'casual' | 'professional' | 'urgent' | 'friendly' | 'loyalty'
    messageTemplates: string[]
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

export interface AIVoiceMessage {
    id: string
    actionId: string
    customerId: string
    message: string
    voiceUrl?: string
    duration: number // in seconds
    language: 'en' | 'ar'
    tone: string
    isGenerated: boolean
    createdAt: Date
}

export interface CampaignReaction {
    id: string
    userId: string
    campaignId: string
    reactionType: 'high_ctr_no_sales' | 'low_engagement' | 'high_cpr' | 'budget_alert'
    triggerCondition: any
    actions: AutoMessageAction[]
    isActive: boolean
    lastTriggered?: Date
    createdAt: Date
    updatedAt: Date
}

export interface MessageAnalytics {
    id: string
    actionId: string
    customerId: string
    channel: 'whatsapp' | 'email' | 'instagram_dm'
    sentAt: Date
    deliveredAt?: Date
    openedAt?: Date
    clickedAt?: Date
    repliedAt?: Date
    conversionValue?: number
    responseTime?: number // in minutes
    tone: string
    segment: string
}

class AIAutoMessagesService {
    private baseUrl = '/api/ai-auto-messages'

    // Behavior Trigger Management
    async createBehaviorTrigger(triggerData: Partial<BehaviorTrigger>): Promise<BehaviorTrigger> {
        try {
            const response = await fetch(`${this.baseUrl}/triggers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(triggerData)
            })

            if (!response.ok) throw new Error('Failed to create behavior trigger')
            return await response.json()
        } catch (error) {
            console.error('Error creating behavior trigger:', error)
            throw error
        }
    }

    async getBehaviorTriggers(userId: string): Promise<BehaviorTrigger[]> {
        try {
            const response = await fetch(`${this.baseUrl}/triggers?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch behavior triggers')
            return await response.json()
        } catch (error) {
            console.error('Error fetching behavior triggers:', error)
            throw error
        }
    }

    async updateBehaviorTrigger(triggerId: string, updates: Partial<BehaviorTrigger>): Promise<BehaviorTrigger> {
        try {
            const response = await fetch(`${this.baseUrl}/triggers/${triggerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })

            if (!response.ok) throw new Error('Failed to update behavior trigger')
            return await response.json()
        } catch (error) {
            console.error('Error updating behavior trigger:', error)
            throw error
        }
    }

    // AI Tone Adaptation
    async generateAdaptiveMessage(data: {
        customerId: string
        segment: string
        triggerType: string
        productInfo?: any
        previousMessages?: any[]
        language?: 'en' | 'ar'
    }): Promise<{
        message: string
        tone: string
        channel: 'whatsapp' | 'email' | 'instagram_dm'
        urgency: 'low' | 'medium' | 'high'
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/generate-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error('Failed to generate adaptive message')
            return await response.json()
        } catch (error) {
            console.error('Error generating adaptive message:', error)
            throw error
        }
    }

    // Smart Channel Selection
    async selectOptimalChannel(data: {
        customerId: string
        messageType: string
        previousEngagement?: any[]
        preferredChannels?: string[]
    }): Promise<{
        channel: 'whatsapp' | 'email' | 'instagram_dm'
        reason: string
        successProbability: number
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/select-channel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error('Failed to select optimal channel')
            return await response.json()
        } catch (error) {
            console.error('Error selecting optimal channel:', error)
            throw error
        }
    }

    // Message Sequences
    async createMessageSequence(sequenceData: Partial<MessageSequence>): Promise<MessageSequence> {
        try {
            const response = await fetch(`${this.baseUrl}/sequences`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sequenceData)
            })

            if (!response.ok) throw new Error('Failed to create message sequence')
            return await response.json()
        } catch (error) {
            console.error('Error creating message sequence:', error)
            throw error
        }
    }

    async getMessageSequences(userId: string): Promise<MessageSequence[]> {
        try {
            const response = await fetch(`${this.baseUrl}/sequences?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch message sequences')
            return await response.json()
        } catch (error) {
            console.error('Error fetching message sequences:', error)
            throw error
        }
    }

    // AI Voice Messages
    async generateVoiceMessage(data: {
        customerId: string
        message: string
        language: 'en' | 'ar'
        tone: string
        duration?: number
    }): Promise<AIVoiceMessage> {
        try {
            const response = await fetch(`${this.baseUrl}/voice-messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error('Failed to generate voice message')
            return await response.json()
        } catch (error) {
            console.error('Error generating voice message:', error)
            throw error
        }
    }

    // Campaign Reactions
    async createCampaignReaction(reactionData: Partial<CampaignReaction>): Promise<CampaignReaction> {
        try {
            const response = await fetch(`${this.baseUrl}/campaign-reactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reactionData)
            })

            if (!response.ok) throw new Error('Failed to create campaign reaction')
            return await response.json()
        } catch (error) {
            console.error('Error creating campaign reaction:', error)
            throw error
        }
    }

    async getCampaignReactions(userId: string): Promise<CampaignReaction[]> {
        try {
            const response = await fetch(`${this.baseUrl}/campaign-reactions?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch campaign reactions')
            return await response.json()
        } catch (error) {
            console.error('Error fetching campaign reactions:', error)
            throw error
        }
    }

    // Customer Segments
    async createCustomerSegment(segmentData: Partial<CustomerSegment>): Promise<CustomerSegment> {
        try {
            const response = await fetch(`${this.baseUrl}/segments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(segmentData)
            })

            if (!response.ok) throw new Error('Failed to create customer segment')
            return await response.json()
        } catch (error) {
            console.error('Error creating customer segment:', error)
            throw error
        }
    }

    async getCustomerSegments(userId: string): Promise<CustomerSegment[]> {
        try {
            const response = await fetch(`${this.baseUrl}/segments?userId=${userId}`)
            if (!response.ok) throw new Error('Failed to fetch customer segments')
            return await response.json()
        } catch (error) {
            console.error('Error fetching customer segments:', error)
            throw error
        }
    }

    // Message Analytics
    async getMessageAnalytics(userId: string, filters?: {
        dateRange?: { start: Date; end: Date }
        channel?: string
        segment?: string
        tone?: string
    }): Promise<MessageAnalytics[]> {
        try {
            const params = new URLSearchParams()
            if (filters?.dateRange) {
                params.append('startDate', filters.dateRange.start.toISOString())
                params.append('endDate', filters.dateRange.end.toISOString())
            }
            if (filters?.channel) params.append('channel', filters.channel)
            if (filters?.segment) params.append('segment', filters.segment)
            if (filters?.tone) params.append('tone', filters.tone)

            const response = await fetch(`${this.baseUrl}/analytics?userId=${userId}&${params}`)
            if (!response.ok) throw new Error('Failed to fetch message analytics')
            return await response.json()
        } catch (error) {
            console.error('Error fetching message analytics:', error)
            throw error
        }
    }

    // Real-time Behavior Monitoring
    async monitorBehavior(data: {
        customerId: string
        event: string
        metadata: any
        timestamp: Date
    }): Promise<{
        triggers: BehaviorTrigger[]
        actions: AutoMessageAction[]
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/monitor-behavior`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error('Failed to monitor behavior')
            return await response.json()
        } catch (error) {
            console.error('Error monitoring behavior:', error)
            throw error
        }
    }

    // AI-Powered Message Optimization
    async optimizeMessage(data: {
        messageId: string
        performanceData: any
        customerFeedback?: any
    }): Promise<{
        optimizedMessage: string
        suggestedChanges: string[]
        predictedPerformance: any
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/optimize-message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error('Failed to optimize message')
            return await response.json()
        } catch (error) {
            console.error('Error optimizing message:', error)
            throw error
        }
    }

    // Multi-language Support
    async translateMessage(data: {
        message: string
        targetLanguage: 'en' | 'ar'
        preserveTone: boolean
    }): Promise<{
        translatedMessage: string
        tone: string
        confidence: number
    }> {
        try {
            const response = await fetch(`${this.baseUrl}/translate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error('Failed to translate message')
            return await response.json()
        } catch (error) {
            console.error('Error translating message:', error)
            throw error
        }
    }
}

export const aiAutoMessagesService = new AIAutoMessagesService() 