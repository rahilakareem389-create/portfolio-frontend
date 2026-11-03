import React from 'react';
import { Code2, Globe, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    oneLineStatement: 'Boosting organic Google rankings with high DA off-page backlinks, niche-relevant guest posting, and manual blogger outreach.',
    description: 'Helping businesses achieve sustainable search ranking growth through quality blogger outreach, off-page backlinks, guest post placements, technical SEO audits, and on-page optimization.',
    icon: TrendingUp,
    accentColor: '#D57C63',
    targetTab: 'seo',
    skills: [
      'Off-Page Backlinks',
      'Guest Posting',
      'Blogger Outreach',
      'High DA Links',
      'Contextual Links',
      'Technical SEO'
    ],
    highlights: [
      'High DA 40-80+ Off-Page Backlinks',
      'Contextual In-Content Link Placements',
      'Manual Blogger Outreach & Negotiation',
      'Technical SEO & Schema Markup Audits'
    ]
  }
];

export default function HomeSkillCards({ setActiveTab }) {
  return (
    <section id="explore-work" className="scroll-mt-24 py-20 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10" aria-labelledby="skills-heading">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="reveal-up text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="section-eyebrow">What I do</p>
          <h2 id="skills-heading" className="section-title">Specialized Skills &amp; Services</h2>
          <p className="section-lead">
            Three focused disciplines that work together: a site that looks right, runs fast, and gets found on Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {skillDomains.map((domain) => {
            const Icon = domain.icon;
            return (
              <article
                key={domain.id}
                id={`card-${domain.id}`}
                className="reveal-up pro-card group flex flex-col p-6 sm:p-7 scroll-mt-28"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="pro-icon">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <span className="pro-pill">{domain.experienceBadge}</span>
                </div>

                <h3 className="font-heading font-bold text-[21px] leading-snug text-[var(--ink)] mb-2">
                  {domain.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--mute)] mb-5">
                  {domain.oneLineStatement}
                </p>

                <ul className="space-y-2 mb-5">
                  {domain.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-[var(--ink)]/90">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-[var(--org)] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {domain.skills.map((skill) => (
                    <span key={skill} className="pro-tag">{skill}</span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab(domain.targetTab)}
                  className="mt-auto inline-flex items-center gap-2 text-[14.5px] font-semibold text-[var(--org)] hover:gap-3 transition-all cursor-pointer self-start"
                >
                  <span>Explore {domain.title}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
