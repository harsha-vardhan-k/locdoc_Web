'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';
import { Calendar, Navigation2, Target, Bell, CheckCircle2, Search, Shield, Layers, Users, Star, Building2, ShieldCheck, Clock, TrendingDown } from 'lucide-react';

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
          Local healthcare,<br />
          <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            finally on time.
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed reveal-up">
          LocDoc connects patients to nearby doctors, pharmacies, and diagnostic labs — and makes
          sure the appointment time you book is the time that actually happens.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-6 items-start">
        <div className="reveal-left">
          <h2 className="tight-headline text-white mb-4">Why we exist</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Every day, patients sit in waiting rooms for hours — not because doctors are busy,
            but because no one told them the doctor was running late. Facilities lose revenue to
            no-shows while other patients are turned away. LocDoc was built to fix that
            communication gap, for patients and facilities alike.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 reveal-right bento-hover card-shine">
          <p className="text-sm font-bold text-white mb-4">What we fix</p>
          <ul className="space-y-3">
            {[
              'Patients get advance notice when their doctor is running late.',
              'No-shows drop through timely confirm-or-release prompts.',
              'Released slots are automatically filled from the waitlist.',
              'Nearby medicine and lab availability is visible before you travel.',
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
  { icon: Calendar, title: 'Slot booked', desc: 'Patient books a doctor at a specific facility and time.' },
  { icon: Navigation2, title: 'Doctor in transit', desc: 'Opt-in location status activates as the doctor heads in.' },
  { icon: Target, title: 'Delay detected', desc: 'Projected arrival is compared to the booked slot in real time.' },
  { icon: Bell, title: 'Patients notified', desc: 'Every affected patient gets the revised time via app, SMS, or WhatsApp.' },
  { icon: CheckCircle2, title: 'Patient chooses', desc: 'Accept the new time, reschedule, or switch doctors — in one tap.' },
];

const ENGINE_STATS = [
  { value: '< 10%', label: 'Doctor ghosting rate', desc: 'Arrivals >15 min late without prior notice' },
  { value: '> 30 min', label: 'Notification lead time', desc: 'Median advance warning before a delay' },
  { value: '< 12%', label: 'Patient no-show rate', desc: 'Booked visits with no attendance or cancellation' },
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
          The LocDoc Engine
        </span>
        <h2 className="tight-headline text-foreground mb-5 reveal-up">
          The infrastructure behind{' '}
          <span className="text-gradient-brand">every on-time visit.</span>
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto reveal-up">
          Our punctuality engine tracks doctor status in real time, detects delays automatically,
          and gives patients options — before they ever leave home.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-card rounded-2xl p-5 shadow-md border border-border reveal-scale">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
            {ENGINE_STEPS.map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="flex-1 flex flex-col items-center text-center px-2 micro-lift">
                  <div className="w-8 h-8 rounded-lg bg-primary-soft border border-primary/20 flex items-center justify-center mb-2">
                    <step.icon size={15} className="text-primary" />
                  </div>
                  <p className="text-xs font-bold text-foreground mb-0.5">{step.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < ENGINE_STEPS.length - 1 && (
                  <div className="hidden md:flex items-center text-muted-foreground text-lg font-light px-1">›</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {ENGINE_STATS.map((s, i) => (
          <div key={s.label} className="reveal-up glass-light rounded-xl p-3 micro-lift glow-border-hover" style={{ transitionDelay: `${i * 60}ms` }}>
            <p className="text-lg font-black text-primary mb-0.5 font-tabular">{s.value}</p>
            <p className="text-[11px] font-bold text-foreground mb-0.5">{s.label}</p>
            <p className="text-[10px] text-muted-foreground leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── How It Works ───────────────────────────────────────────────────────────
const HOW_STEPS = [
  { icon: Search, title: 'Find & book', desc: 'Search doctors by specialty, clinic, or location. Book a slot in seconds — no account needed to browse.' },
  { icon: Target, title: 'Track live status', desc: 'Your appointment screen shows real-time doctor status: Available, In Transit, or In Rounds.' },
  { icon: Bell, title: 'Get notified early', desc: 'Receive a reminder at T-24h and T-2h. If your doctor is delayed, you hear about it first.' },
  { icon: CheckCircle2, title: 'Arrive with certainty', desc: 'Walk in knowing the wait is real. Non-app users get the same experience over SMS or WhatsApp.' },
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
          Book, track, and arrive —<br />
          <span style={{ background: 'linear-gradient(135deg, #22d3ee, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            no surprises.
          </span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Timeline + Cards in a single aligned row */}
        <div className="flex items-start gap-0 reveal-up">
          {HOW_STEPS.map((step, i) => (
            <div key={step.title} className="flex-1 flex flex-col items-center">
              {/* Step number + dot */}
              <div className="flex flex-col items-center w-full mb-4">
                <span className="text-[10px] text-white/30 mb-2 font-mono">0{i + 1}</span>
                <div className="relative w-full flex items-center justify-center">
                  {/* Left line */}
                  {i > 0 && <div className="absolute right-1/2 left-0 h-px bg-white/10" />}
                  {/* Right line */}
                  {i < HOW_STEPS.length - 1 && <div className="absolute left-1/2 right-0 h-px bg-white/10" />}
                  <button
                    onClick={() => setActive(i)}
                    className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all flex-shrink-0 ${
                      i === active
                        ? 'bg-blue-500 border-blue-400 scale-125'
                        : i < active
                        ? 'bg-blue-500/40 border-blue-400/40' :'bg-white/10 border-white/20'
                    }`}
                  />
                </div>
              </div>

              {/* Card */}
              <div className="w-full px-1.5">
                <button
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all bento-hover card-shine ${
                    i === active
                      ? 'glass-card border-blue-400/30' :'glass border-white/10 hover:border-white/20'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${i === active ? 'bg-blue-500/30 border border-blue-400/30' : 'bg-white/10'}`}>
                    <step.icon size={15} className={i === active ? 'text-blue-300' : 'text-white/50'} />
                  </div>
                  <p className={`text-xs font-bold mb-1 ${i === active ? 'text-white' : 'text-white/60'}`}>{step.title}</p>
                  <p className={`text-[11px] leading-relaxed ${i === active ? 'text-white/60' : 'text-white/30'}`}>{step.desc}</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── By the Numbers ─────────────────────────────────────────────────────────
const METRICS = [
  { icon: ShieldCheck, value: '2,400+', label: 'Verified Doctors', color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/25', description: 'Credentialed & background-checked', span: 'lg:col-span-2' },
  { icon: TrendingDown, value: '82%', label: 'Ghosting Reduction', color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/25', description: 'Fewer unannounced late arrivals', span: '' },
  { icon: Clock, value: '< 15 min', label: 'Avg Delay Alert', color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/25', description: 'Patients notified well in advance', span: '' },
  { icon: Users, value: '18,000+', label: 'Patients Served', color: 'text-purple-400', bg: 'bg-purple-500/15', border: 'border-purple-500/25', description: 'Across pilot cities and clinics', span: '' },
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
            Progress you can<br />
            <span className="text-gradient-brand">measure.</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Real outcomes from our active pilot. Every number is tracked and improving.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {METRICS?.map((m, i) => (
            <div key={`metric-${m?.label}`} className={`reveal-up glass-light rounded-xl p-4 flex flex-col gap-2 micro-lift glow-border-hover card-shine ${m?.span}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${m?.bg} ${m?.border}`}>
                <m.icon size={15} className={m?.color} />
              </div>
              <div>
                <p className={`text-2xl font-black leading-none mb-1 font-tabular ${m?.color}`}>{m?.value}</p>
                <p className="text-xs font-bold text-foreground mb-0.5">{m?.label}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{m?.description}</p>
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
  { icon: Target, title: 'Punctuality is the product', desc: 'Every feature exists to support one promise: the time you book is the time that happens.' },
  { icon: Shield, title: 'Trust is verified, not assumed', desc: 'Facilities are checked against government certificates. Doctors are matched to official medical registers.' },
  { icon: Layers, title: 'Adopt at your own pace', desc: 'No facility needs to replace what already works. Start with one module and expand when it makes sense.' },
  { icon: Users, title: 'Works for every patient', desc: 'The full experience runs over SMS and WhatsApp too — the app is an upgrade, never a requirement.' },
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
          Our principles
        </span>
        <h2 className="tight-headline text-white reveal-up">
          What guides<br />
          <span style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            every decision.
          </span>
        </h2>
      </div>
      <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="reveal-up glass-card rounded-xl p-4 bento-hover card-shine" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-3">
              <p.icon size={15} className="text-blue-400" />
            </div>
            <p className="text-xs font-bold text-white mb-1.5">{p.title}</p>
            <p className="text-[11px] text-white/40 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Team ───────────────────────────────────────────────────────────────────
const TEAM = [
  { initials: 'SV', name: 'Samapath V', role: 'Co-Founder', desc: 'Shapes the product vision and the ghosting-prevention engine at the core of LocDoc.' },
  { initials: 'VE', name: 'Venu E', role: 'Co-Founder', desc: 'Builds the platform and the trust layer that facilities and doctors depend on.' },
  { initials: 'MM', name: 'Madhu M', role: 'Co-Founder', desc: 'Leads facility onboarding and the operations that keep LocDoc running reliably.' },
  { initials: 'HK', name: 'Harsha K', role: 'Co-Founder', desc: 'Owns design and experience across the patient, doctor, and facility apps.' },
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
          Four founders,<br />
          <span className="text-gradient-brand">one shared obsession.</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto reveal-up">
          We built LocDoc because we experienced the problem firsthand — and decided to fix it.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEAM.map((member, i) => (
          <div key={member.name} className="reveal-up glass-light rounded-xl p-4 text-center micro-lift glow-border-hover card-shine" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
              <span className="text-white font-bold text-xs">{member.initials}</span>
            </div>
            <p className="text-xs font-bold text-foreground">{member.name}</p>
            <p className="text-[11px] text-primary font-semibold mb-1.5">{member.role}</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{member.desc}</p>
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
