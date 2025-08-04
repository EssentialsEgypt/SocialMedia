module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/crm/activities.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
const mockActivities = [
    {
        id: "act_001",
        type: "call",
        lead: "Ahmed Hassan",
        date: "2024-01-20",
        duration: 30,
        notes: "Discussed proposal details and timeline",
        outcome: "Positive",
        nextAction: "Send follow-up email with ROI calculation",
        aiInsights: {
            sentiment: "Positive",
            priority: "High",
            recommendedFollowUp: "Schedule demo within 48 hours"
        }
    },
    {
        id: "act_002",
        type: "meeting",
        lead: "Mohamed Ali",
        date: "2024-01-23",
        duration: 60,
        notes: "Contract negotiation and final terms discussion",
        outcome: "Very Positive",
        nextAction: "Prepare contract for signing",
        aiInsights: {
            sentiment: "Very Positive",
            priority: "Critical",
            recommendedFollowUp: "Send contract immediately"
        }
    },
    {
        id: "act_003",
        type: "email",
        lead: "Sara Mahmoud",
        date: "2024-01-22",
        duration: 5,
        notes: "Sent initial proposal and pricing information",
        outcome: "Neutral",
        nextAction: "Follow up with discovery call",
        aiInsights: {
            sentiment: "Neutral",
            priority: "Medium",
            recommendedFollowUp: "Schedule discovery call this week"
        }
    },
    {
        id: "act_004",
        type: "call",
        lead: "Ahmed Hassan",
        date: "2024-01-18",
        duration: 45,
        notes: "Initial discovery call - discussed pain points and requirements",
        outcome: "Positive",
        nextAction: "Send detailed proposal",
        aiInsights: {
            sentiment: "Positive",
            priority: "High",
            recommendedFollowUp: "Send proposal within 24 hours"
        }
    },
    {
        id: "act_005",
        type: "meeting",
        lead: "Sara Mahmoud",
        date: "2024-01-21",
        duration: 30,
        notes: "Qualification call - confirmed budget and decision timeline",
        outcome: "Positive",
        nextAction: "Send pricing guide and case studies",
        aiInsights: {
            sentiment: "Positive",
            priority: "Medium",
            recommendedFollowUp: "Send relevant case studies"
        }
    }
];
function handler(req, res) {
    if (req.method === 'GET') {
        const { lead, type, outcome, dateFrom, dateTo } = req.query;
        let filteredActivities = [
            ...mockActivities
        ];
        if (lead) {
            filteredActivities = filteredActivities.filter((activity)=>activity.lead === lead);
        }
        if (type) {
            filteredActivities = filteredActivities.filter((activity)=>activity.type === type);
        }
        if (outcome) {
            filteredActivities = filteredActivities.filter((activity)=>activity.outcome === outcome);
        }
        if (dateFrom) {
            filteredActivities = filteredActivities.filter((activity)=>activity.date >= dateFrom.toString());
        }
        if (dateTo) {
            filteredActivities = filteredActivities.filter((activity)=>activity.date <= dateTo.toString());
        }
        // Sort by date (newest first)
        filteredActivities.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
        res.status(200).json({
            success: true,
            data: filteredActivities,
            total: filteredActivities.length,
            summary: {
                totalDuration: filteredActivities.reduce((sum, activity)=>sum + activity.duration, 0),
                averageDuration: Math.round(filteredActivities.reduce((sum, activity)=>sum + activity.duration, 0) / filteredActivities.length),
                positiveOutcomes: filteredActivities.filter((activity)=>activity.outcome.includes('Positive')).length,
                activitiesByType: filteredActivities.reduce((acc, activity)=>{
                    acc[activity.type] = (acc[activity.type] || 0) + 1;
                    return acc;
                }, {})
            }
        });
    } else if (req.method === 'POST') {
        const newActivity = {
            id: `act_${Date.now()}`,
            ...req.body,
            aiInsights: {
                sentiment: req.body.outcome === 'Positive' || req.body.outcome === 'Very Positive' ? 'Positive' : 'Neutral',
                priority: req.body.duration > 30 ? 'High' : 'Medium',
                recommendedFollowUp: 'Schedule follow-up based on outcome'
            }
        };
        mockActivities.push(newActivity);
        res.status(201).json({
            success: true,
            data: newActivity,
            message: 'Activity created successfully'
        });
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const activityIndex = mockActivities.findIndex((activity)=>activity.id === id);
        if (activityIndex === -1) {
            return res.status(404).json({
                error: 'Activity not found'
            });
        }
        mockActivities[activityIndex] = {
            ...mockActivities[activityIndex],
            ...req.body
        };
        res.status(200).json({
            success: true,
            data: mockActivities[activityIndex],
            message: 'Activity updated successfully'
        });
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const activityIndex = mockActivities.findIndex((activity)=>activity.id === id);
        if (activityIndex === -1) {
            return res.status(404).json({
                error: 'Activity not found'
            });
        }
        mockActivities.splice(activityIndex, 1);
        res.status(200).json({
            success: true,
            message: 'Activity deleted successfully'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/crm/activities.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$activities$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/crm/activities.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$activities$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$activities$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/crm/activities",
        pathname: "/api/crm/activities",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$activities$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__073672f4._.js.map