import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock predictions data to avoid service dependency issues
    const predictions = [
      {
        id: '1',
        metric: 'Revenue',
        currentValue: 12450,
        predictedValue: 14200,
        confidence: 0.89,
        timeframe: 'Next 7 days',
        aiExplanation: 'Based on seasonal trends and current growth rate'
      },
      {
        id: '2',
        metric: 'Engagement Rate',
        currentValue: 8.2,
        predictedValue: 9.1,
        confidence: 0.76,
        timeframe: 'Next 30 days',
        aiExplanation: 'Improved content strategy expected to boost engagement'
      },
      {
        id: '3',
        metric: 'Conversion Rate',
        currentValue: 3.2,
        predictedValue: 3.8,
        confidence: 0.82,
        timeframe: 'Next 14 days',
        aiExplanation: 'Page speed optimizations should improve conversions'
      },
      {
        id: '4',
        metric: 'VIP Orders',
        currentValue: 47,
        predictedValue: 52,
        confidence: 0.71,
        timeframe: 'Next 7 days',
        aiExplanation: 'Loyalty campaign expected to increase VIP activity'
      }
    ]

    res.status(200).json({
      success: true,
      data: predictions,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching predictions:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch predictions',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 