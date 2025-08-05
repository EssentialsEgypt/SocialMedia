// AutoReply-AI-Start: AI-Powered Auto Replies Engine UI Component
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
    MessageSquare,
    Settings,
    BarChart3,
    Play,
    Pause,
    Plus,
    Edit,
    Trash2,
    Copy,
    CheckCircle,
    AlertTriangle,
    Clock,
    Users,
    Zap,
    Brain,
    Globe,
    Smartphone,
    Mail,
    Monitor,
    TrendingUp,
    TrendingDown,
    Activity,
    Eye,
    Target,
    Filter,
    Search,
    RefreshCw,
    Download,
    Upload
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import styles from "./auto-replies-engine.module.css"

interface AutoReplyTemplate {
    id: string
    name: string
    category: string
    intent: string[]
    platforms: string[]
    template: string
    variables: string[]
    tone: string
    isActive: boolean
    usageCount: number
    successRate: number
    lastUsed: Date
}

interface AutoReplyResponse {
    id: string
    originalMessageId: string
    senderId: string
    platform: string
    intent: {
        type: string
        confidence: number
        urgency: string
        emotionalTone: string
        requiresHumanEscalation: boolean
        suggestedResponse: string
        tags: string[]
    }
    response: string
    templateUsed?: string
    wasEdited: boolean
    wasApproved: boolean
    responseTime: number
    sentAt: Date
    tags: string[]
    escalationTriggered: boolean
}

interface AutoReplyAnalytics {
    totalResponses: number
    averageResponseTime: number
    successRate: number
    escalationRate: number
    platformBreakdown: Record<string, number>
    intentBreakdown: Record<string, number>
    topTemplates: AutoReplyTemplate[]
    recentResponses: AutoReplyResponse[]
}

const mockAnalytics: AutoReplyAnalytics = {
    totalResponses: 1247,
    averageResponseTime: 3200,
    successRate: 0.94,
    escalationRate: 0.12,
    platformBreakdown: {
        instagram: 45,
        whatsapp: 35,
        email: 20
    },
    intentBreakdown: {
        question: 30,
        complaint: 15,
        hype: 25,
        order_tracking: 20,
        general: 10
    },
    topTemplates: [],
    recentResponses: []
}

const mockTemplates: AutoReplyTemplate[] = [
    {
        id: 'faq-shipping',
        name: 'Shipping Information',
        category: 'FAQ',
        intent: ['question', 'request'],
        platforms: ['instagram', 'whatsapp', 'email'],
        template: 'Hi {name}! Shipping takes 2-3 business days within Egypt. International shipping available. Track your order at {tracking_link}',
        variables: ['name', 'tracking_link'],
        tone: 'helpful',
        isActive: true,
        usageCount: 156,
        successRate: 0.92,
        lastUsed: new Date()
    },
    {
        id: 'vip-greeting',
        name: 'VIP Customer Greeting',
        category: 'VIP',
        intent: ['hype', 'general'],
        platforms: ['instagram', 'whatsapp'],
        template: 'Hey {name}! 👑 VIP access granted. What can we help you with today?',
        variables: ['name'],
        tone: 'excited',
        isActive: true,
        usageCount: 89,
        successRate: 0.95,
        lastUsed: new Date()
    },
    {
        id: 'drop-hype',
        name: 'Drop Hype Response',
        category: 'Marketing',
        intent: ['hype', 'drop_inquiry'],
        platforms: ['instagram', 'whatsapp'],
        template: '🔥 {name}, you know what\'s coming! Next drop: {drop_date}. Set your alarms!',
        variables: ['name', 'drop_date'],
        tone: 'excited',
        isActive: true,
        usageCount: 234,
        successRate: 0.88,
        lastUsed: new Date()
    }
]

const mockRecentResponses: AutoReplyResponse[] = [
    {
        id: 'reply_1',
        originalMessageId: 'msg_1',
        senderId: 'user_123',
        platform: 'instagram',
        intent: {
            type: 'question',
            confidence: 0.85,
            urgency: 'low',
            emotionalTone: 'neutral',
            requiresHumanEscalation: false,
            suggestedResponse: 'faq-shipping',
            tags: ['shipping', 'faq']
        },
        response: 'Hi there! Shipping takes 2-3 business days within Egypt. International shipping available. Track your order at https://track.essentials-egypt.com',
        templateUsed: 'faq-shipping',
        wasEdited: false,
        wasApproved: false,
        responseTime: 3200,
        sentAt: new Date(Date.now() - 5 * 60 * 1000),
        tags: ['shipping', 'faq'],
        escalationTriggered: false
    },
    {
        id: 'reply_2',
        originalMessageId: 'msg_2',
        senderId: 'vip_user_456',
        platform: 'whatsapp',
        intent: {
            type: 'hype',
            confidence: 0.92,
            urgency: 'low',
            emotionalTone: 'positive',
            requiresHumanEscalation: false,
            suggestedResponse: 'vip-greeting',
            tags: ['vip', 'engagement']
        },
        response: '👑 Hey VIP! 👑 VIP access granted. What can we help you with today?',
        templateUsed: 'vip-greeting',
        wasEdited: false,
        wasApproved: false,
        responseTime: 2800,
        sentAt: new Date(Date.now() - 15 * 60 * 1000),
        tags: ['vip', 'engagement'],
        escalationTriggered: false
    }
]

