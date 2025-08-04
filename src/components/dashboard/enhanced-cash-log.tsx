"use client"

import React, { useEffect, useState } from "react"
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
import { toast } from "sonner"
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Facebook,
  Instagram,
  CreditCard,
  Receipt,
  User,
  Gift,
  Package,
  Settings,
  BarChart3,
  Download,
  Upload,
  RefreshCw
} from "lucide-react"

// Types
interface CashLogEntry {
  id: number
  date: string
  description: string
  amount: number
  category: string
  subcategory?: string
  transaction_type: 'income' | 'expense'
  source?: string
  platform?: string
  campaign_id?: string
  tags?: string[]
  notes?: string
}

interface TeamMember {
  id: number
  name: string
  monthly_salary: number
  last_paid?: string
  status: 'active' | 'inactive'
}

interface MonthlySummary {
  year: number
  month: number
  total_revenue: number
  total_ad_spend: number
  total_salaries: number
  total_bonuses: number
  total_expenses: number
  net_profit: number
  roi_percentage: number
}

// Mock data for demonstration
const mockTeamMembers: TeamMember[] = [
  { id: 1, name: "Ahmed", monthly_salary: 10000, status: 'active' },
  { id: 2, name: "Omar", monthly_salary: 8000, status: 'active' },
  { id: 3, name: "Sarah", monthly_salary: 12000, status: 'active' },
  { id: 4, name: "Fatima", monthly_salary: 9000, status: 'active' },
]

const mockCashLogEntries: CashLogEntry[] = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Instagram – Story Campaign – August 3",
    amount: -2000,
    category: "Ad Spend",
    subcategory: "Instagram Ads",
    transaction_type: "expense",
    source: "instagram",
    platform: "instagram",
    tags: ["@campaign", "story"]
  },
  {
    id: 2,
    date: "2024-01-10",
    description: "Salary – @Ahmed",
    amount: -10000,
    category: "Salary",
    transaction_type: "expense",
    source: "salary",
    tags: ["@Ahmed", "salary"]
  },
  {
    id: 3,
    date: "2024-01-12",
    description: "Bonus – @Omar",
    amount: -2000,
    category: "Bonus",
    transaction_type: "expense",
    source: "bonus",
    tags: ["@Omar", "bonus", "salary"]
  },
  {
    id: 4,
    date: "2024-01-14",
    description: "Manual Order – Supreme Hoodie",
    amount: -1850,
    category: "Order",
    subcategory: "Manual Order",
    transaction_type: "expense",
    source: "manual",
    tags: ["@order", "supreme"]
  },
  {
    id: 5,
    date: "2024-01-16",
    description: "Facebook Ad Campaign: Summer Sale",
    amount: -1500,
    category: "Ad Spend",
    subcategory: "Facebook Ads",
    transaction_type: "expense",
    source: "facebook_ads",
    platform: "facebook",
    tags: ["@campaign", "summer"]
  },
  {
    id: 6,
    date: "2024-01-20",
    description: "Monthly Revenue - Shopify Store",
    amount: 25000,
    category: "Revenue",
    subcategory: "Shopify",
    transaction_type: "income",
    source: "shopify",
    platform: "shopify",
    tags: ["@revenue", "monthly"]
  }
]

const mockMonthlySummary: MonthlySummary = {
  year: 2024,
  month: 1,
  total_revenue: 25000,
  total_ad_spend: 3500,
  total_salaries: 10000,
  total_bonuses: 2000,
  total_expenses: 1850,
  net_profit: 7650,
  roi_percentage: 45.2
}

