'use client';

import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
  slug: string;
  name: string;
  icon: string;
  subcategories: string[];
}

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryBarProps) {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (slug: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredCat(slug);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setHoveredCat(null), 180);
  };

  return (
    <div className="sticky top-16 z-[100] bg-card border-b border-border shadow-xs">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            const isHovered = hoveredCat === cat.slug;

            return (
              <div
                key={`catbar-${cat.slug}`}
                className="relative flex-shrink-0"
                onMouseEnter={() => handleEnter(cat.slug)}
                onMouseLeave={handleLeave}
              >
                <button
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                  {cat.subcategories.length > 0 && (
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-150 ${isHovered ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {isHovered && cat.subcategories.length > 0 && (
                  <div className="absolute top-full left-0 mt-0 w-56 bg-card border border-border rounded-b-xl rounded-tr-xl shadow-lg py-2 animate-fade-in z-[150]">
                    <p className="px-4 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      {cat.name}
                    </p>
                    {cat.subcategories.map((sub) => (
                      <button
                        key={`sub-${cat.slug}-${sub}`}
                        onClick={() => {
                          onSelectCategory(cat.slug);
                          setHoveredCat(null);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs text-foreground hover:bg-muted hover:text-accent transition-colors text-left"
                      >
                        {sub}
                        <ChevronRight size={12} className="text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}