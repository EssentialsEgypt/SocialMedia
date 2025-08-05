import { NextApiRequest, NextApiResponse } from 'next'
import type { ViralContentData } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { contentType, limit } = req.body

        // ViralContent-AdIdeaEnhancer: Mock top performing content data
        const mockTopContent: ViralContentData[] = [
            {
                id: "top-001",
                type: "reel",
                caption: "Real ones recognize real drops. This isn't for everyone. But it might be for you. #EssentialsEG #LimitedDrop #FearOfGod",
                hashtags: ["#EssentialsEG", "#LimitedDrop", "#FearOfGod", "#Streetwear"],
                likes: 15420,
                comments: 892,
                shares: 2341,
                saves: 1100,
                views: 220000,
                reach: 450000,
                engagementRate: 8.7,
                topComments: [
                    "Real ones recognize real drops 🔥",
                    "This isn't for everyone. But it might be for you 💯",
                    "Need this in my life",
                    "When's the restock?"
                ],
                ctaClicks: 156,
                postedAt: new Date('2024-01-15'),
                visualStyle: "Close-up product shots with fast transitions",
                emotionalTone: "Exclusive, aspirational, confident",
                viralPhrases: ["Real ones recognize real drops", "This isn't for everyone", "But it might be for you"],
                audienceReaction: "High engagement from streetwear enthusiasts"
            },
            {
                id: "top-002",
                type: "post",
                caption: "Made for the real ones. 100% authentic. Fast delivery. Limited quantities. #EssentialsEG #FearOfGod #Streetwear",
                hashtags: ["#EssentialsEG", "#FearOfGod", "#Streetwear", "#Authentic"],
                likes: 8920,
                comments: 445,
                shares: 1234,
                saves: 567,
                reach: 180000,
                engagementRate: 6.2,
                topComments: [
                    "Made for the real ones 🔥",
                    "100% authentic 💯",
                    "Need this drop",
                    "When's the next restock?"
                ],
                ctaClicks: 89,
                postedAt: new Date('2024-01-14'),
                visualStyle: "Lifestyle shots with clean background",
                emotionalTone: "Authentic, premium, exclusive",
                viralPhrases: ["Made for the real ones", "100% authentic", "Limited quantities"],
                audienceReaction: "Strong interest in authenticity and exclusivity"
            },
            {
                id: "top-003",
                type: "carousel",
                caption: "Why everyone in Egypt is obsessed with this drop... 2500+ already ordered. Don't miss out. #EssentialsEG #Trending",
                hashtags: ["#EssentialsEG", "#Trending", "#Egypt", "#Streetwear"],
                likes: 12340,
                comments: 678,
                shares: 1890,
                saves: 890,
                reach: 320000,
                engagementRate: 7.1,
                topComments: [
                    "Why everyone in Egypt is obsessed with this drop...",
                    "2500+ already ordered 🔥",
                    "Don't miss out",
                    "Need this in my collection"
                ],
                ctaClicks: 234,
                postedAt: new Date('2024-01-13'),
                visualStyle: "Carousel with multiple product angles",
                emotionalTone: "Trending, social proof, urgency",
                viralPhrases: ["Why everyone in Egypt is obsessed", "2500+ already ordered", "Don't miss out"],
                audienceReaction: "High social proof and FOMO triggers"
            },
            {
                id: "top-004",
                type: "story",
                caption: "Behind the scenes: Real ones recognize real drops. Limited quantities. #EssentialsEG #BehindTheScenes",
                hashtags: ["#EssentialsEG", "#BehindTheScenes", "#Limited", "#RealOnes"],
                likes: 5670,
                comments: 234,
                shares: 890,
                saves: 445,
                reach: 120000,
                engagementRate: 5.8,
                topComments: [
                    "Behind the scenes 🔥",
                    "Real ones recognize real drops",
                    "Limited quantities 💯",
                    "Need this exclusive access"
                ],
                ctaClicks: 67,
                postedAt: new Date('2024-01-12'),
                visualStyle: "Behind-the-scenes, candid shots",
                emotionalTone: "Exclusive, insider, authentic",
                viralPhrases: ["Behind the scenes", "Real ones recognize real drops", "Limited quantities"],
                audienceReaction: "High interest in exclusive behind-the-scenes content"
            },
            {
                id: "top-005",
                type: "reel",
                caption: "The drop that broke the internet. 100% authentic. Fast delivery. #EssentialsEG #Viral #Streetwear",
                hashtags: ["#EssentialsEG", "#Viral", "#Streetwear", "#Authentic"],
                likes: 18750,
                comments: 1234,
                shares: 3456,
                saves: 1567,
                views: 450000,
                reach: 650000,
                engagementRate: 9.2,
                topComments: [
                    "The drop that broke the internet 🔥",
                    "100% authentic 💯",
                    "Fast delivery",
                    "Need this viral drop"
                ],
                ctaClicks: 289,
                postedAt: new Date('2024-01-11'),
                visualStyle: "Viral-style transitions with bold text overlays",
                emotionalTone: "Viral, trending, hype",
                viralPhrases: ["The drop that broke the internet", "100% authentic", "Fast delivery"],
                audienceReaction: "Extremely high viral engagement and sharing"
            }
        ]

        // Filter content by type if specified
        let filteredContent = mockTopContent
        if (contentType && contentType !== 'all') {
            filteredContent = mockTopContent.filter(content => content.type === contentType)
        }

        // Sort by engagement rate and limit results
        const sortedContent = filteredContent
            .sort((a, b) => b.engagementRate - a.engagementRate)
            .slice(0, limit || 10)

        res.status(200).json(sortedContent)
    } catch (error) {
        console.error('Error getting top performing content:', error)
        res.status(500).json({ error: 'Failed to get top performing content' })
    }
} 