import React, { useState } from 'react';

/**
 * Islamic Learn Brand Logo
 * Displays the original authentic high-res academy logo with crescent, mosque, Quran, and typography.
 */
export default function IslamicLogo({
  customLogoSrc = '/islamic-learn-logo.png',
  onClick = null,
  className = '',
  size = 'md', // 'sm' | 'md' | 'lg' | 'footer'
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    footer: 'h-20 sm:h-24 md:h-28 lg:h-32',
  }[size] || 'h-11 sm:h-12';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      title="Islamic Learn — Online Quran Education"
    >
      {!imgFailed ? (
        <div className="relative flex items-center">
          <img
            src={customLogoSrc}
            alt="Islamic Learn - Online Quran Education"
            onError={() => setImgFailed(true)}
            className={`${sizeClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_14px_rgba(109,63,217,0.16)]`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ffd777] to-[#e0a93b] text-[#1c1040] flex items-center justify-center font-black text-2xl shadow-sm">
            ☪
          </span>
          <div className="flex flex-col">
            <span className="text-[#14092b] font-black text-xl sm:text-2xl leading-none">
              Islamic <span className="text-[#6d28d9]">Learn</span>
            </span>
            <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider mt-1">
              Online Quran Education
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
