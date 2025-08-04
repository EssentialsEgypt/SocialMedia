module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/crm/deals.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
const mockDeals = [
    {
        id: "deal_001",
        name: "Tech Solutions Marketing Package",
        lead: "Ahmed Hassan",
        value: 50000,
        stage: "Proposal",
        probability: 75,
        closeDate: "2024-02-15",
        owner: "Sales Team",
        products: [
            "Social Media Management",
            "Content Creation",
            "Analytics"
        ],
        notes: "Comprehensive marketing solution for tech company",
        activities: [
            {
                type: "proposal",
                date: "2024-01-20",
                value: 50000
            },
            {
                type: "meeting",
                date: "2024-01-18",
                notes: "Requirements discussion"
            }
        ]
    },
    {
        id: "deal_002",
        name: "Fashion Retail Social Media",
        lead: "Sara Mahmoud",
        value: 25000,
        stage: "Discovery",
        probability: 40,
        closeDate: "2024-03-01",
        owner: "Sales Team",
        products: [
            "Social Media Management",
            "Content Creation"
        ],
        notes: "Basic social media management for retail startup",
        activities: [
            {
                type: "discovery",
                date: "2024-01-22",
                notes: "Initial meeting"
            }
        ]
    },
    {
        id: "deal_003",
        name: "Restaurant Marketing Automation",
        lead: "Mohamed Ali",
        value: 15000,
        stage: "Negotiation",
        probability: 90,
        closeDate: "2024-01-30",
        owner: "Sales Team",
        products: [
            "Marketing Automation",
            "Social Media"
        ],
        notes: "Ready to close, finalizing contract terms",
        activities: [
            {
                type: "negotiation",
                date: "2024-01-23",
                notes: "Contract discussion"
            },
            {
                type: "proposal",
                date: "2024-01-22",
                value: 15000
            }
        ]
    }
];
function handler(req, res) {
    if (req.method === 'GET') {
        const { stage, owner, search, minValue, maxValue } = req.query;
        let filteredDeals = [
            ...mockDeals
        ];
        if (stage) {
            filteredDeals = filteredDeals.filter((deal)=>deal.stage === stage);
        }
        if (owner) {
            filteredDeals = filteredDeals.filter((deal)=>deal.owner === owner);
        }
        if (search) {
            const searchTerm = search.toString().toLowerCase();
            filteredDeals = filteredDeals.filter((deal)=>deal.name.toLowerCase().includes(searchTerm) || deal.lead.toLowerCase().includes(searchTerm) || deal.products.some((product)=>product.toLowerCase().includes(searchTerm)));
        }
        if (minValue) {
            filteredDeals = filteredDeals.filter((deal)=>deal.value >= Number(minValue));
        }
        if (maxValue) {
            filteredDeals = filteredDeals.filter((deal)=>deal.value <= Number(maxValue));
        }
        res.status(200).json({
            success: true,
            data: filteredDeals,
            total: filteredDeals.length,
            summary: {
                totalValue: filteredDeals.reduce((sum, deal)=>sum + deal.value, 0),
                averageValue: Math.round(filteredDeals.reduce((sum, deal)=>sum + deal.value, 0) / filteredDeals.length),
                averageProbability: Math.round(filteredDeals.reduce((sum, deal)=>sum + deal.probability, 0) / filteredDeals.length),
                highProbabilityDeals: filteredDeals.filter((deal)=>deal.probability > 80).length,
                expectedValue: filteredDeals.reduce((sum, deal)=>sum + deal.value * deal.probability / 100, 0)
            }
        });
    } else if (req.method === 'POST') {
        const newDeal = {
            id: `deal_${Date.now()}`,
            ...req.body,
            activities: []
        };
        mockDeals.push(newDeal);
        res.status(201).json({
            success: true,
            data: newDeal,
            message: 'Deal created successfully'
        });
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const dealIndex = mockDeals.findIndex((deal)=>deal.id === id);
        if (dealIndex === -1) {
            return res.status(404).json({
                error: 'Deal not found'
            });
        }
        mockDeals[dealIndex] = {
            ...mockDeals[dealIndex],
            ...req.body
        };
        res.status(200).json({
            success: true,
            data: mockDeals[dealIndex],
            message: 'Deal updated successfully'
        });
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const dealIndex = mockDeals.findIndex((deal)=>deal.id === id);
        if (dealIndex === -1) {
            return res.status(404).json({
                error: 'Deal not found'
            });
        }
        mockDeals.splice(dealIndex, 1);
        res.status(200).json({
            success: true,
            message: 'Deal deleted successfully'
        });
    } else {
        res.setHeader('Allow', [
            'GET',
            'POST',
            'PUT',
            'DELETE'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/crm/deals.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$deals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/crm/deals.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$deals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$deals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/crm/deals",
        pathname: "/api/crm/deals",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$deals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__646d3651._.js.map