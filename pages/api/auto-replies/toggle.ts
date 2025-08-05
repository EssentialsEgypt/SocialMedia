// AutoReply-AI-Start: API endpoint for toggling auto reply system
import { NextApiRequest, NextApiResponse } from 'next'
import { aiAutoRepliesService } from '@/services/ai-auto-replies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { active } = req.body

        if (typeof active !== 'boolean') {
            return res.status(400).json({
                error: 'Active status must be a boolean value'
            })
        }

        await aiAutoRepliesService.toggleSystem(active)

        return res.status(200).json({
            success: true,
            message: `Auto reply system ${active ? 'activated' : 'deactivated'} successfully`,
            isActive: aiAutoRepliesService.isSystemActive()
        })

    } catch (error) {
        console.error('System toggle error:', error)
        return res.status(500).json({
            error: 'Failed to toggle auto reply system',
            details: error instanceof Error ? error.message : 'Unknown error'
        })
    }
} 