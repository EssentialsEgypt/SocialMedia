import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock KPIs data to avoid service dependency issues
    const kpis = [
      {
        id: 'revenue',
        title: 'Revenue Today',
        value: '$12,450',
        change: 15.2,
        trend: 'up',
        aiInsight: 'Majority from 2 products — consider promoting them more.',
        urgency: 'medium'
      },
      {
        id: 'ig-engagement',
        title: 'IG Engagement',
        value: '8.2%',
        change: -2.1,
        trend: 'down',
        aiInsight: 'Reels from 8PM performed 2x better than 6PM this week.',
        urgency: 'high'
      },
      {
        id: 'ad-spend',
        title: 'Ad Spend',
        value: '$2,800',
        change: 5.3,
        trend: 'up',
        aiInsight: 'High CTR but low sales — check product page load time.',
        urgency: 'medium'
      },
      {
        id: 'conversion-rate',
        title: 'Conversion Rate',
        value: '3.2%',
        change: 0.8,
        trend: 'up',
        aiInsight: 'Mobile conversions improved 12% after page speed optimization.',
        urgency: 'low'
      },
      {
        id: 'vip-orders',
        title: 'VIP Orders',
        value: '47',
        change: -8.5,
        trend: 'down',
        aiInsight: 'VIP inactivity rising, no follow-up sent.',
        urgency: 'high'
      }
    ]

    res.status(200).json({
      success: true,
      data: kpis,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching KPIs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch KPIs',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 