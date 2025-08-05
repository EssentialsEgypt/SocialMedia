import { NextApiRequest, NextApiResponse } from 'next'

interface ForecastRequest {
  productName: string
  productType: 'physical' | 'digital' | 'bundle' | 'flash_sale'
  campaignType: 'instagram' | 'facebook' | 'tiktok' | 'organic' | 'influencer' | 'email' | 'whatsapp'
  budget: number
  description?: string
}

// AI-powered forecast generation logic
const generateForecast = (data: ForecastRequest) => {
  const {
    productName,
    productType,
    campaignType,
    budget,
    description
  } = data

  // Base multipliers based on product type
  const productTypeMultipliers = {
    physical: { revenue: 3.2, confidence: 0.85 },
    digital: { revenue: 5.1, confidence: 0.92 },
    bundle: { revenue: 4.3, confidence: 0.88 },
    flash_sale: { revenue: 4.8, confidence: 0.78 }
  }

  // Campaign type performance factors
  const campaignTypeFactors = {
    instagram: { roi: 3.5, engagement: 0.85 },
    facebook: { roi: 3.2, engagement: 0.78 },
    tiktok: { roi: 4.1, engagement: 0.92 },
    organic: { roi: 6.2, engagement: 0.95 },
    influencer: { roi: 3.8, engagement: 0.82 },
    email: { roi: 5.5, engagement: 0.89 },
    whatsapp: { roi: 4.6, engagement: 0.91 }
  }

  // Market conditions simulation
  const marketConditions = {
    competitorActivity: Math.random() > 0.7 ? "High - 3 competitors launching this week" : "Low - No major drops detected",
    cpcTrend: Math.random() > 0.5 ? "Down 15% week-over-week" : "Stable with 3% increase",
    audienceEngagement: Math.random() > 0.6 ? "High - 4.2% engagement rate" : "Medium - 2.8% engagement rate",
    seasonalFactor: 0.9 + Math.random() * 0.4 // 0.9 to 1.3
  }

  // Calculate base metrics
  const baseRevenue = budget * productTypeMultipliers[productType].revenue
  const baseROI = campaignTypeFactors[campaignType].roi
  const confidenceBase = productTypeMultipliers[productType].confidence * campaignTypeFactors[campaignType].engagement

  // Apply market factors
  const adjustedRevenue = baseRevenue * marketConditions.seasonalFactor
  const adjustedROI = baseROI * (0.9 + Math.random() * 0.4) // Add some variance
  const confidenceLevel = Math.min(95, Math.max(65, confidenceBase * 100 + (Math.random() - 0.5) * 20))

  // Calculate spend (budget + 4% buffer)
  const estimatedSpend = budget * 1.04

  // Generate timeframes
  const timeframes = {
    "24h": { 
      roi: adjustedROI * 0.35, 
      revenue: adjustedRevenue * 0.35, 
      spend: estimatedSpend 
    },
    "3d": { 
      roi: adjustedROI * 0.6, 
      revenue: adjustedRevenue * 0.6, 
      spend: estimatedSpend 
    },
    "7d": { 
      roi: adjustedROI, 
      revenue: adjustedRevenue, 
      spend: estimatedSpend 
    },
    "14d": { 
      roi: adjustedROI * 1.15, 
      revenue: adjustedRevenue * 1.15, 
      spend: estimatedSpend 
    }
  }

  // Generate forecast ranges
  const forecastRanges = {
    bestCase: adjustedROI * 1.3,
    mostLikely: adjustedROI,
    worstCase: adjustedROI * 0.7
  }

  // AI Reasoning based on inputs
  const reasoning = [
    `${productType.charAt(0).toUpperCase() + productType.slice(1)} products typically perform ${productType === 'digital' ? '40% better' : '25% better'} than average`,
    `${campaignType.charAt(0).toUpperCase() + campaignType.slice(1)} campaigns show ${campaignTypeFactors[campaignType].engagement * 100}% engagement rate`,
    marketConditions.competitorActivity,
    marketConditions.cpcTrend,
    `Seasonal factor: ${marketConditions.seasonalFactor.toFixed(2)}x multiplier applied`,
    description ? `Custom factors: ${description}` : "Standard market conditions apply"
  ]

  // AI Recommendations
  const recommendations = [
    `Allocate ${Math.floor(Math.random() * 30 + 20)}% budget to ${campaignType === 'instagram' ? 'story-based creatives' : 'video content'}`,
    `Target lookalike audiences from previous successful ${productType} drops`,
    campaignType === 'email' ? "Send 3-email sequence with case studies" : "Use retargeting for cart abandoners",
    `Schedule posts during peak engagement hours (${Math.floor(Math.random() * 4 + 6)}-${Math.floor(Math.random() * 4 + 8)} PM)`
  ]

  return {
    id: `forecast-${Date.now()}`,
    productName,
    productType,
    campaignType,
    budget,
    predictedRevenue: Math.round(adjustedRevenue),
    estimatedSpend: Math.round(estimatedSpend),
    projectedROI: Math.round(adjustedROI * 100) / 100,
    confidenceLevel: Math.round(confidenceLevel),
    breakEvenPoint: Math.floor(24 / adjustedROI),
    dropWindowImpact: 1 + Math.random() * 0.5,
    creativeStrengthScore: Math.floor(70 + Math.random() * 25),
    vipEngagementPotential: 0.6 + Math.random() * 0.3,
    reasoning,
    recommendations,
    forecastRanges,
    timeframes,
    marketFactors: marketConditions,
    createdAt: new Date().toISOString(),
    status: 'active'
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data: ForecastRequest = req.body

      // Validate required fields
      if (!data.productName || !data.budget || data.budget <= 0) {
        return res.status(400).json({ error: 'Product name and valid budget are required' })
      }

      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generate forecast
      const forecast = generateForecast(data)

      res.status(200).json(forecast)
    } catch (error) {
      console.error('Error generating forecast:', error)
      res.status(500).json({ error: 'Failed to generate forecast' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 