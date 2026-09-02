'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Stethoscope, Pill, FlaskConical, Bell, CheckCircle2, Circle, Star } from 'lucide-react';
import LocationDropdown from '@/components/ui/LocationDropdown';

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

const TRACKING_CARDS = [
  {
    id: 'appointment',
    label: "TODAY\'S APPOINTMENT",
    icon: (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-blue-300" style={{ background: 'rgba(59,130,246,0.18)' }}>
        DR
      </div>
    ),
    title: 'Dr. DOC',
    subtitle: 'Cardiologist · Hospital',
    statusBg: 'rgba(59,130,246,0.13)',
    statusBorder: 'rgba(59,130,246,0.25)',
    statusTitle: 'In Transit',
    statusDesc: 'ETA 12 min · originally 4:30 PM',
    eta: '12 MIN',
    steps: [
      { label: 'Confirmed by you', time: '4:02 PM', done: true },
      { label: 'Doctor marked In Transit', time: '4:18 PM', done: true },
      { label: 'Delay detected — 12 min', time: '4:21 PM', done: true },
      { label: 'New expected time', time: '4:42 PM', done: false },
    ],
    btn1: 'Accept new time',
    btn2: 'Reschedule',
  },
  {
    id: 'labtest',
    label: 'YOUR LAB TEST',
    icon: (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.18)' }}>
        <FlaskConical size={18} className="text-indigo-300" />
      </div>
    ),
    title: 'Diagnostics',
    subtitle: 'Complete Blood Count (CBC)',
    statusBg: 'rgba(99,102,241,0.13)',
    statusBorder: 'rgba(99,102,241,0.25)',
    statusTitle: 'Sample collected',
    statusDesc: 'Report expected by 6:00 PM today',
    eta: '12 MIN',
    steps: [
      { label: 'Test booked', time: '8:00 AM', done: true },
      { label: 'Technician assigned', time: '8:30 AM', done: true },
      { label: 'Sample collected', time: '9:15 AM', done: true },
      { label: 'Report processing', time: '9:20 AM', done: false },
    ],
    btn1: 'Track report',
    btn2: 'Reschedule visit',
  },
  {
    id: 'medicine',
    label: 'YOUR MEDICINE ORDER',
    icon: (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(6,182,212,0.18)' }}>
        <Pill size={18} className="text-cyan-300" />
      </div>
    ),
    title: 'Pharmacy',
    subtitle: 'Paracetamol 650mg · Strip of 15',
    statusBg: 'rgba(6,182,212,0.13)',
    statusBorder: 'rgba(6,182,212,0.25)',
    statusTitle: 'Ready for pickup',
    statusDesc: 'Hold expires in 3 hrs · ₹32',
    eta: '12 MIN',
    steps: [
      { label: 'Order placed', time: '2:10 PM', done: true },
      { label: 'Pharmacy accepted', time: '2:14 PM', done: true },
      { label: 'Stock reserved', time: '2:14 PM', done: true },
      { label: 'Ready for pickup', time: '2:20 PM', done: false },
    ],
    btn1: 'Get directions',
    btn2: 'Cancel hold',
  },
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
      setActiveCard((i) => (i + 1) % TRACKING_CARDS?.length);
    }, 3200);
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
                        ? 'bg-white/10 text-white border-b-2 border-blue-400' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <m.icon size={14} />
                    <span className="hidden sm:inline">{m?.label}</span>
                  </button>
                ))}
              </div>

              {/* Inputs */}
              <div className="p-4 flex flex-col sm:flex-row gap-2">
                <LocationDropdown
                  defaultLabel="All Cities"
                  variant="dark"
                  onApply={(label) => setCity(label)}
                />

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

          {/* RIGHT — Tracking Cards Carousel */}
          <div className={`hidden lg:flex flex-col items-center justify-center relative ${mounted ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Carousel viewport */}
            <div className="relative w-full" style={{ maxWidth: 380 }}>
              {/* SMS alert badge — floats top-left */}
              <div
                className="absolute -top-5 -left-4 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl"
                style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>
                  <Bell size={14} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-800 leading-none">SMS alert sent</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Delay notified in 41s</p>
                </div>
              </div>

              {/* Punctuality badge — floats bottom-right */}
              <div
                className="absolute -bottom-5 -right-4 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl"
                style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.12)' }}>
                  <Star size={13} className="text-yellow-500 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-[12px] font-bold text-gray-800 leading-none">4.9 average</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Punctuality rating</p>
                </div>
              </div>

              {/* Cards slider */}
              <div className="overflow-hidden rounded-3xl" style={{ marginTop: 16, marginBottom: 16 }}>
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeCard * 100}%)` }}
                >
                  {TRACKING_CARDS?.map((card) => (
                    <div
                      key={card?.id}
                      className="flex-shrink-0 w-full"
                      style={{ minWidth: '100%' }}
                    >
                      <div
                        className="rounded-3xl p-6"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        {/* Card header */}
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{card?.label}</p>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
                            <span className="text-emerald-300 text-[10px] font-bold">Live</span>
                          </div>
                        </div>

                        {/* Provider row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {card?.icon}
                            <div>
                              <p className="text-sm font-bold text-white">{card?.title}</p>
                              <p className="text-[11px] text-white/45">{card?.subtitle}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            <span className="text-indigo-300 text-[10px] font-bold">Verified</span>
                          </div>
                        </div>

                        {/* Status banner */}
                        <div
                          className="flex items-center justify-between rounded-2xl px-4 py-3 mb-4"
                          style={{ background: card?.statusBg, border: `1px solid ${card?.statusBorder}` }}
                        >
                          <div>
                            <p className="text-sm font-black text-white">{card?.statusTitle}</p>
                            <p className="text-[11px] text-white/50 mt-0.5">{card?.statusDesc}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">ETA</p>
                            <p className="text-xl font-black text-blue-300 leading-none">{card?.eta}</p>
                          </div>
                        </div>

                        {/* Timeline steps */}
                        <div className="flex flex-col gap-2.5 mb-5">
                          {card?.steps?.map((step, si) => (
                            <div key={`step-${si}`} className="flex items-start gap-3">
                              {step?.done ? (
                                <CheckCircle2 size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                              ) : (
                                <Circle size={14} className="text-white/25 mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className={`text-xs font-semibold ${step?.done ? 'text-white/80' : 'text-white/50'}`}>{step?.label}</p>
                                <p className="text-[10px] text-white/35">{step?.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                          <button
                            className="flex-1 py-2.5 rounded-full text-xs font-bold text-white transition-all hover:opacity-90"
                            style={{ background: 'linear-gradient(135deg, #3b5bdb, #2563eb)' }}
                          >
                            {card?.btn1}
                          </button>
                          <button
                            className="flex-1 py-2.5 rounded-full text-xs font-bold text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                          >
                            {card?.btn2}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mt-2">
                {TRACKING_CARDS?.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    onClick={() => setActiveCard(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeCard === i ? 20 : 6,
                      height: 6,
                      background: activeCard === i ? '#3b82f6' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
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