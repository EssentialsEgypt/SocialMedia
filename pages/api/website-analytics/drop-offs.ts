import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for drop-off analysis
const mockDropOffs = [
    {
        id: '1',
        page: '/collections/bape',
        section: 'Product Grid',
        element: 'Filter Options',
        dropOffRate: 0.34,
        sessions: 156,
        aiInsight: 'Complex filter options are causing confusion and high drop-off rates',
        priority: 'high',
        suggestedAction: 'Simplify filter interface and add guided filtering',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: 0.42,
            desktop: 0.28,
            tablet: 0.31
        },
        sourceBreakdown: {
            social: 0.38,
            organic: 0.25,
            paid: 0.45,
            direct: 0.22
        },
        userBehavior: {
            avgTimeOnPage: 23,
            avgScrollDepth: 45,
            rageClicks: 12,
            hoverBacks: 8
        }
    },
    {
        id: '2',
        page: '/products/limited-hoodie',
        section: 'Product Details',
        element: 'Size Selector',
        dropOffRate: 0.28,
        sessions: 89,
        aiInsight: 'Size selector lacks visual feedback and size guide integration',
        priority: 'medium',
        suggestedAction: 'Add size guide popup and visual size indicators',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: 0.35,
            desktop: 0.22,
            tablet: 0.29
        },
        sourceBreakdown: {
            social: 0.32,
            organic: 0.20,
            paid: 0.38,
            direct: 0.18
        },
        userBehavior: {
            avgTimeOnPage: 67,
            avgScrollDepth: 78,
            rageClicks: 5,
            hoverBacks: 3
        }
    },
    {
        id: '3',
        page: '/cart',
        section: 'Shopping Cart',
        element: 'Checkout Button',
        dropOffRate: 0.18,
        sessions: 234,
        aiInsight: 'Checkout process is working well, but could benefit from trust indicators',
        priority: 'low',
        suggestedAction: 'Add security badges and customer testimonials',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: 0.22,
            desktop: 0.15,
            tablet: 0.19
        },
        sourceBreakdown: {
            social: 0.25,
            organic: 0.12,
            paid: 0.28,
            direct: 0.10
        },
        userBehavior: {
            avgTimeOnPage: 45,
            avgScrollDepth: 92,
            rageClicks: 2,
            hoverBacks: 1
        }
    },
    {
        id: '4',
        page: '/collections/new-arrivals',
        section: 'Product Grid',
        element: 'Load More Button',
        dropOffRate: 0.41,
        sessions: 78,
        aiInsight: 'Load more functionality is causing significant user frustration',
        priority: 'critical',
        suggestedAction: 'Implement infinite scroll or pagination with better UX',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: 0.48,
            desktop: 0.35,
            tablet: 0.42
        },
        sourceBreakdown: {
            social: 0.45,
            organic: 0.32,
            paid: 0.52,
            direct: 0.28
        },
        userBehavior: {
            avgTimeOnPage: 34,
            avgScrollDepth: 67,
            rageClicks: 18,
            hoverBacks: 12
        }
    },
    {
        id: '5',
        page: '/checkout',
        section: 'Payment Form',
        element: 'Payment Method Selection',
        dropOffRate: 0.15,
        sessions: 189,
        aiInsight: 'Payment process is smooth, but some users prefer different payment methods',
        priority: 'medium',
        suggestedAction: 'Add more payment options and improve mobile payment UX',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: 0.18,
            desktop: 0.12,
            tablet: 0.16
        },
        sourceBreakdown: {
            social: 0.20,
            organic: 0.10,
            paid: 0.22,
            direct: 0.08
        },
        userBehavior: {
            avgTimeOnPage: 89,
            avgScrollDepth: 95,
            rageClicks: 3,
            hoverBacks: 2
        }
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // In a real implementation, this would:
        // 1. Analyze user session data to identify drop-off points
        // 2. Use machine learning to detect patterns in user behavior
        // 3. Apply AI to generate insights and recommendations
        // 4. Calculate drop-off rates across different segments

        // Simulate API processing delay
        await new Promise(resolve => setTimeout(resolve, 150))

        // Filter drop-offs based on query parameters
        let filteredDropOffs = [...mockDropOffs]

        const { priority, page, device, source } = req.query

        if (priority && priority !== 'all') {
            filteredDropOffs = filteredDropOffs.filter(d => d.priority === priority)
        }

        if (page) {
            filteredDropOffs = filteredDropOffs.filter(d => d.page.includes(page as string))
        }

        // Calculate analytics metrics
        const totalDropOffs = filteredDropOffs.length
        const avgDropOffRate = filteredDropOffs.reduce((sum, d) => sum + d.dropOffRate, 0) / totalDropOffs
        const totalSessions = filteredDropOffs.reduce((sum, d) => sum + d.sessions, 0)
        const criticalIssues = filteredDropOffs.filter(d => d.priority === 'critical').length
        const highPriorityIssues = filteredDropOffs.filter(d => d.priority === 'high').length

        // AI-powered insights
        const insights = {
            topDropOffPages: filteredDropOffs
                .sort((a, b) => b.dropOffRate - a.dropOffRate)
                .slice(0, 3)
                .map(d => ({ page: d.page, rate: d.dropOffRate })),
            deviceAnalysis: {
                mobile: filteredDropOffs.reduce((sum, d) => sum + d.deviceBreakdown.mobile, 0) / totalDropOffs,
                desktop: filteredDropOffs.reduce((sum, d) => sum + d.deviceBreakdown.desktop, 0) / totalDropOffs,
                tablet: filteredDropOffs.reduce((sum, d) => sum + d.deviceBreakdown.tablet, 0) / totalDropOffs
            },
            sourceAnalysis: {
                social: filteredDropOffs.reduce((sum, d) => sum + d.sourceBreakdown.social, 0) / totalDropOffs,
                organic: filteredDropOffs.reduce((sum, d) => sum + d.sourceBreakdown.organic, 0) / totalDropOffs,
                paid: filteredDropOffs.reduce((sum, d) => sum + d.sourceBreakdown.paid, 0) / totalDropOffs,
                direct: filteredDropOffs.reduce((sum, d) => sum + d.sourceBreakdown.direct, 0) / totalDropOffs
            }
        }

        // Generate AI recommendations
        const recommendations = filteredDropOffs
            .filter(d => d.priority === 'critical' || d.priority === 'high')
            .map(d => ({
                page: d.page,
                element: d.element,
                action: d.suggestedAction,
                priority: d.priority,
                impact: d.dropOffRate > 0.3 ? 'high' : d.dropOffRate > 0.2 ? 'medium' : 'low'
            }))

        return res.status(200).json({
            success: true,
            data: {
                dropOffs: filteredDropOffs,
                metrics: {
                    totalDropOffs,
                    avgDropOffRate: Math.round(avgDropOffRate * 100) / 100,
                    totalSessions,
                    criticalIssues,
                    highPriorityIssues
                },
                insights,
                recommendations
            }
        })

    } catch (error) {
        console.error('Drop-offs API error:', error)
        return res.status(500).json({
            success: false,
            error: 'Failed to load drop-off data'
        })
    }
} 