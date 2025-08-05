module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/website-analytics/sessions.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock data for sessions with AI-powered behavior analysis
const mockSessions = [
    {
        id: '1',
        sessionId: 'sess_001',
        userId: 'user_123',
        device: 'mobile',
        source: 'social',
        duration: 245,
        pages: 3,
        scrollDepth: 78,
        rageClicks: 0,
        exits: 0,
        aiLabel: 'intent',
        aiSummary: 'User showed strong purchase intent, viewed multiple products and spent significant time on pricing pages',
        timestamp: new Date(),
        revenue: 299,
        products: [
            'product_1',
            'product_2'
        ],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        location: 'Cairo, Egypt',
        referrer: 'instagram.com'
    },
    {
        id: '2',
        sessionId: 'sess_002',
        userId: 'user_456',
        device: 'desktop',
        source: 'organic',
        duration: 89,
        pages: 1,
        scrollDepth: 23,
        rageClicks: 2,
        exits: 1,
        aiLabel: 'frustration',
        aiSummary: 'User experienced frustration with navigation, made multiple rage clicks and exited quickly',
        timestamp: new Date(),
        revenue: 0,
        products: [],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        location: 'Alexandria, Egypt',
        referrer: 'google.com'
    },
    {
        id: '3',
        sessionId: 'sess_003',
        userId: 'user_789',
        device: 'mobile',
        source: 'paid',
        duration: 567,
        pages: 5,
        scrollDepth: 92,
        rageClicks: 0,
        exits: 0,
        aiLabel: 'purchase',
        aiSummary: 'User completed a purchase journey, viewed product details, reviews, and successfully checked out',
        timestamp: new Date(),
        revenue: 599,
        products: [
            'product_3',
            'product_4'
        ],
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
        location: 'Giza, Egypt',
        referrer: 'facebook.com'
    },
    {
        id: '4',
        sessionId: 'sess_004',
        userId: 'user_101',
        device: 'tablet',
        source: 'direct',
        duration: 123,
        pages: 2,
        scrollDepth: 45,
        rageClicks: 1,
        exits: 0,
        aiLabel: 'exploration',
        aiSummary: 'User explored the site casually, viewed multiple categories but showed no strong purchase intent',
        timestamp: new Date(),
        revenue: 0,
        products: [
            'product_5'
        ],
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X)',
        location: 'Sharm El Sheikh, Egypt',
        referrer: 'direct'
    },
    {
        id: '5',
        sessionId: 'sess_005',
        userId: 'user_202',
        device: 'desktop',
        source: 'email',
        duration: 34,
        pages: 1,
        scrollDepth: 12,
        rageClicks: 3,
        exits: 1,
        aiLabel: 'confusion',
        aiSummary: 'User appeared confused by the interface, made multiple rage clicks and left quickly',
        timestamp: new Date(),
        revenue: 0,
        products: [],
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        location: 'Luxor, Egypt',
        referrer: 'mail.google.com'
    }
];
async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        // In a real implementation, this would:
        // 1. Query your analytics database (Google Analytics, Mixpanel, etc.)
        // 2. Process session data with AI for behavior analysis
        // 3. Apply machine learning models for session labeling
        // 4. Calculate engagement metrics and revenue attribution
        // Simulate API processing delay
        await new Promise((resolve)=>setTimeout(resolve, 100));
        // Filter sessions based on query parameters
        let filteredSessions = [
            ...mockSessions
        ];
        const { device, source, aiLabel, startDate, endDate } = req.query;
        if (device && device !== 'all') {
            filteredSessions = filteredSessions.filter((s)=>s.device === device);
        }
        if (source && source !== 'all') {
            filteredSessions = filteredSessions.filter((s)=>s.source === source);
        }
        if (aiLabel && aiLabel !== 'all') {
            filteredSessions = filteredSessions.filter((s)=>s.aiLabel === aiLabel);
        }
        // Calculate analytics metrics
        const totalSessions = filteredSessions.length;
        const totalRevenue = filteredSessions.reduce((sum, s)=>sum + (s.revenue || 0), 0);
        const avgDuration = filteredSessions.reduce((sum, s)=>sum + s.duration, 0) / totalSessions;
        const avgScrollDepth = filteredSessions.reduce((sum, s)=>sum + s.scrollDepth, 0) / totalSessions;
        const totalRageClicks = filteredSessions.reduce((sum, s)=>sum + s.rageClicks, 0);
        const conversionRate = filteredSessions.filter((s)=>s.revenue > 0).length / totalSessions;
        // AI-powered insights
        const insights = {
            topBehavior: filteredSessions.reduce((acc, s)=>{
                acc[s.aiLabel] = (acc[s.aiLabel] || 0) + 1;
                return acc;
            }, {}),
            deviceBreakdown: filteredSessions.reduce((acc, s)=>{
                acc[s.device] = (acc[s.device] || 0) + 1;
                return acc;
            }, {}),
            sourceBreakdown: filteredSessions.reduce((acc, s)=>{
                acc[s.source] = (acc[s.source] || 0) + 1;
                return acc;
            }, {})
        };
        return res.status(200).json({
            success: true,
            data: {
                sessions: filteredSessions,
                metrics: {
                    totalSessions,
                    totalRevenue,
                    avgDuration: Math.round(avgDuration),
                    avgScrollDepth: Math.round(avgScrollDepth),
                    totalRageClicks,
                    conversionRate: Math.round(conversionRate * 100) / 100
                },
                insights
            }
        });
    } catch (error) {
        console.error('Sessions API error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to load session data'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/website-analytics/sessions.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$sessions$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/website-analytics/sessions.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$sessions$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$sessions$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/website-analytics/sessions",
        pathname: "/api/website-analytics/sessions",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$sessions$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__cab51e54._.js.map