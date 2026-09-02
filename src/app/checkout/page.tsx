'use client';

import React, { useState, Suspense, useCallback } from 'react';
import AppLayout from '@/components/AppLayout';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShoppingCart, MapPin, CreditCard, Smartphone, Building2, ChevronRight,
  CheckCircle2, Shield, Tag, Home, User, Phone, Mail, Calendar, FlaskConical,
  Stethoscope, Pill, ArrowLeft, IndianRupee, Download, MessageSquare, Send,
  Copy, ExternalLink, Clock, Hash, Star
} from 'lucide-react';

interface CheckoutItem {
  id: string;
  name: string;
  type: 'lab' | 'medicine' | 'appointment';
  price: number;
  detail?: string;
}

const MOCK_CART_ITEMS: CheckoutItem[] = [
  { id: 'lt-001', name: 'Complete Blood Count (CBC)', type: 'lab', price: 249, detail: '24 parameters · 6 hrs report' },
  { id: 'lt-003', name: 'Thyroid Profile (T3, T4, TSH)', type: 'lab', price: 499, detail: '3 parameters · 12 hrs report' },
];

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: Building2, desc: 'All major banks' },
  { id: 'cod', label: 'Pay at Lab / Clinic', icon: IndianRupee, desc: 'Cash or card on visit' },
];

const VALID_COUPONS: Record<string, number> = {
  LOCDOC10: 10,
  FIRSTLAB: 0,
  MEDCARE20: 20,
};

function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'LD-';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

