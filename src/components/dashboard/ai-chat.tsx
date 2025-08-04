"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Send,
    Mic,
    MicOff,
    Brain,
    Target,
    TrendingUp,
    DollarSign,
    Users,
    Settings,
    MessageSquare,
    Bot,
    User,
    Sparkles,
    Zap,
    History,
    Play,
    Pause,
    RotateCcw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
    id: string
    type: 'user' | 'ai' | 'agent' | 'system'
    content: string
    agentName?: string
    timestamp: Date
    metadata?: any
    functionCalls?: any[]
    toolResults?: any[]
}

interface Agent {
    name: string
    displayName: string
    description: string
    icon: string
    capabilities: string[]
}

interface Scenario {
    id: string
    name: string
    description: string
    agents: string[]
}

const defaultAgents: Agent[] = [
    {
        name: 'ad_expert',
        displayName: 'Ad Expert Agent',
        description: 'Analyzes Meta/Google Ads performance, ROAS, CTR, and fatigue patterns',
        icon: '🧠',
        capabilities: ['meta_ads', 'google_ads', 'performance_analysis', 'fatigue_detection']
    },
    {
        name: 'budget_planner',
        displayName: 'Budget Planner Agent',
        description: 'Optimizes budget allocation and creates scaling plans',
        icon: '💸',
        capabilities: ['budget_optimization', 'scaling_plans', 'roi_analysis', 'cost_efficiency']
    },
    {
        name: 'creative_strategist',
        displayName: 'Creative Strategist Agent',
        description: 'Optimizes hooks, visuals, and detects creative fatigue',
        icon: '🎨',
        capabilities: ['creative_optimization', 'hook_analysis', 'visual_strategy', 'fatigue_detection']
    },
    {
        name: 'data_analyst',
        displayName: 'Data Analyst Agent',
        description: 'Finds patterns across time segments and campaigns',
        icon: '📊',
        capabilities: ['pattern_analysis', 'trend_detection', 'data_visualization', 'insight_generation']
    },
    {
        name: 'launch_strategist',
        displayName: 'Launch Strategist Agent',
        description: 'Plans drop calendars and offer strategies',
        icon: '📆',
        capabilities: ['launch_planning', 'offer_strategy', 'timing_optimization', 'campaign_scheduling']
    },
    {
        name: 'funnel_fixer',
        displayName: 'Funnel Fixer Agent',
        description: 'Analyzes and optimizes conversion funnels',
        icon: '🗂️',
        capabilities: ['funnel_analysis', 'conversion_optimization', 'drop_off_tracking', 'checkout_optimization']
    }
]

const defaultScenarios: Scenario[] = [
    {
        id: 'roas_optimization',
        name: 'ROAS Optimization',
        description: 'Fix low ROAS campaign and improve performance',
        agents: ['ad_expert', 'budget_planner']
    },
    {
        id: 'creative_fatigue',
        name: 'Creative Fatigue',
        description: 'Address creative fatigue and refresh strategy',
        agents: ['creative_strategist', 'data_analyst']
    },
    {
        id: 'launch_planning',
        name: 'Launch Planning',
        description: 'Plan next product drop with optimal timing',
        agents: ['launch_strategist', 'data_analyst']
    },
    {
        id: 'funnel_optimization',
        name: 'Funnel Optimization',
        description: 'Optimize conversion funnel and reduce drop-offs',
        agents: ['funnel_fixer', 'ad_expert']
    }
]

