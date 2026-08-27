'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export function Navigation() {
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#eadfe4] bg-[#fffdfb]/95 backdrop-blur">
      <div className="container-custom flex h-[72px] items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold tracking-tight text-[#211c22]">
          Godlywomen
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {user && (
            <Link href="/dashboard" className="text-xs font-semibold text-[#514a52] transition hover:text-[#ec174b]">
              Dashboard
            </Link>
          )}
          <Link href="/articles" className="text-xs font-semibold text-[#514a52] transition hover:text-[#ec174b]">
            Explore
          </Link>
          <Link href="/marketplace" className="text-xs font-semibold text-[#514a52] transition hover:text-[#ec174b]">
            Marketplace
          </Link>
          <Link href="/prayers" className="text-xs font-semibold text-[#514a52] transition hover:text-[#ec174b]">
            Community
          </Link>
          {user && (
            <Link href="/messages" className="text-gray-700 hover:text-black transition text-sm">
              Chat
            </Link>
          )}
          <Link href="/about" className="text-xs font-semibold text-[#514a52] transition hover:text-[#ec174b]">About</Link>
          <Link href="/prayers" aria-label="Saved profiles" className="text-[#ec174b]"><Heart size={17} /></Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-xs text-[#514a52]">{user.displayName}</span>
              <button
                onClick={handleLogout}
                className="pink-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-3 flex items-center">
              <Link
                href="/auth/login"
                className="text-xs font-semibold text-[#514a52] transition hover:text-[#ec174b]"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="pink-button"
              >
                Get started
              </Link>
            </div>
          )}
        </div>

        <button
          className="text-[#211c22] md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="space-y-3 border-t border-[#eadfe4] bg-[#fffdfb] px-5 py-4 md:hidden">
          <Link href="/articles" className="block text-gray-700 hover:text-black text-sm">
            Stories
          </Link>
          <Link href="/marketplace" className="block text-gray-700 hover:text-black text-sm">
            Marketplace
          </Link>
          <Link href="/prayers" className="block text-gray-700 hover:text-black text-sm">
            Prayers
          </Link>
          <Link href="/contact" className="block text-gray-700 hover:text-black text-sm">
            Contact
          </Link>
          <Link href="/newsletter" className="block text-gray-700 hover:text-black text-sm">
            Newsletter
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-700 hover:text-black text-sm"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2 pt-2">
              <Link href="/auth/login" className="block text-gray-700 text-sm">
                Login
              </Link>
              <Link href="/auth/register" className="block bg-black text-white px-4 py-2 rounded-full text-sm font-medium text-center">
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
