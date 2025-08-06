"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function AIMicroSprintMode({ teamMembers }: { teamMembers: any[] }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Micro Sprint Mode</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Focused 2-hour task sessions with AI motivation
                        </p>
                    </div>
                    <Badge variant="secondary">Coming Soon</Badge>
                </div>
            </CardContent>
        </Card>
    )
} 