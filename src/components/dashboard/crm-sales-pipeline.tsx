"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
    Users,
    TrendingUp,
    DollarSign,
    Calendar,
    Phone,
    Mail,
    MessageSquare,
    Star,
    Clock,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Plus,
    Search,
    Filter,
    Download,
    Share2,
    Eye,
    Edit,
    Trash2,
    PhoneCall,
    Mail as MailIcon,
    MessageCircle,
    Calendar as CalendarIcon,
    MapPin,
    Building,
    UserCheck,
    UserX,
    UserPlus,
    Target,
    BarChart3,
    PieChart,
    Activity,
    Zap,
    Brain,
    Heart,
    Crown,
    Gift,
    Tag,
    DollarSign as MoneyIcon,
    ShoppingCart,
    CreditCard,
    Package,
    Truck,
    CheckSquare,
    Clock as TimeIcon,
    AlertCircle,
    Info,
    ChevronRight,
    ChevronLeft,
    MoreHorizontal,
    Settings,
    Bell,
    Filter as FilterIcon,
    Download as DownloadIcon,
    Upload,
    RefreshCw,
    Play,
    Pause,
    RotateCcw,
    FastForward,
    Rewind,
    SkipForward,
    SkipBack,
    Volume2,
    VolumeX,
    Mic,
    MicOff,
    Video,
    VideoOff,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    Wifi,
    WifiOff,
    Signal,
    Battery,
    BatteryCharging,
    Power,
    PowerOff,
    Lock,
    Unlock,
    Shield,
    ShieldCheck,
    ShieldAlert,
    ShieldX,
    Key,
    KeyOff,
    Database,
    HardDrive,
    Cloud,
    CloudOff,
    CloudRain,
    CloudLightning,
    CloudSnow,
    CloudFog,
    Sun,
    Moon,
    Cloudy,
    Wind,
    Thermometer,
    Droplets,
    Umbrella,
    Snowflake,
    Zap as Lightning,
    Flame,
    Sparkles,
    Star as StarIcon,
    Heart as HeartIcon,
    ThumbsUp,
    ThumbsDown,
    Smile,
    Frown,
    Meh,
    Laugh,
    Angry,
    Surprise,
    Wink,
    Eye as EyeIcon,
    EyeOff,
    Camera,
    CameraOff,
    Image,
    ImageOff,
    File,
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    FileArchive,
    FileCode,
    FileSpreadsheet,
    FilePresentation,
    FilePdf,
    FileWord,
    FileExcel,
    FilePowerpoint,
    Folder,
    FolderOpen,
    FolderPlus,
    FolderMinus,
    FolderX,
    FolderCheck,
    FolderSearch,
    FolderHeart,
    FolderStar,
    FolderGit2,
    FolderGit,
    FolderKanban,
    FolderInput,
    FolderOutput,
    FolderSymlink,
    FolderTree,
    FolderUp,
    FolderDown,
    FolderLeft,
    FolderRight,
    FolderRoot,
    FolderSearch2,
    FolderClock,
    FolderKey,
    FolderLock,
    FolderUnlock,
    FolderCog,
    FolderSettings,
    FolderPlus2,
    FolderMinus2,
    FolderX2,
    FolderCheck2,
    FolderSearch3,
    FolderHeart2,
    FolderStar2,
    FolderGit3,
    FolderKanban2,
    FolderInput2,
    FolderOutput2,
    FolderSymlink2,
    FolderTree2,
    FolderUp2,
    FolderDown2,
    FolderLeft2,
    FolderRight2,
    FolderRoot2,
    FolderSearch4,
    FolderClock2,
    FolderKey2,
    FolderLock2,
    FolderUnlock2,
    FolderCog2,
    FolderSettings2,
    FolderPlus3,
    FolderMinus3,
    FolderX3,
    FolderCheck3,
    FolderSearch5,
    FolderHeart3,
    FolderStar3,
    FolderGit4,
    FolderKanban3,
    FolderInput3,
    FolderOutput3,
    FolderSymlink3,
    FolderTree3,
    FolderUp3,
    FolderDown3,
    FolderLeft3,
    FolderRight3,
    FolderRoot3,
    FolderSearch6,
    FolderClock3,
    FolderKey3,
    FolderLock3,
    FolderUnlock3,
    FolderCog3,
    FolderSettings3
} from "lucide-react"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// CRM AI Logic Start: Sales Pipeline Data
const salesPipelineData = {
    leads: [
        {
            id: "lead_001",
            name: "Ahmed Hassan",
            email: "ahmed.hassan@company.com",
            phone: "+201234567890",
            company: "Tech Solutions Egypt",
            position: "Marketing Director",
            source: "Website",
            status: "Qualified",
            value: 50000,
            probability: 75,
            stage: "Proposal",
            lastContact: "2024-01-20",
            nextFollowUp: "2024-01-25",
            notes: "Interested in full marketing automation package",
            tags: ["High Value", "Tech", "Ready to Buy"],
            activities: [
                { type: "call", date: "2024-01-20", notes: "Discussed requirements" },
                { type: "email", date: "2024-01-19", notes: "Sent proposal" },
                { type: "meeting", date: "2024-01-18", notes: "Initial discovery call" }
            ],
            aiInsights: {
                readinessScore: 85,
                riskFactors: ["Budget constraints", "Competition"],
                recommendedActions: ["Send case study", "Schedule demo"],
                nextBestAction: "Follow up with ROI calculation"
            }
        },
        {
            id: "lead_002",
            name: "Sara Mahmoud",
            email: "sara.mahmoud@retail.com",
            phone: "+201234567891",
            company: "Fashion Retail Egypt",
            position: "CEO",
            source: "Referral",
            status: "New",
            value: 25000,
            probability: 40,
            stage: "Discovery",
            lastContact: "2024-01-22",
            nextFollowUp: "2024-01-24",
            notes: "Looking for social media management solution",
            tags: ["Retail", "Startup", "Budget Conscious"],
            activities: [
                { type: "email", date: "2024-01-22", notes: "Initial outreach" },
                { type: "call", date: "2024-01-21", notes: "Qualification call" }
            ],
            aiInsights: {
                readinessScore: 60,
                riskFactors: ["Limited budget", "Decision making process"],
                recommendedActions: ["Send pricing guide", "Book discovery call"],
                nextBestAction: "Send value proposition email"
            }
        },
        {
            id: "lead_003",
            name: "Mohamed Ali",
            email: "mohamed.ali@restaurant.com",
            phone: "+201234567892",
            company: "Cairo Cuisine",
            position: "Owner",
            source: "Social Media",
            status: "Contacted",
            value: 15000,
            probability: 90,
            stage: "Negotiation",
            lastContact: "2024-01-23",
            nextFollowUp: "2024-01-26",
            notes: "Ready to sign, just finalizing terms",
            tags: ["Restaurant", "High Probability", "Quick Close"],
            activities: [
                { type: "meeting", date: "2024-01-23", notes: "Contract discussion" },
                { type: "email", date: "2024-01-22", notes: "Proposal sent" },
                { type: "call", date: "2024-01-21", notes: "Requirements gathering" }
            ],
            aiInsights: {
                readinessScore: 95,
                riskFactors: ["Price sensitivity"],
                recommendedActions: ["Send contract", "Schedule signing"],
                nextBestAction: "Close the deal with final proposal"
            }
        }
    ],
    deals: [
        {
            id: "deal_001",
            name: "Tech Solutions Marketing Package",
            lead: "Ahmed Hassan",
            value: 50000,
            stage: "Proposal",
            probability: 75,
            closeDate: "2024-02-15",
            owner: "Sales Team",
            products: ["Social Media Management", "Content Creation", "Analytics"],
            notes: "Comprehensive marketing solution for tech company",
            activities: [
                { type: "proposal", date: "2024-01-20", value: 50000 },
                { type: "meeting", date: "2024-01-18", notes: "Requirements discussion" }
            ]
        },
        {
            id: "deal_002",
            name: "Fashion Retail Social Media",
            lead: "Sara Mahmoud",
            value: 25000,
            stage: "Discovery",
            probability: 40,
            closeDate: "2024-03-01",
            owner: "Sales Team",
            products: ["Social Media Management", "Content Creation"],
            notes: "Basic social media management for retail startup",
            activities: [
                { type: "discovery", date: "2024-01-22", notes: "Initial meeting" }
            ]
        },
        {
            id: "deal_003",
            name: "Restaurant Marketing Automation",
            lead: "Mohamed Ali",
            value: 15000,
            stage: "Negotiation",
            probability: 90,
            closeDate: "2024-01-30",
            owner: "Sales Team",
            products: ["Marketing Automation", "Social Media"],
            notes: "Ready to close, finalizing contract terms",
            activities: [
                { type: "negotiation", date: "2024-01-23", notes: "Contract discussion" },
                { type: "proposal", date: "2024-01-22", value: 15000 }
            ]
        }
    ],
    pipeline: {
        totalValue: 90000,
        wonValue: 0,
        lostValue: 0,
        openValue: 90000,
        conversionRate: 0,
        averageDealSize: 30000,
        salesCycle: 45,
        stages: [
            { name: "Lead", count: 3, value: 90000, probability: 68 },
            { name: "Qualified", count: 1, value: 50000, probability: 75 },
            { name: "Proposal", count: 1, value: 50000, probability: 75 },
            { name: "Negotiation", count: 1, value: 15000, probability: 90 },
            { name: "Closed Won", count: 0, value: 0, probability: 100 },
            { name: "Closed Lost", count: 0, value: 0, probability: 0 }
        ]
    },
    activities: [
        {
            id: "act_001",
            type: "call",
            lead: "Ahmed Hassan",
            date: "2024-01-20",
            duration: 30,
            notes: "Discussed proposal details and timeline",
            outcome: "Positive",
            nextAction: "Send follow-up email with ROI calculation"
        },
        {
            id: "act_002",
            type: "meeting",
            lead: "Mohamed Ali",
            date: "2024-01-23",
            duration: 60,
            notes: "Contract negotiation and final terms discussion",
            outcome: "Very Positive",
            nextAction: "Prepare contract for signing"
        },
        {
            id: "act_003",
            type: "email",
            lead: "Sara Mahmoud",
            date: "2024-01-22",
            duration: 5,
            notes: "Sent initial proposal and pricing information",
            outcome: "Neutral",
            nextAction: "Follow up with discovery call"
        }
    ],
    aiInsights: {
        topPerformingSources: ["Website", "Referral", "Social Media"],
        averageTimeToClose: 45,
        conversionRates: {
            leadToQualified: 33,
            qualifiedToProposal: 100,
            proposalToWon: 0,
            overall: 0
        },
        recommendations: [
            "Focus on Ahmed Hassan deal - high probability to close",
            "Sara Mahmoud needs more nurturing - schedule discovery call",
            "Mohamed Ali ready to close - send contract immediately"
        ],
        riskAlerts: [
            "Sara Mahmoud deal at risk - no recent activity",
            "Ahmed Hassan deal needs follow-up within 48 hours"
        ]
    }
}

