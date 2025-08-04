import { NextApiRequest, NextApiResponse } from 'next'

// Mock database for demonstration
let monthlySummaries = [
  {
    year: 2024,
    month: 1,
    total_revenue: 25000,
    total_ad_spend: 3500,
    total_salaries: 10000,
    total_bonuses: 2000,
    total_expenses: 1850,
    net_profit: 7650,
    roi_percentage: 45.2
  },
  {
    year: 2024,
    month: 2,
    total_revenue: 28000,
    total_ad_spend: 4000,
    total_salaries: 10000,
    total_bonuses: 1500,
    total_expenses: 2200,
    net_profit: 10300,
    roi_percentage: 58.1
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get monthly summary with optional year/month filtering
      const { year, month } = req.query
      
      let filteredSummaries = [...monthlySummaries]
      
      if (year) {
        filteredSummaries = filteredSummaries.filter(summary => 
          summary.year === parseInt(year as string)
        )
      }
      
      if (month) {
        filteredSummaries = filteredSummaries.filter(summary => 
          summary.month === parseInt(month as string)
        )
      }
      
      return res.status(200).json({ summaries: filteredSummaries })

    case 'POST':
      // Add new monthly summary
      const newSummary = {
        ...req.body,
        id: Date.now()
      }
      
      // Check if summary already exists for this year/month
      const existingIndex = monthlySummaries.findIndex(summary => 
        summary.year === newSummary.year && summary.month === newSummary.month
      )
      
      if (existingIndex !== -1) {
        monthlySummaries[existingIndex] = newSummary
        return res.status(200).json({ summary: newSummary })
      } else {
        monthlySummaries.push(newSummary)
        return res.status(201).json({ summary: newSummary })
      }

    case 'PUT':
      // Update existing monthly summary
      const { id } = req.query
      const summaryIndex = monthlySummaries.findIndex(summary => 
        summary.year === parseInt(req.body.year) && summary.month === parseInt(req.body.month)
      )
      
      if (summaryIndex === -1) {
        return res.status(404).json({ error: 'Monthly summary not found' })
      }
      
      monthlySummaries[summaryIndex] = { ...monthlySummaries[summaryIndex], ...req.body }
      return res.status(200).json({ summary: monthlySummaries[summaryIndex] })

    case 'DELETE':
      // Delete monthly summary
      const { year: deleteYear, month: deleteMonth } = req.query
      const deleteIndex = monthlySummaries.findIndex(summary => 
        summary.year === parseInt(deleteYear as string) && summary.month === parseInt(deleteMonth as string)
      )
      
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'Monthly summary not found' })
      }
      
      const deletedSummary = monthlySummaries.splice(deleteIndex, 1)[0]
      return res.status(200).json({ summary: deletedSummary })

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
} 