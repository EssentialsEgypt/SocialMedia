// AutoReply-AI-Start: API endpoint for auto reply analytics
import { NextApiRequest, NextApiResponse } from 'next'
import { aiAutoRepliesService } from '@/services/ai-auto-replies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const analytics = await aiAutoRepliesService.getAnalytics()
        const platformConfigs = await aiAutoRepliesService.getPlatformConfigs()
        const isActive = aiAutoRepliesService.isSystemActive()

        return res.status(200).json({
            success: true,
            analytics,
            platformConfigs,
            systemStatus: {
                isActive,
                lastUpdated: new Date().toISOString()
            }
        })

    } catch (error) {
        console.error('Analytics retrieval error:', error)
        return res.status(500).json({
            error: 'Failed to retrieve analytics',
            details: error instanceof Error ? error.message : 'Unknown error'
        })
    }
} 