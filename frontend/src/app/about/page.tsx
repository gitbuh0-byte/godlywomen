'use client';

export default function AboutPage() {
  return (
    <main className="flex-1 bg-white">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2 text-black">About Godly Women</h1>
          <p className="text-gray-600 font-light">Discover and celebrate faithful women through history</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl font-bold text-black mb-6">Our Story</h2>
        <div className="space-y-6 text-gray-700 font-light leading-relaxed">
          <p>
            Godly Women is a vibrant online community dedicated to celebrating and inspiring women of faith. Our platform brings together women from all walks of life who share a common desire to deepen their spiritual journey and grow in their faith.
          </p>
          <p>
            Founded with the belief that women's voices, stories, and experiences matter, Godly Women provides a safe, welcoming space where women can share their testimonies, seek prayer support, discover spiritual resources, and connect with a global community of sisters in faith.
          </p>
          <p>
            Whether you're looking for inspiration, guidance, community support, or a platform to share your own story, Godly Women is here to empower you on your spiritual journey.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-black mb-4">Our Mission</h3>
              <p className="text-gray-700 font-light leading-relaxed">
                To create a global community where women are empowered to grow spiritually, share their faith stories, support one another through prayer, and discover resources that strengthen their relationship with God and with each other.
              </p>
            </div>

            {/* Vision */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-black mb-4">Our Vision</h3>
              <p className="text-gray-700 font-light leading-relaxed">
                A world where every woman feels valued, heard, and supported in her spiritual journey. Where faith communities transcend geographical boundaries and women can access inspiration, guidance, and sisterhood at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl font-bold text-black mb-12 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '✨',
              title: 'Faith',
              description: 'We are rooted in faith and encourage spiritual growth in all its forms'
            },
            {
              icon: '🤝',
              title: 'Community',
              description: 'We believe in the power of sisterhood and mutual support'
            },
            {
              icon: '💪',
              title: 'Empowerment',
              description: 'We empower women to find their voice and share their stories'
            },
            {
              icon: '🌍',
              title: 'Inclusivity',
              description: 'We welcome women from all backgrounds, denominations, and experiences'
            },
            {
              icon: '🛡️',
              title: 'Safety',
              description: 'We maintain a safe, respectful space for all members'
            },
            {
              icon: '📚',
              title: 'Knowledge',
              description: 'We provide access to spiritual resources and wisdom'
            },
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:shadow-md transition">
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="font-semibold text-black mb-2">{value.title}</h3>
              <p className="text-gray-600 font-light text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-black mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Inspiring Stories',
                description: 'Read and share testimonies from women around the world about their faith journeys, challenges, and victories.'
              },
              {
                title: 'Prayer Community',
                description: 'Join prayer circles, share prayer requests, and intercede for one another with compassion and faith.'
              },
              {
                title: 'Marketplace',
                description: 'Discover faith-based resources, products, and services created and recommended by our trusted community.'
              },
              {
                title: 'Global Community',
                description: 'Connect with women from different cultures, backgrounds, and traditions united in faith.'
              },
              {
                title: 'Newsletter',
                description: 'Stay inspired with our weekly newsletter featuring curated stories, insights, and community highlights.'
              },
              {
                title: 'Support & Guidance',
                description: 'Access resources, mentorship, and guidance as you navigate your spiritual journey.'
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-black mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-4xl font-bold text-black mb-6">Join Our Community</h2>
        <p className="text-gray-600 font-light text-lg mb-8 max-w-2xl mx-auto">
          Whether you're seeking inspiration, community, or a platform to share your story, we invite you to join Godly Women today. All are welcome.
        </p>
        <a
          href="/auth/register"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition"
        >
          Get Started
        </a>
      </section>
    </main>
  );
}
