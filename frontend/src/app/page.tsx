"use client";

import Link from 'next/link';
import { ArrowRight, BadgeCheck, Heart, MapPin, ShieldCheck, Star } from 'lucide-react';

const profiles = [
  { name: "Aisha Jade", role: "Valencia", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=80", reviews: 24 },
  { name: "Alana Rivers", role: "Madrid", image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=500&q=80", reviews: 18 },
  { name: "Maya Williams", role: "Barcelona", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=500&q=80", reviews: 31 },
  { name: "Amelia Rose", role: "Valencia", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80", reviews: 16 },
  { name: "Isla Quinn", role: "Alicante", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80", reviews: 28 },
];

const pillars = [
  [ShieldCheck, "Authentic Reviews", "Real community feedback"],
  [BadgeCheck, "Professional Profiles", "Find the right connection"],
  [MapPin, "Valencia Focused", "Your local community first"],
  [Heart, "Human Moderation", "Every profile reviewed by our team"],
];

export default function Home() {
  return (
    <main className="bg-[#f8f7f5]">
      <section className="editorial-grid relative overflow-hidden px-5 pb-28 pt-12 sm:px-8 sm:pt-20">
        <div className="container-custom relative grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative z-10 max-w-xl animate-fade-in-up">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.25em] text-[#ec174b]">Meet people worth knowing</p>
            <h1 className="font-serif text-5xl font-bold leading-[1.08] text-[#211c22] sm:text-7xl">Find your people in <span className="text-[#ec174b]">Valencia.</span></h1>
            <p className="mt-6 max-w-md text-lg leading-8 text-[#655d65]">A trusted place to discover real profiles, honest reviews, and genuine community connections.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles" className="pink-button">Explore profiles <ArrowRight size={14} className="ml-2" /></Link>
              <Link href="/auth/register" className="outline-button">Join the community</Link>
            </div>
          </div>
          <div className="relative min-h-[410px] overflow-hidden rounded-[2rem] bg-[#f4d6e2] shadow-[0_25px_70px_rgba(89,21,54,.16)]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7d9e7]/95 via-[#f7d9e7]/20 to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-[235px] rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
              <div className="mb-2 flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffe3eb] text-[#ec174b]"><ShieldCheck size={16} /></span><span className="text-xs font-bold">100% community verified</span></div>
              <p className="text-xs leading-5 text-[#655d65]">Every profile is reviewed to keep your experience genuine.</p>
            </div>
          </div>
        </div>
        <div className="container-custom relative -mb-40 mt-[-3rem] lg:mt-[-4rem]">
          <div className="grid gap-3 rounded-2xl bg-gradient-to-r from-[#ffc95d] via-[#ff764e] to-[#ec174b] p-3 shadow-xl sm:grid-cols-[1fr_170px_130px]">
            <input className="rounded-full border-0 bg-white/90 px-5 py-3 text-sm outline-none placeholder:text-[#9a858f]" placeholder="Search profiles or providers" />
            <select className="rounded-full border-0 bg-white/90 px-5 py-3 text-sm text-[#655d65] outline-none"><option>Valencia</option><option>Barcelona</option><option>Madrid</option></select>
            <button className="rounded-full bg-[#211c22] px-4 py-3 text-xs font-bold uppercase text-white transition hover:bg-[#4c3040]">Search</button>
          </div>
        </div>
      </section>

      <section className="container-custom pb-20 pt-52 sm:pt-48">
        <div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">The community</p><h2 className="mt-2 font-serif text-3xl font-bold">Top rated profiles</h2><p className="mt-2 text-sm text-[#81757e]">Discover trusted people in your area</p></div><Link href="/articles" className="hidden text-xs font-bold uppercase text-[#ec174b] sm:block">View more <ArrowRight size={14} className="ml-1 inline" /></Link></div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {profiles.map((profile) => <article key={profile.name} className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="aspect-[.8] bg-cover bg-center" style={{ backgroundImage: `url(${profile.image})` }} /><div className="p-3"><h3 className="text-sm font-bold">{profile.name}</h3><p className="mt-1 flex items-center gap-1 text-[11px] text-[#81757e]"><MapPin size={11} />{profile.role} <span className="ml-auto">{profile.reviews} reviews</span></p><Link href="/articles" className="outline-button mt-3 w-full !px-2 !py-2 !text-[10px]">View profile</Link></div></article>)}
        </div>
      </section>

      <section className="overflow-hidden bg-[#3b0d2d] text-white">
        <div className="container-custom grid items-center gap-10 py-20 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ff7393]">Why choose us?</p><h2 className="mt-3 font-serif text-4xl font-bold">A better way to connect.</h2><p className="mt-4 max-w-md leading-7 text-[#d9bccc]">Thoughtful tools and real people make every introduction feel more human.</p></div>
          <div className="grid grid-cols-2 gap-3">{pillars.map(([Icon, title, copy]) => <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[.08] p-5"><Icon size={22} className="text-[#ff557b]" /><h3 className="mt-5 text-sm font-bold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-[#d9bccc]">{copy as string}</p></div>)}</div>
        </div>
      </section>

      <section className="container-custom py-20"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">Trusted locally</p><h2 className="mt-2 font-serif text-3xl font-bold">Featured providers</h2></div><Link href="/marketplace" className="text-xs font-bold uppercase text-[#ec174b]">View more <ArrowRight size={14} className="ml-1 inline" /></Link></div><div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><div className="flex h-32 items-center justify-center rounded-xl bg-[#211c22] font-serif text-xl text-white">Forera</div><div className="flex h-32 items-center justify-center rounded-xl bg-[#d6c9b5] font-serif text-xl text-[#3b0d2d]">Casa Verde</div><div className="flex h-32 items-center justify-center rounded-xl bg-[#83133d] font-serif text-xl text-white">Lush</div><div className="flex h-32 items-center justify-center rounded-xl bg-[#dfb9c7] font-serif text-xl text-[#3b0d2d]">Noblesse</div></div></section>

      <section className="bg-white"><div className="container-custom py-20"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#ec174b]">Kind words</p><h2 className="mt-2 font-serif text-3xl font-bold">What our community says</h2></div><div className="grid gap-4 md:grid-cols-3">{["Great experience overall. The profile details were accurate, and the communication was smooth and discreet.", "The service was excellent; the companion was punctual, polite, and made me feel very comfortable throughout.", "The companion was exactly as described, friendly, elegant, and easy to talk to."] .map((quote, index) => <figure key={quote} className="rounded-xl border border-[#eee5e8] p-6"><div className="flex gap-1 text-[#ec174b]">{[1,2,3,4,5].map((star) => <Star key={star} size={13} fill="currentColor" />)}</div><blockquote className="mt-5 font-serif text-lg leading-8 text-[#3c333b]">“{quote}”</blockquote><figcaption className="mt-6 border-l-2 border-[#ec174b] pl-3 text-xs font-bold">{["Adut Mabor", "Sarah James", "Mia Clark"][index]}<span className="block font-normal text-[#81757e]">Community member</span></figcaption></figure>)}</div></div></section>

      <section className="bg-[linear-gradient(110deg,#5d123c,#e4335e)] text-white"><div className="container-custom flex flex-col items-start justify-between gap-7 py-16 md:flex-row md:items-center"><div><h2 className="font-serif text-3xl font-bold sm:text-4xl">Join a more genuine community.</h2><p className="mt-3 max-w-lg text-sm text-white/75">Meet real people, share your story, and discover trusted connections in Valencia.</p></div><Link href="/auth/register" className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#ec174b]">Become a member</Link></div></section>
    </main>
  );
}
