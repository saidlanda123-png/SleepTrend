import React from 'react';
import type { Challenge } from '../types';

interface BadgeSVGProps {
  challenge: Challenge;
  userName: string;
}

const BadgeSVG: React.FC<BadgeSVGProps> = ({ challenge, userName }) => {
  const Icon = challenge.icon;
  
  return (
    <svg
      viewBox="0 0 200 250"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="badge-gradient-dark-rect" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <filter id="neon-glow-badge" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="icon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={challenge.badgeColor} />
        </filter>
      </defs>

      {/* Card shape with neon glow */}
      <g filter="url(#neon-glow-badge)">
        <rect
          x="5"
          y="5"
          width="190"
          height="240"
          rx="20"
          ry="20"
          fill="url(#badge-gradient-dark-rect)"
          stroke={challenge.badgeColor}
          strokeWidth="3"
        />
      </g>
      
      {/* Icon */}
      <g transform="translate(65, 30)" filter="url(#icon-glow)">
          {/* FIX: Property 'style' does not exist on type 'IntrinsicAttributes & { className?: string; }'. Replaced with 'text-white' className to set color. */}
          <Icon className="w-[70px] h-[70px] text-white" />
      </g>
      
      {/* Divider */}
      <line x1="30" y1="120" x2="170" y2="120" stroke={challenge.badgeColor} strokeWidth="1" strokeOpacity="0.5" />

      {/* Title */}
      <foreignObject x="25" y="130" width="150" height="55">
        {/* FIX: Property 'xmlns' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'. Removed it. */}
        <div 
            style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '19px',
                fontWeight: 'bold',
                color: challenge.badgeColor,
                textAlign: 'center',
                lineHeight: '1.25',
                letterSpacing: '0.5px',
                wordWrap: 'break-word',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}>
          {challenge.badgeTitle}
        </div>
      </foreignObject>

      {/* Legend */}
      <foreignObject x="25" y="190" width="150" height="45">
        {/* FIX: Property 'xmlns' does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'. Removed it. */}
        <div 
            style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#cbd5e1',
                textAlign: 'center',
                lineHeight: '1.4'
            }}>
          <p style={{ margin: 0, padding: 0, fontWeight: 500 }}>{userName}</p>
          <p style={{ margin: 0, padding: 0, marginTop: '2px', opacity: 0.8 }}>{challenge.badgeAchievement}</p>
        </div>
      </foreignObject>
    </svg>
  );
};

export default BadgeSVG;