export function AIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'ai',
            content: "Hello! I'm your AI assistant for ad performance. I can help you analyze campaigns, optimize ROAS, plan launches, and much more. What would you like to work on today?",
            timestamp: new Date(),
            agentName: 'AI Assistant'
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [selectedAgents, setSelectedAgents] = useState<string[]>([])
    const [selectedScenario, setSelectedScenario] = useState<string>("")
    const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [preferredLanguage, setPreferredLanguage] = useState('en')
    const [isCollabMode, setIsCollabMode] = useState(false)
    const [collabSession, setCollabSession] = useState<any>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { toast } = useToast()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            // Simulate AI response with memory recall
            const response = await simulateAIResponse(input, selectedAgents, selectedScenario)

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                content: response.content,
                agentName: response.agentName,
                timestamp: new Date(),
                metadata: response.metadata,
                functionCalls: response.functionCalls,
                toolResults: response.toolResults
            }

            setMessages(prev => [...prev, aiMessage])
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to get AI response. Please try again.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const simulateAIResponse = async (userInput: string, agents: string[], scenario: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Memory recall simulation
        const memoryRecall = "Based on your previous campaigns, I remember your Fear of God drop had 9 creatives and achieved 4.2 ROAS. "

        // Real-time data simulation
        const realTimeData = "Current ROAS: 3.8, CTR: 2.1%, Spend: $2,450. "

        // Function calling simulation
        const functionCalls = [
            {
                name: "get_campaign_performance",
                arguments: { campaign_id: "camp_123", metrics: ["roas", "ctr", "spend"] }
            }
        ]

        const toolResults = [
            {
                tool: "meta_ads_api",
                result: { roas: 3.8, ctr: 2.1, spend: 2450, impressions: 12500 }
            }
        ]

        let response = ""
        let agentName = "AI Assistant"

        if (isCollabMode && agents.length === 2) {
            // Multi-agent collaboration mode
            const agent1 = defaultAgents.find(a => a.name === agents[0])
            const agent2 = defaultAgents.find(a => a.name === agents[1])

            response = `${memoryRecall}${realTimeData}${agent1?.displayName} and ${agent2?.displayName} are collaborating on this scenario. ${agent1?.displayName} suggests optimizing the targeting, while ${agent2?.displayName} recommends refreshing the creative. Together, they recommend a 20% budget increase with new creative rotation.`
            agentName = `${agent1?.displayName} + ${agent2?.displayName}`
        } else {
            // Single AI chat mode
            if (userInput.toLowerCase().includes('roas')) {
                response = `${memoryRecall}${realTimeData}Your ROAS is currently at 3.8, which is good but could be optimized. I recommend testing new creatives and adjusting the budget allocation.`
            } else if (userInput.toLowerCase().includes('creative')) {
                response = `${memoryRecall}I detect some creative fatigue. Your current creatives have been running for 7 days. I suggest refreshing with 3 new variations and testing different hooks.`
            } else if (userInput.toLowerCase().includes('budget')) {
                response = `${memoryRecall}${realTimeData}Your current spend is $2,450. I recommend reallocating 30% to your top-performing ad sets and testing new audiences.`
            } else {
                response = `${memoryRecall}${realTimeData}I can help you with campaign optimization, creative strategy, budget planning, and more. What specific aspect would you like to focus on?`
            }
        }

        return {
            content: response,
            agentName,
            metadata: { scenario, agents },
            functionCalls,
            toolResults
        }
    }

    const startCollabSession = async () => {
        if (selectedAgents.length !== 2) {
            toast({
                title: "Selection Required",
                description: "Please select exactly 2 agents for collaboration.",
                variant: "destructive"
            })
            return
        }

        if (!selectedScenario) {
            toast({
                title: "Scenario Required",
                description: "Please select a scenario for the agents to work on.",
                variant: "destructive"
            })
            return
        }

        setIsCollabMode(true)
        const scenario = defaultScenarios.find(s => s.id === selectedScenario)

        const session = {
            id: Date.now().toString(),
            scenario: scenario?.name,
            agents: selectedAgents,
            status: 'active'
        }

        setCollabSession(session)

        // Add system message
        const systemMessage: Message = {
            id: Date.now().toString(),
            type: 'system',
            content: `Starting collaboration session: ${scenario?.name} with ${selectedAgents.join(' + ')}`,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, systemMessage])

        toast({
            title: "Collaboration Started",
            description: `${scenario?.name} session initiated with ${selectedAgents.join(' + ')}`,
        })
    }

    const handleVoiceInput = () => {
        if (!isVoiceEnabled) {
            setIsVoiceEnabled(true)
            toast({
                title: "Voice Enabled",
                description: "Voice input is now enabled. Click the mic button to start recording.",
            })
        } else {
            setIsRecording(!isRecording)
            if (!isRecording) {
                // Simulate voice recording
                setTimeout(() => {
                    setInput("Show me today's ROAS and the top performing creative")
                    setIsRecording(false)
                }, 2000)
            }
        }
    }

    const clearChat = () => {
        setMessages([
            {
                id: '1',
                type: 'ai',
                content: "Hello! I'm your AI assistant for ad performance. I can help you analyze campaigns, optimize ROAS, plan launches, and much more. What would you like to work on today?",
                timestamp: new Date(),
                agentName: 'AI Assistant'
            }
        ])
        setIsCollabMode(false)
        setCollabSession(null)
        setSelectedAgents([])
        setSelectedScenario("")
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">AI Chat & Collaboration</h2>
                        <p className="text-sm text-muted-foreground">
                            {isCollabMode ? `Collaboration: ${collabSession?.scenario}` : "Smart AI Assistant with Memory & Real-time Data"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={clearChat}
                    >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Clear Chat
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="chat">AI Chat</TabsTrigger>
                    <TabsTrigger value="collab">Collaboration Room</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-full p-4">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                            }`}
                                    >
                                        {message.type !== 'user' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>
                                                    {message.agentName?.includes('+') ? '🤝' : '🤖'}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div className={`max-w-[80%] space-y-2 ${message.type === 'user' ? 'order-1' : 'order-2'
                                            }`}>
                                            <div className={`rounded-lg p-3 ${message.type === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : message.type === 'system'
                                                    ? 'bg-muted text-muted-foreground'
                                                    : 'bg-card border'
                                                }`}>
                                                <p className="text-sm">{message.content}</p>
                                            </div>

                                            {message.agentName && message.type !== 'user' && (
                                                <p className="text-xs text-muted-foreground">
                                                    {message.agentName}
                                                </p>
                                            )}

                                            {message.toolResults && message.toolResults.length > 0 && (
                                                <Card className="mt-2">
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-sm">Real-time Data</CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-0">
                                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                                            {message.toolResults.map((result, index) => (
                                                                <div key={index} className="space-y-1">
                                                                    <p className="font-medium">{result.tool}</p>
                                                                    <p>ROAS: {result.result.roas}</p>
                                                                    <p>CTR: {result.result.ctr}%</p>
                                                                    <p>Spend: ${result.result.spend}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>

                                        {message.type === 'user' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>
                                                    <User className="h-4 w-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-3 justify-start">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>🤖</AvatarFallback>
                                        </Avatar>
                                        <div className="bg-card border rounded-lg p-3">
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                                <p className="text-sm text-muted-foreground">AI is thinking...</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="p-4 border-t">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={isVoiceEnabled}
                                    onCheckedChange={setIsVoiceEnabled}
                                />
                                <Label className="text-sm">Voice Input</Label>
                            </div>

                            <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                                <SelectTrigger className="w-24">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="ar">العربية</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2">
                            <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isVoiceEnabled ? "Type or speak your message..." : "Ask about your ad performance..."}
                                className="flex-1"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSendMessage()
                                    }
                                }}
                            />

                            <Button
                                onClick={handleVoiceInput}
                                variant={isRecording ? "destructive" : "outline"}
                                size="icon"
                                disabled={!isVoiceEnabled}
                            >
                                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                            </Button>

                            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="collab" className="flex-1 flex flex-col">
                    <div className="p-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5" />
                                    Multi-Agent Collaboration
                                </CardTitle>
                                <CardDescription>
                                    Select a scenario and 2 agents to collaborate on solving your ad performance challenges
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Select Scenario</Label>
                                    <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Choose a scenario..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {defaultScenarios.map((scenario) => (
                                                <SelectItem key={scenario.id} value={scenario.id}>
                                                    {scenario.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium">Select 2 Agents</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {defaultAgents.map((agent) => (
                                            <Button
                                                key={agent.name}
                                                variant={selectedAgents.includes(agent.name) ? "default" : "outline"}
                                                className="justify-start h-auto p-3"
                                                onClick={() => {
                                                    if (selectedAgents.includes(agent.name)) {
                                                        setSelectedAgents(selectedAgents.filter(a => a !== agent.name))
                                                    } else if (selectedAgents.length < 2) {
                                                        setSelectedAgents([...selectedAgents, agent.name])
                                                    }
                                                }}
                                                disabled={!selectedAgents.includes(agent.name) && selectedAgents.length >= 2}
                                            >
                                                <span className="mr-2">{agent.icon}</span>
                                                <div className="text-left">
                                                    <p className="font-medium text-sm">{agent.displayName}</p>
                                                    <p className="text-xs text-muted-foreground">{agent.description}</p>
                                                </div>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={startCollabSession}
                                    disabled={selectedAgents.length !== 2 || !selectedScenario}
                                    className="w-full"
                                >
                                    <Zap className="h-4 w-4 mr-2" />
                                    Start Collaboration
                                </Button>
                            </CardContent>
                        </Card>

                        {isCollabMode && collabSession && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5" />
                                        Active Collaboration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Scenario:</span>
                                            <Badge variant="secondary">{collabSession.scenario}</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Agents:</span>
                                            <div className="flex gap-1">
                                                {collabSession.agents.map((agent: string) => (
                                                    <Badge key={agent} variant="outline">
                                                        {defaultAgents.find(a => a.name === agent)?.displayName}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Status:</span>
                                            <Badge variant="default">Active</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 