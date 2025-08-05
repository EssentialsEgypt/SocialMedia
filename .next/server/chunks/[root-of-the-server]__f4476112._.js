module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/website-analytics/benchmarks.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock industry benchmark data
const mockBenchmarks = [
    {
        metric: 'Bounce Rate',
        yourValue: 0.42,
        industryAverage: 0.58,
        percentile: 75,
        trend: 'up',
        aiAnalysis: 'Your bounce rate is significantly better than industry average, indicating strong content relevance',
        category: 'engagement',
        lastUpdated: new Date()
    },
    {
        metric: 'Conversion Rate',
        yourValue: 0.032,
        industryAverage: 0.025,
        percentile: 80,
        trend: 'up',
        aiAnalysis: 'Above-average conversion rate suggests effective UX and strong product-market fit',
        category: 'conversion',
        lastUpdated: new Date()
    },
    {
        metric: 'Average Order Value',
        yourValue: 299,
        industryAverage: 245,
        percentile: 70,
        trend: 'up',
        aiAnalysis: 'Strong AOV indicates effective pricing strategy and product quality perception',
        category: 'revenue',
        lastUpdated: new Date()
    },
    {
        metric: 'Session Duration',
        yourValue: 245,
        industryAverage: 180,
        percentile: 85,
        trend: 'up',
        aiAnalysis: 'Excellent session duration shows high user engagement and content quality',
        category: 'engagement',
        lastUpdated: new Date()
    },
    {
        metric: 'Pages per Session',
        yourValue: 3.2,
        industryAverage: 2.8,
        percentile: 75,
        trend: 'up',
        aiAnalysis: 'Good page depth indicates effective navigation and content discovery',
        category: 'engagement',
        lastUpdated: new Date()
    },
    {
        metric: 'Mobile Conversion Rate',
        yourValue: 0.075,
        industryAverage: 0.062,
        percentile: 78,
        trend: 'up',
        aiAnalysis: 'Strong mobile performance suggests excellent mobile UX optimization',
        category: 'conversion',
        lastUpdated: new Date()
    },
    {
        metric: 'Cart Abandonment Rate',
        yourValue: 0.68,
        industryAverage: 0.72,
        percentile: 65,
        trend: 'down',
        aiAnalysis: 'Lower than average cart abandonment indicates effective checkout process',
        category: 'conversion',
        lastUpdated: new Date()
    },
    {
        metric: 'Return Customer Rate',
        yourValue: 0.28,
        industryAverage: 0.22,
        percentile: 82,
        trend: 'up',
        aiAnalysis: 'High return customer rate shows strong brand loyalty and customer satisfaction',
        category: 'retention',
        lastUpdated: new Date()
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
        // 1. Fetch your actual metrics from analytics platforms
        // 2. Compare against industry benchmarks from reliable sources
        // 3. Use AI to analyze performance patterns and generate insights
        // 4. Calculate percentiles and trends
        // Simulate API processing delay
        await new Promise((resolve)=>setTimeout(resolve, 100));
        // Filter benchmarks based on query parameters
        let filteredBenchmarks = [
            ...mockBenchmarks
        ];
        const { category, metric } = req.query;
        if (category && category !== 'all') {
            filteredBenchmarks = filteredBenchmarks.filter((b)=>b.category === category);
        }
        if (metric) {
            filteredBenchmarks = filteredBenchmarks.filter((b)=>b.metric.toLowerCase().includes(metric.toLowerCase()));
        }
        // Calculate analytics metrics
        const totalMetrics = filteredBenchmarks.length;
        const aboveAverage = filteredBenchmarks.filter((b)=>b.yourValue > b.industryAverage).length;
        const topQuartile = filteredBenchmarks.filter((b)=>b.percentile >= 75).length;
        const avgPercentile = filteredBenchmarks.reduce((sum, b)=>sum + b.percentile, 0) / totalMetrics;
        // AI-powered insights
        const insights = {
            overallPerformance: avgPercentile >= 75 ? 'excellent' : avgPercentile >= 60 ? 'good' : 'needs_improvement',
            strengths: filteredBenchmarks.filter((b)=>b.percentile >= 75).map((b)=>({
                    metric: b.metric,
                    percentile: b.percentile
                })),
            weaknesses: filteredBenchmarks.filter((b)=>b.percentile < 50).map((b)=>({
                    metric: b.metric,
                    percentile: b.percentile
                })),
            opportunities: filteredBenchmarks.filter((b)=>b.percentile >= 50 && b.percentile < 75).map((b)=>({
                    metric: b.metric,
                    percentile: b.percentile
                }))
        };
        // Generate AI recommendations
        const recommendations = [];
        if (insights.weaknesses.length > 0) {
            recommendations.push({
                type: 'improvement',
                priority: 'high',
                message: `Focus on improving ${insights.weaknesses.map((w)=>w.metric).join(', ')} to reach industry standards`
            });
        }
        if (insights.strengths.length > 0) {
            recommendations.push({
                type: 'optimization',
                priority: 'medium',
                message: `Leverage your strengths in ${insights.strengths.map((s)=>s.metric).join(', ')} to drive further growth`
            });
        }
        if (insights.opportunities.length > 0) {
            recommendations.push({
                type: 'opportunity',
                priority: 'medium',
                message: `Optimize ${insights.opportunities.map((o)=>o.metric).join(', ')} to move into top quartile performance`
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                benchmarks: filteredBenchmarks,
                metrics: {
                    totalMetrics,
                    aboveAverage,
                    topQuartile,
                    avgPercentile: Math.round(avgPercentile)
                },
                insights,
                recommendations
            }
        });
    } catch (error) {
        console.error('Benchmarks API error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to load benchmark data'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/website-analytics/benchmarks.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$benchmarks$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/website-analytics/benchmarks.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$benchmarks$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$benchmarks$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/website-analytics/benchmarks",
        pathname: "/api/website-analytics/benchmarks",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$website$2d$analytics$2f$benchmarks$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f4476112._.js.map