"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Target,
    AlertTriangle,
    Brain,
    BarChart3,
    Globe,
    Smartphone,
    Monitor,
    Tablet,
    MessageSquare,
    Zap,
    Eye,
    MousePointer,
    ShoppingCart,
    CreditCard,
    Filter,
    Search,
    X,
    CheckCircle,
    Clock,
    Activity,
    PieChart,
    MapPin,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Minus,
    Play,
    Pause,
    RotateCcw,
    Settings,
    Download,
    Share2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

interface SessionData {
    id: string
    timestamp: string
    deviceType: string
    trafficSource: string
    sessionDuration: number
    scrollDepth: number
    rageClicks: number
    converted: boolean
    orderValue: number
    sessionLabels: string[]
    aiSummary: string
}

interface DropoffData {
    id: string
    pagePath: string
    dropOffType: string
    dropOffRate: number
    affectedUsersCount: number
    revenueImpact: number
    aiInsight: string
    severity: string
}

interface ProductFunnelData {
    productId: string
    productName: string
    scrollPercentage: number
    addToCartPercentage: number
    zoomPercentage: number
    reviewClickPercentage: number
    checkoutPercentage: number
    conversionRate: number
}

interface RevenueHeatmapData {
    pageSection: string
    clicksCount: number
    revenueGenerated: number
    conversionRate: number
}

interface CompetitorBenchmarkData {
    metricName: string
    industryAverage: number
    yourValue: number
    differencePercentage: number
    category: string
}

interface AISummaryData {
    summaryDate: string
    sessionsCount: number
    totalSales: number
    exitsCount: number
    bestProduct: string
    worstProduct: string
    aiSummary: string
    keyInsights: string[]
    recommendations: string[]
}

const mockSessions: SessionData[] = [
    {
        id: "1",
        timestamp: "2024-01-15T10:30:00Z",
        deviceType: "mobile",
        trafficSource: "instagram",
        sessionDuration: 245,
        scrollDepth: 78,
        rageClicks: 0,
        converted: true,
        orderValue: 1250.00,
        sessionLabels: ["intent", "high_intent"],
        aiSummary: "User showed strong purchase intent, spent significant time on product pages, and successfully converted."
    },
    {
        id: "2",
        timestamp: "2024-01-15T11:15:00Z",
        deviceType: "desktop",
        trafficSource: "google",
        sessionDuration: 89,
        scrollDepth: 23,
        rageClicks: 3,
        converted: false,
        orderValue: 0,
        sessionLabels: ["frustration"],
        aiSummary: "User experienced frustration, likely due to unclear navigation or product information."
    },
    {
        id: "3",
        timestamp: "2024-01-15T12:00:00Z",
        deviceType: "mobile",
        trafficSource: "tiktok",
        sessionDuration: 156,
        scrollDepth: 45,
        rageClicks: 1,
        converted: false,
        orderValue: 0,
        sessionLabels: ["confusion"],
        aiSummary: "User seemed confused about product options, spent time browsing but didn't convert."
    }
]

const mockDropoffs: DropoffData[] = [
    {
        id: "1",
        pagePath: "/collections/hoodies",
        dropOffType: "filter",
        dropOffRate: 36.5,
        affectedUsersCount: 1247,
        revenueImpact: 18500.00,
        aiInsight: "Users exit when filtering by price below 1000 EGP. Consider adjusting price ranges or adding more affordable options.",
        severity: "high"
    },
    {
        id: "2",
        pagePath: "/products/bape-shark-hoodie",
        dropOffType: "product",
        dropOffRate: 28.3,
        affectedUsersCount: 892,
        revenueImpact: 12500.00,
        aiInsight: "Product page lacks size guide visibility. Users exit when they can't find sizing information easily.",
        severity: "medium"
    }
]

const mockProductFunnels: ProductFunnelData[] = [
    {
        productId: "bape-shark-hoodie",
        productName: "BAPE Shark Hoodie",
        scrollPercentage: 85.2,
        addToCartPercentage: 12.8,
        zoomPercentage: 45.3,
        reviewClickPercentage: 8.7,
        checkoutPercentage: 6.2,
        conversionRate: 6.2
    },
    {
        productId: "supreme-box-logo",
        productName: "Supreme Box Logo Tee",
        scrollPercentage: 72.1,
        addToCartPercentage: 9.4,
        zoomPercentage: 38.9,
        reviewClickPercentage: 6.2,
        checkoutPercentage: 4.1,
        conversionRate: 4.1
    }
]

