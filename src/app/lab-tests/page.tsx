'use client';

import React, { useState, useMemo } from 'react';
import AppLayout from '@/components/AppLayout';
import { FlaskConical, Search, Home, CheckCircle2, Clock, ChevronDown, X, ShoppingCart, Package, Zap, Shield, Truck } from 'lucide-react';
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
        {/* Hero */}
        <div className="gradient-hero border-b border-border py-10">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                NABL Accredited Labs
              </p>
              <h1 className="text-3xl font-extrabold text-foreground mb-2">Book Lab Tests</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Compare prices across certified labs near you. Home collection available. Reports in your inbox.
              </p>
              <div className="relative max-w-lg">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tests, e.g. CBC, thyroid, diabetes…"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors shadow-xs"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-3">
            <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              {[
                { icon: Shield, text: 'NABL Accredited Labs' },
                { icon: Home, text: 'Free Home Collection' },
                { icon: Clock, text: 'Reports in 4–24 hrs' },
                { icon: CheckCircle2, text: 'ICMR Approved Tests' },
                { icon: Zap, text: 'Instant Booking' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5">
                  <item.icon size={13} className="text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-6">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
            {LAB_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-pill border text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === cat.slug
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Health Packages */}
          {showPackages && filteredPackages.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-primary" />
                <h2 className="text-lg font-bold text-foreground">Health Packages</h2>
                <span className="px-2 py-0.5 rounded-pill bg-primary-soft text-primary text-xs font-semibold">Best Value</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    inCart={isInCart(pkg.id)}
                    onAdd={() => addToCart(pkg, 'package')}
                    onRemove={() => removeFromCart(pkg.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Individual Tests */}
          {selectedCategory !== 'packages' && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FlaskConical size={18} className="text-accent" />
                  <h2 className="text-lg font-bold text-foreground">Individual Tests</h2>
                  <span className="text-sm text-muted-foreground font-tabular">({filteredTests.length})</span>
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
                  {filteredTests.map((test) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      inCart={isInCart(test.id)}
                      onAdd={() => addToCart(test, 'test')}
                      onRemove={() => removeFromCart(test.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* Floating cart */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <div className="bg-foreground text-background rounded-2xl shadow-lg px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={16} className="text-primary" />
                  <span className="font-semibold text-sm">{cartItems.length} test{cartItems.length > 1 ? 's' : ''} added</span>
                </div>
                <button onClick={() => setShowCart(!showCart)} className="text-background/60 hover:text-background">
                  <ChevronDown size={16} className={`transition-transform ${showCart ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {showCart && (
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <span className="text-background/80 truncate flex-1 mr-2">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-background font-tabular">₹{item.price}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-background/40 hover:text-background">
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-background/60">Total</p>
                  <p className="text-lg font-extrabold text-background font-tabular">₹{totalPrice}</p>
                </div>
                <Link
                  href={`/order-review?items=${cartItems.map((c) => c.id).join(',')}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors"
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
    <div className="bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all p-4 flex flex-col gap-3">
      <Link href={`/lab-tests/${test.id}`} className="block">
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
              <Home size={10} />
              Home collection
            </span>
          )}
        </div>
        <div className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-1.5 mt-3">
          🧪 {test.preparation}
        </div>
      </Link>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-foreground font-tabular">₹{test.price}</span>
            <span className="text-xs text-muted-foreground line-through font-tabular">₹{test.mrp}</span>
          </div>
          <span className="text-[10px] font-semibold text-success">{discount}% off</span>
        </div>
        {inCart ? (
          <button
            onClick={onRemove}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger/30 bg-danger-bg text-danger text-xs font-semibold hover:bg-danger hover:text-white transition-all"
          >
            <X size={12} />
            Remove
          </button>
        ) : (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-2 transition-all active:scale-95"
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}

function PackageCard({ pkg, inCart, onAdd, onRemove }: { pkg: LabPackage; inCart: boolean; onAdd: () => void; onRemove: () => void }) {
  const discount = Math.round(((pkg.mrp - pkg.price) / pkg.mrp) * 100);
  return (
    <div className="bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all p-4 flex flex-col gap-3">
      <Link href={`/lab-tests/${pkg.id}`} className="block">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground leading-tight hover:text-primary transition-colors">{pkg.name}</h3>
          {pkg.popular && (
            <span className="flex-shrink-0 px-2 py-0.5 rounded-pill bg-primary-soft text-primary text-[10px] font-semibold">Best Value</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{pkg.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {pkg.tests.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-pill bg-muted text-muted-foreground text-[10px]">{t}</span>
          ))}
          {pkg.tests.length > 4 && (
            <span className="px-2 py-0.5 rounded-pill bg-muted text-muted-foreground text-[10px]">+{pkg.tests.length - 4} more</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] mt-3">
          <span className="flex items-center gap-1 text-muted-foreground"><Clock size={10} />{pkg.reportTime}</span>
          {pkg.homeCollection && <span className="flex items-center gap-1 text-success"><Home size={10} />Home collection</span>}
          <span className="flex items-center gap-1 text-muted-foreground"><Truck size={10} />{pkg.tests.length} tests</span>
        </div>
      </Link>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-foreground font-tabular">₹{pkg.price}</span>
            <span className="text-xs text-muted-foreground line-through font-tabular">₹{pkg.mrp}</span>
          </div>
          <span className="text-[10px] font-semibold text-success">{discount}% off</span>
        </div>
        {inCart ? (
          <button onClick={onRemove} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-danger/30 bg-danger-bg text-danger text-xs font-semibold hover:bg-danger hover:text-white transition-all">
            <X size={12} />Remove
          </button>
        ) : (
          <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-2 transition-all active:scale-95">
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
