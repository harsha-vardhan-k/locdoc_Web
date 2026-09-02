'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle, MapPin, Clock, Home, FlaskConical, Info, ChevronDown, ChevronUp, Shield, Zap, Tag, Package,  } from 'lucide-react';
import { LAB_TESTS, LAB_PACKAGES } from '@/data/lab-tests';

interface NearbyCenter {
  id: string;
  name: string;
  area: string;
  distance: string;
  price: number;
  mrp: number;
  homeCollection: boolean;
  reportTime: string;
  rating: number;
  nabl: boolean;
}

// Mock nearby centers per test — in a real app this would come from an API
function getNearbyCenters(testId: string, basePrice: number, baseMrp: number): NearbyCenter[] {
  const seed = testId.charCodeAt(testId.length - 1);
  return [
    {
      id: `${testId}-c1`,
      name: 'Thyrocare Technologies',
      area: 'Andheri West',
      distance: '1.2 km',
      price: basePrice,
      mrp: baseMrp,
      homeCollection: true,
      reportTime: '6 hours',
      rating: 4.8,
      nabl: true,
    },
    {
      id: `${testId}-c2`,
      name: 'SRL Diagnostics',
      area: 'Bandra East',
      distance: '2.4 km',
      price: Math.round(basePrice * 1.08),
      mrp: baseMrp,
      homeCollection: true,
      reportTime: '8 hours',
      rating: 4.6,
      nabl: true,
    },
    {
      id: `${testId}-c3`,
      name: 'Metropolis Healthcare',
      area: 'Juhu',
      distance: '3.1 km',
      price: Math.round(basePrice * 1.15),
      mrp: baseMrp,
      homeCollection: false,
      reportTime: '12 hours',
      rating: 4.7,
      nabl: true,
    },
    {
      id: `${testId}-c4`,
      name: 'Dr. Lal PathLabs',
      area: 'Vile Parle',
      distance: `${(3.5 + (seed % 3)).toFixed(1)} km`,
      price: Math.round(basePrice * 1.05),
      mrp: baseMrp,
      homeCollection: true,
      reportTime: '10 hours',
      rating: 4.5,
      nabl: true,
    },
  ];
}

