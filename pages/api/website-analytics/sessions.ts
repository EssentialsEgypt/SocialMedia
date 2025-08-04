import { NextApiRequest, NextApiResponse } from 'next'

interface SessionData {
    id: string
    session_id: string
    user_id?: string
    timestamp: string
    device_type: string
    traffic_source: string
    page_path: string
    session_duration: number
    scroll_depth_percentage: number
    rage_clicks: number
    hover_back: boolean
    cart_view: boolean
    checkout_reached: boolean
    converted: boolean
    order_value: number
    session_labels: string[]
    ai_summary: string
}

// Mock data for demonstration
const mockSessions: SessionData[] = [
    {
        id: "1",
        session_id: "sess_001",
        timestamp: "2024-01-15T10:30:00Z",
        device_type: "mobile",
        traffic_source: "instagram",
        page_path: "/collections/hoodies",
        session_duration: 245,
        scroll_depth_percentage: 78,
        rage_clicks: 0,
        hover_back: false,
        cart_view: true,
        checkout_reached: true,
        converted: true,
        order_value: 1250.00,
        session_labels: ["intent", "high_intent"],
        ai_summary: "User showed strong purchase intent, spent significant time on product pages, and successfully converted."
    },
    {
        id: "2",
        session_id: "sess_002",
        timestamp: "2024-01-15T11:15:00Z",
        device_type: "desktop",
        traffic_source: "google",
        page_path: "/products/bape-shark-hoodie",
        session_duration: 89,
        scroll_depth_percentage: 23,
        rage_clicks: 3,
        hover_back: true,
        cart_view: false,
        checkout_reached: false,
        converted: false,
        order_value: 0,
        session_labels: ["frustration"],
        ai_summary: "User experienced frustration, likely due to unclear navigation or product information."
    },
    {
        id: "3",
        session_id: "sess_003",
        timestamp: "2024-01-15T12:00:00Z",
        device_type: "mobile",
        traffic_source: "tiktok",
        page_path: "/collections/new-arrivals",
        session_duration: 156,
        scroll_depth_percentage: 45,
        rage_clicks: 1,
        hover_back: false,
        cart_view: true,
        checkout_reached: false,
        converted: false,
        order_value: 0,
        session_labels: ["confusion"],
        ai_summary: "User seemed confused about product options, spent time browsing but didn't convert."
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { device_type, traffic_source, date_range } = req.query
            
            let filteredSessions = [...mockSessions]
            
            // Apply filters
            if (device_type) {
                filteredSessions = filteredSessions.filter(session => 
                    session.device_type === device_type
                )
            }
            
            if (traffic_source) {
                filteredSessions = filteredSessions.filter(session => 
                    session.traffic_source === traffic_source
                )
            }
            
            // Simulate AI analysis for new sessions
            const sessionsWithAI = filteredSessions.map(session => ({
                ...session,
                behavior_score: calculateBehaviorScore(session),
                ai_recommendations: generateAIRecommendations(session)
            }))
            
            res.status(200).json({
                success: true,
                data: sessionsWithAI,
                total: sessionsWithAI.length,
                summary: {
                    total_sessions: sessionsWithAI.length,
                    conversion_rate: (sessionsWithAI.filter(s => s.converted).length / sessionsWithAI.length * 100).toFixed(1),
                    average_session_duration: Math.round(sessionsWithAI.reduce((acc, s) => acc + s.session_duration, 0) / sessionsWithAI.length),
                    total_revenue: sessionsWithAI.reduce((acc, s) => acc + s.order_value, 0)
                }
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch sessions' 
            })
        }
    } else if (req.method === 'POST') {
        try {
            const sessionData = req.body
            
            // Simulate AI analysis for new session
            const aiAnalysis = await analyzeSession(sessionData)
            
            const newSession: SessionData = {
                id: Date.now().toString(),
                session_id: `sess_${Date.now()}`,
                ...sessionData,
                session_labels: aiAnalysis.labels,
                ai_summary: aiAnalysis.summary,
                timestamp: new Date().toISOString()
            }
            
            // In real implementation, save to database
            mockSessions.push(newSession)
            
            res.status(201).json({
                success: true,
                data: newSession,
                ai_analysis: aiAnalysis
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Failed to create session' 
            })
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).json({ 
            success: false, 
            error: `Method ${req.method} Not Allowed` 
        })
    }
}

// Helper functions
function calculateBehaviorScore(session: SessionData): number {
    let score = 0
    
    // Base score from scroll depth
    score += Math.floor(session.scroll_depth_percentage / 10)
    
    // Penalty for rage clicks
    score -= session.rage_clicks * 5
    
    // Bonus for longer sessions
    if (session.session_duration > 300) {
        score += 20
    }
    
    // Bonus for conversion
    if (session.converted) {
        score += 50
    }
    
    return Math.max(0, Math.min(100, score))
}

function generateAIRecommendations(session: SessionData): string[] {
    const recommendations = []
    
    if (session.rage_clicks > 2) {
        recommendations.push("Consider improving page navigation and user interface")
    }
    
    if (session.scroll_depth_percentage < 30) {
        recommendations.push("Optimize content layout and engagement elements")
    }
    
    if (session.cart_view && !session.converted) {
        recommendations.push("Review checkout process and cart abandonment strategies")
    }
    
    if (session.session_duration < 60) {
        recommendations.push("Enhance page loading speed and initial engagement")
    }
    
    return recommendations
}

async function analyzeSession(sessionData: any) {
    // Simulate AI analysis
    const labels = []
    
    if (sessionData.scroll_depth_percentage > 70 && sessionData.session_duration > 180) {
        labels.push("intent")
    }
    
    if (sessionData.rage_clicks > 2) {
        labels.push("frustration")
    }
    
    if (sessionData.scroll_depth_percentage < 30 && sessionData.session_duration > 120) {
        labels.push("confusion")
    }
    
    if (sessionData.converted || (sessionData.scroll_depth_percentage > 80 && sessionData.session_duration > 300)) {
        labels.push("high_intent")
    }
    
    let summary = ""
    if (sessionData.converted) {
        summary = "User successfully converted with strong engagement throughout the session."
    } else if (labels.includes("frustration")) {
        summary = "User experienced frustration, likely due to unclear navigation or product information."
    } else if (labels.includes("confusion")) {
        summary = "User seemed confused about product options, spent time browsing but didn't convert."
    } else {
        summary = "User showed moderate engagement with room for optimization."
    }
    
    return {
        labels,
        summary,
        confidence: 0.85
    }
} 