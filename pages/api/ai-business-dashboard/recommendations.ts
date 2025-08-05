import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock recommendations data to avoid service dependency issues
    const recommendations = [
      {
        id: '1',
        type: 'post',
        title: 'Behind-the-scenes content',
        description: 'Share production process',
        expectedImpact: '+15% engagement',
        confidence: 0.92,
        action: 'Create post',
        priority: 'high',
        category: 'content'
      },
      {
        id: '2',
        type: 'ad',
        title: 'Retarget VIP customers',
        description: 'Create exclusive VIP campaign',
        expectedImpact: '+25% conversions',
        confidence: 0.88,
        action: 'Launch campaign',
        priority: 'medium',
        category: 'ads'
      },
      {
        id: '3',
        type: 'product',
        title: 'Bundle trending items',
        description: 'Create limited edition bundle',
        expectedImpact: '+30% AOV',
        confidence: 0.85,
        action: 'Create bundle',
        priority: 'high',
        category: 'sales'
      },
      {
        id: '4',
        type: 'audience',
        title: 'Expand to new demographics',
        description: 'Target 18-24 age group',
        expectedImpact: '+20% reach',
        confidence: 0.78,
        action: 'Update targeting',
        priority: 'medium',
        category: 'ads'
      }
    ]

    res.status(200).json({
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching recommendations:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recommendations',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 