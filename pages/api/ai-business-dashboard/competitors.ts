import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock competitors data to avoid service dependency issues
    const competitors = [
      {
        id: '1',
        username: '@competitor1',
        platform: 'instagram',
        postsToday: 3,
        avgEngagement: 4.2,
        topHook: 'Lifestyle focus',
        visualStyle: 'Minimalist',
        aiAnalysis: 'Strong visual consistency',
        lastUpdated: new Date(),
        followers: 125000,
        recentPosts: 45
      },
      {
        id: '2',
        username: '@competitor2',
        platform: 'tiktok',
        postsToday: 5,
        avgEngagement: 6.8,
        topHook: 'Trending challenges',
        visualStyle: 'Bold colors',
        aiAnalysis: 'High engagement with trending content',
        lastUpdated: new Date(),
        followers: 89000,
        recentPosts: 67
      },
      {
        id: '3',
        username: '@competitor3',
        platform: 'instagram',
        postsToday: 2,
        avgEngagement: 3.1,
        topHook: 'Product showcases',
        visualStyle: 'Clean aesthetic',
        aiAnalysis: 'Consistent product presentation',
        lastUpdated: new Date(),
        followers: 156000,
        recentPosts: 23
      }
    ]

    res.status(200).json({
      success: true,
      data: competitors,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching competitors:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch competitors',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 