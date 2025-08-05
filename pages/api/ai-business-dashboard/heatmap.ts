import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock heatmap data to avoid service dependency issues
    const heatmapData = [
      {
        id: '1',
        zone: 'Header Navigation',
        clicks: 1250,
        conversions: 89,
        heatLevel: 'hot',
        aiInsight: 'High engagement, consider adding more CTAs'
      },
      {
        id: '2',
        zone: 'Product Grid',
        clicks: 890,
        conversions: 156,
        heatLevel: 'hot',
        aiInsight: 'Strong product interest, optimize images'
      },
      {
        id: '3',
        zone: 'Footer Links',
        clicks: 234,
        conversions: 12,
        heatLevel: 'warm',
        aiInsight: 'Moderate engagement, review link relevance'
      },
      {
        id: '4',
        zone: 'Sidebar',
        clicks: 67,
        conversions: 3,
        heatLevel: 'cold',
        aiInsight: 'Low engagement, consider removing or redesigning'
      }
    ]

    res.status(200).json({
      success: true,
      data: heatmapData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching heatmap data:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch heatmap data',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 