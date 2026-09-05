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
    sm: { h: 'h-9', iconSize: 34, textScale: 'text-sm' },
    md: { h: 'h-12', iconSize: 46, textScale: 'text-base' },
    lg: { h: 'h-16', iconSize: 62, textScale: 'text-xl' },
    xl: { h: 'h-24', iconSize: 92, textScale: 'text-2xl' },
  };

  const current = sizeMap[size];

  // Authentic SVG rendering of the El-Bendary logo from the user's reference photo
  const LogoEmblem = (
    <svg
      viewBox="0 0 400 360"
      className={`${current.h} w-auto transition-transform duration-200 group-hover:scale-105 shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="صيدليات البنداري - El-Bendary Pharmacies Since 1980"
    >
      {/* Caduceus snake wand / Bowl of Hygieia serpent motif on left */}
      <path
        d="M60 115 C 30 115, 20 145, 35 170 C 50 195, 110 180, 100 130 C 90 90, 45 95, 30 140 C 20 175, 45 220, 80 230 C 130 240, 190 220, 200 200 C 210 180, 175 160, 120 165 C 70 170, 60 215, 75 250 C 90 280, 115 310, 100 325 C 85 340, 60 330, 50 310"
        stroke="#D32F2F"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Snake head with tongue */}
      <circle cx="85" cy="122" r="9" fill="#D32F2F" />
      <path d="M92 118 Q 102 112 110 116" stroke="#D32F2F" strokeWidth="4" strokeLinecap="round" />

      {/* Mortar pestle handle slanted into bowl */}
      <path
        d="M230 60 L 255 68 L 290 165 L 260 165 Z"
        fill="#374151"
        stroke="#1F2937"
        strokeWidth="3"
        rx="6"
      />

      {/* Medicinal herbal leaves sprouting inside bowl */}
      {/* Left green leaf */}
      <path
        d="M280 165 C 270 120, 275 60, 315 25 C 320 65, 325 125, 310 165 Z"
        fill="#15803D"
      />
      {/* Right green leaf */}
      <path
        d="M325 165 C 325 110, 335 55, 355 35 C 355 80, 350 125, 340 165 Z"
        fill="#16A34A"
      />
      {/* Green pharmaceutical droplets / tablets above mortar */}
      <circle cx="315" cy="65" r="14" fill="#15803D" />
      <circle cx="305" cy="35" r="7" fill="#22C55E" />
      <circle cx="330" cy="38" r="8" fill="#16A34A" />

      {/* Red Mortar bowl with dynamic curvature */}
      <path
        d="M225 145 C 210 145, 230 185, 260 190 C 330 200, 380 185, 375 140 C 370 130, 340 145, 280 150 C 245 152, 230 145, 225 145 Z"
        fill="#D32F2F"
      />
      <path
        d="M210 160 C 240 230, 270 310, 320 330 C 370 315, 390 200, 385 160 C 385 190, 365 295, 315 310 C 265 295, 235 220, 210 160 Z"
        fill="#C62828"
      />

      {/* Arabic Script "صيدليات البنداري" inside the logo contour */}
      <text
        x="365"
        y="235"
        textAnchor="end"
        fill="#D32F2F"
        fontSize="34"
        fontFamily="'Tajawal', sans-serif"
        fontWeight="800"
      >
        صيدليات البنداري
      </text>

      {/* English BENDARY typography in black artistic brush */}
      <text
        x="100"
        y="305"
        fill="#111827"
        fontSize="52"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="900"
        letterSpacing="6"
      >
        BENDARY
      </text>

      {/* "since 1980" heritage tag line */}
      <text
        x="110"
        y="342"
        fill="#1F2937"
        fontSize="24"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontWeight="700"
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
