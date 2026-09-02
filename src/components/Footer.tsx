import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Shield, Award, CheckCircle2, FlaskConical, Stethoscope, Pill, Building2, UserRound, ChevronRight, ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  Patients: [
    { label: 'Find Doctors', href: '/doctors-listing-page' },
    { label: 'Buy Medicines', href: '/medicines-page' },
    { label: 'Book Lab Tests', href: '/lab-tests' },
    { label: 'About LocDoc', href: '/about' },
  ],
  Partners: [
    { label: 'Register Hospital', href: '/register/hospital' },
    { label: 'Register Pharmacy', href: '/register/pharmacy' },
    { label: 'Register Lab', href: '/register/labs' },
    { label: 'Join as Doctor', href: '/register/doctor' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

const QUICK_LINKS = [
  { href: '/doctors-listing-page', label: 'Find Doctors', icon: Stethoscope },
  { href: '/medicines-page', label: 'Medicines', icon: Pill },
  { href: '/lab-tests', label: 'Lab Tests', icon: FlaskConical },
  { href: '/register/hospital', label: 'For Hospitals', icon: Building2 },
  { href: '/login', label: 'Sign In', icon: UserRound },
];

export default function Footer() {
  return (
    <footer className="mt-20 section-dark relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[40%] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      {/* Quick access bar */}
      <div className="relative border-b border-white/8">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest mr-2 text-white/30">Quick links:</span>
            {QUICK_LINKS?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all hover:text-white micro-lift glass border border-white/10 text-white/50 hover:border-white/25"
              >
                <link.icon size={11} />
                {link?.label}
                <ChevronRight size={10} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
                <MapPin size={18} className="text-white" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">LocDoc</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6 text-white/50">
              India&apos;s first ghosting-prevention healthcare platform. Find verified doctors, compare medicine prices, and book lab tests — all near you.
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-white/40">
              <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                <MapPin size={13} className="text-cyan-400" />
                <span>Hyderabad · Bengaluru · Mumbai</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                <Phone size={13} className="text-blue-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                <Mail size={13} className="text-purple-400" />
                <span>hello@locdoc.in</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS)?.map(([section, links]) => (
            <div key={`footer-section-${section}`}>
              <h4 className="font-bold text-white text-sm mb-5 tracking-wide">
                {section}
              </h4>
              <ul className="space-y-3">
                {links?.map((link) => (
                  <li key={`footer-link-${link?.href}`}>
                    <Link
                      href={link?.href}
                      className="text-sm transition-colors text-white/40 hover:text-white flex items-center gap-1 group"
                    >
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all duration-200" />
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges + copyright */}
        <div className="mt-12 pt-8 border-t border-white/8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { icon: Shield, label: 'NMC Verified Doctors', color: 'text-emerald-400' },
                { icon: Award, label: 'ABDM NMR Integrated', color: 'text-blue-400' },
                { icon: CheckCircle2, label: 'DPDP Compliant', color: 'text-cyan-400' },
              ]?.map((badge) => (
                <div
                  key={`trust-${badge?.label}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs glass border border-white/10 text-white/50 micro-lift"
                >
                  <badge.icon size={12} className={badge?.color} />
                  {badge?.label}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/25">
              © 2026 LocDoc Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}