(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/hooks/use-mobile.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "useIsMobile": (()=>useIsMobile)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsMobile.useEffect": ()=>{
            const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
            const onChange = {
                "useIsMobile.useEffect.onChange": ()=>{
                    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
                }
            }["useIsMobile.useEffect.onChange"];
            mql.addEventListener("change", onChange);
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            return ({
                "useIsMobile.useEffect": ()=>mql.removeEventListener("change", onChange)
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], []);
    return !!isMobile;
}
_s(useIsMobile, "D6B2cPXNCaIbeOx+abFr1uxLRM0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/ai-ad-idea-generator.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// AI-Powered Ad Idea Generator Service
// Comprehensive service for generating dynamic, context-aware ad concepts
__turbopack_context__.s({
    "AIAdIdeaGeneratorService": (()=>AIAdIdeaGeneratorService),
    "aiAdIdeaGeneratorService": (()=>aiAdIdeaGeneratorService)
});
class AIAdIdeaGeneratorService {
    baseUrl = '/api/ai-ad-idea-generator';
    // 1. Real-Time Ad Context Engine
    async generateContextAwareAd(productContext) {
        const response = await fetch(`${this.baseUrl}/generate-context-ad`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productContext)
        });
        return response.json();
    }
    // 2. Full Ad Blueprint Output
    async generateAdBlueprint(product, platform, audienceType) {
        const response = await fetch(`${this.baseUrl}/generate-blueprint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                platform,
                audienceType
            })
        });
        return response.json();
    }
    // 3. Segment-Aware Copy Logic
    async generateSegmentSpecificCopy(product, segment) {
        const response = await fetch(`${this.baseUrl}/segment-copy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                segment
            })
        });
        return response.json();
    }
    // 4. Platform-Specific Output Generator
    async generatePlatformSpecificAd(product, platform, segment) {
        const response = await fetch(`${this.baseUrl}/platform-specific`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                platform,
                segment
            })
        });
        return response.json();
    }
    // 5. Visual Cue Builder (AI Concepting)
    async generateVisualCues(product, platform, angle) {
        const response = await fetch(`${this.baseUrl}/visual-cues`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                platform,
                angle
            })
        });
        return response.json();
    }
    // 6. Ad Angle Library
    async getOptimalAngle(product, audienceType, platform) {
        const response = await fetch(`${this.baseUrl}/optimal-angle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                audienceType,
                platform
            })
        });
        return response.json();
    }
    // 7. A/B Testing Generator
    async generateABTestVariants(baseAd, count = 5) {
        const response = await fetch(`${this.baseUrl}/ab-test-variants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                baseAd,
                count
            })
        });
        return response.json();
    }
    // 8. Drop-Aware Campaign Generator
    async generateDropCampaign(productId) {
        const response = await fetch(`${this.baseUrl}/drop-campaign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId
            })
        });
        return response.json();
    }
    // Additional AI Features
    async getTimingInsights(audienceType) {
        const response = await fetch(`${this.baseUrl}/timing-insights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                audienceType
            })
        });
        return response.json();
    }
    async optimizeAdPerformance(adId, performanceData) {
        const response = await fetch(`${this.baseUrl}/optimize-performance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adId,
                performanceData
            })
        });
        return response.json();
    }
    async generateVoiceHook(product, platform) {
        const response = await fetch(`${this.baseUrl}/voice-hook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                platform
            })
        });
        return response.json();
    }
    // Batch Operations
    async generateMultiPlatformCampaign(product, platforms) {
        const response = await fetch(`${this.baseUrl}/multi-platform`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product,
                platforms
            })
        });
        return response.json();
    }
    async analyzeCompetitorAds(competitorUrls) {
        const response = await fetch(`${this.baseUrl}/analyze-competitors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                competitorUrls
            })
        });
        return response.json();
    }
    // ViralContent-AdIdeaEnhancer: Viral content analysis and ad generation
    async getViralContentAnalysis(timeframe = '30d') {
        const response = await fetch(`${this.baseUrl}/viral-content-analysis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeframe
            })
        });
        return response.json();
    }
    async generateViralBasedAdIdea(viralContent, targetProduct) {
        const response = await fetch(`${this.baseUrl}/viral-based-ad-idea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                viralContent,
                targetProduct
            })
        });
        return response.json();
    }
    async generateViralAdCampaign(viralContentList, product, campaignType = 'retargeting') {
        const response = await fetch(`${this.baseUrl}/viral-ad-campaign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                viralContentList,
                product,
                campaignType
            })
        });
        return response.json();
    }
    async analyzeViralPatterns(contentList) {
        const response = await fetch(`${this.baseUrl}/analyze-viral-patterns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contentList
            })
        });
        return response.json();
    }
    async remixViralContent(originalContent, newProduct, remixType) {
        const response = await fetch(`${this.baseUrl}/remix-viral-content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                originalContent,
                newProduct,
                remixType
            })
        });
        return response.json();
    }
    async getTopPerformingContent(contentType = 'all', limit = 10) {
        const response = await fetch(`${this.baseUrl}/top-performing-content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contentType,
                limit
            })
        });
        return response.json();
    }
}
const aiAdIdeaGeneratorService = new AIAdIdeaGeneratorService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_5720f581._.js.map