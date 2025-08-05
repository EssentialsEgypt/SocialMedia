// Meta Ads API Integration Service
// Essentials Enhanced OS - Facebook & Instagram Advertising

export interface MetaCampaign {
    id: string
    name: string
    objective: string
    status: string
    special_ad_categories: string[]
    daily_budget: number
    lifetime_budget: number
    budget_remaining: number
    created_time: string
    updated_time: string
    start_time: string
    stop_time?: string
    insights?: MetaInsights
}

export interface MetaAdSet {
    id: string
    name: string
    campaign_id: string
    status: string
    daily_budget: number
    lifetime_budget: number
    budget_remaining: number
    billing_event: string
    optimization_goal: string
    targeting: MetaTargeting
    created_time: string
    updated_time: string
    start_time: string
    stop_time?: string
    insights?: MetaInsights
}

export interface MetaAd {
    id: string
    name: string
    adset_id: string
    campaign_id: string
    status: string
    creative: MetaCreative
    created_time: string
    updated_time: string
    insights?: MetaInsights
}

export interface MetaCreative {
    id: string
    name: string
    title: string
    body: string
    image_url?: string
    video_id?: string
    call_to_action_type?: string
    object_story_spec?: any
}

export interface MetaTargeting {
    age_min: number
    age_max: number
    genders: number[]
    geo_locations: MetaGeoLocation[]
    interests?: MetaInterest[]
    behaviors?: MetaBehavior[]
    custom_audiences?: MetaCustomAudience[]
    exclusions?: MetaExclusion[]
}

export interface MetaGeoLocation {
    countries?: string[]
    regions?: MetaRegion[]
    cities?: MetaCity[]
    location_types?: string[]
}

export interface MetaRegion {
    key: string
    name: string
}

export interface MetaCity {
    key: string
    name: string
    region_id: string
    country: string
}

export interface MetaInterest {
    id: string
    name: string
    audience_size: number
}

export interface MetaBehavior {
    id: string
    name: string
    audience_size: number
}

export interface MetaCustomAudience {
    id: string
    name: string
    subtype: string
}

export interface MetaExclusion {
    interests?: MetaInterest[]
    behaviors?: MetaBehavior[]
    custom_audiences?: MetaCustomAudience[]
}

export interface MetaInsights {
    impressions: number
    reach: number
    clicks: number
    spend: number
    cpm: number
    cpc: number
    ctr: number
    frequency: number
    unique_clicks: number
    unique_link_clicks: number
    social_impressions: number
    social_reach: number
    social_spend: number
    video_views: number
    video_view_rate: number
    video_p25_watched_actions: number
    video_p50_watched_actions: number
    video_p75_watched_actions: number
    video_p100_watched_actions: number
    actions?: MetaAction[]
    action_values?: MetaActionValue[]
}

export interface MetaAction {
    action_type: string
    value: string
}

export interface MetaActionValue {
    action_type: string
    value: string
}

export interface MetaAccount {
    id: string
    name: string
    account_status: number
    currency: string
    timezone_name: string
    business_name: string
    business_id: string
    created_time: string
    updated_time: string
}

export class MetaAdsService {
    private accessToken: string
    private apiVersion: string = 'v19.0'
    private baseUrl: string = 'https://graph.facebook.com'

    constructor() {
        this.accessToken = process.env.FACEBOOK_ACCESS_TOKEN || ''
    }

    private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
        const url = new URL(`${this.baseUrl}/${this.apiVersion}/${endpoint}`)

        // Add access token to all requests
        url.searchParams.append('access_token', this.accessToken)

