'use client';

import { useState } from 'react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [preferences, setPreferences] = useState({
    stories: true,
    prayers: true,
    marketplace: false,
    events: true,
  });

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate subscription
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <main className="flex-1 bg-white">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2 text-black">Our Newsletter</h1>
          <p className="text-gray-600 font-light">Stay connected with inspiring stories, prayer requests, and community updates delivered directly to your inbox.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Benefits */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-black mb-6">Why Subscribe?</h2>
            <div className="space-y-4">
              {[
                {
                  icon: '📖',
                  title: 'Inspiring Stories',
                  desc: 'Get curated articles and testimonies from our community'
                },
                {
                  icon: '🙏',
                  title: 'Prayer Requests',
                  desc: 'Receive weekly prayer requests and intercession opportunities'
                },
                {
                  icon: '🛍️',
                  title: 'Exclusive Deals',
                  desc: 'Access special offers from our marketplace partners'
                },
                {
                  icon: '✨',
                  title: 'Expert Tips',
                  desc: 'Learn from spiritual leaders and mentors in our community'
                },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-black">{item.title}</h3>
                      <p className="text-gray-600 font-light text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Form */}
          <div>
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <h3 className="font-serif text-2xl font-bold text-black mb-6">Subscribe Now</h3>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                  <p className="font-medium">Welcome! Check your email to confirm your subscription.</p>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 text-sm mb-3">What interests you?</h4>
                  <div className="space-y-3">
                    {[
                      { key: 'stories', label: 'Inspiring Stories' },
                      { key: 'prayers', label: 'Prayer Requests' },
                      { key: 'marketplace', label: 'Marketplace Updates' },
                      { key: 'events', label: 'Community Events' },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[item.key as keyof typeof preferences]}
                          onChange={() => handlePreferenceChange(item.key as keyof typeof preferences)}
                          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-gray-700 text-sm">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-medium hover:shadow-lg disabled:opacity-50 transition"
                >
                  {loading ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Samples */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-center mb-12">What You'll Receive</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Weekly Digest',
                content: 'A curated selection of the week\'s best stories, prayers, and community updates delivered every Monday morning.'
              },
              {
                title: 'Prayer Circle',
                content: 'Receive prayer requests from our community members and be part of our weekly intercession gatherings.'
              },
              {
                title: 'Exclusive Content',
                content: 'Access behind-the-scenes stories and articles not available anywhere else on the platform.'
              },
              {
                title: 'Special Events',
                content: 'Get early invitations to webinars, workshops, and special community events just for subscribers.'
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition">
                <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-gray-600 font-light text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="font-serif text-4xl font-bold text-center mb-12">What Our Subscribers Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "The newsletter keeps me connected to an amazing community of faithful women. Every story inspires me.",
              author: "Sarah M.",
              role: "Subscriber since 2024"
            },
            {
              quote: "I look forward to Monday mornings now! The curated content is exactly what I need to start my week right.",
              author: "Jessica T.",
              role: "Subscriber since 2024"
            },
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
              <p className="text-gray-700 font-light mb-4 italic">"{item.quote}"</p>
              <div>
                <p className="font-semibold text-black text-sm">{item.author}</p>
                <p className="text-gray-600 text-xs">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
