"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Brain } from "lucide-react"

interface TeamMember {
    id: string
    name: string
    role: string
    status: 'active' | 'away' | 'offline' | 'focus'
    avatar: string
    email: string
    phone: string
    joinDate: Date
    aiMotivationType: string
    strengths: string[]
    currentStressLevel: number
    lastTasks: string[]
    openTasks: number
    completedTasks: number
    campaignsInvolved: number
    meetingAttendance: number
    responseSpeed: number
    deadlineCompliance: number
    salary: number
    toolCost: number
    revenueImpact: number
    roi: number
    mood: 'positive' | 'neutral' | 'negative'
    burnoutRisk: number
    focusMode: boolean
    lastActive: Date
    timeSpent: number
    skills: string[]
    desiredSkills: string[]
    mentorId?: string
    menteeIds: string[]
    permissions: string[]
    motivationDrivers: string[]
}

interface FeedbackGeneratorProps {
    teamMembers: TeamMember[]
}

export function FeedbackGenerator({ teamMembers }: FeedbackGeneratorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Feedback Generator</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">AI Feedback</h3>
                    <p className="text-gray-500">Generate weekly feedback for each team member</p>
                    <div className="mt-4">
                        <Badge variant="outline">Coming Soon</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 