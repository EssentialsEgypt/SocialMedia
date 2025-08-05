import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for goals
const mockGoals = [
  {
    id: 'goal-1',
    type: 'revenue' as const,
    target: '300,000 EGP',
    timeframe: 30,
    urgency: 'high' as const,
    budget: 50000,
    constraints: ['Limited ad budget', 'Seasonal product'],
    description: 'Generate 300,000 EGP in revenue this month through strategic drops and marketing campaigns',
    createdAt: '2024-01-15T10:00:00Z',
    status: 'active' as const
  },
  {
    id: 'goal-2',
    type: 'orders' as const,
    target: '1,000 orders',
    timeframe: 21,
    urgency: 'medium' as const,
    budget: 25000,
    constraints: ['New product launch', 'Competitive market'],
    description: 'Achieve 1,000 orders in the next 21 days for the new hoodie collection launch',
    createdAt: '2024-01-10T14:30:00Z',
    status: 'active' as const
  },
  {
    id: 'goal-3',
    type: 'engagement' as const,
    target: '15% engagement rate',
    timeframe: 14,
    urgency: 'low' as const,
    budget: 10000,
    constraints: ['Organic growth focus', 'Content quality'],
    description: 'Increase Instagram engagement rate to 15% through improved content strategy',
    createdAt: '2024-01-08T09:15:00Z',
    status: 'completed' as const
  },
  {
    id: 'goal-4',
    type: 'reach' as const,
    target: '50,000 new followers',
    timeframe: 60,
    urgency: 'medium' as const,
    budget: 30000,
    constraints: ['Authentic growth', 'Community building'],
    description: 'Grow Instagram following to 50,000 new followers through organic and paid strategies',
    createdAt: '2024-01-05T16:45:00Z',
    status: 'active' as const
  },
  {
    id: 'goal-5',
    type: 'custom' as const,
    target: 'VIP customer retention',
    timeframe: 7,
    urgency: 'high' as const,
    budget: 15000,
    constraints: ['High-value customers', 'Personalized approach'],
    description: 'Increase VIP customer retention rate by implementing personalized marketing strategies',
    createdAt: '2024-01-12T11:20:00Z',
    status: 'active' as const
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    res.status(200).json(mockGoals)
  } else if (req.method === 'POST') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const { type, target, timeframe, urgency, budget, constraints, description } = req.body
    
    // Validate required fields
    if (!type || !target || !timeframe || !urgency || !description) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    
    // Create new goal
    const newGoal = {
      id: `goal-${Date.now()}`,
      type,
      target,
      timeframe,
      urgency,
      budget: budget || 0,
      constraints: constraints || [],
      description,
      createdAt: new Date().toISOString(),
      status: 'active' as const
    }
    
    // Add to mock data (in real app, save to database)
    mockGoals.unshift(newGoal)
    
    res.status(201).json(newGoal)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
} 