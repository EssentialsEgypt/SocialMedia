import { NextApiRequest, NextApiResponse } from 'next'

interface ScalingLog {
    id: string
    campaignId: string
    scalingType: 'budget_increase' | 'budget_decrease' | 'audience_expansion' | 'creative_rotation'
    oldValue: number
    newValue: number
    percentageChange: number
    successScore: number
    notes: string
    createdAt: string
}

interface AudienceOverlap {
    id: string
    adSet1Id: string
    adSet2Id: string
    overlapPercentage: number
    recommendation: 'merge' | 'expand' | 'keep_separate'
    teamId: string
    createdAt: string
}

interface PerformanceMetrics {
    date: string
    roas: number
    ctr: number
    spend: number
    impressions: number
    clicks: number
    conversions: number
    revenue: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { type } = req.query

            if (type === 'scaling-logs') {
                const scalingLogs: ScalingLog[] = [
                    {
                        id: "1",
                        campaignId: "1",
                        scalingType: "budget_increase",
                        oldValue: 5000,
                        newValue: 7500,
                        percentageChange: 50,
                        successScore: 85,
                        notes: "ROAS improved from 2.5x to 2.8x after scaling",
                        createdAt: "2024-01-05T14:20:00Z"
                    },
                    {
                        id: "2",
                        campaignId: "2",
                        scalingType: "audience_expansion",
                        oldValue: 100000,
                        newValue: 150000,
                        percentageChange: 50,
                        successScore: 72,
                        notes: "Reached new audience segments, CTR maintained",
                        createdAt: "2024-01-03T09:15:00Z"
                    },
                    {
                        id: "3",
                        campaignId: "3",
                        scalingType: "budget_decrease",
                        oldValue: 2000,
                        newValue: 1000,
                        percentageChange: -50,
                        successScore: 90,
                        notes: "Reduced budget due to poor performance, saved $800",
                        createdAt: "2024-01-01T16:30:00Z"
                    }
                ]

                res.status(200).json({ success: true, data: scalingLogs })
            } else if (type === 'audience-overlaps') {
                const audienceOverlaps: AudienceOverlap[] = [
                    {
                        id: "1",
                        adSet1Id: "adset-1",
                        adSet2Id: "adset-2",
                        overlapPercentage: 35,
                        recommendation: "merge",
                        teamId: "team-1",
                        createdAt: "2024-01-08T10:00:00Z"
                    },
                    {
                        id: "2",
                        adSet1Id: "adset-3",
                        adSet2Id: "adset-4",
                        overlapPercentage: 12,
                        recommendation: "keep_separate",
                        teamId: "team-1",
                        createdAt: "2024-01-07T15:30:00Z"
                    },
                    {
                        id: "3",
                        adSet1Id: "adset-5",
                        adSet2Id: "adset-6",
                        overlapPercentage: 68,
                        recommendation: "merge",
                        teamId: "team-1",
                        createdAt: "2024-01-06T11:45:00Z"
                    }
                ]

                res.status(200).json({ success: true, data: audienceOverlaps })
            } else if (type === 'performance-metrics') {
                const performanceMetrics: PerformanceMetrics[] = [
                    { date: "Jan 1", roas: 2.1, ctr: 2.8, spend: 1200, impressions: 45000, clicks: 1260, conversions: 25, revenue: 2520 },
                    { date: "Jan 2", roas: 2.3, ctr: 3.1, spend: 1350, impressions: 48000, clicks: 1488, conversions: 28, revenue: 3105 },
                    { date: "Jan 3", roas: 2.5, ctr: 3.2, spend: 1400, impressions: 52000, clicks: 1664, conversions: 32, revenue: 3500 },
                    { date: "Jan 4", roas: 2.8, ctr: 3.0, spend: 1500, impressions: 55000, clicks: 1650, conversions: 35, revenue: 4200 },
                    { date: "Jan 5", roas: 2.7, ctr: 2.9, spend: 1450, impressions: 53000, clicks: 1537, conversions: 33, revenue: 3915 },
                    { date: "Jan 6", roas: 2.9, ctr: 3.3, spend: 1600, impressions: 58000, clicks: 1914, conversions: 38, revenue: 4640 },
                    { date: "Jan 7", roas: 3.1, ctr: 3.5, spend: 1700, impressions: 62000, clicks: 2170, conversions: 42, revenue: 5270 }
                ]

                res.status(200).json({ success: true, data: performanceMetrics })
            } else if (type === 'cost-efficiency') {
                const costEfficiencyData = [
                    { name: "Summer Sale", roas: 2.78, cpa: 35.96, quadrant: "best" },
                    { name: "Retargeting", roas: 2.57, cpa: 46.67, quadrant: "potential" },
                    { name: "Cold Traffic", roas: 0.67, cpa: 150.0, quadrant: "wasting" },
                    { name: "Lookalike Test", roas: 1.8, cpa: 55.0, quadrant: "expensive" }
                ]

                res.status(200).json({ success: true, data: costEfficiencyData })
            } else {
                res.status(400).json({ success: false, error: 'Invalid analytics type' })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch analytics data' })
        }
    } else if (req.method === 'POST') {
        try {
            const { type, data } = req.body

            if (type === 'scaling-log') {
                // Simulate creating a new scaling log
                const newScalingLog: ScalingLog = {
                    id: Date.now().toString(),
                    campaignId: data.campaignId,
                    scalingType: data.scalingType,
                    oldValue: data.oldValue,
                    newValue: data.newValue,
                    percentageChange: data.percentageChange,
                    successScore: Math.floor(Math.random() * 30) + 70, // 70-100
                    notes: data.notes,
                    createdAt: new Date().toISOString()
                }

                console.log('New scaling log created:', newScalingLog)
                res.status(201).json({ success: true, data: newScalingLog })
            } else if (type === 'audience-overlap') {
                // Simulate creating a new audience overlap record
                const newOverlap: AudienceOverlap = {
                    id: Date.now().toString(),
                    adSet1Id: data.adSet1Id,
                    adSet2Id: data.adSet2Id,
                    overlapPercentage: data.overlapPercentage,
                    recommendation: data.recommendation,
                    teamId: data.teamId,
                    createdAt: new Date().toISOString()
                }

                console.log('New audience overlap created:', newOverlap)
                res.status(201).json({ success: true, data: newOverlap })
            } else {
                res.status(400).json({ success: false, error: 'Invalid analytics type' })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create analytics record' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
} 