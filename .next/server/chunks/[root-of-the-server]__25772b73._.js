module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/ai-roi-forecast/forecasts.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock data for ROI forecasts
const mockForecasts = [
    {
        id: "forecast-1",
        productName: "Premium Streetwear Collection",
        productType: "physical",
        campaignType: "instagram",
        budget: 5000,
        predictedRevenue: 18500,
        estimatedSpend: 5200,
        projectedROI: 3.56,
        confidenceLevel: 88,
        breakEvenPoint: 18,
        dropWindowImpact: 1.2,
        creativeStrengthScore: 85,
        vipEngagementPotential: 0.75,
        reasoning: [
            "Product has high save/comment ratio on IG (4.2% vs 2.1% avg)",
            "VIP customers engaged with teaser story (67% view rate)",
            "No competitor drop within next 3 days",
            "CPC is currently down 17% week-over-week",
            "Seasonal factor: Back-to-school timing optimal"
        ],
        recommendations: [
            "Launch now with 20% budget shift toward story-based creatives",
            "Target lookalike audiences from previous successful drops",
            "Use UGC content from previous collection for social proof",
            "Schedule posts during peak engagement hours (7-9 PM)"
        ],
        forecastRanges: {
            bestCase: 4.8,
            mostLikely: 3.6,
            worstCase: 2.1
        },
        timeframes: {
            "24h": {
                roi: 1.2,
                revenue: 6240,
                spend: 5200
            },
            "3d": {
                roi: 2.1,
                revenue: 10920,
                spend: 5200
            },
            "7d": {
                roi: 3.6,
                revenue: 18720,
                spend: 5200
            },
            "14d": {
                roi: 4.2,
                revenue: 21840,
                spend: 5200
            }
        },
        marketFactors: {
            competitorActivity: "Low - No major drops detected",
            cpcTrend: "Down 17% week-over-week",
            audienceEngagement: "High - 4.2% save rate",
            seasonalFactor: 1.15
        },
        createdAt: "2024-01-15T10:30:00Z",
        status: "active"
    },
    {
        id: "forecast-2",
        productName: "Limited Edition Sneaker Drop",
        productType: "physical",
        campaignType: "facebook",
        budget: 8000,
        predictedRevenue: 32000,
        estimatedSpend: 8400,
        projectedROI: 3.81,
        confidenceLevel: 92,
        breakEvenPoint: 24,
        dropWindowImpact: 1.4,
        creativeStrengthScore: 92,
        vipEngagementPotential: 0.88,
        reasoning: [
            "Sneaker market showing 23% growth in target demographic",
            "Previous limited drops averaged 4.1x ROI",
            "Facebook ad performance up 31% this quarter",
            "VIP customer retention rate at 89%",
            "Competitor pricing analysis shows premium positioning works"
        ],
        recommendations: [
            "Allocate 40% budget to video ads with product demos",
            "Create urgency with countdown timer in ads",
            "Target sneaker enthusiast lookalike audiences",
            "Use retargeting for cart abandoners from previous drops"
        ],
        forecastRanges: {
            bestCase: 5.2,
            mostLikely: 3.8,
            worstCase: 2.8
        },
        timeframes: {
            "24h": {
                roi: 1.8,
                revenue: 15120,
                spend: 8400
            },
            "3d": {
                roi: 2.9,
                revenue: 24360,
                spend: 8400
            },
            "7d": {
                roi: 3.8,
                revenue: 31920,
                spend: 8400
            },
            "14d": {
                roi: 4.5,
                revenue: 37800,
                spend: 8400
            }
        },
        marketFactors: {
            competitorActivity: "Medium - 2 competitors launching next week",
            cpcTrend: "Stable with 5% increase",
            audienceEngagement: "Very High - 6.1% engagement rate",
            seasonalFactor: 1.25
        },
        createdAt: "2024-01-14T14:20:00Z",
        status: "active"
    },
    {
        id: "forecast-3",
        productName: "Digital Course Bundle",
        productType: "digital",
        campaignType: "email",
        budget: 2000,
        predictedRevenue: 12000,
        estimatedSpend: 2100,
        projectedROI: 5.71,
        confidenceLevel: 85,
        breakEvenPoint: 12,
        dropWindowImpact: 1.1,
        vipEngagementPotential: 0.92,
        reasoning: [
            "Email list has 89% open rate for educational content",
            "Previous course launches averaged 5.2x ROI",
            "High-value audience segment (avg. order value $297)",
            "No competing courses in this niche currently",
            "Seasonal timing: New Year resolution period"
        ],
        recommendations: [
            "Send 3-email sequence with case studies",
            "Offer early bird pricing for first 48 hours",
            "Include testimonials from previous students",
            "Create urgency with limited-time bonus content"
        ],
        forecastRanges: {
            bestCase: 7.1,
            mostLikely: 5.7,
            worstCase: 4.2
        },
        timeframes: {
            "24h": {
                roi: 2.1,
                revenue: 4410,
                spend: 2100
            },
            "3d": {
                roi: 3.8,
                revenue: 7980,
                spend: 2100
            },
            "7d": {
                roi: 5.7,
                revenue: 11970,
                spend: 2100
            },
            "14d": {
                roi: 6.5,
                revenue: 13650,
                spend: 2100
            }
        },
        marketFactors: {
            competitorActivity: "None detected in this niche",
            cpcTrend: "N/A for email campaigns",
            audienceEngagement: "Excellent - 89% open rate",
            seasonalFactor: 1.35
        },
        createdAt: "2024-01-13T09:15:00Z",
        status: "completed",
        actualResults: {
            actualRevenue: 11850,
            actualSpend: 2100,
            actualROI: 5.64,
            accuracy: 98.8,
            completedAt: "2024-01-20T16:45:00Z"
        }
    },
    {
        id: "forecast-4",
        productName: "Flash Sale - Accessories",
        productType: "flash_sale",
        campaignType: "whatsapp",
        budget: 1500,
        predictedRevenue: 7500,
        estimatedSpend: 1600,
        projectedROI: 4.69,
        confidenceLevel: 78,
        breakEvenPoint: 8,
        dropWindowImpact: 1.6,
        vipEngagementPotential: 0.65,
        reasoning: [
            "WhatsApp broadcast list has 94% delivery rate",
            "Flash sales typically perform 40% better than regular drops",
            "Accessories have high impulse buy potential",
            "Limited 24-hour window creates urgency",
            "Previous flash sales averaged 4.2x ROI"
        ],
        recommendations: [
            "Send broadcast 2 hours before sale starts",
            "Include countdown timer in messages",
            "Offer free shipping for orders over $50",
            "Use urgency messaging: 'Only 24 hours left'"
        ],
        forecastRanges: {
            bestCase: 6.2,
            mostLikely: 4.7,
            worstCase: 3.1
        },
        timeframes: {
            "24h": {
                roi: 4.7,
                revenue: 7520,
                spend: 1600
            },
            "3d": {
                roi: 4.7,
                revenue: 7520,
                spend: 1600
            },
            "7d": {
                roi: 4.7,
                revenue: 7520,
                spend: 1600
            },
            "14d": {
                roi: 4.7,
                revenue: 7520,
                spend: 1600
            }
        },
        marketFactors: {
            competitorActivity: "Low - Weekend timing reduces competition",
            cpcTrend: "N/A for WhatsApp campaigns",
            audienceEngagement: "High - 94% message delivery rate",
            seasonalFactor: 1.05
        },
        createdAt: "2024-01-12T16:30:00Z",
        status: "completed",
        actualResults: {
            actualRevenue: 7200,
            actualSpend: 1600,
            actualROI: 4.5,
            accuracy: 96.0,
            completedAt: "2024-01-13T16:30:00Z"
        }
    }
];
async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Simulate API delay
            await new Promise((resolve)=>setTimeout(resolve, 500));
            res.status(200).json(mockForecasts);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch forecasts'
            });
        }
    } else {
        res.setHeader('Allow', [
            'GET'
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/ai-roi-forecast/forecasts.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$forecasts$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/ai-roi-forecast/forecasts.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$forecasts$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$forecasts$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/ai-roi-forecast/forecasts",
        pathname: "/api/ai-roi-forecast/forecasts",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$forecasts$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__25772b73._.js.map