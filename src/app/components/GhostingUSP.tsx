'use client';

import React, { useEffect, useRef } from 'react';
import { Clock, Bell, MessageSquare, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    id: 'step-1',
    icon: Clock,
    title: 'Doctor logs in late',
    description: 'LocDoc detects the doctor has not checked in at the scheduled start time.',
    color: 'text-red-400',
    bg: 'bg-red-500/15',
    border: 'border-red-500/25',
    num: '01',
  },
  {
    id: 'step-2',
    icon: RefreshCw,
    title: 'Live status updates',
    description: 'The appointment queue status changes to "Delayed" in real time.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/25',
    num: '02',
  },
  {
    id: 'step-3',
    icon: Bell,
    title: 'Patients notified instantly',
    description: 'All booked patients receive an SMS/push notification with the updated wait time.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/25',
    num: '03',
  },
  {
    id: 'step-4',
    icon: MessageSquare,
    title: 'Reschedule or wait',
    description: 'Patients can reschedule to the next available slot or choose to wait with live updates.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/25',
    num: '04',
  },
  {
    id: 'step-5',
    icon: CheckCircle2,
    title: 'Zero ghosting, full trust',
    description: 'No more silent no-shows. Patients always know exactly what\'s happening.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/25',
    num: '05',
  },
];

export default function GhostingUSP() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-up').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 100);
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
        className="absolute bottom-0 right-0 w-[50%] h-[60%] opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(8,145,178,0.5) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="text-center mb-10 reveal-up">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            The ghosting problem
          </span>
          <h2 className="section-headline text-white mb-4">
            How LocDoc eliminates<br />
            <span style={{ background: 'linear-gradient(135deg, #f87171, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              doctor ghosting.
            </span>
          </h2>
          <p className="text-base text-white/40 max-w-xl mx-auto">
            72% of patients report waiting 45+ minutes past their appointment with zero communication. We built the infrastructure to end this.
          </p>
        </div>

        {/* Bento steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {STEPS?.map((step) => (
            <div
              key={step?.id}
              className="reveal-up glass-card rounded-xl p-4 flex flex-col gap-3 bento-hover group"
            >
              <div className="flex items-start justify-between">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${step?.bg} ${step?.border}`}>
                  <step.icon size={17} className={step?.color} />
                </div>
                <span className="text-2xl font-black text-white/8 leading-none">{step?.num}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-snug mb-2">{step?.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{step?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center reveal-up">
          <Link
            href="/about#how-it-works"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 group"
            style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}
          >
            Learn how it works
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}