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

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState('Standard ($180)');

  // Sync with window.location.hash for direct navigation & back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'about', 'services', 'portfolio', 'pricing', 'contact', 'fullstack', 'seo', 'wordpress', 'admin'];
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

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

      {/* 3D Interactive Three.js Background Constellation */}
      <Background3D enabled={true} />

      {/* Modern Fixed Navbar (hidden on dedicated admin page) */}
      {activeTab !== 'admin' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      )}

      {/* Main Dynamic View with Smooth Open/Close Transitions */}
      <main className="flex-1 relative z-10">
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
      </main>

      {/* Global Footer (hidden on dedicated admin page) */}
      {activeTab !== 'admin' && (
        <Footer setActiveTab={handleTabChange} />
      )}
    </div>
  );
}

export default App;