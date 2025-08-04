import { NextApiRequest, NextApiResponse } from 'next'

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    company: string
    position: string
    source: string
    status: string
    value: number
    probability: number
    stage: string
    lastContact: string
    nextFollowUp: string
    notes: string
    tags: string[]
    activities: Array<{
        type: string
        date: string
        notes: string
    }>
    aiInsights: {
        readinessScore: number
        riskFactors: string[]
        recommendedActions: string[]
        nextBestAction: string
    }
}

const mockLeads: Lead[] = [
    {
        id: "lead_001",
        name: "Ahmed Hassan",
        email: "ahmed.hassan@company.com",
        phone: "+201234567890",
        company: "Tech Solutions Egypt",
        position: "Marketing Director",
        source: "Website",
        status: "Qualified",
        value: 50000,
        probability: 75,
        stage: "Proposal",
        lastContact: "2024-01-20",
        nextFollowUp: "2024-01-25",
        notes: "Interested in full marketing automation package",
        tags: ["High Value", "Tech", "Ready to Buy"],
        activities: [
            { type: "call", date: "2024-01-20", notes: "Discussed requirements" },
            { type: "email", date: "2024-01-19", notes: "Sent proposal" },
            { type: "meeting", date: "2024-01-18", notes: "Initial discovery call" }
        ],
        aiInsights: {
            readinessScore: 85,
            riskFactors: ["Budget constraints", "Competition"],
            recommendedActions: ["Send case study", "Schedule demo"],
            nextBestAction: "Follow up with ROI calculation"
        }
    },
    {
        id: "lead_002",
        name: "Sara Mahmoud",
        email: "sara.mahmoud@retail.com",
        phone: "+201234567891",
        company: "Fashion Retail Egypt",
        position: "CEO",
        source: "Referral",
        status: "New",
        value: 25000,
        probability: 40,
        stage: "Discovery",
        lastContact: "2024-01-22",
        nextFollowUp: "2024-01-24",
        notes: "Looking for social media management solution",
        tags: ["Retail", "Startup", "Budget Conscious"],
        activities: [
            { type: "email", date: "2024-01-22", notes: "Initial outreach" },
            { type: "call", date: "2024-01-21", notes: "Qualification call" }
        ],
        aiInsights: {
            readinessScore: 60,
            riskFactors: ["Limited budget", "Decision making process"],
            recommendedActions: ["Send pricing guide", "Book discovery call"],
            nextBestAction: "Send value proposition email"
        }
    },
    {
        id: "lead_003",
        name: "Mohamed Ali",
        email: "mohamed.ali@restaurant.com",
        phone: "+201234567892",
        company: "Cairo Cuisine",
        position: "Owner",
        source: "Social Media",
        status: "Contacted",
        value: 15000,
        probability: 90,
        stage: "Negotiation",
        lastContact: "2024-01-23",
        nextFollowUp: "2024-01-26",
        notes: "Ready to sign, just finalizing terms",
        tags: ["Restaurant", "High Probability", "Quick Close"],
        activities: [
            { type: "meeting", date: "2024-01-23", notes: "Contract discussion" },
            { type: "email", date: "2024-01-22", notes: "Proposal sent" },
            { type: "call", date: "2024-01-21", notes: "Requirements gathering" }
        ],
        aiInsights: {
            readinessScore: 95,
            riskFactors: ["Price sensitivity"],
            recommendedActions: ["Send contract", "Schedule signing"],
            nextBestAction: "Close the deal with final proposal"
        }
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { status, stage, source, search } = req.query

        let filteredLeads = [...mockLeads]

        if (status) {
            filteredLeads = filteredLeads.filter(lead => lead.status === status)
        }

        if (stage) {
            filteredLeads = filteredLeads.filter(lead => lead.stage === stage)
        }

        if (source) {
            filteredLeads = filteredLeads.filter(lead => lead.source === source)
        }

        if (search) {
            const searchTerm = search.toString().toLowerCase()
            filteredLeads = filteredLeads.filter(lead =>
                lead.name.toLowerCase().includes(searchTerm) ||
                lead.company.toLowerCase().includes(searchTerm) ||
                lead.email.toLowerCase().includes(searchTerm)
            )
        }

        res.status(200).json({
            success: true,
            data: filteredLeads,
            total: filteredLeads.length,
            summary: {
                totalValue: filteredLeads.reduce((sum, lead) => sum + lead.value, 0),
                averageProbability: Math.round(filteredLeads.reduce((sum, lead) => sum + lead.probability, 0) / filteredLeads.length),
                highValueLeads: filteredLeads.filter(lead => lead.value > 30000).length,
                readyToClose: filteredLeads.filter(lead => lead.probability > 80).length
            }
        })
    } else if (req.method === 'POST') {
        const newLead = {
            id: `lead_${Date.now()}`,
            ...req.body,
            aiInsights: {
                readinessScore: Math.floor(Math.random() * 40) + 60,
                riskFactors: ["New lead - needs qualification"],
                recommendedActions: ["Schedule discovery call", "Send welcome email"],
                nextBestAction: "Qualify lead with discovery call"
            }
        }

        mockLeads.push(newLead)

        res.status(201).json({
            success: true,
            data: newLead,
            message: 'Lead created successfully'
        })
    } else if (req.method === 'PUT') {
        const { id } = req.query
        const leadIndex = mockLeads.findIndex(lead => lead.id === id)

        if (leadIndex === -1) {
            return res.status(404).json({ error: 'Lead not found' })
        }

        mockLeads[leadIndex] = { ...mockLeads[leadIndex], ...req.body }

        res.status(200).json({
            success: true,
            data: mockLeads[leadIndex],
            message: 'Lead updated successfully'
        })
    } else if (req.method === 'DELETE') {
        const { id } = req.query
        const leadIndex = mockLeads.findIndex(lead => lead.id === id)

        if (leadIndex === -1) {
            return res.status(404).json({ error: 'Lead not found' })
        }

        mockLeads.splice(leadIndex, 1)

        res.status(200).json({
            success: true,
            message: 'Lead deleted successfully'
        })
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).json({ error: 'Method not allowed' })
    }
} 