const responseTimeData = [
    { time: "00:00", responses: 12, avgTime: 3200 },
    { time: "04:00", responses: 8, avgTime: 3500 },
    { time: "08:00", responses: 45, avgTime: 3100 },
    { time: "12:00", responses: 89, avgTime: 2900 },
    { time: "16:00", responses: 67, avgTime: 3300 },
    { time: "20:00", responses: 34, avgTime: 3000 },
    { time: "24:00", responses: 15, avgTime: 3400 }
]

export function AutoRepliesEngine() {
    const [activeTab, setActiveTab] = useState("overview")
    const [isSystemActive, setIsSystemActive] = useState(true)
    const [templates, setTemplates] = useState<AutoReplyTemplate[]>(mockTemplates)
    const [recentResponses, setRecentResponses] = useState<AutoReplyResponse[]>(mockRecentResponses)
    const [analytics, setAnalytics] = useState<AutoReplyAnalytics>(mockAnalytics)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    // AutoReply-AI-Start: Load analytics data
    useEffect(() => {
        // Add a small delay to ensure the component is fully mounted
        const timer = setTimeout(() => {
            loadAnalytics()
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    const loadAnalytics = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/auto-replies/analytics')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            if (data.success) {
                setAnalytics(data.analytics)
                setIsSystemActive(data.systemStatus.isActive)
            } else {
                throw new Error(data.error || 'Failed to load analytics')
            }
        } catch (error) {
            console.error('Failed to load analytics:', error)
            // Fallback to mock data if API fails
            setAnalytics(mockAnalytics)
            setIsSystemActive(true)
            toast({
                title: "Warning",
                description: "Using mock data - API endpoint not available",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    // AutoReply-AI-Start: Toggle system status
    const toggleSystem = async (active: boolean) => {
        try {
            const response = await fetch('/api/auto-replies/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ active })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            if (data.success) {
                setIsSystemActive(data.isActive)
                toast({
                    title: "System Updated",
                    description: data.message,
                })
            } else {
                throw new Error(data.error || 'Failed to update system status')
            }
        } catch (error) {
            console.error('Failed to toggle system:', error)
            // Fallback to local state if API fails
            setIsSystemActive(active)
            toast({
                title: "Warning",
                description: "System updated locally - API endpoint not available",
                variant: "destructive"
            })
        }
    }

    // AutoReply-AI-Start: Get platform icon
    const getPlatformIcon = (platform: string) => {
        switch (platform) {
            case 'instagram': return <Smartphone className="h-4 w-4" />
            case 'whatsapp': return <MessageSquare className="h-4 w-4" />
            case 'email': return <Mail className="h-4 w-4" />
            case 'live_chat': return <Monitor className="h-4 w-4" />
            default: return <Globe className="h-4 w-4" />
        }
    }

    // AutoReply-AI-Start: Get urgency color
    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'critical': return 'bg-red-500'
            case 'high': return 'bg-orange-500'
            case 'medium': return 'bg-yellow-500'
            case 'low': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    // AutoReply-AI-Start: Get progress bar width class
    const getProgressWidthClass = (percentage: number) => {
        const roundedPercentage = Math.round(percentage / 5) * 5
        return styles[`progressWidth${roundedPercentage}`] || styles.progressWidth100
    }

    // AutoReply-AI-Start: Test API connectivity
    const testAPIConnection = async () => {
        try {
            const response = await fetch('/api/health')
            if (response.ok) {
                const data = await response.json()
                toast({
                    title: "API Test",
                    description: "API is working correctly",
                })
                console.log('API Health Check:', data)
            } else {
                throw new Error(`HTTP ${response.status}`)
            }
        } catch (error) {
            console.error('API Test Failed:', error)
            toast({
                title: "API Test Failed",
                description: "Cannot connect to API endpoints",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Auto Replies Engine</h1>
                    <p className="text-muted-foreground">AI-powered real-time message responses</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={isSystemActive}
                            onCheckedChange={toggleSystem}
                        />
                        <Label>System Active</Label>
                    </div>
                    <Button variant="outline" size="sm" onClick={testAPIConnection}>
                        <Activity className="h-4 w-4 mr-2" />
                        Test API
                    </Button>
                    <Button variant="outline" size="sm" onClick={loadAnalytics} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Loading...' : 'Refresh'}
                    </Button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <Card>
                    <CardContent className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Loading auto replies data...</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.totalResponses.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +12.5% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(analytics.successRate * 100).toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            +2.1% from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(analytics.averageResponseTime / 1000).toFixed(1)}s</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                            -0.3s from yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{(analytics.escalationRate * 100).toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                            -1.2% from yesterday
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="responses">Recent Responses</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Response Time Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Response Time Trends</CardTitle>
                                <CardDescription>Average response time over 24 hours</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={responseTimeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="responses" stroke="#3B82F6" strokeWidth={2} />
                                        <Line type="monotone" dataKey="avgTime" stroke="#10B981" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Platform & Intent Distribution */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Platform Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {Object.entries(analytics.platformBreakdown).map(([platform, percentage]) => (
                                            <div key={platform} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {getPlatformIcon(platform)}
                                                    <span className="capitalize">{platform}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`${styles.progressBar} ${styles.progressBarBlue} ${getProgressWidthClass(percentage)}`}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium">{percentage}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Intent Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {Object.entries(analytics.intentBreakdown).map(([intent, percentage]) => (
                                            <div key={intent} className="flex items-center justify-between">
                                                <span className="capitalize">{intent.replace('_', ' ')}</span>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`${styles.progressBar} ${styles.progressBarGreen} ${getProgressWidthClass(percentage)}`}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium">{percentage}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Templates Tab */}
                <TabsContent value="templates" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Response Templates</CardTitle>
                                    <CardDescription>Manage AI response templates and categories</CardDescription>
                                </div>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Template
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {templates.map((template) => (
                                    <div key={template.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <div className="font-medium">{template.name}</div>
                                                <div className="text-sm text-muted-foreground">{template.category}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={template.isActive ? "default" : "secondary"}>
                                                    {template.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                                <Button size="sm" variant="outline">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="text-sm text-muted-foreground mb-1">Template:</div>
                                            <div className="bg-muted p-3 rounded text-sm">{template.template}</div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <div className="text-muted-foreground">Usage</div>
                                                <div className="font-medium">{template.usageCount}</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground">Success Rate</div>
                                                <div className="font-medium">{(template.successRate * 100).toFixed(1)}%</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground">Tone</div>
                                                <div className="font-medium capitalize">{template.tone}</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground">Platforms</div>
                                                <div className="font-medium">{template.platforms.length}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Recent Responses Tab */}
                <TabsContent value="responses" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Auto Replies</CardTitle>
                            <CardDescription>Latest AI-generated responses and their performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentResponses.map((response) => (
                                    <div key={response.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {getPlatformIcon(response.platform)}
                                                <div>
                                                    <div className="font-medium">{response.senderId}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {response.sentAt.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={getUrgencyColor(response.intent.urgency)}>
                                                    {response.intent.urgency}
                                                </Badge>
                                                {response.escalationTriggered && (
                                                    <Badge variant="destructive">Escalated</Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <div className="text-sm font-medium mb-1">Intent</div>
                                                <div className="text-sm text-muted-foreground capitalize">
                                                    {response.intent.type.replace('_', ' ')}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium mb-1">Response Time</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {(response.responseTime / 1000).toFixed(1)}s
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-muted/50 rounded p-3 mb-3">
                                            <div className="text-sm font-medium mb-1">Response</div>
                                            <div className="text-sm text-muted-foreground">{response.response}</div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {response.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Performance Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Metrics</CardTitle>
                                <CardDescription>Key performance indicators</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Total Responses</span>
                                        <span className="font-semibold">{analytics.totalResponses.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Success Rate</span>
                                        <span className="font-semibold">{(analytics.successRate * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Avg Response Time</span>
                                        <span className="font-semibold">{(analytics.averageResponseTime / 1000).toFixed(1)}s</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Escalation Rate</span>
                                        <span className="font-semibold">{(analytics.escalationRate * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Templates */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Performing Templates</CardTitle>
                                <CardDescription>Most successful response templates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {templates.slice(0, 5).map((template) => (
                                        <div key={template.id} className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{template.name}</div>
                                                <div className="text-sm text-muted-foreground">{template.category}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold">{(template.successRate * 100).toFixed(1)}%</div>
                                                <div className="text-xs text-muted-foreground">{template.usageCount} uses</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Settings</CardTitle>
                            <CardDescription>Configure auto reply system behavior</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Label>Enable Auto Replies</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically respond to incoming messages
                                        </p>
                                    </div>
                                    <Switch checked={isSystemActive} onCheckedChange={toggleSystem} />
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Platform Settings</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Instagram Response Delay</Label>
                                            <Input type="number" defaultValue={3} min={1} max={10} />
                                            <p className="text-xs text-muted-foreground">Seconds before responding</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>WhatsApp Response Delay</Label>
                                            <Input type="number" defaultValue={2} min={1} max={10} />
                                            <p className="text-xs text-muted-foreground">Seconds before responding</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Escalation Rules</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Escalate complaints after</Label>
                                            <Input type="number" defaultValue={5} min={1} max={60} className="w-20" />
                                            <span className="text-sm">minutes</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label>Escalate VIP messages after</Label>
                                            <Input type="number" defaultValue={2} min={1} max={30} className="w-20" />
                                            <span className="text-sm">minutes</span>
                                        </div>
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