import { NextApiRequest, NextApiResponse } from 'next'

interface Activity {
    id: string
    type: string
    lead: string
    date: string
    duration: number
    notes: string
    outcome: string
    nextAction: string
    aiInsights?: {
        sentiment: string
        priority: string
        recommendedFollowUp: string
    }
}

const mockActivities: Activity[] = [
    {
        id: "act_001",
        type: "call",
        lead: "Ahmed Hassan",
        date: "2024-01-20",
        duration: 30,
        notes: "Discussed proposal details and timeline",
        outcome: "Positive",
        nextAction: "Send follow-up email with ROI calculation",
        aiInsights: {
            sentiment: "Positive",
            priority: "High",
            recommendedFollowUp: "Schedule demo within 48 hours"
        }
    },
    {
        id: "act_002",
        type: "meeting",
        lead: "Mohamed Ali",
        date: "2024-01-23",
        duration: 60,
        notes: "Contract negotiation and final terms discussion",
        outcome: "Very Positive",
        nextAction: "Prepare contract for signing",
        aiInsights: {
            sentiment: "Very Positive",
            priority: "Critical",
            recommendedFollowUp: "Send contract immediately"
        }
    },
    {
        id: "act_003",
        type: "email",
        lead: "Sara Mahmoud",
        date: "2024-01-22",
        duration: 5,
        notes: "Sent initial proposal and pricing information",
        outcome: "Neutral",
        nextAction: "Follow up with discovery call",
        aiInsights: {
            sentiment: "Neutral",
            priority: "Medium",
            recommendedFollowUp: "Schedule discovery call this week"
        }
    },
    {
        id: "act_004",
        type: "call",
        lead: "Ahmed Hassan",
        date: "2024-01-18",
        duration: 45,
        notes: "Initial discovery call - discussed pain points and requirements",
        outcome: "Positive",
        nextAction: "Send detailed proposal",
        aiInsights: {
            sentiment: "Positive",
            priority: "High",
            recommendedFollowUp: "Send proposal within 24 hours"
        }
    },
    {
        id: "act_005",
        type: "meeting",
        lead: "Sara Mahmoud",
        date: "2024-01-21",
        duration: 30,
        notes: "Qualification call - confirmed budget and decision timeline",
        outcome: "Positive",
        nextAction: "Send pricing guide and case studies",
        aiInsights: {
            sentiment: "Positive",
            priority: "Medium",
            recommendedFollowUp: "Send relevant case studies"
        }
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { lead, type, outcome, dateFrom, dateTo } = req.query

        let filteredActivities = [...mockActivities]

        if (lead) {
            filteredActivities = filteredActivities.filter(activity => activity.lead === lead)
        }

        if (type) {
            filteredActivities = filteredActivities.filter(activity => activity.type === type)
        }

        if (outcome) {
            filteredActivities = filteredActivities.filter(activity => activity.outcome === outcome)
        }

        if (dateFrom) {
            filteredActivities = filteredActivities.filter(activity => activity.date >= dateFrom.toString())
        }

        if (dateTo) {
            filteredActivities = filteredActivities.filter(activity => activity.date <= dateTo.toString())
        }

        // Sort by date (newest first)
        filteredActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        res.status(200).json({
            success: true,
            data: filteredActivities,
            total: filteredActivities.length,
            summary: {
                totalDuration: filteredActivities.reduce((sum, activity) => sum + activity.duration, 0),
                averageDuration: Math.round(filteredActivities.reduce((sum, activity) => sum + activity.duration, 0) / filteredActivities.length),
                positiveOutcomes: filteredActivities.filter(activity => activity.outcome.includes('Positive')).length,
                activitiesByType: filteredActivities.reduce((acc, activity) => {
                    acc[activity.type] = (acc[activity.type] || 0) + 1
                    return acc
                }, {} as Record<string, number>)
            }
        })
    } else if (req.method === 'POST') {
        const newActivity = {
            id: `act_${Date.now()}`,
            ...req.body,
            aiInsights: {
                sentiment: req.body.outcome === 'Positive' || req.body.outcome === 'Very Positive' ? 'Positive' : 'Neutral',
                priority: req.body.duration > 30 ? 'High' : 'Medium',
                recommendedFollowUp: 'Schedule follow-up based on outcome'
            }
        }

        mockActivities.push(newActivity)

        res.status(201).json({
            success: true,
            data: newActivity,
            message: 'Activity created successfully'
        })
    } else if (req.method === 'PUT') {
        const { id } = req.query
        const activityIndex = mockActivities.findIndex(activity => activity.id === id)

        if (activityIndex === -1) {
            return res.status(404).json({ error: 'Activity not found' })
        }

        mockActivities[activityIndex] = { ...mockActivities[activityIndex], ...req.body }

        res.status(200).json({
            success: true,
            data: mockActivities[activityIndex],
            message: 'Activity updated successfully'
        })
    } else if (req.method === 'DELETE') {
        const { id } = req.query
        const activityIndex = mockActivities.findIndex(activity => activity.id === id)

        if (activityIndex === -1) {
            return res.status(404).json({ error: 'Activity not found' })
        }

        mockActivities.splice(activityIndex, 1)

        res.status(200).json({
            success: true,
            message: 'Activity deleted successfully'
        })
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).json({ error: 'Method not allowed' })
    }
} 