module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/pages/api/crm/leads.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>handler)
});
const mockLeads = [
    {
        id: "lead_001",
        name: "Ahmed Hassan",
        email: "ahmed.hassan@company.com",
        phone: "+201234567890",
        company: "Tech Solutions Egypt",
        position: "Marketing Director",
        source: "Website",
        status: "Qualified",
        value: 50000,
        probability: 75,
        stage: "Proposal",
        lastContact: "2024-01-20",
        nextFollowUp: "2024-01-25",
        notes: "Interested in full marketing automation package",
        tags: [
            "High Value",
            "Tech",
            "Ready to Buy"
        ],
        activities: [
            {
                type: "call",
                date: "2024-01-20",
                notes: "Discussed requirements"
            },
            {
                type: "email",
                date: "2024-01-19",
                notes: "Sent proposal"
            },
            {
                type: "meeting",
                date: "2024-01-18",
                notes: "Initial discovery call"
            }
        ],
        aiInsights: {
            readinessScore: 85,
            riskFactors: [
                "Budget constraints",
                "Competition"
            ],
            recommendedActions: [
                "Send case study",
                "Schedule demo"
            ],
            nextBestAction: "Follow up with ROI calculation"
        }
    },
    {
        id: "lead_002",
        name: "Sara Mahmoud",
        email: "sara.mahmoud@retail.com",
        phone: "+201234567891",
        company: "Fashion Retail Egypt",
        position: "CEO",
        source: "Referral",
        status: "New",
        value: 25000,
        probability: 40,
        stage: "Discovery",
        lastContact: "2024-01-22",
        nextFollowUp: "2024-01-24",
        notes: "Looking for social media management solution",
        tags: [
            "Retail",
            "Startup",
            "Budget Conscious"
        ],
        activities: [
            {
                type: "email",
                date: "2024-01-22",
                notes: "Initial outreach"
            },
            {
                type: "call",
                date: "2024-01-21",
                notes: "Qualification call"
            }
        ],
        aiInsights: {
            readinessScore: 60,
            riskFactors: [
                "Limited budget",
                "Decision making process"
            ],
            recommendedActions: [
                "Send pricing guide",
                "Book discovery call"
            ],
            nextBestAction: "Send value proposition email"
        }
    },
    {
        id: "lead_003",
        name: "Mohamed Ali",
        email: "mohamed.ali@restaurant.com",
        phone: "+201234567892",
        company: "Cairo Cuisine",
        position: "Owner",
        source: "Social Media",
        status: "Contacted",
        value: 15000,
        probability: 90,
        stage: "Negotiation",
        lastContact: "2024-01-23",
        nextFollowUp: "2024-01-26",
        notes: "Ready to sign, just finalizing terms",
        tags: [
            "Restaurant",
            "High Probability",
            "Quick Close"
        ],
        activities: [
            {
                type: "meeting",
                date: "2024-01-23",
                notes: "Contract discussion"
            },
            {
                type: "email",
                date: "2024-01-22",
                notes: "Proposal sent"
            },
            {
                type: "call",
                date: "2024-01-21",
                notes: "Requirements gathering"
            }
        ],
        aiInsights: {
            readinessScore: 95,
            riskFactors: [
                "Price sensitivity"
            ],
            recommendedActions: [
                "Send contract",
                "Schedule signing"
            ],
            nextBestAction: "Close the deal with final proposal"
        }
    }
];
function handler(req, res) {
    if (req.method === 'GET') {
        const { status, stage, source, search } = req.query;
        let filteredLeads = [
            ...mockLeads
        ];
        if (status) {
            filteredLeads = filteredLeads.filter((lead)=>lead.status === status);
        }
        if (stage) {
            filteredLeads = filteredLeads.filter((lead)=>lead.stage === stage);
        }
        if (source) {
            filteredLeads = filteredLeads.filter((lead)=>lead.source === source);
        }
        if (search) {
            const searchTerm = search.toString().toLowerCase();
            filteredLeads = filteredLeads.filter((lead)=>lead.name.toLowerCase().includes(searchTerm) || lead.company.toLowerCase().includes(searchTerm) || lead.email.toLowerCase().includes(searchTerm));
        }
        res.status(200).json({
            success: true,
            data: filteredLeads,
            total: filteredLeads.length,
            summary: {
                totalValue: filteredLeads.reduce((sum, lead)=>sum + lead.value, 0),
                averageProbability: Math.round(filteredLeads.reduce((sum, lead)=>sum + lead.probability, 0) / filteredLeads.length),
                highValueLeads: filteredLeads.filter((lead)=>lead.value > 30000).length,
                readyToClose: filteredLeads.filter((lead)=>lead.probability > 80).length
            }
        });
    } else if (req.method === 'POST') {
        const newLead = {
            id: `lead_${Date.now()}`,
            ...req.body,
            aiInsights: {
                readinessScore: Math.floor(Math.random() * 40) + 60,
                riskFactors: [
                    "New lead - needs qualification"
                ],
                recommendedActions: [
                    "Schedule discovery call",
                    "Send welcome email"
                ],
                nextBestAction: "Qualify lead with discovery call"
            }
        };
        mockLeads.push(newLead);
        res.status(201).json({
            success: true,
            data: newLead,
            message: 'Lead created successfully'
        });
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const leadIndex = mockLeads.findIndex((lead)=>lead.id === id);
        if (leadIndex === -1) {
            return res.status(404).json({
                error: 'Lead not found'
            });
        }
        mockLeads[leadIndex] = {
            ...mockLeads[leadIndex],
            ...req.body
        };
        res.status(200).json({
            success: true,
            data: mockLeads[leadIndex],
            message: 'Lead updated successfully'
        });
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        const leadIndex = mockLeads.findIndex((lead)=>lead.id === id);
        if (leadIndex === -1) {
            return res.status(404).json({
                error: 'Lead not found'
            });
        }
        mockLeads.splice(leadIndex, 1);
        res.status(200).json({
            success: true,
            message: 'Lead deleted successfully'
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/crm/leads.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$leads$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/crm/leads.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$leads$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$leads$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/crm/leads",
        pathname: "/api/crm/leads",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$crm$2f$leads$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__13676819._.js.map