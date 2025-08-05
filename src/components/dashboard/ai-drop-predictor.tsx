"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Calendar,
    Clock,
    TrendingUp,
    Target,
    AlertTriangle,
    CheckCircle,
    Star,
    BarChart3,
    Users,
    DollarSign,
    MessageSquare,
    Heart,
    Eye,
    Zap,
    Brain,
    History,
    Plus,
    Play,
    Pause,
    RefreshCw
} from "lucide-react"

interface DropPrediction {
    id: string
    suggestedWindow: {
        start: string
        end: string
        date: string
    }
    confidence: number
    reasoning: string[]
    alternativeSlots: Array<{
        date: string
        start: string
        end: string
        confidence: number
    }>
    audienceOverlap: number
    competitorActivity: string[]
    marketConditions: string
}

interface DropScore {
    id: string
    dropName: string
    date: string
    overallScore: number
    engagementScore: number
    conversionScore: number
    vipScore: number
    instagramScore: number
    aiSuggestions: string[]
    metrics: {
        totalSales: number
        conversionRate: number
        avgOrderValue: number
        vipParticipation: number
        storyViews: number
        storyReplies: number
        postSaves: number
        postComments: number
        linkClicks: number
    }
    trends: {
        improvement: boolean
        keyInsights: string[]
    }
}

