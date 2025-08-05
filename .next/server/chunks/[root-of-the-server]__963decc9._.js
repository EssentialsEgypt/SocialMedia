module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/cash-log/entries.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
// Mock database for demonstration
let cashLogEntries = [
    {
        id: 1,
        date: "2024-01-15",
        description: "Instagram – Story Campaign – August 3",
        amount: -2000,
        category: "Ad Spend",
        subcategory: "Instagram Ads",
        transaction_type: "expense",
        source: "instagram",
        platform: "instagram",
        tags: [
            "@campaign",
            "story"
        ],
        paid: false,
        reimbursed: false
    },
    {
        id: 2,
        date: "2024-01-10",
        description: "Salary – @Ahmed",
        amount: -10000,
        category: "Salary",
        transaction_type: "expense",
        source: "salary",
        tags: [
            "@Ahmed",
            "salary"
        ],
        paid: true,
        reimbursed: false
    },
    {
        id: 3,
        date: "2024-01-12",
        description: "Bonus – @Omar",
        amount: -2000,
        category: "Bonus",
        transaction_type: "expense",
        source: "bonus",
        tags: [
            "@Omar",
            "bonus",
            "salary"
        ],
        paid: false,
        reimbursed: false
    },
    {
        id: 4,
        date: "2024-01-14",
        description: "Manual Order – Supreme Hoodie",
        amount: -1850,
        category: "Order",
        subcategory: "Manual Order",
        transaction_type: "expense",
        source: "manual",
        tags: [
            "@order",
            "supreme"
        ],
        paid: false,
        reimbursed: false
    },
    {
        id: 5,
        date: "2024-01-16",
        description: "Facebook Ad Campaign: Summer Sale",
        amount: -1500,
        category: "Ad Spend",
        subcategory: "Facebook Ads",
        transaction_type: "expense",
        source: "facebook_ads",
        platform: "facebook",
        tags: [
            "@campaign",
            "summer"
        ],
        paid: false,
        reimbursed: false
    },
    {
        id: 6,
        date: "2024-01-20",
        description: "Monthly Revenue - Shopify Store",
        amount: 25000,
        category: "Revenue",
        subcategory: "Shopify",
        transaction_type: "income",
        source: "shopify",
        platform: "shopify",
        tags: [
            "@revenue",
            "monthly"
        ],
        paid: true,
        reimbursed: false
    }
];
function handler(req, res) {
    const { method } = req;
    switch(method){
        case 'GET':
            // Get all cash log entries with optional filtering
            const { month, category, platform } = req.query;
            let filteredEntries = [
                ...cashLogEntries
            ];
            if (month) {
                filteredEntries = filteredEntries.filter((entry)=>entry.date.startsWith(month));
            }
            if (category) {
                filteredEntries = filteredEntries.filter((entry)=>entry.category === category);
            }
            if (platform) {
                filteredEntries = filteredEntries.filter((entry)=>entry.platform === platform);
            }
            return res.status(200).json({
                entries: filteredEntries
            });
        case 'POST':
            // Add new cash log entry
            const newEntry = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                ...req.body
            };
            cashLogEntries.unshift(newEntry);
            return res.status(201).json({
                entry: newEntry
            });
        case 'PUT':
            // Update existing cash log entry
            const { id } = req.query;
            const entryIndex = cashLogEntries.findIndex((entry)=>entry.id === parseInt(id));
            if (entryIndex === -1) {
                return res.status(404).json({
                    error: 'Entry not found'
                });
            }
            cashLogEntries[entryIndex] = {
                ...cashLogEntries[entryIndex],
                ...req.body
            };
            return res.status(200).json({
                entry: cashLogEntries[entryIndex]
            });
        case 'DELETE':
            // Delete cash log entry
            const deleteId = req.query.id;
            const deleteIndex = cashLogEntries.findIndex((entry)=>entry.id === parseInt(deleteId));
            if (deleteIndex === -1) {
                return res.status(404).json({
                    error: 'Entry not found'
                });
            }
            const deletedEntry = cashLogEntries.splice(deleteIndex, 1)[0];
            return res.status(200).json({
                entry: deletedEntry
            });
        default:
            res.setHeader('Allow', [
                'GET',
                'POST',
                'PUT',
                'DELETE'
            ]);
            return res.status(405).json({
                error: `Method ${method} Not Allowed`
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/cash-log/entries.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$cash$2d$log$2f$entries$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/cash-log/entries.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$cash$2d$log$2f$entries$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$cash$2d$log$2f$entries$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/cash-log/entries",
        pathname: "/api/cash-log/entries",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$cash$2d$log$2f$entries$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__963decc9._.js.map