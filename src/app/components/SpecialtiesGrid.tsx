'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SPECIALTIES } from '@/data/doctors';

export default function SpecialtiesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelector('.reveal-stagger')?.classList.add('visible');
          el.querySelector('.reveal-up')?.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    observer?.observe(el);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-light py-16 relative">
      {/* Top fade: white blends into this section from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #ffffff, transparent)' }}
      />
      {/* Bottom fade: transition into dark TopClinicsSection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0f1e)' }}
      />
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 reveal-up">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Browse by specialty
            </span>
            <h2 className="tight-headline text-foreground">
              Find the right<br />
              <span className="text-gradient-brand">specialist.</span>
            </h2>
            <p className="text-base text-muted-foreground mt-3 max-w-sm">
              All doctors verified via NMC, ABDM NMR, or State Medical Councils
            </p>
          </div>
          <Link
            href="/doctors-listing-page"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary-soft transition-all duration-200 group micro-lift"
          >
            View all doctors
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric bento specialty grid */}
        <div className="reveal-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SPECIALTIES?.map((spec, i) => (
            <Link
              key={`spec-${spec?.slug}`}
              href={`/doctors-listing-page?specialty=${encodeURIComponent(spec?.slug)}`}
              className={`group flex flex-col gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 micro-lift glow-border-hover card-shine ${
                i === 0 ? 'sm:col-span-2 sm:row-span-1' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300 flex-shrink-0">
                <span className="text-2xl">{spec?.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                  {spec?.name}
                </p>
                {'description' in spec && (
                  <p className="text-xs text-muted-foreground leading-snug mb-2">{(spec as any).description}</p>
                )}
                <p className="text-xs font-bold text-primary">{spec?.count}+ doctors</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}