import { NextApiRequest, NextApiResponse } from 'next'
import type { ProductContext, PsychologicalAngle, VisualCue } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { product, platform, angle } = req.body

        // Generate visual cues based on psychological angle and platform
        let visualCues: VisualCue

        switch (angle) {
            case 'FOMO':
                visualCues = {
                    backgroundStyle: 'Dark, urgent background with countdown timer overlay',
                    productShotAngle: 'Close-up of product with scarcity badge overlay',
                    modelExpression: 'Urgent, concerned look with pointing gesture',
                    layoutIdea: 'Text overlay: "Only X left" with red warning colors',
                    textOverlayPlacement: 'Top center with urgent typography',
                    colorScheme: 'Red and black with high contrast'
                }
                break

            case 'Curiosity':
                visualCues = {
                    backgroundStyle: 'Mysterious, blurred background with question marks',
                    productShotAngle: 'Partial reveal with shadow play',
                    modelExpression: 'Intrigued, questioning expression',
                    layoutIdea: "Text overlay: \"What's inside?\" with question mark",
                    textOverlayPlacement: "Center with mystery elements",
                    colorScheme: 'Blue and white with intrigue elements'
                }
                break

            case 'Social Proof':
                visualCues = {
                    backgroundStyle: 'Crowd scene or multiple people using product',
                    productShotAngle: 'Group shot with testimonials overlay',
                    modelExpression: 'Happy, satisfied customers',
                    layoutIdea: 'Text overlay: "Join X others" with social proof',
                    textOverlayPlacement: 'Bottom with customer count',
                    colorScheme: 'Green and white with trust elements'
                }
                break

            case 'Problem/Solution':
                visualCues = {
                    backgroundStyle: 'Before/after split screen',
                    productShotAngle: 'Problem on left, solution on right',
                    modelExpression: 'Transformation from frustrated to satisfied',
                    layoutIdea: 'Text overlay: "Before vs After" comparison',
                    textOverlayPlacement: 'Split screen with clear division',
                    colorScheme: 'Gray to vibrant color transformation'
                }
                break

            case 'Aspirational':
                visualCues = {
                    backgroundStyle: 'Luxury setting with aspirational lifestyle',
                    productShotAngle: 'Full-body model in aspirational pose',
                    modelExpression: 'Confident, aspirational look',
                    layoutIdea: 'Text overlay: "Live the dream" with lifestyle',
                    textOverlayPlacement: 'Bottom right with elegant typography',
                    colorScheme: 'Gold and black with luxury elements'
                }
                break

            case 'Reward/VIP':
                visualCues = {
                    backgroundStyle: 'Exclusive, VIP-only setting',
                    productShotAngle: 'Close-up with VIP badge or crown',
                    modelExpression: 'Proud, exclusive expression',
                    layoutIdea: 'Text overlay: "VIP Exclusive" with premium feel',
                    textOverlayPlacement: 'Top right with VIP branding',
                    colorScheme: 'Purple and gold with exclusive elements'
                }
                break

            case 'Emotional':
                visualCues = {
                    backgroundStyle: 'Warm, emotional setting with soft lighting',
                    productShotAngle: 'Close-up with emotional connection',
                    modelExpression: 'Warm, genuine smile',
                    layoutIdea: 'Text overlay: "Feel the difference" with emotion',
                    textOverlayPlacement: 'Center with warm typography',
                    colorScheme: 'Warm tones with emotional connection'
                }
                break

            default:
                visualCues = {
                    backgroundStyle: 'Clean, modern background',
                    productShotAngle: 'Standard product shot',
                    modelExpression: 'Neutral, approachable expression',
                    layoutIdea: 'Simple, clean layout',
                    textOverlayPlacement: 'Standard placement',
                    colorScheme: 'Neutral tones'
                }
        }

        // Adjust for platform-specific requirements
        if (platform === 'Instagram Reels') {
            visualCues.layoutIdea += ' - Vertical format, 9-15 seconds'
            visualCues.textOverlayPlacement = 'Center with voiceover hook'
        } else if (platform === 'TikTok') {
            visualCues.layoutIdea += ' - Fast cuts, bold captions'
            visualCues.textOverlayPlacement = 'Multiple text overlays'
        } else if (platform === 'Meta Image Ad') {
            visualCues.layoutIdea += ' - Single image with text overlay'
            visualCues.textOverlayPlacement = 'Bottom 20% of image'
        }

        res.status(200).json(visualCues)
    } catch (error) {
        console.error('Error generating visual cues:', error)
        res.status(500).json({ error: 'Failed to generate visual cues' })
    }
} 