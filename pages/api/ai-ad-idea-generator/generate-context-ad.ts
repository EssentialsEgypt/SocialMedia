import { NextApiRequest, NextApiResponse } from 'next'
import type { ProductContext, AdBlueprint, PsychologicalAngle } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const productContext: ProductContext = req.body

        // AI logic for context-aware ad generation
        const conversionRate = (productContext.conversions24h / productContext.views24h) * 100
        const isLowConversion = conversionRate < 1
        const isHighViews = productContext.views24h > 1000
        const hasAbandonedCheckouts = productContext.abandonedCheckouts > 0

        // Determine optimal psychological angle based on context
        let psychologicalAngle: PsychologicalAngle = 'Curiosity'
        if (productContext.lowStock && productContext.stockLevel < 10) {
            psychologicalAngle = 'FOMO'
        } else if (isLowConversion && isHighViews) {
            psychologicalAngle = 'Curiosity'
        } else if (hasAbandonedCheckouts) {
            psychologicalAngle = 'Social Proof'
        } else if (productContext.audienceType === 'vip') {
            psychologicalAngle = 'Reward/VIP'
        }

        // Generate hook based on context
        let hook = ''
        if (isLowConversion && isHighViews) {
            hook = `${productContext.views24h} people saw it. Only ${productContext.conversions24h} ordered. Why?`
        } else if (productContext.lowStock) {
            hook = `Only ${productContext.stockLevel} left in Egypt. Don't miss the drop again.`
        } else if (hasAbandonedCheckouts) {
            hook = `Still thinking about it? Here's why ${productContext.views24h + 800}+ already ordered.`
        } else {
            hook = `Why everyone in Egypt is obsessed with this drop...`
        }

        // Generate copy based on segment
        let copy = ''
        if (productContext.audienceType === 'cold') {
            copy = `${productContext.name} just landed in Egypt — but it won't stay long. 100% authentic. Fast delivery.`
        } else if (productContext.audienceType === 'warm') {
            copy = `You've been eyeing this. Here's why it's worth every penny. Limited stock available.`
        } else {
            copy = `Hey VIP, this drop was made for you. And yes — we held one aside.`
        }

        // Determine platform and visual suggestions
        const platform = productContext.platform === 'Instagram' ? 'Instagram Reels' : 'TikTok'
        const visualSuggestion = psychologicalAngle === 'FOMO'
            ? 'Close-up of logo with scarcity overlay, urgent typography'
            : 'Lifestyle shot, clean background, zoom into logo'

        // Generate hashtags
        const hashtags = [
            `#${productContext.name.replace(/\s+/g, '')}EG`,
            '#LimitedDrop',
            '#FearOfGod',
            '#Streetwear'
        ]

        // Predict performance
        const predictedPerformance = psychologicalAngle === 'FOMO'
            ? 'High CTR - Scarcity'
            : psychologicalAngle === 'Curiosity'
                ? 'High CTR - Curiosity'
                : 'Strong Click Intent'

        const adBlueprint: AdBlueprint = {
            id: `ad-${Date.now()}`,
            platform,
            audience: `Male, 18-30, Cairo, visited in 7d`,
            hook,
            copy,
            cta: psychologicalAngle === 'FOMO' ? 'Secure Yours' : 'Shop Now',
            emotion: psychologicalAngle === 'FOMO' ? 'Scarcity / FOMO' : 'Curiosity / Desire',
            visualSuggestion,
            hashtags,
            psychologicalAngle,
            segment: productContext.audienceType,
            predictedPerformance,
            variants: [],
            createdAt: new Date()
        }

        res.status(200).json(adBlueprint)
    } catch (error) {
        console.error('Error generating context-aware ad:', error)
        res.status(500).json({ error: 'Failed to generate ad' })
    }
} 