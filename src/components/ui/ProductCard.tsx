'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, AlertCircle, Store } from 'lucide-react';
import { Product, lowestOffer, hasStock, discountPct } from '@/data/medicines';
import { useCart } from '@/context/CartContext';
import AppImage from '@/components/ui/AppImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const best = lowestOffer(product);
  const inStock = hasStock(product);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (best && inStock) addToCart(product, best, 1);
  };

  return (
    <Link
      href={`/medicines/${product.id}`}
      className="group flex flex-col bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Image area */}
      <div className="relative bg-muted h-40 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <AppImage
            src={product.image}
            alt={`${product.name} medicine pack`}
            width={120}
            height={120}
            className="object-contain p-2"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-primary-soft flex items-center justify-center text-3xl">
            💊
          </div>
        )}
        {product.prescription && (
          <span className="absolute top-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-warning-bg text-warning border border-warning/20">
            Rx
          </span>
        )}
        {best && discountPct(best) > 0 && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-success text-white">
            {discountPct(best)}% OFF
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
          {product.name}
        </p>
        <p className="text-xs text-muted-foreground">{product.packSize}</p>
        <p className="text-[11px] text-muted-foreground">{product.manufacturer}</p>

        {/* Pharmacy count */}
        <div className="flex items-center gap-1 mt-auto pt-1">
          <Store size={10} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">
            {product.offers.length} {product.offers.length === 1 ? 'pharmacy' : 'pharmacies'}
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-1">
          <div>
            {best ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-foreground font-tabular">
                  ₹{best.price}
                </span>
                {best.mrp > best.price && (
                  <span className="text-xs text-muted-foreground line-through font-tabular">
                    ₹{best.mrp}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">—</span>
            )}
          </div>

          {inStock ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-2 active:scale-95 transition-all"
            >
              <ShoppingCart size={12} />
              Add
            </button>
          ) : (
            <span className="flex items-center gap-1 text-[11px] text-danger font-medium">
              <AlertCircle size={11} />
              Out of stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}