        // Add other parameters
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value.toString())
            }
        })

        const response = await fetch(url.toString())

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Meta API error: ${response.status} - ${errorData.error?.message || response.statusText}`)
        }

        return response.json()
    }

    // Account Management
    async getAccounts(): Promise<{ data: MetaAccount[] }> {
        return this.makeRequest('me/adaccounts')
    }

    async getAccount(accountId: string): Promise<MetaAccount> {
        return this.makeRequest(accountId)
    }

    // Campaign Management
    async getCampaigns(accountId: string, fields: string[] = ['id', 'name', 'objective', 'status', 'daily_budget', 'lifetime_budget', 'created_time']): Promise<{ data: MetaCampaign[] }> {
        return this.makeRequest(`${accountId}/campaigns`, {
            fields: fields.join(',')
        })
    }

    async getCampaign(campaignId: string, fields: string[] = ['id', 'name', 'objective', 'status', 'daily_budget', 'lifetime_budget', 'created_time', 'insights']): Promise<MetaCampaign> {
        return this.makeRequest(campaignId, {
            fields: fields.join(',')
        })
    }

    async createCampaign(accountId: string, campaignData: Partial<MetaCampaign>): Promise<MetaCampaign> {
        return this.makeRequest(`${accountId}/campaigns`, {
            method: 'POST',
            ...campaignData
        })
    }

    async updateCampaign(campaignId: string, updates: Partial<MetaCampaign>): Promise<MetaCampaign> {
        return this.makeRequest(campaignId, {
            method: 'POST',
            ...updates
        })
    }

    // Ad Set Management
    async getAdSets(campaignId: string, fields: string[] = ['id', 'name', 'status', 'daily_budget', 'lifetime_budget', 'targeting', 'created_time']): Promise<{ data: MetaAdSet[] }> {
        return this.makeRequest(`${campaignId}/adsets`, {
            fields: fields.join(',')
        })
    }

    async getAdSet(adSetId: string, fields: string[] = ['id', 'name', 'status', 'daily_budget', 'lifetime_budget', 'targeting', 'created_time', 'insights']): Promise<MetaAdSet> {
        return this.makeRequest(adSetId, {
            fields: fields.join(',')
        })
    }

    async createAdSet(campaignId: string, adSetData: Partial<MetaAdSet>): Promise<MetaAdSet> {
        return this.makeRequest(`${campaignId}/adsets`, {
            method: 'POST',
            ...adSetData
        })
    }

    async updateAdSet(adSetId: string, updates: Partial<MetaAdSet>): Promise<MetaAdSet> {
        return this.makeRequest(adSetId, {
            method: 'POST',
            ...updates
        })
    }

    // Ad Management
    async getAds(adSetId: string, fields: string[] = ['id', 'name', 'status', 'creative', 'created_time']): Promise<{ data: MetaAd[] }> {
        return this.makeRequest(`${adSetId}/ads`, {
            fields: fields.join(',')
        })
    }

    async getAd(adId: string, fields: string[] = ['id', 'name', 'status', 'creative', 'created_time', 'insights']): Promise<MetaAd> {
        return this.makeRequest(adId, {
            fields: fields.join(',')
        })
    }

    async createAd(adSetId: string, adData: Partial<MetaAd>): Promise<MetaAd> {
        return this.makeRequest(`${adSetId}/ads`, {
            method: 'POST',
            ...adData
        })
    }

    async updateAd(adId: string, updates: Partial<MetaAd>): Promise<MetaAd> {
        return this.makeRequest(adId, {
            method: 'POST',
            ...updates
        })
    }

    // Creative Management
    async getCreatives(accountId: string, fields: string[] = ['id', 'name', 'title', 'body', 'image_url', 'video_id']): Promise<{ data: MetaCreative[] }> {
        return this.makeRequest(`${accountId}/adcreatives`, {
            fields: fields.join(',')
        })
    }

    async createCreative(accountId: string, creativeData: Partial<MetaCreative>): Promise<MetaCreative> {
        return this.makeRequest(`${accountId}/adcreatives`, {
            method: 'POST',
            ...creativeData
        })
    }

    // Insights & Analytics
    async getCampaignInsights(campaignId: string, dateRange: { since: string; until: string }, fields: string[] = ['impressions', 'reach', 'clicks', 'spend', 'cpm', 'cpc', 'ctr']): Promise<{ data: MetaInsights[] }> {
        return this.makeRequest(`${campaignId}/insights`, {
            fields: fields.join(','),
            time_range: JSON.stringify(dateRange)
        })
    }

    async getAdSetInsights(adSetId: string, dateRange: { since: string; until: string }, fields: string[] = ['impressions', 'reach', 'clicks', 'spend', 'cpm', 'cpc', 'ctr']): Promise<{ data: MetaInsights[] }> {
        return this.makeRequest(`${adSetId}/insights`, {
            fields: fields.join(','),
            time_range: JSON.stringify(dateRange)
        })
    }

    async getAdInsights(adId: string, dateRange: { since: string; until: string }, fields: string[] = ['impressions', 'reach', 'clicks', 'spend', 'cpm', 'cpc', 'ctr']): Promise<{ data: MetaInsights[] }> {
        return this.makeRequest(`${adId}/insights`, {
            fields: fields.join(','),
            time_range: JSON.stringify(dateRange)
        })
    }

    // Targeting & Audiences
    async getInterests(query: string): Promise<{ data: MetaInterest[] }> {
        return this.makeRequest('search', {
            type: 'adinterest',
            q: query
        })
    }

    async getBehaviors(query: string): Promise<{ data: MetaBehavior[] }> {
        return this.makeRequest('search', {
            type: 'adbehavior',
            q: query
        })
    }

    async getCustomAudiences(accountId: string): Promise<{ data: MetaCustomAudience[] }> {
        return this.makeRequest(`${accountId}/customaudiences`)
    }

    // AI-Enhanced Methods
    async getTopPerformingAds(accountId: string, days: number = 30): Promise<MetaAd[]> {
        const endDate = new Date()
        const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000))

        const { data: campaigns } = await this.getCampaigns(accountId)
        const allAds: MetaAd[] = []

        for (const campaign of campaigns) {
            const { data: adSets } = await this.getAdSets(campaign.id)

            for (const adSet of adSets) {
                const { data: ads } = await this.getAds(adSet.id)
                allAds.push(...ads)
            }
        }

        // Get insights for all ads
        const adsWithInsights = await Promise.all(
            allAds.map(async (ad) => {
                try {
                    const { data: insights } = await this.getAdInsights(ad.id, {
                        since: startDate.toISOString().split('T')[0],
                        until: endDate.toISOString().split('T')[0]
                    })

                    return {
                        ...ad,
                        insights: insights[0] || undefined
                    }
                } catch (error) {
                    console.error(`Failed to get insights for ad ${ad.id}:`, error)
                    return { ...ad, insights: undefined }
                }
            })
        )

        // Sort by performance (CTR * reach)
        return adsWithInsights
            .filter(ad => ad.insights)
            .sort((a, b) => {
                const aScore = (a.insights?.ctr || 0) * (a.insights?.reach || 0)
                const bScore = (b.insights?.ctr || 0) * (b.insights?.reach || 0)
                return bScore - aScore
            })
            .slice(0, 10)
    }

    async getLowPerformingCampaigns(accountId: string, threshold: number = 1.0): Promise<MetaCampaign[]> {
        const { data: campaigns } = await this.getCampaigns(accountId)
        const campaignsWithInsights = await Promise.all(
            campaigns.map(async (campaign) => {
                try {
                    const { data: insights } = await this.getCampaignInsights(campaign.id, {
                        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        until: new Date().toISOString().split('T')[0]
                    })

                    return {
                        ...campaign,
                        insights: insights[0] || undefined
                    }
                } catch (error) {
                    console.error(`Failed to get insights for campaign ${campaign.id}:`, error)
                    return { ...campaign, insights: undefined }
                }
            })
        )

        return campaignsWithInsights
            .filter(campaign => campaign.insights && campaign.insights.ctr < threshold)
            .sort((a, b) => (a.insights?.ctr || 0) - (b.insights?.ctr || 0))
    }

    async getBudgetRecommendations(accountId: string): Promise<{
        underSpending: MetaCampaign[]
        overSpending: MetaCampaign[]
        recommendations: string[]
    }> {
        const { data: campaigns } = await this.getCampaigns(accountId)
        const campaignsWithInsights = await Promise.all(
            campaigns.map(async (campaign) => {
                try {
                    const { data: insights } = await this.getCampaignInsights(campaign.id, {
                        since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        until: new Date().toISOString().split('T')[0]
                    })

                    return {
                        ...campaign,
                        insights: insights[0] || undefined
                    }
                } catch (error) {
                    return { ...campaign, insights: undefined }
                }
            })
        )

        const underSpending = campaignsWithInsights.filter(
            campaign => campaign.insights && campaign.insights.spend < (campaign.daily_budget * 0.5)
        )

        const overSpending = campaignsWithInsights.filter(
            campaign => campaign.insights && campaign.insights.spend > (campaign.daily_budget * 1.2)
        )

        const recommendations = []

        if (underSpending.length > 0) {
            recommendations.push(`Consider increasing budget for ${underSpending.length} under-spending campaigns`)
        }

        if (overSpending.length > 0) {
            recommendations.push(`Review budget allocation for ${overSpending.length} over-spending campaigns`)
        }

        return { underSpending, overSpending, recommendations }
    }

    async getAudienceInsights(accountId: string): Promise<{
        topInterests: MetaInterest[]
        topBehaviors: MetaBehavior[]
        recommendations: string[]
    }> {
        const { data: campaigns } = await this.getCampaigns(accountId)
        const allAdSets: MetaAdSet[] = []

        for (const campaign of campaigns) {
            const { data: adSets } = await this.getAdSets(campaign.id)
            allAdSets.push(...adSets)
        }

        const interestCounts: { [key: string]: number } = {}
        const behaviorCounts: { [key: string]: number } = {}

        allAdSets.forEach(adSet => {
            adSet.targeting.interests?.forEach(interest => {
                interestCounts[interest.name] = (interestCounts[interest.name] || 0) + 1
            })

            adSet.targeting.behaviors?.forEach(behavior => {
                behaviorCounts[behavior.name] = (behaviorCounts[behavior.name] || 0) + 1
            })
        })

        const topInterests = Object.entries(interestCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, audience_size: count } as MetaInterest))

        const topBehaviors = Object.entries(behaviorCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ name, audience_size: count } as MetaBehavior))

        const recommendations = []
        if (topInterests.length > 0) {
            recommendations.push(`Most used interest: ${topInterests[0].name}`)
        }
        if (topBehaviors.length > 0) {
            recommendations.push(`Most used behavior: ${topBehaviors[0].name}`)
        }

        return { topInterests, topBehaviors, recommendations }
    }
}

export const metaAdsService = new MetaAdsService() 