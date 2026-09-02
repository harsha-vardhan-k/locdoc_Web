'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, MapPin, Stethoscope, Pill, FlaskConical, ChevronDown, CheckCircle2, AlertTriangle, Star } from 'lucide-react';

const SERVICE_MODES = [
  {
    id: 'doctors',
    label: 'Find Doctors',
    icon: Stethoscope,
    placeholder: 'Search by doctor, specialty, clinic…',
    href: '/doctors-listing-page',
    accent: 'text-blue-300',
    badge: 'Live slots',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    description: 'Book verified doctors with live availability',
  },
  {
    id: 'medicines',
    label: 'Buy Medicines',
    icon: Pill,
    placeholder: 'Search medicines, brands, generics…',
    href: '/medicines-page',
    accent: 'text-cyan-300',
    badge: 'Compare prices',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    description: 'Compare prices across nearby pharmacies',
  },
  {
    id: 'labs',
    label: 'Book Lab Tests',
    icon: FlaskConical,
    placeholder: 'Search lab tests, diagnostics…',
    href: '/lab-tests',
    accent: 'text-purple-300',
    badge: 'Home collection',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    description: 'Compare labs and book home sample collection',
  },
];

const CITIES = ['Hyderabad', 'Bengaluru', 'Mumbai'];

const FLOATING_EVENTS = [
  { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/15', label: 'Dr. Priya Venkataraman', sub: 'Cardiologist · On time', time: '2m ago' },
  { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/15', label: 'Dr. Kiran Reddy', sub: 'Running 15 min late · Notified', time: '5m ago' },
  { icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/15', label: '4.9 rating', sub: 'Dr. Sunita Rao · Gynaecologist', time: 'Just now' },
];

export default function HeroSection() {
  const [activeMode, setActiveMode] = useState(0);
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [mounted, setMounted] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveCard((i) => (i + 1) % FLOATING_EVENTS?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const mode = SERVICE_MODES?.[activeMode];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center"
      style={{
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 35%, #0a1628 65%, #060d1f 100%)',
      }}
    >
      {/* Atmospheric glow layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-5%] w-[55%] h-[60%] rounded-full opacity-30 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[55%] rounded-full opacity-25 animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.35) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[30%] right-[20%] w-[30%] h-[35%] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT — Copy + Search */}
          <div className={`flex flex-col gap-8 ${mounted ? 'animate-slide-in-left' : 'opacity-0'}`}>
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              India&apos;s first ghosting-prevention healthcare platform
            </div>

            {/* Headline */}
            <div>
              <h1 className="hero-headline text-white mb-4">
                Healthcare that{' '}
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  actually shows up.
                </span>
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                Verified doctors. Best medicine prices. Lab tests at home — with live wait times, always.
              </p>
            </div>

            {/* Search card — glassmorphism */}
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Mode tabs */}
              <div className="flex border-b border-white/10">
                {SERVICE_MODES?.map((m, i) => (
                  <button
                    key={`mode-${m?.id}`}
                    onClick={() => setActiveMode(i)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all duration-200 ${
                      activeMode === i
                        ? 'bg-white/10 text-white border-b-2 border-blue-400' :'text-white/40 hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <m.icon size={14} />
                    <span className="hidden sm:inline">{m?.label}</span>
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <div className="p-4 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-shrink-0">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e?.target?.value)}
                    className="pl-8 pr-7 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white appearance-none cursor-pointer hover:border-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-400/50"
                  >
                    {CITIES?.map((c) => (
                      <option key={`city-opt-${c}`} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>

                <div className="flex-1 relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e?.target?.value)}
                    placeholder={mode?.placeholder}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/30 transition-colors"
                  />
                </div>

                <Link
                  href={`${mode?.href}?q=${encodeURIComponent(query)}&city=${encodeURIComponent(city)}`}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0 transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', color: '#fff' }}
                >
                  <Search size={14} />
                  <span className="hidden sm:inline">Search</span>
                </Link>
              </div>

              <div className="px-4 pb-3 flex items-center justify-between">
                <span className={`text-xs ${mode?.accent}`}>{mode?.description}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${mode?.badgeColor}`}>
                  {mode?.badge}
                </span>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2">
              {['General Physician', 'Paediatrician', 'Dermatologist', 'Cardiologist', 'Gynaecologist']?.map((s) => (
                <Link
                  key={`quick-${s}`}
                  href={`/doctors-listing-page?specialty=${encodeURIComponent(s?.toLowerCase())}`}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/50 hover:border-blue-400/40 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT — Floating stat cards */}
          <div className={`hidden lg:flex flex-col gap-5 relative ${mounted ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Big stat card */}
            <div className="glass-card rounded-3xl p-7 animate-float">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Platform stats</p>
                  <p className="stat-number text-white">2,400<span className="text-blue-400">+</span></p>
                  <p className="text-white/60 text-sm mt-1">NMC Verified Doctors</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
                  <span className="text-emerald-300 text-xs font-semibold">Live</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/8">
                {[
                  { val: '94%', label: 'On-time rate' },
                  { val: '3', label: 'Cities' },
                  { val: '48h', label: 'Verification' },
                ]?.map((s) => (
                  <div key={s?.label}>
                    <p className="text-2xl font-black text-white leading-none tracking-tight">{s?.val}</p>
                    <p className="text-white/40 text-[11px] mt-1">{s?.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live activity feed card */}
            <div className="glass-card rounded-2xl overflow-hidden animate-float-delayed">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-semibold text-white/70">Live Queue Monitor</span>
                </div>
                <span className="text-[10px] text-white/30">Simulated</span>
              </div>
              <div className="divide-y divide-white/5">
                {FLOATING_EVENTS?.map((ev, i) => (
                  <div
                    key={`fev-${i}`}
                    className={`flex items-center gap-3 px-5 py-3 transition-all duration-500 ${
                      activeCard === i ? 'bg-white/8' : 'opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${ev?.bg}`}>
                      <ev.icon size={14} className={ev?.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{ev?.label}</p>
                      <p className="text-[11px] text-white/40 truncate">{ev?.sub}</p>
                    </div>
                    <span className="text-[10px] text-white/30 flex-shrink-0">{ev?.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row — two small cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-5 animate-float">
                <p className="text-white/40 text-[11px] uppercase tracking-widest mb-2">Ghosting reduction</p>
                <p className="text-4xl font-black text-white leading-none tracking-tight">82<span className="text-cyan-400">%</span></p>
                <p className="text-white/40 text-xs mt-2">Doctors who actually show up</p>
              </div>
              <div className="glass-card rounded-2xl p-5 animate-float-delayed">
                <p className="text-white/40 text-[11px] uppercase tracking-widest mb-2">Patients served</p>
                <p className="text-4xl font-black text-white leading-none tracking-tight">18k<span className="text-purple-400">+</span></p>
                <p className="text-white/40 text-xs mt-2">Across pilot cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats bar — mobile */}
        <div className="flex lg:hidden flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/8">
          {[
            { value: '2,400+', label: 'Verified Doctors' },
            { value: '94%', label: 'On-time rate' },
            { value: '3 Cities', label: 'Coverage' },
            { value: '48hrs', label: 'Avg verification' },
          ]?.map((stat) => (
            <div key={`hero-stat-${stat?.label}`} className="text-center">
              <p className="text-2xl font-black text-white font-tabular">{stat?.value}</p>
              <p className="text-xs text-white/40 mt-0.5">{stat?.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,15,30,0.6))' }}
      />
    </section>
  );
}