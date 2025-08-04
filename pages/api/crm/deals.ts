import { NextApiRequest, NextApiResponse } from 'next'

interface Deal {
    id: string
    name: string
    lead: string
    value: number
    stage: string
    probability: number
    closeDate: string
    owner: string
    products: string[]
    notes: string
    activities: Array<{
        type: string
        date: string
        notes?: string
        value?: number
    }>
}

const mockDeals: Deal[] = [
    {
        id: "deal_001",
        name: "Tech Solutions Marketing Package",
        lead: "Ahmed Hassan",
        value: 50000,
        stage: "Proposal",
        probability: 75,
        closeDate: "2024-02-15",
        owner: "Sales Team",
        products: ["Social Media Management", "Content Creation", "Analytics"],
        notes: "Comprehensive marketing solution for tech company",
        activities: [
            { type: "proposal", date: "2024-01-20", value: 50000 },
            { type: "meeting", date: "2024-01-18", notes: "Requirements discussion" }
        ]
    },
    {
        id: "deal_002",
        name: "Fashion Retail Social Media",
        lead: "Sara Mahmoud",
        value: 25000,
        stage: "Discovery",
        probability: 40,
        closeDate: "2024-03-01",
        owner: "Sales Team",
        products: ["Social Media Management", "Content Creation"],
        notes: "Basic social media management for retail startup",
        activities: [
            { type: "discovery", date: "2024-01-22", notes: "Initial meeting" }
        ]
    },
    {
        id: "deal_003",
        name: "Restaurant Marketing Automation",
        lead: "Mohamed Ali",
        value: 15000,
        stage: "Negotiation",
        probability: 90,
        closeDate: "2024-01-30",
        owner: "Sales Team",
        products: ["Marketing Automation", "Social Media"],
        notes: "Ready to close, finalizing contract terms",
        activities: [
            { type: "negotiation", date: "2024-01-23", notes: "Contract discussion" },
            { type: "proposal", date: "2024-01-22", value: 15000 }
        ]
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { stage, owner, search, minValue, maxValue } = req.query

        let filteredDeals = [...mockDeals]

        if (stage) {
            filteredDeals = filteredDeals.filter(deal => deal.stage === stage)
        }

        if (owner) {
            filteredDeals = filteredDeals.filter(deal => deal.owner === owner)
        }

        if (search) {
            const searchTerm = search.toString().toLowerCase()
            filteredDeals = filteredDeals.filter(deal =>
                deal.name.toLowerCase().includes(searchTerm) ||
                deal.lead.toLowerCase().includes(searchTerm) ||
                deal.products.some(product => product.toLowerCase().includes(searchTerm))
            )
        }

        if (minValue) {
            filteredDeals = filteredDeals.filter(deal => deal.value >= Number(minValue))
        }

        if (maxValue) {
            filteredDeals = filteredDeals.filter(deal => deal.value <= Number(maxValue))
        }

        res.status(200).json({
            success: true,
            data: filteredDeals,
            total: filteredDeals.length,
            summary: {
                totalValue: filteredDeals.reduce((sum, deal) => sum + deal.value, 0),
                averageValue: Math.round(filteredDeals.reduce((sum, deal) => sum + deal.value, 0) / filteredDeals.length),
                averageProbability: Math.round(filteredDeals.reduce((sum, deal) => sum + deal.probability, 0) / filteredDeals.length),
                highProbabilityDeals: filteredDeals.filter(deal => deal.probability > 80).length,
                expectedValue: filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0)
            }
        })
    } else if (req.method === 'POST') {
        const newDeal = {
            id: `deal_${Date.now()}`,
            ...req.body,
            activities: []
        }

        mockDeals.push(newDeal)

        res.status(201).json({
            success: true,
            data: newDeal,
            message: 'Deal created successfully'
        })
    } else if (req.method === 'PUT') {
        const { id } = req.query
        const dealIndex = mockDeals.findIndex(deal => deal.id === id)

        if (dealIndex === -1) {
            return res.status(404).json({ error: 'Deal not found' })
        }

        mockDeals[dealIndex] = { ...mockDeals[dealIndex], ...req.body }

        res.status(200).json({
            success: true,
            data: mockDeals[dealIndex],
            message: 'Deal updated successfully'
        })
    } else if (req.method === 'DELETE') {
        const { id } = req.query
        const dealIndex = mockDeals.findIndex(deal => deal.id === id)

        if (dealIndex === -1) {
            return res.status(404).json({ error: 'Deal not found' })
        }

        mockDeals.splice(dealIndex, 1)

        res.status(200).json({
            success: true,
            message: 'Deal deleted successfully'
        })
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).json({ error: 'Method not allowed' })
    }
} 