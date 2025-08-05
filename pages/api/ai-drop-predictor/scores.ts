import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // Mock AI-generated drop scores with comprehensive Instagram analysis
        const scores = [
            {
                id: 'score-001',
                dropName: 'Luxury Collection Drop #5',
                date: 'August 8, 2024',
                overallScore: 84,
                engagementScore: 91,
                conversionScore: 78,
                vipScore: 88,
                instagramScore: 89,
                aiSuggestions: [
                    'Push similar teaser content 48 hours before next drop',
                    'VIP early access increased conversion by 23%',
                    'Story engagement outperformed posts - double story presence',
                    'Engagement spike 2 hours after teaser - new sweet spot identified',
                    'Bundle options increased average order value by 34%'
                ],
                metrics: {
                    totalSales: 28450,
                    conversionRate: 12.4,
                    avgOrderValue: 189,
                    vipParticipation: 67,
                    storyViews: 14200,
                    storyReplies: 172,
                    postSaves: 238,
                    postComments: 89,
                    linkClicks: 445
                },
                trends: {
                    improvement: true,
                    keyInsights: [
                        'Instagram engagement score: 91% - exceptional performance',
                        'Story reach: 14,200 with 172 replies - high engagement',
                        'Saves on drop post: 238 - strong intent signals',
                        'Top comment: "When is it dropping?" - clear demand',
                        'Link clicks: 445 - direct conversion signals'
                    ]
                }
            },
            {
                id: 'score-002',
                dropName: 'Summer Essentials Drop #3',
                date: 'August 5, 2024',
                overallScore: 76,
                engagementScore: 82,
                conversionScore: 71,
                vipScore: 79,
                instagramScore: 75,
                aiSuggestions: [
                    'Timing was off - audience peak missed by 1 hour',
                    'Competitor launched similar product 2 hours before',
                    'Story content needs more behind-the-scenes footage',
                    'VIP messaging increased participation by 18%',
                    'Consider bundle pricing for better conversion'
                ],
                metrics: {
                    totalSales: 18920,
                    conversionRate: 9.8,
                    avgOrderValue: 156,
                    vipParticipation: 52,
                    storyViews: 9800,
                    storyReplies: 98,
                    postSaves: 156,
                    postComments: 67,
                    linkClicks: 298
                },
                trends: {
                    improvement: false,
                    keyInsights: [
                        'Instagram engagement score: 75% - below average',
                        'Story views: 9,800 - 31% below previous drops',
                        'Competitor activity impacted timing and reach',
                        'VIP participation dropped by 15%',
                        'Link clicks: 298 - conversion rate affected'
                    ]
                }
            },
            {
                id: 'score-003',
                dropName: 'Limited Edition Drop #2',
                date: 'August 2, 2024',
                overallScore: 92,
                engagementScore: 95,
                conversionScore: 89,
                vipScore: 94,
                instagramScore: 93,
                aiSuggestions: [
                    'Perfect timing - audience overlap at 94%',
                    'Exclusive VIP access drove 78% of sales',
                    'Story series created 3x more engagement than posts',
                    'Behind-the-scenes content increased saves by 45%',
                    'Limited quantity created urgency - 100% sell-through'
                ],
                metrics: {
                    totalSales: 42100,
                    conversionRate: 18.7,
                    avgOrderValue: 234,
                    vipParticipation: 78,
                    storyViews: 18700,
                    storyReplies: 234,
                    postSaves: 412,
                    postComments: 156,
                    linkClicks: 678
                },
                trends: {
                    improvement: true,
                    keyInsights: [
                        'Instagram engagement score: 93% - outstanding performance',
                        'Story reach: 18,700 with 234 replies - viral engagement',
                        'Saves: 412 - highest in history',
                        'VIP participation: 78% - exclusive access working',
                        'Link clicks: 678 - exceptional conversion funnel'
                    ]
                }
            }
        ]

        res.status(200).json({
            success: true,
            data: scores,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('AI Drop Scorer: Error fetching scores:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch scores',
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
} 