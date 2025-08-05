import { NextApiRequest, NextApiResponse } from 'next'

// Mock analytics data for chat responses
const mockAnalyticsData = {
    sessions: {
        total: 1247,
        mobile: 890,
        desktop: 234,
        tablet: 123,
        conversionRate: 0.071,
        avgDuration: 245,
        topSources: ['social', 'organic', 'paid']
    },
    products: {
        trending: ['Limited Hoodie', 'BAPE Tee', 'Sneakers', 'Accessories'],
        topPerforming: [
            { name: 'Limited Hoodie', revenue: 13400, conversionRate: 0.086 },
            { name: 'BAPE Tee', revenue: 11500, conversionRate: 0.086 },
            { name: 'Sneakers', revenue: 13100, conversionRate: 0.082 }
        ],
        worstPerforming: [
            { name: 'Old Collection', revenue: 1200, conversionRate: 0.015 },
            { name: 'Out of Stock Items', revenue: 800, conversionRate: 0.012 }
        ]
    },
    dropOffs: {
        critical: [
            { page: '/collections/new-arrivals', element: 'Load More Button', rate: 0.41 },
            { page: '/collections/bape', element: 'Filter Options', rate: 0.34 }
        ],
        total: 5,
        avgRate: 0.272
    },
    segments: {
        bestConverting: 'Returning users on iPhone',
        conversionRate: 0.084,
        deviceBreakdown: {
            mobile: { sessions: 890, conversionRate: 0.075 },
            desktop: { sessions: 234, conversionRate: 0.068 },
            tablet: { sessions: 123, conversionRate: 0.065 }
        }
    },
    revenue: {
        total: 45600,
        daily: 3800,
        weekly: 26600,
        monthly: 114000,
        topZones: [
            { zone: 'Best Sellers Section', revenue: 38000 },
            { zone: 'Header Navigation', revenue: 12000 },
            { zone: 'Product Grid', revenue: 8900 }
        ]
    }
}

