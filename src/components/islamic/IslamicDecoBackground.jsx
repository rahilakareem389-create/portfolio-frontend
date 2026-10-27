import React from 'react';

/**
 * ============================================================================
 * ISLAMIC DELICATE BACKGROUND DECORATIVE MOTIFS
 * 
 * Lightweight, thin-lined, whisper-light SVG motifs for premium Islamic design:
 * 1. Floating crescent moons and tiny stars
 * 2. Elegant hanging Islamic lanterns with a very subtle glow
 * 3. Minimal mosque domes and minarets
 * 4. Subtle icons inspired by the Five Pillars of Islam (Shahada, Salah, Zakat, Sawm, Hajj)
 * 5. Beautiful Islamic geometric Jali patterns and arabesque ornaments
 * 6. Tiny floating gold particles and gentle light effects
 * 7. Decorative Islamic arch outlines around section backgrounds
 *
 * All decorations are strictly pointer-events-none and z-0 to guarantee they
 * sit behind content without blocking clicks, forms, text, or cards.
 * ============================================================================
 */

/* 1. Floating Crescent Moon & 4-Point Star */
export function CrescentMoonStar({ className = '', style = {}, size = 36, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M17 6 A13 13 0 1 0 29 28 A10.5 10.5 0 0 1 17 6 Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 10 L31.2 13.5 L34.7 14.7 L31.2 15.9 L30 19.4 L28.8 15.9 L25.3 14.7 L28.8 13.5 Z"
        stroke={color}
        strokeWidth="0.9"
        fill={color}
        fillOpacity="0.25"
      />
    </svg>
  );
}

/* 2. Delicate 8-Point Geometric Star (Rub el Hizb / Khatim) */
export function EightPointStar({ className = '', style = {}, size = 44, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M24 3 L28.8 8.8 L36.2 6.5 L36.5 14.2 L43.9 17.5 L39.8 24 L43.9 30.5 L36.5 33.8 L36.2 41.5 L28.8 39.2 L24 45 L19.2 39.2 L11.8 41.5 L11.5 33.8 L4.1 30.5 L8.2 24 L4.1 17.5 L11.5 14.2 L11.8 6.5 L19.2 8.8 Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="7" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
      <circle cx="24" cy="24" r="1.5" fill={color} />
    </svg>
  );
}

/* 3. Minimal Mosque Dome & Minarets Line-Art Silhouette */
export function MosqueLineSilhouette({ className = '', style = {}, width = 84, height = 70, color = 'currentColor' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Central Onion Dome */}
      <path
        d="M26 62 V42 C26 28, 34 17, 44 8 C54 17, 62 28, 62 42 V62"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Dome Crescent Finial */}
      <path d="M44 8 V3" stroke={color} strokeWidth="1" />
      <path
        d="M42.5 4 A2 2 0 1 0 45.5 4 A1.5 1.5 0 0 1 42.5 4"
        stroke={color}
        strokeWidth="0.8"
      />
      {/* Arched Window in Dome */}
      <path
        d="M39 62 V51 C39 46.5, 49 46.5, 49 51 V62"
        stroke={color}
        strokeWidth="0.9"
      />
      {/* Right Minaret */}
      <path
        d="M72 62 V24 L76 16 L80 24 V62"
        stroke={color}
        strokeWidth="1.1"
      />
      <path d="M70 30 H82" stroke={color} strokeWidth="1" />
      <path d="M71 44 H81" stroke={color} strokeWidth="0.8" />
      <path d="M76 16 V10" stroke={color} strokeWidth="0.9" />
      {/* Small Left Turret */}
      <path d="M14 62 V36 L17 30 L20 36 V62" stroke={color} strokeWidth="0.9" />
      <path d="M13 41 H21" stroke={color} strokeWidth="0.8" />
      {/* Base Line */}
      <path d="M8 62 H88" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* 4. Elegant Hanging Islamic Lantern (Fanous / Qandeel) with Chain & Subtle Flame Glow */
