import { NextApiRequest, NextApiResponse } from 'next'

// Mock database for demonstration
let drops = [
  {
    id: 1,
    productName: "Supreme Hoodie Collection",
    launchDate: "2024-02-01",
    recommendedTime: "19:00",
    teaserSchedule: ["2024-01-28 18:00", "2024-01-30 19:00", "2024-01-31 18:30"],
    countdownDays: 7,
    expectedReach: 2500,
    status: 'planning'
  },
  {
    id: 2,
    productName: "Limited Edition Sneakers",
    launchDate: "2024-02-15",
    recommendedTime: "18:00",
    teaserSchedule: ["2024-02-10 18:00", "2024-02-12 19:00", "2024-02-14 18:30"],
    countdownDays: 21,
    expectedReach: 3000,
    status: 'planning'
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get all drops with optional filtering
      const { status, productName } = req.query
      
      let filteredDrops = [...drops]
      
      if (status) {
        filteredDrops = filteredDrops.filter(drop => 
          drop.status === status
        )
      }
      
      if (productName) {
        filteredDrops = filteredDrops.filter(drop => 
          drop.productName.toLowerCase().includes((productName as string).toLowerCase())
        )
      }
      
      return res.status(200).json({ drops: filteredDrops })

    case 'POST':
      // Add new drop optimization
      const newDrop = {
        id: Date.now(),
        ...req.body,
        countdownDays: Math.ceil((new Date(req.body.launchDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      }
      
      drops.unshift(newDrop)
      return res.status(201).json({ drop: newDrop })

    case 'PUT':
      // Update existing drop
      const { id } = req.query
      const dropIndex = drops.findIndex(drop => drop.id === parseInt(id as string))
      
      if (dropIndex === -1) {
        return res.status(404).json({ error: 'Drop not found' })
      }
      
      drops[dropIndex] = { ...drops[dropIndex], ...req.body }
      return res.status(200).json({ drop: drops[dropIndex] })

    case 'DELETE':
      // Delete drop
      const deleteId = req.query.id
      const deleteIndex = drops.findIndex(drop => drop.id === parseInt(deleteId as string))
      
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'Drop not found' })
      }
      
      const deletedDrop = drops.splice(deleteIndex, 1)[0]
      return res.status(200).json({ drop: deletedDrop })

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
} 