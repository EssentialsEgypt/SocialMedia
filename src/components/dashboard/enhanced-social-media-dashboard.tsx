"use client"

import { useState } from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart3, Home, TrendingUp, Calendar, Image, DollarSign, Target, Users, Clock, Globe, Lightbulb, MessageSquare, Settings, Brain, Building } from "lucide-react"
import { SocialMediaManager } from "./social-media-manager"
import { RedesignedOverviewDashboard } from "./redesigned-overview-dashboard"

import { EnhancedContentHub } from "./enhanced-content-hub"
import { BrandAssetsHub } from "./brand-assets-hub"
import { EnhancedCashLog } from "./enhanced-cash-log"

import { EnhancedAudienceTracker } from "./enhanced-audience-tracker"
import { AIPoweredCampaignInsights } from "./ai-powered-campaign-insights"
import { EnhancedAdIdeaGenerator } from "./enhanced-ad-idea-generator"
import { EnhancedAutoMessages } from "./enhanced-auto-messages"
import { BrandingPlaceholder } from "./branding-placeholder"
import { AIAudienceTimingInsights } from "./ai-audience-timing-insights"
import RageIntel from "./rageintel"
import AdPilotAI from "./adpilot-ai"
import { AIChat } from "./ai-chat"
import { WebsiteAnalytics } from "./website-analytics"
import { CRMSalesPipeline } from "./crm-sales-pipeline"

const sidebarItems = [
  { id: "dashboard", label: "Social Media Manager", icon: Home },
  { id: "redesigneddashboard", label: "Redesigned Dashboard", icon: BarChart3 },
  { id: "content", label: "Content Hub", icon: Calendar },
  { id: "brandassets", label: "Brand Assets Hub", icon: Image },
  { id: "cash", label: "Cash Log", icon: DollarSign },
  { id: "audience", label: "Audience Tracker", icon: Users },
  { id: "audiencetiming", label: "AI Audience Timing", icon: Clock },
  { id: "campaigninsights", label: "AI Campaign Insights", icon: Lightbulb },
  { id: "ideas", label: "Ad Ideas", icon: Lightbulb },
  { id: "messages", label: "Auto Messages", icon: MessageSquare },
  { id: "branding", label: "Branding", icon: Settings },
  { id: "rageintel", label: "Competitor Tracking", icon: Brain },
  { id: "adpilot", label: "Ad Performance", icon: Target },
  { id: "aichat", label: "AI Chat & Collab", icon: MessageSquare },
  { id: "websiteanalytics", label: "Website Analytics", icon: BarChart3 },
  { id: "crm", label: "CRM & Sales", icon: Building },
]

export function EnhancedSocialMediaDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <SocialMediaManager />
      case "redesigneddashboard":
        return <RedesignedOverviewDashboard />
      case "content":
        return <EnhancedContentHub />
      case "brandassets":
        return <BrandAssetsHub />
      case "cash":
        return <EnhancedCashLog />
      case "audience":
        return <EnhancedAudienceTracker />
      case "audiencetiming":
        return <AIAudienceTimingInsights />
      case "campaigninsights":
        return <AIPoweredCampaignInsights />
      case "ideas":
        return <EnhancedAdIdeaGenerator />
      case "messages":
        return <EnhancedAutoMessages />
      case "branding":
        return <BrandingPlaceholder />
      case "rageintel":
        return <RageIntel />
      case "adpilot":
        return <AdPilotAI />
      case "aichat":
        return <AIChat />
      case "websiteanalytics":
        return <WebsiteAnalytics />
      case "crm":
        return <CRMSalesPipeline />
      default:
        return <SocialMediaManager />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">Essentials Egypt Enhanced</span>
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

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">
                {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>
            <span className="text-sm text-muted-foreground">Enhanced Mode</span>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
