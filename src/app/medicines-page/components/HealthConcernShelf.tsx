'use client';

import React from 'react';

interface HealthConcern {
  slug: string;
  name: string;
  color: string;
}

interface HealthConcernShelfProps {
  concerns: HealthConcern[];
  onSelect: (slug: string) => void;
}

export default function HealthConcernShelf({
  concerns,
  onSelect,
}: HealthConcernShelfProps) {
  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
            Shop by condition
          </p>
          <h2 className="text-xl font-extrabold text-foreground">Health concerns</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-8 gap-3">
        {concerns.map((concern) => (
          <button
            key={`concern-${concern.slug}`}
            onClick={() => onSelect(concern.slug)}
            className={`group flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center hover:shadow-sm transition-all duration-200 ${concern.color}`}
          >
            <span className="text-2xl">
              {concern.slug === 'diabetes' && '💉'}
              {concern.slug === 'hypertension' && '❤️'}
              {concern.slug === 'skin-care' && '🌿'}
              {concern.slug === 'respiratory' && '🫁'}
              {concern.slug === 'vitamins' && '🌟'}
              {concern.slug === 'cardiac' && '🫀'}
              {concern.slug === 'pain-fever' && '🌡️'}
              {concern.slug === 'allergy' && '🛡️'}
            </span>
            <p className="text-xs font-semibold leading-snug">{concern.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}