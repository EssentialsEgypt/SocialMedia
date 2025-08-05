import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock drop performance data to avoid service dependency issues
    const drops = [
      {
        id: '1',
        productName: 'Essentials Fear of God Hoodie',
        views: 1200,
        cartAdds: 89,
        checkouts: 45,
        conversionRate: 3.6,
        ugcMentions: 23,
        aiRecommendation: 'Strong performance, consider restock',
        status: 'live'
      },
      {
        id: '2',
        productName: 'Palm Angels Track Jacket',
        views: 890,
        cartAdds: 67,
        checkouts: 34,
        conversionRate: 3.8,
        ugcMentions: 15,
        aiRecommendation: 'Good conversion rate, optimize pricing',
        status: 'live'
      },
      {
        id: '3',
        productName: 'Alexander McQueen Sneakers',
        views: 2100,
        cartAdds: 156,
        checkouts: 78,
        conversionRate: 3.7,
        ugcMentions: 45,
        aiRecommendation: 'Excellent UGC engagement',
        status: 'completed'
      }
    ]

    res.status(200).json({
      success: true,
      data: drops,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching drop performance:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch drop performance',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 