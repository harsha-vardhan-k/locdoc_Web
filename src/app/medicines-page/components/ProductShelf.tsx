'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/data/medicines';
import ProductCard from '@/components/ui/ProductCard';

interface ProductShelfProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
  onViewAllClick?: () => void;
}

export default function ProductShelf({
  title,
  subtitle,
  products,
  viewAllHref,
  onViewAllClick,
}: ProductShelfProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ChevronRight size={15} />
          </button>
          {viewAllHref && (
            <button
              onClick={onViewAllClick}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide shelf-scroll pb-2"
      >
        {products.map((product) => (
          <div
            key={`shelf-${product.id}`}
            className="shelf-item w-[200px] xl:w-[220px] flex-shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}