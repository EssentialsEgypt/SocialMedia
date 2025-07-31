"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { fetchData as fetchFacebookData } from "../../../services/platforms/facebook"
import { fetchAdsData as fetchGoogleAdsData, fetchAnalyticsData as fetchGoogleAnalyticsData } from "../../../services/platforms/google"

type Post = { id: number; content: string; scheduled: boolean }
type Comment = { id: number; content: string; flagged: boolean }
type DM = { id: number; sender: string; message: string; replied: boolean }
type Alert = { id: number; type: string; message: string }

export function SocialMediaManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [dms, setDms] = useState<DM[]>([])
  const [engagement, setEngagement] = useState({ likes: 0, comments: 0, shares: 0, likesChange: 0, commentsChange: 0, sharesChange: 0 })
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [multiAccount, setMultiAccount] = useState(false)
  const [manualOverride, setManualOverride] = useState(false)
  const [postingSchedule, setPostingSchedule] = useState("🤖 AI Suggested")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        // Fetch Facebook data
        const fbData = await fetchFacebookData(1) // Replace 1 with actual user_id
        // Process fbData to extract posts, comments, dms, engagement, alerts as needed
        // Placeholder example:
        setPosts([
          { id: 1, content: "Facebook Post 1", scheduled: true },
          { id: 2, content: "Facebook Post 2", scheduled: false },
        ])
        setComments([
          { id: 1, content: "👍 Great post!", flagged: false },
          { id: 2, content: "⚠️ Spam comment", flagged: true },
        ])
        setDms([
          { id: 1, sender: "User1", message: "Hello!", replied: false },
          { id: 2, sender: "User2", message: "Price?", replied: true },
        ])
        setEngagement({ likes: 120, comments: 45, shares: 30, likesChange: 10, commentsChange: 6, sharesChange: -2 })
        setAlerts([
          { id: 1, type: "viral", message: "🔥 Post 1 is going viral!" },
          { id: 2, type: "flagged", message: "🛑 Comment 2 flagged as spam multiple times" },
        ])

        // Fetch Google Ads data
        const googleAdsData = await fetchGoogleAdsData(1) // Replace 1 with actual user_id
        // Process googleAdsData as needed

        // Fetch Google Analytics data
        const googleAnalyticsData = await fetchGoogleAnalyticsData(1) // Replace 1 with actual user_id
        // Process googleAnalyticsData as needed

        // Example: Update multiAccount, manualOverride, postingSchedule based on fetched data or user settings
        setMultiAccount(true)
        setManualOverride(false)
        setPostingSchedule("🤖 AI Suggested")
      } catch (err: any) {
        setError(err.message || "Failed to load social media data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const engagementData = [
    { name: "Likes", value: engagement.likes },
    { name: "Comments", value: engagement.comments },
    { name: "Shares", value: engagement.shares },
  ]

  if (loading) {
    return <div className="p-6">Loading social media data...</div>
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-6">Social Media Manager</h2>

      <section>
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">📝 Scheduled Posts</h3>
        <ul className="list-disc list-inside">
          {posts.map(post => (
            <li key={post.id} className="flex items-center gap-2">
              {post.scheduled ? <span className="text-green-600">🟢</span> : <span className="text-yellow-600">📝</span>}
              <span>{post.content}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">💬 Comments</h3>
        <ul className="list-disc list-inside">
          {comments.map(comment => (
            <li key={comment.id} className={comment.flagged ? "text-red-600" : ""}>
              {comment.content}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">📩 Direct Messages</h3>
        <ul className="list-disc list-inside">
          {dms.map(dm => (
            <li key={dm.id} className="flex items-center gap-2">
              <span>From {dm.sender}: {dm.message}</span>
              {dm.replied ? <span className="text-green-600">✅ Replied</span> : <span className="text-yellow-600">🟡 Pending</span>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">📊 Engagement Insights</h3>
        <div className="flex gap-6 mb-4">
          <div>
            <p>Likes: {engagement.likes} (<span className="text-green-600">+{engagement.likesChange}%</span>)</p>
            <p>Comments: {engagement.comments} (<span className="text-green-600">+{engagement.commentsChange}%</span>)</p>
            <p>Shares: {engagement.shares} (<span className={engagement.sharesChange < 0 ? "text-red-600" : "text-green-600"}>{engagement.sharesChange}%</span>)</p>
          </div>
          <div className="w-48 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">🚨 Alerts</h3>
        <ul className="list-disc list-inside">
          {alerts.map(alert => (
            <li key={alert.id} className={alert.type === "viral" ? "text-red-600 font-bold" : "text-yellow-700"}>
              {alert.message}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">⚙️ Settings</h3>
        <p>Multi-account posting: {multiAccount ? "✅ Enabled" : "❌ Disabled"}</p>
        <p>Manual override mode: {manualOverride ? "✅ Enabled" : "❌ Disabled"}</p>
        <p>Posting schedule: {postingSchedule}</p>
      </section>
    </div>
  )
}
