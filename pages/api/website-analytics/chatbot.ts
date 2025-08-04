import { NextApiRequest, NextApiResponse } from 'next'

interface ChatbotQuery {
    id: string
    user_id: string
    query: string
    response: string
    metrics_returned: any
    graphs_generated: string[]
    language: string
    created_at: string
}

interface AnalyticsData {
    sessions: any[]
    dropoffs: any[]
    products: any[]
    revenue: any[]
    competitors: any[]
}

// Mock analytics data for demonstration
const mockAnalyticsData: AnalyticsData = {
    sessions: [
        { device: 'mobile', count: 3568, conversion: 8.2 },
        { device: 'desktop', count: 1672, conversion: 4.1 },
        { device: 'tablet', count: 234, conversion: 6.8 }
    ],
    dropoffs: [
        { page: '/collections/hoodies', rate: 36.5, impact: 18500 },
        { page: '/products/bape-shark-hoodie', rate: 28.3, impact: 12500 },
        { page: '/checkout', rate: 18.7, impact: 8500 }
    ],
    products: [
        { name: 'BAPE Shark Hoodie', views: 1247, conversions: 78, revenue: 97500 },
        { name: 'Supreme Box Logo Tee', views: 892, conversions: 37, revenue: 46250 },
        { name: 'Nike Air Force 1', views: 1567, conversions: 94, revenue: 117500 }
    ],
    revenue: [
        { source: 'Instagram', amount: 42500, conversion: 8.9 },
        { source: 'Google', amount: 28750, conversion: 6.2 },
        { source: 'TikTok', amount: 52100, conversion: 12.4 }
    ],
    competitors: [
        { metric: 'bounce_rate', your_value: 38.7, industry_avg: 45.2, difference: -14.4 },
        { metric: 'aov', your_value: 1250, industry_avg: 850, difference: 47.1 },
        { metric: 'retention', your_value: 18.7, industry_avg: 12.3, difference: 52.0 }
    ]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { query, language = 'en' } = req.body
            
            if (!query) {
                return res.status(400).json({
                    success: false,
                    error: 'Query is required'
                })
            }
            
            // Process the query and generate AI response
            const aiResponse = await processQuery(query, language)
            
            const chatbotQuery: ChatbotQuery = {
                id: Date.now().toString(),
                user_id: 'user_123', // In real implementation, get from auth
                query,
                response: aiResponse.response,
                metrics_returned: aiResponse.metrics,
                graphs_generated: aiResponse.graphs,
                language,
                created_at: new Date().toISOString()
            }
            
            // In real implementation, save to database
            // await saveChatbotQuery(chatbotQuery)
            
            res.status(200).json({
                success: true,
                data: chatbotQuery,
                ai_analysis: aiResponse
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Failed to process query' 
            })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ 
            success: false, 
            error: `Method ${req.method} Not Allowed` 
        })
    }
}

async function processQuery(query: string, language: string) {
    const lowerQuery = query.toLowerCase()
    
    // Detect query type and generate appropriate response
    if (lowerQuery.includes('trending') || lowerQuery.includes('popular')) {
        return generateTrendingResponse(query, language)
    } else if (lowerQuery.includes('mobile') || lowerQuery.includes('desktop')) {
        return generateDeviceComparisonResponse(query, language)
    } else if (lowerQuery.includes('drop') || lowerQuery.includes('exit')) {
        return generateDropoffResponse(query, language)
    } else if (lowerQuery.includes('competitor') || lowerQuery.includes('compare')) {
        return generateCompetitorResponse(query, language)
    } else if (lowerQuery.includes('revenue') || lowerQuery.includes('sales')) {
        return generateRevenueResponse(query, language)
    } else if (lowerQuery.includes('conversion') || lowerQuery.includes('convert')) {
        return generateConversionResponse(query, language)
    } else {
        return generateGeneralResponse(query, language)
    }
}

function generateTrendingResponse(query: string, language: string) {
    const trendingProduct = mockAnalyticsData.products[0]
    
    const response = language === 'ar' 
        ? `أفضل المنتجات أداءً هذا الأسبوع هو ${trendingProduct.name} مع ${trendingProduct.views} مشاهدة و ${trendingProduct.conversions} تحويل و ${trendingProduct.revenue} جنيه إيرادات.`
        : `The top trending product this week is ${trendingProduct.name} with ${trendingProduct.views} views, ${trendingProduct.conversions} conversions, and ${trendingProduct.revenue} EGP in revenue.`
    
    return {
        response,
        metrics: {
            product_name: trendingProduct.name,
            views: trendingProduct.views,
            conversions: trendingProduct.conversions,
            revenue: trendingProduct.revenue
        },
        graphs: ['product_performance_chart.png'],
        confidence: 0.92
    }
}

function generateDeviceComparisonResponse(query: string, language: string) {
    const mobileData = mockAnalyticsData.sessions.find(s => s.device === 'mobile')
    const desktopData = mockAnalyticsData.sessions.find(s => s.device === 'desktop')
    
    const response = language === 'ar'
        ? `مقارنة الأجهزة: الهاتف المحمول لديه ${mobileData?.count} جلسة مع معدل تحويل ${mobileData?.conversion}%، بينما سطح المكتب لديه ${desktopData?.count} جلسة مع معدل تحويل ${desktopData?.conversion}%.`
        : `Device comparison: Mobile has ${mobileData?.count} sessions with ${mobileData?.conversion}% conversion rate, while desktop has ${desktopData?.count} sessions with ${desktopData?.conversion}% conversion rate.`
    
    return {
        response,
        metrics: {
            mobile: mobileData,
            desktop: desktopData,
            difference: mobileData && desktopData ? mobileData.conversion - desktopData.conversion : 0
        },
        graphs: ['device_comparison_chart.png'],
        confidence: 0.89
    }
}

