// Health check API endpoint
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        return res.status(200).json({
            success: true,
            message: 'API is working correctly',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        })
    } catch (error) {
        console.error('Health check error:', error)
        return res.status(500).json({
            error: 'Health check failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        })
    }
} 