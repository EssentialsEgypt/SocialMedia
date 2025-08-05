import { NextApiRequest, NextApiResponse } from 'next'

// Mock data for product funnel analysis
const mockProductFunnels = [
    {
        productId: 'prod_001',
        productName: 'Limited Edition Hoodie',
        views: 1250,
        scrollDepth: 78,
        addToCart: 89,
        zoomCount: 156,
        reviewViews: 234,
        checkouts: 45,
        conversionRate: 0.036,
        revenue: 13455,
        aiRecommendation: 'Strong product performance. Consider featuring in homepage hero section',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: { views: 875, addToCart: 62, checkouts: 32, conversionRate: 0.037 },
            desktop: { views: 250, addToCart: 18, checkouts: 9, conversionRate: 0.036 },
            tablet: { views: 125, addToCart: 9, checkouts: 4, conversionRate: 0.032 }
        },
        funnelStages: [
            { stage: 'View', count: 1250, rate: 1.0 },
            { stage: 'Scroll', count: 975, rate: 0.78 },
            { stage: 'Zoom', count: 156, rate: 0.125 },
            { stage: 'Add to Cart', count: 89, rate: 0.071 },
            { stage: 'Checkout', count: 45, rate: 0.036 }
        ]
    },
    {
        productId: 'prod_002',
        productName: 'BAPE Tee',
        views: 980,
        scrollDepth: 82,
        addToCart: 67,
        zoomCount: 134,
        reviewViews: 189,
        checkouts: 38,
        conversionRate: 0.039,
        revenue: 11500,
        aiRecommendation: 'Good performance with room for optimization. Test different product images',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: { views: 686, addToCart: 47, checkouts: 27, conversionRate: 0.039 },
            desktop: { views: 196, addToCart: 13, checkouts: 7, conversionRate: 0.036 },
            tablet: { views: 98, addToCart: 7, checkouts: 4, conversionRate: 0.041 }
        },
        funnelStages: [
            { stage: 'View', count: 980, rate: 1.0 },
            { stage: 'Scroll', count: 804, rate: 0.82 },
            { stage: 'Zoom', count: 134, rate: 0.137 },
            { stage: 'Add to Cart', count: 67, rate: 0.068 },
            { stage: 'Checkout', count: 38, rate: 0.039 }
        ]
    },
    {
        productId: 'prod_003',
        productName: 'Sneakers',
        views: 1100,
        scrollDepth: 75,
        addToCart: 72,
        zoomCount: 198,
        reviewViews: 267,
        checkouts: 41,
        conversionRate: 0.037,
        revenue: 13100,
        aiRecommendation: 'High zoom rate indicates strong interest. Optimize product descriptions',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: { views: 770, addToCart: 50, checkouts: 29, conversionRate: 0.038 },
            desktop: { views: 220, addToCart: 14, checkouts: 8, conversionRate: 0.036 },
            tablet: { views: 110, addToCart: 8, checkouts: 4, conversionRate: 0.036 }
        },
        funnelStages: [
            { stage: 'View', count: 1100, rate: 1.0 },
            { stage: 'Scroll', count: 825, rate: 0.75 },
            { stage: 'Zoom', count: 198, rate: 0.18 },
            { stage: 'Add to Cart', count: 72, rate: 0.065 },
            { stage: 'Checkout', count: 41, rate: 0.037 }
        ]
    },
    {
        productId: 'prod_004',
        productName: 'Accessories',
        views: 650,
        scrollDepth: 68,
        addToCart: 45,
        zoomCount: 89,
        reviewViews: 123,
        checkouts: 28,
        conversionRate: 0.043,
        revenue: 6800,
        aiRecommendation: 'High conversion rate for accessories. Consider cross-selling opportunities',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: { views: 455, addToCart: 32, checkouts: 20, conversionRate: 0.044 },
            desktop: { views: 130, addToCart: 9, checkouts: 5, conversionRate: 0.038 },
            tablet: { views: 65, addToCart: 4, checkouts: 3, conversionRate: 0.046 }
        },
        funnelStages: [
            { stage: 'View', count: 650, rate: 1.0 },
            { stage: 'Scroll', count: 442, rate: 0.68 },
            { stage: 'Zoom', count: 89, rate: 0.137 },
            { stage: 'Add to Cart', count: 45, rate: 0.069 },
            { stage: 'Checkout', count: 28, rate: 0.043 }
        ]
    },
    {
        productId: 'prod_005',
        productName: 'New Arrivals',
        views: 890,
        scrollDepth: 71,
        addToCart: 58,
        zoomCount: 145,
        reviewViews: 178,
        checkouts: 32,
        conversionRate: 0.036,
        revenue: 5200,
        aiRecommendation: 'Moderate performance. Test different product positioning and pricing',
        lastUpdated: new Date(),
        deviceBreakdown: {
            mobile: { views: 623, addToCart: 41, checkouts: 23, conversionRate: 0.037 },
            desktop: { views: 178, addToCart: 12, checkouts: 6, conversionRate: 0.034 },
            tablet: { views: 89, addToCart: 5, checkouts: 3, conversionRate: 0.034 }
        },
        funnelStages: [
            { stage: 'View', count: 890, rate: 1.0 },
            { stage: 'Scroll', count: 632, rate: 0.71 },
            { stage: 'Zoom', count: 145, rate: 0.163 },
            { stage: 'Add to Cart', count: 58, rate: 0.065 },
            { stage: 'Checkout', count: 32, rate: 0.036 }
        ]
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // In a real implementation, this would:
        // 1. Track detailed product interaction data from your e-commerce platform
        // 2. Calculate conversion rates at each funnel stage
        // 3. Use AI to analyze product performance patterns
        // 4. Generate recommendations for product optimization

        // Simulate API processing delay
        await new Promise(resolve => setTimeout(resolve, 130))

        // Filter product funnels based on query parameters
        let filteredFunnels = [...mockProductFunnels]

        const { productId, device, conversionRate } = req.query

        if (productId) {
            filteredFunnels = filteredFunnels.filter(p => p.productId === productId)
        }

        if (device && device !== 'all') {
            filteredFunnels = filteredFunnels.map(p => ({
                ...p,
                deviceBreakdown: { [device]: p.deviceBreakdown[device as keyof typeof p.deviceBreakdown] }
            }))
        }

        if (conversionRate) {
            const minRate = parseFloat(conversionRate as string)
            filteredFunnels = filteredFunnels.filter(p => p.conversionRate >= minRate)
        }

        // Calculate analytics metrics
        const totalProducts = filteredFunnels.length
        const totalViews = filteredFunnels.reduce((sum, p) => sum + p.views, 0)
        const totalRevenue = filteredFunnels.reduce((sum, p) => sum + p.revenue, 0)
        const avgConversionRate = filteredFunnels.reduce((sum, p) => sum + p.conversionRate, 0) / totalProducts
        const avgScrollDepth = filteredFunnels.reduce((sum, p) => sum + p.scrollDepth, 0) / totalProducts

        // AI-powered insights
        const insights = {
            topPerformingProducts: filteredFunnels
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 3)
                .map(p => ({ name: p.productName, revenue: p.revenue, conversionRate: p.conversionRate })),
            highConversionProducts: filteredFunnels
                .filter(p => p.conversionRate > 0.04)
                .map(p => ({ name: p.productName, conversionRate: p.conversionRate })),
            lowConversionProducts: filteredFunnels
                .filter(p => p.conversionRate < 0.035)
                .map(p => ({ name: p.productName, conversionRate: p.conversionRate })),
            devicePerformance: {
                mobile: {
                    totalViews: filteredFunnels.reduce((sum, p) => sum + p.deviceBreakdown.mobile.views, 0),
                    avgConversionRate: filteredFunnels.reduce((sum, p) => sum + p.deviceBreakdown.mobile.conversionRate, 0) / totalProducts
                },
                desktop: {
                    totalViews: filteredFunnels.reduce((sum, p) => sum + p.deviceBreakdown.desktop.views, 0),
                    avgConversionRate: filteredFunnels.reduce((sum, p) => sum + p.deviceBreakdown.desktop.conversionRate, 0) / totalProducts
                },
                tablet: {
                    totalViews: filteredFunnels.reduce((sum, p) => sum + p.deviceBreakdown.tablet.views, 0),
                    avgConversionRate: filteredFunnels.reduce((sum, p) => sum + p.deviceBreakdown.tablet.conversionRate, 0) / totalProducts
                }
            }
        }

        // Generate AI recommendations
        const recommendations = filteredFunnels
            .filter(p => p.conversionRate < 0.035)
            .map(p => ({
                productId: p.productId,
                productName: p.productName,
                issue: 'Low conversion rate',
                action: p.aiRecommendation,
                priority: p.conversionRate < 0.03 ? 'high' : 'medium'
            }))

        return res.status(200).json({
            success: true,
            data: {
                productFunnels: filteredFunnels,
                metrics: {
                    totalProducts,
                    totalViews,
                    totalRevenue,
                    avgConversionRate: Math.round(avgConversionRate * 1000) / 1000,
                    avgScrollDepth: Math.round(avgScrollDepth)
                },
                insights,
                recommendations
            }
        })

    } catch (error) {
        console.error('Product funnels API error:', error)
        return res.status(500).json({
            success: false,
            error: 'Failed to load product funnel data'
        })
    }
} 