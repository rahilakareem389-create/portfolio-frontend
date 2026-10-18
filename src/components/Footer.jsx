import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const Footer = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [secretClickCount, setSecretClickCount] = React.useState(0);

  const handleNav = (tab) => {
    setActiveTab(tab);
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

  return (
    <footer className="border-t border-[var(--line)] pt-12 pb-8 text-[var(--mute)] text-[14.5px] bg-[var(--bg)]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
          
          {/* Logo & Intro */}
          <div className="md:col-span-6">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center mb-4 cursor-pointer text-left focus:outline-none group"
              title="Unity Space by Rahila Kareem"
            >
              <img
                src="/logo-usk-dark.png"
                alt="Unity Space by Rahila Kareem"
                className="logo-theme-dark h-[50px] sm:h-[58px] w-auto max-w-[280px] object-contain transition-transform group-hover:scale-105"
              />
              <img
                src="/logo-usk-light.png"
                alt="Unity Space by Rahila Kareem"
                className="logo-theme-light h-[50px] sm:h-[58px] w-auto max-w-[280px] object-contain transition-transform group-hover:scale-105"
              />
            </button>
            <p className="text-[14.5px] text-[var(--mute)] max-w-md leading-[1.65]">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-[15px] text-white mb-2">
              {t('footer.quickLinks')}
            </h3>
            <div className="space-y-1 text-[14px]">
              <button onClick={() => handleNav('home')} className="block py-0.5 hover:text-[#ff7a1a] transition-colors cursor-pointer">
                {t('nav.home')}
              </button>
              <button onClick={() => handleNav('about')} className="block py-0.5 hover:text-[#ff7a1a] transition-colors cursor-pointer">
                {t('nav.about')}
              </button>
              <button onClick={() => handleNav('services')} className="block py-0.5 hover:text-[#ff7a1a] transition-colors cursor-pointer">
                {t('nav.services')}
              </button>
              <button onClick={() => handleNav('portfolio')} className="block py-0.5 hover:text-[#ff7a1a] transition-colors cursor-pointer">
                {t('nav.portfolio')}
              </button>
              <button onClick={() => handleNav('pricing')} className="block py-0.5 hover:text-[#ff7a1a] transition-colors cursor-pointer">
                {t('nav.pricing')}
              </button>
              <button onClick={() => handleNav('contact')} className="block py-0.5 hover:text-[#ff7a1a] transition-colors cursor-pointer">
                {t('nav.contact')}
              </button>
            </div>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-3">
            <h3 className="font-heading font-bold text-[15px] text-white mb-2">
              {t('footer.contactInfo')}
            </h3>
            <div className="space-y-1 text-[14px]">
              <a href={`mailto:${personalInfo.email}`} className="block py-0.5 hover:text-[#ff7a1a] transition-colors break-all">
                {personalInfo.email}
              </a>
              <a href={personalInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block py-0.5 hover:text-[#ff7a1a] transition-colors">
                WhatsApp: {personalInfo.phone}
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block py-0.5 hover:text-[#ff7a1a] transition-colors">
                LinkedIn Profile
              </a>
              <a href={personalInfo.facebookUrl} target="_blank" rel="noopener noreferrer" className="block py-0.5 hover:text-[#ff7a1a] transition-colors">
                Facebook Page
              </a>
            </div>
          </div>

        </div>

        {/* SEO Keywords strip */}
        <p className="mt-4 text-[12.5px] border-t border-[#33271f] pt-4 text-[#8a7a70] leading-relaxed">
          WordPress designer · WordPress developer · WooCommerce · e-commerce website · SEO · responsive web design · MERN Stack · freelance web developer Pakistan
        </p>

        {/* Copyright (Public link removed - strictly confidential for admin) */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[13px] text-[#8a7a70] mt-3 pt-2 gap-2">
          <p 
            onClick={handleSecretAdminTrigger}
            className="cursor-default select-none"
          >
            © {new Date().getFullYear()} Rahila Kareem. {t('footer.allRights')}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;