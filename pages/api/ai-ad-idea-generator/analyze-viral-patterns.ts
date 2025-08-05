import { NextApiRequest, NextApiResponse } from 'next'
import type { ViralContentData } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { contentList } = req.body

        // ViralContent-AdIdeaEnhancer: Analyze viral patterns
        const analyzePatterns = (contentList: ViralContentData[]) => {
            // Extract emotional triggers
            const emotionalTriggers = contentList
                .map(content => content.emotionalTone)
                .filter((tone, index, arr) => arr.indexOf(tone) === index)
                .slice(0, 5)

            // Extract visual styles
            const visualStyles = contentList
                .map(content => content.visualStyle)
                .filter((style, index, arr) => arr.indexOf(style) === index)
                .slice(0, 5)

            // Extract successful phrases
            const successfulPhrases = contentList
                .flatMap(content => content.viralPhrases)
                .filter((phrase, index, arr) => arr.indexOf(phrase) === index)
                .slice(0, 10)

            // Analyze audience segments
            const audienceSegments = contentList
                .map(content => content.audienceReaction)
                .filter((reaction, index, arr) => arr.indexOf(reaction) === index)
                .slice(0, 5)

            // Identify viral formulas
            const viralFormulas = contentList
                .filter(content => content.engagementRate > 7)
                .map(content => {
                    if (content.caption.includes('Real ones') && content.caption.includes('exclusive')) {
                        return "Exclusivity + Community Language"
                    } else if (content.caption.includes('2500+') && content.caption.includes('ordered')) {
                        return "Social Proof + Urgency"
                    } else if (content.caption.includes('authentic') && content.caption.includes('quality')) {
                        return "Authenticity + Premium Positioning"
                    } else if (content.caption.includes('Why everyone') && content.caption.includes('obsessed')) {
                        return "Curiosity + Trend Positioning"
                    } else {
                        return "High Engagement Formula"
                    }
                })
                .filter((formula, index, arr) => arr.indexOf(formula) === index)

            return {
                emotionalTriggers,
                visualStyles,
                successfulPhrases,
                audienceSegments,
                viralFormulas
            }
        }

        const patterns = analyzePatterns(contentList)

        res.status(200).json(patterns)
    } catch (error) {
        console.error('Error analyzing viral patterns:', error)
        res.status(500).json({ error: 'Failed to analyze viral patterns' })
    }
} 