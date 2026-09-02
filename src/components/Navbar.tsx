'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Stethoscope,
  Pill,
  FlaskConical,
  Building2,
  UserRound,
  Sun,
  Moon,
  MapPin,
  Bell,
  Navigation,
} from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  currentLocation?: string;
}

const NAV_LINKS = [
  { href: '/doctors-listing-page', label: 'Find Doctors', icon: Stethoscope },
  { href: '/medicines-page', label: 'Medicines', icon: Pill },
  { href: '/lab-tests', label: 'Lab Tests', icon: FlaskConical },
  { href: '/about', label: 'About Us', icon: UserRound },
];

const PARTNER_LINKS = [
  { href: '/register/hospital', label: 'Register Hospital', icon: Building2 },
  { href: '/register/pharmacy', label: 'Register Pharmacy', icon: Pill },
  { href: '/register/labs', label: 'Register Lab', icon: FlaskConical },
  { href: '/register/doctor', label: 'Join as Doctor', icon: UserRound },
];

const LOCATION_DATA: Record<string, Record<string, Record<string, string[]>>> = {
  Telangana: {
    'Hyderabad District': {
      Hyderabad: ['Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Gachibowli', 'Hitech City', 'Kondapur', 'Kukatpally'],
      Secunderabad: ['Trimulgherry', 'Bowenpally', 'Malkajgiri'],
    },
    'Rangareddy District': {
      'LB Nagar': ['Saroornagar', 'Vanasthalipuram'],
      Shamshabad: ['Rajendranagar', 'Attapur'],
    },
    'Medchal District': {
      Kompally: ['Alwal', 'Quthbullapur'],
      Medchal: ['Dundigal', 'Petbasheerabad'],
    },
  },
  'Andhra Pradesh': {
    'Visakhapatnam District': {
      Visakhapatnam: ['Gajuwaka', 'MVP Colony', 'Rushikonda', 'Dwaraka Nagar'],
      Bheemunipatnam: ['Bheemunipatnam Town', 'Kommadi'],
    },
    'Krishna District': {
      Vijayawada: ['Benz Circle', 'Governorpet', 'Labbipet'],
      Machilipatnam: ['Machilipatnam Town'],
    },
  },
  Maharashtra: {
    'Mumbai District': {
      Mumbai: ['Andheri', 'Bandra', 'Dadar', 'Kurla', 'Powai', 'Thane'],
      'Navi Mumbai': ['Vashi', 'Nerul', 'Kharghar'],
    },
    'Pune District': {
      Pune: ['Kothrud', 'Hadapsar', 'Wakad', 'Baner', 'Hinjewadi'],
      Pimpri: ['Chinchwad', 'Akurdi'],
    },
  },
  Karnataka: {
    'Bangalore Urban': {
      Bangalore: ['Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'HSR Layout', 'Electronic City'],
      'Electronic City': ['Phase 1', 'Phase 2'],
    },
    'Mysuru District': {
      Mysuru: ['Vijayanagar', 'Kuvempunagar', 'Hebbal'],
    },
  },
};

const ALL_STATES = Object.keys(LOCATION_DATA);

function LocationDropdown({ currentLocation }: { currentLocation: string }) {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('Telangana');
  const [selectedDistrict, setSelectedDistrict] = useState('Hyderabad District');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedArea, setSelectedArea] = useState('');
  const [displayLabel, setDisplayLabel] = useState(currentLocation);
  const ref = useRef<HTMLDivElement>(null);

  const districts = selectedState ? Object.keys(LOCATION_DATA[selectedState] || {}) : [];
  const cities = selectedState && selectedDistrict ? Object.keys(LOCATION_DATA[selectedState]?.[selectedDistrict] || {}) : [];
  const areas = selectedState && selectedDistrict && selectedCity
    ? LOCATION_DATA[selectedState]?.[selectedDistrict]?.[selectedCity] || []
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    const firstDistrict = Object.keys(LOCATION_DATA[state] || {})[0] || '';
    setSelectedDistrict(firstDistrict);
    const firstCity = Object.keys(LOCATION_DATA[state]?.[firstDistrict] || {})[0] || '';
    setSelectedCity(firstCity);
    setSelectedArea('');
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    const firstCity = Object.keys(LOCATION_DATA[selectedState]?.[district] || {})[0] || '';
    setSelectedCity(firstCity);
    setSelectedArea('');
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea('');
  };

  const handleUseCurrentLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setDisplayLabel('Current Location');
          setOpen(false);
        },
        () => {
          setDisplayLabel(selectedCity || currentLocation);
          setOpen(false);
        }
      );
    }
  };

  const handleApply = () => {
    const label = selectedArea || selectedCity || selectedDistrict || selectedState;
    setDisplayLabel(label);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-border bg-muted text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <MapPin size={13} className="text-accent" />
        <span className="max-w-[100px] truncate">{displayLabel}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 p-4 animate-fade-in">
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 leading-snug">
            Find doctors and clinics near you — pick your state, district, city and area for accurate results.
          </p>

          {/* Use my current location */}
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-primary/30 bg-primary/5 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors mb-4"
          >
            <Navigation size={15} />
            Use my current location
          </button>

          {/* State */}
          <div className="mb-3">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">State</label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                {ALL_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* District */}
          <div className="mb-3">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">District</label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* City / Town */}
          <div className="mb-3">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">City / Town</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Area */}
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Area</label>
            <div className="relative">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="">Choose area</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Apply button */}
          <button
            onClick={handleApply}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors"
          >
            Apply Location
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar({
  cartCount = 0,
  theme = 'light',
  onToggleTheme,
  currentLocation = 'Hyderabad',
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const partnerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handlePartnerEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPartnerOpen(true);
  };

  const handlePartnerLeave = () => {
    closeTimer.current = setTimeout(() => setPartnerOpen(false), 200);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-card shadow-sm border-b border-border'
            : 'bg-card border-b border-border'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
          <div className="flex items-center h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <AppLogo size={36} />
            </Link>

            {/* Location dropdown */}
            <LocationDropdown currentLocation={currentLocation} />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href || pathname?.startsWith(link.href + '/');
                return (
                  <Link
                    key={`nav-${link.href}`}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-primary-soft text-primary' :'text-foreground/70 hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <link.icon size={15} />
                    {link.label}
                  </Link>
                );
              })}

              {/* Partner dropdown */}
              <div
                ref={partnerRef}
                className="relative"
                onMouseEnter={handlePartnerEnter}
                onMouseLeave={handlePartnerLeave}
              >
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all duration-150">
                  Partner with us
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${partnerOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {partnerOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-xl shadow-lg py-1.5 animate-fade-in">
                    {PARTNER_LINKS.map((p) => (
                      <Link
                        key={`partner-${p.href}`}
                        href={p.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <p.icon size={15} className="text-muted-foreground" />
                        {p.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="flex-1" />

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Search size={18} />
              </button>

              <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
              </button>

              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              <Link
                href="/order-review"
                className="relative flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-pill bg-danger text-white text-[10px] font-bold flex items-center justify-center px-1 font-tabular">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors active:scale-95"
              >
                <UserRound size={15} />
                Sign In
              </Link>

              {/* Mobile burger */}
              <button
                className="flex lg:hidden items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-up">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={`mobile-nav-${link.href}`}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary-soft text-primary' :'text-foreground hover:bg-muted'
                    }`}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Partner with us
                </p>
                {PARTNER_LINKS.map((p) => (
                  <Link
                    key={`mobile-partner-${p.href}`}
                    href={p.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <p.icon size={16} className="text-muted-foreground" />
                    {p.label}
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t border-border">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                >
                  <UserRound size={16} />
                  Sign In / Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}