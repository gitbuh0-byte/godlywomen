'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchArticles } from '@/lib/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string;
  created_at: string;
  sender_name: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <div className="text-center py-20">Loading articles...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  return (
    <main className="flex-1">
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2 text-black">Stories</h1>
          <p className="text-gray-600 font-light">Read inspiring stories from our community</p>
        </div>
      </section>

      <section className="container-custom py-16">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                  {article.featured_image && (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase mb-2 tracking-wide">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-black mb-2 line-clamp-2 group-hover:text-purple-600 transition">{article.title}</h3>
                    <p className="text-gray-600 text-sm font-light line-clamp-3 flex-1 mb-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">{article.sender_name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
