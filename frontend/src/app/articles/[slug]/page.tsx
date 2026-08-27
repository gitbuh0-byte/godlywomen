'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchArticleBySlug } from '@/lib/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  category: string;
  created_at: string;
  sender_name: string;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const data = await fetchArticleBySlug(slug);
        setArticle(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading article...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;
  if (!article) return <div className="text-center py-20">Article not found</div>;

  return (
    <main className="flex-1 bg-white">
      {article.featured_image && (
        <div className="relative w-full h-96 overflow-hidden bg-gray-100">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-6 py-12\">
        <div className="mb-8">
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
            {article.category}
          </span>
          <h1 className="font-serif text-5xl font-bold my-6 text-black leading-tight">{article.title}</h1>
          <div className="flex items-center justify-between pt-4 border-b border-gray-200 pb-4">
            <div>
              <p className="text-gray-600 font-medium">{article.sender_name}</p>
              <p className="text-gray-500 text-sm">
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none font-light text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </main>
  );
}
