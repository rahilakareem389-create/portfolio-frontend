import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

// Official Social Brand SVGs with Vibrant Colors
const WhatsAppIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.62 8.56 7.62 9.76C7.62 10.96 8.5 12.12 8.62 12.28C8.75 12.45 10.35 14.92 12.8 15.97C13.38 16.22 13.84 16.38 14.19 16.49C14.78 16.67 15.31 16.65 15.73 16.59C16.2 16.51 17.17 16 17.37 15.42C17.57 14.85 17.57 14.36 17.51 14.26C17.45 14.16 17.3 14.1 17.07 13.99C16.85 13.87 15.76 13.34 15.56 13.27C15.36 13.19 15.21 13.15 15.07 13.37C14.92 13.59 14.5 14.1 14.38 14.24C14.26 14.38 14.13 14.4 13.91 14.29C13.69 14.18 12.98 13.95 12.14 13.2C11.49 12.61 11.05 11.89 10.93 11.67C10.8 11.45 10.92 11.34 11.03 11.23C11.13 11.13 11.26 10.96 11.37 10.83C11.49 10.7 11.53 10.6 11.61 10.45C11.68 10.29 11.64 10.16 11.58 10.05C11.53 9.94 11.08 8.84 10.9 8.38C10.72 7.93 10.54 7.99 10.4 7.98C10.27 7.98 10.12 7.98 9.97 7.98C9.82 7.98 9.57 8.04 9.36 8.27" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [secretClickCount, setSecretClickCount] = useState(0);

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretAdminTrigger = () => {
    const next = secretClickCount + 1;
    if (next >= 3) {
      setSecretClickCount(0);
      handleNav('admin');
    } else {
      setSecretClickCount(next);
      setTimeout(() => setSecretClickCount(0), 1200);
    }
  };

  // Structured Social Links with High Contrast Brand Colors & Clear Visibility
  const socialLinks = [
    {
      name: 'WhatsApp',
      url: personalInfo.whatsappUrl,
      icon: <WhatsAppIcon />,
      badgeStyle: 'bg-emerald-50 hover:bg-[#25D366] text-[#25D366] hover:text-white border-emerald-300 dark:bg-emerald-950/50 dark:border-emerald-700',
      label: 'Direct WhatsApp Chat'
    },
    {
      name: 'LinkedIn',
      url: personalInfo.linkedinUrl,
      icon: <LinkedInIcon />,
      badgeStyle: 'bg-blue-50 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border-blue-300 dark:bg-blue-950/50 dark:border-blue-700',
      label: 'Professional LinkedIn Profile'
    },
    {
      name: 'Facebook',
      url: personalInfo.facebookUrl,
      icon: <FacebookIcon />,
      badgeStyle: 'bg-indigo-50 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border-indigo-300 dark:bg-indigo-950/50 dark:border-indigo-700',
      label: 'Official Facebook Page'
    }
  ];

  return (
    <footer className="border-t border-neutral-200 dark:border-[#332219] pt-12 pb-8 bg-white dark:bg-[#120c09] text-neutral-900 dark:text-neutral-100 relative overflow-hidden transition-colors">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-[#D57C63]/10 to-transparent pointer-events-none blur-3xl" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">

        {/* 1. Pre-Footer Call-to-Action Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-[#1b130e] border border-neutral-200 dark:border-[#38261e] shadow-lg relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#D57C63]/15 text-[#c24a06] dark:text-[#ff9a7b] border border-[#D57C63]/30 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open for New Projects & Consultations</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-900 dark:text-white tracking-tight">
              Ready to elevate your online presence?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Let's craft a fast, responsive WordPress website or full-stack web application tailored precisely to your brand.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={personalInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#D57C63] hover:bg-[#c2674e] transition-all shadow-md hover:shadow-lg hover:shadow-[#D57C63]/25 flex items-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-neutral-900 dark:text-white bg-white dark:bg-[#261a14] hover:bg-neutral-100 dark:hover:bg-[#32221a] border border-neutral-300 dark:border-[#3d271e] hover:border-[#D57C63] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4 text-[#D57C63]" />
            </button>
          </div>
        </div>
        
        {/* 2. Main 4-Column Footer Grid - Proportional 12-Col Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-12 border-b border-neutral-200 dark:border-[#2d1e17]">
          
          {/* Section 1: Brand, Tagline & Social Links (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center cursor-pointer text-left focus:outline-none group"
              title="Unity Space by Rahila Kareem"
            >
              <img
                src="/logo-usk-dark.png"
                alt="Unity Space by Rahila Kareem"
                className="logo-theme-dark h-[52px] sm:h-[58px] w-auto max-w-[260px] object-contain transition-transform group-hover:scale-105"
              />
              <img
                src="/logo-usk-light.png"
                alt="Unity Space by Rahila Kareem"
                className="logo-theme-light h-[52px] sm:h-[58px] w-auto max-w-[260px] object-contain transition-transform group-hover:scale-105"
              />
            </button>

            <p className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-300 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            {/* Active Working Status Badge (Matching Orange Pill) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#D57C63]/15 text-[#c24a06] dark:text-[#ff9a7b] border border-[#D57C63]/30 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D57C63] animate-pulse" />
              <span>Available for Worldwide Remote Projects</span>
            </div>

            {/* Social Media Links & Platforms */}
            <div className="pt-2">
              <span className="block text-xs font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-2.5">
                Connect on Social Channels
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer ${s.badgeStyle}`}
                    title={s.label}
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Quick Links (2 Cols, Centered) */}
          <div className="lg:col-span-2 space-y-3 lg:mx-auto">
            <h4 className="font-heading font-extrabold text-base text-neutral-950 dark:text-white tracking-tight">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => handleNav('home')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  {t('nav.portfolio')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  {t('nav.pricing')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Section 3: Specializations (3 Cols, Centered) */}
          <div className="lg:col-span-3 space-y-3 lg:mx-auto">
            <h4 className="font-heading font-extrabold text-base text-neutral-950 dark:text-white tracking-tight">
              Specializations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => handleNav('wordpress')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  WordPress & WooCommerce
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('fullstack')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  MERN Web Applications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('seo')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  Technical & On-Page SEO
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  Speed Tuning & Core Vitals
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="text-neutral-700 dark:text-neutral-300 hover:text-[#D57C63] transition-colors cursor-pointer text-left">
                  UI/UX Responsive Redesign
                </button>
              </li>
            </ul>
          </div>

          {/* Section 4: Direct Contact Info (3 Cols, Right-aligned) */}
          <div className="lg:col-span-3 space-y-3 lg:ml-auto">
            <h4 className="font-heading font-extrabold text-base text-neutral-950 dark:text-white tracking-tight">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2.5 py-1 text-neutral-800 dark:text-neutral-200 hover:text-[#D57C63] transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 flex items-center justify-center shrink-0 group-hover:border-[#D57C63]">
                  <Mail className="w-4 h-4 text-[#D57C63]" />
                </div>
                <span className="truncate font-semibold">{personalInfo.email}</span>
              </a>

              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 py-1 text-neutral-800 dark:text-neutral-200 hover:text-[#D57C63] transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 flex items-center justify-center shrink-0 group-hover:border-[#D57C63] text-[#D57C63]">
                  <WhatsAppIcon />
                </div>
                <span className="font-semibold">WhatsApp: {personalInfo.phone}</span>
              </a>

              <div className="flex items-center gap-2.5 py-1 text-neutral-800 dark:text-neutral-200">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#D57C63]" />
                </div>
                <span className="font-semibold">{personalInfo.location}</span>
              </div>

              <div className="flex items-center gap-2.5 py-1 text-neutral-800 dark:text-neutral-200 text-xs">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#D57C63]" />
                </div>
                <span className="font-semibold">24/7 Available • All Days</span>
              </div>

            </div>
          </div>

        </div>

        {/* 3. Bottom Sleek Bar: Centered Copyright & Back-to-Top */}
        <div className="mt-8 mb-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-2xl sm:rounded-full bg-neutral-50 dark:bg-[#1a120d] border border-neutral-200/90 dark:border-[#332219] shadow-sm relative flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          <p
            onClick={handleSecretAdminTrigger}
            className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 text-center cursor-default select-none hover:text-neutral-900 dark:hover:text-white transition-colors"
            title="Unity Space by Rahila Kareem"
          >
            © {new Date().getFullYear()} Rahila Kareem. {t('footer.allRights')}
          </p>

          <button
            onClick={scrollToTop}
            className="sm:absolute sm:right-3 flex items-center gap-1.5 py-1 px-3 rounded-full bg-white dark:bg-[#251811] border border-neutral-200 dark:border-[#3d271e] text-neutral-800 dark:text-neutral-200 hover:border-[#D57C63] hover:text-[#D57C63] transition-all cursor-pointer shadow-xs text-xs font-bold"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;