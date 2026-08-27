'use client';

import { useEffect, useState } from 'react';
import { fetchPrayers } from '@/lib/api';

interface Prayer {
  id: number;
  title: string;
  description: string;
  created_at: string;
  sender_name: string;
}

export default function PrayersPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPrayers = async () => {
      try {
        const data = await fetchPrayers();
        setPrayers(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load prayers');
      } finally {
        setLoading(false);
      }
    };

    loadPrayers();
  }, []);

  if (loading) return <div className="text-center py-20">Loading prayers...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  return (
    <main className="flex-1">
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2 text-black">Prayer Requests</h1>
          <p className="text-gray-600 font-light">Join our community in prayer and support</p>
        </div>
      </section>

      <section className="container-custom py-16">
        {prayers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No prayer requests found</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5">
            {prayers.map((prayer) => (
              <div key={prayer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
                <h3 className="font-serif text-xl font-bold text-black mb-3">{prayer.title}</h3>
                <p className="text-gray-600 font-light mb-4 leading-relaxed">{prayer.description}</p>
                <div className="flex justify-between items-center mb-4 pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">by {prayer.sender_name}</span>
                  <span className="text-sm text-gray-500">{new Date(prayer.created_at).toLocaleDateString()}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition text-sm">
                  Pray for this request
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
