import React, { useState } from 'react';
import { 
  Code2, 
  Globe, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap, 
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// 3 Core Skill Domains in exact requested order: Full Stack JS -> WordPress -> SEO
const skillDomains = [
  {
    id: 'fullstack',
    title: 'Full Stack JavaScript',
    roleHeading: 'Full Stack JavaScript Developer',
    experienceBadge: '1 Year Experience',
    shadowName: 'Cyber Neon Glow',
    shadowDescription: 'Type 1: Radiant ambient amber glow with layered perimeter halo',
    shadowClass: 'shadow-type-1',
    oneLineStatement: 'Building scalable, high-performance web applications with React.js, Node.js, Express.js, MongoDB and robust RESTful APIs.',
    description: 'Specialized in building full-stack web applications from responsive frontend interfaces to scalable backend microservices, MongoDB database schemas, authentication systems, and cloud API integrations.',
    icon: Code2,
    accentColor: '#D57C63',
    targetTab: 'fullstack',
    skills: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'MERN Stack',
      'Tailwind CSS'
    ],
    highlights: [
      'MERN Stack Architecture',
      'High-Performance REST APIs',
      'Component-Driven Modern React UI',
      'Clean Code & Scalable Databases'
    ]
  },
  {
    id: 'wordpress',
    title: 'WordPress Design',
    roleHeading: 'WordPress & WooCommerce Designer',
    experienceBadge: '2 Years Experience',
    shadowName: '3D Deep Elevation',
    shadowDescription: 'Type 2: Architectural isometric elevation with crisp obsidian bevel',
    shadowClass: 'shadow-type-2',
    oneLineStatement: 'Designing custom responsive WordPress websites, Elementor layouts, and high-converting WooCommerce online stores.',
    description: 'Expert in crafting user-friendly, responsive websites with Elementor, WPBakery, WooCommerce, custom theme styling, speed optimization, and seamless domain migration.',
    icon: Globe,
    accentColor: '#D57C63',
    targetTab: 'wordpress',
    skills: [
      'WordPress',
      'Elementor',
      'WooCommerce',
      'WPBakery',
      'Speed Tuning',
      'Custom Themes',
      'Migration'
    ],
    highlights: [
      'Pixel-Perfect Responsive Layouts',
      'WooCommerce Store Engineering',
      'Speed & Core Web Vitals Tuning',
      'Custom Elementor & WPBakery Templates'
    ]
  },
  {
    id: 'seo',
    title: 'SEO & Off-Page Backlinks',
    roleHeading: 'SEO Specialist & Off-Page Backlinks Expert',
    experienceBadge: '1 Year Experience',
    shadowName: 'Dual-Tone Sunset Aurora',
    shadowDescription: 'Type 3: Dual-spectrum coral & amber cosmic dispersion aura',
    shadowClass: 'shadow-type-3',
    oneLineStatement: 'Boosting organic Google rankings with high DA off-page backlinks, niche-relevant guest posting, and GBOB blogger outreach.',
    description: 'Helping businesses achieve sustainable search ranking growth through quality blogger outreach, off-page backlinks, guest post placements, technical SEO audits, and on-page optimization.',
    icon: TrendingUp,
    accentColor: '#D57C63',
    targetTab: 'seo',
    skills: [
      'Off-Page Backlinks',
      'Guest Posting',
      'GBOB Outreach',
      'High DA Links',
      'Contextual Links',
      'Technical SEO'
    ],
    highlights: [
      'High DA 40-80+ Off-Page Backlinks',
      'Contextual In-Content Link Placements',
      'GBOB Manual Blogger Outreach & Negotiations',
      'Technical SEO & Schema Markup Audits'
    ]
  }
];

