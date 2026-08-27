"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import {
  fetchMyArticles,
  fetchMyPrayers,
  fetchMyMarketplace,
  fetchUsers,
  sendMessage,
  fetchMessages,
} from "@/lib/api";

export default function DashboardPage() {
  const { user, accessToken } = useAuthStore();
  const [articles, setArticles] = useState<any[]>([]);
  const [prayers, setPrayers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [marketplace, setMarketplace] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [a, p, m, mp] = await Promise.all([
          accessToken ? fetchMyArticles(accessToken) : Promise.resolve([]),
          accessToken ? fetchMyPrayers(accessToken) : Promise.resolve([]),
          accessToken ? fetchMessages(accessToken) : Promise.resolve([]),
          accessToken ? fetchMyMarketplace(accessToken) : Promise.resolve([]),
        ]);

        setArticles(a || []);
        setPrayers(p || []);
        setMessages(m || []);
        setMarketplace(mp || []);
      } catch (err: any) {
        console.error("Dashboard load error:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [accessToken]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <p className="mt-2 text-gray-600">Please log in to see your dashboard.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.displayName || user.email}!</h1>
            <p className="text-sm text-gray-600 mt-1">Here's a quick overview of your activity.</p>
          </div>
          <Link href="/profile" className="text-sm text-purple-600 hover:underline">
            Edit Profile
          </Link>
        </header>

        {loading ? (
          <div className="text-center py-12">Loading dashboard...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">Error: {error}</div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Articles</h3>
                <Link href="/articles/new" className="text-sm text-purple-600 hover:underline">
                  + New
                </Link>
              </div>
              <p className="text-4xl font-bold mt-4">{articles?.length ?? 0}</p>
              <ul className="mt-4 space-y-2">
                {articles.slice(0,5).map((a: any) => (
                  <li key={a.id} className="text-sm text-gray-700">{a.title}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Prayers</h3>
                <Link href="/prayers/new" className="text-sm text-purple-600 hover:underline">
                  + New
                </Link>
              </div>
              <p className="text-4xl font-bold mt-4">{prayers?.length ?? 0}</p>
              <ul className="mt-4 space-y-2">
                {prayers.slice(0,5).map((p: any, i: number) => (
                  <li key={i} className="text-sm text-gray-700">{p.title}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Marketplace</h3>
                <Link href="/marketplace/new" className="text-sm text-purple-600 hover:underline">
                  + New
                </Link>
              </div>
              <p className="text-4xl font-bold mt-4">{marketplace?.length ?? 0}</p>
              <ul className="mt-4 space-y-2">
                {marketplace.slice(0,5).map((i: any) => (
                  <li key={i.id} className="text-sm text-gray-700">{i.title}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Messages</h3>
                <Link href="/messages" className="text-sm text-purple-600 hover:underline">
                  Open chat
                </Link>
              </div>
              <p className="text-4xl font-bold mt-4">{messages?.length ?? 0}</p>
              <ul className="mt-4 space-y-2">
                {messages.slice(0,5).map((m: any) => (
                  <li key={m.id} className="text-sm text-gray-700">{m.content || '—'}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
