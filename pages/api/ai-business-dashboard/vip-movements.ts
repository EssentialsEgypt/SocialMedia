import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock VIP movements data to avoid service dependency issues
    const vipMovements = [
      {
        id: '1',
        customerName: 'VIP Customer 1',
        action: 'viewed',
        productName: 'Premium Collection',
        timestamp: new Date(),
        priority: 'high',
        ltv: 2500,
        lastPurchase: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        customerName: 'VIP Customer 2',
        action: 'purchased',
        productName: 'Limited Edition',
        value: 299,
        timestamp: new Date(),
        priority: 'high',
        ltv: 1800,
        lastPurchase: new Date()
      },
      {
        id: '3',
        customerName: 'VIP Customer 3',
        action: 'abandoned',
        productName: 'New Drop',
        timestamp: new Date(),
        priority: 'medium',
        ltv: 3200,
        lastPurchase: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      },
      {
        id: '4',
        customerName: 'VIP Customer 4',
        action: 'contacted',
        productName: 'Support inquiry',
        timestamp: new Date(),
        priority: 'high',
        ltv: 4100,
        lastPurchase: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]

    res.status(200).json({
      success: true,
      data: vipMovements,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching VIP movements:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch VIP movements',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 