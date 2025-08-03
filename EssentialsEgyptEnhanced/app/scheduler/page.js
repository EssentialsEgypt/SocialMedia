'use client';
import { useState } from 'react';

export default function SchedulerPage() {
  const [platform, setPlatform] = useState('facebook');
  const [content, setContent] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('/api/scheduler/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, content, scheduledAt })
      });
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || 'Failed to schedule');
      }
      setMessage('Post scheduled successfully');
      setContent('');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Content Scheduler</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Platform</label>
          <select
            className="w-full border rounded p-2"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="google">Google</option>
            <option value="linkedin">LinkedIn</option>
            <option value="snapchat">Snapchat</option>
            <option value="twitter">Twitter</option>
            <option value="shopify">Shopify</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            className="w-full border rounded p-2 h-24"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Schedule At</label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Schedule
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-blue-700">{message}</p>}
    </div>
  );
}