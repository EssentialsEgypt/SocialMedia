import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Mock todo data to avoid service dependency issues
    const todoList = [
      {
        id: '1',
        title: 'Review VIP feedback',
        description: 'Analyze recent VIP customer feedback',
        priority: 'high',
        category: 'vip',
        completed: false,
        aiGenerated: true
      },
      {
        id: '2',
        title: 'Optimize ad spend',
        description: 'Review and adjust Facebook ad budgets',
        priority: 'medium',
        category: 'ads',
        completed: false,
        aiGenerated: true
      },
      {
        id: '3',
        title: 'Create new content',
        description: 'Develop behind-the-scenes video',
        priority: 'low',
        category: 'content',
        completed: false,
        aiGenerated: false
      },
      {
        id: '4',
        title: 'Contact inactive VIPs',
        description: 'Reach out to VIP customers who haven\'t purchased recently',
        priority: 'urgent',
        category: 'vip',
        completed: false,
        aiGenerated: true
      },
      {
        id: '5',
        title: 'Update product descriptions',
        description: 'Optimize product descriptions for better SEO',
        priority: 'medium',
        category: 'content',
        completed: false,
        aiGenerated: false
      }
    ]

    res.status(200).json({
      success: true,
      data: todoList,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI-Powered Business Dashboard: Error fetching todo list:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch todo list',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 