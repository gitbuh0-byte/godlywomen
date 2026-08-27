'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-8\">
      <div className="max-w-7xl mx-auto px-6 py-8\">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-black mb-3\">Godly Women</h3>
            <p className="text-gray-600 text-sm font-light">
              A community platform where women share faith, inspiration, and spiritual wisdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-black mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/prayers" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Prayers
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-black mb-3 text-sm uppercase tracking-wide">Community</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms-privacy" className="text-gray-600 hover:text-purple-600 transition text-sm">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold text-black mb-3 text-sm uppercase tracking-wide">Stay Updated</h4>
            <p className="text-gray-600 text-sm font-light mb-3">
              Subscribe to our newsletter for inspiring stories and updates.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition"
            >
              Subscribe
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm font-light mb-2 md:mb-0">
              © {currentYear} Godly Women. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
