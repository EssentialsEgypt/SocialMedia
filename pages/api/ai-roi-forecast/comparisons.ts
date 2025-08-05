import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for forecast comparisons
const mockComparisons = [
  {
    forecasted: {
      id: "forecast-3",
      productName: "Digital Course Bundle",
      predictedRevenue: 12000,
      projectedROI: 5.71
    },
    actual: {
      actualRevenue: 11850,
      actualSpend: 2100,
      actualROI: 5.64,
      accuracy: 98.8,
      completedAt: "2024-01-20T16:45:00Z"
    },
    accuracy: 98.8,
    variance: -0.07
  },
  {
    forecasted: {
      id: "forecast-4",
      productName: "Flash Sale - Accessories",
      predictedRevenue: 7500,
      projectedROI: 4.69
    },
    actual: {
      actualRevenue: 7200,
      actualSpend: 1600,
      actualROI: 4.5,
      accuracy: 96.0,
      completedAt: "2024-01-13T16:30:00Z"
    },
    accuracy: 96.0,
    variance: -0.19
  },
  {
    forecasted: {
      id: "forecast-5",
      productName: "Summer Collection Launch",
      predictedRevenue: 25000,
      projectedROI: 3.2
    },
    actual: {
      actualRevenue: 26800,
      actualSpend: 8200,
      actualROI: 3.27,
      accuracy: 97.8,
      completedAt: "2024-01-10T14:20:00Z"
    },
    accuracy: 97.8,
    variance: 0.07
  },
  {
    forecasted: {
      id: "forecast-6",
      productName: "Influencer Collaboration",
      predictedRevenue: 15000,
      projectedROI: 4.1
    },
    actual: {
      actualRevenue: 14200,
      actualSpend: 3800,
      actualROI: 3.74,
      accuracy: 91.2,
      completedAt: "2024-01-08T11:15:00Z"
    },
    accuracy: 91.2,
    variance: -0.36
  },
  {
    forecasted: {
      id: "forecast-7",
      productName: "Black Friday Campaign",
      predictedRevenue: 45000,
      projectedROI: 2.8
    },
    actual: {
      actualRevenue: 43200,
      actualSpend: 16500,
      actualROI: 2.62,
      accuracy: 93.6,
      completedAt: "2023-12-01T23:59:00Z"
    },
    accuracy: 93.6,
    variance: -0.18
  },
  {
    forecasted: {
      id: "forecast-8",
      productName: "Email Newsletter Launch",
      predictedRevenue: 8000,
      projectedROI: 6.2
    },
    actual: {
      actualRevenue: 7850,
      actualSpend: 1300,
      actualROI: 6.04,
      accuracy: 97.4,
      completedAt: "2023-11-25T09:30:00Z"
    },
    accuracy: 97.4,
    variance: -0.16
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      res.status(200).json(mockComparisons)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comparisons' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 