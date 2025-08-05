import { NextApiRequest, NextApiResponse } from 'next'

// AI Auto Message Enhancement - Smart Channel Selection API
// Uses AI to determine optimal communication channel based on customer behavior

interface SelectChannelRequest {
    customerId: string
    messageType: string
    previousEngagement?: any[]
    preferredChannels?: string[]
}

interface SelectChannelResponse {
    channel: 'whatsapp' | 'email' | 'instagram_dm'
    reason: string
    successProbability: number
}

// AI Auto Message Enhancement - Channel selection rules based on behavior
const channelRules = {
    // High engagement users prefer WhatsApp
    high_engagement: {
        primary: 'whatsapp',
        reason: 'High engagement user - WhatsApp has 98% open rate',
        probability: 0.95
    },

    // Low engagement users prefer email
    low_engagement: {
        primary: 'email',
        reason: 'Low engagement user - Email allows for detailed messaging',
        probability: 0.85
    },

    // VIP customers prefer email for formal communication
    vip_customer: {
        primary: 'email',
        reason: 'VIP customer - Email provides professional communication',
        probability: 0.90
    },

    // Abandoned cart users prefer WhatsApp for urgency
    abandoned_cart: {
        primary: 'whatsapp',
        reason: 'Abandoned cart - WhatsApp creates urgency and immediate response',
        probability: 0.88
    },

    // Product view reminders prefer Instagram DM
    product_view: {
        primary: 'instagram_dm',
        reason: 'Product view - Instagram DM is less intrusive for browsing',
        probability: 0.82
    },

    // Checkout failures prefer WhatsApp for immediate support
    checkout_fail: {
        primary: 'whatsapp',
        reason: 'Checkout failure - WhatsApp enables immediate customer support',
        probability: 0.92
    }
}

// AI Auto Message Enhancement - Channel performance data
const channelPerformance = {
    whatsapp: {
        openRate: 0.98,
        responseRate: 0.45,
        conversionRate: 0.12,
        avgResponseTime: 2.5 // minutes
    },
    email: {
        openRate: 0.25,
        responseRate: 0.08,
        conversionRate: 0.03,
        avgResponseTime: 240 // minutes
    },
    instagram_dm: {
        openRate: 0.85,
        responseRate: 0.32,
        conversionRate: 0.08,
        avgResponseTime: 15 // minutes
    }
}

// AI Auto Message Enhancement - Customer behavior analysis
function analyzeCustomerBehavior(previousEngagement: any[] = []) {
    const engagement: {
        whatsappCount: number
        emailCount: number
        instagramCount: number
        totalEngagement: number
        lastEngagement: any
        preferredChannel: 'whatsapp' | 'email' | 'instagram_dm' | null
    } = {
        whatsappCount: 0,
        emailCount: 0,
        instagramCount: 0,
        totalEngagement: 0,
        lastEngagement: null,
        preferredChannel: null
    }

    previousEngagement.forEach(interaction => {
        engagement.totalEngagement++

        switch (interaction.channel) {
            case 'whatsapp':
                engagement.whatsappCount++
                break
            case 'email':
                engagement.emailCount++
                break
            case 'instagram_dm':
                engagement.instagramCount++
                break
        }
    })

    // AI Auto Message Enhancement - Determine preferred channel
    if (engagement.whatsappCount > engagement.emailCount && engagement.whatsappCount > engagement.instagramCount) {
        engagement.preferredChannel = 'whatsapp'
    } else if (engagement.emailCount > engagement.instagramCount) {
        engagement.preferredChannel = 'email'
    } else {
        engagement.preferredChannel = 'instagram_dm'
    }

    return engagement
}

// AI Auto Message Enhancement - Calculate success probability
function calculateSuccessProbability(
    channel: string,
    messageType: string,
    customerBehavior: any,
    channelPerformance: any
) {
    let baseProbability = channelPerformance[channel].conversionRate

    // AI Auto Message Enhancement - Adjust based on customer behavior
    if (customerBehavior.preferredChannel === channel) {
        baseProbability *= 1.3 // 30% boost for preferred channel
    }

    // AI Auto Message Enhancement - Adjust based on message type
    switch (messageType) {
        case 'abandoned_cart':
            if (channel === 'whatsapp') baseProbability *= 1.2
            break
        case 'product_view':
            if (channel === 'instagram_dm') baseProbability *= 1.1
            break
        case 'checkout_fail':
            if (channel === 'whatsapp') baseProbability *= 1.4
            break
    }

    return Math.min(baseProbability, 0.95) // Cap at 95%
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { customerId, messageType, previousEngagement = [], preferredChannels = [] }: SelectChannelRequest = req.body

        // AI Auto Message Enhancement - Validate request
        if (!customerId || !messageType) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        // AI Auto Message Enhancement - Analyze customer behavior
        const customerBehavior = analyzeCustomerBehavior(previousEngagement)

        // AI Auto Message Enhancement - Determine customer segment
        let customerSegment = 'low_engagement'

        if (customerBehavior.totalEngagement > 10) {
            customerSegment = 'high_engagement'
        } else if (customerBehavior.totalEngagement > 5) {
            customerSegment = 'medium_engagement'
        }

        // AI Auto Message Enhancement - Get channel rule for message type
        const rule = channelRules[messageType as keyof typeof channelRules] || channelRules.low_engagement

        // AI Auto Message Enhancement - Consider customer preferences
        let selectedChannel = rule.primary
        let reason = rule.reason
        let successProbability = rule.probability

        // AI Auto Message Enhancement - Override if customer has strong preference
        if (customerBehavior.preferredChannel && customerBehavior.preferredChannel !== selectedChannel) {
            const preferredPerformance = channelPerformance[customerBehavior.preferredChannel as keyof typeof channelPerformance]
            const currentPerformance = channelPerformance[selectedChannel as keyof typeof channelPerformance]

            // AI Auto Message Enhancement - Switch if preferred channel has better performance
            if (preferredPerformance.conversionRate > currentPerformance.conversionRate * 0.8) {
                selectedChannel = customerBehavior.preferredChannel
                reason = `Customer prefers ${selectedChannel} based on engagement history`
                successProbability = calculateSuccessProbability(selectedChannel, messageType, customerBehavior, channelPerformance)
            }
        }

        // AI Auto Message Enhancement - Consider preferred channels from request
        if (preferredChannels.length > 0 && preferredChannels.includes(selectedChannel)) {
            successProbability *= 1.1 // 10% boost for explicitly preferred channel
        }

        const response: SelectChannelResponse = {
            channel: selectedChannel as 'whatsapp' | 'email' | 'instagram_dm',
            reason,
            successProbability
        }

        // AI Auto Message Enhancement - Log channel selection for analytics
        console.log('AI Channel Selection:', {
            customerId,
            messageType,
            selectedChannel: response.channel,
            reason: response.reason,
            successProbability: response.successProbability,
            customerBehavior,
            timestamp: new Date().toISOString()
        })

        return res.status(200).json(response)
    } catch (error) {
        console.error('Error selecting optimal channel:', error)
        return res.status(500).json({ error: 'Failed to select optimal channel' })
    }
} 