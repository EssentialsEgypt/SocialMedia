import { NextApiRequest, NextApiResponse } from 'next'
import type { ViralContentData, ViralAdIdea, ProductContext } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { viralContentList, product, campaignType } = req.body

        // ViralContent-AdIdeaEnhancer: Generate viral ad campaign
        const generateViralCampaign = (
            contentList: ViralContentData[],
            targetProduct: ProductContext,
            type: 'retargeting' | 'cold' | 'drop'
        ): ViralAdIdea[] => {
            const campaignIdeas: ViralAdIdea[] = []

            contentList.forEach((content, index) => {
                // Adjust strategy based on campaign type
                let targeting = ""
                let cta = ""
                let emotionalLanguage = ""

                switch (type) {
                    case 'retargeting':
                        targeting = "Engaged users, viewed site in 7d, interested in similar products"
                        cta = "Complete your order"
                        emotionalLanguage = "Reminder, convenience, completion"
                        break
                    case 'cold':
                        targeting = "Cold audience, 18-35, fashion enthusiasts, similar interests"
                        cta = "Discover now"
                        emotionalLanguage = "Discovery, curiosity, new experience"
                        break
                    case 'drop':
                        targeting = "VIP customers, early adopters, brand loyalists"
                        cta = "Early access"
                        emotionalLanguage = "Exclusivity, privilege, insider access"
                        break
                }

                // Generate viral ad idea for each content piece
                const viralElement = content.viralPhrases[0] || content.caption.split('.')[0]

                const adHook = type === 'retargeting'
                    ? `Remember this? ${viralElement}`
                    : type === 'cold'
                        ? `Why everyone is talking about: ${viralElement}`
                        : `VIP Access: ${viralElement}`

                const adCopy = type === 'retargeting'
                    ? "You showed interest. Don't miss out on this exclusive offer."
                    : type === 'cold'
                        ? "Join thousands who already discovered this. Limited time offer."
                        : "Exclusive early access for our VIP customers. Be the first to know."

                const suggestedFormat = content.type === 'reel'
                    ? 'Instagram Reels'
                    : content.type === 'carousel'
                        ? 'Facebook Carousel'
                        : 'Meta Image Ad'

                const confidence = Math.min(content.engagementRate / 10, 0.95)
                const performancePrediction = confidence > 0.8
                    ? `High CTR - ${type} Campaign`
                    : confidence > 0.6
                        ? `Medium CTR - ${type} Strategy`
                        : `Standard CTR - ${type} Test`

                const remixStrategy = type === 'retargeting'
                    ? "Remind users of their previous interest with viral hook"
                    : type === 'cold'
                        ? "Introduce viral concept to new audience with curiosity"
                        : "Exclusive access to viral content for VIP customers"

                campaignIdeas.push({
                    id: `viral-campaign-${index}-${Date.now()}`,
                    sourceContentId: content.id,
                    viralElement,
                    adHook,
                    adCopy,
                    cta,
                    psychologicalAngle: type === 'retargeting' ? 'FOMO' : type === 'cold' ? 'Curiosity' : 'Reward/VIP',
                    visualStyle: content.visualStyle,
                    suggestedFormat,
                    targeting,
                    confidence,
                    performancePrediction,
                    emotionalLanguage,
                    remixStrategy
                })
            })

            return campaignIdeas
        }

        const viralCampaign = generateViralCampaign(viralContentList, product, campaignType)

        res.status(200).json(viralCampaign)
    } catch (error) {
        console.error('Error generating viral ad campaign:', error)
        res.status(500).json({ error: 'Failed to generate viral ad campaign' })
    }
} 