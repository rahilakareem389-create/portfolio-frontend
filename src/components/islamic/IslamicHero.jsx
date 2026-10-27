import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  GraduationCap
} from 'lucide-react';
import Islamic3DBackground from './Islamic3DBackground';

/**
 * IslamicHero — Online Quran Education Hero Section
 * 
 * Features:
 * - FULL WIDTH layout matching website (max-w-[1600px] w-full px-4 sm:px-8 lg:px-12 xl:px-16)
 * - LEFT SIDE: Eyebrow, Main Headline, Description, Action Buttons, Authentic Hadith (RTL)
 * - RIGHT SIDE:
 *   - Images moved comfortably lower down ("IMAGE THORI NICHY KER DO")
 *   - Overlapping cards: Top Holy Quran with roses, Bottom Noorani Qaida
 *   - Golden "10+ Years of service" badge on bottom-right
 *   - Dotted grid on the right
 *   - CORNER RIBBON on Top-Left Corner of BOTH images matching user's exact uploaded design:
 *     Purple diagonal ribbon with white dashed stitch borders and yellow+white text!
 */
export default function IslamicHero({ onNavigate, setActiveTab, id = 'quran-education' }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Mouse move for gentle 3D parallax depth
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (x / rect.width) * 10,
      y: -(y / rect.height) * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Button Action: Enroll Now -> Navigates to existing admission/contact form
  const handleEnrollClick = (e) => {
    e?.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate('contact');
    } else if (typeof setActiveTab === 'function') {
      setActiveTab('islamic-learn');
      setTimeout(() => {
        const el = document.getElementById('admission-form') || document.getElementById('contact-faq');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('admission-form') || document.getElementById('contact-faq') || document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Button Action: Explore Courses -> Scrolls to Quran course section
  const handleExploreClick = (e) => {
    e?.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate('courses');
    } else if (typeof setActiveTab === 'function') {
      setActiveTab('islamic-learn');
      setTimeout(() => {
        const el = document.getElementById('islamic-courses');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('islamic-courses');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      aria-label="Online Quran Education Section"
      className="relative overflow-hidden w-full pt-4 sm:pt-6 lg:pt-8 pb-16 sm:py-20 lg:py-24 bg-[#FAF8FF] text-[#241B35] border-b border-[#E6DCF5] transition-colors"
    >
      {/* 3D Islamic Constellation Background */}
      <Islamic3DBackground />

      {/* Soft Ambient Radial Illumination (Soft Lavender & Pale Yellow) */}
      <div
        className="absolute top-10 right-1/4 translate-x-1/2 w-[650px] h-[500px] rounded-full pointer-events-none filter blur-[120px] opacity-40 -z-10"
        style={{ backgroundColor: '#EDE5FF' }}
      />
      <div
        className="absolute bottom-10 left-1/4 -translate-x-1/2 w-[600px] h-[450px] rounded-full pointer-events-none filter blur-[130px] opacity-35 -z-10"
        style={{ backgroundColor: '#FFF8D6' }}
      />

      {/* Tasteful Islamic Geometric Watermark Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] -z-10"
        style={{
          backgroundImage: `radial-gradient(#6D28D9 1px, transparent 1px), radial-gradient(#F2C94C 1px, #FAF8FF 1px)`,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* FULL WIDTH Container matching website layout */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ========================================================
              LEFT COLUMN (lg:col-span-7):
              ALL HERO TEXT ON THE LEFT SIDE:
              - Eyebrow: ONLINE QURAN EDUCATION
              - Headline: Learn the Holy Quran with Guidance, Love & Understanding
              - Description
              - Primary CTA: Enroll Now
              - Secondary CTA: Explore Courses
              - Authentic Hadith (below hero content)
             ======================================================== */}
          <div className="lg:col-span-7 text-left space-y-6">

            {/* 1. Small Eyebrow Text */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE5FF] border border-[#C4B5FD] text-[#4C1D95] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#F2C94C]" />
              <span>ONLINE QURAN EDUCATION</span>
            </div>

            {/* 2. Main Headline */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] text-[#241B35] tracking-tight leading-[1.16]">
              Learn the Holy Quran with{' '}
              <span
                className="font-black text-[#6D28D9]"
                style={{ color: '#6D28D9', WebkitTextFillColor: '#6D28D9' }}
              >
                Guidance, Love &amp; Understanding
              </span>
            </h2>

            {/* 3. Description */}
            <p className="text-base sm:text-lg text-[#55476B] leading-relaxed max-w-2xl font-normal">
              Begin your journey with Quran reading, Tajweed, daily Duas, Namaz and essential Islamic knowledge through regular online classes for learners of all ages.
            </p>

            {/* 4. Action Buttons: Enroll Now (Primary) & Explore Courses (Secondary) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              {/* PRIMARY BUTTON: Enroll Now */}
              <button
                type="button"
                onClick={handleEnrollClick}
                className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#4C1D95] hover:from-[#5B21B6] hover:to-[#3B1578] shadow-[0_6px_22px_rgba(109,40,217,0.32)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2.5 text-sm sm:text-base select-none"
              >
                <GraduationCap className="w-5 h-5 text-[#FFF4B8]" />
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              {/* SECONDARY BUTTON: Explore Courses */}
              <button
                type="button"
                onClick={handleExploreClick}
                className="px-7 py-3.5 rounded-xl font-bold text-[#4C1D95] bg-white hover:bg-[#EDE5FF] border border-[#6D28D9]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 text-sm sm:text-base shadow-xs select-none"
              >
                <BookOpen className="w-4 h-4 text-[#6D28D9]" />
                <span>Explore Courses</span>
              </button>
            </div>

            {/* 5. Authentic Hadith (displayed elegantly below main hero content) */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/95 border border-[#E6DCF5] shadow-[0_4px_25px_rgba(109,40,217,0.06)] relative overflow-hidden">
              {/* Decorative accent bar on left */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#6D28D9] via-[#8B5CF6] to-[#F2C94C]" />

              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D28D9] bg-[#EDE5FF] px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#F2C94C]" />
                  <span>Authentic Hadith</span>
                </span>
                <span className="text-xs font-semibold text-[#6B5E80]" dir="rtl">
                  الحديث النبوي الشريف
                </span>
              </div>

              {/* Arabic text with RTL and right alignment */}
              <div
                dir="rtl"
                lang="ar"
                className="text-right font-serif text-2xl sm:text-3xl text-[#241B35] font-bold leading-relaxed tracking-wide my-2 select-text"
                style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', 'Amiri', 'Noto Naskh Arabic', serif" }}
              >
                خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
              </div>

              {/* English Translation */}
              <p className="text-sm sm:text-[15px] text-[#55476B] font-medium italic mt-2 text-left">
                “The best among you are those who learn the Qur’an and teach it.”
              </p>

              {/* Accurate Reference */}
              <div className="text-xs font-bold text-[#6D28D9] mt-3 pt-2.5 border-t border-[#EDE5FF] flex items-center justify-between">
                <span className="text-[#6B5E80] font-medium text-[11px]">
                  Reference:
                </span>
                <span className="bg-[#FFF8D6] border border-[#F2C94C]/40 text-[#4C1D95] px-2.5 py-0.5 rounded-full font-bold text-xs shadow-2xs">
                  Sahih al-Bukhari 5027
                </span>
              </div>
            </div>

          </div>


          {/* ========================================================
              RIGHT COLUMN (lg:col-span-5):
              Images shifted comfortably lower down:
              1. Top Card: Holy Quran with Roses + Corner Ribbon
              2. Bottom Card: Noorani Qaida + Corner Ribbon
              3. Bottom-Right: Clean caramel-gold badge "10+ Years of service"
              4. Right: Clean vertical dotted matrix pattern
             ======================================================== */}
          <div
            className="lg:col-span-5 relative flex items-center justify-center pt-6 sm:pt-10 lg:pt-12"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-[#6D28D9]/20 via-[#F2C94C]/25 to-transparent blur-3xl pointer-events-none" />

            {/* Geometric Dot Grid Pattern on the Right (Restored as requested: "JO PHLY WALY DOTS HN WO AGAIN ADD KER DO") */}
            <div className="absolute -right-2 sm:-right-4 bottom-2 sm:bottom-4 z-0 opacity-40 pointer-events-none hidden sm:grid grid-cols-4 gap-3.5">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
              ))}
            </div>

            {/* Interactive 3D Canvas Box with generous height and lowered images */}
            <div
              className="relative w-full max-w-[480px] sm:max-w-[530px] h-[530px] sm:h-[590px] flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              
              {/* ====================================================
                  CARD 1 (UPER - Holy Quran with Roses)
                  Positioned lower down with Top-Left Diagonal Corner Ribbon
                 ==================================================== */}
              <div
                className="absolute top-4 sm:top-6 right-1 sm:right-3 w-[72%] sm:w-[75%] h-[310px] sm:h-[360px] rounded-[32px] overflow-hidden border-4 border-white shadow-[0_20px_45px_rgba(109,40,217,0.18)] bg-white animate-islamic-float-1 z-10 group"
                style={{ transform: 'translateZ(20px)' }}
              >
                <img
                  src="/quran-roses-hero.jpg"
                  alt="Holy Quran recitation with roses and golden prayer beads"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* EXACT CORNER RIBBON AS PER USER'S SCREENSHOT */}
                <div className="absolute top-0 left-0 w-36 h-36 overflow-hidden z-30 pointer-events-none">
                  <div className="absolute top-[28px] -left-[38px] w-[180px] -rotate-45 bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] py-1.5 px-1 text-center shadow-[0_4px_12px_rgba(109,40,217,0.4)] border-y border-dashed border-white/60 select-none">
                    <div className="text-[9.5px] font-extrabold text-[#FFF4B8] tracking-wider leading-none uppercase">
                      Holy Quran
                    </div>
                    <div className="text-[11.5px] sm:text-xs font-black text-white tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                      Quran &amp; Tajweed
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================
                  CARD 2 (NICHE - Noorani Qaida & Duas on Rehal)
                  Overlapping lower down with Top-Left Diagonal Corner Ribbon
                 ==================================================== */}
              <div
                className="absolute bottom-0 left-0 sm:left-2 w-[78%] sm:w-[80%] h-[260px] sm:h-[300px] rounded-[32px] overflow-hidden border-4 border-white shadow-[0_25px_50px_rgba(76,29,149,0.28)] bg-white z-20 animate-islamic-float-2 group"
                style={{ transform: 'translateZ(40px)' }}
              >
                <img
                  src="/noorani-qaida-hero.jpg"
                  alt="Noorani Qaida foundation with Namaz and Masnoon Duas guides"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* EXACT CORNER RIBBON AS PER USER'S SCREENSHOT */}
                <div className="absolute top-0 left-0 w-36 h-36 overflow-hidden z-30 pointer-events-none">
                  <div className="absolute top-[28px] -left-[38px] w-[180px] -rotate-45 bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] py-1.5 px-1 text-center shadow-[0_4px_12px_rgba(76,29,149,0.4)] border-y border-dashed border-white/60 select-none">
                    <div className="text-[9.5px] font-extrabold text-[#FFF4B8] tracking-wider leading-none uppercase">
                      Noorani Qaida
                    </div>
                    <div className="text-[11.5px] sm:text-xs font-black text-white tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                      Qaida &amp; Masnoon Duas
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================
                  GOLDEN 3D STAR BADGE: "10+ Years of service"
                  100% transparent container with 0 box-shadow and 0 background box
                 ==================================================== */}
              <div
                className="absolute bottom-2 sm:bottom-4 right-0 sm:-right-3 z-30 w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] animate-islamic-badge select-none pointer-events-none"
                style={{
                  transform: 'translateZ(65px)',
                  background: 'transparent',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                }}
                title="Over 10 Years of Dedicated Online Quran Education"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full pointer-events-auto transition-transform duration-300 hover:scale-105"
                  style={{
                    background: 'transparent',
                    backgroundColor: 'transparent',
                    filter: 'drop-shadow(0 14px 28px rgba(180,120,40,0.45))',
                  }}
                >
                  <defs>
                    {/* Rich 3D Golden Gradients */}
                    <linearGradient id="starGoldBody" x1="15%" y1="0%" x2="85%" y2="100%">
                      <stop offset="0%" stopColor="#F9C778" />
                      <stop offset="30%" stopColor="#DF9935" />
                      <stop offset="70%" stopColor="#B8731F" />
                      <stop offset="100%" stopColor="#8A4E0F" />
                    </linearGradient>

                    <linearGradient id="starGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF8D6" />
                      <stop offset="40%" stopColor="#F8D364" />
                      <stop offset="75%" stopColor="#D9972E" />
                      <stop offset="100%" stopColor="#7E470E" />
                    </linearGradient>

                    {/* Center Depth Shade to make White Text Pop with 100% Contrast */}
                    <radialGradient id="starCenterContrast" cx="50%" cy="56%" r="38%">
                      <stop offset="0%" stopColor="#5E2F05" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#965B1A" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 5-Pointed Star with rounded joins */}
                  <path
                    d="M 60 4 L 78.2 34.9 L 113.3 42.7 L 89.5 69.6 L 92.9 105.3 L 60 91 L 27.1 105.3 L 30.5 69.6 L 6.7 42.7 L 41.8 34.9 Z"
                    fill="url(#starGoldBody)"
                    stroke="url(#starGoldRim)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Center Contrast Shading */}
                  <path
                    d="M 60 4 L 78.2 34.9 L 113.3 42.7 L 89.5 69.6 L 92.9 105.3 L 60 91 L 27.1 105.3 L 30.5 69.6 L 6.7 42.7 L 41.8 34.9 Z"
                    fill="url(#starCenterContrast)"
                    stroke="none"
                  />

                  {/* Subtle inner circular stitch ring */}
                  <circle
                    cx="60"
                    cy="62"
                    r="27"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.65)"
                    strokeWidth="1.2"
                    strokeDasharray="2.5 2"
                  />

                  {/* High-Contrast Crisp White Text - 100% Visible & Legible */}
                  <g className="select-none font-sans" style={{ filter: 'drop-shadow(0 2px 4px rgba(35, 15, 0, 0.9))' }}>
                    {/* "10" */}
                    <text
                      x="51"
                      y="56"
                      textAnchor="middle"
                      fontSize="25"
                      fontWeight="900"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fill="#FFFFFF"
                    >
                      10
                    </text>
                    {/* "+" */}
                    <text
                      x="71"
                      y="53"
                      textAnchor="middle"
                      fontSize="22"
                      fontWeight="900"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fill="#FFF5B8"
                    >
                      +
                    </text>

                    {/* "YEARS OF" */}
                    <text
                      x="60"
                      y="69"
                      textAnchor="middle"
                      fontSize="8.5"
                      fontWeight="900"
                      letterSpacing="0.8"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fill="#FFFFFF"
                    >
                      YEARS OF
                    </text>

                    {/* "SERVICE" */}
                    <text
                      x="60"
                      y="80"
                      textAnchor="middle"
                      fontSize="8.5"
                      fontWeight="900"
                      letterSpacing="0.8"
                      fontFamily="system-ui, -apple-system, sans-serif"
                      fill="#FFFFFF"
                    >
                      SERVICE
                    </text>
                  </g>
                </svg>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
