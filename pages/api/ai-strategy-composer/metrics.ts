import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for strategy metrics
const mockMetrics = {
  totalStrategies: 8,
  activeStrategies: 5,
  completedStrategies: 3,
  averageConfidence: 89,
  averageSuccessRate: 78,
  totalPredictedRevenue: 1250000,
  totalActualRevenue: 980000,
  topPerformingActions: [
    'Instagram Story Ads Campaign',
    'VIP Customer Exclusive Drop',
    'TikTok Influencer Campaign',
    'User-Generated Content Campaign',
    'Optimal Posting Schedule'
  ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    res.status(200).json(mockMetrics)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
} 