export function AIDropPredictor() {
    const [predictions, setPredictions] = useState<DropPrediction[]>([])
    const [scores, setScores] = useState<DropScore[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<'predictor' | 'scorer'>('predictor')

    useEffect(() => {
        loadDropData()
    }, [])

    const loadDropData = async () => {
        setIsLoading(true)
        try {
            // Load predictions
            const predictionsResponse = await fetch('/api/ai-drop-predictor/predictions')
            const predictionsData = await predictionsResponse.json()
            setPredictions(predictionsData.data || [])

            // Load scores
            const scoresResponse = await fetch('/api/ai-drop-predictor/scores')
            const scoresData = await scoresResponse.json()
            setScores(scoresData.data || [])
        } catch (error) {
            console.error('Error loading drop data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const generateNewPrediction = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/ai-drop-predictor/generate', {
                method: 'POST'
            })
            const data = await response.json()
            if (data.success) {
                await loadDropData()
            }
        } catch (error) {
            console.error('Error generating prediction:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const scoreDrop = async (dropId: string) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/ai-drop-predictor/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dropId })
            })
            const data = await response.json()
            if (data.success) {
                await loadDropData()
            }
        } catch (error) {
            console.error('Error scoring drop:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 80) return 'text-green-400'
        if (confidence >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400'
        if (score >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center">
                        <Brain className="w-8 h-8 mr-3 text-purple-400" />
                        AI Drop Predictor & Scorer
                    </h2>
                    <p className="text-gray-400 mt-2">
                        Strategic AI system for drop timing and performance analysis
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button
                        onClick={generateNewPrediction}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Prediction
                    </Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-slate-800 rounded-lg p-1">
                <button
                    onClick={() => setActiveTab('predictor')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'predictor'
                            ? 'bg-purple-500 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <Target className="w-4 h-4 mr-2 inline" />
                    Drop Predictor
                </button>
                <button
                    onClick={() => setActiveTab('scorer')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === 'scorer'
                            ? 'bg-purple-500 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    <BarChart3 className="w-4 h-4 mr-2 inline" />
                    Drop Scorer
                </button>
            </div>

            {activeTab === 'predictor' && (
                <div className="space-y-6">
                    {/* Current Prediction */}
                    {predictions.length > 0 && (
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                                    Next Suggested Drop Window
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {predictions.map((prediction) => (
                                    <div key={prediction.id} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-slate-700/50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-400">Best Window</span>
                                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                                        {prediction.confidence}% Confidence
                                                    </Badge>
                                                </div>
                                                <div className="text-2xl font-bold text-white">
                                                    {prediction.suggestedWindow.date}
                                                </div>
                                                <div className="text-gray-300">
                                                    {prediction.suggestedWindow.start} - {prediction.suggestedWindow.end}
                                                </div>
                                            </div>

                                            <div className="bg-slate-700/50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-400">Audience Overlap</span>
                                                    <Users className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <div className="text-2xl font-bold text-white">
                                                    {prediction.audienceOverlap}%
                                                </div>
                                                <div className="text-gray-300">Active audience</div>
                                            </div>

                                            <div className="bg-slate-700/50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-400">Market Conditions</span>
                                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                                </div>
                                                <div className="text-sm text-gray-300">
                                                    {prediction.marketConditions}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-700/30 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">AI Reasoning</h4>
                                            <div className="space-y-2">
                                                {prediction.reasoning.map((reason, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-300 text-sm">{reason}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {prediction.competitorActivity.length > 0 && (
                                            <div className="bg-slate-700/30 rounded-lg p-4">
                                                <h4 className="text-white font-semibold mb-2 flex items-center">
                                                    <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                                                    Competitor Activity
                                                </h4>
                                                <div className="space-y-1">
                                                    {prediction.competitorActivity.map((activity, index) => (
                                                        <div key={index} className="text-gray-300 text-sm">
                                                            • {activity}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {prediction.alternativeSlots.length > 0 && (
                                            <div className="bg-slate-700/30 rounded-lg p-4">
                                                <h4 className="text-white font-semibold mb-2">Alternative Slots</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {prediction.alternativeSlots.map((slot, index) => (
                                                        <div key={index} className="bg-slate-600/50 rounded p-3">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-white font-medium">
                                                                    {slot.date}
                                                                </span>
                                                                <span className={`text-sm ${getConfidenceColor(slot.confidence)}`}>
                                                                    {slot.confidence}%
                                                                </span>
                                                            </div>
                                                            <div className="text-gray-300 text-sm">
                                                                {slot.start} - {slot.end}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Prediction History */}
                    <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center">
                                <History className="w-5 h-5 mr-2 text-purple-400" />
                                Prediction History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {predictions.length === 0 ? (
                                <div className="text-center py-8">
                                    <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-400">No predictions generated yet</p>
                                    <Button
                                        onClick={generateNewPrediction}
                                        className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                    >
                                        Generate First Prediction
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {predictions.slice(1).map((prediction) => (
                                        <div key={prediction.id} className="bg-slate-700/30 rounded-lg p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-white font-medium">
                                                        {prediction.suggestedWindow.date}
                                                    </div>
                                                    <div className="text-gray-400 text-sm">
                                                        {prediction.suggestedWindow.start} - {prediction.suggestedWindow.end}
                                                    </div>
                                                </div>
                                                <Badge className={`${getConfidenceColor(prediction.confidence)} bg-opacity-20`}>
                                                    {prediction.confidence}%
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeTab === 'scorer' && (
                <div className="space-y-6">
                    {/* Recent Scores */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {scores.map((score) => (
                            <Card key={score.id} className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white">{score.dropName}</CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={`${getScoreColor(score.overallScore)} bg-opacity-20`}>
                                                {score.overallScore}%
                                            </Badge>
                                            <Button
                                                size="sm"
                                                onClick={() => scoreDrop(score.id)}
                                                disabled={isLoading}
                                                variant="outline"
                                                className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm">{score.date}</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Score Breakdown */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">Engagement</span>
                                                <span className={`text-sm font-medium ${getScoreColor(score.engagementScore)}`}>
                                                    {score.engagementScore}%
                                                </span>
                                            </div>
                                            <Progress value={score.engagementScore} className="h-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">Conversion</span>
                                                <span className={`text-sm font-medium ${getScoreColor(score.conversionScore)}`}>
                                                    {score.conversionScore}%
                                                </span>
                                            </div>
                                            <Progress value={score.conversionScore} className="h-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">VIP</span>
                                                <span className={`text-sm font-medium ${getScoreColor(score.vipScore)}`}>
                                                    {score.vipScore}%
                                                </span>
                                            </div>
                                            <Progress value={score.vipScore} className="h-2" />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">Instagram</span>
                                                <span className={`text-sm font-medium ${getScoreColor(score.instagramScore)}`}>
                                                    {score.instagramScore}%
                                                </span>
                                            </div>
                                            <Progress value={score.instagramScore} className="h-2" />
                                        </div>
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-slate-700/30 rounded p-3">
                                            <div className="flex items-center mb-1">
                                                <DollarSign className="w-4 h-4 text-green-400 mr-2" />
                                                <span className="text-gray-400">Sales</span>
                                            </div>
                                            <div className="text-white font-semibold">
                                                ${score.metrics.totalSales.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded p-3">
                                            <div className="flex items-center mb-1">
                                                <Target className="w-4 h-4 text-blue-400 mr-2" />
                                                <span className="text-gray-400">Conv. Rate</span>
                                            </div>
                                            <div className="text-white font-semibold">
                                                {score.metrics.conversionRate}%
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded p-3">
                                            <div className="flex items-center mb-1">
                                                <Eye className="w-4 h-4 text-purple-400 mr-2" />
                                                <span className="text-gray-400">Story Views</span>
                                            </div>
                                            <div className="text-white font-semibold">
                                                {score.metrics.storyViews.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded p-3">
                                            <div className="flex items-center mb-1">
                                                <MessageSquare className="w-4 h-4 text-pink-400 mr-2" />
                                                <span className="text-gray-400">Replies</span>
                                            </div>
                                            <div className="text-white font-semibold">
                                                {score.metrics.storyReplies}
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Suggestions */}
                                    {score.aiSuggestions.length > 0 && (
                                        <div className="bg-slate-700/30 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2 flex items-center">
                                                <Brain className="w-4 h-4 text-purple-400 mr-2" />
                                                AI Suggestions
                                            </h4>
                                            <div className="space-y-2">
                                                {score.aiSuggestions.map((suggestion, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <Star className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-300 text-sm">{suggestion}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Trends */}
                                    {score.trends.keyInsights.length > 0 && (
                                        <div className="bg-slate-700/30 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2 flex items-center">
                                                <TrendingUp className={`w-4 h-4 mr-2 ${score.trends.improvement ? 'text-green-400' : 'text-red-400'}`} />
                                                Key Insights
                                            </h4>
                                            <div className="space-y-1">
                                                {score.trends.keyInsights.map((insight, index) => (
                                                    <div key={index} className="text-gray-300 text-sm">
                                                        • {insight}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {scores.length === 0 && (
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardContent className="text-center py-12">
                                <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400 mb-4">No drop scores available yet</p>
                                <p className="text-gray-500 text-sm">
                                    Complete drops will be automatically scored and analyzed
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
} 