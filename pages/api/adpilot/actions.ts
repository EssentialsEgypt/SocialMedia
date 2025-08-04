import { NextApiRequest, NextApiResponse } from 'next'

interface AIAction {
  id: string
  campaignId: string
  actionType: 'increase_budget' | 'decrease_budget' | 'turn_off' | 'duplicate' | 'rotate_creative' | 'merge_audience' | 'expand_audience'
  reason: string
  metrics: any
  confidenceScore: number
  executed: boolean
  executedAt?: string
  result?: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Mock AI actions data
      const aiActions: AIAction[] = [
        {
          id: "1",
          campaignId: "1",
          actionType: "increase_budget",
          reason: "ROAS above 2.5x with low frequency",
          confidenceScore: 87,
          executed: false,
          metrics: { currentRoas: 2.78, targetRoas: 3.0 }
        },
        {
          id: "2",
          campaignId: "2",
          actionType: "rotate_creative",
          reason: "CTR declining, frequency increasing",
          confidenceScore: 76,
          executed: false,
          metrics: { currentCtr: 3.3, previousCtr: 4.1 }
        },
        {
          id: "3",
          campaignId: "3",
          actionType: "turn_off",
          reason: "ROAS below 1.0, high CPA",
          confidenceScore: 94,
          executed: true,
          executedAt: "2024-01-08T10:30:00Z",
          metrics: { currentRoas: 0.8, targetRoas: 1.5 },
          result: { moneySaved: 1200, performanceImpact: "positive" }
        }
      ]

      res.status(200).json({ success: true, data: aiActions })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch AI actions' })
    }
  } else if (req.method === 'POST') {
    try {
      const { actionId, actionType, campaignId, reason, metrics } = req.body

      // Simulate AI analysis and action creation
      const newAction: AIAction = {
        id: Date.now().toString(),
        campaignId,
        actionType,
        reason,
        metrics,
        confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-100
        executed: false
      }

      // In a real implementation, this would be saved to Supabase
      console.log('New AI action created:', newAction)

      res.status(201).json({ success: true, data: newAction })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to create AI action' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { actionId, executed } = req.body

      // Simulate executing an AI action
      const updatedAction = {
        id: actionId,
        executed: true,
        executedAt: new Date().toISOString(),
        result: {
          moneySaved: executed ? Math.floor(Math.random() * 2000) + 500 : 0,
          performanceImpact: executed ? "positive" : "neutral"
        }
      }

      // In a real implementation, this would update Supabase
      console.log('AI action executed:', updatedAction)

      res.status(200).json({ success: true, data: updatedAction })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to execute AI action' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 