import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Menu,
  X,
  BookOpen,
  Clock,
  Compass,
  HeartHandshake,
  HelpCircle,
  Flame,
  User,
  ArrowLeft,
  MessageCircle,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import AuthModal from '../AuthModal';
import ClientDashboardModal from '../ClientDashboardModal';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

export default function IslamicNavbar({
  activeSection,
  onNavigate,
  onBackToPortfolio,
  enrolledCount = 0
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [hasOffers, setHasOffers] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_islamic_announcements');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.length > 0;
      }
    } catch (_) {}
    return false;
  });

  useEffect(() => {
    let isMounted = true;
    async function checkOffers() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/announcements`);
        const data = await res.json();
        if (isMounted && data && Array.isArray(data.announcements)) {
          setHasOffers(data.announcements.length > 0);
        }
      } catch (_) {}
    }
    checkOffers();

    const handleSync = (e) => {
      if (!e.detail) return;
      if (e.detail.type === 'announcement_created') setHasOffers(true);
      if (e.detail.type === 'announcement_deleted' || e.detail.type === 'announcement_updated') {
        checkOffers();
      }
    };
    window.addEventListener('portfolio_data_sync', handleSync);
    return () => {
      isMounted = false;
      window.removeEventListener('portfolio_data_sync', handleSync);
    };
  }, []);

  const navLinks = [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    ...(hasOffers ? [{ id: 'offers', label: 'Offers', icon: Sparkles }] : []),
    { id: 'about', label: 'About', icon: User },
    { id: 'certificates', label: 'Certificates', icon: GraduationCap },
    { id: 'how', label: 'How We Learn', icon: Compass },
    { id: 'times', label: 'Class Timings', icon: Clock },
    { id: 'pricing', label: 'Plans & Pricing', icon: Flame },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];

  const handleLinkClick = (id) => {
    if (typeof onNavigate === 'function') {
      onNavigate(id);
    }
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handleEnrollClick = (e) => {
    e?.preventDefault();
    handleLinkClick('admission');
  };

  const TICKER_TEXT =
    '✦   Quran Tilawat   ✦   Nazra Quran   ✦   Tajweed Rules   ✦   Daily Masnoon Duas   ✦   Namaz Learning   ✦   Islamic Books   ✦   Islamic Etiquettes   ✦   1-on-1 Classes   ✦   3-Day Free Trial   ';

  return (
    <header className="islamic-header relative sticky top-0 z-[99980] w-full bg-[#faf8ff]/95 backdrop-blur-xl border-b border-[#6d28d9]/15 shadow-[0_4px_25px_rgba(109,63,217,0.06)] transition-colors">
      {/* Prominent Authentic Transparent Logo Fixed Across Both Bars (Seamless, no box, 2.5x Grand Scale) */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute left-2 sm:left-4 top-[52px] sm:top-[58px] -translate-y-1/2 z-30 cursor-pointer group select-none flex items-center justify-center p-0 m-0 bg-transparent border-0"
        title="Islamic Learn — Online Quran Education"
      >
        <img
          src="/islamic-learn-logo.png"
          alt="Islamic Learn Logo"
          className="w-[125px] h-[125px] sm:w-[150px] sm:h-[150px] lg:w-[175px] lg:h-[175px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_16px_rgba(109,63,217,0.20)]"
        />
      </div>

      {/* 1. Full-Width Moveable Top Ticker Bar */}
      <div className="w-full overflow-hidden bg-[#f3edff]/95 border-b border-[#6d28d9]/12 py-1.5 pl-[135px] sm:pl-[165px] lg:pl-[190px] pr-3 sm:pr-6 select-none flex items-center">
        <div className="hidden sm:flex items-center gap-1.5 pr-4 shrink-0 border-r border-[#6d28d9]/15">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e0a93b] animate-ping" />
          <span
            className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider whitespace-nowrap text-[#6d28d9]"
            style={{ color: '#6d28d9', WebkitTextFillColor: '#6d28d9' }}
          >
            ✦ Online Quran Academy
          </span>
        </div>

        <div className="w-full overflow-hidden pointer-events-none">
          <div
            className="animate-marquee whitespace-nowrap flex items-center gap-8 font-extrabold text-xs"
            style={{ color: '#581c87', WebkitTextFillColor: '#581c87' }}
          >
            <span>{TICKER_TEXT}</span>
            <span>{TICKER_TEXT}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Full-Width Navigation Bar */}
      <div className="w-full pl-[135px] sm:pl-[165px] lg:pl-[190px] pr-3 sm:pr-6 lg:pr-8 xl:pr-10">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 h-full">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`nav-link-btn h-9 px-3 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 tracking-tight ${
                    isActive
                      ? 'bg-[#6D28D9] text-white shadow-xs'
                      : 'text-[#2b1766] hover:text-[#6D28D9] hover:bg-[#6D28D9]/10'
                  }`}
                  style={!isActive ? { color: '#2b1766', WebkitTextFillColor: '#2b1766' } : {}}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-[#6D28D9]'}`} />
                  <span
                    className="whitespace-nowrap font-bold"
                    style={
                      !isActive
                        ? { color: '#2b1766', WebkitTextFillColor: '#2b1766' }
                        : { color: '#ffffff', WebkitTextFillColor: '#ffffff' }
                    }
                  >
                    {link.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0 ml-auto">
            {/* Sign In / Verified Workspace Button (matching Portfolio style) */}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  if (!user.emailVerified && !user.isAdmin) {
                    setAuthModalOpen(true);
                  } else {
                    setDashboardModalOpen(true);
                  }
                }}
                className="h-9 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#6D28D9] bg-[#6D28D9]/10 hover:bg-[#6D28D9]/20 border border-[#6D28D9]/25 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                title={user.emailVerified || user.isAdmin ? "Open Verified Client Workspace" : "Verify Email to Open Workspace"}
              >
                <span className={`w-2 h-2 rounded-full ${user.emailVerified || user.isAdmin ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{user.name?.split(' ')[0] || 'Client'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="h-9 px-3 sm:px-3.5 rounded-xl text-xs sm:text-sm font-bold text-[#6D28D9] hover:text-[#581c87] bg-[#6D28D9]/10 hover:bg-[#6D28D9]/15 border border-[#6D28D9]/25 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                title="Client Portal Sign In"
              >
                <span className="text-sm">🔑</span>
                <span>Sign In</span>
              </button>
            )}

            {/* WhatsApp Quick Link */}
            <a
              href={personalInfo.whatsappUrl || 'https://wa.link/p3yvx3'}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/35 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Chat on WhatsApp (+92 321 7812265)"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </a>

            {/* Primary Action Button: Enroll Now */}
            <button
              onClick={handleEnrollClick}
              className="h-9 py-2 px-4 rounded-xl text-xs sm:text-sm font-black text-[#1c1040] bg-gradient-to-r from-[#ffd777] via-[#f2c94c] to-[#e0a93b] hover:from-[#ffe28a] hover:to-[#f2c94c] shadow-[0_4px_16px_rgba(224,169,59,0.35)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-[#1c1040]" />
              <span>Enroll Now</span>
            </button>

            {/* Optional Back to Portfolio Link */}
            {typeof onBackToPortfolio === 'function' && (
              <button
                onClick={onBackToPortfolio}
                className="h-9 py-1.5 px-3 rounded-xl text-xs font-bold text-[#6D28D9] hover:text-[#581c87] bg-[#6D28D9]/10 hover:bg-[#6D28D9]/15 transition-all cursor-pointer flex items-center gap-1 border border-[#6D28D9]/20"
                title="Return to Portfolio"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Portfolio</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button & Mobile Auth */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 ml-auto">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  if (!user.emailVerified && !user.isAdmin) {
                    setAuthModalOpen(true);
                  } else {
                    setDashboardModalOpen(true);
                  }
                }}
                className="h-9 px-2.5 rounded-xl text-xs font-bold bg-[#6D28D9]/15 text-[#6D28D9] border border-[#6D28D9]/30 flex items-center gap-1.5 shadow-xs"
                title="Workspace"
              >
                <span className={`w-2 h-2 rounded-full ${user.emailVerified || user.isAdmin ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="max-w-[65px] truncate">{user.name?.split(' ')[0] || 'Client'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="h-9 px-2.5 rounded-xl text-xs font-bold bg-[#6D28D9]/10 text-[#6D28D9] border border-[#6D28D9]/25 flex items-center gap-1 shadow-xs"
                title="Sign In"
              >
                <span className="text-xs">🔑</span>
                <span>Sign In</span>
              </button>
            )}

            <button
              onClick={handleEnrollClick}
              className="h-9 px-3 rounded-xl text-xs font-black bg-gradient-to-r from-[#ffd777] to-[#e0a93b] text-[#1c1040] flex items-center gap-1 shadow-xs"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Enroll</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#6D28D9]/10 border border-[#6D28D9]/25 text-[#2b1766]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden py-4 border-t border-white/10 space-y-1 animate-in fade-in bg-[#301666] px-4">
            {/* Mobile Auth Strip */}
            <div className="pb-2 border-b border-white/10 mb-2">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!user.emailVerified && !user.isAdmin) {
                      setAuthModalOpen(true);
                    } else {
                      setDashboardModalOpen(true);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#6D28D9]/40 border border-[#ffd777]/30 text-white flex items-center justify-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full ${user.emailVerified || user.isAdmin ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span>Workspace ({user.name?.split(' ')[0] || 'Client'})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 border border-white/20 text-white hover:text-[#ffd777] flex items-center justify-center gap-1.5"
                >
                  <span className="text-sm">🔑</span>
                  <span>Sign In / Client Portal</span>
                </button>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const Icon = link.icon;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#6D28D9]/40 text-[#ffd777] border border-[#ffd777]/30'
                      : 'text-[#d9d0f5] hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#ffd777]' : 'text-[#cfc4f5]'}`} />
                    <span>{link.label}</span>
                  </div>
                </button>
              );
            })}

            <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
              <a
                href={personalInfo.whatsappUrl || 'https://wa.link/p3yvx3'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#25D366] text-white flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp (+92 321 7812265)</span>
              </a>

              {typeof onBackToPortfolio === 'function' && (
                <button
                  onClick={onBackToPortfolio}
                  className="w-full py-2 rounded-xl text-xs font-bold text-[#d9d0f5] bg-white/10 hover:bg-white/15 flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Developer Portfolio</span>
                </button>
              )}
            </div>
          </div>
        )}

      {/* Portalled Modals (Mounted to document.body so fixed inset-0 escapes header backdrop-blur stacking context) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            <AuthModal
              isOpen={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
              initialMode="signup"
              onAuthSuccess={() => {}}
            />
            <ClientDashboardModal
              isOpen={dashboardModalOpen}
              onClose={() => setDashboardModalOpen(false)}
              user={user}
              onLogout={async () => {
                await logout();
                setDashboardModalOpen(false);
              }}
            />
          </>,
          document.body
        )}
    </header>
  );
}
