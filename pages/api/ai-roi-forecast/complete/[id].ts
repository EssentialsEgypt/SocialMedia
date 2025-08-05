import { NextApiRequest, NextApiResponse } from 'next'

// Mock forecast data for completion
const mockForecasts = [
  {
    id: "forecast-1",
    productName: "Premium Streetwear Collection",
    predictedRevenue: 18500,
    estimatedSpend: 5200,
    projectedROI: 3.56,
    status: "active"
  },
  {
    id: "forecast-2",
    productName: "Limited Edition Sneaker Drop",
    predictedRevenue: 32000,
    estimatedSpend: 8400,
    projectedROI: 3.81,
    status: "active"
  }
]

// AI-powered actual results generation
const generateActualResults = (forecast: any) => {
  // Simulate realistic variance from prediction
  const revenueVariance = 0.85 + Math.random() * 0.3 // 85% to 115% of predicted
  const spendVariance = 0.95 + Math.random() * 0.1 // 95% to 105% of predicted
  
  const actualRevenue = Math.round(forecast.predictedRevenue * revenueVariance)
  const actualSpend = Math.round(forecast.estimatedSpend * spendVariance)
  const actualROI = actualRevenue / actualSpend
  
  // Calculate accuracy based on ROI prediction
  const roiAccuracy = Math.max(0, 100 - Math.abs(forecast.projectedROI - actualROI) / forecast.projectedROI * 100)
  
  return {
    actualRevenue,
    actualSpend,
    actualROI: Math.round(actualROI * 100) / 100,
    accuracy: Math.round(roiAccuracy),
    completedAt: new Date().toISOString()
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query
      
      // Find the forecast
      const forecast = mockForecasts.find(f => f.id === id)
      
      if (!forecast) {
        return res.status(404).json({ error: 'Forecast not found' })
      }
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate actual results
      const actualResults = generateActualResults(forecast)
      
      // Update forecast with actual results
      const updatedForecast = {
        ...forecast,
        status: 'completed',
        actualResults
      }
      
      res.status(200).json(updatedForecast)
    } catch (error) {
      console.error('Error completing forecast:', error)
      res.status(500).json({ error: 'Failed to complete forecast' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 