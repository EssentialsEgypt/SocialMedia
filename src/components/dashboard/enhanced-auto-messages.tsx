"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import ErrorBoundary from "@/components/ui/error-boundary"
import { Calendar, Clock, BarChart3, MessageSquare, Sparkles, Settings, History, Copy, Eye } from "lucide-react"

interface AutoMessage {
  id: number
  trigger: string
  message: string
  active: boolean
  slackEnabled: boolean
  whatsappEnabled: boolean
  emailEnabled: boolean
  schedule?: {
    enabled: boolean
    time: string
    timezone: string
    days: string[]
  }
  analytics?: {
    sentCount: number
    openRate: number
    clickRate: number
    lastSent: string
  }
  template?: string
  variables?: string[]
}

// Message templates for different scenarios
const messageTemplates = [
  {
    name: "High CPR Alert",
    template: "🚨 High CPR Alert: Campaign {campaign_name} has CPR of {cpr_value} which is {percentage}% above target. Consider pausing or optimizing.",
    variables: ["campaign_name", "cpr_value", "percentage"]
  },
  {
    name: "Revenue Milestone",
    template: "🎉 Revenue Milestone: {platform} campaign reached {revenue_amount} in revenue! Great performance!",
    variables: ["platform", "revenue_amount"]
  },
  {
    name: "Low Performance",
    template: "⚠️ Performance Alert: {campaign_name} is underperforming with {metric} of {value}. Consider reviewing strategy.",
    variables: ["campaign_name", "metric", "value"]
  },
  {
    name: "Budget Alert",
    template: "💰 Budget Alert: {campaign_name} has spent {spent_amount} of {budget_amount} ({percentage}%).",
    variables: ["campaign_name", "spent_amount", "budget_amount", "percentage"]
  }
]

// AI suggested messages based on performance data
const aiSuggestions = [
  "Consider increasing budget for high-performing campaigns",
  "Review targeting for campaigns with low conversion rates",
  "Test new creative assets for underperforming ads",
  "Optimize bidding strategy for better ROAS"
]

