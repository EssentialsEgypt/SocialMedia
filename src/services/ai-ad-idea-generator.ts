// AI-Powered Ad Idea Generator Service
// Comprehensive service for generating dynamic, context-aware ad concepts

export interface ProductContext {
    id: string
    name: string
    views24h: number
    conversions24h: number
    abandonedCheckouts: number
    lowStock: boolean
    stockLevel: number
    price: number
    category: string
    tags: string[]
    audienceType: 'cold' | 'warm' | 'vip'
    platform: string
}

// ViralContent-AdIdeaEnhancer: New interfaces for viral content analysis
export interface ViralContentData {
    id: string
    type: 'post' | 'reel' | 'story' | 'carousel'
    caption: string
    hashtags: string[]
    likes: number
    comments: number
    shares: number
    saves: number
    views?: number
    reach: number
    engagementRate: number
    topComments: string[]
    ctaClicks?: number
    postedAt: Date
    visualStyle: string
    emotionalTone: string
    viralPhrases: string[]
    audienceReaction: string
}

export interface ViralAdIdea {
    id: string
    sourceContentId: string
    viralElement: string
    adHook: string
    adCopy: string
    cta: string
    psychologicalAngle: PsychologicalAngle
    visualStyle: string
    suggestedFormat: string
    targeting: string
    confidence: number
    performancePrediction: string
    emotionalLanguage: string
    remixStrategy: string
}

export interface ViralContentAnalysis {
    topPerformingContent: ViralContentData[]
    viralPatterns: {
        emotionalTriggers: string[]
        visualStyles: string[]
        successfulPhrases: string[]
        audienceSegments: string[]
    }
    recommendations: string[]
}

export interface AdBlueprint {
    id: string
    platform: 'Instagram Reels' | 'TikTok' | 'Meta Image Ad' | 'Facebook Carousel' | 'Google Shopping' | 'WhatsApp Broadcast' | 'YouTube Shorts'
    audience: string
    hook: string
    copy: string
    cta: string
    emotion: string
    visualSuggestion: string
    hashtags: string[]
    psychologicalAngle: PsychologicalAngle
    segment: 'cold' | 'warm' | 'vip'
    predictedPerformance: string
    variants: AdVariant[]
    createdAt: Date
}

export interface AdVariant {
    id: string
    hook: string
    cta: string
    visualAngle: string
    emotionalDriver: string
    prediction: string
    confidence: number
}

export type PsychologicalAngle =
    | 'FOMO'
    | 'Curiosity'
    | 'Social Proof'
    | 'Problem/Solution'
    | 'Aspirational'
    | 'Reward/VIP'
    | 'Emotional'

export interface VisualCue {
    backgroundStyle: string
    productShotAngle: string
    modelExpression: string
    layoutIdea: string
    textOverlayPlacement: string
    colorScheme: string
}

export interface CampaignReaction {
    id: string
    productId: string
    adConcepts: AdBlueprint[]
    bestAngle: PsychologicalAngle
    vipListSync: boolean
    timingOptimized: boolean
    contentCalendarSync: boolean
    aiInsights: string
}

export interface AITimingInsights {
    peakHours: string[]
    bestDays: string[]
    audienceBehavior: string
    recommendedTiming: string
}

export class AIAdIdeaGeneratorService {
    private baseUrl = '/api/ai-ad-idea-generator'

