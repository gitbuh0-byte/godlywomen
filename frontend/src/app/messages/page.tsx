"use client";

import { useEffect, useState } from "react";
import { fetchMessages, fetchUsers, sendMessage } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function MessagesPage() {
  const { accessToken } = useAuthStore();
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const [m, u] = await Promise.all([
          fetchMessages(accessToken),
          fetchUsers(accessToken),
        ]);
        setMessages(m || []);
        setUsers(u || []);
      } catch (err: any) {
        setError(err.message || "Failed to load chat");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [accessToken]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !receiverId || !content) return;
    try {
      const res = await sendMessage(parseInt(receiverId, 10), content, accessToken);
      setMessages((prev) => [...prev, res]);
      setContent("");
    } catch (err: any) {
      setError(err.message || "Failed to send message");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="mb-6">
          <form onSubmit={handleSend} className="flex space-x-2">
            <select
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.displayName || u.email}
                </option>
              ))}
            </select>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Message"
              className="flex-1 border px-2 py-1 rounded"
            />
            <button type="submit" className="bg-purple-600 text-white px-4 rounded">
              Send
            </button>
          </form>
        </div>
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="border p-2 rounded">
              <p className="text-sm"><strong>To:</strong> {m.receiverId}</p>
              <p>{m.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}