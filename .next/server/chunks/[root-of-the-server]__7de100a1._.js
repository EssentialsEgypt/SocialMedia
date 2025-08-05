module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/ai-drop-predictor/scores.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        // Mock AI-generated drop scores with comprehensive Instagram analysis
        const scores = [
            {
                id: 'score-001',
                dropName: 'Luxury Collection Drop #5',
                date: 'August 8, 2024',
                overallScore: 84,
                engagementScore: 91,
                conversionScore: 78,
                vipScore: 88,
                instagramScore: 89,
                aiSuggestions: [
                    'Push similar teaser content 48 hours before next drop',
                    'VIP early access increased conversion by 23%',
                    'Story engagement outperformed posts - double story presence',
                    'Engagement spike 2 hours after teaser - new sweet spot identified',
                    'Bundle options increased average order value by 34%'
                ],
                metrics: {
                    totalSales: 28450,
                    conversionRate: 12.4,
                    avgOrderValue: 189,
                    vipParticipation: 67,
                    storyViews: 14200,
                    storyReplies: 172,
                    postSaves: 238,
                    postComments: 89,
                    linkClicks: 445
                },
                trends: {
                    improvement: true,
                    keyInsights: [
                        'Instagram engagement score: 91% - exceptional performance',
                        'Story reach: 14,200 with 172 replies - high engagement',
                        'Saves on drop post: 238 - strong intent signals',
                        'Top comment: "When is it dropping?" - clear demand',
                        'Link clicks: 445 - direct conversion signals'
                    ]
                }
            },
            {
                id: 'score-002',
                dropName: 'Summer Essentials Drop #3',
                date: 'August 5, 2024',
                overallScore: 76,
                engagementScore: 82,
                conversionScore: 71,
                vipScore: 79,
                instagramScore: 75,
                aiSuggestions: [
                    'Timing was off - audience peak missed by 1 hour',
                    'Competitor launched similar product 2 hours before',
                    'Story content needs more behind-the-scenes footage',
                    'VIP messaging increased participation by 18%',
                    'Consider bundle pricing for better conversion'
                ],
                metrics: {
                    totalSales: 18920,
                    conversionRate: 9.8,
                    avgOrderValue: 156,
                    vipParticipation: 52,
                    storyViews: 9800,
                    storyReplies: 98,
                    postSaves: 156,
                    postComments: 67,
                    linkClicks: 298
                },
                trends: {
                    improvement: false,
                    keyInsights: [
                        'Instagram engagement score: 75% - below average',
                        'Story views: 9,800 - 31% below previous drops',
                        'Competitor activity impacted timing and reach',
                        'VIP participation dropped by 15%',
                        'Link clicks: 298 - conversion rate affected'
                    ]
                }
            },
            {
                id: 'score-003',
                dropName: 'Limited Edition Drop #2',
                date: 'August 2, 2024',
                overallScore: 92,
                engagementScore: 95,
                conversionScore: 89,
                vipScore: 94,
                instagramScore: 93,
                aiSuggestions: [
                    'Perfect timing - audience overlap at 94%',
                    'Exclusive VIP access drove 78% of sales',
                    'Story series created 3x more engagement than posts',
                    'Behind-the-scenes content increased saves by 45%',
                    'Limited quantity created urgency - 100% sell-through'
                ],
                metrics: {
                    totalSales: 42100,
                    conversionRate: 18.7,
                    avgOrderValue: 234,
                    vipParticipation: 78,
                    storyViews: 18700,
                    storyReplies: 234,
                    postSaves: 412,
                    postComments: 156,
                    linkClicks: 678
                },
                trends: {
                    improvement: true,
                    keyInsights: [
                        'Instagram engagement score: 93% - outstanding performance',
                        'Story reach: 18,700 with 234 replies - viral engagement',
                        'Saves: 412 - highest in history',
                        'VIP participation: 78% - exclusive access working',
                        'Link clicks: 678 - exceptional conversion funnel'
                    ]
                }
            }
        ];
        res.status(200).json({
            success: true,
            data: scores,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('AI Drop Scorer: Error fetching scores:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch scores',
            message: error instanceof Error ? error.message : 'Unknown error'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/ai-drop-predictor/scores.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$drop$2d$predictor$2f$scores$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/ai-drop-predictor/scores.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$drop$2d$predictor$2f$scores$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$drop$2d$predictor$2f$scores$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/ai-drop-predictor/scores",
        pathname: "/api/ai-drop-predictor/scores",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$drop$2d$predictor$2f$scores$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7de100a1._.js.map