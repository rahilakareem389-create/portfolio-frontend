import React from 'react';
import { ArrowUp, BookOpen, Clock, Heart, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';
import IslamicLogo from './IslamicLogo';

export default function IslamicFooter({ onNavigate, onBackToPortfolio }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241B35] text-white pt-14 pb-8 border-t border-[#4C1D95] relative overflow-hidden">
      {/* Background Subtle Star Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#6D28D9]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Hadith Banner */}
        <div className="p-6 rounded-3xl bg-[#4C1D95]/40 border border-[#6D28D9]/30 text-center mb-12 space-y-2">
          <p className="font-serif text-xl sm:text-2xl text-[#F2C94C]" dir="rtl">
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </p>
          <p className="text-xs sm:text-sm text-purple-200">
            "The best among you are those who learn the Quran and teach it to others." — Sahih al-Bukhari (5027)
          </p>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-purple-900/60">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-md border border-purple-200">
              <IslamicLogo />
            </div>
            <p className="text-xs text-purple-300 leading-relaxed">
              Global online Quran academy dedicated to authentic recitation, Tajweed, Salah, Daily Duas, and Tafheem-ul-Quran for learners worldwide.
            </p>
          </div>

          {/* Quick Learning Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFF4B8] tracking-wider uppercase">
              Core Curriculum
            </h4>
            <ul className="text-xs text-purple-200 space-y-2">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Quran Reading & Nazra
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Tajweed Rules & Articulation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('namaz')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Namaz (Salah) Step-by-Step
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tafheem')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Tafheem-ul-Quran (Thematic)
                </button>
              </li>
            </ul>
          </div>

          {/* Sacred Resources */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFF4B8] tracking-wider uppercase">
              Daily Practice
            </h4>
            <ul className="text-xs text-purple-200 space-y-2">
              <li>
                <button onClick={() => onNavigate('prayer-times')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Global Live Prayer Times
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('duas')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Hisn-ul-Muslim Daily Duas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('books')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Classical Islamic Books Library
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#F2C94C] transition-colors cursor-pointer">
                  Student Progress Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Portal Navigation & Return Link */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-[#FFF4B8] tracking-wider uppercase">
              Platform Integration
            </h4>
            <p className="text-xs text-purple-300 leading-relaxed">
              Islamic Learn is hosted as a dedicated sacred learning portal alongside the portfolio.
            </p>

            <button
              onClick={onBackToPortfolio}
              className="mt-2 w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#6D28D9] hover:bg-[#5B21B6] text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs border border-purple-400/30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Cookies & Scroll to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <div className="flex flex-wrap items-center gap-3">
            <p>
              © {new Date().getFullYear()} Islamic Learn — Online Quran Education. All Rights Reserved.
            </p>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
              className="text-[#F2C94C] hover:underline cursor-pointer transition-colors"
              title="Cookie & Privacy Settings"
            >
              Cookie Settings
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#F2C94C]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
