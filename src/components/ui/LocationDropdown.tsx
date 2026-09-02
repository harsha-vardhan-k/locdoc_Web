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
  defaultLabel?: string;
  variant?: 'dark' | 'light';
  onApply?: (label: string) => void;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (val: string) => void;
}

function CustomSelect({ label, value, options, placeholder, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = value || placeholder || 'Choose…';

  return (
    <div className="mb-3" ref={ref}>
      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
        >
          <span className={value ? 'text-gray-800' : 'text-gray-400'}>{displayValue}</span>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && options.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-[210] max-h-44 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  value === opt ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
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
        <div
          className="absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl z-[200] p-4 animate-fade-in"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          }}
        >
          {/* Use current location */}
          <button
            onClick={handleUseCurrentLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-blue-200 bg-white text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors mb-4"
          >
            <Navigation size={15} />
            Use my current location
          </button>

          {/* State */}
          <CustomSelect
            label="State"
            value={selectedState}
            options={ALL_STATES}
            onChange={handleStateChange}
          />

          {/* District */}
          <CustomSelect
            label="District"
            value={selectedDistrict}
            options={districts}
            onChange={handleDistrictChange}
          />

          {/* City / Town */}
          <CustomSelect
            label="City / Town"
            value={selectedCity}
            options={cities}
            onChange={(c) => { setSelectedCity(c); setSelectedArea(''); }}
          />

          {/* Area */}
          <CustomSelect
            label="Area"
            value={selectedArea}
            options={areas}
            placeholder="Choose area"
            onChange={setSelectedArea}
          />

          {/* Apply button */}
          <button
            onClick={handleApply}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-colors mt-1"
            style={{ background: 'linear-gradient(135deg, #3b5bdb, #2563eb)' }}
          >
            Apply Location
          </button>
        </div>
      )}
    </div>
  );
}
