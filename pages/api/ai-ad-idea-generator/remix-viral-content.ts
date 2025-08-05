import { NextApiRequest, NextApiResponse } from 'next'
import type { ViralContentData, ViralAdIdea, ProductContext } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { originalContent, newProduct, remixType } = req.body

        // ViralContent-AdIdeaEnhancer: Remix viral content for new products
        const remixViralContent = (
            content: ViralContentData,
            product: ProductContext,
            type: 'hook' | 'visual' | 'tone' | 'format'
        ): ViralAdIdea => {
            let adHook = ""
            let adCopy = ""
            let cta = ""
            let visualStyle = ""
            let suggestedFormat = ""
            let remixStrategy = ""

            switch (type) {
                case 'hook':
                    // Remix the viral hook for new product
                    const viralHook = content.viralPhrases[0] || content.caption.split('.')[0]
                    adHook = viralHook.includes('Real ones')
                        ? `Real ones recognize ${product.name}`
                        : viralHook.includes('Made for the real ones')
                            ? `Made for the real ones - ${product.name}`
                            : viralHook.includes('Why everyone')
                                ? `Why everyone in Egypt is obsessed with ${product.name}...`
                                : `${viralHook} - ${product.name}`

                    adCopy = "Adapting viral hook for new product category"
                    cta = "Discover now"
                    visualStyle = content.visualStyle
                    suggestedFormat = content.type === 'reel' ? 'Instagram Reels' : 'Meta Image Ad'
                    remixStrategy = "Adapt viral hook for new product while maintaining emotional resonance"
                    break

                case 'visual':
                    // Remix the visual style for new product
                    adHook = `New ${product.name} - Same viral style`
                    adCopy = "Replicating successful visual formula for new product"
                    cta = "See the style"
                    visualStyle = content.visualStyle.includes('Close-up')
                        ? `Close-up ${product.name} shots with fast transitions`
                        : content.visualStyle.includes('Lifestyle')
                            ? `Lifestyle shots with ${product.name} and clean background`
                            : content.visualStyle
                    suggestedFormat = content.type === 'reel' ? 'Instagram Reels' : 'Meta Image Ad'
                    remixStrategy = "Replicate successful visual style for new product category"
                    break

                case 'tone':
                    // Remix the emotional tone for new product
                    adHook = `Same ${content.emotionalTone} feeling, new ${product.name}`
                    adCopy = `Adapting ${content.emotionalTone} tone for ${product.name}`
                    cta = "Experience the feeling"
                    visualStyle = content.visualStyle
                    suggestedFormat = content.type === 'reel' ? 'Instagram Reels' : 'Meta Image Ad'
                    remixStrategy = "Maintain emotional tone while adapting for new product"
                    break

                case 'format':
                    // Remix the format for new product
                    adHook = `New ${product.name} in viral format`
                    adCopy = `Adapting ${content.type} format for ${product.name}`
                    cta = "See the format"
                    visualStyle = content.visualStyle
                    suggestedFormat = content.type === 'reel'
                        ? 'Instagram Reels'
                        : content.type === 'carousel'
                            ? 'Facebook Carousel'
                            : 'Meta Image Ad'
                    remixStrategy = "Replicate successful content format for new product"
                    break
            }

            return {
                id: `remix-${type}-${Date.now()}`,
                sourceContentId: content.id,
                viralElement: content.viralPhrases[0] || content.caption.split('.')[0],
                adHook,
                adCopy,
                cta,
                psychologicalAngle: content.emotionalTone.includes('exclusive') ? 'Reward/VIP' : 'Curiosity',
                visualStyle,
                suggestedFormat,
                targeting: "Audience that engaged with original viral content",
                confidence: Math.min(content.engagementRate / 10, 0.95),
                performancePrediction: `Medium CTR - ${type} Remix`,
                emotionalLanguage: content.emotionalTone,
                remixStrategy
            }
        }

        const remixedAd = remixViralContent(originalContent, newProduct, remixType)

        res.status(200).json(remixedAd)
    } catch (error) {
        console.error('Error remixing viral content:', error)
        res.status(500).json({ error: 'Failed to remix viral content' })
    }
} 