export default function HomeSkillCards({ setActiveTab }) {
  // Track shutter states for each card: 'idle' | 'closing' | 'closed' | 'opening'
  const [shutterState, setShutterState] = useState({});
  // Track slow left-to-right orange page wipe on click
  const [pageWipeState, setPageWipeState] = useState({});
  // Track expanded details on card toggle
  const [expandedCards, setExpandedCards] = useState({});
  // Interactive Shadow Mode selector: 'unique' (3 distinct per card) or uniform 'shadow-1' | 'shadow-2' | 'shadow-3'
  const [shadowMode, setShadowMode] = useState('unique');

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subtle tactile shutter click sound via Web Audio API (gracefully fails if blocked)
  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore audio policy issues
    }
  };

  // Mouse click trigger: Slow Orange Page Wipe from Left to Right
  const triggerPageWipe = (domain, e) => {
    if (e) e.stopPropagation();
    const cardId = domain.id;
    if (pageWipeState[cardId]) return;

    playShutterSound();
    setPageWipeState(prev => ({ ...prev, [cardId]: true }));

    // Slow left-to-right wipe over 750ms
    setTimeout(() => {
      handleNavigate(domain.targetTab);
      setTimeout(() => {
        setPageWipeState(prev => ({ ...prev, [cardId]: false }));
      }, 400);
    }, 750);
  };

  // Mouse click trigger: Top goes Up -> Down, Bottom goes Down -> Up, locks, then re-opens
  const triggerShutter = (domain, e, actionType = 'toggle') => {
    if (e) {
      e.stopPropagation();
    }

    const cardId = domain.id;
    if (shutterState[cardId] && shutterState[cardId] !== 'idle') {
      return; // already animating
    }

    playShutterSound();

    // 1. Up slides DOWN, Down slides UP
    setShutterState(prev => ({ ...prev, [cardId]: 'closing' }));

    setTimeout(() => {
      // 2. Shutters meet at center, lock flash
      setShutterState(prev => ({ ...prev, [cardId]: 'closed' }));

      // Toggle expanded skills under shutter
      if (actionType === 'toggle') {
        setExpandedCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
      }

      setTimeout(() => {
        // 3. Up slides back UP, Down slides back DOWN
        setShutterState(prev => ({ ...prev, [cardId]: 'opening' }));

        setTimeout(() => {
          // 4. Reset to idle
          setShutterState(prev => ({ ...prev, [cardId]: 'idle' }));

          // If navigation requested
          if (actionType === 'navigate') {
            handleNavigate(domain.targetTab);
          }
        }, 360);
      }, 260);
    }, 300);
  };

  // Resolve shadow class for each card based on selector
  const getShadowClass = (domain) => {
    if (shadowMode === 'unique') {
      return domain.shadowClass;
    }
    return shadowMode;
  };

  return (
    <section id="explore-work" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10" aria-label="Core Skill Domains">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="reveal-up text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D57C63]/50 bg-[#D57C63]/10 text-[#D57C63] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Disciplines</span>
          </div>
          <h2 className="skill-section-title font-heading font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-tight mb-3.5">
            Specialized Skills &amp; Services
          </h2>
          <p className="skill-section-subtitle text-[15px] sm:text-[16.5px] leading-relaxed mb-6">
            Hover over cards to see the left-to-right orange sweep with high-contrast black text. Click any card to experience the slow left-to-right page reveal!
          </p>

          {/* Interactive Shadow Style Switcher Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[var(--panel)] border border-[var(--line)] shadow-inner">
            <span className="text-[11.5px] font-bold px-2.5 py-1 text-[var(--mute)] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>3 Shadows:</span>
            </span>
            <button
              type="button"
              onClick={() => setShadowMode('unique')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                shadowMode === 'unique'
                  ? 'bg-[#D57C63] text-white shadow-sm'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              ✦ 3 Distinct Styles
            </button>
            <button
              type="button"
              onClick={() => setShadowMode('shadow-type-1')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                shadowMode === 'shadow-type-1'
                  ? 'bg-[#D57C63] text-white shadow-sm'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              1. Cyber Neon Glow
            </button>
            <button
              type="button"
              onClick={() => setShadowMode('shadow-type-2')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                shadowMode === 'shadow-type-2'
                  ? 'bg-[#D57C63] text-white shadow-sm'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              2. 3D Elevation
            </button>
            <button
              type="button"
              onClick={() => setShadowMode('shadow-type-3')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                shadowMode === 'shadow-type-3'
                  ? 'bg-[#D57C63] text-white shadow-sm'
                  : 'text-[var(--mute)] hover:text-[var(--ink)]'
              }`}
            >
              3. Dual Aurora
            </button>
          </div>
        </div>

        {/* 3 Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillDomains.map((domain, index) => {
            const Icon = domain.icon;
            const currentShutter = shutterState[domain.id] || 'idle';
            const isClosingOrClosed = currentShutter === 'closing' || currentShutter === 'closed';
            const isShutterActive = currentShutter !== 'idle';
            const isWiping = !!pageWipeState[domain.id];
            const isExpanded = !!expandedCards[domain.id];
            const shadowClass = getShadowClass(domain);

            return (
              <div
                key={domain.id}
                id={`card-${domain.id}`}
                className={`reveal-up skill-card ${shadowClass} group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden scroll-mt-28 select-none`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                onClick={(e) => triggerPageWipe(domain, e)}
                title="Click for slow left-to-right orange page reveal"
              >
                {/* Top Glowing Gradient Accent */}
                <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-transparent via-[#D57C63] to-transparent opacity-80 group-hover:opacity-100 transition-opacity z-10" />

                {/* 1. SLOW NEW ORANGE PAGE SWEEP: DOWN TO UP ON CLICK WITH PURE WHITE TEXT */}
                <div 
                  className={`pointer-events-none absolute inset-0 z-35 overflow-hidden rounded-3xl transition-opacity duration-200 ${
                    isWiping ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                >
                  <div 
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#c2410c]/85 via-[#ea580c]/85 to-[#f97316]/80 backdrop-blur-md flex flex-col justify-center items-center px-6 transition-all duration-750 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_-6px_35px_rgba(0,0,0,0.5)] border-t-3 border-white/80"
                    style={{
                      height: isWiping ? '100%' : '0%',
                    }}
                  >
                    <div className="flex items-center gap-2.5 text-white font-extrabold text-lg tracking-wide uppercase drop-shadow-md">
                      <Icon className="w-6 h-6 text-white animate-spin" />
                      <span>Opening {domain.title}...</span>
                    </div>
                    <p className="text-white/95 text-xs font-bold mt-1 drop-shadow-sm">
                      {domain.experienceBadge} • Full Discipline View
                    </p>
                    <div className="mt-2.5 text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full bg-white text-[#c2410c] shadow-md">
                      Loading Page &rarr;
                    </div>
                  </div>
                </div>

                {/* 2. DUAL SHUTTER SYSTEM: UP TO DOWN & DOWN TO UP */}
                <div 
                  className={`pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-3xl transition-opacity duration-200 ${
                    isShutterActive ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                >
                  {/* TOP SHUTTER (Moves Up to Down) */}
                  <div 
                    className={`skill-shutter-panel skill-shutter-top absolute top-0 left-0 right-0 h-[50.5%] flex flex-col justify-end items-center pb-3 border-b-2 border-[#D57C63] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isClosingOrClosed ? 'translate-y-0' : '-translate-y-full'
                    }`}
                  >
                    <div className="skill-shutter-slats absolute inset-0 opacity-40" />
                    <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full skill-shutter-badge text-[11px] font-bold tracking-widest uppercase">
                      <Zap className="w-3 h-3 text-[#D57C63] animate-pulse" />
                      <span>Shutter Closed ↓</span>
                    </div>
                  </div>

                  {/* BOTTOM SHUTTER (Moves Down to Up) */}
                  <div 
                    className={`skill-shutter-panel skill-shutter-bottom absolute bottom-0 left-0 right-0 h-[50.5%] flex flex-col justify-start items-center pt-3 border-t-2 border-[#D57C63] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isClosingOrClosed ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  >
                    <div className="skill-shutter-slats absolute inset-0 opacity-40" />
                    <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full skill-shutter-badge text-[11px] font-bold tracking-wide mt-1">
                      <Icon className="w-3.5 h-3.5 text-[#D57C63]" />
                      <span>{domain.title} ↑</span>
                    </div>
                  </div>

                  {/* Center Seam Laser Pulse Beam */}
                  <div 
                    className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[#fff2ec] shadow-[0_0_20px_4px_#D57C63] z-40 transition-all duration-200 ${
                      currentShutter === 'closed' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                    }`}
                  />
                </div>

                {/* Card Main Content */}
                <div className="relative z-10">
                  {/* Top Header: Icon + Shadow Style Pill + Experience Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="skill-card-icon-wrap w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.25} />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="skill-exp-pill px-3 py-1 rounded-full text-[11.5px] font-bold tracking-wide">
                        {domain.experienceBadge}
                      </span>
                      <span className="skill-shadow-tag text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {domain.shadowName}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="skill-card-title font-heading font-extrabold text-2xl mb-2.5 transition-colors">
                    {domain.title}
                  </h3>

                  {/* One-Line Statement */}
                  <p className="skill-card-statement text-[14.5px] leading-[1.65] mb-5">
                    {domain.oneLineStatement}
                  </p>

                  {/* Interactive Shutter Trigger Pill */}
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={(e) => triggerShutter(domain, e, 'toggle')}
                      className="skill-shutter-click-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 hover:scale-[1.03] cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                      <span>{isExpanded ? 'Close Shutter' : 'Dual Shutter (Up ↔ Down)'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                      )}
                    </button>
                  </div>

                  {/* Expandable Skills and Highlights revealed by Shutter */}
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'max-h-96 opacity-100 mb-5' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pt-3 border-t border-[var(--line)]">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#D57C63] mb-2 group-hover:text-white">
                        Key Technologies &amp; Deliverables:
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {domain.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="skill-tag-pill px-2.5 py-1 rounded-lg text-xs font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-1.5">
                        {domain.highlights.slice(0, 2).map((item, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2 text-xs skill-card-statement">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D57C63] group-hover:text-white shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons: See More & Open Page */}
                <div className="relative z-10 pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => triggerShutter(domain, e, 'toggle')}
                    className="skill-card-btn inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:translate-x-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less Info' : 'See Details'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => triggerPageWipe(domain, e)}
                    className="skill-open-btn text-xs font-bold transition-colors cursor-pointer hover:underline flex items-center gap-1"
                    title={`Open full ${domain.title} page`}
                  >
                    <span>Open Page</span>
                    <span>&rarr;</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Embedded CSS for 3 Shadows, Left-to-Right Orange Hover & Day/Night Visibility */}
      <style>{css}</style>
    </section>
  );
}

const css = `
/* ============================================================
   1. BASE CARD STYLES (MOON / NIGHT MODE)
   ============================================================ */
.skill-card {
  position: relative;
  background: #160f0c;
  border: 1px solid #38271e;
  border-bottom: 3.5px solid #D57C63;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

/* Down-to-Up Orange Sheet on Hover */
.skill-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, #c2410c 0%, #ea580c 50%, #f97316 100%);
  transform: scaleY(0);
  transform-origin: bottom center;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
}

.skill-card:hover::before {
  transform: scaleY(1);
}

.skill-card:hover {
  border-color: #f97316 !important;
  box-shadow: 0 24px 50px -8px rgba(234, 88, 12, 0.55), 0 0 35px rgba(249, 115, 22, 0.4) !important;
}

/* On Hover: Orange card sweep with crystal-clear high-contrast badges */
.skill-card:hover .skill-card-title {
  color: #ffffff !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}

.skill-card:hover .skill-card-statement {
  color: #ffffff !important;
  opacity: 0.98 !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.skill-card:hover .skill-card-icon-wrap {
  background: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.22) !important;
}

.skill-card:hover .skill-card-icon-wrap svg {
  color: #c2410c !important;
  stroke: #c2410c !important;
}

.skill-card:hover .skill-exp-pill {
  background: #ffffff !important;
  color: #9e3505 !important;
  border-color: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
  text-shadow: none !important;
}

.skill-card:hover .skill-shadow-tag {
  background: #ffffff !important;
  color: #b03e08 !important;
  border-color: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
  text-shadow: none !important;
}

.skill-card:hover .skill-shutter-click-btn {
  background: #ffffff !important;
  color: #140d07 !important;
  border-color: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
}

.skill-card:hover .skill-shutter-click-btn * {
  color: #140d07 !important;
  text-shadow: none !important;
}

.skill-card:hover .skill-shutter-click-btn svg {
  color: #c2410c !important;
  stroke: #c2410c !important;
}

.skill-card:hover .skill-card-btn,
.skill-card:hover .skill-open-btn {
  color: #ffffff !important;
  font-weight: 800 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.skill-card:hover .skill-card-btn svg {
  color: #ffffff !important;
}

.skill-card:hover .skill-tag-pill {
  background: #ffffff !important;
  color: #140d07 !important;
  border-color: rgba(255, 255, 255, 0.9) !important;
}

.skill-section-title {
  color: #ffffff;
}

.skill-section-subtitle {
  color: #d6c7bc;
}

.skill-card-title {
  color: #ffffff;
}

.skill-card-statement {
  color: #e2d4c9;
}

.skill-card-icon-wrap {
  background: rgba(213, 124, 99, 0.14);
  border: 1px solid rgba(213, 124, 99, 0.4);
}

.skill-exp-pill {
  background: #251813;
  color: #f6a592;
  border: 1px solid rgba(213, 124, 99, 0.35);
}

.skill-shadow-tag {
  background: rgba(213, 124, 99, 0.12);
  color: #ff9e85;
  border: 1px solid rgba(213, 124, 99, 0.25);
}

.skill-shutter-click-btn {
  background: #201511;
  color: #f7ede3;
  border: 1px solid #3d2a20;
}

.skill-shutter-click-btn:hover {
  background: #291b15;
  border-color: #D57C63;
  color: #ffffff;
}

.skill-tag-pill {
  background: #221611;
  color: #f7ede3;
  border: 1px solid #3c2a20;
}

.skill-card-btn {
  color: #ffffff;
}

.skill-card-btn:hover {
  color: #D57C63;
}

.skill-open-btn {
  color: #d6c7bc;
}

.skill-open-btn:hover {
  color: #D57C63;
}

/* ============================================================
   2. SHUTTER OVERLAY (MOON / NIGHT MODE)
   ============================================================ */
.skill-shutter-panel {
  background: linear-gradient(180deg, #18100c 0%, #110b08 100%);
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
}

.skill-shutter-slats {
  background: repeating-linear-gradient(
    0deg,
    rgba(213, 124, 99, 0.12) 0px,
    rgba(213, 124, 99, 0.12) 2px,
    transparent 2px,
    transparent 10px
  );
}

.skill-shutter-badge {
  background: rgba(26, 17, 13, 0.95);
  color: #ffffff;
  border: 1px solid rgba(213, 124, 99, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

/* ============================================================
   3. DAY MODE HIGH-CONTRAST STYLES (:root[data-theme="light"])
   ============================================================ */
:root[data-theme="light"] .skill-section-title {
  color: #140d07 !important;
}

:root[data-theme="light"] .skill-section-subtitle {
  color: #38271e !important;
}

:root[data-theme="light"] .skill-card {
  background: #ffffff !important;
  border: 1px solid #e8dbcd !important;
  border-bottom: 3.5px solid #cf5208 !important;
}

:root[data-theme="light"] .skill-card::before {
  background: linear-gradient(0deg, #c2410c 0%, #ea580c 50%, #f97316 100%) !important;
}

:root[data-theme="light"] .skill-card:hover {
  border-color: #ea580c !important;
  box-shadow: 0 24px 50px -8px rgba(234, 88, 12, 0.45), 0 0 35px rgba(249, 115, 22, 0.35) !important;
}

:root[data-theme="light"] .skill-card:hover .skill-card-title {
  color: #ffffff !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}

:root[data-theme="light"] .skill-card:hover .skill-card-statement {
  color: #ffffff !important;
  opacity: 0.98 !important;
  font-weight: 500 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

:root[data-theme="light"] .skill-card:hover .skill-card-icon-wrap {
  background: #ffffff !important;
  border: 1.5px solid rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16) !important;
}

:root[data-theme="light"] .skill-card:hover .skill-card-icon-wrap svg {
  color: #c2410c !important;
  stroke: #c2410c !important;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08));
}

:root[data-theme="light"] .skill-card:hover .skill-exp-pill {
  background: #ffffff !important;
  color: #9e3505 !important;
  border: 1px solid rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  text-shadow: none !important;
}

:root[data-theme="light"] .skill-card:hover .skill-shadow-tag {
  background: #ffffff !important;
  color: #b03e08 !important;
  border: 1px solid rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  text-shadow: none !important;
}

:root[data-theme="light"] .skill-card:hover .skill-shutter-click-btn {
  background: #ffffff !important;
  color: #140d07 !important;
  border: 1px solid rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

:root[data-theme="light"] .skill-card:hover .skill-shutter-click-btn * {
  color: #140d07 !important;
  text-shadow: none !important;
}

:root[data-theme="light"] .skill-card:hover .skill-shutter-click-btn svg {
  color: #c2410c !important;
  stroke: #c2410c !important;
}

:root[data-theme="light"] .skill-card:hover .skill-card-btn,
:root[data-theme="light"] .skill-card:hover .skill-open-btn {
  color: #ffffff !important;
  font-weight: 800 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

:root[data-theme="light"] .skill-card:hover .skill-card-btn svg {
  color: #ffffff !important;
}

:root[data-theme="light"] .skill-card:hover .skill-tag-pill {
  background: #ffffff !important;
  color: #140d07 !important;
  border: 1px solid rgba(255, 255, 255, 0.85) !important;
}

:root[data-theme="light"] .skill-card-title {
  color: #140d07 !important;
}

:root[data-theme="light"] .skill-card-statement {
  color: #291d15 !important;
}

:root[data-theme="light"] .skill-card-icon-wrap {
  background: #fdf2e9 !important;
  border: 1px solid rgba(207, 82, 8, 0.35) !important;
}

:root[data-theme="light"] .skill-card-icon-wrap svg {
  color: #cf5208 !important;
}

:root[data-theme="light"] .skill-exp-pill {
  background: #fceddf !important;
  color: #9e3505 !important;
  border: 1px solid rgba(207, 82, 8, 0.35) !important;
}

:root[data-theme="light"] .skill-shadow-tag {
  background: #f6e8db !important;
  color: #b03e08 !important;
  border: 1px solid rgba(207, 82, 8, 0.25) !important;
}

:root[data-theme="light"] .skill-shutter-click-btn {
  background: #fcf6f0 !important;
  color: #140d07 !important;
  border: 1px solid #e5d4c3 !important;
}

:root[data-theme="light"] .skill-shutter-click-btn svg {
  color: #cf5208 !important;
}

:root[data-theme="light"] .skill-shutter-click-btn:hover {
  background: #f5ebe0 !important;
  border-color: #cf5208 !important;
  color: #cf5208 !important;
}

:root[data-theme="light"] .skill-tag-pill {
  background: #f6ede3 !important;
  color: #140d07 !important;
  border: 1px solid #e5d6c7 !important;
}

:root[data-theme="light"] .skill-card-btn {
  color: #140d07 !important;
}

:root[data-theme="light"] .skill-card-btn:hover {
  color: #cf5208 !important;
}

:root[data-theme="light"] .skill-open-btn {
  color: #4a372b !important;
}

:root[data-theme="light"] .skill-open-btn:hover {
  color: #cf5208 !important;
}

/* Day Mode Shutter Overlay */
:root[data-theme="light"] .skill-shutter-panel {
  background: linear-gradient(180deg, #fdf9f5 0%, #f4eae0 100%) !important;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.08) !important;
  border-color: #cf5208 !important;
}

:root[data-theme="light"] .skill-shutter-slats {
  background: repeating-linear-gradient(
    0deg,
    rgba(207, 82, 8, 0.09) 0px,
    rgba(207, 82, 8, 0.09) 2px,
    transparent 2px,
    transparent 10px
  ) !important;
}

:root[data-theme="light"] .skill-shutter-badge {
  background: #ffffff !important;
  color: #140d07 !important;
  border: 1px solid rgba(207, 82, 8, 0.4) !important;
  box-shadow: 0 4px 12px rgba(207, 82, 8, 0.15) !important;
}
`;
