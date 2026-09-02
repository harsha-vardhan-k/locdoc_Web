import React from 'react';

interface PunctualityBarProps {
  score: number;
  showLabel?: boolean;
}

export default function PunctualityBar({ score, showLabel = true }: PunctualityBarProps) {
  const color =
    score >= 90
      ? 'bg-success'
      : score >= 75
      ? 'bg-warning' :'bg-danger';

  const label =
    score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : 'Variable';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-border rounded-pill overflow-hidden">
        <div
          className={`h-full rounded-pill transition-all duration-500 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-semibold text-muted-foreground font-tabular w-8 text-right">
          {score}%
        </span>
      )}
    </div>
  );
}