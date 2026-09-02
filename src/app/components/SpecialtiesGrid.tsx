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
    <section ref={sectionRef} className="py-12 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 reveal-up">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Browse by specialty
            </span>
            <h2 className="section-headline text-gray-950">
              Find the right<br />
              <span style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                specialist.
              </span>
            </h2>
            <p className="text-base text-gray-500 mt-3 max-w-sm">
              All doctors verified via NMC, ABDM NMR, or State Medical Councils
            </p>
          </div>
          <Link
            href="/doctors-listing-page"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group"
          >
            View all doctors
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Uniform specialty grid */}
        <div className="reveal-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SPECIALTIES?.map((spec) => (
            <Link
              key={`spec-${spec?.slug}`}
              href={`/doctors-listing-page?specialty=${encodeURIComponent(spec?.slug)}`}
              className="group flex flex-col gap-3 p-4 rounded-2xl border border-gray-200 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              {/* Icon container */}
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300 flex-shrink-0">
                <span className="text-2xl">{spec?.icon}</span>
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors leading-snug mb-1">
                  {spec?.name}
                </p>
                {'description' in spec && (
                  <p className="text-xs text-gray-500 leading-snug mb-2">{(spec as any).description}</p>
                )}
                <p className="text-xs font-semibold text-blue-600">{spec?.count}+ doctors</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}