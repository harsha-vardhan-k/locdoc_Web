'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  ChevronDown,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import { PRODUCTS, MEDICINE_CATEGORIES, HEALTH_CONCERNS, lowestOffer,  } from '@/data/medicines';
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
  const [nearMe, setNearMe] = useState(false);
  const [prescriptionOnly, setPrescriptionOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [loading] = useState(false);

  const isFiltering = query || selectedCategory || nearMe || prescriptionOnly;

  const filtered = useMemo(() => {
    if (!isFiltering) return [];

    let result = PRODUCTS?.filter((p) => {
      const matchQ =
        !query ||
        p?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        p?.genericName?.toLowerCase()?.includes(query?.toLowerCase()) ||
        p?.tags?.some((t) => t?.toLowerCase()?.includes(query?.toLowerCase()));
      const matchCat = !selectedCategory || p?.category === selectedCategory;
      const matchRx = !prescriptionOnly || p?.prescription;
      const matchNear = !nearMe || p?.offers?.some((o) => o?.area === 'Banjara Hills');
      return matchQ && matchCat && matchRx && matchNear;
    });

    return result?.sort((a, b) => {
      const bestA = lowestOffer(a);
      const bestB = lowestOffer(b);
      switch (sortBy) {
        case 'price-asc':
          return (bestA?.price ?? 9999) - (bestB?.price ?? 9999);
        case 'price-desc':
          return (bestB?.price ?? 0) - (bestA?.price ?? 0);
        case 'discount': {
          const discA = bestA ? Math.round(((bestA?.mrp - bestA?.price) / bestA?.mrp) * 100) : 0;
          const discB = bestB ? Math.round(((bestB?.mrp - bestB?.price) / bestB?.mrp) * 100) : 0;
          return discB - discA;
        }
        default:
          return 0;
      }
    });
  }, [query, selectedCategory, nearMe, prescriptionOnly, sortBy, isFiltering]);

  const hasFilters = isFiltering;

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setNearMe(false);
    setPrescriptionOnly(false);
  };

  // Discovery shelves data
  const trendingProducts = PRODUCTS?.slice(0, 6);
  const skinCareProducts = PRODUCTS?.filter((p) => p?.category === 'skin-care');
  const diabetesProducts = PRODUCTS?.filter((p) => p?.category === 'diabetes');

  return (
    <div className="min-h-screen bg-background">
      {/* Page hero */}
      <div className="gradient-hero border-b border-border py-10">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">
              Pharmacy marketplace
            </p>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Buy Medicines</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Compare prices across verified local pharmacies. Same medicine, best price near you.
            </p>

            {/* Search bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e?.target?.value)}
                  placeholder="Search medicines, brands, generics, health conditions…"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors shadow-xs"
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
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 active:scale-95 transition-all shadow-xs">
                <Search size={15} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['Paracetamol', 'Vitamin D3', 'Insulin', 'Metformin', 'Cetirizine']?.map((tag) => (
                <button
                  key={`quick-med-${tag}`}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-pill border border-border bg-card text-xs font-medium text-muted-foreground hover:border-accent hover:text-accent transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Cart summary pill */}
          {itemCount > 0 && (
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-brand">
                <ShoppingCart size={15} />
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
        onSelectCategory={(slug) =>
          setSelectedCategory(selectedCategory === slug ? '' : slug)
        }
      />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
        {/* Discovery mode — shown when no filters active */}
        {!isFiltering && !loading && (
          <div className="space-y-12">
            {/* Health concerns shelf */}
            <HealthConcernShelf
              concerns={HEALTH_CONCERNS}
              onSelect={(slug) => setSelectedCategory(slug)}
            />

            {/* Trending products */}
            <ProductShelf
              title="Trending near you"
              subtitle="Most ordered in Hyderabad this week"
              products={trendingProducts}
              viewAllHref="/medicines-page"
            />

            {/* Diabetes care */}
            {diabetesProducts?.length > 0 && (
              <ProductShelf
                title="Diabetes care essentials"
                subtitle="Manage your diabetes with verified medicines"
                products={diabetesProducts}
                viewAllHref="/medicines-page"
                onViewAllClick={() => setSelectedCategory('diabetes')}
              />
            )}

            {/* Skin care */}
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

        {/* Filtered results mode */}
        {isFiltering && (
          <>
            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
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

              <button
                onClick={() => setPrescriptionOnly(!prescriptionOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill border text-xs font-semibold transition-all ${
                  prescriptionOnly
                    ? 'bg-warning text-white border-warning' :'bg-card text-muted-foreground border-border hover:border-warning hover:text-warning'
                }`}
              >
                Rx only
              </button>

              {/* Category chips */}
              <div className="flex flex-wrap gap-1.5">
                {MEDICINE_CATEGORIES?.map((cat) => (
                  <button
                    key={`cat-chip-${cat?.slug}`}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat?.slug ? '' : cat?.slug)
                    }
                    className={`px-3 py-1.5 rounded-pill border text-xs font-medium transition-all ${
                      selectedCategory === cat?.slug
                        ? 'bg-accent-soft text-accent border-accent/40' :'bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-accent'
                    }`}
                  >
                    {cat?.icon} {cat?.name}
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
                    <option key={`med-sort-${opt?.value}`} value={opt?.value}>
                      {opt?.label}
                    </option>
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

            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground font-tabular">{filtered?.length}</span>{' '}
                product{filtered?.length !== 1 ? 's' : ''} found
                {selectedCategory && (
                  <span className="ml-1">
                    in{' '}
                    <span className="font-medium text-accent">
                      {MEDICINE_CATEGORIES?.find((c) => c?.slug === selectedCategory)?.name}
                    </span>
                  </span>
                )}
              </p>
              {nearMe && (
                <div className="flex items-center gap-1.5 text-xs text-accent font-medium">
                  <MapPin size={12} />
                  Filtered to Banjara Hills pharmacies
                </div>
              )}
            </div>

            {/* Loading */}
            {loading ? (
              <MedicinesLoadingSkeleton />
            ) : filtered?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4 text-3xl">
                  💊
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">No medicines found</h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-4">
                  We couldn&apos;t find medicines matching your search. Try a different name, generic, or category.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
                {filtered?.map((product) => (
                  <ProductCard key={`prod-card-${product?.id}`} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}