'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Building2, UserRound, FlaskConical, Pill, ArrowRight, Zap } from 'lucide-react';

const REGISTER_OPTIONS = [
  {
    id: 'hospital',
    icon: Building2,
    label: 'Hospital / Clinic',
    description: 'Manage appointments, queues, and patient flow across departments.',
    href: '/register/hospital',
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/25',
    gradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    id: 'pharmacy',
    icon: Pill,
    label: 'Pharmacy',
    description: 'List your medicines, manage stock, and reach nearby patients.',
    href: '/register/pharmacy',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    id: 'lab',
    icon: FlaskConical,
    label: 'Diagnostic Lab',
    description: 'Accept bookings, manage sample collection, and share results digitally.',
    href: '/register/labs',
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/25',
    gradient: 'from-purple-500/10 to-purple-600/5',
  },
  {
    id: 'doctor',
    icon: UserRound,
    label: 'Doctor',
    description: 'Get verified, set your schedule, and reduce no-shows automatically.',
    href: '/register/doctor',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/25',
    gradient: 'from-cyan-500/10 to-cyan-600/5',
  },
];

export default function RegisterBusinessCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-up, .reveal-scale').forEach((node, i) => {
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
    <section ref={sectionRef} className="section-light py-16" id="register">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center mb-10 reveal-up">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-600 mb-4">
            <Zap size={11} className="text-blue-500" />
            For healthcare providers
          </span>
          <h2 className="tight-headline text-foreground mb-4">
            Join the LocDoc<br />
            <span className="text-gradient-brand">network.</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Get verified, go live, and eliminate appointment ghosting for your patients — in under 48 hours.
          </p>
        </div>

        {/* Bento register cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 max-w-5xl mx-auto mb-8">
          {REGISTER_OPTIONS?.map((opt, i) => (
            <Link
              key={`reg-${opt?.id}`}
              href={opt?.href}
              className={`reveal-up group rounded-2xl border bg-gradient-to-br ${opt?.gradient} ${opt?.border} p-5 flex flex-col gap-3 micro-lift glow-border-hover card-shine transition-all duration-300`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${opt?.bg} ${opt?.border}`}>
                <opt.icon size={18} className={opt?.color} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {opt?.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {opt?.description}
                </p>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-bold ${opt?.color}`}>
                Register now
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA strip — dark */}
        <div
          className="reveal-scale rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 100%)' }}
        >
          <div className="absolute inset-0 grid-overlay pointer-events-none" />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.6) 0%, transparent 70%)' }}
          />
          <p className="relative text-white/40 text-sm mb-2">Already registered?</p>
          <Link
            href="/login?role=hospital"
            className="relative inline-flex items-center gap-2 text-lg font-bold text-white hover:text-blue-300 transition-colors group"
          >
            Sign in to your facility account
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}