const mockRevenueHeatmaps: RevenueHeatmapData[] = [
    {
        pageSection: "Best Sellers",
        clicksCount: 2847,
        revenueGenerated: 42500.00,
        conversionRate: 8.9
    },
    {
        pageSection: "New Arrivals",
        clicksCount: 1923,
        revenueGenerated: 28750.00,
        conversionRate: 6.2
    },
    {
        pageSection: "Sale Section",
        clicksCount: 3456,
        revenueGenerated: 52100.00,
        conversionRate: 12.4
    }
]

const mockCompetitorBenchmarks: CompetitorBenchmarkData[] = [
    {
        metricName: "bounce_rate",
        industryAverage: 45.2,
        yourValue: 38.7,
        differencePercentage: -14.4,
        category: "fashion"
    },
    {
        metricName: "aov",
        industryAverage: 850.00,
        yourValue: 1250.00,
        differencePercentage: 47.1,
        category: "fashion"
    },
    {
        metricName: "retention",
        industryAverage: 12.3,
        yourValue: 18.7,
        differencePercentage: 52.0,
        category: "fashion"
    }
]

const mockAISummary: AISummaryData = {
    summaryDate: "2024-01-15",
    sessionsCount: 5240,
    totalSales: 74100.00,
    exitsCount: 1892,
    bestProduct: "BAPE Shark Hoodie",
    worstProduct: "Supreme Box Logo Tee",
    aiSummary: "Today showed strong mobile traffic from Instagram with high conversion rates. The BAPE collection performed exceptionally well, while Supreme items need better product descriptions.",
    keyInsights: [
        "Mobile users convert 23% better than desktop",
        "Instagram traffic has 18% higher AOV",
        "Size guide visibility increases conversion by 34%"
    ],
    recommendations: [
        "Optimize Supreme product pages with better descriptions",
        "Add size guide popup for mobile users",
        "Increase Instagram ad spend during peak hours"
    ]
}

const sessionChartData = [
    { time: "00:00", sessions: 45, conversions: 3 },
    { time: "04:00", sessions: 23, conversions: 1 },
    { time: "08:00", sessions: 156, conversions: 12 },
    { time: "12:00", sessions: 289, conversions: 28 },
    { time: "16:00", sessions: 342, conversions: 35 },
    { time: "20:00", sessions: 198, conversions: 19 },
    { time: "24:00", sessions: 67, conversions: 5 }
]

const deviceData = [
    { name: "Mobile", value: 68, color: "#3B82F6" },
    { name: "Desktop", value: 25, color: "#10B981" },
    { name: "Tablet", value: 7, color: "#F59E0B" }
]

const trafficSourceData = [
    { name: "Instagram", value: 42, color: "#EC4899" },
    { name: "Google", value: 28, color: "#8B5CF6" },
    { name: "TikTok", value: 18, color: "#000000" },
    { name: "Direct", value: 12, color: "#6B7280" }
]

// Utility function to get width class based on percentage
const getWidthClass = (percentage: number): string => {
    // Round to nearest 5 for better CSS class management
    const roundedPercentage = Math.round(percentage / 5) * 5
    return `w-[${roundedPercentage}%]`
}

