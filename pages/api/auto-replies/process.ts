// AutoReply-AI-Start: Main API endpoint for processing incoming messages
import { NextApiRequest, NextApiResponse } from 'next'
import { aiAutoRepliesService } from '@/services/ai-auto-replies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { message, senderId, platform, senderContext } = req.body

        if (!message || !senderId || !platform) {
            return res.status(400).json({
                error: 'Missing required fields: message, senderId, platform'
            })
        }

        // Check if auto reply system is active
        if (!aiAutoRepliesService.isSystemActive()) {
            return res.status(200).json({
                success: false,
                message: 'Auto reply system is currently disabled',
                response: null
            })
        }

        // Process the message and generate response
        const response = await aiAutoRepliesService.processMessage(
            message,
            senderId,
            platform,
            senderContext
        )

        return res.status(200).json({
            success: true,
            message: 'Auto reply processed successfully',
            response
        })

    } catch (error) {
        console.error('Auto reply processing error:', error)
        return res.status(500).json({
            error: 'Failed to process auto reply',
            details: error instanceof Error ? error.message : 'Unknown error'
        })
    }
} 