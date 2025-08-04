import { NextApiRequest, NextApiResponse } from 'next'

interface DropoffData {
    id: string
    page_path: string
    drop_off_type: string
    drop_off_rate: number
    affected_users_count: number
    revenue_impact: number
    ai_insight: string
    severity: string
    created_at: string
    updated_at: string
}

// Mock data for demonstration
const mockDropoffs: DropoffData[] = [
    {
        id: "1",
        page_path: "/collections/hoodies",
        drop_off_type: "filter",
        drop_off_rate: 36.5,
        affected_users_count: 1247,
        revenue_impact: 18500.00,
        ai_insight: "Users exit when filtering by price below 1000 EGP. Consider adjusting price ranges or adding more affordable options.",
        severity: "high",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z"
    },
    {
        id: "2",
        page_path: "/products/bape-shark-hoodie",
        drop_off_type: "product",
        drop_off_rate: 28.3,
        affected_users_count: 892,
        revenue_impact: 12500.00,
        ai_insight: "Product page lacks size guide visibility. Users exit when they can't find sizing information easily.",
        severity: "medium",
        created_at: "2024-01-15T11:00:00Z",
        updated_at: "2024-01-15T11:00:00Z"
    },
    {
        id: "3",
        page_path: "/collections/new-arrivals",
        drop_off_type: "collection",
        drop_off_rate: 42.1,
        affected_users_count: 2156,
        revenue_impact: 28750.00,
        ai_insight: "Collection page has slow loading times and poor mobile optimization. Users exit before content loads.",
        severity: "critical",
        created_at: "2024-01-15T12:00:00Z",
        updated_at: "2024-01-15T12:00:00Z"
    },
    {
        id: "4",
        page_path: "/checkout",
        drop_off_type: "checkout",
        drop_off_rate: 18.7,
        affected_users_count: 567,
        revenue_impact: 8500.00,
        ai_insight: "Checkout process has too many steps. Consider implementing one-click checkout or guest checkout options.",
        severity: "medium",
        created_at: "2024-01-15T13:00:00Z",
        updated_at: "2024-01-15T13:00:00Z"
    }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { severity, drop_off_type, page_path } = req.query
            
            let filteredDropoffs = [...mockDropoffs]
            
            // Apply filters
            if (severity) {
                filteredDropoffs = filteredDropoffs.filter(dropoff => 
                    dropoff.severity === severity
                )
            }
            
            if (drop_off_type) {
                filteredDropoffs = filteredDropoffs.filter(dropoff => 
                    dropoff.drop_off_type === drop_off_type
                )
            }
            
            if (page_path) {
                filteredDropoffs = filteredDropoffs.filter(dropoff => 
                    dropoff.page_path.includes(page_path as string)
                )
            }
            
            // Calculate summary statistics
            const summary = {
                total_dropoffs: filteredDropoffs.length,
                total_revenue_impact: filteredDropoffs.reduce((acc, d) => acc + d.revenue_impact, 0),
                average_drop_off_rate: (filteredDropoffs.reduce((acc, d) => acc + d.drop_off_rate, 0) / filteredDropoffs.length).toFixed(1),
                critical_issues: filteredDropoffs.filter(d => d.severity === 'critical').length,
                high_priority_issues: filteredDropoffs.filter(d => d.severity === 'high').length
            }
            
            res.status(200).json({
                success: true,
                data: filteredDropoffs,
                summary,
                recommendations: generateOptimizationRecommendations(filteredDropoffs)
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Failed to fetch drop-offs' 
            })
        }
    } else if (req.method === 'POST') {
        try {
            const dropoffData = req.body
            
            // Simulate AI analysis for new drop-off
            const aiAnalysis = await analyzeDropoff(dropoffData)
            
            const newDropoff: DropoffData = {
                id: Date.now().toString(),
                ...dropoffData,
                ai_insight: aiAnalysis.insight,
                severity: aiAnalysis.severity,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
            
            // In real implementation, save to database
            mockDropoffs.push(newDropoff)
            
            res.status(201).json({
                success: true,
                data: newDropoff,
                ai_analysis: aiAnalysis
            })
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                error: 'Failed to create drop-off record' 
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
function generateOptimizationRecommendations(dropoffs: DropoffData[]): string[] {
    const recommendations = []
    
    const criticalDropoffs = dropoffs.filter(d => d.severity === 'critical')
    const highDropoffs = dropoffs.filter(d => d.severity === 'high')
    
    if (criticalDropoffs.length > 0) {
        recommendations.push("Immediate action required: Address critical drop-off issues affecting revenue")
    }
    
    if (highDropoffs.length > 0) {
        recommendations.push("Prioritize high-severity drop-offs for optimization")
    }
    
    const filterDropoffs = dropoffs.filter(d => d.drop_off_type === 'filter')
    if (filterDropoffs.length > 0) {
        recommendations.push("Review and optimize filter functionality across collection pages")
    }
    
    const checkoutDropoffs = dropoffs.filter(d => d.drop_off_type === 'checkout')
    if (checkoutDropoffs.length > 0) {
        recommendations.push("Streamline checkout process to reduce abandonment")
    }
    
    const productDropoffs = dropoffs.filter(d => d.drop_off_type === 'product')
    if (productDropoffs.length > 0) {
        recommendations.push("Enhance product pages with better information and CTAs")
    }
    
    return recommendations
}

async function analyzeDropoff(dropoffData: any) {
    // Simulate AI analysis based on drop-off characteristics
    let severity = 'low'
    let insight = ''
    
    // Determine severity based on drop-off rate and revenue impact
    if (dropoffData.drop_off_rate > 40 || dropoffData.revenue_impact > 20000) {
        severity = 'critical'
    } else if (dropoffData.drop_off_rate > 25 || dropoffData.revenue_impact > 10000) {
        severity = 'high'
    } else if (dropoffData.drop_off_rate > 15 || dropoffData.revenue_impact > 5000) {
        severity = 'medium'
    }
    
    // Generate insights based on drop-off type
    switch (dropoffData.drop_off_type) {
        case 'filter':
            insight = `Users exit when filtering by ${dropoffData.page_path.includes('price') ? 'price' : 'category'}. Consider adjusting filter options or improving filter UX.`
            break
        case 'product':
            insight = `Product page ${dropoffData.page_path} has usability issues. Consider adding size guides, better images, or clearer CTAs.`
            break
        case 'checkout':
            insight = `Checkout process on ${dropoffData.page_path} is causing abandonment. Consider simplifying the process or adding guest checkout.`
            break
        case 'collection':
            insight = `Collection page ${dropoffData.page_path} has performance issues. Consider optimizing loading speed and mobile experience.`
            break
        default:
            insight = `Users are exiting from ${dropoffData.page_path}. Review page content and user experience.`
    }
    
    return {
        severity,
        insight,
        confidence: 0.88,
        suggested_actions: generateSuggestedActions(dropoffData.drop_off_type, severity)
    }
}

function generateSuggestedActions(dropOffType: string, severity: string): string[] {
    const actions = []
    
    if (severity === 'critical') {
        actions.push("Immediate optimization required")
    }
    
    switch (dropOffType) {
        case 'filter':
            actions.push("Review filter options and pricing ranges")
            actions.push("Add more filter categories")
            actions.push("Improve filter UI/UX")
            break
        case 'product':
            actions.push("Add size guide popup")
            actions.push("Improve product images")
            actions.push("Add customer reviews section")
            break
        case 'checkout':
            actions.push("Implement one-click checkout")
            actions.push("Add guest checkout option")
            actions.push("Simplify checkout form")
            break
        case 'collection':
            actions.push("Optimize page loading speed")
            actions.push("Improve mobile responsiveness")
            actions.push("Add better product grid layout")
            break
    }
    
    return actions
} 