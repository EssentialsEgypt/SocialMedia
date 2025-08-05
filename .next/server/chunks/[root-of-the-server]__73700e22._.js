module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/services/ai-auto-replies.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// AutoReply-AI-Start: AI-Powered Auto Replies Engine Service
// Handles real-time message processing, intent detection, and response generation
__turbopack_context__.s({
    "aiAutoRepliesService": (()=>aiAutoRepliesService)
});
class AIAutoRepliesService {
    templates = [];
    platformConfigs = [];
    isActive = true;
    // AutoReply-AI-Start: Initialize the auto reply system
    constructor(){
        this.loadDefaultTemplates();
        this.loadPlatformConfigs();
    }
    // AutoReply-AI-Start: Load default response templates
    loadDefaultTemplates() {
        this.templates = [
            {
                id: 'faq-shipping',
                name: 'Shipping Information',
                category: 'FAQ',
                intent: [
                    'question',
                    'request'
                ],
                platforms: [
                    'instagram',
                    'whatsapp',
                    'email'
                ],
                template: 'Hi {name}! Shipping takes 2-3 business days within Egypt. International shipping available. Track your order at {tracking_link}',
                variables: [
                    'name',
                    'tracking_link'
                ],
                tone: 'helpful',
                isActive: true,
                usageCount: 0,
                successRate: 0,
                lastUsed: new Date()
            },
            {
                id: 'vip-greeting',
                name: 'VIP Customer Greeting',
                category: 'VIP',
                intent: [
                    'hype',
                    'general'
                ],
                platforms: [
                    'instagram',
                    'whatsapp'
                ],
                template: 'Hey {name}! 👑 VIP access granted. What can we help you with today?',
                variables: [
                    'name'
                ],
                tone: 'excited',
                isActive: true,
                usageCount: 0,
                successRate: 0,
                lastUsed: new Date()
            },
            {
                id: 'drop-hype',
                name: 'Drop Hype Response',
                category: 'Marketing',
                intent: [
                    'hype',
                    'drop_inquiry'
                ],
                platforms: [
                    'instagram',
                    'whatsapp'
                ],
                template: '🔥 {name}, you know what\'s coming! Next drop: {drop_date}. Set your alarms!',
                variables: [
                    'name',
                    'drop_date'
                ],
                tone: 'excited',
                isActive: true,
                usageCount: 0,
                successRate: 0,
                lastUsed: new Date()
            },
            {
                id: 'support-escalation',
                name: 'Support Escalation',
                category: 'Support',
                intent: [
                    'complaint',
                    'support'
                ],
                platforms: [
                    'instagram',
                    'whatsapp',
                    'email'
                ],
                template: 'I understand your concern, {name}. Let me connect you with our support team right away. They\'ll reach out within 10 minutes.',
                variables: [
                    'name'
                ],
                tone: 'professional',
                isActive: true,
                usageCount: 0,
                successRate: 0,
                lastUsed: new Date()
            },
            {
                id: 'order-tracking',
                name: 'Order Tracking',
                category: 'Orders',
                intent: [
                    'order_tracking',
                    'request'
                ],
                platforms: [
                    'instagram',
                    'whatsapp',
                    'email'
                ],
                template: 'Hi {name}! Your order #{order_number} is {status}. Track it here: {tracking_link}',
                variables: [
                    'name',
                    'order_number',
                    'status',
                    'tracking_link'
                ],
                tone: 'helpful',
                isActive: true,
                usageCount: 0,
                successRate: 0,
                lastUsed: new Date()
            }
        ];
    }
    // AutoReply-AI-Start: Load platform configurations
    loadPlatformConfigs() {
        this.platformConfigs = [
            {
                platform: 'instagram',
                apiKey: process.env.INSTAGRAM_API_KEY || '',
                responseDelay: 3000,
                typingIndicator: true,
                maxResponseLength: 1000,
                supportedFeatures: [
                    'dm',
                    'comments',
                    'stories'
                ]
            },
            {
                platform: 'whatsapp',
                apiKey: process.env.WHATSAPP_API_KEY || '',
                responseDelay: 2000,
                typingIndicator: true,
                maxResponseLength: 1000,
                supportedFeatures: [
                    'messages',
                    'status'
                ]
            },
            {
                platform: 'email',
                apiKey: process.env.EMAIL_API_KEY || '',
                responseDelay: 5000,
                typingIndicator: false,
                maxResponseLength: 2000,
                supportedFeatures: [
                    'inbox',
                    'outbox'
                ]
            }
        ];
    }
    // AutoReply-AI-Start: Process incoming message and generate response
    async processMessage(message, senderId, platform, senderContext) {
        const startTime = Date.now();
        // Detect message intent using AI
        const intent = await this.detectIntent(message, senderContext);
        // Get or generate sender context
        const context = senderContext || await this.getSenderContext(senderId, platform);
        // Find best template or generate new response
        const response = await this.generateResponse(message, intent, context, platform);
        // Apply response delay for human-like behavior
        await this.applyResponseDelay(platform);
        // Send response through platform API
        const sent = await this.sendResponse(response, senderId, platform);
        const responseTime = Date.now() - startTime;
        // Log the response
        const autoReplyResponse = {
            id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            originalMessageId: `msg_${Date.now()}`,
            senderId,
            platform,
            intent,
            response: sent ? response : 'Failed to send',
            templateUsed: intent.suggestedResponse,
            wasEdited: false,
            wasApproved: false,
            responseTime,
            sentAt: new Date(),
            tags: intent.tags,
            escalationTriggered: intent.requiresHumanEscalation
        };
        await this.logResponse(autoReplyResponse);
        return autoReplyResponse;
    }
    // AutoReply-AI-Start: AI-powered intent detection
    async detectIntent(message, context) {
        // Mock AI intent detection - in production, this would use OpenAI GPT-4o
        const lowerMessage = message.toLowerCase();
        let intent = {
            type: 'general',
            confidence: 0.7,
            urgency: 'low',
            emotionalTone: 'neutral',
            requiresHumanEscalation: false,
            suggestedResponse: '',
            tags: []
        };
        // Intent detection logic
        if (lowerMessage.includes('ship') || lowerMessage.includes('delivery') || lowerMessage.includes('when')) {
            intent.type = 'question';
            intent.tags.push('shipping');
            intent.suggestedResponse = 'faq-shipping';
        } else if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
            intent.type = 'order_tracking';
            intent.tags.push('order');
            intent.suggestedResponse = 'order-tracking';
        } else if (lowerMessage.includes('drop') || lowerMessage.includes('release') || lowerMessage.includes('🔥')) {
            intent.type = 'drop_inquiry';
            intent.tags.push('drop', 'marketing');
            intent.suggestedResponse = 'drop-hype';
        } else if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('wrong')) {
            intent.type = 'complaint';
            intent.urgency = 'high';
            intent.emotionalTone = 'negative';
            intent.requiresHumanEscalation = true;
            intent.tags.push('support', 'escalation');
            intent.suggestedResponse = 'support-escalation';
        } else if (lowerMessage.includes('love') || lowerMessage.includes('🔥') || lowerMessage.includes('amazing')) {
            intent.type = 'hype';
            intent.emotionalTone = 'positive';
            intent.tags.push('engagement');
            intent.suggestedResponse = context?.isVIP ? 'vip-greeting' : 'drop-hype';
        }
        // Adjust based on sender context
        if (context?.isVIP) {
            intent.confidence += 0.1;
            intent.tags.push('vip');
        }
        if (context?.hasOrderedRecently) {
            intent.tags.push('returning_customer');
        }
        return intent;
    }
    // AutoReply-AI-Start: Get or create sender context
    async getSenderContext(senderId, platform) {
        // Mock sender context - in production, this would query the database
        return {
            id: senderId,
            platform: platform,
            isVIP: Math.random() > 0.8,
            isFirstTime: Math.random() > 0.7,
            hasOrderedRecently: Math.random() > 0.6,
            hasCommentedBefore: Math.random() > 0.5,
            lastInteractionDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
            totalInteractions: Math.floor(Math.random() * 20) + 1,
            averageResponseTime: Math.floor(Math.random() * 5000) + 1000,
            preferredLanguage: 'en',
            timezone: 'Africa/Cairo',
            customerSegment: Math.random() > 0.8 ? 'vip' : Math.random() > 0.6 ? 'hot' : Math.random() > 0.4 ? 'warm' : 'cold'
        };
    }
    // AutoReply-AI-Start: Generate appropriate response
    async generateResponse(message, intent, context, platform) {
        let response = '';
        // Try to use suggested template
        if (intent.suggestedResponse) {
            const template = this.templates.find((t)=>t.id === intent.suggestedResponse);
            if (template && template.isActive) {
                response = this.fillTemplate(template, context, message);
            }
        }
        // If no template found, generate new response
        if (!response) {
            response = await this.generateNewResponse(message, intent, context, platform);
        }
        // Apply tone adaptation
        response = this.adaptTone(response, intent.emotionalTone, context);
        // Truncate if too long for platform
        const config = this.platformConfigs.find((c)=>c.platform === platform);
        if (config && response.length > config.maxResponseLength) {
            response = response.substring(0, config.maxResponseLength - 3) + '...';
        }
        return response;
    }
    // AutoReply-AI-Start: Fill template with variables
    fillTemplate(template, context, message) {
        let response = template.template;
        // Replace variables
        if (template.variables.includes('name')) {
            response = response.replace('{name}', context.id.split('_')[0] || 'there');
        }
        if (template.variables.includes('tracking_link')) {
            response = response.replace('{tracking_link}', 'https://track.essentials-egypt.com');
        }
        if (template.variables.includes('drop_date')) {
            response = response.replace('{drop_date}', 'Friday 3 PM Cairo Time');
        }
        if (template.variables.includes('order_number')) {
            response = response.replace('{order_number}', '#' + Math.floor(Math.random() * 10000));
        }
        if (template.variables.includes('status')) {
            response = response.replace('{status}', 'in transit');
        }
        return response;
    }
    // AutoReply-AI-Start: Generate new response using AI
    async generateNewResponse(message, intent, context, platform) {
        // Mock AI response generation - in production, this would use OpenAI
        const responses = {
            question: 'Thanks for asking! Let me help you with that.',
            complaint: 'I understand your concern. Let me get this sorted for you.',
            hype: '🔥 Love the energy! Thanks for the support!',
            confusion: 'No worries, let me clarify that for you.',
            request: 'I\'ll help you with that right away.',
            order_tracking: 'Let me check your order status for you.',
            product_info: 'Here\'s what you need to know about that product.',
            support: 'I\'m here to help! Let me assist you with that.',
            drop_inquiry: '🔥 New drops coming soon! Stay tuned!',
            general: 'Thanks for reaching out! How can I help you today?'
        };
        return responses[intent.type] || responses.general;
    }
    // AutoReply-AI-Start: Adapt tone based on context
    adaptTone(response, emotionalTone, context) {
        if (context.isVIP) {
            response = '👑 ' + response;
        }
        switch(emotionalTone){
            case 'positive':
                response += ' 😊';
                break;
            case 'excited':
                response += ' 🔥';
                break;
            case 'negative':
                response = 'I understand your concern. ' + response;
                break;
            case 'frustrated':
                response = 'I\'m sorry to hear that. ' + response;
                break;
        }
        return response;
    }
    // AutoReply-AI-Start: Apply human-like response delay
    async applyResponseDelay(platform) {
        const config = this.platformConfigs.find((c)=>c.platform === platform);
        const delay = config?.responseDelay || 3000;
        // Add some randomness to make it more human-like
        const randomDelay = delay + (Math.random() - 0.5) * 2000;
        await new Promise((resolve)=>setTimeout(resolve, randomDelay));
    }
    // AutoReply-AI-Start: Send response through platform API
    async sendResponse(response, senderId, platform) {
        // Mock API call - in production, this would use actual platform APIs
        console.log(`Sending response to ${senderId} on ${platform}: ${response}`);
        // Simulate API call delay
        await new Promise((resolve)=>setTimeout(resolve, 500));
        // Simulate success (90% success rate)
        return Math.random() > 0.1;
    }
    // AutoReply-AI-Start: Log response for analytics
    async logResponse(response) {
        // Mock logging - in production, this would save to database
        console.log('Auto Reply Logged:', {
            id: response.id,
            platform: response.platform,
            intent: response.intent.type,
            responseTime: response.responseTime,
            tags: response.tags
        });
    }
    // AutoReply-AI-Start: Get analytics
    async getAnalytics() {
        // Mock analytics - in production, this would aggregate from database
        return {
            totalResponses: 1247,
            averageResponseTime: 3200,
            successRate: 0.94,
            escalationRate: 0.12,
            platformBreakdown: {
                instagram: 45,
                whatsapp: 35,
                email: 20
            },
            intentBreakdown: {
                question: 30,
                complaint: 15,
                hype: 25,
                order_tracking: 20,
                general: 10
            },
            topTemplates: this.templates.slice(0, 5),
            recentResponses: []
        };
    }
    // AutoReply-AI-Start: Add new template
    async addTemplate(template) {
        const newTemplate = {
            ...template,
            id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            usageCount: 0,
            successRate: 0,
            lastUsed: new Date()
        };
        this.templates.push(newTemplate);
        return newTemplate;
    }
    // AutoReply-AI-Start: Update template
    async updateTemplate(id, updates) {
        const index = this.templates.findIndex((t)=>t.id === id);
        if (index === -1) return null;
        this.templates[index] = {
            ...this.templates[index],
            ...updates
        };
        return this.templates[index];
    }
    // AutoReply-AI-Start: Toggle auto reply system
    async toggleSystem(active) {
        this.isActive = active;
    }
    // AutoReply-AI-Start: Check if system is active
    isSystemActive() {
        return this.isActive;
    }
    // AutoReply-AI-Start: Get all templates
    async getTemplates() {
        return this.templates;
    }
    // AutoReply-AI-Start: Get platform configs
    async getPlatformConfigs() {
        return this.platformConfigs;
    }
}
const aiAutoRepliesService = new AIAutoRepliesService();
}}),
"[project]/pages/api/auto-replies/analytics.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// AutoReply-AI-Start: API endpoint for auto reply analytics
__turbopack_context__.s({
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ai$2d$auto$2d$replies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/ai-auto-replies.ts [api] (ecmascript)");
;
async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        const analytics = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ai$2d$auto$2d$replies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["aiAutoRepliesService"].getAnalytics();
        const platformConfigs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ai$2d$auto$2d$replies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["aiAutoRepliesService"].getPlatformConfigs();
        const isActive = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ai$2d$auto$2d$replies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["aiAutoRepliesService"].isSystemActive();
        return res.status(200).json({
            success: true,
            analytics,
            platformConfigs,
            systemStatus: {
                isActive,
                lastUpdated: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Analytics retrieval error:', error);
        return res.status(500).json({
            error: 'Failed to retrieve analytics',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
}}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/auto-replies/analytics.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "routeModule": (()=>routeModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auto$2d$replies$2f$analytics$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/auto-replies/analytics.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auto$2d$replies$2f$analytics$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auto$2d$replies$2f$analytics$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/auto-replies/analytics",
        pathname: "/api/auto-replies/analytics",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$auto$2d$replies$2f$analytics$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__73700e22._.js.map