export function EnhancedAutoMessages() {
  const [autoMessages, setAutoMessages] = useState<AutoMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedMessage, setEditedMessage] = useState<string>("")
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [showAnalytics, setShowAnalytics] = useState<number | null>(null)
  const [showSchedule, setShowSchedule] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState({
    trigger: "",
    message: "",
    template: ""
  })

  useEffect(() => {
    async function fetchAutoMessages() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/auto-messages')
        if (!res.ok) throw new Error('Failed to fetch auto messages')
        const data = await res.json()
        // Add mock analytics data for demonstration
        const messagesWithAnalytics = data.messages.map((msg: AutoMessage) => ({
          ...msg,
          analytics: {
            sentCount: Math.floor(Math.random() * 100) + 10,
            openRate: Math.random() * 0.3 + 0.1,
            clickRate: Math.random() * 0.1 + 0.02,
            lastSent: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        }))
        setAutoMessages(messagesWithAnalytics)
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error loading auto messages'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    fetchAutoMessages()
  }, [])

  function startEditing(id: number, currentMessage: string) {
    setEditingId(id)
    setEditedMessage(currentMessage)
  }

  function cancelEditing() {
    setEditingId(null)
    setEditedMessage("")
  }

  async function saveEditedMessage(id: number) {
    try {
      setUpdatingId(id)
      const res = await fetch(`/api/auto-messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: editedMessage }),
      })
      if (!res.ok) throw new Error('Failed to update message')
      setAutoMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, message: editedMessage } : msg))
      )
      toast.success('Message updated successfully')
      cancelEditing()
    } catch (err: any) {
      toast.error(err.message || 'Error updating message')
    } finally {
      setUpdatingId(null)
    }
  }

  async function toggleChannel(id: number, channel: 'slack' | 'whatsapp' | 'email', enabled: boolean) {
    try {
      setUpdatingId(id)
      const res = await fetch(`/api/auto-messages/${id}/channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel, enabled }),
      })
      if (!res.ok) throw new Error('Failed to update channel status')
      setAutoMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? {
              ...msg,
              slackEnabled: channel === 'slack' ? enabled : msg.slackEnabled,
              whatsappEnabled: channel === 'whatsapp' ? enabled : msg.whatsappEnabled,
              emailEnabled: channel === 'email' ? enabled : msg.emailEnabled,
            }
            : msg
        )
      )
      toast.success(`Updated ${channel} alert for "${autoMessages.find(m => m.id === id)?.trigger}"`)
    } catch (err: any) {
      toast.error(err.message || 'Error updating channel')
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleTestAlert(id: number, channel: 'slack' | 'whatsapp' | 'email') {
    try {
      const msg = autoMessages.find(m => m.id === id)
      if (!msg) throw new Error('Message not found')
      const res = await fetch(`/api/integrations/${channel}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: channel === 'slack' ? '#ad-performance' : undefined,
          toNumber: channel === 'whatsapp' ? '+1234567890' : undefined,
          toEmails: channel === 'email' ? ['cmo@example.com'] : undefined,
          text: msg.message,
          subject: channel === 'email' ? `Test Alert: ${msg.trigger}` : undefined,
          htmlContent: channel === 'email' ? `<p>${msg.message}</p>` : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to send test alert')
      toast.success(`Test alert sent via ${channel} for "${msg.trigger}"`)
    } catch (err: any) {
      toast.error(err.message || 'Error sending test alert')
    }
  }

  function applyTemplate(template: string) {
    setEditedMessage(template)
    setShowTemplates(false)
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    toast.success('Message copied to clipboard')
  }

  function previewMessage(message: string) {
    // Replace variables with sample values for preview
    const preview = message
      .replace(/{campaign_name}/g, 'Sample Campaign')
      .replace(/{cpr_value}/g, '25 EGP')
      .replace(/{percentage}/g, '15%')
      .replace(/{platform}/g, 'Facebook')
      .replace(/{revenue_amount}/g, '$5,000')
      .replace(/{metric}/g, 'CTR')
      .replace(/{value}/g, '1.2%')
      .replace(/{spent_amount}/g, '$2,500')
      .replace(/{budget_amount}/g, '$3,000')
    return preview
  }

  if (loading) return <p className="p-4 text-center">Loading auto messages...</p>
  if (error) return <p className="p-4 text-center text-red-600">Error: {error}</p>

  return (
    <ErrorBoundary fallback={<p className="p-4 text-center text-red-600">Something went wrong.</p>}>
      <div className="space-y-6">
        {/* Header with Add New Message */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Auto Messages
                </CardTitle>
                <CardDescription>Manage automated messages and triggers</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add New Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Auto Message</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="manual" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="manual">Manual</TabsTrigger>
                      <TabsTrigger value="template">Template</TabsTrigger>
                      <TabsTrigger value="ai">AI Suggested</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual" className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Trigger</label>
                        <Input
                          placeholder="e.g., High CPR Alert"
                          value={newMessage.trigger}
                          onChange={(e) => setNewMessage({ ...newMessage, trigger: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Message</label>
                        <Textarea
                          placeholder="Enter your message..."
                          value={newMessage.message}
                          onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="template" className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Select Template</label>
                        <Select onValueChange={(value) => {
                          const template = messageTemplates.find(t => t.name === value)
                          if (template) {
                            setNewMessage({
                              ...newMessage,
                              trigger: value,
                              message: template.template
                            })
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a template" />
                          </SelectTrigger>
                          <SelectContent>
                            {messageTemplates.map((template) => (
                              <SelectItem key={template.name} value={template.name}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {newMessage.message && (
                        <div>
                          <label className="text-sm font-medium">Preview</label>
                          <div className="p-3 bg-gray-50 rounded border">
                            <p className="text-sm">{previewMessage(newMessage.message)}</p>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="ai" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">AI Suggestions</label>
                        {aiSuggestions.map((suggestion, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded border">
                            <p className="text-sm">{suggestion}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2"
                              onClick={() => setNewMessage({
                                ...newMessage,
                                trigger: `AI Suggestion ${index + 1}`,
                                message: suggestion
                              })}
                            >
                              Use This
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Message</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
        </Card>

        {/* Main Messages Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead>Analytics</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {autoMessages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell>
                      <div className="font-medium">{msg.trigger}</div>
                      {msg.template && (
                        <Badge variant="secondary" className="text-xs">Template</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {editingId === msg.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editedMessage}
                              onChange={(e) => setEditedMessage(e.target.value)}
                              disabled={updatingId === msg.id}
                              rows={3}
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowTemplates(true)}
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                Templates
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(editedMessage)}
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm line-clamp-2">{msg.message}</p>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(msg.message)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert(previewMessage(msg.message))}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={msg.active ? "secondary" : "outline"}>
                        {msg.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Switch
                          checked={msg.slackEnabled}
                          disabled={updatingId === msg.id}
                          onCheckedChange={(checked) => toggleChannel(msg.id, 'slack', checked)}
                          aria-label={`Toggle Slack alert for ${msg.trigger}`}
                        />
                        <Switch
                          checked={msg.whatsappEnabled}
                          disabled={updatingId === msg.id}
                          onCheckedChange={(checked) => toggleChannel(msg.id, 'whatsapp', checked)}
                          aria-label={`Toggle WhatsApp alert for ${msg.trigger}`}
                        />
                        <Switch
                          checked={msg.emailEnabled}
                          disabled={updatingId === msg.id}
                          onCheckedChange={(checked) => toggleChannel(msg.id, 'email', checked)}
                          aria-label={`Toggle Email alert for ${msg.trigger}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {msg.analytics && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowAnalytics(msg.id)}
                            >
                              <BarChart3 className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Analytics for {msg.trigger}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-blue-50 rounded">
                                  <div className="text-2xl font-bold">{msg.analytics.sentCount}</div>
                                  <div className="text-sm text-gray-600">Messages Sent</div>
                                </div>
                                <div className="text-center p-3 bg-green-50 rounded">
                                  <div className="text-2xl font-bold">{(msg.analytics.openRate * 100).toFixed(1)}%</div>
                                  <div className="text-sm text-gray-600">Open Rate</div>
                                </div>
                                <div className="text-center p-3 bg-purple-50 rounded">
                                  <div className="text-2xl font-bold">{(msg.analytics.clickRate * 100).toFixed(1)}%</div>
                                  <div className="text-sm text-gray-600">Click Rate</div>
                                </div>
                                <div className="text-center p-3 bg-orange-50 rounded">
                                  <div className="text-sm text-gray-600">Last Sent</div>
                                  <div className="text-sm font-medium">
                                    {new Date(msg.analytics.lastSent).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowSchedule(msg.id)}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {editingId === msg.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={updatingId === msg.id}
                            onClick={() => saveEditedMessage(msg.id)}
                          >
                            Save
                          </Button>
                          <Button size="sm" variant="ghost" onClick={cancelEditing}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          <Button size="sm" variant="outline" onClick={() => startEditing(msg.id, msg.message)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleTestAlert(msg.id, 'slack')}>
                            Test Slack
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleTestAlert(msg.id, 'whatsapp')}>
                            Test WhatsApp
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleTestAlert(msg.id, 'email')}>
                            Test Email
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Templates Dialog */}
        {showTemplates && (
          <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Message Templates</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {messageTemplates.map((template) => (
                  <div key={template.name} className="p-3 border rounded">
                    <h4 className="font-medium mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{template.template}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => applyTemplate(template.template)}
                      >
                        Use Template
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(template.template)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ErrorBoundary>
  )
}
