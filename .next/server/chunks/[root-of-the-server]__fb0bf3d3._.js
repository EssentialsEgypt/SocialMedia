module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/ai-strategy-composer/strategies.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock data for strategies
const mockStrategies = [
    {
        id: 'strategy-1',
        goalId: 'goal-1',
        title: 'Revenue Generation Strategy',
        description: 'Comprehensive 30-day plan to achieve 300,000 EGP revenue target',
        duration: 30,
        confidence: 87,
        predictedOutcome: {
            revenue: 320000,
            orders: 850,
            engagement: 12,
            reach: 25000
        },
        actions: [
            {
                id: 'action-1-1',
                type: 'drop',
                title: 'Launch Premium Hoodie Collection',
                description: 'Release new premium hoodie collection with limited edition variants',
                day: 1,
                priority: 'critical',
                status: 'completed',
                estimatedImpact: 35,
                budget: 15000,
                platform: [
                    'Instagram',
                    'Facebook'
                ],
                targetAudience: 'Fashion-conscious millennials',
                creativeType: 'Lifestyle photography',
                timing: '9:00 AM EST'
            },
            {
                id: 'action-1-2',
                type: 'ad',
                title: 'Instagram Story Ads Campaign',
                description: 'Launch targeted Instagram story ads with high-engagement creatives',
                day: 2,
                priority: 'high',
                status: 'in-progress',
                estimatedImpact: 25,
                budget: 8000,
                platform: [
                    'Instagram'
                ],
                targetAudience: 'Existing followers and lookalikes',
                creativeType: 'Story format',
                timing: '6:00 PM EST'
            },
            {
                id: 'action-1-3',
                type: 'vip',
                title: 'VIP Customer Exclusive Drop',
                description: 'Early access drop for VIP customers with special pricing',
                day: 5,
                priority: 'high',
                status: 'pending',
                estimatedImpact: 20,
                budget: 5000,
                platform: [
                    'Email',
                    'WhatsApp'
                ],
                targetAudience: 'VIP customers',
                creativeType: 'Exclusive preview',
                timing: '12:00 PM EST'
            },
            {
                id: 'action-1-4',
                type: 'content',
                title: 'Behind-the-Scenes Content Series',
                description: 'Create engaging behind-the-scenes content to build anticipation',
                day: 3,
                priority: 'medium',
                status: 'pending',
                estimatedImpact: 15,
                budget: 2000,
                platform: [
                    'Instagram',
                    'TikTok'
                ],
                targetAudience: 'General audience',
                creativeType: 'Video content',
                timing: '3:00 PM EST'
            },
            {
                id: 'action-1-5',
                type: 'timing',
                title: 'Optimal Posting Schedule',
                description: 'Implement data-driven posting schedule for maximum engagement',
                day: 1,
                priority: 'medium',
                status: 'completed',
                estimatedImpact: 10,
                budget: 0,
                platform: [
                    'All platforms'
                ],
                targetAudience: 'All audiences',
                creativeType: 'Scheduling optimization',
                timing: 'Ongoing'
            }
        ],
        dataSources: [
            'Cash Log',
            'CRM & VIP Tracker',
            'Audience Timing',
            'Ad Performance'
        ],
        reasoning: [
            'Historical data shows 35% revenue increase during premium drops',
            'VIP customers have 3x higher conversion rate than general audience',
            'Instagram story ads show 40% higher engagement than feed posts',
            'Optimal posting times identified through audience timing analysis'
        ],
        recommendations: [
            'Focus on story-based creatives for higher engagement',
            'Implement VIP early access to drive urgency',
            'Use user-generated content to build authenticity',
            'Monitor competitor activity and adjust strategy accordingly'
        ],
        riskFactors: [
            'Seasonal fluctuations may impact demand',
            'Ad costs could increase during peak periods',
            'Competitor launches might affect market share'
        ],
        createdAt: '2024-01-15T10:30:00Z',
        status: 'active',
        lastUpdated: '2024-01-16T14:20:00Z'
    },
    {
        id: 'strategy-2',
        goalId: 'goal-2',
        title: 'New Product Launch Strategy',
        description: '21-day strategy to achieve 1,000 orders for hoodie collection launch',
        duration: 21,
        confidence: 92,
        predictedOutcome: {
            revenue: 180000,
            orders: 1050,
            engagement: 18,
            reach: 35000
        },
        actions: [
            {
                id: 'action-2-1',
                type: 'drop',
                title: 'Hoodie Collection Launch',
                description: 'Launch new hoodie collection with multiple color variants',
                day: 1,
                priority: 'critical',
                status: 'completed',
                estimatedImpact: 40,
                budget: 20000,
                platform: [
                    'Instagram',
                    'Facebook',
                    'TikTok'
                ],
                targetAudience: 'Young adults 18-35',
                creativeType: 'Product showcase',
                timing: '10:00 AM EST'
            },
            {
                id: 'action-2-2',
                type: 'ad',
                title: 'TikTok Influencer Campaign',
                description: 'Partner with micro-influencers for authentic product promotion',
                day: 3,
                priority: 'high',
                status: 'in-progress',
                estimatedImpact: 30,
                budget: 12000,
                platform: [
                    'TikTok'
                ],
                targetAudience: 'TikTok users 16-30',
                creativeType: 'Influencer content',
                timing: 'Various times'
            },
            {
                id: 'action-2-3',
                type: 'content',
                title: 'User-Generated Content Campaign',
                description: 'Encourage customers to share photos wearing the hoodies',
                day: 7,
                priority: 'medium',
                status: 'pending',
                estimatedImpact: 20,
                budget: 3000,
                platform: [
                    'Instagram',
                    'TikTok'
                ],
                targetAudience: 'Existing customers',
                creativeType: 'UGC campaign',
                timing: 'Ongoing'
            }
        ],
        dataSources: [
            'Product Database',
            'Competitor Tracking',
            'Audience Timing',
            'Ad Performance'
        ],
        reasoning: [
            'New product launches typically see 40% higher conversion rates',
            'TikTok influencer campaigns show 3x higher engagement than traditional ads',
            'User-generated content increases trust and authenticity',
            'Optimal launch timing identified through competitor analysis'
        ],
        recommendations: [
            'Focus on TikTok for younger audience engagement',
            'Implement UGC campaign to build social proof',
            'Use limited-time offers to create urgency',
            'Monitor competitor launches and adjust pricing accordingly'
        ],
        riskFactors: [
            'New product market acceptance is uncertain',
            'Influencer costs may exceed budget',
            'Seasonal timing could impact demand'
        ],
        createdAt: '2024-01-10T15:00:00Z',
        status: 'active',
        lastUpdated: '2024-01-12T09:15:00Z'
    }
];
async function handler(req, res) {
    if (req.method === 'GET') {
        // Simulate API delay
        await new Promise((resolve)=>setTimeout(resolve, 600));
        res.status(200).json(mockStrategies);
    } else {
        res.setHeader('Allow', [
            'GET'
        ]);
        res.status(405).json({
            error: `Method ${req.method} Not Allowed`
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/ai-strategy-composer/strategies.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$strategies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/ai-strategy-composer/strategies.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$strategies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$strategies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/ai-strategy-composer/strategies",
        pathname: "/api/ai-strategy-composer/strategies",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$strategies$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fb0bf3d3._.js.map