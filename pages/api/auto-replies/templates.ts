// AutoReply-AI-Start: API endpoint for managing auto reply templates
import { NextApiRequest, NextApiResponse } from 'next'
import { aiAutoRepliesService } from '@/services/ai-auto-replies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                // Get all templates
                const templates = await aiAutoRepliesService.getTemplates()
                return res.status(200).json({
                    success: true,
                    templates
                })

            case 'POST':
                // Add new template
                const { name, category, intent, platforms, template, variables, tone } = req.body

                if (!name || !category || !template) {
                    return res.status(400).json({
                        error: 'Missing required fields: name, category, template'
                    })
                }

                const newTemplate = await aiAutoRepliesService.addTemplate({
                    name,
                    category,
                    intent: intent || [],
                    platforms: platforms || [],
                    template,
                    variables: variables || [],
                    tone: tone || 'neutral',
                    isActive: true
                })

                return res.status(201).json({
                    success: true,
                    message: 'Template added successfully',
                    template: newTemplate
                })

            case 'PUT':
                // Update template
                const { id, ...updates } = req.body

                if (!id) {
                    return res.status(400).json({
                        error: 'Template ID is required'
                    })
                }

                const updatedTemplate = await aiAutoRepliesService.updateTemplate(id, updates)

                if (!updatedTemplate) {
                    return res.status(404).json({
                        error: 'Template not found'
                    })
                }

                return res.status(200).json({
                    success: true,
                    message: 'Template updated successfully',
                    template: updatedTemplate
                })

            default:
                return res.status(405).json({ error: 'Method not allowed' })
        }

    } catch (error) {
        console.error('Template management error:', error)
        return res.status(500).json({
            error: 'Failed to manage templates',
            details: error instanceof Error ? error.message : 'Unknown error'
        })
    }
} 