// CRM AI Logic Start: Customer Success Data
const customerSuccessData = {
    customers: [
        {
            id: "cust_001",
            name: "TechCorp Egypt",
            plan: "Enterprise",
            status: "Active",
            healthScore: 95,
            lastActivity: "2024-01-23",
            nextRenewal: "2024-04-15",
            value: 75000,
            usage: {
                features: ["Social Media Management", "Analytics", "Content Creation"],
                adoptionRate: 87,
                activeUsers: 12,
                totalUsers: 15
            },
            support: {
                tickets: 3,
                resolved: 2,
                open: 1,
                satisfaction: 4.8
            },
            aiInsights: {
                riskLevel: "Low",
                expansionOpportunity: "High",
                recommendedActions: ["Schedule QBR", "Upsell analytics package"],
                churnRisk: 5
            }
        },
        {
            id: "cust_002",
            name: "Fashion Forward",
            plan: "Professional",
            status: "Active",
            healthScore: 78,
            lastActivity: "2024-01-20",
            nextRenewal: "2024-03-20",
            value: 35000,
            usage: {
                features: ["Social Media Management", "Content Creation"],
                adoptionRate: 65,
                activeUsers: 5,
                totalUsers: 8
            },
            support: {
                tickets: 5,
                resolved: 4,
                open: 1,
                satisfaction: 4.2
            },
            aiInsights: {
                riskLevel: "Medium",
                expansionOpportunity: "Medium",
                recommendedActions: ["Increase engagement", "Training session"],
                churnRisk: 25
            }
        }
    ],
    metrics: {
        totalCustomers: 156,
        activeCustomers: 142,
        churnedCustomers: 14,
        netRetentionRate: 91,
        averageHealthScore: 82,
        totalRevenue: 2800000,
        monthlyRecurringRevenue: 185000
    }
}

