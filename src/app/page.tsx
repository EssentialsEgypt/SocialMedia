import { EnhancedSocialMediaDashboard } from "@/components/dashboard/enhanced-social-media-dashboard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, ExternalLink } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Essentials Enhanced</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/landing">
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Landing Page
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <EnhancedSocialMediaDashboard />
    </div>
  )
}
