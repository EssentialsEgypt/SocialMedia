"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Target,
  Zap,
  Bell,
  MessageSquare,
  Mail,
  Smartphone,
  BarChart3,
  Play,
  Pause,
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  CalendarDays,
  Timer,
  Sparkles,
  Brain,
  Rocket,
  Lightbulb,
  Plus
} from "lucide-react"

// Types
interface AudienceData {
  id: number
  date: string
  dayOfWeek: string
  hour: number
  engagement: number
  reach: number
  impressions: number
  activeUsers: number
}

interface PostingRecommendation {
  id: number
  type: 'timing' | 'drop' | 'reschedule' | 'daily'
  title: string
  description: string
  recommendedTime: string
  expectedEngagement: number
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'sent' | 'acted'
  createdAt: string
}

interface DropOptimization {
  id: number
  productName: string
  launchDate: string
  recommendedTime: string
  teaserSchedule: string[]
  countdownDays: number
  expectedReach: number
  status: 'planning' | 'teaser' | 'launch' | 'completed'
}

interface AlertSettings {
  email: boolean
  whatsapp: boolean
  dashboard: boolean
  contentHub: boolean
  dailyDigest: boolean
  weeklyReport: boolean
}

// Mock data for demonstration
const mockAudienceData: AudienceData[] = [
  { id: 1, date: "2024-01-15", dayOfWeek: "Monday", hour: 6, engagement: 85, reach: 1200, impressions: 1800, activeUsers: 950 },
  { id: 2, date: "2024-01-15", dayOfWeek: "Monday", hour: 7, engagement: 92, reach: 1400, impressions: 2100, activeUsers: 1100 },
  { id: 3, date: "2024-01-15", dayOfWeek: "Monday", hour: 8, engagement: 78, reach: 1100, impressions: 1600, activeUsers: 850 },
  { id: 4, date: "2024-01-16", dayOfWeek: "Tuesday", hour: 6, engagement: 88, reach: 1300, impressions: 1900, activeUsers: 1000 },
  { id: 5, date: "2024-01-16", dayOfWeek: "Tuesday", hour: 7, engagement: 95, reach: 1500, impressions: 2200, activeUsers: 1200 },
  { id: 6, date: "2024-01-17", dayOfWeek: "Wednesday", hour: 6, engagement: 82, reach: 1200, impressions: 1800, activeUsers: 900 },
  { id: 7, date: "2024-01-17", dayOfWeek: "Wednesday", hour: 7, engagement: 89, reach: 1400, impressions: 2100, activeUsers: 1100 },
  { id: 8, date: "2024-01-18", dayOfWeek: "Thursday", hour: 6, engagement: 91, reach: 1600, impressions: 2400, activeUsers: 1300 },
  { id: 9, date: "2024-01-18", dayOfWeek: "Thursday", hour: 7, engagement: 98, reach: 1800, impressions: 2700, activeUsers: 1500 },
  { id: 10, date: "2024-01-19", dayOfWeek: "Friday", hour: 6, engagement: 87, reach: 1400, impressions: 2100, activeUsers: 1100 },
  { id: 11, date: "2024-01-19", dayOfWeek: "Friday", hour: 7, engagement: 94, reach: 1600, impressions: 2400, activeUsers: 1300 },
  { id: 12, date: "2024-01-20", dayOfWeek: "Saturday", hour: 6, engagement: 90, reach: 1500, impressions: 2200, activeUsers: 1200 },
  { id: 13, date: "2024-01-20", dayOfWeek: "Saturday", hour: 7, engagement: 96, reach: 1700, impressions: 2500, activeUsers: 1400 },
  { id: 14, date: "2024-01-21", dayOfWeek: "Sunday", hour: 6, engagement: 93, reach: 1600, impressions: 2400, activeUsers: 1300 },
  { id: 15, date: "2024-01-21", dayOfWeek: "Sunday", hour: 7, engagement: 99, reach: 1900, impressions: 2800, activeUsers: 1600 },
]

const mockRecommendations: PostingRecommendation[] = [
  {
    id: 1,
    type: 'timing',
    title: "Peak Hour Alert",
    description: "Your audience will be most active in 2 hours – consider posting around 6 PM.",
    recommendedTime: "18:00",
    expectedEngagement: 1.4,
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    type: 'drop',
    title: "Drop Launch Optimization",
    description: "Schedule your drop announcement for Tuesday 7 PM – based on previous data, this timing gets 35% more reach.",
    recommendedTime: "19:00",
    expectedEngagement: 1.35,
    priority: 'high',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    type: 'reschedule',
    title: "Content Reschedule",
    description: "Reschedule to Sunday at 11 AM to match top engagement hour.",
    recommendedTime: "11:00",
    expectedEngagement: 1.25,
    priority: 'medium',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    type: 'daily',
    title: "Daily Posting Tip",
    description: "Your best engagement days this week are Thursday and Sunday.",
    recommendedTime: "19:00",
    expectedEngagement: 1.3,
    priority: 'medium',
    status: 'sent',
    createdAt: new Date().toISOString()
  }
]

