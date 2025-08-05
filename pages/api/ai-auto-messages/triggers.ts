import { NextApiRequest, NextApiResponse } from 'next'

// AI Auto Message Enhancement - Behavior Triggers API
// Handles AI-powered behavior trigger management

interface BehaviorTrigger {
    id: string
    userId: string
    triggerType: 'shopify' | 'ga4' | 'meta_pixel' | 'instagram' | 'whatsapp'
    triggerCondition: {
        event: string
        threshold: number
        timeWindow: number
        segment?: string
    }
    actions: any[]
    isActive: boolean
    lastTriggered?: Date
    triggerCount: number
    createdAt: Date
    updatedAt: Date
}

// Mock data for demonstration
const mockTriggers: BehaviorTrigger[] = [
    {
        id: "1",
        userId: "user1",
        triggerType: "shopify",
        triggerCondition: {
            event: "product_view",
            threshold: 3,
            timeWindow: 60,
            segment: "high_intent"
        },
        actions: [
            {
                id: "action1",
                triggerId: "1",
                actionType: "message",
                channel: "whatsapp",
                content: "Hey! I noticed you've been checking out our BAPE Shark Hoodie 👀 We saved it for you!",
                aiGenerated: true,
                tone: "casual",
                segment: "gen_z",
                isActive: true
            }
        ],
        isActive: true,
        lastTriggered: new Date(),
        triggerCount: 45,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { userId } = req.query

            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' })
            }

            // AI Auto Message Enhancement - Filter triggers by user
            const userTriggers = mockTriggers.filter(trigger => trigger.userId === userId)

            return res.status(200).json(userTriggers)
        } catch (error) {
            console.error('Error fetching behavior triggers:', error)
            return res.status(500).json({ error: 'Failed to fetch behavior triggers' })
        }
    }

    if (req.method === 'POST') {
        try {
            const triggerData = req.body

            // AI Auto Message Enhancement - Validate trigger data
            if (!triggerData.userId || !triggerData.triggerType || !triggerData.triggerCondition) {
                return res.status(400).json({ error: 'Missing required fields' })
            }

            // AI Auto Message Enhancement - Create new trigger with AI optimization
            const newTrigger: BehaviorTrigger = {
                id: Date.now().toString(),
                userId: triggerData.userId,
                triggerType: triggerData.triggerType,
                triggerCondition: triggerData.triggerCondition,
                actions: triggerData.actions || [],
                isActive: triggerData.isActive || true,
                triggerCount: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            // AI Auto Message Enhancement - Add to mock data
            mockTriggers.push(newTrigger)

            return res.status(201).json(newTrigger)
        } catch (error) {
            console.error('Error creating behavior trigger:', error)
            return res.status(500).json({ error: 'Failed to create behavior trigger' })
        }
    }

    if (req.method === 'PUT') {
        try {
            const { id } = req.query
            const updates = req.body

            if (!id) {
                return res.status(400).json({ error: 'Trigger ID is required' })
            }

            // AI Auto Message Enhancement - Find and update trigger
            const triggerIndex = mockTriggers.findIndex(trigger => trigger.id === id)

            if (triggerIndex === -1) {
                return res.status(404).json({ error: 'Trigger not found' })
            }

            // AI Auto Message Enhancement - Update trigger with AI optimizations
            mockTriggers[triggerIndex] = {
                ...mockTriggers[triggerIndex],
                ...updates,
                updatedAt: new Date()
            }

            return res.status(200).json(mockTriggers[triggerIndex])
        } catch (error) {
            console.error('Error updating behavior trigger:', error)
            return res.status(500).json({ error: 'Failed to update behavior trigger' })
        }
    }

    return res.status(405).json({ error: 'Method not allowed' })
} 