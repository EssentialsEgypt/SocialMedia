import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock CEO summary data to avoid service dependency issues
    const ceoSummary = `This week:
Revenue: 87K EGP
Top product: Essentials FOG Hoodie (31 sold)
Biggest win: 5.4x ROAS from IG Story Ad
Problem to fix: VIP inactivity rising, no follow-up sent.
Suggested Focus Next Week: Loyalty campaign, retarget low spenders.`

    res.status(200).json({
      success: true,
      data: ceoSummary,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching CEO summary:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch CEO summary',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 