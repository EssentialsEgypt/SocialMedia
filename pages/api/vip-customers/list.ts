import { NextApiRequest, NextApiResponse } from 'next'

interface VIPCustomer {
  id: string
  name: string
  email: string
  phone: string
  instagram: string
  tier: string
  totalSpent: number
  orderCount: number
  lastOrder: string
  daysSinceLastOrder: number
  purchaseProbability: number
  engagementScore: number
  favoriteCategories: string[]
  socialInteractions: number
  storyReplies: number
  tags: number
  influenceIndex: number
  emotionalTriggers: string[]
  lifecycle: {
    firstVisit: string
    firstOrder: string
    lastActivity: string
    status: string
  }
  recentActivity: Array<{
    type: string
    item?: string
    content?: string
    campaign?: string
    date: string
  }>
}

const mockVIPCustomers: VIPCustomer[] = [
  {
    id: "vip_001",
    name: "Sara Ahmed",
    email: "sara.ahmed@email.com",
    phone: "+201234567890",
    instagram: "@sara_style",
    tier: "Tier 1 - Power Buyer",
    totalSpent: 8500,
    orderCount: 12,
    lastOrder: "2024-01-15",
    daysSinceLastOrder: 21,
    purchaseProbability: 78,
    engagementScore: 92,
    favoriteCategories: ["Hoodies", "Accessories"],
    socialInteractions: 45,
    storyReplies: 23,
    tags: 8,
    influenceIndex: 85,
    emotionalTriggers: ["Exclusive", "Limited", "Hidden"],
    lifecycle: {
      firstVisit: "2023-03-15",
      firstOrder: "2023-04-02",
      lastActivity: "2024-01-20",
      status: "Active VIP"
    },
    recentActivity: [
      { type: "product_view", item: "Premium Hoodie", date: "2024-01-20" },
      { type: "cart_add", item: "Designer Cap", date: "2024-01-19" },
      { type: "story_reply", content: "Love this!", date: "2024-01-18" }
    ]
  },
  {
    id: "vip_002",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    phone: "+201234567891",
    instagram: "@ahmed_fashion",
    tier: "Tier 2 - Social Advocate",
    totalSpent: 6200,
    orderCount: 8,
    lastOrder: "2024-01-10",
    daysSinceLastOrder: 26,
    purchaseProbability: 65,
    engagementScore: 88,
    favoriteCategories: ["T-Shirts", "Sneakers"],
    socialInteractions: 67,
    storyReplies: 34,
    tags: 15,
    influenceIndex: 92,
    emotionalTriggers: ["New Arrival", "Trending", "Popular"],
    lifecycle: {
      firstVisit: "2023-05-20",
      firstOrder: "2023-06-10",
      lastActivity: "2024-01-22",
      status: "Engaged VIP"
    },
    recentActivity: [
      { type: "product_share", item: "Limited T-Shirt", date: "2024-01-22" },
      { type: "comment", content: "This is fire!", date: "2024-01-21" },
      { type: "story_reply", content: "Need this!", date: "2024-01-20" }
    ]
  },
  {
    id: "vip_003",
    name: "Fatima Ali",
    email: "fatima.ali@email.com",
    phone: "+201234567892",
    instagram: "@fatima_luxury",
    tier: "Tier 3 - Silent Whale",
    totalSpent: 15000,
    orderCount: 5,
    lastOrder: "2024-01-05",
    daysSinceLastOrder: 31,
    purchaseProbability: 45,
    engagementScore: 35,
    favoriteCategories: ["Premium Items", "Limited Edition"],
    socialInteractions: 12,
    storyReplies: 3,
    tags: 1,
    influenceIndex: 25,
    emotionalTriggers: ["Premium", "Exclusive", "Rare"],
    lifecycle: {
      firstVisit: "2023-02-10",
      firstOrder: "2023-03-01",
      lastActivity: "2024-01-15",
      status: "At Risk"
    },
    recentActivity: [
      { type: "product_view", item: "Limited Edition Jacket", date: "2024-01-15" },
      { type: "wishlist_add", item: "Premium Sneakers", date: "2024-01-14" },
      { type: "email_open", campaign: "New Arrivals", date: "2024-01-13" }
    ]
  },
  {
    id: "vip_004",
    name: "Mohamed Omar",
    email: "mohamed.omar@email.com",
    phone: "+201234567893",
    instagram: "@mohamed_streetwear",
    tier: "Tier 1 - Power Buyer",
    totalSpent: 9200,
    orderCount: 15,
    lastOrder: "2024-01-18",
    daysSinceLastOrder: 18,
    purchaseProbability: 89,
    engagementScore: 95,
    favoriteCategories: ["Streetwear", "Limited Drops"],
    socialInteractions: 78,
    storyReplies: 42,
    tags: 12,
    influenceIndex: 88,
    emotionalTriggers: ["Limited", "Exclusive", "Streetwear"],
    lifecycle: {
      firstVisit: "2023-01-15",
      firstOrder: "2023-02-01",
      lastActivity: "2024-01-22",
      status: "Active VIP"
    },
    recentActivity: [
      { type: "product_view", item: "Limited Streetwear Collection", date: "2024-01-22" },
      { type: "story_reply", content: "This collection is insane!", date: "2024-01-21" },
      { type: "product_share", item: "Exclusive Hoodie", date: "2024-01-20" }
    ]
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { tier, minSpend, maxDaysSinceOrder, status } = req.query

    let filteredCustomers = mockVIPCustomers

    if (tier) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.tier.toLowerCase().includes(tier.toString().toLowerCase())
      )
    }

    if (minSpend) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.totalSpent >= parseInt(minSpend.toString())
      )
    }

    if (maxDaysSinceOrder) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.daysSinceLastOrder <= parseInt(maxDaysSinceOrder.toString())
      )
    }

    if (status) {
      filteredCustomers = filteredCustomers.filter(customer =>
        customer.lifecycle.status.toLowerCase().includes(status.toString().toLowerCase())
      )
    }

    res.status(200).json({
      success: true,
      data: filteredCustomers,
      total: filteredCustomers.length,
      metrics: {
        totalVIPs: mockVIPCustomers.length,
        activeVIPs: mockVIPCustomers.filter(c => c.lifecycle.status.includes('Active')).length,
        atRiskVIPs: mockVIPCustomers.filter(c => c.lifecycle.status.includes('Risk')).length,
        averageSpend: Math.round(mockVIPCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / mockVIPCustomers.length),
        retentionRate: 87,
        engagementRate: 76
      }
    })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: 'Method not allowed' })
  }
} 