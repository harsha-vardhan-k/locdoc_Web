import React from 'react';

type Status = 'available' | 'busy' | 'delayed' | 'offline';

const STATUS_CONFIG: Record<Status, { label: string; dot: string; text: string; bg: string }> = {
  available: {
    label: 'Available',
    dot: 'bg-success animate-live-pulse',
    text: 'text-success',
    bg: 'bg-success-bg border-success/20',
  },
  busy: {
    label: 'In Consultation',
    dot: 'bg-warning',
    text: 'text-warning',
    bg: 'bg-warning-bg border-warning/20',
  },
  delayed: {
    label: 'Delayed',
    dot: 'bg-danger',
    text: 'text-danger',
    bg: 'bg-danger-bg border-danger/20',
  },
  offline: {
    label: 'Not Available',
    dot: 'bg-muted-foreground',
    text: 'text-muted-foreground',
    bg: 'bg-muted border-border',
  },
};

interface LiveStatusBadgeProps {
  status: Status;
}

export default function LiveStatusBadge({ status }: LiveStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-pill border ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}