const mockDrops: DropOptimization[] = [
  {
    id: 1,
    productName: "Supreme Hoodie Collection",
    launchDate: "2024-02-01",
    recommendedTime: "19:00",
    teaserSchedule: ["2024-01-28 18:00", "2024-01-30 19:00", "2024-01-31 18:30"],
    countdownDays: 7,
    expectedReach: 2500,
    status: 'planning'
  },
  {
    id: 2,
    productName: "Limited Edition Sneakers",
    launchDate: "2024-02-15",
    recommendedTime: "18:00",
    teaserSchedule: ["2024-02-10 18:00", "2024-02-12 19:00", "2024-02-14 18:30"],
    countdownDays: 21,
    expectedReach: 3000,
    status: 'planning'
  }
]

export function AIAudienceTimingInsights() {
  const [audienceData, setAudienceData] = useState<AudienceData[]>(mockAudienceData)
  const [recommendations, setRecommendations] = useState<PostingRecommendation[]>(mockRecommendations)
  const [drops, setDrops] = useState<DropOptimization[]>(mockDrops)
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    email: true,
    whatsapp: true,
    dashboard: true,
    contentHub: true,
    dailyDigest: true,
    weeklyReport: true
  })
  const [loading, setLoading] = useState(false)
  const [showNewDrop, setShowNewDrop] = useState(false)
  const [newDrop, setNewDrop] = useState({
    productName: "",
    launchDate: "",
    description: ""
  })

  // Calculate audience insights
  const getBestDays = () => {
    const dayStats = audienceData.reduce((acc, data) => {
      if (!acc[data.dayOfWeek]) {
        acc[data.dayOfWeek] = { totalEngagement: 0, count: 0 }
      }
      acc[data.dayOfWeek].totalEngagement += data.engagement
      acc[data.dayOfWeek].count += 1
      return acc
    }, {} as Record<string, { totalEngagement: number, count: number }>)

    return Object.entries(dayStats)
      .map(([day, stats]) => ({
        day,
        avgEngagement: stats.totalEngagement / stats.count
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 3)
  }

  const getBestHours = () => {
    const hourStats = audienceData.reduce((acc, data) => {
      if (!acc[data.hour]) {
        acc[data.hour] = { totalEngagement: 0, count: 0 }
      }
      acc[data.hour].totalEngagement += data.engagement
      acc[data.hour].count += 1
      return acc
    }, {} as Record<number, { totalEngagement: number, count: number }>)

    return Object.entries(hourStats)
      .map(([hour, stats]) => ({
        hour: parseInt(hour),
        avgEngagement: stats.totalEngagement / stats.count
      }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 3)
  }

  const getCurrentRecommendation = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    
    const bestHours = getBestHours()
    const bestDays = getBestDays()
    
    const nextBestHour = bestHours.find(h => h.hour > currentHour) || bestHours[0]
    const nextBestDay = bestDays.find(d => d.day !== currentDay) || bestDays[0]
    
    return {
      nextHour: nextBestHour,
      nextDay: nextBestDay,
      currentEngagement: audienceData.find(d => d.hour === currentHour && d.dayOfWeek === currentDay)?.engagement || 0
    }
  }

  const syncAudienceData = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock new data
    const newData: AudienceData = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      hour: new Date().getHours(),
      engagement: Math.floor(Math.random() * 20) + 80,
      reach: Math.floor(Math.random() * 500) + 1200,
      impressions: Math.floor(Math.random() * 800) + 1800,
      activeUsers: Math.floor(Math.random() * 300) + 900
    }
    
    setAudienceData(prev => [newData, ...prev])
    setLoading(false)
    toast.success("Audience data synced successfully")
  }

  const generateAIRecommendation = () => {
    const recommendation: PostingRecommendation = {
      id: Date.now(),
      type: 'timing',
      title: "AI Timing Suggestion",
      description: `Your audience will peak at ${getCurrentRecommendation().nextHour.hour}:00 today – post now to reach ${getCurrentRecommendation().nextHour.avgEngagement}% engagement.`,
      recommendedTime: `${getCurrentRecommendation().nextHour.hour}:00`,
      expectedEngagement: getCurrentRecommendation().nextHour.avgEngagement / 100,
      priority: 'high',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    setRecommendations(prev => [recommendation, ...prev])
    toast.success("AI recommendation generated")
  }

  const sendAlert = async (recommendation: PostingRecommendation) => {
    setLoading(true)
    // Simulate sending alerts
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setRecommendations(prev => prev.map(r => 
      r.id === recommendation.id ? { ...r, status: 'sent' } : r
    ))
    
    setLoading(false)
    toast.success(`Alert sent via ${alertSettings.email ? 'Email, ' : ''}${alertSettings.whatsapp ? 'WhatsApp, ' : ''}${alertSettings.dashboard ? 'Dashboard' : ''}`)
  }

  const addNewDrop = () => {
    if (!newDrop.productName || !newDrop.launchDate) {
      toast.error("Please fill in all required fields")
      return
    }

    const drop: DropOptimization = {
      id: Date.now(),
      productName: newDrop.productName,
      launchDate: newDrop.launchDate,
      recommendedTime: "19:00", // Based on best hour analysis
      teaserSchedule: [
        new Date(new Date(newDrop.launchDate).getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + " 18:00",
        new Date(new Date(newDrop.launchDate).getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + " 19:00",
        new Date(new Date(newDrop.launchDate).getTime() - 0.5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] + " 18:30"
      ],
      countdownDays: Math.ceil((new Date(newDrop.launchDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      expectedReach: Math.floor(Math.random() * 1000) + 2000,
      status: 'planning'
    }

    setDrops(prev => [drop, ...prev])
    setNewDrop({ productName: "", launchDate: "", description: "" })
    setShowNewDrop(false)
    toast.success("Drop optimization created")
  }

  const bestDays = getBestDays()
  const bestHours = getBestHours()
  const currentRecommendation = getCurrentRecommendation()

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Audience Timing Insights</h1>
          <p className="text-gray-600">Optimize content posting based on real audience behavior</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={syncAudienceData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Audience Data
          </Button>
          <Button onClick={generateAIRecommendation} variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            Generate AI Tip
          </Button>
        </div>
      </div>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Day</p>
                <p className="text-2xl font-bold text-blue-600">{bestDays[0]?.day}</p>
                <p className="text-sm text-gray-500">{bestDays[0]?.avgEngagement.toFixed(1)}% engagement</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Hour</p>
                <p className="text-2xl font-bold text-green-600">{bestHours[0]?.hour}:00</p>
                <p className="text-sm text-gray-500">{bestHours[0]?.avgEngagement.toFixed(1)}% engagement</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Peak</p>
                <p className="text-2xl font-bold text-purple-600">{currentRecommendation.nextHour.hour}:00</p>
                <p className="text-sm text-gray-500">In {currentRecommendation.nextHour.hour - new Date().getHours()} hours</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Drops</p>
                <p className="text-2xl font-bold text-orange-600">{drops.filter(d => d.status === 'planning').length}</p>
                <p className="text-sm text-gray-500">Optimized launches</p>
              </div>
              <Rocket className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="insights">Audience Insights</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="drops">Drop Optimization</TabsTrigger>
          <TabsTrigger value="alerts">Smart Alerts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Audience Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Best Engagement Days</CardTitle>
                <CardDescription>Top performing days of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bestDays.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <span className="font-medium">{day.day}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{day.avgEngagement.toFixed(1)}%</p>
                        <p className="text-sm text-gray-500">engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Engagement Hours</CardTitle>
                <CardDescription>Peak activity hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bestHours.map((hour, index) => (
                    <div key={hour.hour} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <span className="font-medium">{hour.hour}:00</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{hour.avgEngagement.toFixed(1)}%</p>
                        <p className="text-sm text-gray-500">engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Audience Activity Timeline</CardTitle>
              <CardDescription>Detailed engagement data by day and hour</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Hour</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Reach</TableHead>
                    <TableHead>Active Users</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audienceData.slice(0, 10).map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.dayOfWeek}</TableCell>
                      <TableCell>{data.hour}:00</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={data.engagement} className="w-20" />
                          <span className="text-sm font-medium">{data.engagement}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{data.reach.toLocaleString()}</TableCell>
                      <TableCell>{data.activeUsers.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI-Powered Recommendations</CardTitle>
                  <CardDescription>Smart suggestions based on audience behavior</CardDescription>
                </div>
                <Button onClick={generateAIRecommendation}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate New Tip
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={recommendation.priority === 'high' ? 'destructive' : recommendation.priority === 'medium' ? 'default' : 'secondary'}>
                              {recommendation.priority}
                            </Badge>
                            <Badge variant="outline">{recommendation.type}</Badge>
                            {recommendation.status === 'sent' && (
                              <Badge variant="outline" className="text-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Sent
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold mb-1">{recommendation.title}</h4>
                          <p className="text-gray-600 mb-2">{recommendation.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Recommended: {recommendation.recommendedTime}</span>
                            <span>Expected: {recommendation.expectedEngagement}x engagement</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {recommendation.status === 'pending' && (
                            <Button size="sm" onClick={() => sendAlert(recommendation)} disabled={loading}>
                              <Bell className="h-4 w-4 mr-1" />
                              Send Alert
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Drop Optimization Tab */}
        <TabsContent value="drops" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Drop-Specific Optimization</CardTitle>
                  <CardDescription>AI-optimized product launch schedules</CardDescription>
                </div>
                <Dialog open={showNewDrop} onOpenChange={setShowNewDrop}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Drop
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Drop Optimization</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Product Name</label>
                        <Input
                          value={newDrop.productName}
                          onChange={(e) => setNewDrop({...newDrop, productName: e.target.value})}
                          placeholder="e.g., Supreme Hoodie Collection"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Launch Date</label>
                        <Input
                          type="date"
                          value={newDrop.launchDate}
                          onChange={(e) => setNewDrop({...newDrop, launchDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={newDrop.description}
                          onChange={(e) => setNewDrop({...newDrop, description: e.target.value})}
                          placeholder="Product description..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowNewDrop(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addNewDrop}>
                          Create Optimization
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drops.map((drop) => (
                  <Card key={drop.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={drop.status === 'planning' ? 'default' : drop.status === 'teaser' ? 'secondary' : 'destructive'}>
                              {drop.status}
                            </Badge>
                            <Badge variant="outline">{drop.countdownDays} days left</Badge>
                          </div>
                          <h4 className="font-semibold mb-1">{drop.productName}</h4>
                          <p className="text-gray-600 mb-2">Launch: {new Date(drop.launchDate).toLocaleDateString()} at {drop.recommendedTime}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Expected Reach</p>
                              <p className="font-semibold">{drop.expectedReach.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Teaser Posts</p>
                              <p className="font-semibold">{drop.teaserSchedule.length}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-1">Teaser Schedule:</p>
                            <div className="space-y-1">
                              {drop.teaserSchedule.map((date, index) => (
                                <p key={index} className="text-xs text-gray-500">
                                  {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            Start Teasers
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smart Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Smart Alerts & Notifications</CardTitle>
              <CardDescription>Configure how you receive AI insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Alert Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>Email Alerts</span>
                        </div>
                        <Switch
                          checked={alertSettings.email}
                          onCheckedChange={(checked) => setAlertSettings({...alertSettings, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>WhatsApp Alerts</span>
                        </div>
                        <Switch
                          checked={alertSettings.whatsapp}
                          onCheckedChange={(checked) => setAlertSettings({...alertSettings, whatsapp: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span>Dashboard Notifications</span>
                        </div>
                        <Switch
                          checked={alertSettings.dashboard}
                          onCheckedChange={(checked) => setAlertSettings({...alertSettings, dashboard: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>Content Hub AI Agent</span>
                        </div>
                        <Switch
                          checked={alertSettings.contentHub}
                          onCheckedChange={(checked) => setAlertSettings({...alertSettings, contentHub: checked})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Report Frequency</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>Daily Digest</span>
                        </div>
                        <Switch
                          checked={alertSettings.dailyDigest}
                          onCheckedChange={(checked) => setAlertSettings({...alertSettings, dailyDigest: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          <span>Weekly Analytics Report</span>
                        </div>
                        <Switch
                          checked={alertSettings.weeklyReport}
                          onCheckedChange={(checked) => setAlertSettings({...alertSettings, weeklyReport: checked})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Recent Alerts</h3>
                  <div className="space-y-2">
                    {recommendations.filter(r => r.status === 'sent').slice(0, 5).map((rec) => (
                      <div key={rec.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{rec.title}</span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {new Date(rec.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Settings & Configuration</CardTitle>
              <CardDescription>Customize AI behavior and analysis parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Analysis Parameters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Data Sync Frequency</label>
                      <Select defaultValue="weekly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Engagement Threshold</label>
                      <Input type="number" placeholder="80" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Prediction Confidence</label>
                      <Input type="number" placeholder="85" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Integration Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Meta Insights API</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Content Hub AI Agent</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-optimize Posting Schedule</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Advanced Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Real-time Audience Monitoring</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Competitor Analysis</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Predictive Analytics</span>
                      <Switch defaultChecked />
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