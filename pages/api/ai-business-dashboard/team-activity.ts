import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock team activity data to avoid service dependency issues
    const teamActivity = [
      {
        id: '1',
        member: 'Ahmed',
        action: 'Posted Instagram Story',
        platform: 'Instagram',
        timestamp: new Date(),
        impact: 'positive'
      },
      {
        id: '2',
        member: 'Sarah',
        action: 'Created Facebook Ad Campaign',
        platform: 'Facebook',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        impact: 'positive'
      },
      {
        id: '3',
        member: 'Omar',
        action: 'Responded to Customer Inquiry',
        platform: 'WhatsApp',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        impact: 'positive'
      },
      {
        id: '4',
        member: 'Fatima',
        action: 'Scheduled TikTok Post',
        platform: 'TikTok',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        impact: 'neutral'
      },
      {
        id: '5',
        member: 'Youssef',
        action: 'Updated Product Descriptions',
        platform: 'Website',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        impact: 'positive'
      }
    ]

    res.status(200).json({
      success: true,
      data: teamActivity,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching team activity:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch team activity',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 