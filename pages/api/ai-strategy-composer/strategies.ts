import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for strategies
const mockStrategies = [
  {
    id: 'strategy-1',
    goalId: 'goal-1',
    title: 'Revenue Generation Strategy',
    description: 'Comprehensive 30-day plan to achieve 300,000 EGP revenue target',
    duration: 30,
    confidence: 87,
    predictedOutcome: {
      revenue: 320000,
      orders: 850,
      engagement: 12,
      reach: 25000
    },
    actions: [
      {
        id: 'action-1-1',
        type: 'drop',
        title: 'Launch Premium Hoodie Collection',
        description: 'Release new premium hoodie collection with limited edition variants',
        day: 1,
        priority: 'critical',
        status: 'completed',
        estimatedImpact: 35,
        budget: 15000,
        platform: ['Instagram', 'Facebook'],
        targetAudience: 'Fashion-conscious millennials',
        creativeType: 'Lifestyle photography',
        timing: '9:00 AM EST'
      },
      {
        id: 'action-1-2',
        type: 'ad',
        title: 'Instagram Story Ads Campaign',
        description: 'Launch targeted Instagram story ads with high-engagement creatives',
        day: 2,
        priority: 'high',
        status: 'in-progress',
        estimatedImpact: 25,
        budget: 8000,
        platform: ['Instagram'],
        targetAudience: 'Existing followers and lookalikes',
        creativeType: 'Story format',
        timing: '6:00 PM EST'
      },
      {
        id: 'action-1-3',
        type: 'vip',
        title: 'VIP Customer Exclusive Drop',
        description: 'Early access drop for VIP customers with special pricing',
        day: 5,
        priority: 'high',
        status: 'pending',
        estimatedImpact: 20,
        budget: 5000,
        platform: ['Email', 'WhatsApp'],
        targetAudience: 'VIP customers',
        creativeType: 'Exclusive preview',
        timing: '12:00 PM EST'
      },
      {
        id: 'action-1-4',
        type: 'content',
        title: 'Behind-the-Scenes Content Series',
        description: 'Create engaging behind-the-scenes content to build anticipation',
        day: 3,
        priority: 'medium',
        status: 'pending',
        estimatedImpact: 15,
        budget: 2000,
        platform: ['Instagram', 'TikTok'],
        targetAudience: 'General audience',
        creativeType: 'Video content',
        timing: '3:00 PM EST'
      },
      {
        id: 'action-1-5',
        type: 'timing',
        title: 'Optimal Posting Schedule',
        description: 'Implement data-driven posting schedule for maximum engagement',
        day: 1,
        priority: 'medium',
        status: 'completed',
        estimatedImpact: 10,
        budget: 0,
        platform: ['All platforms'],
        targetAudience: 'All audiences',
        creativeType: 'Scheduling optimization',
        timing: 'Ongoing'
      }
    ],
    dataSources: ['Cash Log', 'CRM & VIP Tracker', 'Audience Timing', 'Ad Performance'],
    reasoning: [
      'Historical data shows 35% revenue increase during premium drops',
      'VIP customers have 3x higher conversion rate than general audience',
      'Instagram story ads show 40% higher engagement than feed posts',
      'Optimal posting times identified through audience timing analysis'
    ],
    recommendations: [
      'Focus on story-based creatives for higher engagement',
      'Implement VIP early access to drive urgency',
      'Use user-generated content to build authenticity',
      'Monitor competitor activity and adjust strategy accordingly'
    ],
    riskFactors: [
      'Seasonal fluctuations may impact demand',
      'Ad costs could increase during peak periods',
      'Competitor launches might affect market share'
    ],
    createdAt: '2024-01-15T10:30:00Z',
    status: 'active',
    lastUpdated: '2024-01-16T14:20:00Z'
  },
  {
    id: 'strategy-2',
    goalId: 'goal-2',
    title: 'New Product Launch Strategy',
    description: '21-day strategy to achieve 1,000 orders for hoodie collection launch',
    duration: 21,
    confidence: 92,
    predictedOutcome: {
      revenue: 180000,
      orders: 1050,
      engagement: 18,
      reach: 35000
    },
    actions: [
      {
        id: 'action-2-1',
        type: 'drop',
        title: 'Hoodie Collection Launch',
        description: 'Launch new hoodie collection with multiple color variants',
        day: 1,
        priority: 'critical',
        status: 'completed',
        estimatedImpact: 40,
        budget: 20000,
        platform: ['Instagram', 'Facebook', 'TikTok'],
        targetAudience: 'Young adults 18-35',
        creativeType: 'Product showcase',
        timing: '10:00 AM EST'
      },
      {
        id: 'action-2-2',
        type: 'ad',
        title: 'TikTok Influencer Campaign',
        description: 'Partner with micro-influencers for authentic product promotion',
        day: 3,
        priority: 'high',
        status: 'in-progress',
        estimatedImpact: 30,
        budget: 12000,
        platform: ['TikTok'],
        targetAudience: 'TikTok users 16-30',
        creativeType: 'Influencer content',
        timing: 'Various times'
      },
      {
        id: 'action-2-3',
        type: 'content',
        title: 'User-Generated Content Campaign',
        description: 'Encourage customers to share photos wearing the hoodies',
        day: 7,
        priority: 'medium',
        status: 'pending',
        estimatedImpact: 20,
        budget: 3000,
        platform: ['Instagram', 'TikTok'],
        targetAudience: 'Existing customers',
        creativeType: 'UGC campaign',
        timing: 'Ongoing'
      }
    ],
    dataSources: ['Product Database', 'Competitor Tracking', 'Audience Timing', 'Ad Performance'],
    reasoning: [
      'New product launches typically see 40% higher conversion rates',
      'TikTok influencer campaigns show 3x higher engagement than traditional ads',
      'User-generated content increases trust and authenticity',
      'Optimal launch timing identified through competitor analysis'
    ],
    recommendations: [
      'Focus on TikTok for younger audience engagement',
      'Implement UGC campaign to build social proof',
      'Use limited-time offers to create urgency',
      'Monitor competitor launches and adjust pricing accordingly'
    ],
    riskFactors: [
      'New product market acceptance is uncertain',
      'Influencer costs may exceed budget',
      'Seasonal timing could impact demand'
    ],
    createdAt: '2024-01-10T15:00:00Z',
    status: 'active',
    lastUpdated: '2024-01-12T09:15:00Z'
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    res.status(200).json(mockStrategies)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
} 