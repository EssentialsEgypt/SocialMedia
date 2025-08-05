import { NextApiRequest, NextApiResponse } from 'next'
import type { ProductContext, PsychologicalAngle } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { product, audienceType, platform } = req.body

        let optimalAngle: PsychologicalAngle = 'Curiosity'

        // Determine optimal angle based on multiple factors
        if (audienceType === 'vip') {
            optimalAngle = 'Reward/VIP'
        } else if (product.lowStock && product.stockLevel < 10) {
            optimalAngle = 'FOMO'
        } else if (product.abandonedCheckouts > 0) {
            optimalAngle = 'Social Proof'
        } else if (product.category === 'Streetwear' && platform === 'TikTok') {
            optimalAngle = 'Curiosity'
        } else if (product.price > 200) {
            optimalAngle = 'Aspirational'
        } else if (product.tags.includes('Limited')) {
            optimalAngle = 'FOMO'
        } else if (product.tags.includes('Premium')) {
            optimalAngle = 'Aspirational'
        } else if (audienceType === 'cold') {
            optimalAngle = 'Curiosity'
        } else if (audienceType === 'warm') {
            optimalAngle = 'Social Proof'
        }

        // Platform-specific adjustments
        if (platform === 'Instagram Reels' && optimalAngle === 'Curiosity') {
            optimalAngle = 'Curiosity' // Keep curiosity for Reels
        } else if (platform === 'TikTok' && optimalAngle === 'FOMO') {
            optimalAngle = 'FOMO' // Keep FOMO for TikTok
        } else if (platform === 'Meta Image Ad' && optimalAngle === 'Aspirational') {
            optimalAngle = 'Aspirational' // Keep aspirational for image ads
        }

        res.status(200).json(optimalAngle)
    } catch (error) {
        console.error('Error determining optimal angle:', error)
        res.status(500).json({ error: 'Failed to determine optimal angle' })
    }
} 