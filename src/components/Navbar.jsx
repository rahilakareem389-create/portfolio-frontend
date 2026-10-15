import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Check, Globe, DollarSign, Terminal, TrendingUp, Sparkles, ArrowRight, Layers } from 'lucide-react';
import AuthModal from './AuthModal';
import ClientDashboardModal from './ClientDashboardModal';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

// Client Countries & Global Regions with Currencies:
const clientCountries = [
  { code: 'US', flag: '🇺🇸', name: 'United States', currency: 'USD ($)', region: 'North America' },
  { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates', currency: 'AED (د.إ)', region: 'Middle East' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom', currency: 'GBP (£)', region: 'Europe' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada', currency: 'CAD ($)', region: 'North America' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan', currency: 'PKR (₨)', region: 'South Asia' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', currency: 'SAR (﷼)', region: 'Middle East' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', currency: 'AUD ($)', region: 'Oceania' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany / Europe', currency: 'EUR (€)', region: 'Europe' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar', currency: 'QAR (﷼)', region: 'Middle East' },
];

const Navbar = ({ activeTab, setActiveTab }) => {
  const { t, currentLang, changeLanguage, selectedLangObj, languagesList } = useLanguage();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesModalOpen, setMobileServicesModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('site_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
    }
    return 'dark';
  });

  // Authenticated User & Client Dashboard state
  const [authUser, setAuthUser] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch (_) {
      return null;
    }
  });
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // Auth Modal state (single button opens modal with Sign up first)
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Selected Country & Language Dropdown State
  const [selectedCountry, setSelectedCountry] = useState(clientCountries[0]); // US default
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [servicesNavDropdown, setServicesNavDropdown] = useState(false);
  const [activeDropdownTab, setActiveDropdownTab] = useState('languages'); // 'languages' | 'countries'
  const dropdownRef = useRef(null);
  const servicesNavRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (servicesNavRef.current && !servicesNavRef.current.contains(event.target)) {
        setServicesNavDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'services', label: t('nav.services') },
    { id: 'portfolio', label: t('nav.portfolio') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLanguage = (langCode) => {
    changeLanguage(langCode);
    setLangDropdownOpen(false);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-14">
          <nav
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
            className="flex items-center justify-between h-[80px] sm:h-[88px] gap-2 lg:gap-4"
          >
            
            {/* Logo: Prominent 58px-64px Height */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center cursor-pointer text-left focus:outline-none py-1 group shrink-0"
              title="Unity Space by Rahila Kareem"
            >
              <img
                src="/logo-usk-dark.png"
                alt="Unity Space by Rahila Kareem"
                className="logo-theme-dark h-[48px] sm:h-[56px] md:h-[62px] w-auto max-w-[220px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-105"
              />
              <img
                src="/logo-usk-light.png"
                alt="Unity Space by Rahila Kareem"
                className="logo-theme-light h-[48px] sm:h-[56px] md:h-[62px] w-auto max-w-[220px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-105"
              />
            </button>

            {/* Desktop Nav Items with Schema.org SiteNavigationElement */}
            <ul className="hidden xl:flex items-center gap-5 2xl:gap-7 m-0 p-0 list-none">
              {navItems.map((item) => {
                const isActive = activeTab === item.id || (item.id === 'services' && (activeTab === 'wordpress' || activeTab === 'seo' || activeTab === 'fullstack'));

                if (item.id === 'services') {
                  return (
                    <li
                      key={item.id}
                      ref={servicesNavRef}
                      className="relative"
                      onMouseEnter={() => setServicesNavDropdown(true)}
                      onMouseLeave={() => setServicesNavDropdown(false)}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavClick('services')}
                        className={`text-[15px] font-semibold transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                          isActive
                            ? 'text-[var(--org)] font-bold border-b-2 border-[var(--org)]'
                            : 'text-[var(--mute)] hover:text-[var(--org)]'
                        }`}
                      >
                        <span itemProp="name">{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesNavDropdown ? 'rotate-180 text-[var(--org)]' : ''}`} />
                      </button>

                      {/* Dropdown Menu for 3 Core Service Categories */}
                      {servicesNavDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-[var(--panel)] border border-[var(--org)]/35 shadow-2xl p-2.5 z-50 animate-fade-in backdrop-blur-xl">
                          <div className="px-3 py-1.5 text-[10.5px] font-bold text-[var(--mute)] uppercase tracking-wider border-b border-[var(--line)] mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-[var(--org)]">
                              <Layers className="w-3.5 h-3.5" />
                              <span>Service Categories</span>
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--org)]/15 text-[var(--org)] font-semibold">
                              3 Domains
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              handleNavClick('wordpress');
                              setServicesNavDropdown(false);
                            }}
                            className="w-full p-2.5 rounded-xl text-left hover:bg-[var(--line)]/50 transition-colors flex items-start gap-2.5 cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#D57C63]/15 text-[#D57C63] border border-[#D57C63]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                              <Globe className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--org)] transition-colors flex items-center justify-between">
                                <span>WordPress Development</span>
                                <span className="text-[10px] text-[var(--org)] font-semibold">$40+</span>
                              </div>
                              <p className="text-[11px] text-[var(--mute)] truncate">Website Design, Elementor & WooCommerce</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleNavClick('seo');
                              setServicesNavDropdown(false);
                            }}
                            className="w-full p-2.5 rounded-xl text-left hover:bg-[var(--line)]/50 transition-colors flex items-start gap-2.5 cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#D57C63]/15 text-[#D57C63] border border-[#D57C63]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                              <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--org)] transition-colors flex items-center justify-between">
                                <span>SEO Specialist</span>
                                <span className="text-[10px] text-[var(--org)] font-semibold">$40+</span>
                              </div>
                              <p className="text-[11px] text-[var(--mute)] truncate">Keyword Research, Audits & Backlinks</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleNavClick('fullstack');
                              setServicesNavDropdown(false);
                            }}
                            className="w-full p-2.5 rounded-xl text-left hover:bg-[var(--line)]/50 transition-colors flex items-start gap-2.5 cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#D57C63]/15 text-[#D57C63] border border-[#D57C63]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                              <Terminal className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--org)] transition-colors flex items-center justify-between">
                                <span>Full Stack JavaScript</span>
                                <span className="text-[10px] text-[var(--org)] font-semibold">$180+</span>
                              </div>
                              <p className="text-[11px] text-[var(--mute)] truncate">React.js, Node.js & MERN Web Apps</p>
                            </div>
                          </button>

                          <div className="pt-2 mt-1 border-t border-[var(--line)]">
                            <button
                              type="button"
                              onClick={() => {
                                handleNavClick('services');
                                setServicesNavDropdown(false);
                              }}
                              className="w-full py-1.5 px-2.5 rounded-lg text-center text-xs font-bold text-[var(--org)] hover:bg-[var(--org)]/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Explore All Services &amp; Catalog</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      itemProp="url"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`text-[15px] font-semibold transition-colors cursor-pointer py-1 ${
                        isActive
                          ? 'text-[var(--org)] font-bold border-b-2 border-[var(--org)]'
                          : 'text-[var(--mute)] hover:text-[var(--org)]'
                      }`}
                    >
                      <span itemProp="name">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">

              {/* Single Sign In Button or Verified Workspace Pill */}
              {authUser ? (
                <button
                  onClick={() => setDashboardModalOpen(true)}
                  className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#D57C63]/25 border border-[#D57C63]/50 hover:bg-[#D57C63]/35 transition-all cursor-pointer shadow-sm"
                  title="Open Verified Client Workspace"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{authUser.name?.split(' ')[0] || 'Client'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--org)] transition-all cursor-pointer shadow-sm"
                  title="Client Portal Sign In"
                >
                  <span>🔑</span>
                  <span>{t('nav.signin')}</span>
                </button>
              )}

              {/* Human Spoken Languages Dropdown (English, Urdu, Arabic, Spanish, French, German, etc.) */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ink)] bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--org)] transition-all cursor-pointer shadow-sm"
                  title="Switch Website Language / زبان تبدیل کریں"
                >
                  <span className="text-sm">{selectedLangObj.flag}</span>
                  <span className="font-bold text-[12px] text-[var(--org)]">{selectedLangObj.native}</span>
                  <span className="hidden sm:inline text-[11px] text-[var(--mute)]">({selectedCountry.code})</span>
                  <ChevronDown className="w-3 h-3 text-[var(--mute)]" />
                </button>

                {/* Dropdown Menu of Human Spoken Languages & Countries */}
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-h-[420px] overflow-y-auto rounded-2xl bg-[var(--panel)] border border-[var(--org)]/35 shadow-2xl p-2.5 z-50 animate-fade-in backdrop-blur-xl">
                    
                    {/* Tabs: Languages vs Client Countries */}
                    <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[var(--bg)] border border-[var(--line)] mb-2.5">
                      <button
                        onClick={() => setActiveDropdownTab('languages')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          activeDropdownTab === 'languages'
                            ? 'bg-[var(--panel)] text-[var(--org)] shadow-sm'
                            : 'text-[var(--mute)] hover:text-[var(--ink)]'
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{t('nav.languages')}</span>
                      </button>
                      <button
                        onClick={() => setActiveDropdownTab('countries')}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          activeDropdownTab === 'countries'
                            ? 'bg-[var(--panel)] text-[var(--org)] shadow-sm'
                            : 'text-[var(--mute)] hover:text-[var(--ink)]'
                        }`}
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{t('nav.countries')}</span>
                      </button>
                    </div>

                    {/* Tab 1: Human Spoken Languages (English, Urdu, Arabic, etc.) */}
                    {activeDropdownTab === 'languages' && (
                      <div className="space-y-1">
                        <div className="px-2 py-1 text-[11px] font-bold text-[var(--mute)] uppercase tracking-wider flex items-center justify-between">
                          <span>{t('nav.selectLanguageTitle')}</span>
                          <span className="text-[10px] text-[var(--org)]">Live Translate</span>
                        </div>
                        {languagesList.map((lang) => {
                          const isSelected = currentLang === lang.code;
                          return (
                            <button
                              key={lang.code}
                              onClick={() => handleSelectLanguage(lang.code)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold'
                                  : 'text-[var(--ink)] hover:bg-[var(--line)]/50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl">{lang.flag}</span>
                                <div>
                                  <div className="font-semibold text-sm flex items-center gap-1.5">
                                    <span>{lang.native}</span>
                                    <span className="text-xs text-[var(--mute)] font-normal">({lang.name})</span>
                                  </div>
                                  <div className="text-[10px] text-[var(--mute)]">{lang.country}</div>
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[var(--org)] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Tab 2: Countries & Currencies */}
                    {activeDropdownTab === 'countries' && (
                      <div className="space-y-1">
                        <div className="px-2 py-1 text-[11px] font-bold text-[var(--mute)] uppercase tracking-wider">
                          Client Region & Currency:
                        </div>
                        {clientCountries.map((c, idx) => {
                          const isSelected = selectedCountry.code === c.code;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSelectCountry(c)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold'
                                  : 'text-[var(--ink)] hover:bg-[var(--line)]/50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-lg">{c.flag}</span>
                                <div>
                                  <div className="font-semibold">{c.name}</div>
                                  <div className="text-[10px] text-[var(--mute)]">{c.region} • {c.currency}</div>
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[var(--org)] shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* Day / Moon Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--org)] hover:border-[var(--org)] hover:shadow-[0_0_15px_rgba(255,122,26,0.35)] transition-all cursor-pointer flex items-center justify-center shrink-0"
                title={theme === 'dark' ? t('nav.themeDay') : t('nav.themeNight')}
                aria-label="Toggle Day and Night Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#ffb347] hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-[#cf5208] hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Let's talk button */}
              <a
                href={personalInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn px-4 sm:px-5 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-bold text-[var(--onorg)] rounded-[40px] cursor-pointer whitespace-nowrap shrink-0 shadow-md"
              >
                {t('nav.talk')}
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 xl:hidden rounded-lg bg-[var(--panel)] border border-[var(--line)] text-[var(--ink)] hover:text-[var(--org)] transition-colors shrink-0"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </nav>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[var(--bg)] border-b border-[var(--line)] px-6 py-4 animate-fade-in shadow-2xl">
            {/* Mobile Sign In or Workspace */}
            <div className="mb-3 pb-3 border-b border-[var(--line)]">
              {authUser ? (
                <button
                  onClick={() => { setDashboardModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-[#D57C63]/25 border border-[#D57C63]/50 text-white flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Workspace ({authUser.name?.split(' ')[0] || 'Client'})</span>
                </button>
              ) : (
                <button
                  onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[var(--panel)] border border-[var(--line)] text-[var(--ink)] flex items-center justify-center gap-1.5"
                >
                  <span>🔑</span>
                  <span>{t('nav.signin')}</span>
                </button>
              )}
            </div>

            {/* Mobile Language Switcher Strip */}
            <div className="mb-3 pb-3 border-b border-[var(--line)]">
              <div className="text-[11px] font-bold text-[var(--mute)] uppercase tracking-wider mb-2">
                🌐 {t('nav.languages')} (Language)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                      currentLang === lang.code
                        ? 'bg-[var(--org)] text-black font-bold shadow-sm'
                        : 'bg-[var(--panel)] text-[var(--ink)] border border-[var(--line)]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.native}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nav Items with Schema.org */}
            <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    itemProp="url"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-left text-[15px] font-medium transition-colors block ${
                      activeTab === item.id || (item.id === 'services' && (activeTab === 'wordpress' || activeTab === 'seo' || activeTab === 'fullstack'))
                        ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold'
                        : 'text-[var(--mute)] hover:text-[var(--org)]'
                    }`}
                  >
                    <span itemProp="name">{item.label}</span>
                  </a>

                  {/* If item is services, show 3 core services in mobile sidebar drawer */}
                  {item.id === 'services' && (
                    <div className="pl-3 pr-2 py-2 mt-1.5 mb-1.5 space-y-1.5 bg-[var(--panel)]/70 rounded-2xl border border-[var(--line)]">
                      <div className="text-[10px] font-bold text-[var(--mute)] uppercase tracking-wider px-2 py-0.5">
                        Core Service Domains:
                      </div>

                      <button
                        type="button"
                        onClick={() => handleNavClick('wordpress')}
                        className={`w-full py-2 px-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          activeTab === 'wordpress' ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--line)]/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-[#D57C63]" />
                          <span>WordPress Development</span>
                        </span>
                        <span className="text-[10px] text-[#D57C63] font-bold">$40+</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavClick('seo')}
                        className={`w-full py-2 px-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          activeTab === 'seo' ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--line)]/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-[#D57C63]" />
                          <span>SEO Services</span>
                        </span>
                        <span className="text-[10px] text-[#D57C63] font-bold">$40+</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavClick('fullstack')}
                        className={`w-full py-2 px-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          activeTab === 'fullstack' ? 'bg-[var(--org)]/15 text-[var(--org)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--line)]/50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-[#D57C63]" />
                          <span>Full Stack Development</span>
                        </span>
                        <span className="text-[10px] text-[#D57C63] font-bold">$180+</span>
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Auth Modal (Registration with Real OTP Verification & Login) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signup"
        onAuthSuccess={(u) => setAuthUser(u)}
      />

      {/* Client Protected Dashboard Modal */}
      <ClientDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        user={authUser}
        onLogout={async () => {
          try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';
            await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' });
          } catch (_) {}
          localStorage.removeItem('rahila_auth_token');
          localStorage.removeItem('rahila_auth_user');
          setAuthUser(null);
          setDashboardModalOpen(false);
        }}
      />
    </>
  );
};

export default Navbar;