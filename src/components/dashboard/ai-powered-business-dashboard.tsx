"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
    DollarSign, TrendingUp, TrendingDown, Brain, Lightbulb,
    RefreshCw, BarChart3, Heart, AlertTriangle, Star
} from "lucide-react"
import { AIDropPredictorCard } from "./ai-drop-predictor-card"
import { AIROIForecastCard } from "./ai-roi-forecast-card"
import { AIStrategyComposerCard } from "./ai-strategy-composer-card"
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts"

// Enhanced Types
interface KPIMetric {
    id: string
    title: string
    value: string | number
    change: number
    trend: 'up' | 'down' | 'stable'
    aiInsight: string
    urgency: 'high' | 'medium' | 'low'
}

interface AIInsight {
    id: string
    type: 'alert' | 'recommendation' | 'prediction' | 'explanation'
    title: string
    description: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    category: 'sales' | 'ads' | 'content' | 'vip' | 'tech' | 'cash' | 'team'
    action?: string
    timestamp: Date
    aiConfidence: number
}

interface DropPerformance {
    id: string
    productName: string
    views: number
    cartAdds: number
    checkouts: number
    conversionRate: number
    ugcMentions: number
    aiRecommendation: string
    status: 'live' | 'paused' | 'completed'
    revenue: number
    date: string
}

interface SmartRecommendation {
    id: string
    type: 'post' | 'ad' | 'audience' | 'product' | 'content'
    title: string
    description: string
    expectedImpact: string
    confidence: number
    action: string
    priority: 'urgent' | 'high' | 'medium' | 'low'
    category: string
}

interface ToDoItem {
    id: string
    title: string
    description: string
    priority: 'urgent' | 'high' | 'medium' | 'low'
    category: 'sales' | 'ads' | 'content' | 'support' | 'vip'
    dueDate?: Date
    completed: boolean
    aiGenerated: boolean
}

interface CompetitorSnapshot {
    id: string
    username: string
    platform: string
    postsToday: number
    avgEngagement: number
    topHook: string
    visualStyle: string
    aiAnalysis: string
    lastUpdated: Date
    followers: number
    recentPosts: number
}

interface VIPMovement {
    id: string
    customerName: string
    action: 'viewed' | 'purchased' | 'abandoned' | 'contacted' | 'dropped'
    productName?: string
    value?: number
    timestamp: Date
    priority: 'high' | 'medium' | 'low'
    ltv: number
    lastPurchase: Date
}

interface BrandMood {
    overall: 'positive' | 'neutral' | 'negative'
    score: number
    sentiment: string
    topEmotions: string[]
    recommendations: string[]
    lastUpdated: Date
}

