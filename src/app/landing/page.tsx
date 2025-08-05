"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Brain, Users, DollarSign, Clock, ArrowRight, Play, Shield, Sparkles } from "lucide-react"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Premium Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.15),transparent_50%)] animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)] animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.05),transparent_70%)] animate-pulse delay-2000" />

            {/* Navigation */}
            <nav className="relative z-10 flex items-center justify-between p-6">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">Essentials Enhanced</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-white hover:text-purple-300">
                        Features
                    </Button>
                    <Button variant="ghost" className="text-white hover:text-purple-300">
                        Pricing
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        Get Started
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 px-6 py-24 text-center">
                <div className="max-w-5xl mx-auto">
                    {/* Premium Badge */}
                    <div className="inline-flex items-center justify-center rounded-full px-6 py-3 mb-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-pink-500/25 animate-fade-in">
                        <Sparkles className="w-4 h-4 mr-2" />
                        AI-Powered Business OS
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl animate-slide-up">
                        The Business Operating System
                    </h1>

                    {/* Subheadline with Premium Pink */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight animate-slide-up-delay">
                        <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                            Powered by Real AI
                        </span>
                    </h2>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto font-light leading-relaxed animate-fade-in-delay">
                        All your tools. One dashboard. Zero wasted hours.
                    </p>

                    {/* Premium Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-bounce-in">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-10 py-6 rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 border-0 font-semibold"
                        >
                            <Zap className="w-6 h-6 mr-3" />
                            Get Started Free
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 text-lg px-10 py-6 rounded-full shadow-xl shadow-white/10 hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                            <Play className="w-6 h-6 mr-3" />
                            Book Live Demo
                        </Button>
                    </div>
                </div>

                {/* Premium Floating Dashboard Mockup */}
                <div className="mt-20 animate-fade-in-delay">
                    <div className="relative max-w-6xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-3xl blur-3xl animate-pulse" />
                        <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="h-4 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded mb-2" />
                                    <div className="h-3 bg-white/20 rounded mb-1" />
                                    <div className="h-3 bg-white/20 rounded w-2/3" />
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="h-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded mb-2" />
                                    <div className="h-3 bg-white/20 rounded mb-1" />
                                    <div className="h-3 bg-white/20 rounded w-3/4" />
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                    <div className="h-4 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded mb-2" />
                                    <div className="h-3 bg-white/20 rounded mb-1" />
                                    <div className="h-3 bg-white/20 rounded w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What Makes Us Different?
                        </h2>
                        <p className="text-xl text-gray-300">
                            While others give you reports, we give you intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                                        <Brain className="w-5 h-5 text-white" />
                                    </div>
                                    Essentials Enhanced
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>Fully AI-Native</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>Automated Campaign Suggestions</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>WhatsApp + Instagram Integration</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>Real-Time VIP Tracking</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>AI-Generated Ads</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>Multi-Platform Audience Timing</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>Integrated Cash Log + Forecast</span>
                                </div>
                                <div className="flex items-center text-green-400">
                                    <Check className="w-5 h-5 mr-3" />
                                    <span>AI-Synced Social Media Manager</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-red-500/20">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    Other Tools
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Just Reports (No AI)</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Manual Campaign Management</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Partial Integration</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>No VIP Tracking</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Manual Ad Creation</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Basic Scheduling</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Separate Financial Tools</span>
                                </div>
                                <div className="flex items-center text-red-400">
                                    <span className="w-5 h-5 mr-3 text-xl">❌</span>
                                    <span>Manual Social Management</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Savings Calculator */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                        What You'll Save
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
                            <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Time</h3>
                            <p className="text-gray-300">Save 25+ hours/week by removing manual reports, scheduling, and performance tracking.</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-pink-500/20">
                            <DollarSign className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Money</h3>
                            <p className="text-gray-300">Cut 3rd-party tool costs by up to $320/month (replacing 7–10 separate apps).</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20">
                            <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Effort</h3>
                            <p className="text-gray-300">Get insights + suggestions in real-time — no more digging or second-guessing.</p>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-red-400 mb-4">Without Us</h3>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>10 separate tools</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>$400/month in costs</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                                        <span>25 hours/week managing</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                            </div>
                            <div className="text-center">
                                <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-4 rotate-180" />
                            </div>
                            <div className="text-left">
                                <h3 className="text-2xl font-bold text-green-400 mb-4">With Essentials Enhanced</h3>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>1 unified platform</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>$89/month total</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3" />
                                        <span>3 hours/week managing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            All-In-One Modules
                        </h2>
                        <p className="text-xl text-gray-300">
                            Everything you need to scale your business, powered by AI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">AI Business Dashboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Real-time insights. Auto-generated summaries. Predictive alerts.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Live KPI tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>AI-powered insights</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Predictive analytics</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Audience Tracker</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Track & re-engage your top followers. Detect when they drop off.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>VIP identification</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Engagement scoring</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Drop-off alerts</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                                    <DollarSign className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Cash Log</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Know exactly where your money is going — and what you should stop spending on.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Expense tracking</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>ROI analysis</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Budget forecasting</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Auto Ads</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">AI writes, plans, and predicts your campaigns — before you even ask.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>AI copy generation</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Performance prediction</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Auto optimization</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">VIP System</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">Get notified when your top buyer goes silent. Send a personalized message instantly.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>VIP identification</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Automated outreach</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Personalization</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                            <CardHeader>
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <CardTitle className="text-xl text-white">Smart Scheduler</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 mb-4">AI determines the perfect time to post for maximum engagement across all platforms.</p>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Optimal timing</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Cross-platform sync</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Auto-posting</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Emotional Pitch */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            Why Choose Essentials Enhanced?
                        </h2>
                        <div className="space-y-6 text-lg text-gray-300">
                            <p className="text-xl">
                                "You're already doing the work. You just need something smarter to help you do it faster."
                            </p>
                            <p className="text-xl">
                                "Your competitors are using 10 tools and losing time. You'll use one."
                            </p>
                            <p className="text-xl">
                                "Every second your team spends copy-pasting between dashboards is money lost."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What Our Users Say
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 text-lg">
                                    "We went from 3 hours/day in spreadsheets to letting AI handle our drops and timing."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4" />
                                    <div>
                                        <p className="text-white font-semibold">Sarah Chen</p>
                                        <p className="text-gray-400">Founder, Luxe Fashion</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-pink-500/20">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-6 text-lg">
                                    "No more guessing. I know what to post, when to post, and who to reach — daily."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mr-4" />
                                    <div>
                                        <p className="text-white font-semibold">Ahmed Hassan</p>
                                        <p className="text-gray-400">CEO, Digital Agency</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            You work hard. Let AI take the rest.
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of businesses already scaling with AI-powered insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4">
                                <Zap className="w-5 h-5 mr-2" />
                                Start Free Trial
                            </Button>
                            <Button size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white text-lg px-8 py-4">
                                <Play className="w-5 h-5 mr-2" />
                                Get a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-gray-300">
                            No hidden fees. No setup charges. Just results.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-gray-500/20">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-white">Starter</CardTitle>
                                <div className="text-4xl font-bold text-white">$49<span className="text-lg text-gray-400">/mo</span></div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Core AI features</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>5 integrations</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Basic analytics</span>
                                    </div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700">
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/40 relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                                    Most Popular
                                </Badge>
                            </div>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-white">Pro</CardTitle>
                                <div className="text-4xl font-bold text-white">$89<span className="text-lg text-gray-400">/mo</span></div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Unlimited integrations</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Full AI access</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Smart alerts + summaries</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Priority support</span>
                                    </div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-gray-500/20">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl text-white">Enterprise</CardTitle>
                                <div className="text-4xl font-bold text-white">Custom</div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Custom integrations</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Dedicated support</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>White-label options</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 mr-2 text-green-400" />
                                        <span>Custom AI training</span>
                                    </div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700">
                                    Contact Sales
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-white">How does this connect with my Instagram?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300">
                                    We use Instagram's official API to securely connect your account. You authorize the connection once, and we handle the rest. Your data stays private and secure.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-white">Can I cancel anytime?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300">
                                    Absolutely. No long-term contracts. Cancel anytime from your dashboard. We'll even help you export your data if needed.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-white">Do I need to code anything?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300">
                                    Not at all. Everything is plug-and-play. Connect your accounts, and AI takes over. No technical knowledge required.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20">
                            <CardHeader>
                                <CardTitle className="text-white">Does it replace my current analytics tool?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300">
                                    We integrate with your existing tools and enhance them with AI. You can keep using what you love, but now with intelligent insights and automation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-12 border-t border-purple-500/20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Essentials Enhanced</span>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-400">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>Support</span>
                            <span>© 2024 Essentials Enhanced</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
} 