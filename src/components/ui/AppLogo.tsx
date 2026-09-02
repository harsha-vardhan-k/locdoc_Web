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
        {/* Background pill */}
        <rect width="40" height="40" rx="11" fill={isWhite ? 'rgba(255,255,255,0.15)' : 'url(#logoGrad)'} />

        {/* Cross / plus mark — medical symbol */}
        <rect x="17.5" y="10" width="5" height="20" rx="2.5" fill="white" />
        <rect x="10" y="17.5" width="20" height="5" rx="2.5" fill="white" />

        {/* Small location pin dot at bottom-right */}
        <circle cx="29" cy="29" r="4" fill={isWhite ? 'rgba(255,255,255,0.9)' : '#0891B2'} />
        <circle cx="29" cy="29" r="2" fill="white" />

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
