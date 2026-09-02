'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, CheckCircle2, AlertTriangle, Bell } from 'lucide-react';

interface FeedEvent {
  id: string;
  type: 'booked' | 'delayed' | 'completed' | 'notified';
  doctor: string;
  specialty: string;
  location: string;
  time: string;
  detail: string;
}

const FEED_EVENTS: FeedEvent[] = [
  { id: 'ev-001', type: 'booked', doctor: 'Dr. Priya Venkataraman', specialty: 'Cardiologist', location: 'Banjara Hills', time: '2 min ago', detail: 'Slot booked for 11:30 AM' },
  { id: 'ev-002', type: 'delayed', doctor: 'Dr. Kiran Reddy', specialty: 'Neurologist', location: 'Kondapur', time: '4 min ago', detail: 'Running 40 min late — patients notified' },
  { id: 'ev-003', type: 'completed', doctor: 'Dr. Sunita Rao', specialty: 'Gynaecologist', location: 'Secunderabad', time: '6 min ago', detail: 'Consultation completed on time' },
  { id: 'ev-004', type: 'notified', doctor: 'Dr. Venkat Subramanian', specialty: 'Gastroenterologist', location: 'Gachibowli', time: '9 min ago', detail: 'SMS sent: "Your slot moved to 5:30 PM"' },
  { id: 'ev-005', type: 'booked', doctor: 'Dr. Anjali Sharma', specialty: 'Psychiatrist', location: 'Bandra', time: '11 min ago', detail: 'Slot booked for 12:30 PM' },
  { id: 'ev-006', type: 'completed', doctor: 'Dr. Meera Iyer', specialty: 'Paediatrician', location: 'Juhu', time: '14 min ago', detail: 'Consultation completed — 5 min early' },
  { id: 'ev-007', type: 'delayed', doctor: 'Dr. Arjun Mehta', specialty: 'Dermatologist', location: 'Koramangala', time: '17 min ago', detail: 'Running 25 min late — patients notified' },
];

const EVENT_CONFIG = {
  booked: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/15', border: 'border-blue-500/25', label: 'Booked', dot: 'bg-blue-400' },
  delayed: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/25', label: 'Delayed', dot: 'bg-red-400' },
  completed: { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/25', label: 'On Time', dot: 'bg-emerald-400' },
  notified: { icon: Bell, color: 'text-cyan-400', bg: 'bg-cyan-500/15', border: 'border-cyan-500/25', label: 'Notified', dot: 'bg-cyan-400' },
};

export default function LiveWaitFeed() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [pulseIdx, setPulseIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIdx((i) => (i + 1) % FEED_EVENTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
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
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* Left — copy */}
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-red-500 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              Live activity feed (simulated)
            </div>
            <p className="text-base text-gray-500 leading-relaxed max-w-md mb-6">
              When a doctor runs late, LocDoc detects it instantly and notifies all waiting patients — no more silent waits, no more wasted trips.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: '82%', label: 'Ghosting reduction', color: 'text-blue-600' },
                { val: '< 15m', label: 'Avg wait alert', color: 'text-cyan-600' },
                { val: '100%', label: 'Patients notified', color: 'text-emerald-600' },
                { val: '48h', label: 'Doctor verification', color: 'text-purple-600' },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-200">
                  <p className={`text-2xl font-black leading-none tracking-tight ${s.color}`}>{s.val}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live feed */}
          <div className="reveal-up">
            <div
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl"
              style={{ background: '#0a0f1e' }}
            >
              {/* Feed header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-semibold text-white/70">Live Queue Monitor</span>
                </div>
                <span className="text-[10px] text-white/25">Simulated preview</span>
              </div>

              {/* Events */}
              <div className="divide-y divide-white/5">
                {FEED_EVENTS.slice(0, visibleCount).map((event, i) => {
                  const cfg = EVENT_CONFIG[event.type];
                  const isActive = i === pulseIdx % visibleCount;
                  return (
                    <div
                      key={`feed-${event.id}`}
                      className={`flex items-start gap-3 px-5 py-3.5 transition-all duration-500 ${
                        isActive ? 'bg-white/6' : 'opacity-60 hover:opacity-80'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${cfg.bg} ${cfg.border}`}>
                        <cfg.icon size={13} className={cfg.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-sm font-semibold text-white">{event.doctor}</span>
                            <span className="text-xs text-white/35 ml-1.5">· {event.specialty}</span>
                          </div>
                          <span className="text-[10px] text-white/25 flex-shrink-0">{event.time}</span>
                        </div>
                        <p className="text-xs text-white/40 mt-0.5">{event.detail}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-white/25">{event.location}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {visibleCount < FEED_EVENTS.length && (
                <div className="px-5 py-3 border-t border-white/8">
                  <button
                    onClick={() => setVisibleCount(FEED_EVENTS.length)}
                    className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Show {FEED_EVENTS.length - visibleCount} more events
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}