export function EnhancedCashLog() {
  const [cashLogEntries, setCashLogEntries] = useState<CashLogEntry[]>(mockCashLogEntries)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [monthlySummary, setMonthlySummary] = useState<MonthlySummary>(mockMonthlySummary)
  const [selectedMonth, setSelectedMonth] = useState<string>("2024-01")
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showAddTeamMember, setShowAddTeamMember] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form states
  const [newEntry, setNewEntry] = useState({
    description: "",
    amount: "",
    category: "",
    subcategory: "",
    transaction_type: "expense" as 'income' | 'expense',
    source: "",
    platform: "",
    tags: "",
    notes: ""
  })

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    monthly_salary: "",
    status: "active" as 'active' | 'inactive'
  })

  const [manualOrder, setManualOrder] = useState({
    amount: "",
    description: "",
    category: "Order"
  })

  const [manualExpense, setManualExpense] = useState({
    description: "",
    amount: "",
    category: "",
    transaction_type: "expense" as 'income' | 'expense'
  })

  // Categories for dropdowns
  const categories = [
    "Ad Spend", "Salary", "Bonus", "Order", "Manual", "Revenue", 
    "Office Expenses", "Software & Tools", "Marketing", "Travel", "Equipment"
  ]

  const platforms = [
    "Facebook", "Instagram", "Google", "TikTok", "LinkedIn", "Snapchat", 
    "Shopify", "Manual", "Other"
  ]

  const sources = [
    "facebook_ads", "instagram_ads", "google_ads", "tiktok_ads", 
    "linkedin_ads", "snapchat_ads", "salary", "bonus", "manual", 
    "shopify", "other"
  ]

  // Functions
  const addCashLogEntry = (entry: Omit<CashLogEntry, 'id' | 'date'>) => {
    const newEntry: CashLogEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      tags: entry.tags?.filter(tag => tag) || []
    }
    setCashLogEntries(prev => [newEntry, ...prev])
    toast.success("Entry added successfully")
  }

  const paySalary = (member: TeamMember) => {
    const entry: Omit<CashLogEntry, 'id' | 'date'> = {
      description: `Salary – @${member.name}`,
      amount: -member.monthly_salary,
      category: "Salary",
      transaction_type: "expense",
      source: "salary",
      tags: [`@${member.name}`, "salary"]
    }
    addCashLogEntry(entry)
    
    // Update team member's last paid date
    setTeamMembers(prev => prev.map(m => 
      m.id === member.id 
        ? { ...m, last_paid: new Date().toISOString().split('T')[0] }
        : m
    ))
  }

  const payBonus = (member: TeamMember, amount: number) => {
    const entry: Omit<CashLogEntry, 'id' | 'date'> = {
      description: `Bonus – @${member.name}`,
      amount: -amount,
      category: "Bonus",
      transaction_type: "expense",
      source: "bonus",
      tags: [`@${member.name}`, "bonus", "salary"]
    }
    addCashLogEntry(entry)
  }

  const addManualOrder = () => {
    if (!manualOrder.amount || !manualOrder.description) {
      toast.error("Please fill in all required fields")
      return
    }

    const entry: Omit<CashLogEntry, 'id' | 'date'> = {
      description: `Manual Order – ${manualOrder.description}`,
      amount: -parseFloat(manualOrder.amount),
      category: "Order",
      subcategory: "Manual Order",
      transaction_type: "expense",
      source: "manual",
      tags: ["@order", "manual"]
    }
    addCashLogEntry(entry)
    setManualOrder({ amount: "", description: "", category: "Order" })
  }

  const addManualExpense = () => {
    if (!manualExpense.description || !manualExpense.amount) {
      toast.error("Please fill in all required fields")
      return
    }

    const entry: Omit<CashLogEntry, 'id' | 'date'> = {
      description: manualExpense.description,
      amount: manualExpense.transaction_type === 'income' 
        ? parseFloat(manualExpense.amount) 
        : -parseFloat(manualExpense.amount),
      category: manualExpense.category || "Manual",
      transaction_type: manualExpense.transaction_type,
      source: "manual",
      tags: ["@manual"]
    }
    addCashLogEntry(entry)
    setManualExpense({ description: "", amount: "", category: "", transaction_type: "expense" })
  }

  const addTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.monthly_salary) {
      toast.error("Please fill in all required fields")
      return
    }

    const member: TeamMember = {
      id: Date.now(),
      name: newTeamMember.name,
      monthly_salary: parseFloat(newTeamMember.monthly_salary),
      status: newTeamMember.status
    }
    setTeamMembers(prev => [...prev, member])
    setNewTeamMember({ name: "", monthly_salary: "", status: "active" })
    toast.success("Team member added successfully")
  }

  const syncAdSpending = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock ad spending data
    const mockAdSpending = [
      {
        description: "Facebook Ad Campaign: Winter Collection",
        amount: -1200,
        platform: "facebook",
        source: "facebook_ads"
      },
      {
        description: "Instagram Ad Campaign: New Product Launch",
        amount: -800,
        platform: "instagram",
        source: "instagram_ads"
      }
    ]

    mockAdSpending.forEach(ad => {
      const entry: Omit<CashLogEntry, 'id' | 'date'> = {
        description: ad.description,
        amount: ad.amount,
        category: "Ad Spend",
        subcategory: `${ad.platform} Ads`,
        transaction_type: "expense",
        source: ad.source,
        platform: ad.platform,
        tags: ["@campaign", ad.platform]
      }
      addCashLogEntry(entry)
    })

    setLoading(false)
    toast.success("Ad spending synced successfully")
  }

  const syncRevenue = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const revenueEntry: Omit<CashLogEntry, 'id' | 'date'> = {
      description: "Monthly Revenue - Shopify Store",
      amount: 28000,
      category: "Revenue",
      subcategory: "Shopify",
      transaction_type: "income",
      source: "shopify",
      platform: "shopify",
      tags: ["@revenue", "monthly"]
    }
    addCashLogEntry(revenueEntry)
    
    setLoading(false)
    toast.success("Revenue synced successfully")
  }

  // Calculate totals
  const currentMonthEntries = cashLogEntries.filter(entry => 
    entry.date.startsWith(selectedMonth)
  )

  const totalRevenue = currentMonthEntries
    .filter(entry => entry.transaction_type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0)

  const totalExpenses = currentMonthEntries
    .filter(entry => entry.transaction_type === 'expense')
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0)

  const netProfit = totalRevenue - totalExpenses

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cash Log System</h1>
          <p className="text-gray-600">Smart financial tracking for your business</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={syncAdSpending} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Sync Ad Spending
          </Button>
          <Button onClick={syncRevenue} disabled={loading} variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Sync Revenue
          </Button>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">+{totalRevenue.toLocaleString()} EGP</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">-{totalExpenses.toLocaleString()} EGP</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Profit</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netProfit >= 0 ? '+' : ''}{netProfit.toLocaleString()} EGP
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ROI</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalExpenses > 0 ? ((netProfit / totalExpenses) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="cashlog" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="cashlog">Cash Log</TabsTrigger>
          <TabsTrigger value="team">Team Salaries</TabsTrigger>
          <TabsTrigger value="orders">Manual Orders</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Cash Log Tab */}
        <TabsContent value="cashlog" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cash Log Entries</CardTitle>
                  <CardDescription>All financial transactions and activities</CardDescription>
                </div>
                <Dialog open={showAddEntry} onOpenChange={setShowAddEntry}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Cash Log Entry</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Description</label>
                          <Input
                            value={newEntry.description}
                            onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                            placeholder="Enter description"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Amount</label>
                          <Input
                            type="number"
                            value={newEntry.amount}
                            onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Category</label>
                          <Select value={newEntry.category} onValueChange={(value) => setNewEntry({...newEntry, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Transaction Type</label>
                          <Select value={newEntry.transaction_type} onValueChange={(value: 'income' | 'expense') => setNewEntry({...newEntry, transaction_type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="income">Income</SelectItem>
                              <SelectItem value="expense">Expense</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Platform</label>
                          <Select value={newEntry.platform} onValueChange={(value) => setNewEntry({...newEntry, platform: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              {platforms.map((platform) => (
                                <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Tags</label>
                          <Input
                            value={newEntry.tags}
                            onChange={(e) => setNewEntry({...newEntry, tags: e.target.value})}
                            placeholder="@tag1, @tag2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                          value={newEntry.notes}
                          onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                          placeholder="Additional notes..."
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAddEntry(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => {
                          if (!newEntry.description || !newEntry.amount || !newEntry.category) {
                            toast.error("Please fill in all required fields")
                            return
                          }
                          const entry: Omit<CashLogEntry, 'id' | 'date'> = {
                            description: newEntry.description,
                            amount: newEntry.transaction_type === 'income' 
                              ? parseFloat(newEntry.amount) 
                              : -parseFloat(newEntry.amount),
                            category: newEntry.category,
                            subcategory: newEntry.subcategory,
                            transaction_type: newEntry.transaction_type,
                            source: newEntry.source,
                            platform: newEntry.platform,
                            tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                            notes: newEntry.notes
                          }
                          addCashLogEntry(entry)
                          setNewEntry({
                            description: "", amount: "", category: "", subcategory: "",
                            transaction_type: "expense", source: "", platform: "", tags: "", notes: ""
                          })
                          setShowAddEntry(false)
                        }}>
                          Add Entry
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
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashLogEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{entry.description}</p>
                          {entry.platform && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              {entry.platform}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.category === 'Revenue' ? 'default' : 'outline'}>
                          {entry.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${entry.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {entry.amount >= 0 ? '+' : ''}{entry.amount.toLocaleString()} EGP
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {entry.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Salaries Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Salary Management</CardTitle>
                  <CardDescription>Manage team members and salary payments</CardDescription>
                </div>
                <Dialog open={showAddTeamMember} onOpenChange={setShowAddTeamMember}>
                  <DialogTrigger asChild>
                    <Button>
                      <User className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={newTeamMember.name}
                          onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                          placeholder="Enter name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Monthly Salary (EGP)</label>
                        <Input
                          type="number"
                          value={newTeamMember.monthly_salary}
                          onChange={(e) => setNewTeamMember({...newTeamMember, monthly_salary: e.target.value})}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select value={newTeamMember.status} onValueChange={(value: 'active' | 'inactive') => setNewTeamMember({...newTeamMember, status: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAddTeamMember(false)}>
                          Cancel
                        </Button>
                        <Button onClick={addTeamMember}>
                          Add Member
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
                    <TableHead>Name</TableHead>
                    <TableHead>Monthly Salary</TableHead>
                    <TableHead>Last Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.monthly_salary.toLocaleString()} EGP</TableCell>
                      <TableCell>
                        {member.last_paid ? new Date(member.last_paid).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => paySalary(member)}
                            disabled={member.status === 'inactive'}
                          >
                            Pay Salary
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Gift className="h-4 w-4 mr-1" />
                                Bonus
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Pay Bonus to {member.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Bonus Amount (EGP)</label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    id="bonus-amount"
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline">Cancel</Button>
                                  <Button onClick={() => {
                                    const amount = parseFloat((document.getElementById('bonus-amount') as HTMLInputElement).value)
                                    if (amount > 0) {
                                      payBonus(member, amount)
                                    }
                                  }}>
                                    Pay Bonus
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Order Cost Entry</CardTitle>
              <CardDescription>Log payments for custom orders and client requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Amount Paid (EGP)</label>
                  <Input
                    type="number"
                    value={manualOrder.amount}
                    onChange={(e) => setManualOrder({...manualOrder, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={manualOrder.description}
                    onChange={(e) => setManualOrder({...manualOrder, description: e.target.value})}
                    placeholder="e.g., Supreme Hoodie"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addManualOrder} className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add Order
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Expense/Income Entry</CardTitle>
              <CardDescription>Log any custom cash activities like delivery fees, refunds, etc.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={manualExpense.description}
                    onChange={(e) => setManualExpense({...manualExpense, description: e.target.value})}
                    placeholder="e.g., Delivery fee"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount (EGP)</label>
                  <Input
                    type="number"
                    value={manualExpense.amount}
                    onChange={(e) => setManualExpense({...manualExpense, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={manualExpense.category} onValueChange={(value) => setManualExpense({...manualExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select value={manualExpense.transaction_type} onValueChange={(value: 'income' | 'expense') => setManualExpense({...manualExpense, transaction_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={addManualExpense}>
                  <Receipt className="h-4 w-4 mr-2" />
                  Add Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Profit Summary</CardTitle>
                <CardDescription>Financial overview for {selectedMonth}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Revenue:</span>
                    <span className="font-semibold text-green-600">+{monthlySummary.total_revenue.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ad Spend:</span>
                    <span className="font-semibold text-red-600">-{monthlySummary.total_ad_spend.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Salaries:</span>
                    <span className="font-semibold text-red-600">-{monthlySummary.total_salaries.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonuses:</span>
                    <span className="font-semibold text-red-600">-{monthlySummary.total_bonuses.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other Expenses:</span>
                    <span className="font-semibold text-red-600">-{monthlySummary.total_expenses.toLocaleString()} EGP</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Net Profit:</span>
                      <span className={`font-bold text-lg ${monthlySummary.net_profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {monthlySummary.net_profit >= 0 ? '+' : ''}{monthlySummary.net_profit.toLocaleString()} EGP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(
                    currentMonthEntries
                      .filter(entry => entry.transaction_type === 'expense')
                      .reduce((acc, entry) => {
                        acc[entry.category] = (acc[entry.category] || 0) + Math.abs(entry.amount)
                        return acc
                      }, {} as Record<string, number>)
                  ).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span>{category}</span>
                      <span className="font-semibold text-red-600">-{amount.toLocaleString()} EGP</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
