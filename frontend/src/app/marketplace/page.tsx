'use client';

import { useEffect, useState } from 'react';
import { fetchMarketplace } from '@/lib/api';

interface MarketplaceItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  created_at: string;
}

export default function MarketplacePage() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchMarketplace();
        setItems(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load marketplace items');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) return <div className="text-center py-20">Loading marketplace...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  return (
    <main className="flex-1">
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2 text-black">Marketplace</h1>
          <p className="text-gray-600 font-light">Discover resources and products from our community</p>
        </div>
      </section>

      <section className="container-custom py-16">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No items found in marketplace</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all group">
                {item.image && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-serif text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-purple-600 transition">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-light line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${item.price}</span>
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:shadow-md transition">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