export function HangingLantern({ className = '', style = {}, width = 36, height = 120, color = 'currentColor', glowColor = '#ffd777' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Hanging Chain from Top Ceiling */}
      <line x1="20" y1="0" x2="20" y2="38" stroke={color} strokeWidth="1" strokeDasharray="2 3" />
      {/* Top Hanging Ring */}
      <circle cx="20" cy="42" r="4" stroke={color} strokeWidth="1" fill="none" />
      {/* Lantern Cap Dome */}
      <path d="M13 54 C15 48, 17 46, 20 46 C23 46, 25 48, 27 54 Z" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.1" />
      <path d="M9 55 H31" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {/* Glass Body with Moroccan Arches */}
      <path d="M10 55 L7 86 L14 98 H26 L33 86 L30 55 Z" stroke={color} strokeWidth="1.1" fill="none" />
      {/* Arched Window Panes */}
      <path d="M15 60 V84 C15 86 20 86 20 84 V60" stroke={color} strokeWidth="0.8" />
      <path d="M25 60 V84 C25 86 20 86 20 84 V60" stroke={color} strokeWidth="0.8" />
      {/* Warm Flame Glow inside */}
      <circle cx="20" cy="73" r="4" fill={glowColor} fillOpacity="0.3" className="animate-islamic-lantern-glow" />
      <path d="M20 67 Q22 72 20 75 Q18 72 20 67 Z" fill={glowColor} fillOpacity="0.85" />
      {/* Bottom Finial Droplet */}
      <line x1="20" y1="98" x2="20" y2="106" stroke={color} strokeWidth="0.9" />
      <circle cx="20" cy="108" r="2.2" fill={color} />
      <path d="M20 110 V122" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* 5. Arabesque Ornamental Corner Flourish */
export function ArabesqueCorner({ className = '', style = {}, size = 56, color = 'currentColor', flipX = false, flipY = false }) {
  const transform = `${flipX ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`.trim();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: transform || undefined, ...style }}
      aria-hidden="true"
    >
      <path
        d="M3 53 V15 C3 8.37, 8.37 3, 15 3 H53"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M13 36 C13 22, 17 13, 31 13 C41 13, 44 20, 37 25 C30 30, 24 23, 27 18"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <circle cx="37" cy="25" r="1.5" fill={color} />
      <circle cx="15" cy="3" r="1.2" fill={color} />
      <circle cx="3" cy="15" r="1.2" fill={color} />
    </svg>
  );
}

/* 6. Islamic Jali Lattice Pattern Patch */
export function JaliLatticePatch({ className = '', style = {}, width = 110, height = 110, color = 'currentColor', patternId = 'jali-pat' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
          <path
            d="M12.5 0 L15.5 6.5 L22 3.5 L19 9.5 L25 12.5 L19 15.5 L22 21.5 L15.5 18.5 L12.5 25 L9.5 18.5 L3 21.5 L6 15.5 L0 12.5 L6 9.5 L3 3.5 L9.5 6.5 Z"
            stroke={color}
            strokeWidth="0.8"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#${patternId})`} />
    </svg>
  );
}

/* 7. Subtle Pale-Gold / Lavender 4-Point Sparkle */
export function SparkleStar({ className = '', style = {}, size = 20, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 2 Q12 9 19 12 Q12 15 12 22 Q12 15 5 12 Q12 9 12 2 Z"
        stroke={color}
        strokeWidth="0.9"
        fill={color}
        fillOpacity="0.3"
      />
    </svg>
  );
}

/* 8. Decorative Islamic Mehrab Arch Outline */
export function IslamicArchOutline({ className = '', style = {}, width = 64, height = 96, color = 'currentColor' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 72 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer Pointed Moorish Arch */}
      <path
        d="M8 104 V54 C8 32, 24 16, 36 6 C48 16, 64 32, 64 54 V104"
        stroke={color}
        strokeWidth="1.1"
      />
      {/* Inner Arch Line */}
      <path
        d="M16 104 V56 C16 38, 28 26, 36 18 C44 26, 56 38, 56 56 V104"
        stroke={color}
        strokeWidth="0.7"
        strokeDasharray="2 2"
      />
      {/* Arch Peak Star Finial */}
      <circle cx="36" cy="6" r="2" fill={color} />
      {/* Base Line */}
      <line x1="4" y1="104" x2="68" y2="104" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * ============================================================================
 * FIVE PILLARS OF ISLAM TASTEFUL MINIMAL MOTIFS
 * Dignified, respectful, geometric line-art representations.
 * ============================================================================
 */

/* PILLAR 1: Shahada (Faith / Respectful Arabic Calligraphy) */
export function ShahadaCalligraphy({ className = '', style = {}, width = 135, height = 50, color = 'currentColor' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Lam-Alif */}
        <path d="M18 52 V14 C18 10, 24 10, 26 18 L32 38" />
        <path d="M28 14 V48 C28 52, 22 52, 16 48" />
        {/* Ilaha */}
        <path d="M38 50 V20" />
        <path d="M38 42 C44 42, 48 34, 48 26 V18" />
        <path d="M48 38 C54 38, 58 44, 62 48" />
        {/* Illa */}
        <path d="M70 50 V14 C70 10, 76 10, 78 18 L84 40" />
        <path d="M80 14 V48" />
        {/* Allah - Alif, Lam, Lam, Ha */}
        <path d="M96 50 V12" />
        <path d="M106 50 V16 C106 14, 112 14, 114 20 L118 42" />
        <path d="M124 50 V18 C124 14, 130 14, 132 22 L136 40" />
        <path d="M136 38 C142 38, 146 32, 146 26 C146 20, 140 20, 136 26" />
        {/* Sacred Accents */}
        <path d="M116 10 Q120 7 124 10 Q128 7 132 10" strokeWidth="0.9" />
        <line x1="124" y1="5" x2="124" y2="2" strokeWidth="0.9" />
      </g>
      <path d="M10 54 Q80 57 150 54" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
    </svg>
  );
}

