"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  TrendingUp, TrendingDown, DollarSign, Target, Calendar, Clock,
  BarChart3, Users, Eye, Zap, Brain, AlertTriangle, CheckCircle,
  Star, ArrowUpRight, ArrowDownRight, RefreshCw, Play, Pause,
  Settings, Download, Share2, Bell, MessageSquare, Instagram,
  Facebook, Mail, Smartphone, Package, Tag, Percent, Activity, History
} from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts"

// Interfaces for data structures
interface ROIForecast {
  id: string
  productName: string
  productType: 'physical' | 'digital' | 'bundle' | 'flash_sale'
  campaignType: 'instagram' | 'facebook' | 'tiktok' | 'organic' | 'influencer' | 'email' | 'whatsapp'
  budget: number
  predictedRevenue: number
  estimatedSpend: number
  projectedROI: number
  confidenceLevel: number
  breakEvenPoint: number // hours
  dropWindowImpact: number
  creativeStrengthScore?: number
  vipEngagementPotential: number
  reasoning: string[]
  recommendations: string[]
  forecastRanges: {
    bestCase: number
    mostLikely: number
    worstCase: number
  }
  timeframes: {
    '24h': { roi: number; revenue: number; spend: number }
    '3d': { roi: number; revenue: number; spend: number }
    '7d': { roi: number; revenue: number; spend: number }
    '14d': { roi: number; revenue: number; spend: number }
  }
  marketFactors: {
    competitorActivity: string
    cpcTrend: string
    audienceEngagement: string
    seasonalFactor: number
  }
  createdAt: string
  status: 'pending' | 'active' | 'completed'
  actualResults?: {
    actualRevenue: number
    actualSpend: number
    actualROI: number
    accuracy: number
    completedAt: string
  }
}

interface ForecastComparison {
  forecasted: ROIForecast
  actual: ROIForecast['actualResults']
  accuracy: number
  variance: number
}

