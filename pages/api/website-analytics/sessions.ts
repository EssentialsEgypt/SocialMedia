import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for sessions with AI-powered behavior analysis
const mockSessions = [
    {
        id: '1',
        sessionId: 'sess_001',
        userId: 'user_123',
        device: 'mobile',
        source: 'social',
        duration: 245,
        pages: 3,
        scrollDepth: 78,
        rageClicks: 0,
        exits: 0,
        aiLabel: 'intent',
        aiSummary: 'User showed strong purchase intent, viewed multiple products and spent significant time on pricing pages',
        timestamp: new Date(),
        revenue: 299,
        products: ['product_1', 'product_2'],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        location: 'Cairo, Egypt',
        referrer: 'instagram.com'
    },
    {
        id: '2',
        sessionId: 'sess_002',
        userId: 'user_456',
        device: 'desktop',
        source: 'organic',
        duration: 89,
        pages: 1,
        scrollDepth: 23,
        rageClicks: 2,
        exits: 1,
        aiLabel: 'frustration',
        aiSummary: 'User experienced frustration with navigation, made multiple rage clicks and exited quickly',
        timestamp: new Date(),
        revenue: 0,
        products: [],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        location: 'Alexandria, Egypt',
        referrer: 'google.com'
    },
    {
        id: '3',
        sessionId: 'sess_003',
        userId: 'user_789',
        device: 'mobile',
        source: 'paid',
        duration: 567,
        pages: 5,
        scrollDepth: 92,
        rageClicks: 0,
        exits: 0,
        aiLabel: 'purchase',
        aiSummary: 'User completed a purchase journey, viewed product details, reviews, and successfully checked out',
        timestamp: new Date(),
        revenue: 599,
        products: ['product_3', 'product_4'],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
        location: 'Giza, Egypt',
        referrer: 'facebook.com'
    },
    {
        id: '4',
        sessionId: 'sess_004',
        userId: 'user_101',
        device: 'tablet',
        source: 'direct',
        duration: 123,
        pages: 2,
        scrollDepth: 45,
        rageClicks: 1,
        exits: 0,
        aiLabel: 'exploration',
        aiSummary: 'User explored the site casually, viewed multiple categories but showed no strong purchase intent',
        timestamp: new Date(),
        revenue: 0,
        products: ['product_5'],
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X)',
        location: 'Sharm El Sheikh, Egypt',
        referrer: 'direct'
    },
    {
        id: '5',
        sessionId: 'sess_005',
        userId: 'user_202',
        device: 'desktop',
        source: 'email',
        duration: 34,
        pages: 1,
        scrollDepth: 12,
        rageClicks: 3,
        exits: 1,
        aiLabel: 'confusion',
        aiSummary: 'User appeared confused by the interface, made multiple rage clicks and left quickly',
        timestamp: new Date(),
        revenue: 0,
        products: [],
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        location: 'Luxor, Egypt',
        referrer: 'mail.google.com'
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // In a real implementation, this would:
        // 1. Query your analytics database (Google Analytics, Mixpanel, etc.)
        // 2. Process session data with AI for behavior analysis
        // 3. Apply machine learning models for session labeling
        // 4. Calculate engagement metrics and revenue attribution

        // Simulate API processing delay
        await new Promise(resolve => setTimeout(resolve, 100))

        // Filter sessions based on query parameters
        let filteredSessions = [...mockSessions]

        const { device, source, aiLabel, startDate, endDate } = req.query

        if (device && device !== 'all') {
            filteredSessions = filteredSessions.filter(s => s.device === device)
        }

        if (source && source !== 'all') {
            filteredSessions = filteredSessions.filter(s => s.source === source)
        }

        if (aiLabel && aiLabel !== 'all') {
            filteredSessions = filteredSessions.filter(s => s.aiLabel === aiLabel)
        }

        // Calculate analytics metrics
        const totalSessions = filteredSessions.length
        const totalRevenue = filteredSessions.reduce((sum, s) => sum + (s.revenue || 0), 0)
        const avgDuration = filteredSessions.reduce((sum, s) => sum + s.duration, 0) / totalSessions
        const avgScrollDepth = filteredSessions.reduce((sum, s) => sum + s.scrollDepth, 0) / totalSessions
        const totalRageClicks = filteredSessions.reduce((sum, s) => sum + s.rageClicks, 0)
        const conversionRate = filteredSessions.filter(s => s.revenue > 0).length / totalSessions

        // AI-powered insights
        const insights = {
            topBehavior: filteredSessions.reduce((acc, s) => {
                acc[s.aiLabel] = (acc[s.aiLabel] || 0) + 1
                return acc
            }, {} as Record<string, number>),
            deviceBreakdown: filteredSessions.reduce((acc, s) => {
                acc[s.device] = (acc[s.device] || 0) + 1
                return acc
            }, {} as Record<string, number>),
            sourceBreakdown: filteredSessions.reduce((acc, s) => {
                acc[s.source] = (acc[s.source] || 0) + 1
                return acc
            }, {} as Record<string, number>)
        }

        return res.status(200).json({
            success: true,
            data: {
                sessions: filteredSessions,
                metrics: {
                    totalSessions,
                    totalRevenue,
                    avgDuration: Math.round(avgDuration),
                    avgScrollDepth: Math.round(avgScrollDepth),
                    totalRageClicks,
                    conversionRate: Math.round(conversionRate * 100) / 100
                },
                insights
            }
        })

    } catch (error) {
        console.error('Sessions API error:', error)
        return res.status(500).json({
            success: false,
            error: 'Failed to load session data'
        })
    }
} 