import React from 'react';
import { 
  Code2, 
  Globe, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ExternalLink,
  X,
  Target,
  ShieldCheck,
  Palette,
  Sliders,
  Cpu,
  Server
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

// 3 Core Skill Domains in exact requested order: Full Stack JS -> WordPress -> SEO
const skillDomains = [
  {
    id: 'fullstack',
    title: 'Full Stack JavaScript',
    roleHeading: 'Full Stack JavaScript Developer',
    experienceBadge: '1 Year Experience',
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
      'Responsive UI',
      'Frontend Dev',
      'Backend Dev'
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
      'Plugin Setup',
      'Website Migration'
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
    oneLineStatement: 'Boosting organic Google rankings with high DA off-page backlinks, niche-relevant guest posting, and GBOB blogger outreach.',
    description: 'Helping businesses achieve sustainable search ranking growth through quality blogger outreach, off-page backlinks, guest post placements, technical SEO audits, and on-page optimization.',
    icon: TrendingUp,
    accentColor: '#D57C63',
    targetTab: 'seo',
    skills: [
      'Off-Page Backlinks',
      'Guest Posting',
      'GBOB Outreach',
      'High DA Backlinks',
      'Contextual Links',
      'Blogger Outreach',
      'Technical SEO',
      'On-Page SEO'
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
  const handleNavigate = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="explore-work" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10" aria-label="Core Skill Domains">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="reveal-up text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D57C63]/50 bg-[#D57C63]/10 text-[#D57C63] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Disciplines</span>
          </div>
          <h2 className="font-heading font-extrabold text-[28px] sm:text-[36px] lg:text-[42px] leading-tight text-[var(--ink)] mb-3.5">
            Specialized Skills &amp; Services
          </h2>
          <p className="text-[15px] sm:text-[16.5px] leading-relaxed text-[var(--mute)]">
            Explore my core domains in Full Stack JavaScript development, WordPress website design, and high-impact SEO guest posting outreach.
          </p>
        </div>

        {/* 3 Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillDomains.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                id={`card-${domain.id}`}
                className="reveal-up skill-card group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-2.5 cursor-pointer scroll-mt-28"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                onClick={() => handleNavigate(domain.targetTab)}
              >
                {/* Top Glowing Gradient Accent */}
                <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-transparent via-[#D57C63] to-transparent opacity-75 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Header: Icon + Experience Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="skill-card-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
                      <Icon className="w-7 h-7 text-[#D57C63]" />
                    </div>
                    <span className="skill-exp-pill px-3 py-1 rounded-full text-[11.5px] font-bold tracking-wide">
                      {domain.experienceBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-extrabold text-2xl text-[var(--ink)] mb-2.5 group-hover:text-[#D57C63] transition-colors">
                    {domain.title}
                  </h3>

                  {/* One-Line Statement */}
                  <p className="skill-card-statement text-[14.5px] leading-[1.65] mb-6">
                    {domain.oneLineStatement}
                  </p>
                </div>

                {/* Bottom Action Button: See More */}
                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
                  <span className="skill-card-btn inline-flex items-center gap-2 text-sm font-bold text-[#D57C63] transition-all group-hover:translate-x-1">
                    <span>See More</span>
                    <ArrowRight className="w-4 h-4 text-[#D57C63] transition-transform group-hover:translate-x-1" />
                  </span>

                  <span className="text-xs font-semibold text-[var(--mute)] group-hover:text-[#D57C63] transition-colors">
                    Open Page &rarr;
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Embedded CSS for Day and Night Mode High Contrast */}
      <style>{css}</style>
    </section>
  );
}

const css = `
.skill-card {
  background: #160f0c;
  border: 1px solid #33271f;
  border-bottom: 3.5px solid #D57C63;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.skill-card:hover {
  border-color: #D57C63;
  box-shadow: 0 16px 40px rgba(213, 124, 99, 0.22);
}

.skill-card-icon-wrap {
  background: rgba(213, 124, 99, 0.12);
  border: 1px solid rgba(213, 124, 99, 0.35);
}

.skill-exp-pill {
  background: #221612;
  color: #e29f8c;
  border: 1px solid rgba(213, 124, 99, 0.3);
}

.skill-card-statement {
  color: #d6c7bc;
}

.skill-tag-pill {
  background: #201511;
  color: #f7ede3;
  border: 1px solid #33271f;
}

.skill-card-btn {
  color: #f7ede3;
}

.skill-card-btn:hover {
  color: #D57C63;
}

.skill-modal-content {
  background: #140e0b;
}

/* Day Mode High Contrast Styles */
:root[data-theme="light"] .skill-card {
  background: #ffffff !important;
  border: 1px solid #e5d6c5 !important;
  border-bottom: 3.5px solid #cf5208 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05) !important;
}

:root[data-theme="light"] .skill-card:hover {
  border-color: #cf5208 !important;
  box-shadow: 0 14px 35px rgba(207, 82, 8, 0.15) !important;
}

:root[data-theme="light"] .skill-card-icon-wrap {
  background: #fef4ec !important;
  border: 1px solid rgba(207, 82, 8, 0.3) !important;
}

:root[data-theme="light"] .skill-exp-pill {
  background: #f7ebe0 !important;
  color: #b84a22 !important;
  border-color: rgba(207, 82, 8, 0.25) !important;
}

:root[data-theme="light"] .skill-card-statement {
  color: #3a2c22 !important;
}

:root[data-theme="light"] .skill-tag-pill {
  background: #f7ebe0 !important;
  color: #140d07 !important;
  border: 1px solid #e5d6c5 !important;
}

:root[data-theme="light"] .skill-card-btn {
  color: #140d07 !important;
}

:root[data-theme="light"] .skill-card-btn:hover {
  color: #cf5208 !important;
}

:root[data-theme="light"] .skill-modal-content {
  background: #ffffff !important;
  border-color: #e5d6c5 !important;
}
`;
