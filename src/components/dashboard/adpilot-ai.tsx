"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  DollarSign, 
  Users, 
  Clock, 
  Zap,
  Brain,
  Eye,
  RotateCcw,
  Play,
  Pause,
  Settings,
  BarChart,
  PieChart,
  Activity,
  Target as TargetIcon,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Search,
  RefreshCw,
  Download,
  Share2,
  MoreHorizontal
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from "recharts"

// Mock data for AdPilot AI
const mockCampaigns = [
  {
    id: "1",
    name: "Summer Sale Campaign",
    platform: "meta",
    status: "active",
    budget: 5000,
    spent: 3200,
    impressions: 150000,
    clicks: 4500,
    conversions: 89,
    revenue: 8900,
    roas: 2.78,
    ctr: 3.0,
    cpm: 21.33,
    cpc: 0.71,
    frequency: 2.1,
    healthScore: 85,
    goalMatchScore: 92,
    fatigueForecast: "2024-01-15",
    aiRecommendations: {
      action: "increase_budget",
      reason: "ROAS above 2.5x with low frequency",
      confidence: 87
    }
  },
  {
    id: "2", 
    name: "Retargeting Warm Audience",
    platform: "google",
    status: "active",
    budget: 3000,
    spent: 2100,
    impressions: 85000,
    clicks: 2800,
    conversions: 45,
    revenue: 5400,
    roas: 2.57,
    ctr: 3.3,
    cpm: 24.71,
    cpc: 0.75,
    frequency: 3.2,
    healthScore: 72,
    goalMatchScore: 68,
    fatigueForecast: "2024-01-10",
    aiRecommendations: {
      action: "rotate_creative",
      reason: "CTR declining, frequency increasing",
      confidence: 76
    }
  },
  {
    id: "3",
    name: "Cold Traffic Test",
    platform: "tiktok", 
    status: "paused",
    budget: 2000,
    spent: 1800,
    impressions: 120000,
    clicks: 2100,
    conversions: 12,
    revenue: 1200,
    roas: 0.67,
    ctr: 1.75,
    cpm: 15.0,
    cpc: 0.86,
    frequency: 1.8,
    healthScore: 35,
    goalMatchScore: 45,
    fatigueForecast: null,
    aiRecommendations: {
      action: "turn_off",
      reason: "ROAS below 1.0, high CPA",
      confidence: 94
    }
  }
]

const mockAlerts = [
  {
    id: "1",
    type: "performance_drop",
    severity: "warning",
    title: "ROAS Drop Detected",
    message: "Summer Sale Campaign ROAS dropped 15% in last 24h",
    campaignId: "1",
    actionRequired: true,
    timestamp: "2 minutes ago"
  },
  {
    id: "2", 
    type: "fatigue_warning",
    severity: "critical",
    title: "Ad Fatigue Imminent",
    message: "Retargeting Warm Audience showing fatigue signs",
    campaignId: "2",
    actionRequired: true,
    timestamp: "15 minutes ago"
  },
  {
    id: "3",
    type: "scaling_opportunity", 
    severity: "info",
    title: "Scaling Opportunity",
    message: "Cold Traffic Test ready for budget increase",
    campaignId: "3",
    actionRequired: false,
    timestamp: "1 hour ago"
  }
]

const mockAiActions = [
  {
    id: "1",
    campaignId: "1",
    actionType: "increase_budget",
    reason: "ROAS above 2.5x with low frequency",
    confidenceScore: 87,
    executed: false,
    metrics: { currentRoas: 2.78, targetRoas: 3.0 }
  },
  {
    id: "2",
    campaignId: "2", 
    actionType: "rotate_creative",
    reason: "CTR declining, frequency increasing",
    confidenceScore: 76,
    executed: false,
    metrics: { currentCtr: 3.3, previousCtr: 4.1 }
  },
  {
    id: "3",
    campaignId: "3",
    actionType: "turn_off", 
    reason: "ROAS below 1.0, high CPA",
    confidenceScore: 94,
    executed: true,
    executedAt: "2024-01-08T10:30:00Z",
    result: { moneySaved: 1200, performanceImpact: "positive" }
  }
]

