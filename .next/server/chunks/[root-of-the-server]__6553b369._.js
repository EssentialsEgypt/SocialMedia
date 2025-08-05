module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/ai-roi-forecast/comparisons.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock data for forecast comparisons
const mockComparisons = [
    {
        forecasted: {
            id: "forecast-3",
            productName: "Digital Course Bundle",
            predictedRevenue: 12000,
            projectedROI: 5.71
        },
        actual: {
            actualRevenue: 11850,
            actualSpend: 2100,
            actualROI: 5.64,
            accuracy: 98.8,
            completedAt: "2024-01-20T16:45:00Z"
        },
        accuracy: 98.8,
        variance: -0.07
    },
    {
        forecasted: {
            id: "forecast-4",
            productName: "Flash Sale - Accessories",
            predictedRevenue: 7500,
            projectedROI: 4.69
        },
        actual: {
            actualRevenue: 7200,
            actualSpend: 1600,
            actualROI: 4.5,
            accuracy: 96.0,
            completedAt: "2024-01-13T16:30:00Z"
        },
        accuracy: 96.0,
        variance: -0.19
    },
    {
        forecasted: {
            id: "forecast-5",
            productName: "Summer Collection Launch",
            predictedRevenue: 25000,
            projectedROI: 3.2
        },
        actual: {
            actualRevenue: 26800,
            actualSpend: 8200,
            actualROI: 3.27,
            accuracy: 97.8,
            completedAt: "2024-01-10T14:20:00Z"
        },
        accuracy: 97.8,
        variance: 0.07
    },
    {
        forecasted: {
            id: "forecast-6",
            productName: "Influencer Collaboration",
            predictedRevenue: 15000,
            projectedROI: 4.1
        },
        actual: {
            actualRevenue: 14200,
            actualSpend: 3800,
            actualROI: 3.74,
            accuracy: 91.2,
            completedAt: "2024-01-08T11:15:00Z"
        },
        accuracy: 91.2,
        variance: -0.36
    },
    {
        forecasted: {
            id: "forecast-7",
            productName: "Black Friday Campaign",
            predictedRevenue: 45000,
            projectedROI: 2.8
        },
        actual: {
            actualRevenue: 43200,
            actualSpend: 16500,
            actualROI: 2.62,
            accuracy: 93.6,
            completedAt: "2023-12-01T23:59:00Z"
        },
        accuracy: 93.6,
        variance: -0.18
    },
    {
        forecasted: {
            id: "forecast-8",
            productName: "Email Newsletter Launch",
            predictedRevenue: 8000,
            projectedROI: 6.2
        },
        actual: {
            actualRevenue: 7850,
            actualSpend: 1300,
            actualROI: 6.04,
            accuracy: 97.4,
            completedAt: "2023-11-25T09:30:00Z"
        },
        accuracy: 97.4,
        variance: -0.16
    }
];
async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Simulate API delay
            await new Promise((resolve)=>setTimeout(resolve, 300));
            res.status(200).json(mockComparisons);
        } catch (error) {
            res.status(500).json({
                error: 'Failed to fetch comparisons'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/ai-roi-forecast/comparisons.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$comparisons$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/ai-roi-forecast/comparisons.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$comparisons$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$comparisons$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/ai-roi-forecast/comparisons",
        pathname: "/api/ai-roi-forecast/comparisons",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$ai$2d$roi$2d$forecast$2f$comparisons$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6553b369._.js.map