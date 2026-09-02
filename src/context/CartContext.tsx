'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';
import { Product, PharmacyOffer } from '@/data/medicines';

export interface CartLine {
  id: string;
  product: Product;
  offer: PharmacyOffer;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, offer: PharmacyOffer, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  groupByPharmacy: () => Record<string, CartLine[]>;
}

const CartContext = createContext<CartContextValue | null>(null);

function makeLineId(productId: string, pharmacyId: string) {
  return `${productId}::${pharmacyId}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem('locdoc-cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // Backend integration point: sync cart to user session
    try {
      localStorage.setItem('locdoc-cart', JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const addToCart = useCallback((product: Product, offer: PharmacyOffer, qty = 1) => {
    const id = makeLineId(product.id, offer.pharmacyId);
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { id, product, offer, qty }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.id !== id));
    } else {
      setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
    }
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const groupByPharmacy = useCallback(() => {
    const groups: Record<string, CartLine[]> = {};
    for (const line of lines) {
      const key = line.offer.pharmacyId;
      if (!groups[key]) groups[key] = [];
      groups[key].push(line);
    }
    return groups;
  }, [lines]);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.offer.price * l.qty, 0),
    [lines]
  );

  const value = useMemo(
    () => ({ lines, itemCount, subtotal, addToCart, removeItem, setQty, clearCart, groupByPharmacy }),
    [lines, itemCount, subtotal, addToCart, removeItem, setQty, clearCart, groupByPharmacy]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}