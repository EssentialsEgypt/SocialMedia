"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Users, DollarSign, Target, TrendingUp, TrendingDown, AlertTriangle, Brain, Lightbulb } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SessionBehavior {
    id: string
    sessionId: string
    device: string
    source: string
    duration: number
    pages: number
    scrollDepth: number
    rageClicks: number
    exits: number
    aiLabel: string
    aiSummary: string
    timestamp: string
    revenue?: number
    products: string[]
}

interface Benchmark {
    metric: string
    yourValue: number
    industryAverage: number
    percentile: number
    trend: string
    aiAnalysis: string
}

export function WebsiteAnalytics() {
    const [activeTab, setActiveTab] = useState("overview")
    const [sessions, setSessions] = useState<SessionBehavior[]>([])
    const [benchmarks, setBenchmarks] = useState<Benchmark[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    // Fetch sessions and benchmarks
    const loadAnalyticsData = async () => {
        setIsLoading(true)
        setLoadError(null)
        try {
            const [sessionsRes, benchmarksRes] = await Promise.all([
                fetch("/api/website-analytics/sessions"),
                fetch("/api/website-analytics/benchmarks")
            ])
            if (!sessionsRes.ok || !benchmarksRes.ok) throw new Error("API error")
            const sessionsData = await sessionsRes.json()
            const benchmarksData = await benchmarksRes.json()
            setSessions(sessionsData.data.sessions)
            setBenchmarks(benchmarksData.data.benchmarks)
        } catch (e) {
            setLoadError("Failed to load analytics data. Showing demo data.")
            setSessions([])
            setBenchmarks([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadAnalyticsData()
    }, [])

    // Chart data for demo
    const sessionData = [
        { time: '00:00', sessions: 45, conversions: 3 },
        { time: '04:00', sessions: 23, conversions: 1 },
        { time: '08:00', sessions: 89, conversions: 8 },
        { time: '12:00', sessions: 156, conversions: 15 },
        { time: '16:00', sessions: 134, conversions: 12 },
        { time: '20:00', sessions: 98, conversions: 9 },
        { time: '24:00', sessions: 67, conversions: 6 }
    ]

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="flex items-center space-x-2">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                    <span>Loading Website Analytics...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Website Analytics</h1>
                    <p className="text-muted-foreground">AI-powered insights into user behavior and business performance</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={loadAnalyticsData} size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>
            {loadError && (
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{loadError}</AlertDescription>
                </Alert>
            )}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="behavior">AI Behavior</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sessions & Conversions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={sessionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="sessions" stroke="#3b82f6" name="Sessions" />
                                        <Line type="monotone" dataKey="conversions" stroke="#10b981" name="Conversions" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Competitor Benchmarks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {benchmarks.map((benchmark) => (
                                        <div key={benchmark.metric} className="flex items-center justify-between p-3 border rounded">
                                            <div>
                                                <p className="font-medium">{benchmark.metric}</p>
                                                <p className="text-sm text-muted-foreground">{benchmark.aiAnalysis}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{benchmark.yourValue}</p>
                                                <p className="text-xs text-muted-foreground">vs {benchmark.industryAverage} avg</p>
                                                <div className="flex items-center">
                                                    {benchmark.trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                                                    <span className="text-xs ml-1">{benchmark.percentile}th percentile</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="behavior" className="space-y-4">
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <Card key={session.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <Badge>{session.aiLabel}</Badge>
                                            <div>
                                                <p className="font-medium">Session {session.sessionId}</p>
                                                <p className="text-sm text-muted-foreground">{session.device} • {session.source} • {session.duration}s</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {session.revenue ? (
                                                <p className="font-bold text-green-600">${session.revenue}</p>
                                            ) : (
                                                <p className="text-muted-foreground">No revenue</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Pages</p>
                                            <p className="font-medium">{session.pages}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Scroll Depth</p>
                                            <p className="font-medium">{session.scrollDepth}%</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Rage Clicks</p>
                                            <p className="font-medium">{session.rageClicks}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Exits</p>
                                            <p className="font-medium">{session.exits}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded text-sm">
                                        <Brain className="h-4 w-4 inline mr-2 text-blue-600" />
                                        {session.aiSummary}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
