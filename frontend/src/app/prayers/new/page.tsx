"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPrayer } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function NewPrayerPage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    setLoading(true);
    try {
      await createPrayer({ title, description }, accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create prayer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">New Prayer Request</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={6}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Prayer'}
          </button>
        </form>
      </div>
    </main>
  );
}