export default function LabTestDetailPage() {
  const params = useParams();
  const testId = params?.id as string;

  // Check both individual tests and packages
  const test = LAB_TESTS.find((t) => t.id === testId);
  const pkg = LAB_PACKAGES.find((p) => p.id === testId);
  const item = test ?? pkg;

  const [homeCollectionOnly, setHomeCollectionOnly] = useState(false);
  const [selectedCenterId, setSelectedCenterId] = useState<string | null>(null);
  const [showAllCenters, setShowAllCenters] = useState(false);
  const [booked, setBooked] = useState<string | null>(null);

  if (!item) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3">🔬</div>
            <h2 className="text-lg font-bold text-foreground mb-1">Test not found</h2>
            <Link href="/lab-tests" className="text-sm text-primary hover:underline">
              Back to Lab Tests
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const centers = getNearbyCenters(item.id, item.price, item.mrp);
  const filteredCenters = homeCollectionOnly ? centers.filter((c) => c.homeCollection) : centers;
  const visibleCenters = showAllCenters ? filteredCenters : filteredCenters.slice(0, 3);
  const bestCenter = filteredCenters.reduce((a, b) => (a.price <= b.price ? a : b), filteredCenters[0]);
  const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  const isPackage = !!pkg;
  const testsIncluded = isPackage ? pkg.tests : [];
  const parameters = test?.parameters;

  const handleBook = (centerId?: string) => {
    const id = centerId ?? bestCenter?.id;
    if (id) {
      setBooked(id);
      setTimeout(() => setBooked(null), 2000);
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Back nav */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
            <Link
              href="/lab-tests"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Lab Tests
            </Link>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Test details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-primary-soft flex items-center justify-center flex-shrink-0 text-4xl">
                    {isPackage ? '📦' : '🧪'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {isPackage && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-soft text-primary border border-primary/20">
                          Health Package
                        </span>
                      )}
                      {item.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-warning/10 text-warning border border-warning/20">
                          Popular
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-success text-white">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    <h1 className="text-xl font-extrabold text-foreground leading-tight">
                      {item.name}
                    </h1>

                    {parameters && (
                      <p className="text-sm text-accent font-semibold mt-0.5">
                        {parameters} parameters
                      </p>
                    )}
                    {isPackage && (
                      <p className="text-sm text-accent font-semibold mt-0.5">
                        {testsIncluded.length} tests included
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-2xl font-extrabold text-foreground font-tabular">
                        ₹{item.price}
                      </span>
                      {item.mrp > item.price && (
                        <span className="text-sm text-muted-foreground line-through font-tabular">
                          ₹{item.mrp}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">starting price</span>
                    </div>

                    {/* Availability */}
                    <div className="mt-2 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-success">
                        <CheckCircle2 size={13} />
                        Available at {centers.length} centers nearby
                      </span>
                      {item.homeCollection && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                          <Home size={13} />
                          Home collection available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: 'Report Time',
                    value: item.reportTime,
                    icon: Clock,
                    color: 'text-primary',
                  },
                  {
                    label: 'Home Collection',
                    value: item.homeCollection ? 'Available' : 'Not available',
                    icon: Home,
                    color: item.homeCollection ? 'text-success' : 'text-muted-foreground',
                  },
                  {
                    label: isPackage ? 'Tests Included' : 'Parameters',
                    value: isPackage ? `${testsIncluded.length} tests` : parameters ? `${parameters}` : '—',
                    icon: isPackage ? Package : FlaskConical,
                    color: 'text-accent',
                  },
                  {
                    label: 'Lab Standard',
                    value: 'NABL Accredited',
                    icon: Shield,
                    color: 'text-success',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-card rounded-xl border border-border p-4 flex flex-col items-center text-center gap-1.5"
                  >
                    <item.icon size={18} className={item.color} />
                    <p className="text-xs font-bold text-foreground leading-tight">{item.value}</p>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Info size={15} className="text-primary" />
                  About this test
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Tags (individual tests only) */}
                {test && test.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {test.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-pill bg-muted text-xs text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tests included (packages only) */}
                {isPackage && testsIncluded.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <Tag size={13} className="text-primary" />
                      Tests included
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {testsIncluded.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-pill bg-primary-soft text-xs text-primary border border-primary/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Preparation instructions */}
              {test?.preparation && (
                <div className="bg-warning-bg border border-warning/20 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-foreground mb-0.5">Preparation instructions</p>
                    <p className="text-xs text-muted-foreground">{test.preparation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Nearby centers sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <MapPin size={15} className="text-primary" />
                    Nearby centers
                  </h2>
                  {/* Home collection toggle */}
                  <button
                    onClick={() => setHomeCollectionOnly(!homeCollectionOnly)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-pill border text-[11px] font-semibold transition-all ${
                      homeCollectionOnly
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Home size={11} />
                    Home only
                  </button>
                </div>

                {filteredCenters.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">No centers with home collection nearby.</p>
                    <button
                      onClick={() => setHomeCollectionOnly(false)}
                      className="text-xs text-primary hover:underline mt-1"
                    >
                      Show all centers
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {visibleCenters.map((center) => {
                        const centerDiscount = Math.round(((center.mrp - center.price) / center.mrp) * 100);
                        const isSelected = selectedCenterId === center.id;
                        const justBooked = booked === center.id;

                        return (
                          <div
                            key={center.id}
                            onClick={() => setSelectedCenterId(isSelected ? null : center.id)}
                            className={`rounded-xl border p-3.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-primary/50 bg-primary-soft' :'border-border hover:border-primary/30 hover:bg-muted/30'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">
                                  {center.name}
                                </p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} className="text-muted-foreground flex-shrink-0" />
                                  <span className="text-[10px] text-muted-foreground">
                                    {center.area} · {center.distance}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                    <Clock size={9} />
                                    {center.reportTime}
                                  </span>
                                  {center.homeCollection && (
                                    <span className="flex items-center gap-1 text-[10px] text-success">
                                      <Home size={9} />
                                      Home
                                    </span>
                                  )}
                                  {center.nabl && (
                                    <span className="flex items-center gap-1 text-[10px] text-primary">
                                      <Shield size={9} />
                                      NABL
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="flex items-baseline gap-1 justify-end">
                                  <span className="text-sm font-extrabold text-foreground font-tabular">
                                    ₹{center.price}
                                  </span>
                                  {center.mrp > center.price && (
                                    <span className="text-[10px] text-muted-foreground line-through font-tabular">
                                      ₹{center.mrp}
                                    </span>
                                  )}
                                </div>
                                {centerDiscount > 0 && (
                                  <span className="text-[10px] font-bold text-success">
                                    {centerDiscount}% off
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-end mt-2.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBook(center.id);
                                }}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all active:scale-95 ${
                                  justBooked
                                    ? 'bg-success text-white' :'bg-primary text-primary-foreground hover:bg-primary-2'
                                }`}
                              >
                                {justBooked ? (
                                  <>
                                    <CheckCircle2 size={11} />
                                    Booked!
                                  </>
                                ) : (
                                  <>
                                    <Zap size={11} />
                                    Book
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Show more / less */}
                    {filteredCenters.length > 3 && (
                      <button
                        onClick={() => setShowAllCenters(!showAllCenters)}
                        className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                      >
                        {showAllCenters ? (
                          <>
                            <ChevronUp size={13} />
                            Show less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={13} />
                            {filteredCenters.length - 3} more centers
                          </>
                        )}
                      </button>
                    )}

                    {/* Book best price CTA */}
                    {bestCenter && (
                      <button
                        onClick={() => handleBook()}
                        className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                          booked === bestCenter.id
                            ? 'bg-success text-white' :'bg-primary text-primary-foreground hover:bg-primary-2 shadow-brand'
                        }`}
                      >
                        {booked === bestCenter.id ? (
                          <>
                            <CheckCircle2 size={16} />
                            Booking confirmed!
                          </>
                        ) : (
                          <>
                            <Zap size={16} />
                            Book at best price · ₹{bestCenter.price}
                          </>
                        )}
                      </button>
                    )}

                    <Link
                      href="/checkout"
                      className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary-soft transition-all"
                    >
                      Go to checkout
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
