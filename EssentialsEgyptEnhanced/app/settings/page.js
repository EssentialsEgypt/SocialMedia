'use client';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/settings/connections');
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Failed to load');
        setConnections(json.connections);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  const disconnect = async (provider) => {
    try {
      const res = await fetch(`/api/auth/${provider}/disconnect`, { method: 'POST' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to disconnect');
      setConnections((prev) => prev.filter((c) => c.provider !== provider));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h2 className="text-xl font-semibold mb-2">Connected Platforms</h2>
      <ul className="space-y-2 mb-8">
        {connections.map((conn) => (
          <li key={conn.provider} className="flex justify-between items-center p-3 bg-white rounded shadow">
            <span className="capitalize">{conn.provider}</span>
            <button
              className="text-red-600 hover:text-red-700"
              onClick={() => disconnect(conn.provider)}
            >
              Disconnect
            </button>
          </li>
        ))}
        {connections.length === 0 && <li>No platforms connected.</li>}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Preferences</h2>
      <p className="text-sm text-gray-600">Preferences management coming soon.</p>
    </div>
  );
}