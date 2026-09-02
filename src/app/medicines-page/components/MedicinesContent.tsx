'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, MapPin, SlidersHorizontal, X, ChevronDown, ShoppingCart, ChevronRight,  } from 'lucide-react';
import LocationDropdown from '@/components/ui/LocationDropdown';
import { PRODUCTS, MEDICINE_CATEGORIES, HEALTH_CONCERNS, lowestOffer } from '@/data/medicines';
import ProductCard from '@/components/ui/ProductCard';
import CategoryBar from './CategoryBar';
import HealthConcernShelf from './HealthConcernShelf';
import ProductShelf from './ProductShelf';
import MedicinesLoadingSkeleton from './MedicinesLoadingSkeleton';
import { useCart } from '@/context/CartContext';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Best Discount' },
];

export default function MedicinesContent() {
  const { itemCount } = useCart();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [nearMe, setNearMe] = useState(false);
  const [prescriptionOnly, setPrescriptionOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
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
            setTimeout(() => node.classList.add('visible'), i * 50);
          });
        }
      },
      { threshold: 0.05 }
    );
    observer?.observe(el);
    return () => observer?.disconnect();
  }, []);

  const isFiltering = query || selectedCategory || nearMe || prescriptionOnly;

  const filtered = useMemo(() => {
    if (!isFiltering) return [];
    let result = PRODUCTS?.filter((p) => {
      const matchQ = !query || p?.name?.toLowerCase()?.includes(query?.toLowerCase()) || p?.genericName?.toLowerCase()?.includes(query?.toLowerCase()) || p?.tags?.some((t) => t?.toLowerCase()?.includes(query?.toLowerCase()));
      const matchCat = !selectedCategory || p?.category === selectedCategory;
      const matchRx = !prescriptionOnly || p?.prescription;
      const matchNear = !nearMe || p?.offers?.some((o) => o?.area === 'Banjara Hills');
      return matchQ && matchCat && matchRx && matchNear;
    });
    return result?.sort((a, b) => {
      const bestA = lowestOffer(a);
      const bestB = lowestOffer(b);
      switch (sortBy) {
        case 'price-asc': return (bestA?.price ?? 9999) - (bestB?.price ?? 9999);
        case 'price-desc': return (bestB?.price ?? 0) - (bestA?.price ?? 0);
        case 'discount': {
          const discA = bestA ? Math.round(((bestA?.mrp - bestA?.price) / bestA?.mrp) * 100) : 0;
          const discB = bestB ? Math.round(((bestB?.mrp - bestB?.price) / bestB?.mrp) * 100) : 0;
          return discB - discA;
        }
        default: return 0;
      }
    });
  }, [query, selectedCategory, nearMe, prescriptionOnly, sortBy, isFiltering]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setNearMe(false);
    setPrescriptionOnly(false);
  };

  const trendingProducts = PRODUCTS?.slice(0, 6);
  const skinCareProducts = PRODUCTS?.filter((p) => p?.category === 'skin-care');
  const diabetesProducts = PRODUCTS?.filter((p) => p?.category === 'diabetes');

  return (
    <div className="min-h-screen bg-background">
      {/* Dark navy glassmorphism hero */}
      <div className="page-hero-dark py-14">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        {/* Extra glow for medicines — cyan */}
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[50%] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.5) 0%, transparent 70%)' }} />

        <div className={`relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-live-pulse" />
            Pharmacy Marketplace · Compare Prices
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <h1 className="page-headline text-white mb-4">
                Buy medicines<br />
                <span style={{ background: 'linear-gradient(135deg, #22d3ee 0%, #60a5fa 50%, #34d399 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  at best price.
                </span>
              </h1>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                Compare prices across verified local pharmacies. Same medicine, best price near you.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 lg:justify-end flex-wrap">
              {[
                { val: '500+', label: 'Medicines', color: 'text-cyan-400' },
                { val: '50+', label: 'Pharmacies', color: 'text-blue-400' },
                { val: 'Up to 40%', label: 'Savings', color: 'text-emerald-400' },
              ]?.map((s) => (
                <div key={s?.label} className="glass-card rounded-2xl px-4 py-3 text-center bento-hover card-shine">
                  <p className={`text-xl font-black leading-none ${s?.color}`}>{s?.val}</p>
                  <p className="text-white/40 text-[10px] mt-1 font-medium">{s?.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search — glassmorphism */}
          <div className="mt-8 glass-card rounded-2xl p-4">
            <div className="flex gap-3">
              <LocationDropdown
                defaultLabel="All Cities"
                variant="dark"
                onApply={(label) => setSelectedCity(label)}
              />
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e?.target?.value)}
                  placeholder="Search medicines, brands, generics, health conditions…"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/30 transition-colors"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
              <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95" style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)', color: '#fff' }}>
                <Search size={15} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {['Paracetamol', 'Vitamin D3', 'Insulin', 'Metformin', 'Cetirizine']?.map((tag) => (
                <button
                  key={`quick-med-${tag}`}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-pill border border-white/10 bg-white/5 text-xs font-medium text-white/50 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {itemCount > 0 && (
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/15 text-sm font-semibold text-white">
                <ShoppingCart size={15} className="text-cyan-400" />
                {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
                <ChevronRight size={14} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category bar */}
      <CategoryBar
        categories={MEDICINE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => setSelectedCategory(selectedCategory === slug ? '' : slug)}
      />

      {/* Content */}
      <div className="section-light-alt">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
          {/* Discovery mode */}
          {!isFiltering && !loading && (
            <div className="space-y-12">
              <HealthConcernShelf
                concerns={HEALTH_CONCERNS}
                onSelect={(slug) => setSelectedCategory(slug)}
              />
              <ProductShelf
                title="Trending near you"
                subtitle="Most ordered in Hyderabad this week"
                products={trendingProducts}
                viewAllHref="/medicines-page"
              />
              {diabetesProducts?.length > 0 && (
                <ProductShelf
                  title="Diabetes care essentials"
                  subtitle="Manage your diabetes with verified medicines"
                  products={diabetesProducts}
                  viewAllHref="/medicines-page"
                  onViewAllClick={() => setSelectedCategory('diabetes')}
                />
              )}
              {skinCareProducts?.length > 0 && (
                <ProductShelf
                  title="Skin care & dermatology"
                  subtitle="Dermatologist-recommended products"
                  products={skinCareProducts}
                  viewAllHref="/medicines-page"
                  onViewAllClick={() => setSelectedCategory('skin-care')}
                />
              )}
            </div>
          )}

          {/* Filtered results */}
          {isFiltering && (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  onClick={() => setNearMe(!nearMe)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all micro-lift ${nearMe ? 'bg-primary text-primary-foreground border-primary shadow-brand' : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'}`}
                >
                  <MapPin size={12} />
                  Near me
                </button>
                <button
                  onClick={() => setPrescriptionOnly(!prescriptionOnly)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all micro-lift ${prescriptionOnly ? 'bg-warning text-white border-warning' : 'bg-card text-muted-foreground border-border hover:border-warning hover:text-warning'}`}
                >
                  Rx only
                </button>
                <div className="flex flex-wrap gap-1.5">
                  {MEDICINE_CATEGORIES?.map((cat) => (
                    <button
                      key={`cat-chip-${cat?.slug}`}
                      onClick={() => setSelectedCategory(selectedCategory === cat?.slug ? '' : cat?.slug)}
                      className={`px-3 py-1.5 rounded-pill border text-xs font-medium transition-all micro-lift ${selectedCategory === cat?.slug ? 'bg-accent-soft text-accent border-accent/40' : 'bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-accent'}`}
                    >
                      {cat?.icon} {cat?.name}
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
                {(isFiltering) && (
                  <button onClick={clearFilters} className="flex items-center gap-1 px-3 py-1.5 rounded-pill border border-danger/30 bg-danger-bg text-danger text-xs font-semibold hover:bg-danger hover:text-white transition-all">
                    <X size={11} />
                    Clear
                  </button>
                )}
              </div>

              {/* Results header */}
              <div className="mb-6">
                <p className="tight-headline text-foreground leading-none">
                  <span className="text-gradient-brand">{filtered?.length}</span>
                  <span className="text-2xl font-bold text-muted-foreground ml-2">result{filtered?.length !== 1 ? 's' : ''}</span>
                </p>
              </div>

              <div ref={resultsRef}>
                {loading ? (
                  <MedicinesLoadingSkeleton />
                ) : filtered?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-4xl mb-3">💊</div>
                    <h3 className="text-base font-bold text-foreground mb-1">No medicines found</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mb-4">Try a different search or category.</p>
                    <button onClick={clearFilters} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors">
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered?.map((product, i) => (
                      <div key={`med-${product?.id}`} className="reveal-up micro-lift glow-border-hover-cyan rounded-xl" style={{ transitionDelay: `${Math.min(i * 40, 400)}ms` }}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}