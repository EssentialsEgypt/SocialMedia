'use client';
import { useEffect, useState } from 'react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [platform, setPlatform] = useState('facebook');
  const [content, setContent] = useState('');
  const [threadId, setThreadId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/messages/list');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to fetch messages');
        setMessages(json.messages);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  const send = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, threadId, content })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to send');
      setContent('');
      setThreadId('');
      // reload messages
      const res2 = await fetch('/api/messages/list');
      const json2 = await res2.json();
      setMessages(json2.messages);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={send} className="space-y-4 mb-8">
        <div className="flex space-x-2">
          <select
            className="border rounded p-2"
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
          <input
            type="text"
            placeholder="Thread ID (optional)"
            className="flex-1 border rounded p-2"
            value={threadId}
            onChange={(e) => setThreadId(e.target.value)}
          />
        </div>
        <textarea
          className="w-full border rounded p-2 h-24"
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="p-3 bg-white rounded shadow">
            <div className="text-xs text-gray-500 flex justify-between mb-1">
              <span className="font-semibold">{msg.platform}</span>
              <span>{new Date(msg.created_at).toLocaleString()}</span>
            </div>
            <p>{msg.content}</p>
          </div>
        ))}
        {messages.length === 0 && <p>No messages yet.</p>}
      </div>
    </div>
  );
}