import React from 'react';
import Link from 'next/link';

import { MapPin, Phone, Mail, Shield, Award, CheckCircle2, FlaskConical, Stethoscope, Pill, Building2, UserRound, ChevronRight } from 'lucide-react';

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
    <footer className="mt-20" style={{ backgroundColor: '#111827', color: 'rgba(255,255,255,0.8)' }}>
      {/* Quick access bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide mr-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Quick links:</span>
            {QUICK_LINKS?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
              >
                <link.icon size={11} />
                {link?.label}
                <ChevronRight size={10} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <span className="font-extrabold text-xl text-white">LocDoc</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              India&apos;s first ghosting-prevention healthcare platform. Find verified doctors, compare medicine prices, and book lab tests — all near you.
            </p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <div className="flex items-center gap-2">
                <MapPin size={13} />
                <span>Hyderabad · Bengaluru · Mumbai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} />
                <span>hello@locdoc.in</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS)?.map(([section, links]) => (
            <div key={`footer-section-${section}`}>
              <h4 className="font-semibold text-white text-sm mb-4 tracking-wide">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links?.map((link) => (
                  <li key={`footer-link-${link?.href}`}>
                    <Link
                      href={link?.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges + copyright */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { icon: Shield, label: 'NMC Verified Doctors' },
                { icon: Award, label: 'ABDM NMR Integrated' },
                { icon: CheckCircle2, label: 'DPDP Compliant' },
              ]?.map((badge) => (
                <div
                  key={`trust-${badge?.label}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
                >
                  <badge.icon size={12} className="text-cyan-400" />
                  {badge?.label}
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              © 2026 LocDoc Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}