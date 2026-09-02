'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown, Navigation } from 'lucide-react';

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

interface LocationDropdownProps {
  /** Initial label shown on the trigger button */
  defaultLabel?: string;
  /** Visual variant — 'dark' for hero/page sections, 'light' for navbar */
  variant?: 'dark' | 'light';
  /** Called when user applies a location */
  onApply?: (label: string) => void;
}

export default function LocationDropdown({
  defaultLabel = 'All Cities',
  variant = 'light',
  onApply,
}: LocationDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('Telangana');
  const [selectedDistrict, setSelectedDistrict] = useState('Hyderabad District');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedArea, setSelectedArea] = useState('');
  const [displayLabel, setDisplayLabel] = useState(defaultLabel);
  const ref = useRef<HTMLDivElement>(null);

  const districts = selectedState ? Object.keys(LOCATION_DATA[selectedState] || {}) : [];
  const cities =
    selectedState && selectedDistrict
      ? Object.keys(LOCATION_DATA[selectedState]?.[selectedDistrict] || {})
      : [];
  const areas =
    selectedState && selectedDistrict && selectedCity
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

  const handleUseCurrentLocation = () => {
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setDisplayLabel('Current Location');
          onApply?.('Current Location');
          setOpen(false);
        },
        () => {
          const label = selectedCity || defaultLabel;
          setDisplayLabel(label);
          onApply?.(label);
          setOpen(false);
        }
      );
    }
  };

  const handleApply = () => {
    const label = selectedArea || selectedCity || selectedDistrict || selectedState;
    setDisplayLabel(label);
    onApply?.(label);
    setOpen(false);
  };

  /* ── Trigger button styles ── */
  const triggerClass =
    variant === 'dark' ?'flex items-center gap-1.5 pl-3 pr-2.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white hover:border-white/20 transition-colors focus:outline-none flex-shrink-0' :'flex items-center gap-1.5 px-3 py-1.5 rounded-pill border border-border bg-muted text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors';

  const iconColor = variant === 'dark' ? 'text-cyan-400' : 'text-accent';
  const chevronColor = variant === 'dark' ? 'text-white/40' : '';

  /* ── Dropdown panel styles ── */
  const panelClass =
    variant === 'dark' ?'absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl z-50 p-4 animate-fade-in' :'absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 p-4 animate-fade-in';

  const panelStyle =
    variant === 'dark'
      ? {
          background: 'rgba(10,15,30,0.95)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
        }
      : undefined;

  const selectClass =
    variant === 'dark' ?'w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-cyan-400/50 cursor-pointer' :'w-full appearance-none px-3 py-2.5 pr-8 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer';

  const labelClass =
    variant === 'dark' ?'block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1' :'block text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1';

  const descClass =
    variant === 'dark' ?'text-sm text-white/40 mb-3 leading-snug' :'text-sm text-muted-foreground mb-3 leading-snug';

  const locationBtnClass =
    variant === 'dark' ?'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-cyan-400/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/20 transition-colors mb-4' :'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-primary/30 bg-primary/5 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors mb-4';

  const applyBtnClass =
    variant === 'dark' ?'w-full py-2.5 rounded-xl text-sm font-semibold transition-colors text-white' :'w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-2 transition-colors';

  const applyBtnStyle =
    variant === 'dark'
      ? { background: 'linear-gradient(135deg, #0891b2, #2563eb)' }
      : undefined;

  const chevronSelectColor =
    variant === 'dark' ? 'text-white/40' : 'text-muted-foreground';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={triggerClass}
      >
        <MapPin size={13} className={iconColor} />
        <span className="max-w-[110px] truncate">{displayLabel}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${chevronColor}`}
        />
      </button>

      {open && (
        <div className={panelClass} style={panelStyle}>
          <p className={descClass}>
            Find doctors and clinics near you — pick your state, district, city and area for accurate results.
          </p>

          <button onClick={handleUseCurrentLocation} className={locationBtnClass}>
            <Navigation size={15} />
            Use my current location
          </button>

          {/* State */}
          <div className="mb-3">
            <label className={labelClass}>State</label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className={selectClass}
              >
                {ALL_STATES.map((s) => (
                  <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${chevronSelectColor}`} />
            </div>
          </div>

          {/* District */}
          <div className="mb-3">
            <label className={labelClass}>District</label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className={selectClass}
              >
                {districts.map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${chevronSelectColor}`} />
            </div>
          </div>

          {/* City / Town */}
          <div className="mb-3">
            <label className={labelClass}>City / Town</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className={selectClass}
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${chevronSelectColor}`} />
            </div>
          </div>

          {/* Area */}
          <div className="mb-4">
            <label className={labelClass}>Area</label>
            <div className="relative">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className={selectClass}
              >
                <option value="" className="bg-slate-900 text-white">Choose area</option>
                {areas.map((a) => (
                  <option key={a} value={a} className="bg-slate-900 text-white">{a}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${chevronSelectColor}`} />
            </div>
          </div>

          <button onClick={handleApply} className={applyBtnClass} style={applyBtnStyle}>
            Apply Location
          </button>
        </div>
      )}
    </div>
  );
}
