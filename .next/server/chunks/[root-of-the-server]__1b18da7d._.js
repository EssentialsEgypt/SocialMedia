module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/ai-strategy-composer/goals.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock data for goals
const mockGoals = [
    {
        id: 'goal-1',
        type: 'revenue',
        target: '300,000 EGP',
        timeframe: 30,
        urgency: 'high',
        budget: 50000,
        constraints: [
            'Limited ad budget',
            'Seasonal product'
        ],
        description: 'Generate 300,000 EGP in revenue this month through strategic drops and marketing campaigns',
        createdAt: '2024-01-15T10:00:00Z',
        status: 'active'
    },
    {
        id: 'goal-2',
        type: 'orders',
        target: '1,000 orders',
        timeframe: 21,
        urgency: 'medium',
        budget: 25000,
        constraints: [
            'New product launch',
            'Competitive market'
        ],
        description: 'Achieve 1,000 orders in the next 21 days for the new hoodie collection launch',
        createdAt: '2024-01-10T14:30:00Z',
        status: 'active'
    },
    {
        id: 'goal-3',
        type: 'engagement',
        target: '15% engagement rate',
        timeframe: 14,
        urgency: 'low',
        budget: 10000,
        constraints: [
            'Organic growth focus',
            'Content quality'
        ],
        description: 'Increase Instagram engagement rate to 15% through improved content strategy',
        createdAt: '2024-01-08T09:15:00Z',
        status: 'completed'
    },
    {
        id: 'goal-4',
        type: 'reach',
        target: '50,000 new followers',
        timeframe: 60,
        urgency: 'medium',
        budget: 30000,
        constraints: [
            'Authentic growth',
            'Community building'
        ],
        description: 'Grow Instagram following to 50,000 new followers through organic and paid strategies',
        createdAt: '2024-01-05T16:45:00Z',
        status: 'active'
    },
    {
        id: 'goal-5',
        type: 'custom',
        target: 'VIP customer retention',
        timeframe: 7,
        urgency: 'high',
        budget: 15000,
        constraints: [
            'High-value customers',
            'Personalized approach'
        ],
        description: 'Increase VIP customer retention rate by implementing personalized marketing strategies',
        createdAt: '2024-01-12T11:20:00Z',
        status: 'active'
    }
];
async function handler(req, res) {
    if (req.method === 'GET') {
        // Simulate API delay
        await new Promise((resolve)=>setTimeout(resolve, 500));
        res.status(200).json(mockGoals);
    } else if (req.method === 'POST') {
        // Simulate API delay
        await new Promise((resolve)=>setTimeout(resolve, 800));
        const { type, target, timeframe, urgency, budget, constraints, description } = req.body;
        // Validate required fields
        if (!type || !target || !timeframe || !urgency || !description) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }
        // Create new goal
        const newGoal = {
            id: `goal-${Date.now()}`,
            type,
            target,
            timeframe,
            urgency,
            budget: budget || 0,
            constraints: constraints || [],
            description,
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        // Add to mock data (in real app, save to database)
        mockGoals.unshift(newGoal);
        res.status(201).json(newGoal);
    } else {
        res.setHeader('Allow', [
            'GET',
            'POST'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/ai-strategy-composer/goals.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$goals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/ai-strategy-composer/goals.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$goals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$goals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/ai-strategy-composer/goals",
        pathname: "/api/ai-strategy-composer/goals",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$strategy$2d$composer$2f$goals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__1b18da7d._.js.map