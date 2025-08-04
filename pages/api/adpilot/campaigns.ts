import { NextApiRequest, NextApiResponse } from 'next'

interface Campaign {
  id: string
  name: string
  platform: 'meta' | 'google' | 'tiktok' | 'linkedin' | 'twitter'
  campaignType: 'cold' | 'warm' | 'retargeting' | 'lookalike' | 'custom'
  status: 'active' | 'paused' | 'completed' | 'draft'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  roas: number
  ctr: number
  cpm: number
  cpc: number
  frequency: number
  healthScore: number
  goalMatchScore: number
  fatigueForecastDate?: string
  aiRecommendations?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Mock campaigns data
      const campaigns: Campaign[] = [
        {
          id: "1",
          name: "Summer Sale Campaign",
          platform: "meta",
          campaignType: "cold",
          status: "active",
          budget: 5000,
          spent: 3200,
          impressions: 150000,
          clicks: 4500,
          conversions: 89,
          revenue: 8900,
          roas: 2.78,
          ctr: 3.0,
          cpm: 21.33,
          cpc: 0.71,
          frequency: 2.1,
          healthScore: 85,
          goalMatchScore: 92,
          fatigueForecastDate: "2024-01-15",
          aiRecommendations: {
            action: "increase_budget",
            reason: "ROAS above 2.5x with low frequency",
            confidence: 87
          }
        },
        {
          id: "2",
          name: "Retargeting Warm Audience",
          platform: "google",
          campaignType: "retargeting",
          status: "active",
          budget: 3000,
          spent: 2100,
          impressions: 85000,
          clicks: 2800,
          conversions: 45,
          revenue: 5400,
          roas: 2.57,
          ctr: 3.3,
          cpm: 24.71,
          cpc: 0.75,
          frequency: 3.2,
          healthScore: 72,
          goalMatchScore: 68,
          fatigueForecastDate: "2024-01-10",
          aiRecommendations: {
            action: "rotate_creative",
            reason: "CTR declining, frequency increasing",
            confidence: 76
          }
        },
        {
          id: "3",
          name: "Cold Traffic Test",
          platform: "tiktok",
          campaignType: "cold",
          status: "paused",
          budget: 2000,
          spent: 1800,
          impressions: 120000,
          clicks: 2100,
          conversions: 12,
          revenue: 1200,
          roas: 0.67,
          ctr: 1.75,
          cpm: 15.0,
          cpc: 0.86,
          frequency: 1.8,
          healthScore: 35,
          goalMatchScore: 45,
          fatigueForecastDate: undefined,
          aiRecommendations: {
            action: "turn_off",
            reason: "ROAS below 1.0, high CPA",
            confidence: 94
          }
        }
      ]

      res.status(200).json({ success: true, data: campaigns })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch campaigns' })
    }
  } else if (req.method === 'POST') {
    try {
      const { name, platform, campaignType, budget } = req.body

      // Simulate creating a new campaign
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name,
        platform,
        campaignType,
        status: 'draft',
        budget,
        spent: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
        roas: 0,
        ctr: 0,
        cpm: 0,
        cpc: 0,
        frequency: 0,
        healthScore: 0,
        goalMatchScore: 0
      }

      // In a real implementation, this would be saved to Supabase
      console.log('New campaign created:', newCampaign)

      res.status(201).json({ success: true, data: newCampaign })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create campaign' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { campaignId, updates } = req.body

      // Simulate updating a campaign
      const updatedCampaign = {
        id: campaignId,
        ...updates,
        updatedAt: new Date().toISOString()
      }

      // In a real implementation, this would update Supabase
      console.log('Campaign updated:', updatedCampaign)

      res.status(200).json({ success: true, data: updatedCampaign })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to update campaign' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 