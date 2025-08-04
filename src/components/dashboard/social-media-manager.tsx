"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Users,
  Image,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  CheckCircle,
  Globe,
  RefreshCw,
  Play,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react"

// Types
interface SocialAccount {
  id: string
  platform: string
  name: string
  username: string
  avatar: string
  status: 'connected' | 'disconnected' | 'error'
  followers: number
  following: number
  posts: number
  engagement: number
  lastSync: string
}

interface ContentPost {
  id: string
  title: string
  content: string
  media: string[]
  platforms: string[]
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  scheduledDate: string
  publishedDate?: string
  engagement: {
    likes: number
    comments: number
    shares: number
    saves: number
    reach: number
  }
  tags: string[]
  aiOptimized: boolean
  teamMember: string
}

interface Analytics {
  totalFollowers: number
  totalEngagement: number
  totalReach: number
  totalPosts: number
  growthRate: number
  topPerformingPost: ContentPost
  platformBreakdown: { platform: string; followers: number; engagement: number }[]
  recentActivity: { type: string; message: string; time: string }[]
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'creator' | 'viewer'
  avatar: string
  status: 'online' | 'offline' | 'away'
  assignedAccounts: string[]
  permissions: string[]
}

interface Automation {
  id: string
  name: string
  type: 'posting' | 'engagement' | 'monitoring' | 'reporting'
  status: 'active' | 'paused' | 'error'
  schedule: string
  platforms: string[]
  conditions: string[]
  actions: string[]
}

// Mock data
const mockAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "instagram",
    name: "Essentials Egypt",
    username: "@essentials_egypt",
    avatar: "/avatars/instagram.jpg",
    status: "connected",
    followers: 15420,
    following: 892,
    posts: 342,
    engagement: 4.8,
    lastSync: "2024-01-21T10:30:00Z"
  },
  {
    id: "2",
    platform: "facebook",
    name: "Essentials Egypt",
    username: "@essentials.egypt",
    avatar: "/avatars/facebook.jpg",
    status: "connected",
    followers: 8920,
    following: 156,
    posts: 156,
    engagement: 3.2,
    lastSync: "2024-01-21T10:25:00Z"
  },
  {
    id: "3",
    platform: "tiktok",
    name: "Essentials Egypt",
    username: "@essentials_egypt",
    avatar: "/avatars/tiktok.jpg",
    status: "connected",
    followers: 23450,
    following: 234,
    posts: 89,
    engagement: 6.1,
    lastSync: "2024-01-21T10:20:00Z"
  }
]

const mockPosts: ContentPost[] = [
  {
    id: "1",
    title: "New Collection Launch",
    content: "🔥 Introducing our latest collection! Limited time offer - 50% off! #NewCollection #Fashion #Sale",
    media: ["/images/post1.jpg", "/images/post2.jpg"],
    platforms: ["instagram", "facebook"],
    status: "scheduled",
    scheduledDate: "2024-01-22T18:00:00Z",
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      saves: 0,
      reach: 0
    },
    tags: ["fashion", "sale", "new"],
    aiOptimized: true,
    teamMember: "Sarah Ahmed"
  },
  {
    id: "2",
    title: "Behind the Scenes",
    content: "Take a peek behind the scenes of our latest photoshoot! 📸 #BehindTheScenes #Fashion #Photography",
    media: ["/images/post3.jpg"],
    platforms: ["instagram", "tiktok"],
    status: "published",
    scheduledDate: "2024-01-20T14:00:00Z",
    publishedDate: "2024-01-20T14:00:00Z",
    engagement: {
      likes: 1247,
      comments: 89,
      shares: 45,
      saves: 123,
      reach: 8900
    },
    tags: ["behindthescenes", "fashion", "photography"],
    aiOptimized: true,
    teamMember: "Omar Hassan"
  }
]

const mockAnalytics: Analytics = {
  totalFollowers: 47790,
  totalEngagement: 4.7,
  totalReach: 125000,
  totalPosts: 587,
  growthRate: 12.5,
  topPerformingPost: mockPosts[1],
  platformBreakdown: [
    { platform: "Instagram", followers: 15420, engagement: 4.8 },
    { platform: "TikTok", followers: 23450, engagement: 6.1 },
    { platform: "Facebook", followers: 8920, engagement: 3.2 }
  ],
  recentActivity: [
    { type: "post", message: "New post published on Instagram", time: "2 hours ago" },
    { type: "engagement", message: "High engagement detected on TikTok", time: "4 hours ago" },
    { type: "follower", message: "Gained 45 new followers", time: "6 hours ago" }
  ]
}