export function AIROIForecastEngine() {
  const [forecasts, setForecasts] = useState<ROIForecast[]>([])
  const [comparisons, setComparisons] = useState<ForecastComparison[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'forecast' | 'history' | 'comparison'>('forecast')
  const [newForecast, setNewForecast] = useState({
    productName: '',
    productType: 'physical' as const,
    campaignType: 'instagram' as const,
    budget: 0,
    description: ''
  })

  // Load forecast data
  const loadForecastData = async () => {
    try {
      const [forecastsRes, comparisonsRes] = await Promise.all([
        fetch('/api/ai-roi-forecast/forecasts'),
        fetch('/api/ai-roi-forecast/comparisons')
      ])
      
      if (forecastsRes.ok) {
        const forecastsData = await forecastsRes.json()
        setForecasts(forecastsData)
      }
      
      if (comparisonsRes.ok) {
        const comparisonsData = await comparisonsRes.json()
        setComparisons(comparisonsData)
      }
    } catch (error) {
      console.error('Error loading forecast data:', error)
    }
  }

  // Generate new forecast
  const generateForecast = async () => {
    if (!newForecast.productName || newForecast.budget <= 0) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-roi-forecast/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newForecast)
      })
      
      if (response.ok) {
        const forecast = await response.json()
        setForecasts(prev => [forecast, ...prev])
        setNewForecast({
          productName: '',
          productType: 'physical',
          campaignType: 'instagram',
          budget: 0,
          description: ''
        })
      }
    } catch (error) {
      console.error('Error generating forecast:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Complete forecast with actual results
  const completeForecast = async (forecastId: string) => {
    try {
      const response = await fetch(`/api/ai-roi-forecast/complete/${forecastId}`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const updatedForecast = await response.json()
        setForecasts(prev => prev.map(f => f.id === forecastId ? updatedForecast : f))
        await loadForecastData() // Reload comparisons
      }
    } catch (error) {
      console.error('Error completing forecast:', error)
    }
  }

  useEffect(() => {
    loadForecastData()
  }, [])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800'
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getROIColor = (roi: number) => {
    if (roi >= 3) return 'text-green-600'
    if (roi >= 2) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI ROI Forecast Engine
          </h1>
          <p className="text-muted-foreground mt-2">
            Predict success before you spend a single dollar
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadForecastData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast">New Forecast</TabsTrigger>
          <TabsTrigger value="history">Forecast History</TabsTrigger>
          <TabsTrigger value="comparison">Accuracy Analysis</TabsTrigger>
        </TabsList>

        {/* New Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Forecast Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Create New Forecast</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    placeholder="Enter product name..."
                    value={newForecast.productName}
                    onChange={(e) => setNewForecast(prev => ({ ...prev, productName: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productType">Product Type</Label>
                    <Select
                      value={newForecast.productType}
                      onValueChange={(value) => setNewForecast(prev => ({ ...prev, productType: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical Product</SelectItem>
                        <SelectItem value="digital">Digital Product</SelectItem>
                        <SelectItem value="bundle">Bundle/Package</SelectItem>
                        <SelectItem value="flash_sale">Flash Sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaignType">Campaign Type</Label>
                    <Select
                      value={newForecast.campaignType}
                      onValueChange={(value) => setNewForecast(prev => ({ ...prev, campaignType: value as any }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram Ads</SelectItem>
                        <SelectItem value="facebook">Facebook Ads</SelectItem>
                        <SelectItem value="tiktok">TikTok Ads</SelectItem>
                        <SelectItem value="organic">Organic Posts</SelectItem>
                        <SelectItem value="influencer">Influencer Promo</SelectItem>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Broadcast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget..."
                    value={newForecast.budget}
                    onChange={(e) => setNewForecast(prev => ({ ...prev, budget: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product, target audience, or any special factors..."
                    value={newForecast.description}
                    onChange={(e) => setNewForecast(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <Button 
                  onClick={generateForecast} 
                  disabled={isLoading || !newForecast.productName || newForecast.budget <= 0}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Forecast...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate AI Forecast
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Forecast Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {forecasts.filter(f => f.status === 'active').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Forecasts</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {comparisons.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Accuracy</span>
                    <span className="font-medium">
                      {comparisons.length > 0 
                        ? `${(comparisons.reduce((acc, c) => acc + c.accuracy, 0) / comparisons.length).toFixed(1)}%`
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <Progress 
                    value={comparisons.length > 0 
                      ? comparisons.reduce((acc, c) => acc + c.accuracy, 0) / comparisons.length 
                      : 0
                    } 
                    className="w-full" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Forecasts */}
          {forecasts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Forecasts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecasts.slice(0, 3).map((forecast) => (
                    <div key={forecast.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{forecast.productName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {forecast.campaignType} • {forecast.productType}
                          </p>
                        </div>
                        <Badge className={getConfidenceColor(forecast.confidenceLevel)}>
                          {forecast.confidenceLevel}% Confidence
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-muted-foreground">Projected ROI</div>
                          <div className={`text-lg font-bold ${getROIColor(forecast.projectedROI)}`}>
                            {forecast.projectedROI.toFixed(1)}x
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Predicted Revenue</div>
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(forecast.predictedRevenue)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Estimated Spend</div>
                          <div className="text-lg font-bold text-red-600">
                            {formatCurrency(forecast.estimatedSpend)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Break-even</div>
                          <div className="text-lg font-bold text-blue-600">
                            {forecast.breakEvenPoint}h
                          </div>
                        </div>
                      </div>

                      {forecast.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => completeForecast(forecast.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Forecast History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>All Forecasts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forecasts.map((forecast) => (
                  <div key={forecast.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{forecast.productName}</h3>
                        <p className="text-muted-foreground">
                          {forecast.campaignType} • {forecast.productType} • {formatCurrency(forecast.budget)} budget
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Created {new Date(forecast.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getConfidenceColor(forecast.confidenceLevel)}>
                          {forecast.confidenceLevel}% Confidence
                        </Badge>
                        <div className={`text-2xl font-bold mt-1 ${getROIColor(forecast.projectedROI)}`}>
                          {forecast.projectedROI.toFixed(1)}x ROI
                        </div>
                      </div>
                    </div>

                    {/* ROI Timeline Chart */}
                    <div className="mb-4">
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={Object.entries(forecast.timeframes).map(([timeframe, data]) => ({
                          timeframe,
                          roi: data.roi,
                          revenue: data.revenue,
                          spend: data.spend
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timeframe" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="roi" stroke="#3b82f6" name="ROI" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Forecast Ranges */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Worst Case</div>
                        <div className="text-lg font-bold text-red-600">
                          {forecast.forecastRanges.worstCase.toFixed(1)}x
                        </div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Most Likely</div>
                        <div className="text-lg font-bold text-yellow-600">
                          {forecast.forecastRanges.mostLikely.toFixed(1)}x
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Best Case</div>
                        <div className="text-lg font-bold text-green-600">
                          {forecast.forecastRanges.bestCase.toFixed(1)}x
                        </div>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">AI Reasoning</h4>
                      <div className="space-y-1">
                        {forecast.reasoning.map((reason, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">AI Recommendations</h4>
                      <div className="space-y-1">
                        {forecast.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Market Factors */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium">Competitor Activity</div>
                        <div className="text-sm text-muted-foreground">{forecast.marketFactors.competitorActivity}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">CPC Trend</div>
                        <div className="text-sm text-muted-foreground">{forecast.marketFactors.cpcTrend}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Audience Engagement</div>
                        <div className="text-sm text-muted-foreground">{forecast.marketFactors.audienceEngagement}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Seasonal Factor</div>
                        <div className="text-sm text-muted-foreground">{forecast.marketFactors.seasonalFactor}x</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {forecast.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => completeForecast(forecast.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accuracy Analysis Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Forecast vs Actual Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {comparisons.length > 0 ? (
                <div className="space-y-6">
                  {/* Accuracy Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {(comparisons.reduce((acc, c) => acc + c.accuracy, 0) / comparisons.length).toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Average Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {comparisons.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Forecasts Analyzed</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {comparisons.filter(c => c.accuracy >= 80).length}
                      </div>
                      <div className="text-sm text-muted-foreground">High Accuracy (80%+)</div>
                    </div>
                  </div>

                  {/* Accuracy Chart */}
                  <div>
                    <h3 className="font-semibold mb-3">Accuracy Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={comparisons.map((c, index) => ({
                        forecast: c.forecasted.productName,
                        accuracy: c.accuracy,
                        variance: c.variance
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="forecast" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" name="Accuracy %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Detailed Comparisons */}
                  <div className="space-y-4">
                    {comparisons.map((comparison) => (
                      <div key={comparison.forecasted.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{comparison.forecasted.productName}</h4>
                          <Badge className={comparison.accuracy >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {comparison.accuracy.toFixed(1)}% Accurate
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Forecasted ROI</div>
                            <div className="text-lg font-bold text-blue-600">
                              {comparison.forecasted.projectedROI.toFixed(1)}x
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Actual ROI</div>
                            <div className="text-lg font-bold text-green-600">
                              {comparison.actual?.actualROI.toFixed(1)}x
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Variance</div>
                            <div className={`text-lg font-bold ${comparison.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {comparison.variance > 0 ? '+' : ''}{comparison.variance.toFixed(1)}x
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Revenue Accuracy</div>
                            <div className="text-lg font-bold text-purple-600">
                              {Math.abs(comparison.forecasted.predictedRevenue - (comparison.actual?.actualRevenue || 0)) / comparison.forecasted.predictedRevenue * 100 < 20 ? '✓' : '⚠'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed forecasts to analyze yet.</p>
                  <p className="text-sm text-muted-foreground">Complete some forecasts to see accuracy analysis.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 