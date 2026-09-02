import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  source: string;
  size?: 'sm' | 'md';
}

export default function VerifiedBadge({ source, size = 'sm' }: VerifiedBadgeProps) {
  const isSmall = size === 'sm';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill border border-success/30 bg-success-bg text-success font-medium ${
        isSmall ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      title={`Verified via ${source}`}
    >
      <ShieldCheck size={isSmall ? 11 : 13} />
      {source}
    </span>
  );
}