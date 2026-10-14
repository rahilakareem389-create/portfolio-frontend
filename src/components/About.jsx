import React, { useState } from 'react';
import {
  Download,
  Eye,
  X,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import { personalInfo, skills, experience, certifications } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

// Compact Certificate Image Display / Slider
const CertificateSlider = ({ certificates, currentIndex, setCurrentIndex }) => {
  if (!certificates || certificates.length === 0) return null;

  const currentCert = certificates[currentIndex] || certificates[0];
  const hasMultiple = certificates.length > 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <div className="w-full max-w-[480px]">
      {/* Compact Certificate Image Frame */}
      <div className="relative rounded-xl overflow-hidden border border-[#33271f] bg-black/60 shadow-lg group">
        <img
          key={currentCert.id || currentIndex}
          src={currentCert.image}
          alt={currentCert.title || 'WordPress Certificate'}
          className="w-full h-auto object-contain block"
          loading="lazy"
        />

        {/* Previous Button Overlay - only if multiple */}
        {hasMultiple && (
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#D57C63] text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm"
            title="Previous certificate"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Next Button Overlay - only if multiple */}
        {hasMultiple && (
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#D57C63] text-white flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm"
            title="Next certificate"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Slide Counter Indicator - only if multiple */}
        {hasMultiple && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-medium text-white/80 backdrop-blur-sm border border-white/10">
            {currentIndex + 1} / {certificates.length}
          </div>
        )}
      </div>

      {/* Dots Pagination - only if multiple */}
      {hasMultiple && (
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {certificates.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-5 bg-[#D57C63]'
                  : 'w-1.5 bg-[#33271f] hover:bg-[#bcab9e]'
              }`}
              title={`Certificate ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const About = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('CMS');
  const [showCvModal, setShowCvModal] = useState(false);
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);

  const categories = ['CMS', 'MERN', 'Design', 'SEO', 'DevOps'];

  const filteredSkills = skills.filter(s => s.category === activeCategory);

  return (
    <section className="pt-24 pb-24 page-enter">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Page Top Nav / Close Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#33271f]">
          <div className="flex items-center gap-2 text-sm text-[#bcab9e]">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[#ff7a1a] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('about.backOverview')}</span>
            </button>
            <span>/</span>
            <span className="text-[#ff7a1a]">{t('about.title')}</span>
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="p-2 rounded-full bg-[#1b1411] border border-[#33271f] text-gray-300 hover:text-white hover:border-[#ff7a1a] transition-all flex items-center gap-1 text-xs cursor-pointer"
            title="Close page"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t('about.close')}</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="reveal-up mb-10">
          <h1 className="font-heading font-extrabold text-white text-[clamp(34px,5vw,60px)] leading-[1.08] mb-4">
            {t('about.title')}
          </h1>
          <p className="lead">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Top Profile Card */}
        <div className="reveal-up glass-card p-6 sm:p-8 rounded-[18px] mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Avatar in glowing circular ring */}
            <div className="lg:col-span-4 flex flex-col items-center sm:flex-row lg:flex-col gap-5 text-center sm:text-left lg:text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-3 border-[#ff7a1a] shadow-[0_0_35px_rgba(255,106,0,0.5)]">
                <img
                  src={profileImg}
                  alt="Rahila Kareem"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-white">{personalInfo.name}</h3>
                <p className="text-sm text-[#eaa487] font-semibold mt-1">{personalInfo.role}</p>
                <p className="text-xs text-[#bcab9e] mt-1">{personalInfo.location}</p>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start lg:justify-center">
                  {personalInfo.languages.map((lang, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full text-xs bg-[#241712] border border-[#33271f] text-gray-300">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Overview Text */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  WordPress & Full Stack JavaScript Developer
                </h3>
                <p className="text-[#bcab9e] text-base leading-[1.65] mb-4">
                  {personalInfo.bio}
                </p>
                <p className="text-[#bcab9e] text-base leading-[1.65] mb-6">
                  Experience in travel agency, flower bouquet, news, portfolio, and e-commerce websites with WooCommerce, custom themes, plugin customization, and hosting/DNS configuration.
                </p>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-[#33271f]">
                <a
                  href="/rahila-kareem-cv.pdf"
                  download="Rahila-Kareem-Resume.pdf"
                  className="glow-btn px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t('about.downloadCv')}</span>
                </a>

                <button
                  onClick={() => setShowCvModal(true)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#bcab9e] hover:text-white bg-[#1b1411] border border-[#33271f] hover:border-[#ff7a1a] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#ff7a1a]" />
                  <span>{t('about.previewCv')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#1b1411] border border-[#33271f] hover:border-[#ff7a1a] transition-all cursor-pointer"
                >
                  <span>{t('hero.btnHireMe')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Experience & Skills 2-Column Grid */}
        <div className="reveal-up grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          
          {/* Experience Section */}
          <div>
            <h2 className="font-heading font-bold text-[30px] text-white mb-6">
              {t('about.expTitle')}
            </h2>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="pl-5 rtl:pl-0 rtl:pr-5 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#ff7a1a] relative"
                >
                  <h3 className="font-heading font-bold text-lg text-white mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-xs text-[#eaa487] font-semibold mb-2">
                    {exp.company} • {exp.location}
                  </div>
                  <p className="text-[15.5px] text-[#bcab9e] leading-[1.65]">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Skills */}
          <div>
            <h2 className="font-heading font-bold text-[30px] text-white mb-6">
              {t('about.skillsTitle')}
            </h2>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#ff7a1a] text-[#1a0c02] font-bold shadow-[0_0_12px_rgba(255,122,26,0.5)]'
                      : 'bg-[#1b1411] text-[#bcab9e] border border-[#33271f] hover:border-[#ff7a1a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill Progress Bars */}
            <div className="space-y-4">
              {filteredSkills.map((s, idx) => (
                <div key={idx} className="glass-card p-4">
                  <div className="flex justify-between items-center mb-1.5 text-sm font-semibold text-white">
                    <span>{s.name}</span>
                    <span className="text-[#ff7a1a]">{s.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#33271f] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#ff7a1a] to-[#eaa487] transition-all duration-1000"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dedicated Certifications Section (Left Text/List, Right Certificate Preview) */}
        <div className="reveal-up glass-card p-6 sm:p-10 rounded-[18px] mb-16 border border-[#33271f]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Container: Title & Certificates List with Down-to-Up Animations */}
            <div className="lg:col-span-7">
              <h2 className="font-heading font-bold text-2xl sm:text-[32px] text-white mb-2 animate-text-up">
                {t('about.certTitle')}
              </h2>
              <p className="text-[#bcab9e] text-sm sm:text-base mb-6 animate-text-up-delay-1">
                Verified training and credentials in web design, freelancing, and development:
              </p>

              <ul className="pl-5 rtl:pl-0 rtl:pr-5 space-y-3 list-disc text-[#bcab9e] text-[15px] sm:text-[15.5px]">
                {certifications.map((cert, idx) => {
                  const imageCerts = certifications.filter((c) => !c.isComingSoon);
                  const activeImgIdx = imageCerts.findIndex((c) => c.id === cert.id);
                  const isCurrent = activeImgIdx !== -1 && activeImgIdx === selectedCertIndex;

                  return (
                    <li
                      key={idx}
                      className="leading-relaxed animate-text-up"
                      style={{ animationDelay: `${0.12 + idx * 0.07}s` }}
                    >
                      {cert.isComingSoon ? (
                        <span className="inline-flex flex-wrap items-center">
                          <strong className="text-white">{cert.title}</strong>
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#ff7a1a]/20 text-[#ff7a1a] border border-[#ff7a1a]/40">
                            Coming Soon
                          </span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (activeImgIdx !== -1) setSelectedCertIndex(activeImgIdx);
                          }}
                          className={`text-left inline-flex flex-wrap items-center gap-1 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                            isCurrent ? 'text-[#ff7a1a]' : 'hover:text-[#ff7a1a]'
                          }`}
                        >
                          <strong className={isCurrent ? 'text-[#ff7a1a]' : 'text-white'}>
                            {cert.title}
                          </strong>
                          {cert.issuer && <span>, {cert.issuer}</span>}
                          {cert.year && <span>, {cert.year}</span>}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Live Preview Indicator with Down-to-Up Animation */}
              {certifications.filter((c) => !c.isComingSoon)[selectedCertIndex] && (
                <div
                  key={certifications.filter((c) => !c.isComingSoon)[selectedCertIndex].id}
                  className="mt-6 pt-4 border-t border-[#33271f] flex items-center gap-2 text-xs text-[#eaa487] animate-text-up"
                >
                  <span className="w-2 h-2 rounded-full bg-[#ff7a1a] animate-pulse" />
                  <span>
                    Viewing: <strong className="text-white">{certifications.filter((c) => !c.isComingSoon)[selectedCertIndex].title}</strong> ({certifications.filter((c) => !c.isComingSoon)[selectedCertIndex].issuer})
                  </span>
                </div>
              )}
            </div>

            {/* Right Container: Certificate Image Slider */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <CertificateSlider
                certificates={certifications.filter((c) => !c.isComingSoon)}
                currentIndex={selectedCertIndex}
                setCurrentIndex={setSelectedCertIndex}
              />
            </div>

          </div>
        </div>

        {/* Modal for CV Interactive Preview */}
        {showCvModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div className="glass-card modal-enter w-full max-w-4xl h-[90vh] p-6 rounded-[18px] border border-[#ff7a1a] relative shadow-2xl bg-[#1b1411] flex flex-col">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#33271f]">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Rahila Kareem - Official Resume / CV
                  </h3>
                  <p className="text-xs text-[#bcab9e]">WordPress & Full Stack JavaScript Developer</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/rahila-kareem-cv.pdf"
                    download="Rahila-Kareem-Resume.pdf"
                    className="glow-btn px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>

                  <button
                    onClick={() => setShowCvModal(false)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="flex-1 w-full mt-4 overflow-hidden rounded-xl border border-[#33271f] bg-black">
                <iframe
                  src="/rahila-kareem-cv.pdf"
                  title="Rahila Kareem Resume"
                  className="w-full h-full border-0"
                />
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default About;