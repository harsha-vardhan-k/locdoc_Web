'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Tag, CheckCircle2,
  FlaskConical, Pill, Package, AlertCircle, ChevronRight, Shield,
  Truck, Clock, Info, X
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { LAB_TESTS, LAB_PACKAGES } from '@/data/lab-tests';

interface LabCartItem {
  id: string;
  name: string;
  price: number;
  mrp: number;
  type: 'test' | 'package';
  detail?: string;
}

const VALID_COUPONS: Record<string, { discount: number; label: string; type: 'percent' | 'flat' }> = {
  LOCDOC10: { discount: 10, label: '10% off on your order', type: 'percent' },
  FIRSTLAB: { discount: 100, label: '₹100 flat off on lab tests', type: 'flat' },
  MEDCARE20: { discount: 20, label: '20% off on medicines', type: 'percent' },
};

function OrderReviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lines, setQty, removeItem, subtotal: medicineSubtotal } = useCart();

  const labItemIds = useMemo(() => {
    const raw = searchParams?.get('items') ?? '';
    return raw ? raw.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const [labItems, setLabItems] = useState<LabCartItem[]>([]);
  const [coupon, setCoupon] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState<null | { code: string; discount: number; label: string; type: 'percent' | 'flat' }>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const allTests = [...LAB_TESTS, ...LAB_PACKAGES];
    const found: LabCartItem[] = labItemIds.map((id) => {
      const t = allTests.find((x) => x.id === id);
      if (!t) return null;
      const isPackage = 'tests' in t;
      return {
        id: t.id,
        name: t.name,
        price: t.price,
        mrp: t.mrp,
        type: isPackage ? 'package' : 'test',
        detail: isPackage ? `${(t as typeof LAB_PACKAGES[0]).tests.length} tests included` : `${(t as typeof LAB_TESTS[0]).parameters ?? ''} parameters · ${t.reportTime} report`,
      } as LabCartItem;
    }).filter(Boolean) as LabCartItem[];
    setLabItems(found);
  }, [labItemIds]);

  const labSubtotal = labItems.reduce((s, i) => s + i.price, 0);
  const labMrpTotal = labItems.reduce((s, i) => s + i.mrp, 0);
  const medicineMrpTotal = lines.reduce((s, l) => s + l.offer.mrp * l.qty, 0);

  const grandSubtotal = medicineSubtotal + labSubtotal;
  const grandMrp = medicineMrpTotal + labMrpTotal;
  const savedOnMrp = grandMrp - grandSubtotal;

  const couponDiscount = useMemo(() => {
    if (!couponApplied) return 0;
    if (couponApplied.type === 'percent') return Math.round(grandSubtotal * couponApplied.discount / 100);
    return Math.min(couponApplied.discount, grandSubtotal);
  }, [couponApplied, grandSubtotal]);

  const grandTotal = grandSubtotal - couponDiscount;

  const totalItems = lines.reduce((s, l) => s + l.qty, 0) + labItems.length;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError('Please enter a coupon code'); return; }
    const found = VALID_COUPONS[code];
    if (!found) { setCouponError('Invalid coupon code. Try LOCDOC10'); return; }
    setCouponApplied({ code, ...found });
    setCoupon(code);
    setCouponError('');
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCoupon('');
    setCouponInput('');
    setCouponError('');
  };

  const handleRemoveLabItem = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setLabItems((prev) => prev.filter((i) => i.id !== id));
      setRemovingId(null);
    }, 250);
  };

  const handleProceed = () => {
    const labIds = labItems.map((i) => i.id).join(',');
    const params = new URLSearchParams();
    if (labIds) params.set('items', labIds);
    if (couponApplied) params.set('coupon', couponApplied.code);
    params.set('type', labItems.length > 0 && lines.length === 0 ? 'lab' : lines.length > 0 && labItems.length === 0 ? 'medicine' : 'mixed');
    router.push(`/checkout?${params.toString()}`);
  };

  const isEmpty = totalItems === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="page-hero-dark py-10">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass border border-white/15 flex items-center justify-center">
              <ShoppingCart size={20} className="text-blue-400" />
            </div>
            <div>
              <h1 className="tight-headline text-white leading-none">Review Order</h1>
              <p className="text-sm text-white/40 mt-1">
                {isEmpty ? 'Your cart is empty' : `${totalItems} item${totalItems !== 1 ? 's' : ''} · Review before checkout`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Nothing to review</h2>
            <p className="text-sm text-muted-foreground mb-6">Add medicines or lab tests to your cart first.</p>
            <div className="flex gap-3">
              <Link href="/medicines-page" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors">
                Browse Medicines
              </Link>
              <Link href="/lab-tests" className="px-5 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                Book Lab Tests
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Lab Tests Section */}
              {labItems.length > 0 && (
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-primary-soft">
                    <FlaskConical size={16} className="text-primary" />
                    <h2 className="text-sm font-bold text-foreground">Lab Tests & Packages</h2>
                    <span className="ml-auto px-2 py-0.5 rounded-pill bg-primary/10 text-primary text-xs font-semibold">{labItems.length} item{labItems.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="divide-y divide-border">
                    {labItems.map((item) => {
                      const discountPct = Math.round(((item.mrp - item.price) / item.mrp) * 100);
                      return (
                        <div
                          key={item.id}
                          className={`flex items-start gap-4 px-5 py-4 transition-all duration-200 ${removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100'}`}
                        >
                          <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center flex-shrink-0">
                            {item.type === 'package' ? <Package size={18} className="text-primary" /> : <FlaskConical size={18} className="text-primary" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-semibold text-foreground leading-tight">{item.name}</p>
                                {item.detail && <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>}
                              </div>
                              <button
                                onClick={() => handleRemoveLabItem(item.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-base font-extrabold text-foreground font-tabular">₹{item.price}</span>
                              <span className="text-xs text-muted-foreground line-through font-tabular">₹{item.mrp}</span>
                              {discountPct > 0 && (
                                <span className="px-1.5 py-0.5 rounded-pill bg-success/10 text-success text-[10px] font-semibold">{discountPct}% off</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 py-3 bg-muted/30 flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck size={12} className="text-success" />
                    <span>Free home collection available for all tests</span>
                  </div>
                </div>
              )}

              {/* Medicines Section */}
              {lines.length > 0 && (
                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-accent/5">
                    <Pill size={16} className="text-accent" />
                    <h2 className="text-sm font-bold text-foreground">Medicines</h2>
                    <span className="ml-auto px-2 py-0.5 rounded-pill bg-accent/10 text-accent text-xs font-semibold">{lines.length} item{lines.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="divide-y divide-border">
                    {lines.map((line) => {
                      const lineTotal = line.offer.price * line.qty;
                      const discountPct = Math.round(((line.offer.mrp - line.offer.price) / line.offer.mrp) * 100);
                      return (
                        <div key={line.id} className="flex items-start gap-4 px-5 py-4">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Pill size={18} className="text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-foreground leading-tight truncate">{line.product.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{line.product.packSize} · {line.offer.pharmacyName}</p>
                                {line.product.prescription && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <AlertCircle size={10} className="text-warning" />
                                    <span className="text-[10px] text-warning font-medium">Prescription required</span>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(line.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <span className="text-base font-extrabold text-foreground font-tabular">₹{lineTotal}</span>
                                {line.qty > 1 && <span className="text-xs text-muted-foreground">(₹{line.offer.price} × {line.qty})</span>}
                                {discountPct > 0 && (
                                  <span className="px-1.5 py-0.5 rounded-pill bg-success/10 text-success text-[10px] font-semibold">{discountPct}% off</span>
                                )}
                              </div>
                              {/* Quantity stepper */}
                              <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                                <button
                                  onClick={() => setQty(line.id, line.qty - 1)}
                                  className="w-7 h-7 rounded-md flex items-center justify-center text-foreground hover:bg-card transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="w-7 text-center text-sm font-bold text-foreground font-tabular">{line.qty}</span>
                                <button
                                  onClick={() => setQty(line.id, line.qty + 1)}
                                  className="w-7 h-7 rounded-md flex items-center justify-center text-foreground hover:bg-card transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-5 py-3 bg-muted/30 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} className="text-primary" />
                    <span>Delivery in 2–4 hours · Free above ₹499</span>
                  </div>
                </div>
              )}

              {/* Coupon Section */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Tag size={16} className="text-primary" />
                  Apply Coupon
                </h2>
                {couponApplied ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-success/10 border border-success/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-success" />
                      <div>
                        <p className="text-sm font-bold text-success">{couponApplied.code}</p>
                        <p className="text-xs text-muted-foreground">{couponApplied.label}</p>
                      </div>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponInput}
                          onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                          onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors uppercase"
                        />
                      </div>
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponInput.trim()}
                        className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                        <AlertCircle size={11} />
                        {couponError}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Object.entries(VALID_COUPONS).map(([code, info]) => (
                        <button
                          key={code}
                          onClick={() => { setCouponInput(code); setCouponError(''); }}
                          className="px-3 py-1.5 rounded-lg border border-dashed border-primary/40 bg-primary-soft text-primary text-xs font-semibold hover:border-primary transition-colors"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                      <Info size={10} />
                      Click a code above to auto-fill
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
                <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingCart size={16} className="text-primary" />
                  Price Breakdown
                </h2>

                <div className="space-y-2.5 text-sm">
                  {labItems.length > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Lab Tests ({labItems.length})</span>
                      <span className="font-tabular">₹{labSubtotal}</span>
                    </div>
                  )}
                  {lines.length > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Medicines ({lines.reduce((s, l) => s + l.qty, 0)} qty)</span>
                      <span className="font-tabular">₹{medicineSubtotal}</span>
                    </div>
                  )}
                  {savedOnMrp > 0 && (
                    <div className="flex justify-between text-success text-xs">
                      <span>Savings on MRP</span>
                      <span className="font-tabular font-semibold">-₹{savedOnMrp}</span>
                    </div>
                  )}
                  {couponApplied && (
                    <div className="flex justify-between text-success text-xs">
                      <span>Coupon ({couponApplied.code})</span>
                      <span className="font-tabular font-semibold">-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-border flex justify-between font-bold text-foreground">
                    <span>Total Payable</span>
                    <span className="text-lg font-extrabold font-tabular">₹{grandTotal}</span>
                  </div>
                </div>

                {savedOnMrp + couponDiscount > 0 && (
                  <div className="mt-3 p-2.5 rounded-xl bg-success/10 border border-success/20 text-xs text-success font-semibold flex items-center gap-2">
                    <CheckCircle2 size={13} />
                    You save ₹{savedOnMrp + couponDiscount} on this order!
                  </div>
                )}

                <button
                  onClick={handleProceed}
                  className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-2 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ChevronRight size={16} />
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                  <Shield size={11} className="text-success" />
                  <span>256-bit SSL encrypted · Secure checkout</span>
                </div>
              </div>

              {/* Delivery info */}
              <div className="bg-card rounded-xl border border-border p-4 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Truck size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Free home collection for all lab tests</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  <span>Medicine delivery in 2–4 hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield size={13} className="text-success mt-0.5 flex-shrink-0" />
                  <span>100% genuine medicines from licensed pharmacies</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderReviewPage() {
  return (
    <AppLayout>
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading your order…</div>
        </div>
      }>
        <OrderReviewContent />
      </Suspense>
    </AppLayout>
  );
}