const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Ahmed",
    email: "sarah@essentials.com",
    role: "manager",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    assignedAccounts: ["1", "2"],
    permissions: ["create", "edit", "publish", "analytics"]
  },
  {
    id: "2",
    name: "Omar Hassan",
    email: "omar@essentials.com",
    role: "creator",
    avatar: "/avatars/omar.jpg",
    status: "online",
    assignedAccounts: ["1", "3"],
    permissions: ["create", "edit", "analytics"]
  }
]

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "Daily Post Scheduler",
    type: "posting",
    status: "active",
    schedule: "Daily at 6:00 PM",
    platforms: ["instagram", "facebook"],
    conditions: ["AI optimized time", "High engagement period"],
    actions: ["Auto-post content", "Cross-platform sharing"]
  },
  {
    id: "2",
    name: "Engagement Responder",
    type: "engagement",
    status: "active",
    schedule: "Real-time",
    platforms: ["instagram", "facebook", "tiktok"],
    conditions: ["New comment", "Direct message"],
    actions: ["Auto-reply", "Flag for review"]
  }
]

export function SocialMediaManager() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockAccounts)
  const [posts, setPosts] = useState<ContentPost[]>(mockPosts)
  const [analytics, setAnalytics] = useState<Analytics>(mockAnalytics)
  const [team, setTeam] = useState<TeamMember[]>(mockTeam)
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showNewPost, setShowNewPost] = useState(false)
  const [showNewAutomation, setShowNewAutomation] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form states
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    platforms: [] as string[],
    scheduledDate: "",
    tags: ""
  })

  const [newAutomation, setNewAutomation] = useState({
    name: "",
    type: "posting" as Automation['type'],
    schedule: "",
    platforms: [] as string[]
  })

  const platformIcons = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube
  }

  const getPlatformIcon = (platform: string) => {
    const Icon = platformIcons[platform as keyof typeof platformIcons]
    return Icon ? <Icon className="h-4 w-4" /> : <Globe className="h-4 w-4" />
  }

  const addNewPost = () => {
    if (!newPost.title || !newPost.content || newPost.platforms.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    const post: ContentPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      media: [],
      platforms: newPost.platforms,
      status: "draft",
      scheduledDate: newPost.scheduledDate,
      engagement: { likes: 0, comments: 0, shares: 0, saves: 0, reach: 0 },
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      aiOptimized: true,
      teamMember: "Sarah Ahmed"
    }

    setPosts(prev => [post, ...prev])
    setNewPost({ title: "", content: "", platforms: [], scheduledDate: "", tags: "" })
    setShowNewPost(false)
    toast.success("Post created successfully")
  }

  const addNewAutomation = () => {
    if (!newAutomation.name || newAutomation.platforms.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    const automation: Automation = {
      id: Date.now().toString(),
      name: newAutomation.name,
      type: newAutomation.type,
      status: "active",
      schedule: newAutomation.schedule,
      platforms: newAutomation.platforms,
      conditions: [],
      actions: []
    }

    setAutomations(prev => [automation, ...prev])
    setNewAutomation({ name: "", type: "posting", schedule: "", platforms: [] })
    setShowNewAutomation(false)
    toast.success("Automation created successfully")
  }

  const syncAccounts = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    toast.success("Accounts synced successfully")
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Media Manager</h1>
          <p className="text-gray-600">Comprehensive social media management for your business</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={syncAccounts} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Accounts
          </Button>
          <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Enter post title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Write your post content..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Platforms</label>
                    <Select onValueChange={(value) => setNewPost({ ...newPost, platforms: [...newPost.platforms, value] })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platforms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Schedule Date</label>
                    <Input
                      type="datetime-local"
                      value={newPost.scheduledDate}
                      onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewPost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addNewPost}>
                    Create Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.totalFollowers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{analytics.growthRate}% this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Engagement</p>
                <p className="text-2xl font-bold text-green-600">{analytics.totalEngagement}%</p>
                <p className="text-sm text-green-600">+2.1% from last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.totalReach.toLocaleString()}</p>
                <p className="text-sm text-green-600">+15.3% this month</p>
              </div>
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Accounts</p>
                <p className="text-2xl font-bold text-orange-600">{accounts.length}</p>
                <p className="text-sm text-green-600">All active</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Followers and engagement by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.platformBreakdown.map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(platform.platform.toLowerCase())}
                        <span className="font-medium">{platform.platform}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{platform.followers.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{platform.engagement}% engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Post</CardTitle>
              <CardDescription>Your best performing content this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{analytics.topPerformingPost.title}</h4>
                  <p className="text-gray-600 text-sm">{analytics.topPerformingPost.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">❤️ {analytics.topPerformingPost.engagement.likes}</span>
                    <span className="text-sm text-gray-500">💬 {analytics.topPerformingPost.engagement.comments}</span>
                    <span className="text-sm text-gray-500">📤 {analytics.topPerformingPost.engagement.shares}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>Manage your posts and content schedule</CardDescription>
                </div>
                <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Post</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          placeholder="Enter post title"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          placeholder="Write your post content..."
                          rows={4}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Platforms</label>
                          <Select onValueChange={(value) => setNewPost({ ...newPost, platforms: [...newPost.platforms, value] })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platforms" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="tiktok">TikTok</SelectItem>
                              <SelectItem value="twitter">Twitter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Schedule Date</label>
                          <Input
                            type="datetime-local"
                            value={newPost.scheduledDate}
                            onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Tags</label>
                        <Input
                          value={newPost.tags}
                          onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowNewPost(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addNewPost}>
                          Create Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>Platforms</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-gray-500">{post.content.substring(0, 50)}...</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {post.platforms.map((platform) => (
                            <Badge key={platform} variant="outline">
                              {getPlatformIcon(platform)}
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          post.status === 'published' ? 'default' :
                            post.status === 'scheduled' ? 'secondary' :
                              post.status === 'draft' ? 'outline' : 'destructive'
                        }>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.scheduledDate ? new Date(post.scheduledDate).toLocaleDateString() : 'Not scheduled'}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>❤️ {post.engagement.likes}</p>
                          <p>💬 {post.engagement.comments}</p>
                          <p>📤 {post.engagement.shares}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => (
                  <Card key={account.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {getPlatformIcon(account.platform)}
                        <div>
                          <h4 className="font-semibold">{account.name}</h4>
                          <p className="text-sm text-gray-500">@{account.username}</p>
                        </div>
                        <Badge variant={account.status === 'connected' ? 'default' : 'destructive'}>
                          {account.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Followers</p>
                          <p className="font-semibold">{account.followers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Engagement</p>
                          <p className="font-semibold">{account.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Posts</p>
                          <p className="font-semibold">{account.posts}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Following</p>
                          <p className="font-semibold">{account.following}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500">
                          Last synced: {new Date(account.lastSync).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>Performance metrics across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.platformBreakdown.map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(platform.platform.toLowerCase())}
                        <span className="font-medium">{platform.platform}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{platform.followers.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{platform.engagement}% engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Monthly follower growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Instagram</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20" />
                      <span className="text-sm font-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>TikTok</span>
                    <div className="flex items-center gap-2">
                      <Progress value={90} className="w-20" />
                      <span className="text-sm font-medium">+18.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Facebook</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">+8.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your social media team</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Accounts</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          member.role === 'admin' ? 'destructive' :
                            member.role === 'manager' ? 'default' :
                              member.role === 'creator' ? 'secondary' : 'outline'
                        }>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' :
                              member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}></div>
                          <span className="text-sm capitalize">{member.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {member.assignedAccounts.map((accountId) => {
                            const account = accounts.find(a => a.id === accountId)
                            return account ? (
                              <Badge key={accountId} variant="outline">
                                {getPlatformIcon(account.platform)}
                                {account.platform}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Automation Rules</CardTitle>
                  <CardDescription>Set up automated workflows for your social media</CardDescription>
                </div>
                <Dialog open={showNewAutomation} onOpenChange={setShowNewAutomation}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Automation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Automation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={newAutomation.name}
                          onChange={(e) => setNewAutomation({ ...newAutomation, name: e.target.value })}
                          placeholder="Enter automation name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Type</label>
                        <Select value={newAutomation.type} onValueChange={(value: Automation['type']) => setNewAutomation({ ...newAutomation, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="posting">Posting</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                            <SelectItem value="monitoring">Monitoring</SelectItem>
                            <SelectItem value="reporting">Reporting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Schedule</label>
                        <Input
                          value={newAutomation.schedule}
                          onChange={(e) => setNewAutomation({ ...newAutomation, schedule: e.target.value })}
                          placeholder="e.g., Daily at 6:00 PM"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Platforms</label>
                        <Select onValueChange={(value) => setNewAutomation({ ...newAutomation, platforms: [...newAutomation.platforms, value] })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platforms" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowNewAutomation(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addNewAutomation}>
                          Create Automation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {automations.map((automation) => (
                  <Card key={automation.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{automation.name}</h4>
                          <p className="text-sm text-gray-500">{automation.type} automation</p>
                        </div>
                        <Badge variant={automation.status === 'active' ? 'default' : 'secondary'}>
                          {automation.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Schedule:</strong> {automation.schedule}</p>
                        <p><strong>Platforms:</strong> {automation.platforms.join(', ')}</p>
                        <p><strong>Conditions:</strong> {automation.conditions.length} rules</p>
                        <p><strong>Actions:</strong> {automation.actions.length} actions</p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your social media manager</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Auto-sync accounts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI content optimization</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Engagement auto-replies</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Analytics notifications</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & Permissions</CardTitle>
                <CardDescription>Manage access and security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Two-factor authentication</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API access</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Audit logging</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Team collaboration</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
