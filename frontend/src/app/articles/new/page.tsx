"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

export default function NewArticlePage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
    setLoading(true);
    try {
      await createArticle({ title, slug, excerpt, content }, accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">New Article</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Excerpt"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Article'}
          </button>
        </form>
      </div>
    </main>
  );
}