    // 1. Real-Time Ad Context Engine
    async generateContextAwareAd(productContext: ProductContext): Promise<AdBlueprint> {
        const response = await fetch(`${this.baseUrl}/generate-context-ad`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productContext)
        })
        return response.json()
    }

    // 2. Full Ad Blueprint Output
    async generateAdBlueprint(
        product: ProductContext,
        platform: string,
        audienceType: string
    ): Promise<AdBlueprint> {
        const response = await fetch(`${this.baseUrl}/generate-blueprint`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, platform, audienceType })
        })
        return response.json()
    }

    // 3. Segment-Aware Copy Logic
    async generateSegmentSpecificCopy(
        product: ProductContext,
        segment: 'cold' | 'warm' | 'vip'
    ): Promise<{ hook: string; copy: string; cta: string }> {
        const response = await fetch(`${this.baseUrl}/segment-copy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, segment })
        })
        return response.json()
    }

    // 4. Platform-Specific Output Generator
    async generatePlatformSpecificAd(
        product: ProductContext,
        platform: string,
        segment: string
    ): Promise<AdBlueprint> {
        const response = await fetch(`${this.baseUrl}/platform-specific`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, platform, segment })
        })
        return response.json()
    }

    // 5. Visual Cue Builder (AI Concepting)
    async generateVisualCues(
        product: ProductContext,
        platform: string,
        angle: PsychologicalAngle
    ): Promise<VisualCue> {
        const response = await fetch(`${this.baseUrl}/visual-cues`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, platform, angle })
        })
        return response.json()
    }

    // 6. Ad Angle Library
    async getOptimalAngle(
        product: ProductContext,
        audienceType: string,
        platform: string
    ): Promise<PsychologicalAngle> {
        const response = await fetch(`${this.baseUrl}/optimal-angle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, audienceType, platform })
        })
        return response.json()
    }

    // 7. A/B Testing Generator
    async generateABTestVariants(
        baseAd: AdBlueprint,
        count: number = 5
    ): Promise<AdVariant[]> {
        const response = await fetch(`${this.baseUrl}/ab-test-variants`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ baseAd, count })
        })
        return response.json()
    }

    // 8. Drop-Aware Campaign Generator
    async generateDropCampaign(productId: string): Promise<CampaignReaction> {
        const response = await fetch(`${this.baseUrl}/drop-campaign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        })
        return response.json()
    }

    // Additional AI Features
    async getTimingInsights(audienceType: string): Promise<AITimingInsights> {
        const response = await fetch(`${this.baseUrl}/timing-insights`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audienceType })
        })
        return response.json()
    }

    async optimizeAdPerformance(adId: string, performanceData: any): Promise<AdBlueprint> {
        const response = await fetch(`${this.baseUrl}/optimize-performance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adId, performanceData })
        })
        return response.json()
    }

    async generateVoiceHook(product: ProductContext, platform: string): Promise<string> {
        const response = await fetch(`${this.baseUrl}/voice-hook`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, platform })
        })
        return response.json()
    }

    // Batch Operations
    async generateMultiPlatformCampaign(
        product: ProductContext,
        platforms: string[]
    ): Promise<AdBlueprint[]> {
        const response = await fetch(`${this.baseUrl}/multi-platform`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product, platforms })
        })
        return response.json()
    }

    async analyzeCompetitorAds(competitorUrls: string[]): Promise<any> {
        const response = await fetch(`${this.baseUrl}/analyze-competitors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ competitorUrls })
        })
        return response.json()
    }

    // ViralContent-AdIdeaEnhancer: Viral content analysis and ad generation
    async getViralContentAnalysis(timeframe: string = '30d'): Promise<ViralContentAnalysis> {
        const response = await fetch(`${this.baseUrl}/viral-content-analysis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timeframe })
        })
        return response.json()
    }

    async generateViralBasedAdIdea(
        viralContent: ViralContentData,
        targetProduct: ProductContext
    ): Promise<ViralAdIdea> {
        const response = await fetch(`${this.baseUrl}/viral-based-ad-idea`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ viralContent, targetProduct })
        })
        return response.json()
    }

    async generateViralAdCampaign(
        viralContentList: ViralContentData[],
        product: ProductContext,
        campaignType: 'retargeting' | 'cold' | 'drop' = 'retargeting'
    ): Promise<ViralAdIdea[]> {
        const response = await fetch(`${this.baseUrl}/viral-ad-campaign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ viralContentList, product, campaignType })
        })
        return response.json()
    }

    async analyzeViralPatterns(contentList: ViralContentData[]): Promise<{
        emotionalTriggers: string[]
        visualStyles: string[]
        successfulPhrases: string[]
        audienceSegments: string[]
        viralFormulas: string[]
    }> {
        const response = await fetch(`${this.baseUrl}/analyze-viral-patterns`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contentList })
        })
        return response.json()
    }

    async remixViralContent(
        originalContent: ViralContentData,
        newProduct: ProductContext,
        remixType: 'hook' | 'visual' | 'tone' | 'format'
    ): Promise<ViralAdIdea> {
        const response = await fetch(`${this.baseUrl}/remix-viral-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ originalContent, newProduct, remixType })
        })
        return response.json()
    }

    async getTopPerformingContent(
        contentType: 'post' | 'reel' | 'story' | 'carousel' | 'all' = 'all',
        limit: number = 10
    ): Promise<ViralContentData[]> {
        const response = await fetch(`${this.baseUrl}/top-performing-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contentType, limit })
        })
        return response.json()
    }
}

// Export singleton instance
export const aiAdIdeaGeneratorService = new AIAdIdeaGeneratorService() 