export function WebsiteAnalytics() {
    const [activeTab, setActiveTab] = useState("overview")
    const [chatQuery, setChatQuery] = useState("")
    const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true)
    const { toast } = useToast()

    const handleChatQuery = async () => {
        if (!chatQuery.trim()) return

        toast({
            title: "AI Analysis",
            description: `Analyzing: "${chatQuery}"`,
        })

        // Simulate AI response
        setTimeout(() => {
            toast({
                title: "AI Response",
                description: "Based on your query, here are the key insights...",
            })
        }, 2000)

        setChatQuery("")
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "critical": return "bg-red-500"
            case "high": return "bg-orange-500"
            case "medium": return "bg-yellow-500"
            case "low": return "bg-green-500"
            default: return "bg-gray-500"
        }
    }

    const getDeviceIcon = (deviceType: string) => {
        switch (deviceType) {
            case "mobile": return <Smartphone className="h-4 w-4" />
            case "desktop": return <Monitor className="h-4 w-4" />
            case "tablet": return <Tablet className="h-4 w-4" />
            default: return <Globe className="h-4 w-4" />
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Website Analytics</h1>
                    <p className="text-muted-foreground">AI-powered user behavior insights and optimization</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isRealTimeEnabled}
                            onCheckedChange={setIsRealTimeEnabled}
                        />
                        <Label>Real-time tracking</Label>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,240</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +12.5% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">74,100 EGP</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +8.3% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6.8%</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +2.1% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Exit Rate</CardTitle>
                        <X className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">36.2%</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                            +1.8% from yesterday
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                    <TabsTrigger value="dropoffs">Drop-offs</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="competitors">Competitors</TabsTrigger>
                    <TabsTrigger value="ai-chat">AI Chat</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sessions Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Session Activity</CardTitle>
                                <CardDescription>Real-time session tracking over 24 hours</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={sessionChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="sessions" stroke="#3B82F6" strokeWidth={2} />
                                        <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Device & Traffic Distribution */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Device Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <RechartsPieChart>
                                            <Pie
                                                data={deviceData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                            >
                                                {deviceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </RechartsPieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Traffic Sources</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <RechartsPieChart>
                                            <Pie
                                                data={trafficSourceData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                dataKey="value"
                                            >
                                                {trafficSourceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </RechartsPieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* AI Daily Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                AI Daily Summary
                            </CardTitle>
                            <CardDescription>AI-generated insights from today's data</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{mockAISummary.sessionsCount.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Total Sessions</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{mockAISummary.totalSales.toLocaleString()} EGP</div>
                                    <div className="text-sm text-muted-foreground">Total Sales</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{mockAISummary.exitsCount.toLocaleString()}</div>
                                    <div className="text-sm text-muted-foreground">Exits</div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-semibold mb-2">AI Summary</h4>
                                <p className="text-sm text-muted-foreground">{mockAISummary.aiSummary}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold mb-2">Key Insights</h4>
                                    <ul className="space-y-1">
                                        {mockAISummary.keyInsights.map((insight, index) => (
                                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <CheckCircle className="h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                                                {insight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Recommendations</h4>
                                    <ul className="space-y-1">
                                        {mockAISummary.recommendations.map((rec, index) => (
                                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                                <Zap className="h-3 w-3 mt-0.5 text-blue-500 flex-shrink-0" />
                                                {rec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Behavior Tab */}
                <TabsContent value="behavior" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Session Behavior Analysis</CardTitle>
                            <CardDescription>AI-powered session insights and behavior patterns</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockSessions.map((session) => (
                                    <div key={session.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {getDeviceIcon(session.deviceType)}
                                                <div>
                                                    <div className="font-medium">{session.trafficSource}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {new Date(session.timestamp).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {session.sessionLabels.map((label) => (
                                                    <Badge key={label} variant="secondary" className="text-xs">
                                                        {label}
                                                    </Badge>
                                                ))}
                                                {session.converted && (
                                                    <Badge className="bg-green-500 text-white">
                                                        Converted
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{session.sessionDuration}s</div>
                                                <div className="text-xs text-muted-foreground">Duration</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{session.scrollDepth}%</div>
                                                <div className="text-xs text-muted-foreground">Scroll Depth</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{session.rageClicks}</div>
                                                <div className="text-xs text-muted-foreground">Rage Clicks</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">
                                                    {session.converted ? `${session.orderValue} EGP` : '0 EGP'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">Order Value</div>
                                            </div>
                                        </div>

                                        <div className="bg-muted/50 rounded p-3">
                                            <div className="text-sm font-medium mb-1">AI Analysis</div>
                                            <div className="text-sm text-muted-foreground">{session.aiSummary}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Drop-offs Tab */}
                <TabsContent value="dropoffs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Drop-off Detection</CardTitle>
                            <CardDescription>AI-identified user exit points and optimization opportunities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockDropoffs.map((dropoff) => (
                                    <div key={dropoff.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <div className="font-medium">{dropoff.pagePath}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {dropoff.dropOffType} drop-off
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getSeverityColor(dropoff.severity)}>
                                                    {dropoff.severity}
                                                </Badge>
                                                <div className="text-right">
                                                    <div className="font-semibold">{dropoff.dropOffRate}%</div>
                                                    <div className="text-xs text-muted-foreground">Drop-off Rate</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{dropoff.affectedUsersCount.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Affected Users</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{dropoff.revenueImpact.toLocaleString()} EGP</div>
                                                <div className="text-xs text-muted-foreground">Revenue Impact</div>
                                            </div>
                                            <div className="text-center">
                                                <Button size="sm" variant="outline">
                                                    <Settings className="h-3 w-3 mr-1" />
                                                    Optimize
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="bg-muted/50 rounded p-3">
                                            <div className="text-sm font-medium mb-1">AI Insight</div>
                                            <div className="text-sm text-muted-foreground">{dropoff.aiInsight}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value="products" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Product Funnels */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Funnel Analysis</CardTitle>
                                <CardDescription>Conversion rates by product interaction stage</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockProductFunnels.map((product) => (
                                        <div key={product.productId} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="font-medium">{product.productName}</div>
                                                <Badge className="bg-green-500 text-white">
                                                    {product.conversionRate}% Conversion
                                                </Badge>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Scroll</span>
                                                    <span>{product.scrollPercentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`bg-blue-500 h-2 rounded-full ${getWidthClass(product.scrollPercentage)}`}
                                                    />
                                                </div>

                                                <div className="flex justify-between text-sm">
                                                    <span>Add to Cart</span>
                                                    <span>{product.addToCartPercentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`bg-green-500 h-2 rounded-full ${getWidthClass(product.addToCartPercentage)}`}
                                                    />
                                                </div>

                                                <div className="flex justify-between text-sm">
                                                    <span>Checkout</span>
                                                    <span>{product.checkoutPercentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`bg-purple-500 h-2 rounded-full ${getWidthClass(product.checkoutPercentage)}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Revenue Heatmaps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Heatmaps</CardTitle>
                                <CardDescription>Revenue generation by page section</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={mockRevenueHeatmaps}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="pageSection" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="revenueGenerated" fill="#3B82F6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Competitors Tab */}
                <TabsContent value="competitors" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Competitor Benchmarks</CardTitle>
                            <CardDescription>Performance comparison against industry averages</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockCompetitorBenchmarks.map((benchmark) => (
                                    <div key={benchmark.metricName} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <div className="font-medium capitalize">
                                                    {benchmark.metricName.replace('_', ' ')}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {benchmark.category} industry
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold">{benchmark.yourValue}</div>
                                                <div className="text-xs text-muted-foreground">Your Value</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div className="text-center">
                                                <div className="text-lg font-semibold">{benchmark.industryAverage}</div>
                                                <div className="text-xs text-muted-foreground">Industry Average</div>
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-lg font-semibold flex items-center justify-center gap-1 ${benchmark.differencePercentage > 0 ? 'text-green-500' : 'text-red-500'
                                                    }`}>
                                                    {benchmark.differencePercentage > 0 ? (
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    ) : (
                                                        <ArrowDownRight className="h-4 w-4" />
                                                    )}
                                                    {Math.abs(benchmark.differencePercentage)}%
                                                </div>
                                                <div className="text-xs text-muted-foreground">Difference</div>
                                            </div>
                                        </div>

                                        <div className="bg-muted/50 rounded p-3">
                                            <div className="text-sm">
                                                {benchmark.differencePercentage > 0 ? (
                                                    <span className="text-green-600">
                                                        ✓ Performing {Math.abs(benchmark.differencePercentage)}% better than industry average
                                                    </span>
                                                ) : (
                                                    <span className="text-red-600">
                                                        ⚠ {Math.abs(benchmark.differencePercentage)}% below industry average
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* AI Chat Tab */}
                <TabsContent value="ai-chat" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                AI Analytics Chatbot
                            </CardTitle>
                            <CardDescription>Ask questions about your website analytics in natural language</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Ask about your analytics... (e.g., 'What's trending in BAPE this week?')"
                                        value={chatQuery}
                                        onChange={(e) => setChatQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleChatQuery()}
                                    />
                                    <Button onClick={handleChatQuery}>
                                        <MessageSquare className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="text-sm font-medium mb-2">Example Queries:</div>
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <div>• "What's trending in BAPE this week?"</div>
                                        <div>• "Show me mobile vs desktop conversion rates"</div>
                                        <div>• "Which products have the highest drop-off rate?"</div>
                                        <div>• "Compare our performance to competitors"</div>
                                        <div>• "What's causing the drop in conversions?"</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