function ConfirmedScreen({
  items,
  total,
  form,
  checkoutType,
  bookingRef,
  estimatedTime,
}: {
  items: CheckoutItem[];
  total: number;
  form: { name: string; phone: string; email: string; address: string; date: string; time: string };
  checkoutType: string;
  bookingRef: string;
  estimatedTime: string;
}) {
  const TypeIcon = checkoutType === 'lab' ? FlaskConical : checkoutType === 'appointment' ? Stethoscope : Pill;
  const [copied, setCopied] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard?.writeText(bookingRef).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSMS = () => {
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 3000);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  const handleDownloadReceipt = () => {
    setDownloading(true);
    // Simulate receipt generation
    setTimeout(() => {
      const receiptContent = [
        '========================================',
        '           LOCDOC RECEIPT',
        '========================================',
        `Booking Ref: ${bookingRef}`,
        `Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
        `Patient: ${form.name || 'Patient'}`,
        `Phone: ${form.phone || '+91 98765 43210'}`,
        `Email: ${form.email || 'patient@example.com'}`,
        '----------------------------------------',
        'ITEMS:',
        ...items.map((i) => `  ${i.name.padEnd(30)} ₹${i.price}`),
        '----------------------------------------',
        `TOTAL PAID:                          ₹${total}`,
        '========================================',
        `Est. Start: ${estimatedTime}`,
        'Status: CONFIRMED',
        '========================================',
        'Thank you for choosing LocDoc!',
      ].join('\n');

      const blob = new Blob([receiptContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LocDoc-Receipt-${bookingRef}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dark hero header */}
      <div className="page-hero-dark py-10">
        <div className="absolute inset-0 grid-overlay pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full glass border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <h1 className="tight-headline text-white mb-2">Booking Confirmed!</h1>
            <p className="text-sm text-white/50">
              Your {checkoutType === 'lab' ? 'lab tests have been booked' : 'appointment is confirmed'}. All details sent to your contact.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Booking Reference Card */}
        <div className="bg-primary-soft border border-primary/20 rounded-2xl p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Hash size={15} className="text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wide">Booking Reference</span>
            </div>
            <span className="px-2 py-0.5 rounded-pill bg-success/10 text-success text-xs font-semibold">Confirmed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-foreground tracking-widest font-tabular">{bookingRef}</span>
            <button
              onClick={handleCopyRef}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 bg-card text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Use this reference for any queries or follow-ups</p>
        </div>

        {/* Estimated Time & Doctor Contact */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Est. Start Time</span>
            </div>
            <p className="text-base font-extrabold text-foreground">{estimatedTime}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {form.date ? new Date(form.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Today'}
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope size={14} className="text-primary" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Doctor / Lab</span>
            </div>
            <p className="text-sm font-bold text-foreground leading-tight">
              {checkoutType === 'lab' ? 'LocDoc Partner Lab' : 'Assigned Doctor'}
            </p>
            <a
              href="tel:+918008001234"
              className="mt-1.5 flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
            >
              <Phone size={11} />
              +91 800 800 1234
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Order Summary</span>
            <div className="flex items-center gap-1 text-xs text-warning font-semibold">
              <Star size={11} fill="currentColor" />
              <span>NABL Accredited</span>
            </div>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <TypeIcon size={14} className="text-primary flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">{item.name}</span>
                    {item.detail && <p className="text-[10px] text-muted-foreground">{item.detail}</p>}
                  </div>
                </div>
                <span className="font-semibold text-foreground font-tabular">₹{item.price}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="font-bold text-foreground">Total Paid</span>
              <span className="text-lg font-extrabold text-foreground font-tabular">₹{total}</span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-card rounded-xl border border-border p-4 mb-5">
          <p className="text-xs font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 size={13} className="text-success" />
            What happens next?
          </p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <CheckCircle2 size={11} className="text-success mt-0.5 flex-shrink-0" />
              <span>SMS & email confirmation sent to {form.phone || '+91 98765 43210'}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={11} className="text-success mt-0.5 flex-shrink-0" />
              <span>
                {checkoutType === 'lab'
                  ? `Phlebotomist will arrive at your address between ${form.time || '8:00 AM – 10:00 AM'}`
                  : `Consultation starts at ${estimatedTime}`}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={11} className="text-success mt-0.5 flex-shrink-0" />
              <span>Digital reports shared within 24 hours via email & app</span>
            </div>
          </div>
        </div>

        {/* Confirmation Actions */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <h3 className="text-sm font-bold text-foreground mb-4">Confirmation & Receipt</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Download Receipt */}
            <button
              onClick={handleDownloadReceipt}
              disabled={downloading}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-primary/20 bg-primary-soft hover:border-primary hover:bg-primary/10 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <Download size={18} className="text-primary group-hover:text-white" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-foreground">{downloading ? 'Generating…' : 'Download Receipt'}</p>
                <p className="text-[10px] text-muted-foreground">Save as .txt file</p>
              </div>
            </button>

            {/* SMS Confirmation */}
            <button
              onClick={handleSendSMS}
              disabled={smsSent}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border hover:border-primary/40 bg-card hover:bg-primary-soft transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {smsSent ? <CheckCircle2 size={18} className="text-success" /> : <MessageSquare size={18} className="text-muted-foreground group-hover:text-primary" />}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-foreground">{smsSent ? 'SMS Sent!' : 'Resend SMS'}</p>
                <p className="text-[10px] text-muted-foreground">{form.phone || '+91 98765 43210'}</p>
              </div>
            </button>

            {/* Email Confirmation */}
            <button
              onClick={handleSendEmail}
              disabled={emailSent}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border hover:border-primary/40 bg-card hover:bg-primary-soft transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {emailSent ? <CheckCircle2 size={18} className="text-success" /> : <Send size={18} className="text-muted-foreground group-hover:text-primary" />}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-foreground">{emailSent ? 'Email Sent!' : 'Resend Email'}</p>
                <p className="text-[10px] text-muted-foreground truncate max-w-[100px]">{form.email || 'patient@example.com'}</p>
              </div>
            </button>
          </div>

          {(smsSent || emailSent) && (
            <div className="mt-3 p-2.5 rounded-lg bg-success/10 border border-success/20 text-xs text-success font-medium flex items-center gap-2">
              <CheckCircle2 size={12} />
              {smsSent && emailSent ? 'SMS & Email sent successfully!' : smsSent ? `SMS sent to ${form.phone || '+91 98765 43210'}` : `Email sent to ${form.email || 'patient@example.com'}`}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Link href="/" className="flex-1 py-2.5 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors text-center">
            Back to Home
          </Link>
          <Link href="/lab-tests" className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors text-center">
            Book More Tests
          </Link>
        </div>
      </div>
    </div>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const checkoutType = searchParams?.get('type') ?? 'lab';
  const urlCoupon = searchParams?.get('coupon') ?? '';

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [collectionType, setCollectionType] = useState<'home' | 'lab'>('home');
  const [coupon, setCoupon] = useState(urlCoupon);
  const [couponApplied, setCouponApplied] = useState(() => {
    if (urlCoupon && VALID_COUPONS[urlCoupon.toUpperCase()]) return true;
    return false;
  });
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', date: '', time: '' });
  const [bookingRef] = useState(() => generateBookingRef());

  const items = MOCK_CART_ITEMS;
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const collectionFee = 0;
  const couponPct = couponApplied ? (VALID_COUPONS[coupon.toUpperCase()] ?? 0) : 0;
  const discount = couponApplied ? Math.round(subtotal * couponPct / 100) : 0;
  const total = subtotal + collectionFee - discount;

  const estimatedTime = form.time
    ? form.time.split('–')[0].trim()
    : checkoutType === 'lab' ? '8:00 AM' : '10:30 AM';

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code] !== undefined) setCouponApplied(true);
  };

  const handleConfirm = () => {
    setStep('confirmed');
  };

  const typeIcon = checkoutType === 'lab' ? FlaskConical : checkoutType === 'appointment' ? Stethoscope : Pill;
  const TypeIcon = typeIcon;

  if (step === 'confirmed') {
    return (
      <ConfirmedScreen
        items={items}
        total={total}
        form={form}
        checkoutType={checkoutType}
        bookingRef={bookingRef}
        estimatedTime={estimatedTime}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero border-b border-border py-8">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href={checkoutType === 'lab' ? '/lab-tests' : '/doctors-listing-page'} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <ShoppingCart size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">Checkout</h1>
              <p className="text-sm text-muted-foreground">{items.length} item{items.length > 1 ? 's' : ''} in your booking</p>
            </div>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-2 mt-5">
            {(['details', 'payment'] as const).map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 text-xs font-semibold ${step === s || (step === 'payment' && s === 'details') ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s ? 'bg-primary text-white' : (step === 'payment' && s === 'details') ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}`}>
                    {step === 'payment' && s === 'details' ? <CheckCircle2 size={12} /> : i + 1}
                  </div>
                  {s === 'details' ? 'Your Details' : 'Payment'}
                </div>
                {i < 1 && <ChevronRight size={14} className="text-muted-foreground" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'details' && (
              <>
                {/* Collection type (for lab tests) */}
                {checkoutType === 'lab' && (
                  <div className="bg-card rounded-2xl border border-border p-5">
                    <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      Sample Collection
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'home', label: 'Home Collection', desc: 'Phlebotomist visits you', icon: Home, badge: 'Free' },
                        { id: 'lab', label: 'Visit Lab', desc: 'Walk-in at partner lab', icon: FlaskConical, badge: null },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setCollectionType(opt.id as 'home' | 'lab')}
                          className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all text-left ${collectionType === opt.id ? 'border-primary bg-primary-soft' : 'border-border bg-card hover:border-primary/40'}`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <opt.icon size={18} className={collectionType === opt.id ? 'text-primary' : 'text-muted-foreground'} />
                            {opt.badge && <span className="px-2 py-0.5 rounded-pill bg-success/10 text-success text-[10px] font-semibold">{opt.badge}</span>}
                          </div>
                          <div>
                            <p className={`text-sm font-semibold ${collectionType === opt.id ? 'text-primary' : 'text-foreground'}`}>{opt.label}</p>
                            <p className="text-xs text-muted-foreground">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal details */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <User size={16} className="text-primary" />
                    Patient Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: 'name', label: 'Full Name', icon: User, placeholder: 'Enter your full name', type: 'text' },
                      { key: 'phone', label: 'Mobile Number', icon: Phone, placeholder: '+91 98765 43210', type: 'tel' },
                      { key: 'email', label: 'Email Address', icon: Mail, placeholder: 'you@example.com', type: 'email' },
                    ].map((field) => (
                      <div key={field.key} className={field.key === 'email' ? 'sm:col-span-2' : ''}>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{field.label}</label>
                        <div className="relative">
                          <field.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                    {collectionType === 'home' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Collection Address</label>
                        <div className="relative">
                          <MapPin size={14} className="absolute left-3 top-3 text-muted-foreground" />
                          <textarea
                            placeholder="Flat no., Building, Street, Area, City"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            rows={2}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Schedule */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Preferred Schedule
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Time Slot</label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors appearance-none"
                      >
                        <option value="">Select time</option>
                        <option>6:00 AM – 8:00 AM</option>
                        <option>8:00 AM – 10:00 AM</option>
                        <option>10:00 AM – 12:00 PM</option>
                        <option>12:00 PM – 2:00 PM</option>
                        <option>2:00 PM – 4:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-2 transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            {step === 'payment' && (
              <>
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard size={16} className="text-primary" />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === method.id ? 'border-primary bg-primary-soft' : 'border-border bg-card hover:border-primary/40'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${paymentMethod === method.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                          <method.icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${paymentMethod === method.id ? 'text-primary' : 'text-foreground'}`}>{method.label}</p>
                          <p className="text-xs text-muted-foreground">{method.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary' : 'border-border'}`}>
                          {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('details')}
                    className="flex-1 py-3 rounded-xl border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-2 transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield size={15} />
                    Pay ₹{total} Securely
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
              <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <ShoppingCart size={16} className="text-primary" />
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <TypeIcon size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground leading-tight">{item.name}</p>
                        {item.detail && <p className="text-[10px] text-muted-foreground mt-0.5">{item.detail}</p>}
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-foreground font-tabular flex-shrink-0">₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={couponApplied}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-border bg-input text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors disabled:opacity-60 uppercase"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !coupon.trim()}
                    className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-2 transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-success mt-1.5 flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    {coupon.toUpperCase()} applied — ₹{discount} off!
                  </p>
                )}
                {!couponApplied && <p className="text-[10px] text-muted-foreground mt-1">Try: LOCDOC10</p>}
              </div>

              <div className="space-y-2 pt-3 border-t border-border text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-tabular">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Home collection</span>
                  <span className="text-success font-semibold">Free</span>
                </div>
                {couponApplied && discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({coupon.toUpperCase()})</span>
                    <span className="font-tabular">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-foreground text-sm pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-tabular">₹{total}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
                <Shield size={11} className="text-success" />
                <span>256-bit SSL encrypted · PCI DSS compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground text-sm">Loading checkout…</div></div>}>
        <CheckoutContent />
      </Suspense>
    </AppLayout>
  );
}
