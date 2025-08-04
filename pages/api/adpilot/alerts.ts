import { NextApiRequest, NextApiResponse } from 'next'

interface Alert {
    id: string
    type: 'performance_drop' | 'fatigue_warning' | 'budget_limit' | 'overlap_detected' | 'scaling_opportunity' | 'creative_test_complete'
    severity: 'info' | 'warning' | 'critical'
    title: string
    message: string
    campaignId?: string
    adId?: string
    read: boolean
    actionRequired: boolean
    actionTaken: boolean
    timestamp: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Mock alerts data
            const alerts: Alert[] = [
                {
                    id: "1",
                    type: "performance_drop",
                    severity: "warning",
                    title: "ROAS Drop Detected",
                    message: "Summer Sale Campaign ROAS dropped 15% in last 24h",
                    campaignId: "1",
                    read: false,
                    actionRequired: true,
                    actionTaken: false,
                    timestamp: "2 minutes ago"
                },
                {
                    id: "2",
                    type: "fatigue_warning",
                    severity: "critical",
                    title: "Ad Fatigue Imminent",
                    message: "Retargeting Warm Audience showing fatigue signs",
                    campaignId: "2",
                    read: false,
                    actionRequired: true,
                    actionTaken: false,
                    timestamp: "15 minutes ago"
                },
                {
                    id: "3",
                    type: "scaling_opportunity",
                    severity: "info",
                    title: "Scaling Opportunity",
                    message: "Cold Traffic Test ready for budget increase",
                    campaignId: "3",
                    read: true,
                    actionRequired: false,
                    actionTaken: false,
                    timestamp: "1 hour ago"
                },
                {
                    id: "4",
                    type: "overlap_detected",
                    severity: "warning",
                    title: "Audience Overlap Detected",
                    message: "35% overlap between Ad Set 1 and Ad Set 2",
                    campaignId: "1",
                    read: false,
                    actionRequired: true,
                    actionTaken: false,
                    timestamp: "3 hours ago"
                },
                {
                    id: "5",
                    type: "creative_test_complete",
                    severity: "info",
                    title: "Creative Test Complete",
                    message: "Hook Test - Version B won with 95% confidence",
                    campaignId: "2",
                    read: true,
                    actionRequired: false,
                    actionTaken: true,
                    timestamp: "1 day ago"
                }
            ]

            res.status(200).json({ success: true, data: alerts })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch alerts' })
        }
    } else if (req.method === 'POST') {
        try {
            const { type, severity, title, message, campaignId, adId, actionRequired } = req.body

            // Simulate creating a new alert
            const newAlert: Alert = {
                id: Date.now().toString(),
                type,
                severity,
                title,
                message,
                campaignId,
                adId,
                read: false,
                actionRequired: actionRequired || false,
                actionTaken: false,
                timestamp: "just now"
            }

            // In a real implementation, this would be saved to Supabase
            console.log('New alert created:', newAlert)

            res.status(201).json({ success: true, data: newAlert })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create alert' })
        }
    } else if (req.method === 'PUT') {
        try {
            const { alertId, updates } = req.body

            // Simulate updating an alert (e.g., marking as read, action taken)
            const updatedAlert = {
                id: alertId,
                ...updates,
                updatedAt: new Date().toISOString()
            }

            // In a real implementation, this would update Supabase
            console.log('Alert updated:', updatedAlert)

            res.status(200).json({ success: true, data: updatedAlert })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to update alert' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
} 