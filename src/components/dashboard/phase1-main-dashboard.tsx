"use client"

import { useState } from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart3, Instagram, Facebook, Youtube, Mail, MessageCircle, ShoppingCart, TrendingUp, Calendar, Users, DollarSign } from "lucide-react"

function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  )
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "facebook", label: "Facebook Ads", icon: Facebook },
  { id: "tiktok", label: "TikTok", icon: Youtube },
  { id: "googleads", label: "Google Ads", icon: TrendingUp },
  { id: "email", label: "Email Campaigns", icon: Mail },
  { id: "whatsapp", label: "WhatsApp / UGC", icon: MessageCircle },
  { id: "sales", label: "Sales & Conversion", icon: ShoppingCart },
]

export function Phase1MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Placeholder title="Overview Dashboard" description="Main summary panel with KPIs, trendline, top platforms, goals, and alerts." />
      case "instagram":
        return <Placeholder title="Instagram Analytics" description="Follower growth, engagement metrics, reels, heatmap, top posts, story insights, hashtag performance." />
      case "facebook":
        return <Placeholder title="Facebook Ads Panel" description="Ad set table, campaign selector, graphs, ad creative preview, breakdown tabs, audience segments, diagnostics." />
      case "tiktok":
        return <Placeholder title="TikTok Analytics" description="Views, likes, shares, saves, trending videos, watch time, ads split, UGC vs brand video." />
      case "googleads":
        return <Placeholder title="Google Ads Panel" description="Campaign performance, spend, conversions, and more." />
      case "email":
        return <Placeholder title="Email Campaign Performance" description="Campaign table, heatmap, list growth, top templates, A/B test results." />
      case "whatsapp":
        return <Placeholder title="WhatsApp & DMs Monitor" description="Response time, missed messages, conversion ratio, top agents, chat timeline." />
      case "sales":
        return <Placeholder title="Sales Attribution & Conversion Tracking" description="Funnel chart, attribution model, UTM performance, product sales, conversion ratios." />
      default:
        return <Placeholder title="Overview Dashboard" description="Main summary panel with KPIs, trendline, top platforms, goals, and alerts." />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">Essentials Egypt Phase 1</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
    </SidebarProvider>
  )
}
