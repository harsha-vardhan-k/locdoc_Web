'use client';

import React, { useState, useEffect, useRef } from 'react';

import AppLayout from '@/components/AppLayout';
import {
  Calendar,
  Navigation2,
  Target,
  Bell,
  CheckCircle2,
  Search,
  Shield,
  Layers,
  Users,
  Star,
  Building2,
  ShieldCheck,
  Clock,
  TrendingDown,
} from 'lucide-react';

const NAV_TABS = ['Our Story', 'The LocDoc Engine', 'How It Works', 'By the Numbers', 'Principles', 'Team'];

// ── Our Story ──────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <section id="our-story" className="py-20 bg-[#f5f5f0]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          About LocDoc
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          We&apos;re making one broken promise{' '}
          <span className="text-blue-600">work again.</span>
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          LocDoc is a SaaS platform for local healthcare that makes appointment times trustworthy.
          Around that core, we run facility operations for hospitals and clinics, and a discovery
          marketplace connecting patients to nearby pharmacies and diagnostic labs.
        </p>
      </div>

      {/* Problem section */}
      <div className="max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            The problem, plainly
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Patients wait for hours because doctors run late, are in rounds, or are travelling
            between facilities — with no visibility and no warning. Facilities lose capacity to
            no-shows while other patients are turned away. And smaller clinics, pharmacies and labs
            run on fragmented, paper-based systems, so none of this is even visible digitally in
            the first place.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-4">What we&apos;re solving for</p>
          <ul className="space-y-3">
            {[
              'Reduce average patient wait time caused by doctor delay.',
              'Reduce appointment no-show rate through confirm-or-release and waitlist backfill.',
              'Give facilities usable digital operations without forcing them to replace existing software.',
              'Give patients accurate local availability for medicines and diagnostic tests before they travel.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── LocDoc Engine ──────────────────────────────────────────────────────────
const ENGINE_STEPS = [
  {
    icon: Calendar,
    title: 'Slot booked',
    desc: 'Patient books a doctor at a specific facility & time.',
  },
  {
    icon: Navigation2,
    title: 'Doctor In Transit',
    desc: 'Opt-in location status begins as the doctor heads in.',
  },
  {
    icon: Target,
    title: 'Delay detected',
    desc: 'Projected arrival is compared to the booked slot automatically.',
  },
  {
    icon: Bell,
    title: 'Everyone notified',
    desc: 'Every affected patient gets the revised time — app, SMS or WhatsApp.',
  },
  {
    icon: CheckCircle2,
    title: 'Choice, not chaos',
    desc: 'Accept, reschedule, or switch to another doctor — in one tap.',
  },
];

const ENGINE_STATS = [
  { value: '< 10%', label: 'Doctor ghosting rate', desc: 'Arrivals >15 min late without prior notice' },
  { value: '> 30 min', label: 'Notification lead time', desc: 'Median advance warning before a delay' },
  { value: '< 12%', label: 'Patient no-show rate', desc: 'Booked visits with no attendance, no cancellation' },
  { value: '> 40%', label: 'Slot recovery', desc: 'Released slots refilled from the waitlist same day' },
  { value: '> 60%', label: 'Confirm response rate', desc: 'Patients responding to the T-2h confirm prompt' },
  { value: '> 90%', label: 'Reservation reliability', desc: 'Medicine & test reservations honoured on arrival' },
];

function LocDocEngine() {
  return (
    <section id="locdoc-engine" className="py-20 bg-[#f5f5f0]">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          The LocDoc difference
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
          We built the one thing every healthcare app forgot:{' '}
          <span className="text-blue-600">punctuality.</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
          Doctors run late. Patients don&apos;t show up. Nobody finds out until they&apos;re already
          sitting in a waiting room. The LocDoc Engine closes that gap — in both directions — before
          it costs anyone their afternoon.
        </p>
      </div>

      {/* Flow steps */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
            {ENGINE_STEPS.map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="flex-1 flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                    <step.icon size={18} className="text-blue-500" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">{step.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
                {i < ENGINE_STEPS.length - 1 && (
                  <div className="hidden md:flex items-center text-gray-300 text-lg font-light px-1">›</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="max-w-5xl mx-auto px-6 mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {ENGINE_STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xl font-extrabold text-blue-600 mb-1">{s.value}</p>
            <p className="text-xs font-semibold text-gray-800 mb-1">{s.label}</p>
            <p className="text-[11px] text-gray-400 leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── How It Works ───────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    icon: Search,
    title: 'Search & book',
    desc: 'Find doctors by specialty, clinic or location, and book a slot in a few taps — no login wall to browse.',
  },
  {
    icon: Target,
    title: 'See real status',
    desc: 'Your appointment screen shows live doctor status, not a static time — Available, In Transit, In Rounds.',
  },
  {
    icon: Bell,
    title: 'Confirm or reschedule',
    desc: 'Get a nudge at T-24h and T-2h. If your doctor runs late, you get options — not silence.',
  },
  {
    icon: CheckCircle2,
    title: 'Walk in with confidence',
    desc: 'Show up knowing the wait is real, or shift on your terms. Non-app patients get the same by SMS/WhatsApp.',
  },
];

function HowItWorks() {
  const [active, setActive] = useState(1);

  return (
    <section id="how-it-works" className="py-20 bg-[#f5f5f0]">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          How it works
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
          From search to seen — without the guesswork.
        </h2>
      </div>

      {/* Step timeline */}
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress bar */}
        <div className="relative flex items-center mb-10">
          <div className="absolute left-0 right-0 h-px bg-gray-200" />
          {HOW_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative flex-1 flex flex-col items-center"
            >
              <span className="text-[10px] text-gray-400 mb-2 font-mono">0{i + 1}</span>
              <div
                className={`w-4 h-4 rounded-full border-2 transition-all z-10 ${
                  i === active
                    ? 'bg-blue-600 border-blue-600 scale-125'
                    : i < active
                    ? 'bg-blue-200 border-blue-300' :'bg-white border-gray-300'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HOW_STEPS.map((step, i) => (
            <button
              key={step.title}
              onClick={() => setActive(i)}
              className={`text-left p-5 rounded-2xl border transition-all ${
                i === active
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                  : 'bg-white border-gray-100 text-gray-800 hover:border-blue-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  i === active ? 'bg-white/20' : 'bg-blue-50'
                }`}
              >
                <step.icon size={18} className={i === active ? 'text-white' : 'text-blue-500'} />
              </div>
              <p className={`text-sm font-semibold mb-1 ${i === active ? 'text-white' : 'text-gray-800'}`}>
                {step.title}
              </p>
              <p className={`text-xs leading-relaxed ${i === active ? 'text-blue-100' : 'text-gray-500'}`}>
                {step.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── By the Numbers (Trust Metrics) ────────────────────────────────────────
const METRICS = [
  {
    icon: ShieldCheck,
    value: '2,400+',
    label: 'NMC Verified Doctors',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    description: 'Fully credentialed & background-checked',
    span: 'lg:col-span-2',
  },
  {
    icon: TrendingDown,
    value: '82%',
    label: 'Ghosting Rate Reduction',
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/25',
    description: 'Doctors who actually show up',
    span: '',
  },
  {
    icon: Clock,
    value: '< 15 min',
    label: 'Avg Wait Time Alert',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/25',
    description: 'Live tracking, no surprises',
    span: '',
  },
  {
    icon: Users,
    value: '18,000+',
    label: 'Patients Served',
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/25',
    description: 'Across pilot cities & clinics',
    span: '',
  },
  {
    icon: Building2,
    value: '340+',
    label: 'Partner Facilities',
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/25',
    description: 'Clinics, labs & pharmacies',
    span: '',
  },
  {
    icon: Star,
    value: '4.7 / 5',
    label: 'Patient Satisfaction',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/15',
    border: 'border-yellow-500/25',
    description: 'Rated by verified patients',
    span: '',
  },
];

function ByTheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-up').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 80);
          });
        }
      },
      { threshold: 0.1 }
    );
    observer?.observe(el);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="by-the-numbers"
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060d1f 0%, #0d1a3a 50%, #0a0f1e 100%)' }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 reveal-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            By the numbers
          </span>
          <h2 className="section-headline text-white mb-4">
            Healthcare that delivers —<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              measurably.
            </span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            Real outcomes from our active pilot. Every metric is tracked, verified, and improving.
          </p>
        </div>

        {/* Bento metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {METRICS?.map((m) => (
            <div
              key={`metric-${m?.label}`}
              className={`reveal-up glass-card rounded-xl p-4 flex flex-col gap-3 bento-hover ${m?.span}`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${m?.bg} ${m?.border}`}>
                <m.icon size={17} className={m?.color} />
              </div>
              <div>
                <p className={`stat-number leading-none mb-2 ${m?.color}`}>
                  {m?.value}
                </p>
                <p className="text-sm font-bold text-white mb-1">{m?.label}</p>
                <p className="text-xs text-white/35 leading-snug">{m?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] mt-8 text-white/20">
          * Pilot targets — not live production data. LocDoc is in active pilot phase.
        </p>
      </div>
    </section>
  );
}

// ── Principles ─────────────────────────────────────────────────────────────
const PRINCIPLES = [
  {
    icon: Target,
    title: 'Punctuality is the product',
    desc: "Every other feature exists to support one promise: the time you\'re given is the time that happens.",
  },
  {
    icon: Shield,
    title: 'Trust is earned, not claimed',
    desc: 'Facilities are verified against government certificates. Doctors are matched against official medical registers.',
  },
  {
    icon: Layers,
    title: 'Adoption on your terms',
    desc: 'No facility is asked to rip out what already works. Start small, add modules only when they make sense.',
  },
  {
    icon: Users,
    title: 'Built for every patient',
    desc: 'The full ghosting-prevention experience works over SMS and WhatsApp too — an app is an upgrade, never a requirement.',
  },
];

function Principles() {
  return (
    <section id="principles" className="py-20 bg-[#f5f5f0]">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          How we operate
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
          The principles behind every screen
        </h2>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <p.icon size={17} className="text-blue-500" />
            </div>
            <p className="text-sm font-bold text-gray-900 mb-2">{p.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Team ───────────────────────────────────────────────────────────────────
const TEAM = [
  {
    initials: 'SV',
    name: 'Samapath V',
    role: 'Co-Founder',
    desc: "Shaping the product vision behind LocDoc\'s ghosting-prevention engine.",
  },
  {
    initials: 'VE',
    name: 'Venu E',
    role: 'Co-Founder',
    desc: 'Building the platform and trust layer that facilities and doctors rely on.',
  },
  {
    initials: 'MM',
    name: 'Madhu M',
    role: 'Co-Founder',
    desc: 'Driving facility onboarding and the operations that keep LocDoc reliable.',
  },
  {
    initials: 'HK',
    name: 'Harsha K',
    role: 'Co-Founder',
    desc: 'Leading design and experience across the patient, doctor and facility apps.',
  },
];

function Team() {
  return (
    <section id="team" className="py-20 bg-[#f5f5f0]">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          The team
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
          Built by a small team that showed up on time
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TEAM.map((member) => (
          <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-sm">{member.initials}</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">{member.name}</p>
            <p className="text-xs text-blue-600 font-medium mb-2">{member.role}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{member.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('Our Story');

  const scrollTo = (tab: string) => {
    setActiveTab(tab);
    const idMap: Record<string, string> = {
      'Our Story': 'our-story',
      'The LocDoc Engine': 'locdoc-engine',
      'How It Works': 'how-it-works',
      'By the Numbers': 'by-the-numbers',
      'Principles': 'principles',
      'Team': 'team',
    };
    const el = document.getElementById(idMap[tab] ?? tab.toLowerCase().replace(/\s+/g, '-'));
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AppLayout>
      {/* Sticky tab nav */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto py-2 scrollbar-hide">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollTo(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white' :'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <OurStory />
      <LocDocEngine />
      <HowItWorks />
      <ByTheNumbers />
      <Principles />
      <Team />
    </AppLayout>
  );
}
