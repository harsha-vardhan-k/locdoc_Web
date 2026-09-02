'use client';

import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Clock, Users, TrendingDown, Building2, Star } from 'lucide-react';

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

export default function TrustMetricsStrip() {
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
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1a3a 50%, #060d1f 100%)' }}
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