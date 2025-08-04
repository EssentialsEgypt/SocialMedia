import { NextApiRequest, NextApiResponse } from 'next'

interface VIPAlert {
  id: number
  type: 'retention' | 'engagement' | 'risk' | 'opportunity'
  customer: string
  message: string
  priority: 'high' | 'medium' | 'low'
  suggestedAction: string
  timestamp: string
  status: 'active' | 'resolved'
}

const mockVIPAlerts: VIPAlert[] = [
  {
    id: 1,
    type: "retention",
    customer: "Sara Ahmed",
    message: "Sara hasn't purchased in 21 days - send reactivation campaign",
    priority: "high",
    suggestedAction: "Send personalized email with 15% discount",
    timestamp: "2024-01-22T10:30:00Z",
    status: "active"
  },
  {
    id: 2,
    type: "engagement",
    customer: "Ahmed Hassan",
    message: "Ahmed shared 3 products this week - perfect for UGC campaign",
    priority: "medium",
    suggestedAction: "Invite for product collaboration",
    timestamp: "2024-01-22T09:15:00Z",
    status: "active"
  },
  {
    id: 3,
    type: "risk",
    customer: "Fatima Ali",
    message: "Fatima's engagement dropped 60% - needs re-activation",
    priority: "high",
    suggestedAction: "Send VIP-exclusive early access",
    timestamp: "2024-01-22T08:45:00Z",
    status: "active"
  },
  {
    id: 4,
    type: "opportunity",
    customer: "Mohamed Omar",
    message: "Mohamed viewed premium items 5 times - ready for upsell",
    priority: "medium",
    suggestedAction: "Send personalized product recommendations",
    timestamp: "2024-01-22T07:20:00Z",
    status: "active"
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { type, priority, status } = req.query
    
    let filteredAlerts = mockVIPAlerts
    
    if (type) {
      filteredAlerts = filteredAlerts.filter(alert => alert.type === type)
    }
    
    if (priority) {
      filteredAlerts = filteredAlerts.filter(alert => alert.priority === priority)
    }
    
    if (status) {
      filteredAlerts = filteredAlerts.filter(alert => alert.status === status)
    }
    
    res.status(200).json({
      success: true,
      data: filteredAlerts,
      total: filteredAlerts.length
    })
  } else if (req.method === 'POST') {
    const { type, customer, message, priority, suggestedAction } = req.body
    
    const newAlert: VIPAlert = {
      id: mockVIPAlerts.length + 1,
      type,
      customer,
      message,
      priority,
      suggestedAction,
      timestamp: new Date().toISOString(),
      status: 'active'
    }
    
    mockVIPAlerts.unshift(newAlert)
    
    res.status(201).json({
      success: true,
      data: newAlert,
      message: 'VIP alert created successfully'
    })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: 'Method not allowed' })
  }
} 