"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Target, TrendingUp, Clock, ArrowRight } from "lucide-react"

interface StrategyMetrics {
    totalStrategies: number
    activeStrategies: number
    completedStrategies: number
    averageConfidence: number
    averageSuccessRate: number
    totalPredictedRevenue: number
    totalActualRevenue: number
    topPerformingActions: string[]
}

export function AIStrategyComposerCard() {
    const [metrics, setMetrics] = useState<StrategyMetrics | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const loadMetrics = async () => {
        try {
            const response = await fetch('/api/ai-strategy-composer/metrics')
            if (response.ok) {
                const data = await response.json()
                setMetrics(data)
            }
        } catch (error) {
            console.error('Error loading strategy metrics:', error)
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-EG', {
            style: 'currency',
            currency: 'EGP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    const getSuccessRateColor = (rate: number) => {
        if (rate >= 80) return 'text-green-600'
        if (rate >= 60) return 'text-yellow-600'
        return 'text-red-600'
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 85) return 'text-green-600'
        if (confidence >= 70) return 'text-yellow-600'
        return 'text-red-600'
    }

    useEffect(() => {
        loadMetrics()
    }, [])

    if (!metrics) {
        return (
            <Card className="hover:scale-105 transition-all duration-200">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg text-white">
                        <Sparkles className="w-5 h-5 text-pink-400" />
                        <span>AI Strategy Composer</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-gray-300 py-4">
                        <Sparkles className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Loading strategy insights...</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="hover:scale-105 transition-all duration-200">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg text-white">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                    <span>AI Strategy Composer</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                            <Target className="w-4 h-4 text-pink-400" />
                            <span className="text-sm font-medium text-gray-300">Active</span>
                        </div>
                        <p className="text-lg font-bold text-pink-400">{metrics.activeStrategies}</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 mb-1">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-gray-300">Success Rate</span>
                        </div>
                        <p className={`text-lg font-bold ${getSuccessRateColor(metrics.averageSuccessRate)}`}>
                            {metrics.averageSuccessRate}%
                        </p>
                    </div>
                </div>

                {/* Confidence Score */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">AI Confidence</span>
                        <span className={`text-sm font-semibold ${getConfidenceColor(metrics.averageConfidence)}`}>
                            {metrics.averageConfidence}%
                        </span>
                    </div>
                    <Progress value={metrics.averageConfidence} className="h-2" />
                </div>

                {/* Revenue Prediction */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Predicted Revenue</span>
                        <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-lg font-bold text-green-400">
                        {formatCurrency(metrics.totalPredictedRevenue)}
                    </p>
                </div>

                {/* Top Performing Action */}
                {metrics.topPerformingActions.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-300">Top Action</span>
                        <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 backdrop-blur-sm p-2 rounded-lg border border-pink-500/20">
                            <p className="text-sm text-gray-200 font-medium">
                                {metrics.topPerformingActions[0]}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                <Button
                    variant="premium"
                    className="w-full"
                    onClick={() => {
                        // Navigate to strategy composer
                        window.location.href = '/?tab=strategycomposer'
                    }}
                >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Strategy
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    )
} 