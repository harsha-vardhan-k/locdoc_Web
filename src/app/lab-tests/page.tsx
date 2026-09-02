'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import AppLayout from '@/components/AppLayout';
import { Search, Home, CheckCircle2, Clock, ChevronDown, X, ShoppingCart, Package, Zap, Shield, Truck } from 'lucide-react';
import { LAB_TESTS, LAB_PACKAGES, LAB_CATEGORIES, LabTest, LabPackage } from '@/data/lab-tests';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'test' | 'package';
}

export default function LabTestsPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const packagesRef = useRef<HTMLElement>(null);
  const testsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const refs = [packagesRef, testsRef];
    refs.forEach((r) => {
      const el = r?.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.reveal-up, .reveal-scale').forEach((node, i) => {
              setTimeout(() => node.classList.add('visible'), i * 60);
            });
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(el);
    });
  }, []);

  const addToCart = (item: LabTest | LabPackage, type: 'test' | 'package') => {
    if (cartItems.find((c) => c.id === item.id)) return;
    setCartItems((prev) => [...prev, { id: item.id, name: item.name, price: item.price, type }]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((c) => c.id !== id));
  };

  const isInCart = (id: string) => cartItems.some((c) => c.id === id);
  const totalPrice = cartItems.reduce((sum, c) => sum + c.price, 0);

  const filteredTests = useMemo(() => {
    return LAB_TESTS.filter((t) => {
      const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
      const matchQ = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQ;
    });
  }, [selectedCategory, query]);

  const filteredPackages = useMemo(() => {
    return LAB_PACKAGES.filter((p) => {
      const matchCat = selectedCategory === 'all' || selectedCategory === 'packages';
      const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [selectedCategory, query]);

  const showPackages = selectedCategory === 'all' || selectedCategory === 'packages';

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Dark navy glassmorphism hero */}
        <div className="page-hero-dark py-14">
          <div className="absolute inset-0 grid-overlay pointer-events-none" />
          <div className={`relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-2 rounded-full glass border border-white/10 text-xs font-semibold text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-live-pulse" />
              NABL Accredited Labs · Home Collection
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-end">
              <div>
                <h1 className="page-headline text-white mb-4">
                  Book lab tests<br />
                  <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    near you.
                  </span>
                </h1>
                <p className="text-lg text-white/50 leading-relaxed max-w-md">
                  Compare prices across certified labs. Home collection available. Reports in your inbox.
                </p>
              </div>

              {/* Trust stats */}
              <div className="flex gap-3 lg:justify-end flex-wrap">
                {[
                  { val: 'NABL', label: 'Accredited', color: 'text-purple-400' },
                  { val: 'Free', label: 'Home Collection', color: 'text-cyan-400' },
                  { val: '4–24h', label: 'Report Time', color: 'text-emerald-400' },
                ].map((s) => (
                  <div key={s.label} className="glass-card rounded-2xl px-4 py-3 text-center bento-hover card-shine">
                    <p className={`text-xl font-black leading-none ${s.color}`}>{s.val}</p>
                    <p className="text-white/40 text-[10px] mt-1 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Search — glassmorphism */}
            <div className="mt-8 glass-card rounded-2xl p-4">
              <div className="relative max-w-2xl">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tests, e.g. CBC, thyroid, diabetes…"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-purple-400/50 focus:border-purple-400/30 transition-colors"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip — white section */}
        <div className="section-light border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-3">
            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              {[
                { icon: Shield, text: 'NABL Accredited Labs' },
                { icon: Home, text: 'Free Home Collection' },
                { icon: Clock, text: 'Reports in 4–24 hrs' },
                { icon: CheckCircle2, text: 'ICMR Approved Tests' },
                { icon: Zap, text: 'Instant Booking' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 micro-lift">
                  <item.icon size={13} className="text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-light-alt">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
            {/* Category tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
              {LAB_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-pill border text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 micro-lift ${
                    selectedCategory === cat.slug
                      ? 'bg-primary text-primary-foreground border-primary shadow-brand'
                      : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Health Packages — dark section */}
            {showPackages && filteredPackages.length > 0 && (
              <section ref={packagesRef} className="mb-12">
                <div className="section-dark rounded-3xl p-8 overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[60%] opacity-15 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.6) 0%, transparent 70%)' }} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6 reveal-up">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <Package size={18} className="text-purple-400" />
                      </div>
                      <div>
                        <h2 className="tight-headline text-white leading-none">Health Packages</h2>
                        <p className="text-white/40 text-xs mt-1">Comprehensive panels at the best value</p>
                      </div>
                      <span className="ml-auto px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">Best Value</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredPackages.map((pkg, i) => (
                        <div key={pkg.id} className="reveal-scale" style={{ transitionDelay: `${i * 80}ms` }}>
                          <PackageCard
                            pkg={pkg}
                            inCart={isInCart(pkg.id)}
                            onAdd={() => addToCart(pkg, 'package')}
                            onRemove={() => removeFromCart(pkg.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Individual Tests — light section */}
            {selectedCategory !== 'packages' && (
              <section ref={testsRef}>
                <div className="flex items-center justify-between mb-6 reveal-up">
                  <div>
                    <h2 className="tight-headline text-foreground leading-none">
                      Individual Tests
                      <span className="text-2xl font-bold text-muted-foreground ml-3">({filteredTests.length})</span>
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Compare prices across certified labs near you</p>
                  </div>
                </div>
                {filteredTests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="text-4xl mb-3">🔬</div>
                    <h3 className="text-base font-bold text-foreground mb-1">No tests found</h3>
                    <p className="text-sm text-muted-foreground">Try a different search or category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredTests.map((test, i) => (
                      <div key={test.id} className="reveal-up micro-lift glow-border-hover-cyan rounded-xl" style={{ transitionDelay: `${Math.min(i * 40, 400)}ms` }}>
                        <TestCard
                          test={test}
                          inCart={isInCart(test.id)}
                          onAdd={() => addToCart(test, 'test')}
                          onRemove={() => removeFromCart(test.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        {/* Floating cart */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <div className="glass-dark rounded-2xl shadow-lg px-5 py-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={16} className="text-blue-400" />
                  <span className="font-semibold text-sm text-white">{cartItems.length} test{cartItems.length > 1 ? 's' : ''} added</span>
                </div>
                <button onClick={() => setShowCart(!showCart)} className="text-white/40 hover:text-white">
                  <ChevronDown size={16} className={`transition-transform ${showCart ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {showCart && (
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <span className="text-white/70 truncate flex-1 mr-2">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white font-tabular">₹{item.price}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-white">
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/40">Total</p>
                  <p className="text-lg font-extrabold text-white font-tabular">₹{totalPrice}</p>
                </div>
                <Link
                  href={`/order-review?items=${cartItems.map((c) => c.id).join(',')}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)', color: '#fff' }}
                >
                  Proceed to Book
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function TestCard({ test, inCart, onAdd, onRemove }: { test: LabTest; inCart: boolean; onAdd: () => void; onRemove: () => void }) {
  const discount = Math.round(((test.mrp - test.price) / test.mrp) * 100);
  return (
    <div className="bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all p-4 flex flex-col gap-3 h-full card-shine">
      <Link href={`/lab-tests/${test.id}`} className="block flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight hover:text-primary transition-colors">{test.name}</h3>
            {test.parameters && (
              <p className="text-xs text-muted-foreground mt-0.5">{test.parameters} parameters</p>
            )}
          </div>
          {test.popular && (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-pill bg-warning/10 text-warning text-[10px] font-semibold">Popular</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-3">{test.description}</p>
        <div className="flex flex-wrap gap-2 text-[10px] mt-3">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock size={10} />
            {test.reportTime}
          </span>
          {test.homeCollection && (
            <span className="flex items-center gap-1 text-success">
              <Truck size={10} />
              Home collection
            </span>
          )}
        </div>
      </Link>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-foreground font-tabular">₹{test.price}</span>
            {discount > 0 && (
              <>
                <span className="text-xs text-muted-foreground line-through font-tabular">₹{test.mrp}</span>
                <span className="px-1.5 py-0.5 rounded-pill bg-success/10 text-success text-[10px] font-semibold">{discount}% off</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={inCart ? onRemove : onAdd}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all micro-lift ${
            inCart
              ? 'bg-success/10 text-success border border-success/30 hover:bg-danger/10 hover:text-danger hover:border-danger/30' :'bg-primary text-primary-foreground hover:bg-primary-2'
          }`}
        >
          {inCart ? <><CheckCircle2 size={12} /> Added</> : <><ShoppingCart size={12} /> Add</>}
        </button>
      </div>
    </div>
  );
}

function PackageCard({ pkg, inCart, onAdd, onRemove }: { pkg: LabPackage; inCart: boolean; onAdd: () => void; onRemove: () => void }) {
  const discount = Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100);
  return (
    <div className="glass-card rounded-xl p-4 flex flex-col gap-3 h-full bento-hover card-shine">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-white leading-tight">{pkg.name}</h3>
          <p className="text-xs text-white/40 mt-0.5">{(pkg as any).tests?.length ?? 0} tests included</p>
        </div>
        {discount > 0 && (
          <span className="flex-shrink-0 px-2 py-0.5 rounded-pill bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">{discount}% off</span>
        )}
      </div>
      <p className="text-xs text-white/40 line-clamp-2 flex-1">{pkg.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div>
          <span className="text-lg font-black text-white font-tabular">₹{pkg.price}</span>
          {discount > 0 && <span className="text-xs text-white/30 line-through ml-2 font-tabular">₹{pkg.mrp}</span>}
        </div>
        <button
          onClick={inCart ? onRemove : onAdd}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all micro-lift ${
            inCart
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :'bg-white/15 text-white border border-white/20 hover:bg-white/25'
          }`}
        >
          {inCart ? <><CheckCircle2 size={12} /> Added</> : <><ShoppingCart size={12} /> Add</>}
        </button>
      </div>
    </div>
  );
}