// AI response patterns for different query types
const responsePatterns = {
    trending: {
        products: "Based on recent analytics, the trending products in BAPE this week are: Limited Hoodie, BAPE Tee, Sneakers, and Accessories. The Limited Hoodie is generating the highest revenue at $13,400 with an 8.6% conversion rate.",
        general: "Your website is showing strong performance with 1,247 total sessions and a 7.1% conversion rate. Mobile traffic is leading with 890 sessions, and social media is your top traffic source."
    },
    dropOff: {
        analysis: "I've identified several critical drop-off points: The Load More Button on the New Arrivals page has a 41% drop-off rate, and the Filter Options on the BAPE collection page has a 34% drop-off rate. These are high-priority issues that need immediate attention.",
        recommendations: "To reduce drop-offs, I recommend: 1) Implementing infinite scroll instead of the Load More button, 2) Simplifying the filter interface with guided filtering, 3) Adding visual feedback for user interactions."
    },
    device: {
        comparison: "Device performance comparison: Mobile leads with 890 sessions and 7.5% conversion rate, Desktop has 234 sessions with 6.8% conversion, and Tablet shows 123 sessions with 6.5% conversion. Mobile optimization is working well.",
        recommendations: "Your mobile performance is strong, but consider: 1) Optimizing tablet experience further, 2) Improving desktop conversion rates, 3) Testing mobile-specific features like swipe gestures."
    },
    segments: {
        best: "Your best converting segment is 'Returning users on iPhone' with an 8.4% conversion rate. This suggests strong brand loyalty and mobile optimization success.",
        analysis: "Segment analysis shows: Returning users convert at 8.4% vs new users at 5.2%, Mobile users convert at 7.5% vs desktop at 6.8%, Social traffic converts at 7.8% vs organic at 6.5%."
    },
    revenue: {
        overview: "Revenue overview: Total revenue is $45,600, averaging $3,800 daily. Your Best Sellers Section generates $38,000, followed by Header Navigation at $12,000, and Product Grid at $8,900.",
        zones: "Top revenue-generating zones: 1) Best Sellers Section ($38,000), 2) Header Navigation ($12,000), 3) Product Grid ($8,900). The Best Sellers section is your highest-performing area with strong product placement."
    },
    performance: {
        general: "Overall website performance: 1,247 sessions, 7.1% conversion rate, $45,600 revenue. Mobile traffic dominates with 71% of sessions. Social media is your top traffic source, and the Best Sellers section is your highest-revenue zone.",
        metrics: "Key metrics: Sessions: 1,247, Conversion Rate: 7.1%, Average Session Duration: 245 seconds, Total Revenue: $45,600, Mobile Traffic: 71%, Top Source: Social Media."
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { message } = req.body

        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            })
        }

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 200))

        // Simple keyword-based response system
        // In a real implementation, this would use OpenAI GPT-4 for natural language processing
        const lowerMessage = message.toLowerCase()
        let response = ''
        let data = null

        if (lowerMessage.includes('trending') || lowerMessage.includes('bape')) {
            if (lowerMessage.includes('product')) {
                response = responsePatterns.trending.products
                data = mockAnalyticsData.products.trending
            } else {
                response = responsePatterns.trending.general
                data = mockAnalyticsData.sessions
            }
        } else if (lowerMessage.includes('drop') || lowerMessage.includes('exit')) {
            if (lowerMessage.includes('analysis')) {
                response = responsePatterns.dropOff.analysis
                data = mockAnalyticsData.dropOffs
            } else {
                response = responsePatterns.dropOff.recommendations
                data = mockAnalyticsData.dropOffs.critical
            }
        } else if (lowerMessage.includes('mobile') || lowerMessage.includes('desktop') || lowerMessage.includes('device')) {
            if (lowerMessage.includes('comparison')) {
                response = responsePatterns.device.comparison
                data = mockAnalyticsData.segments.deviceBreakdown
            } else {
                response = responsePatterns.device.recommendations
                data = mockAnalyticsData.segments.deviceBreakdown
            }
        } else if (lowerMessage.includes('segment') || lowerMessage.includes('converting')) {
            if (lowerMessage.includes('best')) {
                response = responsePatterns.segments.best
                data = { bestSegment: mockAnalyticsData.segments.bestConverting, conversionRate: mockAnalyticsData.segments.conversionRate }
            } else {
                response = responsePatterns.segments.analysis
                data = mockAnalyticsData.segments
            }
        } else if (lowerMessage.includes('revenue') || lowerMessage.includes('money')) {
            if (lowerMessage.includes('zone')) {
                response = responsePatterns.revenue.zones
                data = mockAnalyticsData.revenue.topZones
            } else {
                response = responsePatterns.revenue.overview
                data = mockAnalyticsData.revenue
            }
        } else if (lowerMessage.includes('performance') || lowerMessage.includes('overview') || lowerMessage.includes('summary')) {
            if (lowerMessage.includes('metric')) {
                response = responsePatterns.performance.metrics
                data = mockAnalyticsData.sessions
            } else {
                response = responsePatterns.performance.general
                data = {
                    sessions: mockAnalyticsData.sessions,
                    revenue: mockAnalyticsData.revenue,
                    segments: mockAnalyticsData.segments
                }
            }
        } else {
            // Default response for unrecognized queries
            response = "I can help you with website analytics! Try asking about: trending products, drop-off analysis, device performance, best converting segments, revenue overview, or general performance metrics."
            data = { availableQueries: ['trending', 'drop-offs', 'device comparison', 'segments', 'revenue', 'performance'] }
        }

        return res.status(200).json({
            success: true,
            response,
            data
        })

    } catch (error) {
        console.error('Chat API error:', error)
        return res.status(500).json({
            success: false,
            error: 'Failed to process chat message'
        })
    }
} 