import { NextApiRequest, NextApiResponse } from 'next'

// Mock database for demonstration
let audienceData = [
  { id: 1, date: "2024-01-15", dayOfWeek: "Monday", hour: 6, engagement: 85, reach: 1200, impressions: 1800, activeUsers: 950 },
  { id: 2, date: "2024-01-15", dayOfWeek: "Monday", hour: 7, engagement: 92, reach: 1400, impressions: 2100, activeUsers: 1100 },
  { id: 3, date: "2024-01-15", dayOfWeek: "Monday", hour: 8, engagement: 78, reach: 1100, impressions: 1600, activeUsers: 850 },
  { id: 4, date: "2024-01-16", dayOfWeek: "Tuesday", hour: 6, engagement: 88, reach: 1300, impressions: 1900, activeUsers: 1000 },
  { id: 5, date: "2024-01-16", dayOfWeek: "Tuesday", hour: 7, engagement: 95, reach: 1500, impressions: 2200, activeUsers: 1200 },
  { id: 6, date: "2024-01-17", dayOfWeek: "Wednesday", hour: 6, engagement: 82, reach: 1200, impressions: 1800, activeUsers: 900 },
  { id: 7, date: "2024-01-17", dayOfWeek: "Wednesday", hour: 7, engagement: 89, reach: 1400, impressions: 2100, activeUsers: 1100 },
  { id: 8, date: "2024-01-18", dayOfWeek: "Thursday", hour: 6, engagement: 91, reach: 1600, impressions: 2400, activeUsers: 1300 },
  { id: 9, date: "2024-01-18", dayOfWeek: "Thursday", hour: 7, engagement: 98, reach: 1800, impressions: 2700, activeUsers: 1500 },
  { id: 10, date: "2024-01-19", dayOfWeek: "Friday", hour: 6, engagement: 87, reach: 1400, impressions: 2100, activeUsers: 1100 },
  { id: 11, date: "2024-01-19", dayOfWeek: "Friday", hour: 7, engagement: 94, reach: 1600, impressions: 2400, activeUsers: 1300 },
  { id: 12, date: "2024-01-20", dayOfWeek: "Saturday", hour: 6, engagement: 90, reach: 1500, impressions: 2200, activeUsers: 1200 },
  { id: 13, date: "2024-01-20", dayOfWeek: "Saturday", hour: 7, engagement: 96, reach: 1700, impressions: 2500, activeUsers: 1400 },
  { id: 14, date: "2024-01-21", dayOfWeek: "Sunday", hour: 6, engagement: 93, reach: 1600, impressions: 2400, activeUsers: 1300 },
  { id: 15, date: "2024-01-21", dayOfWeek: "Sunday", hour: 7, engagement: 99, reach: 1900, impressions: 2800, activeUsers: 1600 },
]

let recommendations = [
  {
    id: 1,
    type: 'timing',
    title: "Peak Hour Alert",
    description: "Your audience will be most active in 2 hours – consider posting around 6 PM.",
    recommendedTime: "18:00",
    expectedEngagement: 1.4,
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    type: 'drop',
    title: "Drop Launch Optimization",
    description: "Schedule your drop announcement for Tuesday 7 PM – based on previous data, this timing gets 35% more reach.",
    recommendedTime: "19:00",
    expectedEngagement: 1.35,
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get audience insights with optional filtering
      const { day, hour, date } = req.query
      
      let filteredData = [...audienceData]
      
      if (day) {
        filteredData = filteredData.filter(data => 
          data.dayOfWeek.toLowerCase() === (day as string).toLowerCase()
        )
      }
      
      if (hour) {
        filteredData = filteredData.filter(data => 
          data.hour === parseInt(hour as string)
        )
      }
      
      if (date) {
        filteredData = filteredData.filter(data => 
          data.date === date
        )
      }
      
      return res.status(200).json({ 
        audienceData: filteredData,
        recommendations: recommendations
      })

    case 'POST':
      // Add new audience data
      const newData = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...req.body
      }
      
      audienceData.unshift(newData)
      return res.status(201).json({ data: newData })

    case 'PUT':
      // Update existing audience data
      const { id } = req.query
      const dataIndex = audienceData.findIndex(data => data.id === parseInt(id as string))
      
      if (dataIndex === -1) {
        return res.status(404).json({ error: 'Data not found' })
      }
      
      audienceData[dataIndex] = { ...audienceData[dataIndex], ...req.body }
      return res.status(200).json({ data: audienceData[dataIndex] })

    case 'DELETE':
      // Delete audience data
      const deleteId = req.query.id
      const deleteIndex = audienceData.findIndex(data => data.id === parseInt(deleteId as string))
      
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'Data not found' })
      }
      
      const deletedData = audienceData.splice(deleteIndex, 1)[0]
      return res.status(200).json({ data: deletedData })

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      return res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
} 