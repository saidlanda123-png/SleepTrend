import React from 'react';
import type { Challenge } from '../types';

interface BadgeSVGProps {
  challenge: Challenge;
}

const BadgeSVG: React.ForwardRefRenderFunction<SVGSVGElement, BadgeSVGProps> = ({ challenge }, ref) => {
  const Icon = challenge.icon;
  const uniqueId = `badge-gradient-${challenge.id}`;

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={challenge.badgeColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={challenge.badgeColor} stopOpacity="0.4" />
        </linearGradient>
        <filter id="neon-glow-badge" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="icon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={challenge.badgeColor} />
        </filter>
      </defs>

      {/* Hexagon shape with neon glow */}
      <g filter="url(#neon-glow-badge)">
        <path
          d="M100 0 L195 55 L195 165 L100 220 L5 165 L5 55 Z"
          fill="url(#badge-gradient-dark)"
          stroke={challenge.badgeColor}
          strokeWidth="3"
        />
        <path
          d="M100 0 L195 55 L195 165 L100 220 L5 165 L5 55 Z"
          fill="rgba(22, 29, 49, 0.7)"
        />
      </g>
      
      {/* Inner decorative lines */}
      <g opacity="0.4">
         <path d="M100 20 L180 65 L180 155 L100 200 L20 155 L20 65 Z" fill="none" stroke={challenge.badgeColor} strokeWidth="1" />
      </g>
      
      {/* Icon */}
      <g transform="translate(65, 60)" filter="url(#icon-glow)">
          <Icon className="w-[70px] h-[70px]" style={{ color: 'white' }} />
      </g>
      
      {/* Title */}
      <text
        x="100"
        y="170"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="#f1f5f9"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        {challenge.badgeTitle}
      </text>
    </svg>
  );
};

export default React.forwardRef(BadgeSVG);