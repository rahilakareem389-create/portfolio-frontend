import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsCounter from './components/StatsCounter';
import HomeSkillCards from './components/HomeSkillCards';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import FullStackPage from './components/FullStackPage';
import SeoPage from './components/SeoPage';
import WordPressPage from './components/WordPressPage';
import Testimonials from './components/Testimonials';
import AdminPage from './components/AdminPage';
import TerminalPreloader from './components/TerminalPreloader';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import IslamicNavbar from './components/islamic/IslamicNavbar';
import IslamicHero from './components/islamic/IslamicHero';
import LandingSections from './components/islamic/LandingSections';
import { trackPageView } from './utils/visitorTracker';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState('Standard ($180)');

  // Track anonymous visitor page views
  useEffect(() => {
    if (activeTab && activeTab !== 'admin') {
      trackPageView(activeTab);
    }
  }, [activeTab]);

  // Sync with window.location.hash for direct navigation & back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs = [
        'home',
        'about',
        'services',
        'portfolio',
        'pricing',
        'contact',
        'fullstack',
        'seo',
        'wordpress',
        'admin',
        'islamic-learn',
      ];

      // Secret Admin Portal Aliases: #rk-admin, #admin, #rk-portal, #rahila-admin
      if (['rk-admin', 'admin', 'rk-portal', 'rahila-admin'].includes(hash)) {
        setActiveTab('admin');
        return;
      }

      // Islamic Learn Direct Portal Aliases: #islamic, #quran, #islamic-learn, #islamiclearn, #quran-education
      if (['islamic', 'quran', 'islamic-learn', 'islamiclearn', 'quran-education'].includes(hash)) {
        setActiveTab('islamic-learn');
        return;
      }

      if (hash === 'testimonials') {
        setActiveTab('home');
        setTimeout(() => {
          const el = document.getElementById('testimonials');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }

      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    // Discreet Admin shortcut: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleTabChange('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update hash when activeTab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global slow & silky down-to-up reveal animation observer across the entire website
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach((el) => observer.observe(el));

    // Automatically observe any new elements across any tab/page
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.reveal-up:not(.is-visible)');
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#ff7a1a] selection:text-black">
      {/* Interactive Startup Terminal Preloader */}
      {showPreloader && (
        <TerminalPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* 3D Interactive Three.js Background Constellation (Disabled on Islamic Learn) */}
      <Background3D enabled={activeTab !== 'islamic-learn'} />

      {/* Modern Fixed Navbar (hidden on dedicated admin page & dedicated Islamic Learn portal) */}
      {activeTab !== 'admin' && activeTab !== 'islamic-learn' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      )}

      {/* Main Dynamic View with Smooth Open/Close Transitions */}
      <main className="flex-1 relative z-10">
        <ErrorBoundary resetKey={activeTab}>
          {activeTab === 'home' && (
            <>
              <Hero
                setActiveTab={handleTabChange}
              />
              <StatsCounter />
              <HomeSkillCards
                setActiveTab={handleTabChange}
              />
              <Testimonials
                setActiveTab={handleTabChange}
                setSelectedPlan={setSelectedPlan}
              />
            </>
          )}

          {activeTab === 'about' && (
            <About
              setActiveTab={handleTabChange}
            />
          )}

          {activeTab === 'services' && (
            <Services
              setActiveTab={handleTabChange}
              setSelectedPlan={setSelectedPlan}
            />
          )}

          {activeTab === 'portfolio' && (
            <Portfolio
              setActiveTab={handleTabChange}
            />
          )}

          {activeTab === 'pricing' && (
            <Pricing
              setActiveTab={handleTabChange}
              setSelectedPlan={setSelectedPlan}
            />
          )}

          {activeTab === 'contact' && (
            <Contact
              setActiveTab={handleTabChange}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          )}

          {activeTab === 'fullstack' && (
            <FullStackPage
              setActiveTab={handleTabChange}
              setSelectedPlan={setSelectedPlan}
            />
          )}

          {activeTab === 'seo' && (
            <SeoPage
              setActiveTab={handleTabChange}
              setSelectedPlan={setSelectedPlan}
            />
          )}

          {activeTab === 'wordpress' && (
            <WordPressPage
              setActiveTab={handleTabChange}
              setSelectedPlan={setSelectedPlan}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPage
              setActiveTab={handleTabChange}
            />
          )}

          {/* Standalone Complete Islamic Learn — Online Quran Education Website */}
          {activeTab === 'islamic-learn' && (
            <div className="min-h-screen flex flex-col relative selection:bg-[#e0a93b] selection:text-[#1c1040]">
              <IslamicNavbar
                activeSection="home"
                onNavigate={(id) => {
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
                }}
                onBackToPortfolio={() => handleTabChange('home')}
              />
              <IslamicHero
                id="quran-hero"
                setActiveTab={handleTabChange}
                onNavigate={(dest) => {
                  if (dest === 'portfolio' || dest === 'home') {
                    handleTabChange('home');
                    return;
                  }
                  const targetId = dest === 'contact' || dest === 'enroll' ? 'admission' : dest;
                  const el = document.getElementById(targetId);
                  if (el) {
                    const headerOffset = 80;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
              <LandingSections />
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* Global Footer (hidden on dedicated admin page & dedicated Islamic Learn portal) */}
      {activeTab !== 'admin' && activeTab !== 'islamic-learn' && (
        <Footer setActiveTab={handleTabChange} />
      )}

      {/* Authentic GDPR & ePrivacy Compliant Cookie Consent Banner & Floating Re-open Control */}
      <CookieConsent activeTab={activeTab} preloaderActive={showPreloader} />
    </div>
  );
}

export default App;
