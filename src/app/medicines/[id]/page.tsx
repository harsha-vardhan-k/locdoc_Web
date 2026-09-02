'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  Store,
  MapPin,
  Tag,
  Package,
  Building2,
  Info,
  ChevronDown,
  ChevronUp,
  Shield,
} from 'lucide-react';
import { PRODUCTS, lowestOffer, hasStock, discountPct } from '@/data/medicines';
import { useCart } from '@/context/CartContext';

export default function MedicineDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];

  const { addToCart, itemCount } = useCart();
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const best = lowestOffer(product);
  const inStock = hasStock(product);

  const selectedOffer =
    product.offers.find((o) => o.pharmacyId === selectedPharmacyId) ?? best;

  const handleAddToCart = (pharmacyId?: string) => {
    const offer = pharmacyId
      ? product.offers.find((o) => o.pharmacyId === pharmacyId)
      : selectedOffer;
    if (offer && offer.inStock) {
      addToCart(product, offer, 1);
      setAddedId(pharmacyId ?? offer.pharmacyId);
      setTimeout(() => setAddedId(null), 1800);
    }
  };

  const visibleOffers = showAllOffers ? product.offers : product.offers.slice(0, 3);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Back nav */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
            <Link
              href="/medicines-page"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Medicines
            </Link>
            {itemCount > 0 && (
              <Link
                href="/checkout"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-2 transition-all"
              >
                <ShoppingCart size={13} />
                {itemCount} in cart
              </Link>
            )}
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Product details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product header card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-5">
                  {/* Icon / image */}
                  <div className="w-20 h-20 rounded-2xl bg-primary-soft flex items-center justify-center flex-shrink-0 text-4xl">
                    💊
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {product.prescription && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-warning-bg text-warning border border-warning/20">
                              Rx Required
                            </span>
                          )}
                          {best && discountPct(best) > 0 && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-success text-white">
                              {discountPct(best)}% OFF
                            </span>
                          )}
                        </div>
                        <h1 className="text-xl font-extrabold text-foreground leading-tight">
                          {product.name}
                        </h1>
                        <p className="text-sm text-accent font-semibold mt-0.5">
                          {product.genericName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {product.subcategory}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-3">
                      {best ? (
                        <>
                          <span className="text-2xl font-extrabold text-foreground font-tabular">
                            ₹{best.price}
                          </span>
                          {best.mrp > best.price && (
                            <span className="text-sm text-muted-foreground line-through font-tabular">
                              ₹{best.mrp}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">best price</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">Price unavailable</span>
                      )}
                    </div>

                    {/* Stock status */}
                    <div className="mt-2">
                      {inStock ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-success">
                          <CheckCircle2 size={13} />
                          In stock at {product.offers.filter((o) => o.inStock).length}{' '}
                          {product.offers.filter((o) => o.inStock).length === 1
                            ? 'pharmacy' :'pharmacies'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-danger">
                          <AlertCircle size={13} />
                          Out of stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Pack Size', value: product.packSize, icon: Package, color: 'text-primary' },
                  { label: 'Manufacturer', value: product.manufacturer, icon: Building2, color: 'text-accent' },
                  { label: 'Category', value: product.subcategory, icon: Tag, color: 'text-success' },
                  {
                    label: 'Prescription',
                    value: product.prescription ? 'Required' : 'Not required',
                    icon: Shield,
                    color: product.prescription ? 'text-warning' : 'text-muted-foreground',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-card rounded-xl border border-border p-4 flex flex-col items-center text-center gap-1.5"
                  >
                    <item.icon size={18} className={item.color} />
                    <p className="text-xs font-bold text-foreground leading-tight">{item.value}</p>
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Info size={15} className="text-primary" />
                  About this medicine
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-pill bg-muted text-xs text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Prescription notice */}
              {product.prescription && (
                <div className="bg-warning-bg border border-warning/20 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle size={16} className="text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Prescription required</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      This medicine requires a valid prescription from a registered medical
                      practitioner. Please carry your prescription when collecting from the pharmacy.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Pharmacy offers sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
                <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Store size={15} className="text-primary" />
                  Available at pharmacies
                </h2>

                <div className="space-y-3">
                  {visibleOffers.map((offer) => {
                    const disc = discountPct(offer);
                    const isSelected = selectedPharmacyId === offer.pharmacyId;
                    const justAdded = addedId === offer.pharmacyId;

                    return (
                      <div
                        key={offer.pharmacyId}
                        onClick={() =>
                          offer.inStock &&
                          setSelectedPharmacyId(
                            isSelected ? null : offer.pharmacyId
                          )
                        }
                        className={`rounded-xl border p-3.5 transition-all cursor-pointer ${
                          !offer.inStock
                            ? 'opacity-60 cursor-default border-border bg-muted/30'
                            : isSelected
                            ? 'border-primary/50 bg-primary-soft' :'border-border hover:border-primary/30 hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">
                              {offer.pharmacyName}
                            </p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin size={10} className="text-muted-foreground flex-shrink-0" />
                              <span className="text-[10px] text-muted-foreground">
                                {offer.area} · {offer.distance}
                              </span>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-baseline gap-1 justify-end">
                              <span className="text-sm font-extrabold text-foreground font-tabular">
                                ₹{offer.price}
                              </span>
                              {offer.mrp > offer.price && (
                                <span className="text-[10px] text-muted-foreground line-through font-tabular">
                                  ₹{offer.mrp}
                                </span>
                              )}
                            </div>
                            {disc > 0 && (
                              <span className="text-[10px] font-bold text-success">{disc}% off</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          {offer.inStock ? (
                            <span className="flex items-center gap-1 text-[10px] text-success font-semibold">
                              <CheckCircle2 size={10} />
                              In stock
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] text-danger font-semibold">
                              <AlertCircle size={10} />
                              Out of stock
                            </span>
                          )}

                          {offer.inStock && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(offer.pharmacyId);
                              }}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all active:scale-95 ${
                                justAdded
                                  ? 'bg-success text-white' :'bg-primary text-primary-foreground hover:bg-primary-2'
                              }`}
                            >
                              {justAdded ? (
                                <>
                                  <CheckCircle2 size={11} />
                                  Added
                                </>
                              ) : (
                                <>
                                  <ShoppingCart size={11} />
                                  Add
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Show more / less */}
                {product.offers.length > 3 && (
                  <button
                    onClick={() => setShowAllOffers(!showAllOffers)}
                    className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    {showAllOffers ? (
                      <>
                        <ChevronUp size={13} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={13} />
                        {product.offers.length - 3} more pharmacies
                      </>
                    )}
                  </button>
                )}

                {/* Add best offer CTA */}
                {inStock && best && (
                  <button
                    onClick={() => handleAddToCart()}
                    className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                      addedId === best.pharmacyId
                        ? 'bg-success text-white' :'bg-primary text-primary-foreground hover:bg-primary-2 shadow-brand'
                    }`}
                  >
                    {addedId === best.pharmacyId ? (
                      <>
                        <CheckCircle2 size={16} />
                        Added to cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add best price to cart
                      </>
                    )}
                  </button>
                )}

                {/* View cart */}
                {itemCount > 0 && (
                  <Link
                    href="/checkout"
                    className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary text-primary text-sm font-semibold hover:bg-primary-soft transition-all"
                  >
                    View cart · {itemCount} item{itemCount !== 1 ? 's' : ''}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
