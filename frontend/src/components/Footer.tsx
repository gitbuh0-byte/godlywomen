'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-[#e8e3e5] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-8 md:px-8">
        <div className="mb-8 grid gap-8 md:grid-cols-[1.5fr_0.9fr_0.9fr_1.2fr]">
          <div>
            <h3 className="mb-3 font-serif text-[2rem] font-bold leading-none tracking-[-0.04em] text-black">
              Godlywomen
            </h3>
            <p className="max-w-[26rem] text-sm font-light leading-6 text-[#5a5259]">
              A community platform where women share faith, inspiration, and spiritual wisdom.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-black">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/articles" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/prayers" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Prayers
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-black">Community</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Newsletter
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/terms-privacy" className="text-[15px] text-[#3e383d] transition hover:text-[#ec174b]">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-black">Stay Updated</h4>
            <p className="mb-4 max-w-[18rem] text-sm font-light leading-6 text-[#5a5259]">
              Subscribe to our newsletter for inspiring stories and updates.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8d3dff] to-[#de3ea7] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
            >
              Subscribe
            </Link>
          </div>
        </div>

        <div className="border-t border-[#eee6e8] pt-6">
          <p className="text-sm font-light text-[#5a5259]">
            © {currentYear} Godlywomen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
