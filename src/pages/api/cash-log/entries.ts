import { NextApiRequest, NextApiResponse } from 'next'

// Mock database for demonstration
let cashLogEntries = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Instagram – Story Campaign – August 3",
    amount: -2000,
    category: "Ad Spend",
    subcategory: "Instagram Ads",
    transaction_type: "expense",
    source: "instagram",
    platform: "instagram",
    tags: ["@campaign", "story"]
  },
  {
    id: 2,
    date: "2024-01-10",
    description: "Salary – @Ahmed",
    amount: -10000,
    category: "Salary",
    transaction_type: "expense",
    source: "salary",
    tags: ["@Ahmed", "salary"]
  },
  {
    id: 3,
    date: "2024-01-12",
    description: "Bonus – @Omar",
    amount: -2000,
    category: "Bonus",
    transaction_type: "expense",
    source: "bonus",
    tags: ["@Omar", "bonus", "salary"]
  },
  {
    id: 4,
    date: "2024-01-14",
    description: "Manual Order – Supreme Hoodie",
    amount: -1850,
    category: "Order",
    subcategory: "Manual Order",
    transaction_type: "expense",
    source: "manual",
    tags: ["@order", "supreme"]
  },
  {
    id: 5,
    date: "2024-01-16",
    description: "Facebook Ad Campaign: Summer Sale",
    amount: -1500,
    category: "Ad Spend",
    subcategory: "Facebook Ads",
    transaction_type: "expense",
    source: "facebook_ads",
    platform: "facebook",
    tags: ["@campaign", "summer"]
  },
  {
    id: 6,
    date: "2024-01-20",
    description: "Monthly Revenue - Shopify Store",
    amount: 25000,
    category: "Revenue",
    subcategory: "Shopify",
    transaction_type: "income",
    source: "shopify",
    platform: "shopify",
    tags: ["@revenue", "monthly"]
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get all cash log entries with optional filtering
      const { month, category, platform } = req.query
      
      let filteredEntries = [...cashLogEntries]
      
      if (month) {
        filteredEntries = filteredEntries.filter(entry => 
          entry.date.startsWith(month as string)
        )
      }
      
      if (category) {
        filteredEntries = filteredEntries.filter(entry => 
          entry.category === category
        )
      }
      
      if (platform) {
        filteredEntries = filteredEntries.filter(entry => 
          entry.platform === platform
        )
      }
      
      return res.status(200).json({ entries: filteredEntries })

    case 'POST':
      // Add new cash log entry
      const newEntry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...req.body
      }
      
      cashLogEntries.unshift(newEntry)
      return res.status(201).json({ entry: newEntry })

    case 'PUT':
      // Update existing cash log entry
      const { id } = req.query
      const entryIndex = cashLogEntries.findIndex(entry => entry.id === parseInt(id as string))
      
      if (entryIndex === -1) {
        return res.status(404).json({ error: 'Entry not found' })
      }
      
      cashLogEntries[entryIndex] = { ...cashLogEntries[entryIndex], ...req.body }
      return res.status(200).json({ entry: cashLogEntries[entryIndex] })

    case 'DELETE':
      // Delete cash log entry
      const deleteId = req.query.id
      const deleteIndex = cashLogEntries.findIndex(entry => entry.id === parseInt(deleteId as string))
      
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'Entry not found' })
      }
      
      const deletedEntry = cashLogEntries.splice(deleteIndex, 1)[0]
      return res.status(200).json({ entry: deletedEntry })

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
} 