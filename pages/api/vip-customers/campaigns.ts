import { NextApiRequest, NextApiResponse } from 'next'

interface VIPCampaign {
    id: string
    type: 'reactivation' | 'reward' | 'upsell' | 'retention'
    target: string
    strategy: string
    content: {
        email: string
        whatsapp: string
        instagram: string
    }
    products: string[]
    sendTime: string
    status: 'draft' | 'scheduled' | 'sent' | 'completed'
    metrics?: {
        openRate?: number
        clickRate?: number
        conversionRate?: number
        revenue?: number
    }
}

const mockVIPCampaigns: VIPCampaign[] = [
    {
        id: "camp_001",
        type: "reactivation",
        target: "Sara Ahmed",
        strategy: "Personalized Discount",
        content: {
            email: "Hi Sara, we miss you! Here's 15% off your next order.",
            whatsapp: "Hey Sara! Your favorite hoodie just restocked with VIP pricing 🎁",
            instagram: "Sara, this drop is for you 💎"
        },
        products: ["Premium Hoodie", "Designer Cap"],
        sendTime: "2024-01-25 10:00",
        status: "scheduled"
    },
    {
        id: "camp_002",
        type: "reward",
        target: "Ahmed Hassan",
        strategy: "UGC Collaboration",
        content: {
            email: "Ahmed, we'd love to feature your style!",
            whatsapp: "Ahmed, want to be our next brand ambassador?",
            instagram: "Ahmed, this collab is calling your name ✨"
        },
        products: ["Limited T-Shirt", "New Collection"],
        sendTime: "2024-01-26 14:00",
        status: "draft"
    },
    {
        id: "camp_003",
        type: "retention",
        target: "Fatima Ali",
        strategy: "VIP Early Access",
        content: {
            email: "Fatima, exclusive early access to our premium collection",
            whatsapp: "Fatima, you get 24h early access to our luxury drop 👑",
            instagram: "Fatima, this exclusive drop is yours first ✨"
        },
        products: ["Limited Edition Jacket", "Premium Sneakers"],
        sendTime: "2024-01-24 09:00",
        status: "sent",
        metrics: {
            openRate: 85,
            clickRate: 45,
            conversionRate: 12,
            revenue: 2400
        }
    },
    {
        id: "camp_004",
        type: "upsell",
        target: "Mohamed Omar",
        strategy: "Bundle Offer",
        content: {
            email: "Mohamed, complete your look with this exclusive bundle",
            whatsapp: "Mohamed, this streetwear bundle was made for you 🔥",
            instagram: "Mohamed, this bundle has your name on it 💯"
        },
        products: ["Streetwear Bundle", "Limited Accessories"],
        sendTime: "2024-01-27 16:00",
        status: "draft"
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { type, status, target } = req.query

        let filteredCampaigns = mockVIPCampaigns

        if (type) {
            filteredCampaigns = filteredCampaigns.filter(campaign => campaign.type === type)
        }

        if (status) {
            filteredCampaigns = filteredCampaigns.filter(campaign => campaign.status === status)
        }

        if (target) {
            filteredCampaigns = filteredCampaigns.filter(campaign =>
                campaign.target.toLowerCase().includes(target.toString().toLowerCase())
            )
        }

        res.status(200).json({
            success: true,
            data: filteredCampaigns,
            total: filteredCampaigns.length,
            summary: {
                total: mockVIPCampaigns.length,
                scheduled: mockVIPCampaigns.filter(c => c.status === 'scheduled').length,
                sent: mockVIPCampaigns.filter(c => c.status === 'sent').length,
                draft: mockVIPCampaigns.filter(c => c.status === 'draft').length
            }
        })
    } else if (req.method === 'POST') {
        const { type, target, strategy, content, products, sendTime } = req.body

        const newCampaign: VIPCampaign = {
            id: `camp_${Date.now()}`,
            type,
            target,
            strategy,
            content,
            products,
            sendTime,
            status: 'draft'
        }

        mockVIPCampaigns.unshift(newCampaign)

        res.status(201).json({
            success: true,
            data: newCampaign,
            message: 'VIP campaign created successfully'
        })
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ error: 'Method not allowed' })
    }
} 