const mockScalingLogs = [
  {
    id: "1",
    campaignId: "1",
    scalingType: "budget_increase",
    oldValue: 5000,
    newValue: 7500,
    percentageChange: 50,
    successScore: 85,
    notes: "ROAS improved from 2.5x to 2.8x after scaling",
    createdAt: "2024-01-05T14:20:00Z"
  },
  {
    id: "2",
    campaignId: "2",
    scalingType: "audience_expansion", 
    oldValue: 100000,
    newValue: 150000,
    percentageChange: 50,
    successScore: 72,
    notes: "Reached new audience segments, CTR maintained",
    createdAt: "2024-01-03T09:15:00Z"
  }
]

const mockCreativeTests = [
  {
    id: "1",
    name: "Hook Test - Version A vs B",
    testType: "ab_test",
    status: "completed",
    creativeAId: "creative-1",
    creativeBId: "creative-2", 
    winnerId: "creative-2",
    testDurationDays: 7,
    confidenceLevel: 95,
    results: {
      versionA: { ctr: 2.1, conversions: 23, roas: 2.1 },
      versionB: { ctr: 3.2, conversions: 34, roas: 2.8 }
    }
  }
]

const mockAudienceOverlaps = [
  {
    id: "1",
    adSet1Id: "adset-1",
    adSet2Id: "adset-2", 
    overlapPercentage: 35,
    recommendation: "merge",
    teamId: "team-1"
  },
  {
    id: "2",
    adSet1Id: "adset-3",
    adSet2Id: "adset-4",
    overlapPercentage: 12,
    recommendation: "keep_separate", 
    teamId: "team-1"
  }
]

// Chart data
const performanceData = [
  { date: "Jan 1", roas: 2.1, ctr: 2.8, spend: 1200 },
  { date: "Jan 2", roas: 2.3, ctr: 3.1, spend: 1350 },
  { date: "Jan 3", roas: 2.5, ctr: 3.2, spend: 1400 },
  { date: "Jan 4", roas: 2.8, ctr: 3.0, spend: 1500 },
  { date: "Jan 5", roas: 2.7, ctr: 2.9, spend: 1450 },
  { date: "Jan 6", roas: 2.9, ctr: 3.3, spend: 1600 },
  { date: "Jan 7", roas: 3.1, ctr: 3.5, spend: 1700 }
]

const costEfficiencyData = [
  { name: "Summer Sale", roas: 2.78, cpa: 35.96, quadrant: "best" },
  { name: "Retargeting", roas: 2.57, cpa: 46.67, quadrant: "potential" },
  { name: "Cold Traffic", roas: 0.67, cpa: 150.0, quadrant: "wasting" },
  { name: "Lookalike Test", roas: 1.8, cpa: 55.0, quadrant: "expensive" }
]

const COLORS = {
  best: "#10b981",
  potential: "#3b82f6", 
  expensive: "#f59e0b",
  wasting: "#ef4444"
}

