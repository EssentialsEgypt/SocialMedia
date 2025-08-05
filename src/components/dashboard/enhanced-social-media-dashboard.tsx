"use client"

import { useState, useEffect } from "react"
import { BarChart3, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { SocialMediaManager } from "./social-media-manager"
import { AIPoweredBusinessDashboard } from "./ai-powered-business-dashboard"
import { EnhancedAudienceTracker } from "./enhanced-audience-tracker"
import { EnhancedAdPerformance } from "./enhanced-ad-performance"
import { AutoRepliesEngine } from "./auto-replies-engine"
import { EnhancedAutoMessages } from "./enhanced-auto-messages"
import { BrandAssetsHub } from "./brand-assets-hub"
import { EnhancedCashLog } from "./enhanced-cash-log"
import { AIAudienceTimingInsights } from "./ai-audience-timing-insights"
import { AIPoweredAdIdeaGenerator } from "./ai-powered-ad-idea-generator"
import RageIntel from "./rageintel"
import { WebsiteAnalytics } from "./website-analytics"
import { AIROIForecastEngine } from "./ai-roi-forecast-engine"
import { AIStrategyComposer } from "./ai-strategy-composer"

const sidebarItems = [
  { id: "dashboard", label: "AI Business Dashboard", icon: BarChart3 },
  { id: "social", label: "Social Media Manager", icon: BarChart3 },
  { id: "audience", label: "Audience Tracker", icon: BarChart3 },
  { id: "ads", label: "Ad Performance", icon: BarChart3 },
  { id: "auto", label: "Auto Replies", icon: BarChart3 },
  { id: "messages", label: "Auto Messages", icon: BarChart3 },
  { id: "branding", label: "Brand Assets", icon: BarChart3 },
  { id: "cash", label: "Cash Log", icon: BarChart3 },
  { id: "timing", label: "AI Timing", icon: BarChart3 },
  { id: "generator", label: "Ad Generator", icon: BarChart3 },
  { id: "competitors", label: "Competitors", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "forecast", label: "ROI Forecast", icon: BarChart3 },
  { id: "strategycomposer", label: "AI Strategy Composer", icon: BarChart3 },
]

export function EnhancedSocialMediaDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile and handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    if (savedState !== null && !isMobile) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [isMobile])

  // Save sidebar state to localStorage
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed))
    }
  }, [sidebarCollapsed, isMobile])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AIPoweredBusinessDashboard />
      case "social":
        return <SocialMediaManager />
      case "audience":
        return <EnhancedAudienceTracker />
      case "ads":
        return <EnhancedAdPerformance />
      case "auto":
        return <AutoRepliesEngine />
      case "messages":
        return <EnhancedAutoMessages />
      case "branding":
        return <BrandAssetsHub />
      case "cash":
        return <EnhancedCashLog />
      case "timing":
        return <AIAudienceTimingInsights />
      case "generator":
        return <AIPoweredAdIdeaGenerator />
      case "competitors":
        return <RageIntel />
      case "analytics":
        return <WebsiteAnalytics />
      case "forecast":
        return <AIROIForecastEngine />
      case "strategycomposer":
        return <AIStrategyComposer />
      default:
        return <AIPoweredBusinessDashboard />
    }
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-r border-white/10
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-16' : 'w-64'}
          ${isMobile && sidebarCollapsed ? '-translate-x-full' : ''}
          ${isMobile ? 'fixed z-50 h-full' : 'relative'}
        `}
      >
        {/* Sidebar Header */}
        <div className="border-b border-white/10 p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="font-bold text-white text-lg">Essentials</span>
                  <div className="text-xs text-gray-300">AI-Powered OS</div>
                </div>
              </div>
            )}
            {sidebarCollapsed && (
              <div className="flex justify-center">
                <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </div>
            )}

            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 text-white transition-all duration-200 hover:scale-105"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                if (isMobile) {
                  setSidebarCollapsed(true)
                }
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                ${activeTab === item.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }
                ${sidebarCollapsed ? 'justify-center' : 'justify-start'}
              `}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="font-medium truncate">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-white/10 p-4 flex items-center justify-between bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 transition-all duration-200"
                aria-label="Open sidebar menu"
                title="Open sidebar menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <div>
              <h1 className="text-2xl font-bold text-white">
                {sidebarItems.find(item => item.id === activeTab)?.label || "Dashboard"}
              </h1>
              <div className="text-sm text-gray-300">Premium AI-Powered Interface</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-pink-500/25">
              Enhanced Mode
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
          <div className="max-w-7xl mx-auto transition-all duration-200">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
