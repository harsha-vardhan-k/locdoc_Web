'use client';

import React, { memo, useMemo } from 'react';


interface AppLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  showText?: boolean;
  variant?: 'default' | 'white';
}

const AppLogo = memo(function AppLogo({
  size = 36,
  className = '',
  onClick,
  showText = true,
  variant = 'default',
}: AppLogoProps) {
  const containerClassName = useMemo(() => {
    const classes = ['flex items-center gap-2.5'];
    if (onClick) classes.push('cursor-pointer');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [onClick, className]);

  const iconSize = size;
  const isWhite = variant === 'white';

  return (
    <div className={containerClassName} onClick={onClick}>
      {/* Icon Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Background rounded square */}
        <rect width="40" height="40" rx="11" fill={isWhite ? 'rgba(255,255,255,0.15)' : 'url(#logoGrad)'} />

        {/* Stethoscope design */}
        {/* Chest piece — circle at bottom left */}
        <circle
          cx="13"
          cy="27"
          r="4"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeOpacity={isWhite ? 0.9 : 1}
        />
        {/* Inner dot of chest piece */}
        <circle cx="13" cy="27" r="1.5" fill="white" fillOpacity={isWhite ? 0.7 : 0.9} />

        {/* Tube: from chest piece up and curving to earpiece */}
        {/* Vertical segment up from chest piece */}
        <path
          d="M13 23 L13 17 Q13 13 17 13 L23 13 Q27 13 27 17 L27 20"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeOpacity={isWhite ? 0.9 : 1}
        />

        {/* Earpiece — small circle at top right end */}
        <circle
          cx="27"
          cy="21"
          r="2.5"
          fill="white"
          fillOpacity={isWhite ? 0.85 : 1}
        />

        {/* Medical cross — small, top-right area of icon */}
        <rect x="29" y="7" width="2" height="6" rx="1" fill="white" fillOpacity={isWhite ? 0.6 : 0.85} />
        <rect x="27" y="9" width="6" height="2" rx="1" fill="white" fillOpacity={isWhite ? 0.6 : 0.85} />

        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0891B2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Logotype */}
      {showText && (
        <span
          style={{
            fontSize: Math.round(iconSize * 0.47),
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontWeight: 800,
            color: isWhite ? '#ffffff' : 'var(--foreground)',
          }}
          className="hidden sm:block select-none"
        >
          Loc
          <span
            style={{
              color: isWhite ? 'rgba(255,255,255,0.75)' : 'var(--primary)',
            }}
          >
            Doc
          </span>
        </span>
      )}
    </div>
  );
});

export default AppLogo;
