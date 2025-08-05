"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp, DollarSign, Target, Brain, Clock, ArrowRight,
  BarChart3, Users, Eye, Zap, CheckCircle, AlertTriangle
} from "lucide-react"

interface ROIForecast {
  id: string
  productName: string
  projectedROI: number
  confidenceLevel: number
  predictedRevenue: number
  estimatedSpend: number
  breakEvenPoint: number
  status: 'pending' | 'active' | 'completed'
  createdAt: string
}

export function AIROIForecastCard() {
  const [latestForecast, setLatestForecast] = useState<ROIForecast | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load latest forecast
  const loadLatestForecast = async () => {
    try {
      const response = await fetch('/api/ai-roi-forecast/forecasts')
      if (response.ok) {
        const forecasts = await response.json()
        if (forecasts.length > 0) {
          setLatestForecast(forecasts[0])
        }
      }
    } catch (error) {
      console.error('Error loading latest forecast:', error)
    }
  }

  // Generate new forecast
  const generateNewForecast = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/ai-roi-forecast/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: "New Product Drop",
          productType: "physical",
          campaignType: "instagram",
          budget: 5000,
          description: "Quick forecast generation"
        })
      })

      if (response.ok) {
        const forecast = await response.json()
        setLatestForecast(forecast)
      }
    } catch (error) {
      console.error('Error generating forecast:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLatestForecast()
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

  if (!latestForecast) {
    return (
      <Card className="hover:scale-105 transition-all duration-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg text-white">
            <Brain className="h-5 w-5 text-pink-400" />
            <span>AI ROI Forecast</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-6">
            <Brain className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300 mb-4">
              No forecasts yet. Generate your first AI-powered ROI prediction.
            </p>
            <Button
              onClick={generateNewForecast}
              disabled={isLoading}
              size="sm"
              variant="premium"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Forecast
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:scale-105 transition-all duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg text-white">
          <Brain className="h-5 w-5 text-pink-400" />
          <span>AI ROI Forecast</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Forecast Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm truncate text-white">{latestForecast.productName}</h3>
            <p className="text-xs text-gray-300">
              {new Date(latestForecast.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="premium" className={getConfidenceColor(latestForecast.confidenceLevel)}>
            {latestForecast.confidenceLevel}%
          </Badge>
        </div>

        {/* ROI Prediction */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${getROIColor(latestForecast.projectedROI)}`}>
            {latestForecast.projectedROI.toFixed(1)}x ROI
          </div>
          <p className="text-xs text-gray-300">Projected Return</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <div className="text-gray-300">Revenue</div>
            <div className="font-semibold text-green-400">
              {formatCurrency(latestForecast.predictedRevenue)}
            </div>
          </div>
          <div>
            <div className="text-gray-300">Spend</div>
            <div className="font-semibold text-red-400">
              {formatCurrency(latestForecast.estimatedSpend)}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Break-even</div>
            <div className="font-semibold text-blue-600">
              {latestForecast.breakEvenPoint}h
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Status</div>
            <div className="font-semibold">
              {latestForecast.status === 'active' ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-muted-foreground">Completed</span>
              )}
            </div>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Confidence</span>
            <span>{latestForecast.confidenceLevel}%</span>
          </div>
          <Progress
            value={latestForecast.confidenceLevel}
            className="h-2"
          />
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
          onClick={() => window.location.href = '/?tab=roiforecast'}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          View Full Forecast
        </Button>
      </CardContent>
    </Card>
  )
} 