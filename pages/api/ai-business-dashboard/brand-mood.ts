import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock brand mood data to avoid service dependency issues
    const brandMood = {
      overall: 'positive',
      score: 7.8,
      sentiment: 'Hype-driven, but some frustration on sizing',
      topEmotions: ['excited', 'frustrated', 'satisfied'],
      recommendations: ['Fix size guide', 'Keep FOMO energy', 'Address sizing concerns'],
      lastUpdated: new Date()
    }

    res.status(200).json({
      success: true,
      data: brandMood,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching brand mood:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch brand mood',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 