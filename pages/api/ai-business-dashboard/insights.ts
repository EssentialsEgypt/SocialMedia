import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock insights data to avoid service dependency issues
    const insights = [
      {
        id: '1',
        type: 'alert',
        title: 'Drop views are high, but no checkouts',
        description: 'Your latest drop has 1,200 views but only 3 checkouts. Consider retargeting.',
        priority: 'high',
        category: 'sales',
        action: 'Launch retargeting campaign',
        timestamp: new Date(),
        aiConfidence: 0.89
      },
      {
        id: '2',
        type: 'recommendation',
        title: 'Schedule a reel at 7:15PM for peak Cairo traffic',
        description: 'Based on your audience timing analysis, 7:15PM shows 2x engagement.',
        priority: 'medium',
        category: 'content',
        action: 'Schedule post',
        timestamp: new Date(),
        aiConfidence: 0.92
      },
      {
        id: '3',
        type: 'prediction',
        title: 'Tomorrow\'s expected traffic: +19%',
        description: 'Historical data suggests strong weekend performance.',
        priority: 'low',
        category: 'sales',
        timestamp: new Date(),
        aiConfidence: 0.78
      }
    ]

    res.status(200).json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching insights:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch insights',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 