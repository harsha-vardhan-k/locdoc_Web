import React from 'react';

export default function MedicinesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
      {Array.from({ length: 12 })?.map((_, i) => (
        <div
          key={`skel-med-${i + 1}`}
          className="bg-card rounded-xl border border-border overflow-hidden animate-pulse"
        >
          <div className="h-40 bg-muted" />
          <div className="p-3 space-y-2">
            <div className="h-3.5 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-2/3" />
            <div className="h-3 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-1/3" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-5 bg-muted rounded w-14" />
              <div className="h-7 bg-muted rounded-lg w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}