/* PILLAR 2: Salah (Prayer Mat / Sajadah with Mihrab Arch) */
export function PrayerMatMotif({ className = '', style = {}, width = 50, height = 72, color = 'currentColor' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Outer Mat Border */}
      <rect x="6" y="8" width="48" height="68" rx="2" stroke={color} strokeWidth="1.1" />
      {/* Top Fringe Tassels */}
      {[10, 16, 22, 28, 34, 40, 46, 50].map((x) => (
        <line key={`top-${x}`} x1={x} y1="4" x2={x} y2="8" stroke={color} strokeWidth="0.8" />
      ))}
      {/* Bottom Fringe Tassels */}
      {[10, 16, 22, 28, 34, 40, 46, 50].map((x) => (
        <line key={`bot-${x}`} x1={x} y1="76" x2={x} y2="80" stroke={color} strokeWidth="0.8" />
      ))}
      {/* Inner Decorative Arch (Mihrab Niche) */}
      <path
        d="M14 68 V34 C14 22, 22 16, 30 16 C38 16, 46 22, 46 34 V68 Z"
        stroke={color}
        strokeWidth="0.9"
      />
      {/* Mihrab Pointed Apex */}
      <path d="M30 16 L30 12" stroke={color} strokeWidth="0.8" />
      {/* Small Hanging Qandeel inside Arch */}
      <circle cx="30" cy="28" r="2" fill={color} />
      <line x1="30" y1="16" x2="30" y2="26" stroke={color} strokeWidth="0.7" strokeDasharray="1 1" />
      {/* Center 8-point motif */}
      <circle cx="30" cy="46" r="3.5" stroke={color} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

/* PILLAR 3: Zakat (Charity / Giving Palm with Radiant Barakah Coin) */
export function ZakatCharityMotif({ className = '', style = {}, size = 50, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M10 36 C10 42, 16 46, 28 46 C40 46, 46 42, 46 36 C46 32, 42 30, 36 30 C32 30, 30 33, 28 33 C26 33, 24 30, 20 30 C14 30, 10 32, 10 36 Z"
        stroke={color}
        strokeWidth="1.1"
      />
      {/* Radiating Barakah Sadaqah Coin */}
      <circle cx="28" cy="18" r="6" stroke={color} strokeWidth="1" strokeDasharray="2 1" />
      <path
        d="M28 8 V12 M28 24 V28 M18 18 H22 M34 18 H38 M21 11 L24 14 M32 22 L35 25 M35 11 L32 14 M24 22 L21 25"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path d="M28 15 Q30 17 28 21 Q26 17 28 15 Z" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

/* PILLAR 4: Sawm (Fasting / Crescent Moon with Date Palm Frond) */
export function SawmCrescentMotif({ className = '', style = {}, size = 46, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M18 8 A17 17 0 1 0 38 36 A14 14 0 0 1 18 8 Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M22 28 Q27 24 33 21" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M26 26 Q25 21 28 20" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M29 24 Q30 19 33 19" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M31 23 Q34 22 36 23" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
      <path
        d="M34 12 L35 14.5 L37.5 15.5 L35 16.5 L34 19 L33 16.5 L30.5 15.5 L33 14.5 Z"
        fill={color}
        fillOpacity="0.6"
      />
    </svg>
  );
}

/* PILLAR 5: Hajj (Sacred Kaaba / Baitullah with Golden Kiswah & Tawaf Rings) */
export function KaabaSilhouette({ className = '', style = {}, size = 50, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Minimalist Isometric Holy Kaaba */}
      <polygon points="12,22 28,15 28,45 12,50" stroke={color} strokeWidth="1.1" fill={color} fillOpacity="0.08" />
      <polygon points="28,15 44,22 44,50 28,45" stroke={color} strokeWidth="1.1" fill={color} fillOpacity="0.14" />
      <polygon points="12,22 28,15 44,22 28,28" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.04" />
      {/* Golden Kiswah Band */}
      <line x1="12" y1="28" x2="28" y2="21" stroke="#e0a93b" strokeWidth="1.4" strokeDasharray="3 1" />
      <line x1="28" y1="21" x2="44" y2="28" stroke="#e0a93b" strokeWidth="1.4" strokeDasharray="3 1" />
      {/* Sacred Door (Bab ar-Rahmah) */}
      <rect x="33" y="32" width="6" height="12" rx="1" stroke="#e0a93b" strokeWidth="0.9" fill="none" />
      {/* Subtle Tawaf Concentric Rings */}
      <ellipse cx="28" cy="51" rx="22" ry="4" stroke={color} strokeWidth="0.7" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

/* Floating Gold Particles Component */
export function FloatingGoldParticles({ count = 4, className = '' }) {
  const particles = [
    { top: '15%', left: '8%', size: 4, dur: '11s', delay: '0s' },
    { top: '48%', right: '10%', size: 5, dur: '14s', delay: '2s' },
    { top: '78%', left: '14%', size: 3.5, dur: '9s', delay: '4s' },
    { top: '32%', right: '24%', size: 4.5, dur: '16s', delay: '1s' },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-0 ${className}`} aria-hidden="true">
      {particles.slice(0, count).map((p, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-gradient-to-br from-[#ffd777] to-[#e0a93b] animate-islamic-particle"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.12,
            animationDuration: p.dur,
            animationDelay: p.delay,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}

/**
 * ============================================================================
 * SECTION-SPECIFIC BACKGROUND DECORATION COMPOSITIONS
 * Tailored with light/dark palettes, varied placements, and whisper-light opacity.
 * ============================================================================
 */

/* 1. COURSES SECTION (Light Background #f6f1ff) */
export function CoursesDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Right: Hanging Lantern swaying gently from ceiling */}
      <div className="absolute -top-2 right-8 sm:right-16 opacity-[0.10] text-[#6d3fd9] animate-islamic-lantern">
        <HangingLantern width={34} height={110} color="#6d3fd9" glowColor="#e0a93b" />
      </div>

      {/* Top-Left Margin: Floating Crescent Moon & 4-Point Star */}
      <div className="absolute top-8 left-4 sm:top-12 sm:left-10 opacity-[0.09] text-[#6d3fd9] animate-islamic-drift">
        <CrescentMoonStar size={34} />
      </div>

      {/* Mid-Right: Prayer Mat Motif celebrating Quran recitation & prayer */}
      <div className="absolute top-1/3 right-3 sm:right-10 opacity-[0.08] text-[#7c3aed] animate-islamic-float">
        <PrayerMatMotif width={46} height={66} />
      </div>

      {/* Left Edge: Delicate Jali Lattice Patch */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 opacity-[0.05] text-[#6d3fd9]">
        <JaliLatticePatch width={120} height={120} patternId="jali-courses" />
      </div>

      {/* Bottom-Right Corner: Faint Mosque Line-Art Silhouette */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-12 opacity-[0.07] text-[#6d3fd9]">
        <MosqueLineSilhouette width={88} height={70} />
      </div>

      {/* Floating Gold Sparkle */}
      <div className="absolute top-20 right-28 opacity-[0.11] text-[#d49b29] animate-islamic-shimmer">
        <SparkleStar size={20} />
      </div>

      {/* Subtle Gold Particles */}
      <FloatingGoldParticles count={3} />
    </div>
  );
}

/* 2. ABOUT SECTION (Light Background #efe7ff) */
export function AboutDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Left: Ornamental Corner Lines */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-[0.08] text-[#6d3fd9]">
        <ArabesqueCorner size={54} />
      </div>

      {/* Top-Right: Shahada Calligraphy in respectful, delicate breathing fade */}
      <div className="absolute top-6 right-4 sm:top-10 sm:right-12 opacity-[0.09] text-[#581c87] animate-islamic-sacred">
        <ShahadaCalligraphy width={140} height={52} />
      </div>

      {/* Mid-Left: Fasting Crescent & Date Palm Frond */}
      <div className="absolute top-1/2 left-3 sm:left-8 opacity-[0.08] text-[#c68a18] animate-islamic-float">
        <SawmCrescentMotif size={44} />
      </div>

      {/* Bottom-Right: Minimalist Islamic Arch Outline */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 opacity-[0.07] text-[#6d3fd9]">
        <IslamicArchOutline width={56} height={84} />
      </div>

      {/* Bottom-Left: Faint Mosque Silhouette */}
      <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10 opacity-[0.07] text-[#6d3fd9]">
        <MosqueLineSilhouette width={80} height={64} />
      </div>

      {/* Gold Sparkles */}
      <div className="absolute top-24 left-24 opacity-[0.11] text-[#d49b29] animate-islamic-shimmer-slow">
        <SparkleStar size={18} />
      </div>

      <FloatingGoldParticles count={3} />
    </div>
  );
}

/* 3. HOW WE LEARN SECTION (Soft Pale Yellow Background #fff1c0) */
export function HowWeLearnDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Right: Hanging Lantern swaying slowly */}
      <div className="absolute -top-2 right-6 sm:right-14 opacity-[0.10] text-[#b88210] animate-islamic-lantern-slow">
        <HangingLantern width={32} height={105} color="#b88210" glowColor="#d97706" />
      </div>

      {/* Top-Left Margin: 8-Point Geometric Star */}
      <div className="absolute top-8 left-4 sm:top-12 sm:left-10 opacity-[0.09] text-[#935fc7] animate-islamic-drift">
        <EightPointStar size={42} />
      </div>

      {/* Bottom-Right: Corner Flourish */}
      <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 opacity-[0.10] text-[#b88210]">
        <ArabesqueCorner size={54} flipX={true} flipY={true} />
      </div>

      {/* Bottom-Left: Faint Mosque Silhouette */}
      <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10 opacity-[0.08] text-[#935fc7]">
        <MosqueLineSilhouette width={80} height={64} />
      </div>

      {/* Floating Gold Sparkle */}
      <div className="absolute top-1/2 left-8 opacity-[0.12] text-[#b88210] animate-islamic-shimmer">
        <SparkleStar size={20} />
      </div>

      <FloatingGoldParticles count={3} />
    </div>
  );
}

/* 4. CLASS TIMINGS SECTION (Dark Background #2b1766) */
export function TimingsDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Right: Gentle Glowing Pale-Gold Crescent Moon */}
      <div className="absolute top-8 right-6 sm:top-12 sm:right-12 opacity-[0.11] text-[#ffd777] animate-islamic-drift">
        <CrescentMoonStar size={38} />
      </div>

      {/* Top-Left: Hanging Lantern with Luminous Amber Flame */}
      <div className="absolute -top-2 left-8 sm:left-16 opacity-[0.11] text-[#ffd777] animate-islamic-lantern">
        <HangingLantern width={36} height={115} color="#ffd777" glowColor="#ffe28a" />
      </div>

      {/* Mid-Right: Holy Kaaba Motif with Golden Kiswah Band */}
      <div className="absolute top-1/3 right-4 sm:right-12 opacity-[0.10] text-[#e9d5ff] animate-islamic-float">
        <KaabaSilhouette size={50} />
      </div>

      {/* Bottom-Left: Faint Mosque Silhouette in Soft Lavender Outline */}
      <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10 opacity-[0.09] text-[#d8b4fe]">
        <MosqueLineSilhouette width={86} height={68} />
      </div>

      {/* Bottom-Right Margin: Jali Lattice Geometric Patch */}
      <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 opacity-[0.06] text-[#ffd777]">
        <JaliLatticePatch width={110} height={110} patternId="jali-timings" />
      </div>

      {/* Pale-Gold Sparkles floating */}
      <div className="absolute top-1/3 left-10 opacity-[0.13] text-[#ffd777] animate-islamic-shimmer">
        <SparkleStar size={20} />
      </div>

      <FloatingGoldParticles count={4} />
    </div>
  );
}

/* 5. PRICING & PLANS SECTION (Light Background #f6f1ff) */
export function PricingDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Right: Hanging Lantern swaying gently */}
      <div className="absolute -top-2 right-8 sm:right-20 opacity-[0.10] text-[#6d3fd9] animate-islamic-lantern-slow">
        <HangingLantern width={34} height={110} color="#6d3fd9" glowColor="#e0a93b" />
      </div>

      {/* Top-Left Margin: Zakat & Charity Motif in Soft Purple/Gold */}
      <div className="absolute top-6 left-4 sm:top-10 sm:left-8 opacity-[0.09] text-[#6d3fd9] animate-islamic-float">
        <ZakatCharityMotif size={48} />
      </div>

      {/* Bottom-Right Corner: Faint Mosque Line-Art Silhouette */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-10 opacity-[0.07] text-[#6d3fd9]">
        <MosqueLineSilhouette width={84} height={66} />
      </div>

      {/* Bottom-Left Corner: Arabesque Corner Lines */}
      <div className="absolute bottom-5 left-4 sm:bottom-8 sm:left-8 opacity-[0.08] text-[#d49b29]">
        <ArabesqueCorner size={54} flipY={true} />
      </div>

      {/* Right Edge: Delicate Jali Lattice Patch */}
      <div className="absolute top-1/2 right-2 sm:right-6 opacity-[0.05] text-[#6d3fd9]">
        <JaliLatticePatch width={115} height={115} patternId="jali-pricing" />
      </div>

      {/* Floating Gold Sparkle */}
      <div className="absolute top-20 right-28 opacity-[0.11] text-[#d49b29] animate-islamic-shimmer">
        <SparkleStar size={20} />
      </div>

      <FloatingGoldParticles count={3} />
    </div>
  );
}

/* 6. WHY US SECTION (Dark Background #1c1040) */
export function WhyUsDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Left: Pale-Gold 8-Point Star */}
      <div className="absolute top-6 left-5 sm:top-10 sm:left-10 opacity-[0.10] text-[#ffd777] animate-islamic-drift">
        <EightPointStar size={46} />
      </div>

      {/* Top-Right: Crescent Moon Outline with Lavender Star */}
      <div className="absolute top-8 right-6 sm:top-12 sm:right-12 opacity-[0.11] text-[#d8b4fe] animate-islamic-float">
        <CrescentMoonStar size={36} />
      </div>

      {/* Mid-Left: Prayer Mat Motif in Soft Gold */}
      <div className="absolute top-1/2 left-4 sm:left-10 opacity-[0.09] text-[#ffd777] animate-islamic-float">
        <PrayerMatMotif width={44} height={64} />
      </div>

      {/* Bottom-Right: Minimal Islamic Arch Outline */}
      <div className="absolute bottom-6 right-5 sm:bottom-10 sm:right-10 opacity-[0.08] text-[#d8b4fe]">
        <IslamicArchOutline width={56} height={84} />
      </div>

      {/* Bottom-Left: Ornamental Corner Lines */}
      <div className="absolute bottom-5 left-4 sm:bottom-8 sm:left-8 opacity-[0.09] text-[#c4b5fd]">
        <ArabesqueCorner size={54} flipY={true} />
      </div>

      {/* Pale-Gold Sparkle */}
      <div className="absolute top-1/3 right-8 opacity-[0.12] text-[#ffd777] animate-islamic-shimmer">
        <SparkleStar size={22} />
      </div>

      <FloatingGoldParticles count={4} />
    </div>
  );
}

/* 7. FAQ SECTION (Light Background #efe7ff) */
export function FaqDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Right: Hanging Lantern swaying gently */}
      <div className="absolute -top-2 right-8 sm:right-16 opacity-[0.09] text-[#6d3fd9] animate-islamic-lantern">
        <HangingLantern width={34} height={110} color="#6d3fd9" glowColor="#e0a93b" />
      </div>

      {/* Top-Left: Arabesque Corner */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-[0.08] text-[#6d3fd9]">
        <ArabesqueCorner size={54} />
      </div>

      {/* Mid-Left: Fasting Crescent Moon Motif */}
      <div className="absolute top-1/2 left-3 sm:left-8 opacity-[0.08] text-[#c68a18] animate-islamic-float">
        <SawmCrescentMotif size={44} />
      </div>

      {/* Bottom-Left: Faint Mosque Silhouette */}
      <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-10 opacity-[0.08] text-[#6d3fd9]">
        <MosqueLineSilhouette width={82} height={66} />
      </div>

      {/* Bottom-Right: 8-Point Star */}
      <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 opacity-[0.08] text-[#7c3aed] animate-islamic-drift">
        <EightPointStar size={42} />
      </div>

      {/* Left Center: Delicate Jali Lattice Patch */}
      <div className="absolute top-1/3 left-2 sm:left-6 opacity-[0.05] text-[#6d3fd9]">
        <JaliLatticePatch width={110} height={110} patternId="jali-faq" />
      </div>

      {/* Gold Sparkle */}
      <div className="absolute top-16 right-24 opacity-[0.11] text-[#d49b29] animate-islamic-shimmer">
        <SparkleStar size={18} />
      </div>

      <FloatingGoldParticles count={3} />
    </div>
  );
}

/* 8. ADMISSION FORM SECTION (Dark Background #3a1f8a) */
export function AdmissionDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Left: Hanging Lantern in Soft Pale Gold */}
      <div className="absolute -top-2 left-6 sm:left-14 opacity-[0.11] text-[#ffd777] animate-islamic-lantern-slow">
        <HangingLantern width={36} height={115} color="#ffd777" glowColor="#ffe28a" />
      </div>

      {/* Top-Right: Luminous Crescent Moon & Star */}
      <div className="absolute top-6 right-6 sm:top-10 sm:right-12 opacity-[0.11] text-[#ffd777] animate-islamic-drift">
        <CrescentMoonStar size={38} />
      </div>

      {/* Mid-Left: Holy Kaaba Motif */}
      <div className="absolute top-1/2 left-4 sm:left-10 opacity-[0.09] text-[#ffd777] animate-islamic-float">
        <KaabaSilhouette size={48} />
      </div>

      {/* Bottom-Right: Faint Mosque Silhouette */}
      <div className="absolute bottom-6 right-5 sm:bottom-10 sm:right-10 opacity-[0.09] text-[#e9d5ff]">
        <MosqueLineSilhouette width={86} height={68} />
      </div>

      {/* Bottom-Left: Ornamental Corner Lines */}
      <div className="absolute bottom-5 left-4 sm:bottom-8 sm:left-8 opacity-[0.09] text-[#ffd777]">
        <ArabesqueCorner size={54} flipY={true} />
      </div>

      {/* Right Margin: Subtle Jali Lattice Patch */}
      <div className="absolute top-1/3 right-4 sm:right-8 opacity-[0.06] text-[#ffd777]">
        <JaliLatticePatch width={115} height={115} patternId="jali-admission" />
      </div>

      {/* Delicate Sparkles */}
      <div className="absolute top-1/4 right-20 opacity-[0.12] text-[#ffd777] animate-islamic-shimmer">
        <SparkleStar size={20} />
      </div>

      <FloatingGoldParticles count={4} />
    </div>
  );
}

/* 9. FOOTER SECTION (Light Purple Full Width Background #ede4ff) */
export function FooterDeco() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0" aria-hidden="true">
      {/* Top-Left: Hanging Lantern swaying gently from top border */}
      <div className="absolute -top-2 left-8 sm:left-16 opacity-[0.08] text-[#6d3fd9] animate-islamic-lantern">
        <HangingLantern width={32} height={100} color="#6d3fd9" glowColor="#e0a93b" />
      </div>

      {/* Top-Right: Crescent Moon & Star in Soft Purple */}
      <div className="absolute top-3 right-4 sm:top-5 sm:right-12 opacity-[0.09] text-[#6d3fd9] animate-islamic-drift">
        <CrescentMoonStar size={30} />
      </div>

      {/* Bottom-Right: 8-Point Star in Warm Soft Gold */}
      <div className="absolute bottom-2 right-4 sm:bottom-4 sm:right-12 opacity-[0.09] text-[#d49b29]">
        <EightPointStar size={34} />
      </div>

      {/* Bottom-Left: Faint Mosque Silhouette in Soft Purple */}
      <div className="absolute bottom-2 left-4 sm:bottom-3 sm:left-12 opacity-[0.07] text-[#6d3fd9]">
        <MosqueLineSilhouette width={70} height={54} />
      </div>

      {/* Center Background Watermark: Delicate Jali Lattice */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] text-[#6d3fd9]">
        <JaliLatticePatch width={130} height={130} patternId="jali-footer" />
      </div>

      <FloatingGoldParticles count={3} />
    </div>
  );
}
