"use client";

import Link from 'next/link';
import { ArrowRight, BookOpen, Heart, MessageCircle, Users, ShoppingBag, Star } from 'lucide-react';

const pathways = [
  { icon: BookOpen, title: 'Stories that strengthen', copy: 'Read honest testimonies, devotionals, and wisdom from women walking with God.', href: '/articles', label: 'Explore stories' },
  { icon: Heart, title: 'Prayer that carries us', copy: 'Bring your requests, celebrate answered prayers, and stand with sisters around the world.', href: '/prayers', label: 'Enter the prayer room' },
  { icon: ShoppingBag, title: 'Resources with purpose', copy: 'Find books, tools, and thoughtful work created by women in our community.', href: '/marketplace', label: 'Visit the marketplace' },
  { icon: Users, title: 'A table for everyone', copy: 'Meet women from different backgrounds who are making space for faith, questions, and friendship.', href: '/about', label: 'Meet the sisterhood' },
];

const values = [
  ['Faith first', 'A place to seek God, ask questions, and grow without pretending.'],
  ['Sisterhood', 'Encouragement, accountability, and friendship across every season.'],
  ['Room to become', 'A thoughtful space for your voice, your story, and your next step.'],
  ['Open hands', 'We share what we have learned and make room for someone else to flourish.'],
];

const testimonials = [
  ['Godly Women gave me language for a season I could not explain. I found prayer, patience, and women who truly listened.', 'Adut Mabor'],
  ['I came for the stories and stayed for the sisterhood. There is a gentleness here that makes honesty feel possible.', 'Sarah James'],
  ['The prayer community reminded me that I do not have to carry everything alone. This space feels like home.', 'Mia Clark'],
];