export default function AdPilotAI() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [autopilotMode, setAutopilotMode] = useState(false)

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getQuadrantColor = (quadrant: string) => {
    return COLORS[quadrant as keyof typeof COLORS] || "#6b7280"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AdPilot AI</h1>
          <p className="text-muted-foreground">
            Next-generation ad performance system powered by AI
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant={autopilotMode ? "default" : "outline"}
            onClick={() => setAutopilotMode(!autopilotMode)}
            className="flex items-center space-x-2"
          >
            <Brain className="h-4 w-4" />
            <span>{autopilotMode ? "Autopilot ON" : "Autopilot OFF"}</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,100</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.34x</div>
            <p className="text-xs text-muted-foreground">
              +0.2x from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 paused, 1 completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Actions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 pending, 1 executed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="ai-actions">AI Actions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="creative-tests">Creative Tests</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>7-day ROAS and CTR trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="roas" stroke="#8884d8" name="ROAS" />
                    <Line type="monotone" dataKey="ctr" stroke="#82ca9d" name="CTR %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Efficiency Quadrant */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Efficiency Quadrant</CardTitle>
                <CardDescription>ROAS vs CPA analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={costEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="roas" fill="#8884d8" name="ROAS" />
                    <Bar dataKey="cpa" fill="#82ca9d" name="CPA" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Campaign Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Health Overview</CardTitle>
              <CardDescription>AI-powered health scores and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {campaign.platform.toUpperCase()} • {campaign.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`font-semibold ${getHealthScoreColor(campaign.healthScore)}`}>
                          {campaign.healthScore}/100
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Health Score
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {campaign.roas}x
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ROAS
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCampaign(campaign.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Management</CardTitle>
                  <CardDescription>AI-powered campaign optimization</CardDescription>
                </div>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Campaign</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status}
                          </Badge>
                          <Badge variant="outline">{campaign.platform.toUpperCase()}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Budget</div>
                        <div className="font-semibold">${campaign.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Spent</div>
                        <div className="font-semibold">${campaign.spent.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">ROAS</div>
                        <div className="font-semibold text-green-600">{campaign.roas}x</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Health Score</div>
                        <div className={`font-semibold ${getHealthScoreColor(campaign.healthScore)}`}>
                          {campaign.healthScore}/100
                        </div>
                      </div>
                    </div>

                    {campaign.aiRecommendations && (
                      <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertDescription>
                          <strong>AI Recommendation:</strong> {campaign.aiRecommendations.reason}
                          <div className="mt-2 flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              {campaign.aiRecommendations.action === "increase_budget" && "Increase Budget"}
                              {campaign.aiRecommendations.action === "rotate_creative" && "Rotate Creative"}
                              {campaign.aiRecommendations.action === "turn_off" && "Turn Off"}
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              Confidence: {campaign.aiRecommendations.confidence}%
                            </span>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Actions Tab */}
        <TabsContent value="ai-actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Actions</CardTitle>
              <CardDescription>Automated recommendations and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAiActions.map((action) => (
                  <div key={action.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold capitalize">
                          {action.actionType.replace("_", " ")}
                        </h4>
                        <Badge variant={action.executed ? "default" : "secondary"}>
                          {action.executed ? "Executed" : "Pending"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Confidence: {action.confidenceScore}%
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {action.reason}
                    </p>

                    <div className="flex items-center space-x-2">
                      {!action.executed && (
                        <>
                          <Button size="sm" variant="default">
                            <Play className="h-4 w-4 mr-2" />
                            Execute
                          </Button>
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Dismiss
                          </Button>
                        </>
                      )}
                      {action.executed && (
                        <div className="text-sm text-green-600">
                          ✓ Executed on {new Date(action.executedAt!).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Alerts</CardTitle>
              <CardDescription>AI-powered performance monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <strong>{alert.title}</strong>
                          <p className="text-sm mt-1">{alert.message}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </div>
                      </div>
                      {alert.actionRequired && (
                        <div className="mt-3 flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            View Campaign
                          </Button>
                          <Button size="sm" variant="outline">
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scaling History */}
            <Card>
              <CardHeader>
                <CardTitle>Scaling History</CardTitle>
                <CardDescription>Past scaling attempts and results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockScalingLogs.map((log) => (
                    <div key={log.id} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">
                          {log.scalingType.replace("_", " ")}
                        </span>
                        <Badge variant={log.successScore >= 80 ? "default" : "secondary"}>
                          {log.successScore}% Success
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {log.oldValue} → {log.newValue} ({log.percentageChange}%)
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {log.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Audience Overlaps */}
            <Card>
              <CardHeader>
                <CardTitle>Audience Overlaps</CardTitle>
                <CardDescription>Detected audience duplication</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAudienceOverlaps.map((overlap) => (
                    <div key={overlap.id} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          {overlap.overlapPercentage}% Overlap
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {overlap.recommendation}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Ad Set 1 vs Ad Set 2
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Creative Tests Tab */}
        <TabsContent value="creative-tests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Creative Testing</CardTitle>
                  <CardDescription>AI-powered creative optimization</CardDescription>
                </div>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Test</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCreativeTests.map((test) => (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{test.name}</h4>
                      <Badge variant={test.status === "completed" ? "default" : "secondary"}>
                        {test.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Test Type</div>
                        <div className="font-medium">{test.testType.toUpperCase()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Confidence</div>
                        <div className="font-medium">{test.confidenceLevel}%</div>
                      </div>
                    </div>

                    {test.status === "completed" && test.results && (
                      <div className="border-t pt-3">
                        <h5 className="font-medium mb-2">Results</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Version A</div>
                            <div>CTR: {test.results.versionA.ctr}%</div>
                            <div>ROAS: {test.results.versionA.roas}x</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Version B (Winner)</div>
                            <div>CTR: {test.results.versionB.ctr}%</div>
                            <div>ROAS: {test.results.versionB.roas}x</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 