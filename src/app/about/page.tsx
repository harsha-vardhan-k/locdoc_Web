'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';
import { Calendar, Navigation2, Target, Bell, CheckCircle2, Search, Shield, Layers, Users, Star, Building2, ShieldCheck, Clock, TrendingDown,  } from 'lucide-react';

const NAV_TABS = ['Our Story', 'The LocDoc Engine', 'How It Works', 'By the Numbers', 'Principles', 'Team'];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 80);
          });
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

// ── Our Story ──────────────────────────────────────────────────────────────
function OurStory() {
  const ref = useReveal(0.1);
  return (
    <section id="our-story" ref={ref as React.RefObject<HTMLElement>} className="section-dark py-20">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute top-[-10%] left-[-5%] w-[55%] h-[60%] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-blue-300 reveal-up">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-live-pulse" />
          About LocDoc
        </div>
        <h1 className="page-headline text-white mb-6 reveal-up">
          We&apos;re making one broken<br />
          <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            promise work again.
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed reveal-up">
          LocDoc is a SaaS platform for local healthcare that makes appointment times trustworthy.
          Around that core, we run facility operations for hospitals and clinics, and a discovery
          marketplace connecting patients to nearby pharmacies and diagnostic labs.
        </p>
      </div>

      {/* Problem section */}
      <div className="relative max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-6 items-start">
        <div className="reveal-left">
          <h2 className="tight-headline text-white mb-4">The problem, plainly</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Patients wait for hours because doctors run late, are in rounds, or are travelling
            between facilities — with no visibility and no warning. Facilities lose capacity to
            no-shows while other patients are turned away. And smaller clinics, pharmacies and labs
            run on fragmented, paper-based systems, so none of this is even visible digitally.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 reveal-right bento-hover card-shine">
          <p className="text-sm font-bold text-white mb-4">What we&apos;re solving for</p>
          <ul className="space-y-3">
            {[
              'Reduce average patient wait time caused by doctor delay.',
              'Reduce appointment no-show rate through confirm-or-release and waitlist backfill.',
              'Give facilities usable digital operations without forcing them to replace existing software.',
              'Give patients accurate local availability for medicines and diagnostic tests before they travel.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />
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
  { icon: Calendar, title: 'Slot booked', desc: 'Patient books a doctor at a specific facility & time.' },
  { icon: Navigation2, title: 'Doctor In Transit', desc: 'Opt-in location status begins as the doctor heads in.' },
  { icon: Target, title: 'Delay detected', desc: 'Projected arrival is compared to the booked slot automatically.' },
  { icon: Bell, title: 'Everyone notified', desc: 'Every affected patient gets the revised time — app, SMS or WhatsApp.' },
  { icon: CheckCircle2, title: 'Choice, not chaos', desc: 'Accept, reschedule, or switch to another doctor — in one tap.' },
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
  const ref = useReveal(0.1);
  return (
    <section id="locdoc-engine" ref={ref as React.RefObject<HTMLElement>} className="section-light py-20">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-6 reveal-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          The LocDoc difference
        </span>
        <h2 className="tight-headline text-foreground mb-5 reveal-up">
          We built the one thing every healthcare app forgot:{' '}
          <span className="text-gradient-brand">punctuality.</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto reveal-up">
          Doctors run late. Patients don&apos;t show up. Nobody finds out until they&apos;re already
          sitting in a waiting room. The LocDoc Engine closes that gap — in both directions.
        </p>
      </div>

      {/* Flow steps */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-card rounded-3xl p-8 shadow-md border border-border reveal-scale">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
            {ENGINE_STEPS.map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="flex-1 flex flex-col items-center text-center px-2 micro-lift">
                  <div className="w-10 h-10 rounded-xl bg-primary-soft border border-primary/20 flex items-center justify-center mb-3">
                    <step.icon size={18} className="text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1">{step.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < ENGINE_STEPS.length - 1 && (
                  <div className="hidden md:flex items-center text-muted-foreground text-lg font-light px-1">›</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bento grid */}
      <div className="max-w-5xl mx-auto px-6 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ENGINE_STATS.map((s, i) => (
          <div key={s.label} className="reveal-up glass-light rounded-2xl p-4 micro-lift glow-border-hover" style={{ transitionDelay: `${i * 60}ms` }}>
            <p className="text-xl font-black text-primary mb-1 font-tabular">{s.value}</p>
            <p className="text-xs font-bold text-foreground mb-1">{s.label}</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── How It Works ───────────────────────────────────────────────────────────
const HOW_STEPS = [
  { icon: Search, title: 'Search & book', desc: 'Find doctors by specialty, clinic or location, and book a slot in a few taps — no login wall to browse.' },
  { icon: Target, title: 'See real status', desc: 'Your appointment screen shows live doctor status, not a static time — Available, In Transit, In Rounds.' },
  { icon: Bell, title: 'Confirm or reschedule', desc: 'Get a nudge at T-24h and T-2h. If your doctor runs late, you get options — not silence.' },
  { icon: CheckCircle2, title: 'Walk in with confidence', desc: 'Show up knowing the wait is real, or shift on your terms. Non-app patients get the same by SMS/WhatsApp.' },
];

function HowItWorks() {
  const [active, setActive] = useState(1);
  const ref = useReveal(0.1);
  return (
    <section id="how-it-works" ref={ref as React.RefObject<HTMLElement>} className="section-dark py-20">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute bottom-0 right-0 w-[50%] h-[60%] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(8,145,178,0.5) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-xs font-medium text-cyan-300 mb-6 reveal-up">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
          How it works
        </span>
        <h2 className="tight-headline text-white reveal-up">
          From search to seen —<br />
          <span style={{ background: 'linear-gradient(135deg, #22d3ee, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            without the guesswork.
          </span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="relative flex items-center mb-10 reveal-up">
          <div className="absolute left-0 right-0 h-px bg-white/10" />
          {HOW_STEPS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="relative flex-1 flex flex-col items-center">
              <span className="text-[10px] text-white/30 mb-2 font-mono">0{i + 1}</span>
              <div className={`w-4 h-4 rounded-full border-2 transition-all z-10 ${i === active ? 'bg-blue-500 border-blue-400 scale-125' : i < active ? 'bg-blue-500/40 border-blue-400/40' : 'bg-white/10 border-white/20'}`} />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HOW_STEPS.map((step, i) => (
            <button
              key={step.title}
              onClick={() => setActive(i)}
              className={`text-left p-5 rounded-2xl border transition-all reveal-up bento-hover card-shine ${i === active ? 'glass-card border-blue-400/30' : 'glass border-white/10 hover:border-white/20'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${i === active ? 'bg-blue-500/30 border border-blue-400/30' : 'bg-white/10'}`}>
                <step.icon size={18} className={i === active ? 'text-blue-300' : 'text-white/50'} />
              </div>
              <p className={`text-sm font-bold mb-1 ${i === active ? 'text-white' : 'text-white/60'}`}>{step.title}</p>
              <p className={`text-xs leading-relaxed ${i === active ? 'text-white/60' : 'text-white/30'}`}>{step.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── By the Numbers ─────────────────────────────────────────────────────────
const METRICS = [
  { icon: ShieldCheck, value: '2,400+', label: 'NMC Verified Doctors', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/25', description: 'Fully credentialed & background-checked', span: 'lg:col-span-2' },
  { icon: TrendingDown, value: '82%', label: 'Ghosting Rate Reduction', color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/25', description: 'Doctors who actually show up', span: '' },
  { icon: Clock, value: '< 15 min', label: 'Avg Wait Time Alert', color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/25', description: 'Live tracking, no surprises', span: '' },
  { icon: Users, value: '18,000+', label: 'Patients Served', color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/25', description: 'Across pilot cities & clinics', span: '' },
  { icon: Building2, value: '340+', label: 'Partner Facilities', color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/25', description: 'Clinics, labs & pharmacies', span: '' },
  { icon: Star, value: '4.7 / 5', label: 'Patient Satisfaction', color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/25', description: 'Rated by verified patients', span: '' },
];

function ByTheNumbers() {
  const ref = useReveal(0.1);
  return (
    <section id="by-the-numbers" ref={ref as React.RefObject<HTMLElement>} className="section-light py-20">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10 reveal-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            By the numbers
          </span>
          <h2 className="tight-headline text-foreground mb-4">
            Healthcare that delivers —<br />
            <span className="text-gradient-brand">measurably.</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Real outcomes from our active pilot. Every metric is tracked, verified, and improving.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {METRICS?.map((m, i) => (
            <div key={`metric-${m?.label}`} className={`reveal-up glass-light rounded-xl p-5 flex flex-col gap-3 micro-lift glow-border-hover card-shine ${m?.span}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${m?.bg} ${m?.border}`}>
                <m.icon size={17} className={m?.color} />
              </div>
              <div>
                <p className={`display-stat leading-none mb-2 ${m?.color}`}>{m?.value}</p>
                <p className="text-sm font-bold text-foreground mb-1">{m?.label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{m?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] mt-8 text-muted-foreground">
          * Pilot targets — not live production data. LocDoc is in active pilot phase.
        </p>
      </div>
    </section>
  );
}

// ── Principles ─────────────────────────────────────────────────────────────
const PRINCIPLES = [
  { icon: Target, title: 'Punctuality is the product', desc: "Every other feature exists to support one promise: the time you\'re given is the time that happens." },
  { icon: Shield, title: 'Trust is earned, not claimed', desc: 'Facilities are verified against government certificates. Doctors are matched against official medical registers.' },
  { icon: Layers, title: 'Adoption on your terms', desc: 'No facility is asked to rip out what already works. Start small, add modules only when they make sense.' },
  { icon: Users, title: 'Built for every patient', desc: 'The full ghosting-prevention experience works over SMS and WhatsApp too — an app is an upgrade, never a requirement.' },
];

function Principles() {
  const ref = useReveal(0.1);
  return (
    <section id="principles" ref={ref as React.RefObject<HTMLElement>} className="section-dark py-20">
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-white/10 text-xs font-medium text-blue-300 mb-6 reveal-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
          How we operate
        </span>
        <h2 className="tight-headline text-white reveal-up">
          The principles behind<br />
          <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            every screen.
          </span>
        </h2>
      </div>
      <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="reveal-up glass-card rounded-2xl p-6 bento-hover card-shine" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
              <p.icon size={17} className="text-blue-400" />
            </div>
            <p className="text-sm font-bold text-white mb-2">{p.title}</p>
            <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Team ───────────────────────────────────────────────────────────────────
const TEAM = [
  { initials: 'SV', name: 'Samapath V', role: 'Co-Founder', desc: "Shaping the product vision behind LocDoc\'s ghosting-prevention engine." },
  { initials: 'VE', name: 'Venu E', role: 'Co-Founder', desc: 'Building the platform and trust layer that facilities and doctors rely on.' },
  { initials: 'MM', name: 'Madhu M', role: 'Co-Founder', desc: 'Driving facility onboarding and the operations that keep LocDoc reliable.' },
  { initials: 'HK', name: 'Harsha K', role: 'Co-Founder', desc: 'Leading design and experience across the patient, doctor and facility apps.' },
];

function Team() {
  const ref = useReveal(0.1);
  return (
    <section id="team" ref={ref as React.RefObject<HTMLElement>} className="section-light py-20">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-6 reveal-up">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          The team
        </span>
        <h2 className="tight-headline text-foreground reveal-up">
          Built by a small team<br />
          <span className="text-gradient-brand">that showed up on time.</span>
        </h2>
      </div>
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TEAM.map((member, i) => (
          <div key={member.name} className="reveal-up glass-light rounded-2xl p-6 text-center micro-lift glow-border-hover card-shine" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
              <span className="text-white font-bold text-sm">{member.initials}</span>
            </div>
            <p className="text-sm font-bold text-foreground">{member.name}</p>
            <p className="text-xs text-primary font-semibold mb-2">{member.role}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{member.desc}</p>
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
      <div className="sticky top-16 z-30 glass-dark border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto py-2 scrollbar-hide">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollTo(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all micro-lift ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-brand'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
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
