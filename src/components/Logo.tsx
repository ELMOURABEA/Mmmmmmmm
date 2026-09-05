import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'full' | 'icon' | 'badge';
  dark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'full',
  dark = false
}) => {
  const sizeMap = {
    sm: { h: 'h-10', iconWidth: 100, textScale: 'text-sm' },
    md: { h: 'h-13', iconWidth: 130, textScale: 'text-base' },
    lg: { h: 'h-18', iconWidth: 170, textScale: 'text-xl' },
    xl: { h: 'h-24', iconWidth: 220, textScale: 'text-2xl' },
  };

  const current = sizeMap[size];

  // Authentic vector recreation of the official El-Bendary logo (BENDAR since 1980)
  // Direct match to official brand assets & store facade
  const LogoEmblem = (
    <svg
      viewBox="0 0 540 380"
      className={`${current.h} w-auto transition-transform duration-200 group-hover:scale-105 shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="صيدليات البنداري - BENDAR since 1980"
    >
      {/* 1. Left: Caduceus Serpent Chalice / Hygieia Snake Motif forming "B" */}
      <g id="hygieia-snake">
        {/* Snake chalice upper loop */}
        <path
          d="M 130 115 
             C 70 85, 25 110, 28 155 
             C 32 195, 80 205, 125 190 
             C 160 178, 205 160, 240 162
             C 275 164, 260 190, 205 200
             C 150 210, 85 210, 65 240
             C 45 270, 75 320, 125 330
             C 145 334, 150 315, 130 310
             C 95 300, 78 275, 88 250
             C 98 225, 150 220, 195 212
             C 255 200, 285 155, 235 145
             C 195 137, 145 160, 110 172
             C 75 184, 52 172, 48 150
             C 44 125, 75 105, 120 125 Z"
          fill="#D3242B"
        />
        {/* Snake Head & Eye */}
        <ellipse cx="115" cy="155" rx="14" ry="10" transform="rotate(-20 115 155)" fill="#D3242B" />
        <circle cx="118" cy="154" r="2.5" fill="#FFFFFF" />
        {/* Chalice Base Stem */}
        <path
          d="M 100 230 L 100 320 Q 100 330 115 330 Q 85 330 85 320 L 85 230 Z"
          fill="#D3242B"
        />
        {/* Chalice Pedestal Stand */}
        <path
          d="M 70 330 C 85 320, 115 320, 130 330 C 135 334, 65 334, 70 330 Z"
          fill="#D3242B"
        />
      </g>

      {/* 2. Right: Mortar & Herbal Elements */}
      <g id="mortar-and-leaves">
        {/* Dark Charcoal Pestle slanted into bowl */}
        <path
          d="M 305 60 
             C 315 58, 335 62, 332 78
             L 370 175
             L 335 175
             L 285 75
             C 282 62, 295 58, 305 60 Z"
          fill="#2B2D31"
          stroke="#1F2023"
          strokeWidth="2"
        />
        {/* Pestle Top Highlight */}
        <path
          d="M 288 72 C 300 64, 325 68, 330 76"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Green Medicinal Leaves inside Mortar */}
        {/* Leaf 1: Center-left slender leaf */}
        <path
          d="M 370 170 
             C 365 110, 360 50, 410 22 
             C 415 65, 415 120, 395 170 Z"
          fill="#1B7A38"
        />
        {/* Leaf 2: Right leaf */}
        <path
          d="M 398 170 
             C 408 120, 420 70, 452 40 
             C 455 85, 445 130, 422 170 Z"
          fill="#2FA84F"
        />
        
        {/* 3 Green Pharmaceutical / Herbal Essence Droplets */}
        <circle cx="395" cy="50" r="15" fill="#1B7A38" />
        <circle cx="430" cy="46" r="10" fill="#2FA84F" />
        <circle cx="398" cy="18" r="8" fill="#44C268" />

        {/* Dynamic Red Mortar Bowl sweeps around and cradles the text */}
        <path
          d="M 280 145 
             C 305 175, 420 185, 480 140 
             C 495 130, 502 145, 492 165 
             C 475 200, 420 205, 345 190 
             C 300 180, 275 160, 280 145 Z"
          fill="#D3242B"
        />
        <path
          d="M 488 155
             C 515 210, 495 285, 435 315
             C 380 340, 290 330, 240 315
             C 230 312, 235 304, 248 307
             C 300 320, 385 325, 430 295
             C 480 260, 490 200, 475 160 Z"
          fill="#D3242B"
        />
      </g>

      {/* 3. Center Text: Authentic typography matching uploaded brand logo */}
      {/* Arabic Title: "صيدليات البنداري" in Red */}
      <text
        x="475"
        y="238"
        textAnchor="end"
        fill="#D3242B"
        fontSize="44"
        fontFamily="'Tajawal', 'Segoe UI', sans-serif"
        fontWeight="800"
        letterSpacing="0.5"
      >
        صيدليات البنداري
      </text>

      {/* English Brand: "BENDAR" in Black Brush Style */}
      <text
        x="135"
        y="308"
        fill="#141619"
        fontSize="64"
        fontFamily="'Plus Jakarta Sans', Impact, sans-serif"
        fontWeight="900"
        letterSpacing="3"
      >
        BENDAR
      </text>

      {/* Heritage Tag: "since 1980" in Black */}
      <text
        x="145"
        y="348"
        fill="#141619"
        fontSize="30"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="1"
      >
        since 1980
      </text>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {LogoEmblem}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {LogoEmblem}
      {showSubtitle && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight leading-tight text-slate-900 dark:text-white ${current.textScale}`}>
              EL-BENDARY
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded">
              1980
            </span>
          </div>
          <span className="text-xs font-bold text-red-600 dark:text-red-400 font-arabic">
            صيدليات البنداري • 46 عاماً من الثقة
          </span>
        </div>
      )}
    </div>
  );
};
