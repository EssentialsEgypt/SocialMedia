import { NextApiRequest, NextApiResponse } from 'next'

// AI Auto Message Enhancement - AI Message Generation API
// Handles adaptive message creation with tone adaptation and smart channel selection

interface GenerateMessageRequest {
    customerId: string
    segment: string
    triggerType: string
    productInfo?: any
    previousMessages?: any[]
    language?: 'en' | 'ar'
}

interface GenerateMessageResponse {
    message: string
    tone: string
    channel: 'whatsapp' | 'email' | 'instagram_dm'
    urgency: 'low' | 'medium' | 'high'
}

// AI Auto Message Enhancement - Tone adaptation based on segments
const toneAdaptation = {
    gen_z: {
        tone: 'casual',
        emojis: true,
        slang: true,
        urgency: 'medium'
    },
    millennial: {
        tone: 'friendly',
        emojis: true,
        slang: false,
        urgency: 'medium'
    },
    gen_x: {
        tone: 'professional',
        emojis: false,
        slang: false,
        urgency: 'low'
    },
    vip: {
        tone: 'loyalty',
        emojis: false,
        slang: false,
        urgency: 'high'
    },
    abandoned_cart: {
        tone: 'friendly',
        emojis: true,
        slang: false,
        urgency: 'high'
    }
}

// AI Auto Message Enhancement - Message templates by trigger type
const messageTemplates = {
    product_view: {
        gen_z: [
            "Yo! 🔥 {product_name} is calling your name!",
            "Don't sleep on this drop 💯",
            "This is the vibe you've been looking for ✨"
        ],
        millennial: [
            "Hey! We noticed you're interested in {product_name} 😊",
            "This {product_name} would look amazing on you!",
            "Don't miss out on this one 👀"
        ],
        gen_x: [
            "We noticed your interest in {product_name}",
            "This item is currently in stock",
            "Would you like to complete your purchase?"
        ],
        vip: [
            "Exclusive VIP access: {product_name}",
            "As a valued customer, enjoy early access to {product_name}",
            "Special VIP pricing just for you on {product_name}"
        ]
    },
    cart_abandon: {
        abandoned_cart: [
            "Your cart is waiting for you! 🛒",
            "Don't let these items get away!",
            "Complete your purchase and save! 💰"
        ]
    },
    checkout_fail: {
        abandoned_cart: [
            "Having trouble? We're here to help! 🤝",
            "Let us assist with your checkout",
            "Need help? Our team is ready! 📞"
        ]
    }
}

// AI Auto Message Enhancement - Smart channel selection logic
const channelSelection = {
    gen_z: 'whatsapp',
    millennial: 'whatsapp',
    gen_x: 'email',
    vip: 'email',
    abandoned_cart: 'whatsapp'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { customerId, segment, triggerType, productInfo, previousMessages, language = 'en' }: GenerateMessageRequest = req.body

        // AI Auto Message Enhancement - Validate request
        if (!customerId || !segment || !triggerType) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        // AI Auto Message Enhancement - Get tone adaptation for segment
        const toneConfig = toneAdaptation[segment as keyof typeof toneAdaptation] || toneAdaptation.millennial

        // AI Auto Message Enhancement - Get message templates for trigger type and segment
        const templates = (messageTemplates[triggerType as keyof typeof messageTemplates] as any)?.[segment as keyof typeof messageTemplates.product_view] ||
            messageTemplates.product_view.millennial

        // AI Auto Message Enhancement - Select random template and customize
        const template = templates[Math.floor(Math.random() * templates.length)]

        // AI Auto Message Enhancement - Customize message with product info
        let message = template
        if (productInfo?.name) {
            message = message.replace('{product_name}', productInfo.name)
        }

        // AI Auto Message Enhancement - Add urgency based on tone config
        if (toneConfig.urgency === 'high') {
            message += " Limited time offer! ⏰"
        }

        // AI Auto Message Enhancement - Add emojis based on tone config
        if (!toneConfig.emojis) {
            message = message.replace(/[🔥💯✨😊👀🛒💰🤝📞⏰]/g, '')
        }

        // AI Auto Message Enhancement - Smart channel selection
        const channel = (channelSelection[segment as keyof typeof channelSelection] as 'whatsapp' | 'email' | 'instagram_dm') || 'whatsapp'

        // AI Auto Message Enhancement - Multi-language support
        if (language === 'ar') {
            // Simple Arabic translation for demonstration
            message = message.replace('Hey!', 'مرحباً!')
            message = message.replace('We noticed', 'لاحظنا')
            message = message.replace('Don\'t miss out', 'لا تفوت')
        }

        const response: GenerateMessageResponse = {
            message: message.trim(),
            tone: toneConfig.tone,
            channel,
            urgency: toneConfig.urgency as 'low' | 'medium' | 'high'
        }

        // AI Auto Message Enhancement - Log generation for analytics
        console.log('AI Message Generated:', {
            customerId,
            segment,
            triggerType,
            message: response.message,
            tone: response.tone,
            channel: response.channel,
            timestamp: new Date().toISOString()
        })

        return res.status(200).json(response)
    } catch (error) {
        console.error('Error generating AI message:', error)
        return res.status(500).json({ error: 'Failed to generate AI message' })
    }
} 