function generateDropoffResponse(query: string, language: string) {
    const worstDropoff = mockAnalyticsData.dropoffs.reduce((prev, current) => 
        prev.rate > current.rate ? prev : current
    )
    
    const response = language === 'ar'
        ? `أعلى معدل انسحاب هو ${worstDropoff.rate}% في صفحة ${worstDropoff.page} مع تأثير إيرادات ${worstDropoff.impact} جنيه.`
        : `The highest drop-off rate is ${worstDropoff.rate}% on page ${worstDropoff.page} with ${worstDropoff.impact} EGP revenue impact.`
    
    return {
        response,
        metrics: {
            worst_dropoff: worstDropoff,
            total_dropoffs: mockAnalyticsData.dropoffs.length,
            average_rate: mockAnalyticsData.dropoffs.reduce((acc, d) => acc + d.rate, 0) / mockAnalyticsData.dropoffs.length
        },
        graphs: ['dropoff_analysis_chart.png'],
        confidence: 0.91
    }
}

function generateCompetitorResponse(query: string, language: string) {
    const bestMetric = mockAnalyticsData.competitors.reduce((prev, current) => 
        prev.difference > current.difference ? prev : current
    )
    
    const response = language === 'ar'
        ? `أفضل أداء مقارنة بالمنافسين هو ${bestMetric.metric.replace('_', ' ')} حيث نحن ${bestMetric.difference > 0 ? 'أفضل' : 'أسوأ'} بنسبة ${Math.abs(bestMetric.difference)}% من المتوسط الصناعي.`
        : `Best performance vs competitors is ${bestMetric.metric.replace('_', ' ')} where we are ${bestMetric.difference > 0 ? 'better' : 'worse'} by ${Math.abs(bestMetric.difference)}% than industry average.`
    
    return {
        response,
        metrics: {
            best_metric: bestMetric,
            all_metrics: mockAnalyticsData.competitors,
            average_difference: mockAnalyticsData.competitors.reduce((acc, m) => acc + m.difference, 0) / mockAnalyticsData.competitors.length
        },
        graphs: ['competitor_benchmark_chart.png'],
        confidence: 0.87
    }
}

function generateRevenueResponse(query: string, language: string) {
    const totalRevenue = mockAnalyticsData.revenue.reduce((acc, r) => acc + r.amount, 0)
    const bestSource = mockAnalyticsData.revenue.reduce((prev, current) => 
        prev.amount > current.amount ? prev : current
    )
    
    const response = language === 'ar'
        ? `إجمالي الإيرادات هو ${totalRevenue} جنيه. أفضل مصدر للدخل هو ${bestSource.source} مع ${bestSource.amount} جنيه و ${bestSource.conversion}% معدل تحويل.`
        : `Total revenue is ${totalRevenue} EGP. Best revenue source is ${bestSource.source} with ${bestSource.amount} EGP and ${bestSource.conversion}% conversion rate.`
    
    return {
        response,
        metrics: {
            total_revenue: totalRevenue,
            best_source: bestSource,
            revenue_breakdown: mockAnalyticsData.revenue
        },
        graphs: ['revenue_breakdown_chart.png'],
        confidence: 0.94
    }
}

function generateConversionResponse(query: string, language: string) {
    const totalSessions = mockAnalyticsData.sessions.reduce((acc, s) => acc + s.count, 0)
    const totalConversions = mockAnalyticsData.sessions.reduce((acc, s) => acc + (s.count * s.conversion / 100), 0)
    const overallConversionRate = (totalConversions / totalSessions * 100).toFixed(1)
    
    const response = language === 'ar'
        ? `معدل التحويل الإجمالي هو ${overallConversionRate}%. الهاتف المحمول لديه أعلى معدل تحويل بنسبة ${mockAnalyticsData.sessions.find(s => s.device === 'mobile')?.conversion}%.`
        : `Overall conversion rate is ${overallConversionRate}%. Mobile has the highest conversion rate at ${mockAnalyticsData.sessions.find(s => s.device === 'mobile')?.conversion}%.`
    
    return {
        response,
        metrics: {
            overall_conversion: overallConversionRate,
            total_sessions: totalSessions,
            total_conversions: totalConversions,
            device_breakdown: mockAnalyticsData.sessions
        },
        graphs: ['conversion_analysis_chart.png'],
        confidence: 0.90
    }
}

function generateGeneralResponse(query: string, language: string) {
    const response = language === 'ar'
        ? `أهلاً! يمكنني مساعدتك في تحليل بيانات موقع الويب. اسأل عن الاتجاهات، التحويلات، الانسحابات، أو مقارنة المنافسين.`
        : `Hello! I can help you analyze website analytics data. Ask about trends, conversions, drop-offs, or competitor comparisons.`
    
    return {
        response,
        metrics: {
            available_queries: [
                'trending products',
                'mobile vs desktop performance',
                'drop-off analysis',
                'competitor benchmarks',
                'revenue breakdown',
                'conversion rates'
            ]
        },
        graphs: [],
        confidence: 0.85
    }
} 