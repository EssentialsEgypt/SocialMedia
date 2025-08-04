module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/vip-customers/list.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
const mockVIPCustomers = [
    {
        id: "vip_001",
        name: "Sara Ahmed",
        email: "sara.ahmed@email.com",
        phone: "+201234567890",
        instagram: "@sara_style",
        tier: "Tier 1 - Power Buyer",
        totalSpent: 8500,
        orderCount: 12,
        lastOrder: "2024-01-15",
        daysSinceLastOrder: 21,
        purchaseProbability: 78,
        engagementScore: 92,
        favoriteCategories: [
            "Hoodies",
            "Accessories"
        ],
        socialInteractions: 45,
        storyReplies: 23,
        tags: 8,
        influenceIndex: 85,
        emotionalTriggers: [
            "Exclusive",
            "Limited",
            "Hidden"
        ],
        lifecycle: {
            firstVisit: "2023-03-15",
            firstOrder: "2023-04-02",
            lastActivity: "2024-01-20",
            status: "Active VIP"
        },
        recentActivity: [
            {
                type: "product_view",
                item: "Premium Hoodie",
                date: "2024-01-20"
            },
            {
                type: "cart_add",
                item: "Designer Cap",
                date: "2024-01-19"
            },
            {
                type: "story_reply",
                content: "Love this!",
                date: "2024-01-18"
            }
        ]
    },
    {
        id: "vip_002",
        name: "Ahmed Hassan",
        email: "ahmed.hassan@email.com",
        phone: "+201234567891",
        instagram: "@ahmed_fashion",
        tier: "Tier 2 - Social Advocate",
        totalSpent: 6200,
        orderCount: 8,
        lastOrder: "2024-01-10",
        daysSinceLastOrder: 26,
        purchaseProbability: 65,
        engagementScore: 88,
        favoriteCategories: [
            "T-Shirts",
            "Sneakers"
        ],
        socialInteractions: 67,
        storyReplies: 34,
        tags: 15,
        influenceIndex: 92,
        emotionalTriggers: [
            "New Arrival",
            "Trending",
            "Popular"
        ],
        lifecycle: {
            firstVisit: "2023-05-20",
            firstOrder: "2023-06-10",
            lastActivity: "2024-01-22",
            status: "Engaged VIP"
        },
        recentActivity: [
            {
                type: "product_share",
                item: "Limited T-Shirt",
                date: "2024-01-22"
            },
            {
                type: "comment",
                content: "This is fire!",
                date: "2024-01-21"
            },
            {
                type: "story_reply",
                content: "Need this!",
                date: "2024-01-20"
            }
        ]
    },
    {
        id: "vip_003",
        name: "Fatima Ali",
        email: "fatima.ali@email.com",
        phone: "+201234567892",
        instagram: "@fatima_luxury",
        tier: "Tier 3 - Silent Whale",
        totalSpent: 15000,
        orderCount: 5,
        lastOrder: "2024-01-05",
        daysSinceLastOrder: 31,
        purchaseProbability: 45,
        engagementScore: 35,
        favoriteCategories: [
            "Premium Items",
            "Limited Edition"
        ],
        socialInteractions: 12,
        storyReplies: 3,
        tags: 1,
        influenceIndex: 25,
        emotionalTriggers: [
            "Premium",
            "Exclusive",
            "Rare"
        ],
        lifecycle: {
            firstVisit: "2023-02-10",
            firstOrder: "2023-03-01",
            lastActivity: "2024-01-15",
            status: "At Risk"
        },
        recentActivity: [
            {
                type: "product_view",
                item: "Limited Edition Jacket",
                date: "2024-01-15"
            },
            {
                type: "wishlist_add",
                item: "Premium Sneakers",
                date: "2024-01-14"
            },
            {
                type: "email_open",
                campaign: "New Arrivals",
                date: "2024-01-13"
            }
        ]
    },
    {
        id: "vip_004",
        name: "Mohamed Omar",
        email: "mohamed.omar@email.com",
        phone: "+201234567893",
        instagram: "@mohamed_streetwear",
        tier: "Tier 1 - Power Buyer",
        totalSpent: 9200,
        orderCount: 15,
        lastOrder: "2024-01-18",
        daysSinceLastOrder: 18,
        purchaseProbability: 89,
        engagementScore: 95,
        favoriteCategories: [
            "Streetwear",
            "Limited Drops"
        ],
        socialInteractions: 78,
        storyReplies: 42,
        tags: 12,
        influenceIndex: 88,
        emotionalTriggers: [
            "Limited",
            "Exclusive",
            "Streetwear"
        ],
        lifecycle: {
            firstVisit: "2023-01-15",
            firstOrder: "2023-02-01",
            lastActivity: "2024-01-22",
            status: "Active VIP"
        },
        recentActivity: [
            {
                type: "product_view",
                item: "Limited Streetwear Collection",
                date: "2024-01-22"
            },
            {
                type: "story_reply",
                content: "This collection is insane!",
                date: "2024-01-21"
            },
            {
                type: "product_share",
                item: "Exclusive Hoodie",
                date: "2024-01-20"
            }
        ]
    }
];
function handler(req, res) {
    if (req.method === 'GET') {
        const { tier, minSpend, maxDaysSinceOrder, status } = req.query;
        let filteredCustomers = mockVIPCustomers;
        if (tier) {
            filteredCustomers = filteredCustomers.filter((customer)=>customer.tier.toLowerCase().includes(tier.toString().toLowerCase()));
        }
        if (minSpend) {
            filteredCustomers = filteredCustomers.filter((customer)=>customer.totalSpent >= parseInt(minSpend.toString()));
        }
        if (maxDaysSinceOrder) {
            filteredCustomers = filteredCustomers.filter((customer)=>customer.daysSinceLastOrder <= parseInt(maxDaysSinceOrder.toString()));
        }
        if (status) {
            filteredCustomers = filteredCustomers.filter((customer)=>customer.lifecycle.status.toLowerCase().includes(status.toString().toLowerCase()));
        }
        res.status(200).json({
            success: true,
            data: filteredCustomers,
            total: filteredCustomers.length,
            metrics: {
                totalVIPs: mockVIPCustomers.length,
                activeVIPs: mockVIPCustomers.filter((c)=>c.lifecycle.status.includes('Active')).length,
                atRiskVIPs: mockVIPCustomers.filter((c)=>c.lifecycle.status.includes('Risk')).length,
                averageSpend: Math.round(mockVIPCustomers.reduce((sum, c)=>sum + c.totalSpent, 0) / mockVIPCustomers.length),
                retentionRate: 87,
                engagementRate: 76
            }
        });
    } else {
        res.setHeader('Allow', [
            'GET'
        ]);
        res.status(405).json({
            error: 'Method not allowed'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/vip-customers/list.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$vip$2d$customers$2f$list$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/vip-customers/list.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$vip$2d$customers$2f$list$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$vip$2d$customers$2f$list$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/vip-customers/list",
        pathname: "/api/vip-customers/list",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$vip$2d$customers$2f$list$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__55409f71._.js.map