import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock leaderboard data to avoid service dependency issues
    const leaderboard = [
      { category: 'Product', name: 'Essentials FOG Hoodie', metric: '31 sold', performance: 'Best' },
      { category: 'Campaign', name: 'IG Story Ad', metric: '5.4x ROAS', performance: 'Best' },
      { category: 'Hour', name: '7:15 PM', metric: '2x engagement', performance: 'Peak' },
      { category: 'Content', name: 'FOG Lifestyle Reel', metric: '220K views', performance: 'Viral' }
    ]

    res.status(200).json({
      success: true,
      data: leaderboard,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching leaderboard:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 