export function CRMSalesPipeline() {
    const [activeTab, setActiveTab] = useState("pipeline")
    const [selectedLead, setSelectedLead] = useState(null)
    const [showNewLeadModal, setShowNewLeadModal] = useState(false)
    const [aiAlertsEnabled, setAiAlertsEnabled] = useState(true)
    const { toast } = useToast()

    // CRM AI Logic Start: AI Alerts Simulation
    useEffect(() => {
        if (aiAlertsEnabled) {
            const interval = setInterval(() => {
                const alerts = [
                    "Ahmed Hassan deal needs immediate follow-up",
                    "Sara Mahmoud lead showing engagement decline",
                    "Mohamed Ali deal ready to close - send contract"
                ]
                const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]
                toast({
                    title: "AI Sales Alert",
                    description: randomAlert,
                    variant: "default"
                })
            }, 30000) // Every 30 seconds

            return () => clearInterval(interval)
        }
    }, [aiAlertsEnabled, toast])

    const handleNewLead = () => {
        setShowNewLeadModal(true)
        toast({
            title: "New Lead",
            description: "Lead creation form opened",
            variant: "default"
        })
    }

    const handleFollowUp = (leadId: string) => {
        toast({
            title: "Follow-up Scheduled",
            description: "Follow-up task created for lead",
            variant: "default"
        })
    }

    const handleCloseDeal = (dealId: string) => {
        toast({
            title: "Deal Closed",
            description: "Deal marked as won successfully",
            variant: "default"
        })
    }

    const getStageColor = (stage: string) => {
        const colors = {
            "Lead": "bg-gray-100 text-gray-800",
            "Qualified": "bg-blue-100 text-blue-800",
            "Proposal": "bg-yellow-100 text-yellow-800",
            "Negotiation": "bg-orange-100 text-orange-800",
            "Closed Won": "bg-green-100 text-green-800",
            "Closed Lost": "bg-red-100 text-red-800"
        }
        return colors[stage] || "bg-gray-100 text-gray-800"
    }

    const getProbabilityColor = (probability: number) => {
        if (probability >= 80) return "text-green-600"
        if (probability >= 60) return "text-yellow-600"
        if (probability >= 40) return "text-orange-600"
        return "text-red-600"
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">CRM & Sales Pipeline</h1>
                    <p className="text-muted-foreground">Manage leads, deals, and customer success</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Switch checked={aiAlertsEnabled} onCheckedChange={setAiAlertsEnabled} />
                        <Label>AI Alerts</Label>
                    </div>
                    <Button onClick={handleNewLead}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Lead
                    </Button>
                </div>
            </div>

            {/* AI Insights Alert */}
            <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                    <strong>AI Insights:</strong> Focus on Ahmed Hassan deal (75% probability) and Mohamed Ali deal (90% probability) for highest conversion potential. Sara Mahmoud needs immediate follow-up to prevent drop-off.
                </AlertDescription>
            </Alert>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${salesPipelineData.pipeline.totalValue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{salesPipelineData.leads.length}</div>
                        <p className="text-xs text-muted-foreground">+2 new this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{salesPipelineData.pipeline.conversionRate}%</div>
                        <p className="text-xs text-muted-foreground">Target: 25%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${salesPipelineData.pipeline.averageDealSize.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+8% from last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
                    <TabsTrigger value="leads">Leads & Deals</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="customers">Customer Success</TabsTrigger>
                </TabsList>

                {/* Sales Pipeline Tab */}
                <TabsContent value="pipeline" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Pipeline Stages */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pipeline Stages</CardTitle>
                                <CardDescription>Deal progression and value distribution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {salesPipelineData.pipeline.stages.map((stage) => (
                                        <div key={stage.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className={getStageColor(stage.name)}>
                                                    {stage.name}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    {stage.count} deals
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">${stage.value.toLocaleString()}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {stage.probability}% probability
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pipeline Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pipeline Value Distribution</CardTitle>
                                <CardDescription>Visual representation of deal stages</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={salesPipelineData.pipeline.stages}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* AI Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                AI Sales Recommendations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {salesPipelineData.aiInsights.recommendations.map((rec, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                        <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                                        <span className="text-sm">{rec}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Leads & Deals Tab */}
                <TabsContent value="leads" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Leads List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Leads</CardTitle>
                                <CardDescription>Manage and track lead progression</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-96">
                                    <div className="space-y-4">
                                        {salesPipelineData.leads.map((lead) => (
                                            <div key={lead.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{lead.name}</div>
                                                            <div className="text-sm text-muted-foreground">{lead.company}</div>
                                                        </div>
                                                    </div>
                                                    <Badge className={getStageColor(lead.status)}>{lead.status}</Badge>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                    <div>
                                                        <span className="text-muted-foreground">Value:</span> ${lead.value.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Probability:</span>
                                                        <span className={getProbabilityColor(lead.probability)}> {lead.probability}%</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleFollowUp(lead.id)}>
                                                        <Phone className="h-3 w-3 mr-1" />
                                                        Follow Up
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Mail className="h-3 w-3 mr-1" />
                                                        Email
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <MessageSquare className="h-3 w-3 mr-1" />
                                                        Message
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>

                        {/* Deals List */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Deals</CardTitle>
                                <CardDescription>Track deal progression and value</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-96">
                                    <div className="space-y-4">
                                        {salesPipelineData.deals.map((deal) => (
                                            <div key={deal.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <div className="font-medium">{deal.name}</div>
                                                        <div className="text-sm text-muted-foreground">{deal.lead}</div>
                                                    </div>
                                                    <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                    <div>
                                                        <span className="text-muted-foreground">Value:</span> ${deal.value.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Probability:</span>
                                                        <span className={getProbabilityColor(deal.probability)}> {deal.probability}%</span>
                                                    </div>
                                                </div>
                                                <div className="text-sm text-muted-foreground mb-3">
                                                    Close Date: {deal.closeDate}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleCloseDeal(deal.id)}>
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Close Deal
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Edit className="h-3 w-3 mr-1" />
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Activities Tab */}
                <TabsContent value="activities" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activities</CardTitle>
                            <CardDescription>Track all sales activities and interactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {salesPipelineData.activities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                        <div className="flex-shrink-0">
                                            {activity.type === 'call' && <Phone className="h-5 w-5 text-blue-600" />}
                                            {activity.type === 'meeting' && <Calendar className="h-5 w-5 text-green-600" />}
                                            {activity.type === 'email' && <Mail className="h-5 w-5 text-orange-600" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="font-medium">{activity.lead}</div>
                                                <div className="text-sm text-muted-foreground">{activity.date}</div>
                                            </div>
                                            <div className="text-sm text-muted-foreground mb-2">
                                                {activity.duration} minutes • {activity.outcome} outcome
                                            </div>
                                            <div className="text-sm mb-2">{activity.notes}</div>
                                            <div className="text-sm text-blue-600">
                                                Next: {activity.nextAction}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Customer Success Tab */}
                <TabsContent value="customers" className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Customer Success Metrics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Success Metrics</CardTitle>
                                <CardDescription>Key performance indicators</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Total Customers</span>
                                        <span className="font-medium">{customerSuccessData.metrics.totalCustomers}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Active Customers</span>
                                        <span className="font-medium">{customerSuccessData.metrics.activeCustomers}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Net Retention Rate</span>
                                        <span className="font-medium">{customerSuccessData.metrics.netRetentionRate}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Avg Health Score</span>
                                        <span className="font-medium">{customerSuccessData.metrics.averageHealthScore}/100</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Monthly Revenue</span>
                                        <span className="font-medium">${customerSuccessData.metrics.monthlyRecurringRevenue.toLocaleString()}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer List */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Customer Health Overview</CardTitle>
                                <CardDescription>Monitor customer success and health scores</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-96">
                                    <div className="space-y-4">
                                        {customerSuccessData.customers.map((customer) => (
                                            <div key={customer.id} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{customer.name}</div>
                                                            <div className="text-sm text-muted-foreground">{customer.plan} Plan</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-medium">${customer.value.toLocaleString()}</div>
                                                        <div className="text-sm text-muted-foreground">Annual Value</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-3">
                                                    <div>
                                                        <div className="text-sm text-muted-foreground">Health Score</div>
                                                        <div className="flex items-center gap-2">
                                                            <Progress value={customer.healthScore} className="flex-1" />
                                                            <span className="text-sm font-medium">{customer.healthScore}/100</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-muted-foreground">Adoption Rate</div>
                                                        <div className="flex items-center gap-2">
                                                            <Progress value={customer.usage.adoptionRate} className="flex-1" />
                                                            <span className="text-sm font-medium">{customer.usage.adoptionRate}%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm">
                                                    <div>
                                                        <span className="text-muted-foreground">Support Tickets:</span> {customer.support.tickets}
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Satisfaction:</span> {customer.support.satisfaction}/5
                                                    </div>
                                                    <div>
                                                        <span className="text-muted-foreground">Renewal:</span> {customer.nextRenewal}
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex items-center gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        View Details
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <MessageSquare className="h-3 w-3 mr-1" />
                                                        Contact
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        Schedule QBR
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 