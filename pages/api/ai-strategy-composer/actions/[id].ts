import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  
  if (req.method === 'PATCH') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const { status } = req.body
    
    // Validate status
    const validStatuses = ['pending', 'in-progress', 'completed', 'skipped']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    
    // In a real application, you would update the action in the database
    // For now, we'll just return a success response
    res.status(200).json({ 
      id, 
      status,
      updatedAt: new Date().toISOString()
    })
  } else {
    res.setHeader('Allow', ['PATCH'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
} 