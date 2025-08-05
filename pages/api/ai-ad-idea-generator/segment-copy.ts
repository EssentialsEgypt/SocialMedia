import { NextApiRequest, NextApiResponse } from 'next'
import type { ProductContext } from '@/services/ai-ad-idea-generator'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { product, segment } = req.body

        let hook = ''
        let copy = ''
        let cta = ''

        switch (segment) {
            case 'cold':
                // Cold Audience: Hook curiosity and trend
                hook = `Why everyone in Egypt is obsessed with this ${product.name}...`
                copy = `${product.name} just landed in Egypt — but it won't stay long. 100% authentic. Fast delivery.`
                cta = 'Shop Now'
                break

            case 'warm':
                // Warm Audience: Tap into desire + validation
                hook = `Still thinking about it? Here's why ${Math.floor(Math.random() * 2000) + 1000}+ already ordered.`
                copy = `You've been eyeing this. Here's why it's worth every penny. Limited stock available.`
                cta = 'Get Yours'
                break

            case 'vip':
                // VIP Customers: Exclusivity, reward, gratitude
                hook = `Hey VIP, this ${product.name} was made for you. And yes — we held one aside.`
                copy = `Exclusive early access for our VIP customers. Limited to 50 pieces. Thank you for your loyalty.`
                cta = 'VIP Access Now'
                break

            default:
                hook = `Discover the ${product.name} everyone's talking about`
                copy = `${product.name} - Premium quality, authentic pieces.`
                cta = 'Shop Now'
        }

        res.status(200).json({ hook, copy, cta })
    } catch (error) {
        console.error('Error generating segment-specific copy:', error)
        res.status(500).json({ error: 'Failed to generate copy' })
    }
} 