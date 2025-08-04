import { NextApiRequest, NextApiResponse } from 'next'

interface AutomationRequest {
    rule: string
    userId: string
    sessionId?: string
}

interface AutomationResponse {
    success: boolean
    rule: {
        id: string
        name: string
        description: string
        triggerCondition: any
        actions: any[]
        isActive: boolean
    }
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { rule, userId, sessionId }: AutomationRequest = req.body

        if (!rule) {
            return res.status(400).json({ error: 'Automation rule is required' })
        }

        // Parse automation rule from natural language
        const parsedRule = await parseAutomationRule(rule)

        // Store automation rule
        const savedRule = await storeAutomationRule(parsedRule, userId)

        res.status(200).json({
            success: true,
            rule: savedRule,
            message: `Automation rule "${savedRule.name}" has been created and activated.`
        })
    } catch (error) {
        console.error('Automation API Error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

async function parseAutomationRule(ruleText: string): Promise<any> {
    // Simulate AI parsing of natural language to automation rule
    const lowerRule = ruleText.toLowerCase()

    let triggerCondition = {}
    let actions = []
    let name = ""
    let description = ""

    // Parse ROAS-based triggers
    if (lowerRule.includes('roas') && lowerRule.includes('<')) {
        const roasMatch = lowerRule.match(/roas\s*<\s*(\d+\.?\d*)/)
        if (roasMatch) {
            const threshold = parseFloat(roasMatch[1])
            triggerCondition = {
                type: 'metric_threshold',
                metric: 'roas',
                operator: '<',
                value: threshold,
                timeframe: '24h'
            }
            name = `ROAS Alert - Below ${threshold}`
            description = `Automatically triggers when ROAS drops below ${threshold}`
        }
    }

    // Parse CTR-based triggers
    if (lowerRule.includes('ctr') && lowerRule.includes('<')) {
        const ctrMatch = lowerRule.match(/ctr\s*<\s*(\d+\.?\d*)/)
        if (ctrMatch) {
            const threshold = parseFloat(ctrMatch[1])
            triggerCondition = {
                type: 'metric_threshold',
                metric: 'ctr',
                operator: '<',
                value: threshold,
                timeframe: '24h'
            }
            name = `CTR Alert - Below ${threshold}%`
            description = `Automatically triggers when CTR drops below ${threshold}%`
        }
    }

    // Parse spend-based triggers
    if (lowerRule.includes('spend') && lowerRule.includes('>')) {
        const spendMatch = lowerRule.match(/spend\s*>\s*\$?(\d+)/)
        if (spendMatch) {
            const threshold = parseInt(spendMatch[1])
            triggerCondition = {
                type: 'metric_threshold',
                metric: 'spend',
                operator: '>',
                value: threshold,
                timeframe: '24h'
            }
            name = `Spend Alert - Above $${threshold}`
            description = `Automatically triggers when daily spend exceeds $${threshold}`
        }
    }

    // Parse actions
    if (lowerRule.includes('pause') || lowerRule.includes('stop')) {
        actions.push({
            type: 'pause_campaign',
            description: 'Pause the campaign'
        })
    }

    if (lowerRule.includes('alert') || lowerRule.includes('notify')) {
        actions.push({
            type: 'send_notification',
            channel: 'whatsapp',
            message: 'Campaign performance alert triggered'
        })
    }

    if (lowerRule.includes('budget') && lowerRule.includes('increase')) {
        actions.push({
            type: 'adjust_budget',
            action: 'increase',
            percentage: 20,
            description: 'Increase budget by 20%'
        })
    }

    if (lowerRule.includes('budget') && lowerRule.includes('decrease')) {
        actions.push({
            type: 'adjust_budget',
            action: 'decrease',
            percentage: 20,
            description: 'Decrease budget by 20%'
        })
    }

    if (lowerRule.includes('creative') && lowerRule.includes('refresh')) {
        actions.push({
            type: 'refresh_creative',
            description: 'Refresh campaign creatives'
        })
    }

    // Default actions if none specified
    if (actions.length === 0) {
        actions.push({
            type: 'send_notification',
            channel: 'whatsapp',
            message: 'Automation rule triggered'
        })
    }

    return {
        name,
        description,
        triggerCondition,
        actions,
        isActive: true
    }
}

async function storeAutomationRule(rule: any, userId: string): Promise<any> {
    // Simulate storing in database
    const savedRule = {
        id: `rule_${Date.now()}`,
        userId,
        name: rule.name,
        description: rule.description,
        triggerCondition: rule.triggerCondition,
        actions: rule.actions,
        isActive: rule.isActive,
        createdAt: new Date().toISOString(),
        lastTriggered: null,
        triggerCount: 0
    }

    console.log('Storing automation rule:', savedRule)

    return savedRule
} 