'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Star, MapPin, Users, ArrowRight, Building2 } from 'lucide-react';
import { CLINICS } from '@/data/clinics';

const MODULE_COLORS: Record<string, string> = {
  Appointments: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  'In-Patient': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'In-house Pharmacy': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  'In-house Labs': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'Cabin Rental': 'bg-amber-500/15 text-amber-300 border-amber-500/25',
};

export default function TopClinicsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0f1e 0%, #0d1a3a 50%, #060d1f 100%)' }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[40%] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 reveal-up">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Partner facilities
            </span>
            <h2 className="section-headline text-white">
              Top clinics &<br />
              <span style={{ background: 'linear-gradient(135deg, #60a5fa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                hospitals.
              </span>
            </h2>
            <p className="text-base text-white/40 mt-3 max-w-sm">
              Facilities using LocDoc&apos;s live-queue and ghosting-prevention modules
            </p>
          </div>
          <Link
            href="/doctors-listing-page"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm font-semibold text-white/60 hover:border-blue-400/40 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200 group"
          >
            Browse all
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento clinic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {CLINICS.map((clinic, i) => (
            <Link
              key={`clinic-${clinic.id}`}
              href={`/doctors-listing-page?clinic=${encodeURIComponent(clinic.id)}`}
              className={`reveal-up group glass-card rounded-xl hover:border-blue-400/30 transition-all duration-300 p-4 flex flex-col gap-3 bento-hover ${
                i === 0 ? 'xl:col-span-2 xl:row-span-1' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start gap-2.5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(8,145,178,0.2))' }}
                >
                  <Building2 size={17} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                    {clinic.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-white/40">
                    <MapPin size={10} />
                    <span>{clinic.area}, {clinic.city}</span>
                  </div>
                </div>
              </div>

              {/* Rating + doctors */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={12} fill="currentColor" />
                  <span className="font-bold text-white font-tabular">{clinic.rating}</span>
                  <span className="text-white/30">({clinic.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-white/40">
                  <Users size={11} />
                  <span>{clinic.doctors} doctors</span>
                </div>
              </div>

              {/* Modules */}
              <div className="flex flex-wrap gap-1.5">
                {clinic.modules.slice(0, 3).map((mod) => (
                  <span
                    key={`clinic-${clinic.id}-mod-${mod}`}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      MODULE_COLORS[mod] ?? 'bg-white/5 text-white/40 border-white/10'
                    }`}
                  >
                    {mod}
                  </span>
                ))}
                {clinic.modules.length > 3 && (
                  <span className="text-[10px] text-white/30 px-1.5 py-0.5">
                    +{clinic.modules.length - 3} more
                  </span>
                )}
              </div>

              <p className="text-[11px] text-white/30 line-clamp-1">
                {clinic.specialties.slice(0, 3).join(' · ')}
                {clinic.specialties.length > 3 && ` + ${clinic.specialties.length - 3} more`}
              </p>
            </Link>
          ))}
        </div>
      </div>
      {/* Bottom fade: transition into white RegisterBusinessCTA */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>
  );
}