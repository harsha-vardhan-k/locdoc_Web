import React from 'react';

export default function DoctorsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 8 })?.map((_, i) => (
        <div
          key={`skel-doc-${i + 1}`}
          className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3 animate-pulse"
        >
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-muted flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>
          {/* Facility */}
          <div className="h-3 bg-muted rounded w-full" />
          {/* Badge */}
          <div className="h-5 bg-muted rounded-pill w-32" />
          {/* Punctuality bar */}
          <div className="space-y-1.5">
            <div className="h-2.5 bg-muted rounded w-1/3" />
            <div className="h-1.5 bg-muted rounded-pill w-full" />
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border">
            {[1, 2, 3]?.map((s) => (
              <div key={`skel-stat-${i + 1}-${s}`} className="space-y-1">
                <div className="h-3.5 bg-muted rounded mx-auto w-8" />
                <div className="h-2.5 bg-muted rounded mx-auto w-12" />
              </div>
            ))}
          </div>
          {/* Button */}
          <div className="h-9 bg-muted rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
}