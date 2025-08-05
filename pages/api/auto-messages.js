export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // AI Auto Message Enhancement - Enhanced response with AI features
  // Preserves all existing functionality while adding AI capabilities

  const mockMessages = [
    {
      id: 1,
      trigger: "High CPR Alert",
      message: "🚨 High CPR Alert: Campaign BAPE_Drop has CPR of 2.8 which is 15% above target. Consider pausing or optimizing.",
      active: true,
      slackEnabled: true,
      whatsappEnabled: true,
      emailEnabled: true,
      // AI Auto Message Enhancement - Added AI features
      aiOptimized: true,
      performanceScore: 0.87,
      lastOptimized: new Date(),
      suggestedImprovements: ["Add urgency", "Include size guide link"],
      aiGenerated: true,
      tone: "urgent",
      segment: "high_cpr"
    },
    {
      id: 2,
      trigger: "Revenue Milestone",
      message: "🎉 Revenue Milestone: Instagram campaign reached 45,000 EGP in revenue! Great performance!",
      active: true,
      slackEnabled: true,
      whatsappEnabled: false,
      emailEnabled: true,
      // AI Auto Message Enhancement - Added AI features
      aiOptimized: true,
      performanceScore: 0.92,
      lastOptimized: new Date(),
      suggestedImprovements: ["Add social proof", "Include success metrics"],
      aiGenerated: true,
      tone: "celebratory",
      segment: "revenue_milestone"
    },
    {
      id: 3,
      trigger: "Low Performance",
      message: "⚠️ Performance Alert: Supreme_Campaign is underperforming with CTR of 1.2%. Consider reviewing strategy.",
      active: true,
      slackEnabled: true,
      whatsappEnabled: true,
      emailEnabled: true,
      // AI Auto Message Enhancement - Added AI features
      aiOptimized: false,
      performanceScore: 0.45,
      lastOptimized: null,
      suggestedImprovements: ["Add urgency", "Include size guide link", "Optimize creative"],
      aiGenerated: false,
      tone: "warning",
      segment: "low_performance"
    },
    {
      id: 4,
      trigger: "Budget Alert",
      message: "💰 Budget Alert: Fear_of_God campaign has spent 8,500 EGP of 10,000 EGP (85%).",
      active: true,
      slackEnabled: true,
      whatsappEnabled: false,
      emailEnabled: true,
      // AI Auto Message Enhancement - Added AI features
      aiOptimized: true,
      performanceScore: 0.78,
      lastOptimized: new Date(Date.now() - 24 * 60 * 60 * 1000),
      suggestedImprovements: ["Add budget optimization", "Include performance metrics"],
      aiGenerated: true,
      tone: "informative",
      segment: "budget_alert"
    }
  ];

  // AI Auto Message Enhancement - Return enhanced response
  res.status(200).json({
    messages: mockMessages,
    // AI Auto Message Enhancement - Added AI analytics
    aiAnalytics: {
      totalMessages: mockMessages.length,
      aiOptimizedCount: mockMessages.filter(m => m.aiOptimized).length,
      averagePerformanceScore: mockMessages.reduce((sum, m) => sum + m.performanceScore, 0) / mockMessages.length,
      topPerformingSegment: "revenue_milestone",
      optimizationOpportunities: mockMessages.filter(m => m.performanceScore < 0.7).length
    }
  });
}