const featuredVoices = [
  { name: 'Aisha', role: 'Faith & purpose', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=85' },
  { name: 'Grace', role: 'Prayer & rest', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=500&q=85' },
  { name: 'Maya', role: 'Stories & courage', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=85' },
  { name: 'Amelia', role: 'Work & calling', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=85' },
  { name: 'Isla', role: 'Community guide', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=85' },
];

export default function Home() {
  return (
    <main className="bg-[#f8f7f5]">
      <section className="editorial-grid relative mx-4 mt-4 overflow-hidden rounded-[1.9rem] bg-[linear-gradient(135deg,#f4dfe6_0%,#f9e8ee_45%,#f0dcd1_100%)] px-5 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12">
        <div className="absolute inset-y-0 right-[2%] hidden w-[45%] bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=90')] bg-cover bg-center bg-no-repeat opacity-90 lg:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4dfe6] via-[#f4dfe6]/95 to-[#f4dfe6]/15 lg:from-[#f4dfe6] lg:via-[#f4dfe6]/90 lg:to-transparent" />

        <div className="container-custom relative z-10 grid min-h-[470px] items-center lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-[700px] animate-fade-in-up">
            <h1 className="hero-headline max-w-[540px]">
              A sisterhood for women who want to <span className="text-[#ec174b]">grow with God.</span>
            </h1>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/auth/register" className="inline-flex items-center rounded-full bg-[#ec174b] px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_10px_25px_rgba(236,23,75,0.25)] transition hover:brightness-105">
                Join the sisterhood <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link href="/about" className="inline-flex items-center rounded-full border border-[#ec174b] bg-transparent px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#ec174b] transition hover:bg-[#ec174b]/5">
                Learn about us
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[420px] items-center justify-center lg:flex">
            <div className="absolute left-12 top-10 h-52 w-52 rounded-full bg-white/15 blur-2xl" />
            <div className="relative h-[420px] w-[350px] overflow-hidden rounded-[2rem] border-[6px] border-white/80 bg-white/10 shadow-[0_25px_60px_rgba(121,57,92,0.2)] backdrop-blur-sm">
              <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=90')] bg-cover bg-center" />
            </div>

            <div className="absolute right-8 top-10 rounded-2xl border border-[#e8dfe3] bg-white/90 p-3 shadow-xl backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#211c22]">Trusted</span>
                <span className="rounded-full bg-[#f3e7eb] px-2 py-1 text-[9px] font-bold text-[#ec174b]">100%</span>
              </div>
              <div className="space-y-2">
                {['Aisha', 'Maya', 'Nia', 'Grace'].map((name, index) => (
                  <div key={name} className="flex items-center gap-2 text-[10px] text-[#514a52]">
                    <div className="h-6 w-6 rounded-full bg-[linear-gradient(135deg,#faccd8,#d0b1ff)]" />
                    <div className="min-w-0">
                      <div className="font-semibold text-[#211c22]">{name}</div>
                      <div className="text-[9px] text-[#7a6b72]">{index % 2 === 0 ? 'Prayer' : 'Community'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom relative z-10 mt-10">
          <div className="grid gap-3 rounded-full bg-gradient-to-r from-[#f4d66d] via-[#f39d5c] to-[#ec174b] p-2 shadow-[0_16px_35px_rgba(236,23,75,0.3)] sm:grid-cols-[1.3fr_0.9fr_0.75fr]">
            <input className="rounded-full border-0 bg-white/95 px-5 py-4 text-base text-[#211c22] outline-none placeholder:text-[#7a6b72]" placeholder="Search stories, prayers, and resources" aria-label="Search stories, prayers, and resources" />
            <select className="rounded-full border-0 bg-white/95 px-5 py-4 text-base text-[#655d65] outline-none" aria-label="Choose a category"><option>All categories</option><option>Stories</option><option>Prayers</option><option>Resources</option></select>
            <Link href="/articles" className="flex items-center justify-center rounded-full bg-[#211c22] px-4 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#3c2a31]">Explore</Link>
          </div>
        </div>
      </section>

      <section className="container-custom pb-20 pt-16 sm:pb-24"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">Featured voices</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#211c22]">Women worth listening to</h2><p className="mt-2 text-sm text-[#81757e]">Stories and wisdom from across the sisterhood.</p></div><Link href="/articles" className="hidden text-xs font-bold uppercase text-[#ec174b] sm:block">View all stories <ArrowRight size={14} className="ml-1 inline" /></Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">{featuredVoices.map((voice) => <article key={voice.name} className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="aspect-[.82] bg-cover bg-center" style={{ backgroundImage: `url(${voice.image})` }} /><div className="p-3"><h3 className="text-sm font-bold text-[#211c22]">{voice.name}</h3><p className="mt-1 text-[11px] text-[#81757e]">{voice.role}</p><Link href="/articles" className="outline-button mt-3 w-full !px-2 !py-2 !text-[10px]">Read story</Link></div></article>)}</div></section>

      <section className="container-custom py-20 sm:py-24">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">The GodlyWomen way</p><h2 className="mt-3 font-serif text-4xl font-bold text-[#211c22] sm:text-5xl">Faith is better when we practice it together.</h2></div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{pathways.map(({ icon: Icon, title, copy, href, label }) => <article key={title} className="border-t-2 border-[#ec174b] bg-white p-7 shadow-sm"><Icon size={24} className="text-[#ec174b]" /><h3 className="mt-8 font-serif text-2xl font-bold text-[#211c22]">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-[#655d65]">{copy}</p><Link href={href} className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-wide text-[#ec174b]">{label}<ArrowRight size={14} className="ml-2" /></Link></article>)}</div>
      </section>

      <section className="overflow-hidden bg-[#3b0d2d] text-white"><div className="container-custom grid gap-12 py-20 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff9eb2]">What guides us</p><h2 className="mt-3 font-serif text-4xl font-bold">A softer place to be brave.</h2><p className="mt-5 max-w-md leading-7 text-[#e6cbd4]">We make room for questions, celebration, grief, growth, and the quiet work of becoming more like Christ.</p></div><div className="grid gap-3 sm:grid-cols-2">{values.map(([title, copy]) => <div key={title} className="border border-white/15 bg-white/[.04] p-5"><h3 className="font-serif text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#e6cbd4]">{copy}</p></div>)}</div></div></section>

      <section className="container-custom py-20 sm:py-24"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">Made by sisters</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#211c22]">Resources for the journey</h2><p className="mt-2 text-sm text-[#81757e]">Thoughtful tools for faith, rest, and everyday life.</p></div><Link href="/marketplace" className="hidden text-xs font-bold uppercase text-[#ec174b] sm:block">View marketplace <ArrowRight size={14} className="ml-1 inline" /></Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><Link href="/marketplace" className="flex h-32 items-center justify-center bg-[#211c22] px-4 text-center font-serif text-xl text-white transition hover:-translate-y-1">Devotionals</Link><Link href="/marketplace" className="flex h-32 items-center justify-center bg-[#d6c9b5] px-4 text-center font-serif text-xl text-[#3b0d2d] transition hover:-translate-y-1">Prayer tools</Link><Link href="/marketplace" className="flex h-32 items-center justify-center bg-[#83133d] px-4 text-center font-serif text-xl text-white transition hover:-translate-y-1">Journals</Link><Link href="/marketplace" className="flex h-32 items-center justify-center bg-[#dfb9c7] px-4 text-center font-serif text-xl text-[#3b0d2d] transition hover:-translate-y-1">Gifts</Link></div></section>

      <section className="bg-white"><div className="container-custom py-20"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">Kind words</p><h2 className="mt-2 font-serif text-3xl font-bold text-[#211c22]">What the sisterhood is saying</h2></div><div className="grid gap-4 md:grid-cols-3">{testimonials.map(([quote, name]) => <figure key={name} className="border border-[#eee5e8] p-6"><div className="flex gap-1 text-[#ec174b]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div><blockquote className="mt-5 font-serif text-lg leading-8 text-[#3c333b]">&quot;{quote}&quot;</blockquote><figcaption className="mt-6 border-l-2 border-[#ec174b] pl-3 text-xs font-bold">{name}<span className="block font-normal text-[#81757e]">Godly Women member</span></figcaption></figure>)}</div></div></section>

      <section className="bg-[linear-gradient(110deg,#5d123c,#e4335e)] text-white"><div className="container-custom flex flex-col items-start justify-between gap-7 py-16 md:flex-row md:items-center"><div><h2 className="font-serif text-3xl font-bold sm:text-4xl">You do not have to walk alone.</h2><p className="mt-3 max-w-lg text-sm text-white/75">Join women choosing faith, friendship, and courage for the next step.</p></div><Link href="/auth/register" className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#ec174b]">Join Godly Women</Link></div></section>

      <section className="bg-[#f8f7f5]"><div className="container-custom flex items-center gap-4 py-10 text-sm text-[#655d65]"><MessageCircle size={18} className="text-[#ec174b]" /><span>There is always room for one more sister at the table.</span></div></section>
    </main>
  );
}