export function AIPoweredBusinessDashboard() {
    const [activeTab, setActiveTab] = useState("overview")
    const [kpis, setKpis] = useState<KPIMetric[]>([])
    const [insights, setInsights] = useState<AIInsight[]>([])
    const [drops, setDrops] = useState<DropPerformance[]>([])
    const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([])
    const [todoList, setTodoList] = useState<ToDoItem[]>([])
    const [competitors, setCompetitors] = useState<CompetitorSnapshot[]>([])
    const [vipMovements, setVipMovements] = useState<VIPMovement[]>([])
    const [brandMood, setBrandMood] = useState<BrandMood | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const [sectionLoading, setSectionLoading] = useState({
        kpis: false,
        insights: false,
        drops: false,
        recommendations: false,
        todo: false,
        competitors: false,
        vip: false,
        brandMood: false
    })

    // Get fallback data for failed API calls
    const getFallbackData = (endpoint: string): any => {
        switch (endpoint) {
            case 'kpis':
                return [
                    { id: '1', title: 'Revenue', value: '$12,450', change: 12.5, trend: 'up', aiInsight: 'Strong growth trend', urgency: 'low' },
                    { id: '2', title: 'Orders', value: '156', change: -2.1, trend: 'down', aiInsight: 'Slight decline, monitor', urgency: 'medium' },
                    { id: '3', title: 'Engagement', value: '89.2%', change: 5.3, trend: 'up', aiInsight: 'Excellent engagement rate', urgency: 'low' },
                    { id: '4', title: 'Conversion', value: '3.2%', change: 0.8, trend: 'up', aiInsight: 'Improving conversion rate', urgency: 'low' },
                    { id: '5', title: 'ROAS', value: '4.4x', change: 0.3, trend: 'up', aiInsight: 'Strong return on ad spend', urgency: 'low' }
                ] as KPIMetric[]
            case 'insights':
                return [
                    { id: '1', type: 'alert', title: 'Revenue Spike Detected', description: 'Unusual 23% revenue increase in last 2 hours. This correlates with your recent Instagram campaign launch.', priority: 'high', category: 'sales', timestamp: new Date(), aiConfidence: 0.95 },
                    { id: '2', type: 'recommendation', title: 'Optimize Ad Timing', description: 'Move Instagram ads to 7-9 PM for 15% better CTR. Your audience is most active during these hours.', priority: 'medium', category: 'ads', timestamp: new Date(), aiConfidence: 0.88 },
                    { id: '3', type: 'prediction', title: 'VIP Customer Activity', description: '3 high-value customers browsing new collection. Consider sending personalized outreach.', priority: 'low', category: 'vip', timestamp: new Date(), aiConfidence: 0.92 },
                    { id: '4', type: 'alert', title: 'Ad Fatigue Detected', description: 'Facebook ad performance declining 12% week-over-week. Consider refreshing creative assets.', priority: 'critical', category: 'ads', timestamp: new Date(), aiConfidence: 0.89 },
                    { id: '5', type: 'recommendation', title: 'Content Strategy Update', description: 'Behind-the-scenes content performs 40% better than product-only posts. Increase BTS content by 25%.', priority: 'medium', category: 'content', timestamp: new Date(), aiConfidence: 0.87 },
                    { id: '6', type: 'prediction', title: 'Inventory Alert', description: 'Limited Edition Hoodie will sell out within 48 hours based on current demand patterns.', priority: 'high', category: 'sales', timestamp: new Date(), aiConfidence: 0.94 }
                ] as AIInsight[]
            case 'drop-performance':
                return [
                    { id: '1', productName: 'Limited Edition Hoodie', views: 1250, cartAdds: 89, checkouts: 45, conversionRate: 3.6, ugcMentions: 23, aiRecommendation: 'Strong performance, consider restock', status: 'live', revenue: 2250, date: '2024-01-15' },
                    { id: '2', productName: 'Premium Sneakers', views: 890, cartAdds: 67, checkouts: 34, conversionRate: 3.8, ugcMentions: 15, aiRecommendation: 'Good conversion rate, optimize pricing', status: 'live', revenue: 1700, date: '2024-01-14' },
                    { id: '3', productName: 'Streetwear Collection', views: 2100, cartAdds: 156, checkouts: 78, conversionRate: 3.7, ugcMentions: 45, aiRecommendation: 'Excellent UGC engagement', status: 'completed', revenue: 3900, date: '2024-01-10' }
                ] as DropPerformance[]
            case 'recommendations':
                return [
                    { id: '1', type: 'post', title: 'Behind-the-scenes content', description: 'Share your production process and team stories. This type of content drives 40% higher engagement than product-only posts.', expectedImpact: '+15% engagement', confidence: 0.92, action: 'Create post', priority: 'high', category: 'content' },
                    { id: '2', type: 'ad', title: 'Retarget VIP customers', description: 'Create exclusive VIP campaign with personalized messaging. Your VIP customers have 3x higher conversion rates.', expectedImpact: '+25% conversions', confidence: 0.88, action: 'Launch campaign', priority: 'medium', category: 'ads' },
                    { id: '3', type: 'product', title: 'Bundle trending items', description: 'Create limited edition bundle combining your best-selling hoodie with the new sneakers. Bundles increase AOV by 30%.', expectedImpact: '+30% AOV', confidence: 0.85, action: 'Create bundle', priority: 'high', category: 'sales' },
                    { id: '4', type: 'audience', title: 'Expand to new demographics', description: 'Target 18-24 age group on TikTok. This demographic shows high interest in streetwear and has strong purchasing power.', expectedImpact: '+20% reach', confidence: 0.78, action: 'Update targeting', priority: 'medium', category: 'ads' },
                    { id: '5', type: 'content', title: 'User-generated content campaign', description: 'Launch a hashtag challenge encouraging customers to share their style. UGC drives 5x more engagement than brand content.', expectedImpact: '+50% engagement', confidence: 0.91, action: 'Launch campaign', priority: 'high', category: 'content' },
                    { id: '6', type: 'product', title: 'Limited restock strategy', description: 'Restock your best-selling items in limited quantities to create urgency and drive immediate sales.', expectedImpact: '+40% sales', confidence: 0.87, action: 'Plan restock', priority: 'urgent', category: 'sales' }
                ] as SmartRecommendation[]
            case 'todo':
                return [
                    { id: '1', title: 'Contact Sarah Johnson (VIP)', description: 'Sarah hasn\'t purchased in 45 days. Send personalized email with new collection preview.', priority: 'urgent', category: 'vip', completed: false, aiGenerated: true, dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) },
                    { id: '2', title: 'Refresh Facebook ad creatives', description: 'Ad fatigue detected. Create 3 new ad variations to improve performance.', priority: 'high', category: 'ads', completed: false, aiGenerated: true, dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
                    { id: '3', title: 'Plan behind-the-scenes content', description: 'Create 5 BTS posts for next week. This content type performs 40% better.', priority: 'medium', category: 'content', completed: false, aiGenerated: true, dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
                    { id: '4', title: 'Review competitor pricing', description: 'Analyze competitor pricing strategy for premium sneakers category.', priority: 'medium', category: 'sales', completed: false, aiGenerated: false, dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
                    { id: '5', title: 'Update Instagram bio', description: 'Optimize bio with new hashtags and call-to-action based on recent performance data.', priority: 'low', category: 'content', completed: false, aiGenerated: true, dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
                    { id: '6', title: 'Plan limited restock', description: 'Limited Edition Hoodie will sell out in 48 hours. Plan restock strategy.', priority: 'urgent', category: 'sales', completed: false, aiGenerated: true, dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000) }
                ] as ToDoItem[]
            case 'competitors':
                return [
                    { id: '1', username: '@competitor1', platform: 'instagram', postsToday: 3, avgEngagement: 4.2, topHook: 'Lifestyle focus', visualStyle: 'Minimalist', aiAnalysis: 'Strong visual consistency', lastUpdated: new Date(), followers: 125000, recentPosts: 45 },
                    { id: '2', username: '@competitor2', platform: 'tiktok', postsToday: 5, avgEngagement: 6.8, topHook: 'Trending challenges', visualStyle: 'Bold colors', aiAnalysis: 'High engagement with trending content', lastUpdated: new Date(), followers: 89000, recentPosts: 67 },
                    { id: '3', username: '@competitor3', platform: 'instagram', postsToday: 2, avgEngagement: 3.1, topHook: 'Product showcases', visualStyle: 'Clean aesthetic', aiAnalysis: 'Consistent product presentation', lastUpdated: new Date(), followers: 156000, recentPosts: 23 }
                ] as CompetitorSnapshot[]
            case 'vip-movements':
                return [
                    { id: '1', customerName: 'VIP Customer 1', action: 'viewed', productName: 'Premium Collection', timestamp: new Date(), priority: 'high', ltv: 2500, lastPurchase: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
                    { id: '2', customerName: 'VIP Customer 2', action: 'purchased', productName: 'Limited Edition', value: 299, timestamp: new Date(), priority: 'high', ltv: 1800, lastPurchase: new Date() },
                    { id: '3', customerName: 'VIP Customer 3', action: 'abandoned', productName: 'New Drop', timestamp: new Date(), priority: 'medium', ltv: 3200, lastPurchase: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
                    { id: '4', customerName: 'VIP Customer 4', action: 'contacted', productName: 'Support inquiry', timestamp: new Date(), priority: 'high', ltv: 4100, lastPurchase: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
                ] as VIPMovement[]
            case 'brand-mood':
                return {
                    overall: 'positive',
                    score: 8.2,
                    sentiment: 'Customers are very satisfied with recent drops',
                    topEmotions: ['excited', 'satisfied', 'engaged'],
                    recommendations: ['Continue current strategy', 'Engage more with VIP customers'],
                    lastUpdated: new Date()
                } as BrandMood
            default:
                return []
        }
    }

    const loadDashboardData = async () => {
        setIsLoading(true)
        setLoadError(null)

        try {
            const endpoints = [
                '/api/ai-business-dashboard/kpis',
                '/api/ai-business-dashboard/insights',
                '/api/ai-business-dashboard/drop-performance',
                '/api/ai-business-dashboard/recommendations',
                '/api/ai-business-dashboard/todo',
                '/api/ai-business-dashboard/competitors',
                '/api/ai-business-dashboard/vip-movements',
                '/api/ai-business-dashboard/brand-mood'
            ]

            const results = await Promise.allSettled(
                endpoints.map(endpoint => fetch(endpoint))
            )

            const data = results.map((result, index) => {
                if (result.status === 'fulfilled' && result.value.ok) {
                    return result.value.json()
                } else {
                    const endpoint = endpoints[index].split('/').pop()
                    return Promise.resolve(getFallbackData(endpoint || ''))
                }
            })

            const [
                kpisData,
                insightsData,
                dropPerformanceData,
                recommendationsData,
                todoData,
                competitorsData,
                vipData,
                brandMoodData
            ] = await Promise.all(data)

            // Type-safe data setting
            if (Array.isArray(kpisData)) {
                setKpis(kpisData as KPIMetric[])
            }
            if (Array.isArray(insightsData)) {
                setInsights(insightsData as AIInsight[])
            }
            if (Array.isArray(dropPerformanceData)) {
                setDrops(dropPerformanceData)
            }
            if (Array.isArray(recommendationsData)) {
                setRecommendations(recommendationsData)
            }
            if (Array.isArray(todoData)) {
                setTodoList(todoData)
            }
            if (Array.isArray(competitorsData)) {
                setCompetitors(competitorsData)
            }
            if (Array.isArray(vipData)) {
                setVipMovements(vipData)
            }
            if (brandMoodData && typeof brandMoodData === 'object') {
                setBrandMood(brandMoodData as BrandMood)
            }

        } catch (error) {
            console.error('Dashboard data loading error:', error)
            setLoadError('Failed to load dashboard data. Using demo data.')

            // Set fallback data with proper typing
            const fallbackKpis = getFallbackData('kpis') as KPIMetric[]
            const fallbackInsights = getFallbackData('insights') as AIInsight[]
            const fallbackDrops = getFallbackData('drop-performance') as DropPerformance[]
            const fallbackRecommendations = getFallbackData('recommendations') as SmartRecommendation[]
            const fallbackTodo = getFallbackData('todo') as ToDoItem[]
            const fallbackCompetitors = getFallbackData('competitors') as CompetitorSnapshot[]
            const fallbackVip = getFallbackData('vip-movements') as VIPMovement[]
            const fallbackBrandMood = getFallbackData('brand-mood') as BrandMood

            setKpis(fallbackKpis)
            setInsights(fallbackInsights)
            setDrops(fallbackDrops)
            setRecommendations(fallbackRecommendations)
            setTodoList(fallbackTodo)
            setCompetitors(fallbackCompetitors)
            setVipMovements(fallbackVip)
            setBrandMood(fallbackBrandMood)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadDashboardData()
    }, []) // Empty dependency array to prevent auto-reload

    // Memoize the loadDashboardData function to prevent unnecessary re-renders
    const memoizedLoadDashboardData = useCallback(() => {
        loadDashboardData()
    }, [])

    // Helper functions
    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'high': return 'text-red-600 bg-red-100'
            case 'medium': return 'text-yellow-600 bg-yellow-100'
            case 'low': return 'text-green-600 bg-green-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'text-red-600 bg-red-100'
            case 'high': return 'text-orange-600 bg-orange-100'
            case 'medium': return 'text-yellow-600 bg-yellow-100'
            case 'low': return 'text-green-600 bg-green-100'
            case 'urgent': return 'text-red-600 bg-red-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="h-4 w-4 text-green-400" />
            case 'down':
                return <TrendingDown className="h-4 w-4 text-red-400" />
            default:
                return <BarChart3 className="h-4 w-4 text-gray-400" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'live': return 'text-green-600 bg-green-100'
            case 'paused': return 'text-yellow-600 bg-yellow-100'
            case 'completed': return 'text-gray-600 bg-gray-100'
            default: return 'text-gray-600 bg-gray-100'
        }
    }

    const toggleTodoItem = (id: string) => {
        setTodoList(prev => prev.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ))
    }

    const handleRefresh = () => {
        memoizedLoadDashboardData()
    }

    // Loading skeleton component
    const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
        <div className={`animate-pulse ${className}`}>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
    )

    // Empty state component
    const EmptyState = ({
        title,
        description,
        icon: Icon
    }: {
        title: string
        description: string
        icon: any
    }) => (
        <div className="text-center py-8">
            <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    )

    // Chart data
    const revenueData = [
        { date: 'Mon', revenue: 12000, spend: 2800, roas: 4.3 },
        { date: 'Tue', revenue: 13500, spend: 3100, roas: 4.4 },
        { date: 'Wed', revenue: 11800, spend: 2900, roas: 4.1 },
        { date: 'Thu', revenue: 14200, spend: 3200, roas: 4.4 },
        { date: 'Fri', revenue: 15600, spend: 3500, roas: 4.5 },
        { date: 'Sat', revenue: 16800, spend: 3800, roas: 4.4 },
        { date: 'Sun', revenue: 12450, spend: 2800, roas: 4.4 },
    ]

    const engagementData = [
        { platform: 'Instagram', engagement: 4.2, followers: 125000 },
        { platform: 'TikTok', engagement: 6.8, followers: 89000 },
        { platform: 'Facebook', engagement: 2.1, followers: 67000 },
        { platform: 'Twitter', engagement: 1.8, followers: 45000 },
    ]

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="flex items-center space-x-3 p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
                    <RefreshCw className="h-6 w-6 animate-spin text-pink-400" />
                    <span className="text-white font-semibold">Loading AI-Powered Dashboard...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
                <div>
                    <h1 className="text-3xl font-bold text-white">AI-Powered Business Dashboard</h1>
                    <p className="text-gray-300">Real-time intelligence for your business</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={handleRefresh} size="sm" variant="premium" className="transition-all duration-200">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Error Alert */}
            {loadError && (
                <Alert className="bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 backdrop-blur-xl">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-200">
                        {loadError} The dashboard is showing demo data with full functionality.
                    </AlertDescription>
                </Alert>
            )}

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpis && kpis.map((kpi) => (
                    <Card key={kpi.id} className="relative hover:scale-105 transition-all duration-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-300">{kpi.title}</p>
                                    <p className="text-2xl font-bold text-white">{kpi.value}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                        {getTrendIcon(kpi.trend)}
                                        <span className={`text-sm ${kpi.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                                        </span>
                                    </div>
                                </div>
                                <Badge className={getUrgencyColor(kpi.urgency)} variant="premium">
                                    {kpi.urgency}
                                </Badge>
                            </div>
                            <div className="mt-3 p-3 bg-gradient-to-r from-pink-500/10 to-purple-600/10 backdrop-blur-sm rounded-lg text-xs text-gray-200 border border-pink-500/20">
                                <Lightbulb className="h-3 w-3 inline mr-1 text-pink-400" />
                                {kpi.aiInsight}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 p-1 rounded-xl">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">Overview</TabsTrigger>
                    <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">AI Insights</TabsTrigger>
                    <TabsTrigger value="drops" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">Drops</TabsTrigger>
                    <TabsTrigger value="recommendations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">Smart Recs</TabsTrigger>
                    <TabsTrigger value="todo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">AI To-Do</TabsTrigger>
                    <TabsTrigger value="competitors" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">Competitors</TabsTrigger>
                    <TabsTrigger value="vip" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">VIP Tracker</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-pink-500/25 transition-all duration-200">Analytics</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Revenue Chart */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <DollarSign className="h-5 w-5" />
                                    <span>Revenue vs Spend vs ROAS</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
                                        <Line type="monotone" dataKey="spend" stroke="#ef4444" name="Spend" />
                                        <Line type="monotone" dataKey="roas" stroke="#10b981" name="ROAS" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* AI Drop Predictor Card */}
                        <AIDropPredictorCard />

                        {/* AI ROI Forecast Card */}
                        <AIROIForecastCard />

                        {/* AI Strategy Composer Card */}
                        <AIStrategyComposerCard />

                        {/* Brand Mood */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Heart className="h-5 w-5" />
                                    <span>Brand Mood</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {brandMood && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Overall Sentiment</span>
                                            <Badge className={brandMood.overall === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                                {brandMood.overall}
                                            </Badge>
                                        </div>
                                        <Progress value={brandMood.score * 10} className="w-full" />
                                        <p className="text-sm text-muted-foreground">{brandMood.sentiment}</p>
                                        <div>
                                            <p className="text-sm font-medium mb-2">Top Emotions:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {brandMood?.topEmotions?.map((emotion, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {emotion}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* AI Insights Tab */}
                <TabsContent value="insights" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">AI Business Insights</h2>
                            <p className="text-gray-300">Real-time intelligence powered by AI</p>
                        </div>
                        <Button onClick={handleRefresh} size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {sectionLoading.insights ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} className="relative">
                                    <CardContent className="p-6">
                                        <LoadingSkeleton />
                                        <LoadingSkeleton className="mt-4" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : insights && insights.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {insights.map((insight) => (
                                <Card key={insight.id} className="relative hover:shadow-lg transition-all duration-200">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm flex items-center">
                                                <Brain className="h-4 w-4 mr-2 text-blue-500" />
                                                {insight.title}
                                            </CardTitle>
                                            <Badge className={getPriorityColor(insight.priority)}>
                                                {insight.priority}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                                        <div className="flex items-center justify-between mb-3">
                                            <Badge variant="outline" className="text-xs">
                                                {insight.category}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {insight.aiConfidence * 100}% confidence
                                            </span>
                                        </div>
                                        {insight.action && (
                                            <Button size="sm" className="w-full">
                                                {insight.action}
                                            </Button>
                                        )}
                                        <div className="mt-2 text-xs text-gray-400">
                                            {insight.timestamp.toLocaleString()}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No AI Insights Available"
                            description="AI is analyzing your data. Check back soon for personalized insights."
                            icon={Brain}
                        />
                    )}
                </TabsContent>

                {/* Drops Tab */}
                <TabsContent value="drops" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Product Drops Performance</h2>
                            <p className="text-gray-300">Track your drops and get AI-powered insights</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button onClick={handleRefresh} size="sm" variant="outline">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {sectionLoading.drops ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} className="relative">
                                    <CardContent className="p-6">
                                        <LoadingSkeleton />
                                        <LoadingSkeleton className="mt-4" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : drops && drops.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {drops.map((drop) => (
                                <Card key={drop.id} className="relative hover:shadow-lg transition-all duration-200">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm flex items-center">
                                                <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                                                {drop.productName}
                                            </CardTitle>
                                            <Badge className={getStatusColor(drop.status)}>
                                                {drop.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Views</p>
                                                <p className="font-medium">{drop.views.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Revenue</p>
                                                <p className="font-medium text-green-600">${drop.revenue.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Conversion</p>
                                                <p className="font-medium">{drop.conversionRate}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">UGC Mentions</p>
                                                <p className="font-medium">{drop.ugcMentions}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm border border-blue-200">
                                            <Brain className="h-4 w-4 inline mr-2 text-blue-600" />
                                            {drop.aiRecommendation}
                                        </div>
                                        <div className="mt-3 text-xs text-gray-400">
                                            Drop date: {drop.date}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Drops Data Available"
                            description="No product drops found. Create your first drop to see performance insights."
                            icon={TrendingUp}
                        />
                    )}
                </TabsContent>

                {/* Smart Recommendations Tab */}
                <TabsContent value="recommendations" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Smart Recommendations</h2>
                            <p className="text-gray-300">AI-powered suggestions to grow your business</p>
                        </div>
                        <Button onClick={handleRefresh} size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {sectionLoading.recommendations ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} className="relative">
                                    <CardContent className="p-6">
                                        <LoadingSkeleton />
                                        <LoadingSkeleton className="mt-4" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : recommendations && recommendations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendations.map((rec) => (
                                <Card key={rec.id} className="relative hover:shadow-lg transition-all duration-200">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm flex items-center">
                                                <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                                                {rec.title}
                                            </CardTitle>
                                            <Badge className={getPriorityColor(rec.priority)}>
                                                {rec.priority}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                                        <div className="space-y-2 mb-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">Expected Impact</span>
                                                <span className="text-xs font-medium text-green-600">{rec.expectedImpact}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">Confidence</span>
                                                <span className="text-xs font-medium">{rec.confidence * 100}%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-muted-foreground">Category</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {rec.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Button size="sm" className="w-full">
                                            {rec.action}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Recommendations Available"
                            description="AI is analyzing your data to provide personalized recommendations."
                            icon={Lightbulb}
                        />
                    )}
                </TabsContent>

                {/* AI To-Do Tab */}
                <TabsContent value="todo" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">AI To-Do List</h2>
                            <p className="text-gray-300">Smart tasks generated by AI to grow your business</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button onClick={handleRefresh} size="sm" variant="outline">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                    </div>

                    {sectionLoading.todo ? (
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Card key={i} className="relative">
                                    <CardContent className="p-4">
                                        <LoadingSkeleton />
                                        <LoadingSkeleton className="mt-2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : todoList && todoList.length > 0 ? (
                        <div className="space-y-3">
                            {todoList.map((item) => (
                                <Card key={item.id} className={`relative hover:shadow-md transition-all duration-200 ${item.completed ? 'opacity-60 bg-gray-50' : ''}`}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start space-x-3">
                                            <Switch
                                                checked={item.completed}
                                                onCheckedChange={() => toggleTodoItem(item.id)}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center space-x-2">
                                                        <Badge className={getPriorityColor(item.priority)}>
                                                            {item.priority}
                                                        </Badge>
                                                        {item.aiGenerated && (
                                                            <Brain className="h-4 w-4 text-blue-600" />
                                                        )}
                                                    </div>
                                                </div>
                                                <p className={`text-sm mt-1 ${item.completed ? 'text-gray-400' : 'text-muted-foreground'}`}>
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {item.category}
                                                    </Badge>
                                                    {item.dueDate && (
                                                        <span className="text-xs text-muted-foreground">
                                                            Due: {item.dueDate.toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Tasks Available"
                            description="AI will generate tasks based on your business data and insights."
                            icon={Brain}
                        />
                    )}
                </TabsContent>

                {/* Competitors Tab */}
                <TabsContent value="competitors" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Competitor Analysis</h2>
                            <p className="text-gray-300">Track your competitors and get AI-powered insights</p>
                        </div>
                        <Button onClick={handleRefresh} size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {sectionLoading.competitors ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} className="relative">
                                    <CardContent className="p-6">
                                        <LoadingSkeleton />
                                        <LoadingSkeleton className="mt-4" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : competitors && competitors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {competitors.map((competitor) => (
                                <Card key={competitor.id} className="relative hover:shadow-lg transition-all duration-200">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm flex items-center">
                                                <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
                                                {competitor.username}
                                            </CardTitle>
                                            <Badge variant="outline">{competitor.platform}</Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground">Followers</p>
                                                <p className="font-medium">{competitor.followers.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Engagement</p>
                                                <p className="font-medium">{competitor.avgEngagement}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Posts Today</p>
                                                <p className="font-medium">{competitor.postsToday}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Recent Posts</p>
                                                <p className="font-medium">{competitor.recentPosts}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 mb-3">
                                            <div>
                                                <p className="text-xs font-medium">Top Hook:</p>
                                                <p className="text-xs text-muted-foreground">{competitor.topHook}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium">Visual Style:</p>
                                                <p className="text-xs text-muted-foreground">{competitor.visualStyle}</p>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg text-sm border border-purple-200">
                                            <Brain className="h-4 w-4 inline mr-2 text-purple-600" />
                                            {competitor.aiAnalysis}
                                        </div>
                                        <div className="mt-2 text-xs text-gray-400">
                                            Last updated: {competitor.lastUpdated.toLocaleString()}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No Competitor Data Available"
                            description="Add competitors to track their performance and get insights."
                            icon={BarChart3}
                        />
                    )}
                </TabsContent>

                {/* VIP Tracker Tab */}
                <TabsContent value="vip" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">VIP Customer Tracker</h2>
                            <p className="text-gray-300">Monitor your high-value customers and their activities</p>
                        </div>
                        <Button onClick={handleRefresh} size="sm" variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {sectionLoading.vip ? (
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Card key={i} className="relative">
                                    <CardContent className="p-4">
                                        <LoadingSkeleton />
                                        <LoadingSkeleton className="mt-2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : vipMovements && vipMovements.length > 0 ? (
                        <div className="space-y-3">
                            {vipMovements.map((vip) => (
                                <Card key={vip.id} className="relative hover:shadow-lg transition-all duration-200">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                                    <Star className="h-6 w-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-lg">{vip.customerName}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        LTV: ${vip.ltv.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge className={getPriorityColor(vip.priority)}>
                                                    {vip.priority}
                                                </Badge>
                                                {vip.value && (
                                                    <p className="text-sm font-medium text-green-600 mt-1">
                                                        ${vip.value.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium capitalize">{vip.action}</p>
                                                {vip.productName && (
                                                    <p className="text-xs text-muted-foreground">{vip.productName}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">
                                                    {vip.timestamp.toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Last purchase: {vip.lastPurchase.toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No VIP Activity"
                            description="No VIP customer activity detected. Monitor your high-value customers here."
                            icon={Star}
                        />
                    )}
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Engagement by Platform */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Engagement by Platform</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={engagementData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="platform" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="engagement" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Platform Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Distribution</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={engagementData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ platform, followers }) => `${platform}: ${(followers / 326000 * 100).toFixed(1)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="followers"
                                        >
                                            {engagementData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AIPoweredBusinessDashboard 