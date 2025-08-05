import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for ROI forecasts
const mockForecasts = [
  {
    id: "forecast-1",
    productName: "Premium Streetwear Collection",
    productType: "physical",
    campaignType: "instagram",
    budget: 5000,
    predictedRevenue: 18500,
    estimatedSpend: 5200,
    projectedROI: 3.56,
    confidenceLevel: 88,
    breakEvenPoint: 18,
    dropWindowImpact: 1.2,
    creativeStrengthScore: 85,
    vipEngagementPotential: 0.75,
    reasoning: [
      "Product has high save/comment ratio on IG (4.2% vs 2.1% avg)",
      "VIP customers engaged with teaser story (67% view rate)",
      "No competitor drop within next 3 days",
      "CPC is currently down 17% week-over-week",
      "Seasonal factor: Back-to-school timing optimal"
    ],
    recommendations: [
      "Launch now with 20% budget shift toward story-based creatives",
      "Target lookalike audiences from previous successful drops",
      "Use UGC content from previous collection for social proof",
      "Schedule posts during peak engagement hours (7-9 PM)"
    ],
    forecastRanges: {
      bestCase: 4.8,
      mostLikely: 3.6,
      worstCase: 2.1
    },
    timeframes: {
      "24h": { roi: 1.2, revenue: 6240, spend: 5200 },
      "3d": { roi: 2.1, revenue: 10920, spend: 5200 },
      "7d": { roi: 3.6, revenue: 18720, spend: 5200 },
      "14d": { roi: 4.2, revenue: 21840, spend: 5200 }
    },
    marketFactors: {
      competitorActivity: "Low - No major drops detected",
      cpcTrend: "Down 17% week-over-week",
      audienceEngagement: "High - 4.2% save rate",
      seasonalFactor: 1.15
    },
    createdAt: "2024-01-15T10:30:00Z",
    status: "active"
  },
  {
    id: "forecast-2",
    productName: "Limited Edition Sneaker Drop",
    productType: "physical",
    campaignType: "facebook",
    budget: 8000,
    predictedRevenue: 32000,
    estimatedSpend: 8400,
    projectedROI: 3.81,
    confidenceLevel: 92,
    breakEvenPoint: 24,
    dropWindowImpact: 1.4,
    creativeStrengthScore: 92,
    vipEngagementPotential: 0.88,
    reasoning: [
      "Sneaker market showing 23% growth in target demographic",
      "Previous limited drops averaged 4.1x ROI",
      "Facebook ad performance up 31% this quarter",
      "VIP customer retention rate at 89%",
      "Competitor pricing analysis shows premium positioning works"
    ],
    recommendations: [
      "Allocate 40% budget to video ads with product demos",
      "Create urgency with countdown timer in ads",
      "Target sneaker enthusiast lookalike audiences",
      "Use retargeting for cart abandoners from previous drops"
    ],
    forecastRanges: {
      bestCase: 5.2,
      mostLikely: 3.8,
      worstCase: 2.8
    },
    timeframes: {
      "24h": { roi: 1.8, revenue: 15120, spend: 8400 },
      "3d": { roi: 2.9, revenue: 24360, spend: 8400 },
      "7d": { roi: 3.8, revenue: 31920, spend: 8400 },
      "14d": { roi: 4.5, revenue: 37800, spend: 8400 }
    },
    marketFactors: {
      competitorActivity: "Medium - 2 competitors launching next week",
      cpcTrend: "Stable with 5% increase",
      audienceEngagement: "Very High - 6.1% engagement rate",
      seasonalFactor: 1.25
    },
    createdAt: "2024-01-14T14:20:00Z",
    status: "active"
  },
  {
    id: "forecast-3",
    productName: "Digital Course Bundle",
    productType: "digital",
    campaignType: "email",
    budget: 2000,
    predictedRevenue: 12000,
    estimatedSpend: 2100,
    projectedROI: 5.71,
    confidenceLevel: 85,
    breakEvenPoint: 12,
    dropWindowImpact: 1.1,
    vipEngagementPotential: 0.92,
    reasoning: [
      "Email list has 89% open rate for educational content",
      "Previous course launches averaged 5.2x ROI",
      "High-value audience segment (avg. order value $297)",
      "No competing courses in this niche currently",
      "Seasonal timing: New Year resolution period"
    ],
    recommendations: [
      "Send 3-email sequence with case studies",
      "Offer early bird pricing for first 48 hours",
      "Include testimonials from previous students",
      "Create urgency with limited-time bonus content"
    ],
    forecastRanges: {
      bestCase: 7.1,
      mostLikely: 5.7,
      worstCase: 4.2
    },
    timeframes: {
      "24h": { roi: 2.1, revenue: 4410, spend: 2100 },
      "3d": { roi: 3.8, revenue: 7980, spend: 2100 },
      "7d": { roi: 5.7, revenue: 11970, spend: 2100 },
      "14d": { roi: 6.5, revenue: 13650, spend: 2100 }
    },
    marketFactors: {
      competitorActivity: "None detected in this niche",
      cpcTrend: "N/A for email campaigns",
      audienceEngagement: "Excellent - 89% open rate",
      seasonalFactor: 1.35
    },
    createdAt: "2024-01-13T09:15:00Z",
    status: "completed",
    actualResults: {
      actualRevenue: 11850,
      actualSpend: 2100,
      actualROI: 5.64,
      accuracy: 98.8,
      completedAt: "2024-01-20T16:45:00Z"
    }
  },
  {
    id: "forecast-4",
    productName: "Flash Sale - Accessories",
    productType: "flash_sale",
    campaignType: "whatsapp",
    budget: 1500,
    predictedRevenue: 7500,
    estimatedSpend: 1600,
    projectedROI: 4.69,
    confidenceLevel: 78,
    breakEvenPoint: 8,
    dropWindowImpact: 1.6,
    vipEngagementPotential: 0.65,
    reasoning: [
      "WhatsApp broadcast list has 94% delivery rate",
      "Flash sales typically perform 40% better than regular drops",
      "Accessories have high impulse buy potential",
      "Limited 24-hour window creates urgency",
      "Previous flash sales averaged 4.2x ROI"
    ],
    recommendations: [
      "Send broadcast 2 hours before sale starts",
      "Include countdown timer in messages",
      "Offer free shipping for orders over $50",
      "Use urgency messaging: 'Only 24 hours left'"
    ],
    forecastRanges: {
      bestCase: 6.2,
      mostLikely: 4.7,
      worstCase: 3.1
    },
    timeframes: {
      "24h": { roi: 4.7, revenue: 7520, spend: 1600 },
      "3d": { roi: 4.7, revenue: 7520, spend: 1600 },
      "7d": { roi: 4.7, revenue: 7520, spend: 1600 },
      "14d": { roi: 4.7, revenue: 7520, spend: 1600 }
    },
    marketFactors: {
      competitorActivity: "Low - Weekend timing reduces competition",
      cpcTrend: "N/A for WhatsApp campaigns",
      audienceEngagement: "High - 94% message delivery rate",
      seasonalFactor: 1.05
    },
    createdAt: "2024-01-12T16:30:00Z",
    status: "completed",
    actualResults: {
      actualRevenue: 7200,
      actualSpend: 1600,
      actualROI: 4.5,
      accuracy: 96.0,
      completedAt: "2024-01-13T16:30:00Z"
    }
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      res.status(200).json(mockForecasts)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch forecasts' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 