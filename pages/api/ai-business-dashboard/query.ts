import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query } = req.body

    if (!query) {
      return res.status(400).json({ error: 'Query is required' })
    }

    // Mock AI query processing to avoid service dependency issues
    const mockResponses: { [key: string]: string } = {
      'what happened to ad sales yesterday': 'Ad campaign #7 saw 34% drop due to low IG reach. Reels posted late.',
      'show underperforming ad sets': '3 ad sets below 2% CTR: FOG Hoodie Story, Palm Angels Carousel, McQueen Video.',
      'why are conversions down': 'Mobile bounce rate increased 12%. New collection page may be too slow.',
      'what should I post tomorrow': 'Schedule a reel at 7:15PM featuring the FOG Hoodie. Expected engagement: +40%.'
    }

    const lowerQuery = query.toLowerCase()
    let response = 'I\'m analyzing your query. Please check back in a moment for detailed insights.'

    for (const [key, mockResponse] of Object.entries(mockResponses)) {
      if (lowerQuery.includes(key)) {
        response = mockResponse
        break
      }
    }

    res.status(200).json({
      success: true,
      data: { response },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error processing query:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to process query',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 