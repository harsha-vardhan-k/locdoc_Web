'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MapPin, SlidersHorizontal, X, ChevronDown, AlertCircle, Stethoscope, Star } from 'lucide-react';
import { DOCTORS, SPECIALTIES, filterDoctors } from '@/data/doctors';
import DoctorCard from '@/components/ui/DoctorCard';
import DoctorsLoadingSkeleton from './DoctorsLoadingSkeleton';

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'punctuality', label: 'Most Punctual' },
  { value: 'fee-asc', label: 'Fee: Low to High' },
  { value: 'fee-desc', label: 'Fee: High to Low' },
  { value: 'experience', label: 'Most Experienced' },
];

const CITIES = ['All Cities', 'Hyderabad', 'Bengaluru', 'Mumbai'];

export default function DoctorsListingContent() {
  const [query, setQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [nearMe, setNearMe] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const el = resultsRef?.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-up').forEach((node, i) => {
            setTimeout(() => node.classList.add('visible'), i * 60);
          });
        }
      },
      { threshold: 0.05 }
    );
    observer?.observe(el);
    return () => observer?.disconnect();
  }, []);

  const filtered = useMemo(() => {
    let result = filterDoctors(DOCTORS, query, selectedSpecialty, selectedCity === 'All Cities' ? '' : selectedCity);
    if (availableOnly) result = result?.filter((d) => d?.availableToday);
    if (nearMe) result = result?.filter((d) => d?.city === 'Hyderabad');
    return result?.sort((a, b) => {
      switch (sortBy) {
        case 'punctuality': return b?.punctuality - a?.punctuality;
        case 'fee-asc': return a?.fee - b?.fee;
        case 'fee-desc': return b?.fee - a?.fee;
        case 'experience': return b?.experience - a?.experience;
        default: return b?.rating - a?.rating;
      }
    });
  }, [query, selectedSpecialty, selectedCity, availableOnly, nearMe, sortBy]);

  const hasFilters = query || selectedSpecialty || (selectedCity && selectedCity !== 'All Cities') || availableOnly || nearMe;

  const clearFilters = () => {
    setQuery('');
    setSelectedSpecialty('');
    setSelectedCity('');
    setNearMe(false);
    setAvailableOnly(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dark navy glassmorphism hero */}
      <div className="page-hero-dark py-14">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay pointer-events-none" />

        <div className={`relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-emerald-300">
            <span className="status-pulse-green" />
            NMC Verified Doctors · Live Availability
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="page-headline text-white mb-4">
                Find the right<br />
                <span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  doctor.
                </span>
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                All doctors verified via NMC, ABDM NMR, or State Medical Councils. Live availability shown in real time.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 lg:justify-end">
              {[
                { val: '2,400+', label: 'Verified Doctors', icon: Stethoscope, color: 'text-blue-400' },
                { val: '94%', label: 'On-time Rate', icon: Star, color: 'text-emerald-400' },
                { val: '3', label: 'Cities', icon: MapPin, color: 'text-cyan-400' },
              ]?.map((s) => (
                <div key={s?.label} className="glass-card rounded-2xl px-4 py-3 text-center flex-1 lg:flex-none lg:min-w-[100px] bento-hover card-shine">
                  <s.icon size={14} className={`${s?.color} mx-auto mb-1`} />
                  <p className={`text-xl font-black leading-none ${s?.color}`}>{s?.val}</p>
                  <p className="text-white/40 text-[10px] mt-1 font-medium">{s?.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar — glassmorphism */}
          <div className="mt-8 glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e?.target?.value)}
                placeholder="Search doctor, specialty, clinic…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/30 transition-colors"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e?.target?.value)}
                className="pl-8 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white appearance-none cursor-pointer hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-blue-400/50 transition-colors"
              >
                {CITIES?.map((c) => (
                  <option key={`city-filter-${c}`} value={c === 'All Cities' ? '' : c} className="bg-slate-900 text-white">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* White section — filters + results */}
      <div className="section-light">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              onClick={() => setNearMe(!nearMe)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all micro-lift ${
                nearMe ? 'bg-primary text-primary-foreground border-primary shadow-brand' : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
              }`}
            >
              <MapPin size={12} />
              Near me
            </button>

            <button
              onClick={() => setAvailableOnly(!availableOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all micro-lift ${
                availableOnly ? 'bg-success text-white border-success' : 'bg-card text-muted-foreground border-border hover:border-success hover:text-success'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${availableOnly ? 'bg-white' : 'bg-success'}`} />
              Available today
            </button>

            <div className="flex flex-wrap gap-1.5">
              {SPECIALTIES?.slice(0, 8)?.map((spec) => (
                <button
                  key={`spec-chip-${spec?.slug}`}
                  onClick={() => setSelectedSpecialty(selectedSpecialty === spec?.name ? '' : spec?.name)}
                  className={`px-3 py-1.5 rounded-pill border text-xs font-medium transition-all micro-lift ${
                    selectedSpecialty === spec?.name
                      ? 'bg-primary-soft text-primary border-primary/40 shadow-sm'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {spec?.icon} {spec?.name}
                </button>
              ))}
            </div>

            <div className="flex-1" />

            <div className="relative flex items-center gap-1.5">
              <SlidersHorizontal size={14} className="text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="pl-2 pr-6 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground appearance-none cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              >
                {SORT_OPTIONS?.map((opt) => (
                  <option key={`sort-${opt?.value}`} value={opt?.value}>{opt?.label}</option>
                ))}
              </select>
              <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-pill border border-danger/30 bg-danger-bg text-danger text-xs font-semibold hover:bg-danger hover:text-white transition-all"
              >
                <X size={11} />
                Clear filters
              </button>
            )}
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="tight-headline text-foreground leading-none">
                <span className="text-gradient-brand">{filtered?.length}</span>
                <span className="text-2xl font-bold text-muted-foreground ml-2">doctor{filtered?.length !== 1 ? 's' : ''} found</span>
              </p>
              {selectedSpecialty && (
                <p className="text-sm text-muted-foreground mt-1">
                  in <span className="font-semibold text-primary">{selectedSpecialty}</span>
                </p>
              )}
            </div>
            {nearMe && (
              <div className="flex items-center gap-1.5 text-xs text-accent font-medium px-3 py-1.5 rounded-pill bg-accent/10 border border-accent/20">
                <MapPin size={12} />
                Near Hyderabad
              </div>
            )}
          </div>

          {/* Delayed warning banner */}
          {filtered?.some((d) => d?.liveStatus === 'delayed') && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-warning-bg border border-warning/30 mb-5">
              <AlertCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-warning">Some doctors are running late today</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  LocDoc has already notified affected patients. You can still book — we&apos;ll keep you updated.
                </p>
              </div>
            </div>
          )}

          {/* Results grid */}
          <div ref={resultsRef}>
            {loading ? (
              <DoctorsLoadingSkeleton />
            ) : filtered?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 text-3xl">🩺</div>
                <h3 className="text-base font-bold text-foreground mb-1">No doctors found</h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-4">
                  No doctors match your current filters. Try adjusting the specialty, city, or search query.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered?.map((doctor, i) => (
                  <div
                    key={`doctor-card-${doctor?.id}`}
                    className="reveal-up micro-lift glow-border-hover rounded-xl"
                    style={{ transitionDelay: `${Math.min(i * 40, 400)}ms` }}
                  >
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {filtered?.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40" disabled>
                Previous
              </button>
              <span className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">1</span>
              <button className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40" disabled>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}