'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, SlidersHorizontal, X, ChevronDown, AlertCircle } from 'lucide-react';
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
  const [selectedCity,setSelectedCity] = useState('');
  const [nearMe, setNearMe] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading] = useState(false);

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
      {/* Page hero */}
      <div className="gradient-hero border-b border-border py-10">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Verified doctors
            </p>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Find a Doctor</h1>
            <p className="text-sm text-muted-foreground mb-6">
              All doctors verified via NMC, ABDM NMR, or State Medical Councils. Live availability shown in real time.
            </p>

            {/* Search bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e?.target?.value)}
                  placeholder="Search doctor, specialty, clinic…"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors shadow-xs"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e?.target?.value)}
                  className="pl-8 pr-8 py-3 rounded-xl border border-border bg-card text-sm font-medium text-foreground appearance-none cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors shadow-xs"
                >
                  {CITIES?.map((c) => (
                    <option key={`city-filter-${c}`} value={c === 'All Cities' ? '' : c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {/* Near me chip */}
          <button
            onClick={() => setNearMe(!nearMe)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all ${
              nearMe
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
            }`}
          >
            <MapPin size={12} />
            Near me
          </button>

          {/* Available today */}
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all ${
              availableOnly
                ? 'bg-success text-white border-success' :'bg-card text-muted-foreground border-border hover:border-success hover:text-success'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${availableOnly ? 'bg-white' : 'bg-success'}`} />
            Available today
          </button>

          {/* Specialty chips */}
          <div className="flex flex-wrap gap-1.5">
            {SPECIALTIES?.slice(0, 8)?.map((spec) => (
              <button
                key={`spec-chip-${spec?.slug}`}
                onClick={() =>
                  setSelectedSpecialty(selectedSpecialty === spec?.name ? '' : spec?.name)
                }
                className={`px-3 py-1.5 rounded-pill border text-xs font-medium transition-all ${
                  selectedSpecialty === spec?.name
                    ? 'bg-primary-soft text-primary border-primary/40' :'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary'
                }`}
              >
                {spec?.icon} {spec?.name}
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* Sort */}
          <div className="relative flex items-center gap-1.5">
            <SlidersHorizontal size={14} className="text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="pl-2 pr-6 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground appearance-none cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            >
              {SORT_OPTIONS?.map((opt) => (
                <option key={`sort-${opt?.value}`} value={opt?.value}>
                  {opt?.label}
                </option>
              ))}
            </select>
            <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Clear filters */}
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
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground font-tabular">{filtered?.length}</span>{' '}
            doctor{filtered?.length !== 1 ? 's' : ''} found
            {selectedSpecialty && (
              <span className="ml-1">
                in{' '}
                <span className="font-medium text-primary">{selectedSpecialty}</span>
              </span>
            )}
          </p>
          {nearMe && (
            <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
              <MapPin size={12} />
              Showing results near Hyderabad
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

        {/* Loading state */}
        {loading ? (
          <DoctorsLoadingSkeleton />
        ) : filtered?.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 text-3xl">
              🩺
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {filtered?.map((doctor) => (
              <DoctorCard key={`doctor-card-${doctor?.id}`} doctor={doctor} />
            ))}
          </div>
        )}

        {/* Pagination stub */}
        {filtered?.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40" disabled>
              Previous
            </button>
            {[1, 2, 3]?.map((p) => (
              <button
                key={`page-${p}`}
                className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors ${
                  p === 1
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {p}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}