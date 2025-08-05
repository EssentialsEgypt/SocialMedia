import { NextApiRequest, NextApiResponse } from 'next'
import type { ViralContentData, ViralAdIdea, ProductContext, PsychologicalAngle } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { viralContent, targetProduct } = req.body

        // ViralContent-AdIdeaEnhancer: Generate ad idea based on viral content
        const generateViralAdIdea = (content: ViralContentData, product: ProductContext): ViralAdIdea => {
            // Analyze viral elements
            const viralElement = content.viralPhrases[0] || content.caption.split('.')[0]
            const emotionalTone = content.emotionalTone
            const visualStyle = content.visualStyle

            // Determine psychological angle based on viral content
            let psychologicalAngle: PsychologicalAngle = 'Curiosity'
            if (content.caption.includes('Real ones') || content.caption.includes('exclusive')) {
                psychologicalAngle = 'Reward/VIP'
            } else if (content.caption.includes('2500+') || content.caption.includes('everyone')) {
                psychologicalAngle = 'Social Proof'
            } else if (content.caption.includes('Limited') || content.caption.includes('miss out')) {
                psychologicalAngle = 'FOMO'
            } else if (content.caption.includes('authentic') || content.caption.includes('quality')) {
                psychologicalAngle = 'Aspirational'
            }

            // Generate ad hook from viral phrase
            const adHook = viralElement.includes('Real ones')
                ? "Real ones recognize real drops"
                : viralElement.includes('Made for the real ones')
                    ? "Made for the real ones"
                    : viralElement.includes('Why everyone')
                        ? "Why everyone in Egypt is obsessed with this drop..."
                        : viralElement

            // Generate ad copy based on viral content
            const adCopy = content.type === 'reel'
                ? "This isn't for everyone. But it might be for you. 100% authentic. Fast delivery."
                : content.type === 'carousel'
                    ? "2500+ already ordered. Don't miss out. Limited quantities available."
                    : "Made for the real ones. 100% authentic. Fast delivery."

            // Generate CTA based on viral content
            const cta = content.topComments.some(comment => comment.includes('restock'))
                ? "Tap to see what's back"
                : content.topComments.some(comment => comment.includes('Need this'))
                    ? "Get yours now"
                    : "Shop now"

            // Determine suggested format based on viral content type
            const suggestedFormat = content.type === 'reel'
                ? 'Instagram Reels'
                : content.type === 'carousel'
                    ? 'Facebook Carousel'
                    : 'Meta Image Ad'

            // Generate targeting based on viral content
            const targeting = content.audienceReaction.includes('streetwear')
                ? "Streetwear enthusiasts, 18-30, Cairo, engaged with fashion content"
                : "Fashion-conscious youth, 18-35, Egypt, interested in premium brands"

            // Calculate confidence based on engagement rate
            const confidence = Math.min(content.engagementRate / 10, 0.95)

            // Generate performance prediction
            const performancePrediction = confidence > 0.8
                ? "High CTR - Viral Formula"
                : confidence > 0.6
                    ? "Medium CTR - Proven Hook"
                    : "Standard CTR - Test Required"

            // Generate emotional language
            const emotionalLanguage = content.emotionalTone.includes('exclusive')
                ? "Exclusive, aspirational, confident"
                : content.emotionalTone.includes('authentic')
                    ? "Authentic, premium, trustworthy"
                    : "Trending, social proof, urgent"

            // Generate remix strategy
            const remixStrategy = content.type === 'reel'
                ? "Replicate fast transitions and close-up shots for new product"
                : content.type === 'carousel'
                    ? "Use multiple product angles with social proof messaging"
                    : "Adapt lifestyle shots with viral hook for different products"

            return {
                id: `viral-ad-${Date.now()}`,
                sourceContentId: content.id,
                viralElement,
                adHook,
                adCopy,
                cta,
                psychologicalAngle,
                visualStyle,
                suggestedFormat,
                targeting,
                confidence,
                performancePrediction,
                emotionalLanguage,
                remixStrategy
            }
        }

        const viralAdIdea = generateViralAdIdea(viralContent, targetProduct)

        res.status(200).json(viralAdIdea)
    } catch (error) {
        console.error('Error generating viral-based ad idea:', error)
        res.status(500).json({ error: 'Failed to generate viral-based ad idea' })
    }
} 