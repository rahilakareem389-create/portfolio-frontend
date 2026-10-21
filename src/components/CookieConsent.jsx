import React, { useState, useEffect } from 'react';
import { getCookieConsent, setCookieConsent, trackPageView } from '../utils/visitorTracker';

export default function CookieConsent({ activeTab = 'home' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    // Check if consent has already been given or declined
    const existingConsent = getCookieConsent();
    if (!existingConsent) {
      // Delay display slightly so it doesn't interrupt initial page load/preloader
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Allow re-opening cookie settings from footer link anytime
  useEffect(() => {
    const handleOpenSettings = () => {
      const currentConsent = getCookieConsent();
      setAnalyticsEnabled(currentConsent !== 'declined');
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent('accepted');
    setIsVisible(false);
    setShowPreferences(false);
    // Track current page view with consent granted
    if (activeTab && activeTab !== 'admin') {
      trackPageView(activeTab);
    }
  };

  const handleDeclineAll = () => {
    setCookieConsent('declined');
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    const consent = analyticsEnabled ? 'accepted' : 'declined';
    setCookieConsent(consent);
    setIsVisible(false);
    setShowPreferences(false);
    if (analyticsEnabled && activeTab && activeTab !== 'admin') {
      trackPageView(activeTab);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[99990] max-w-lg w-auto transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="cookie-card rounded-2xl p-5 sm:p-6 relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full pointer-events-none filter blur-2xl opacity-25"
          style={{ backgroundColor: '#D57C63' }}
        />

        {/* Header with Icon */}
        <div className="flex items-start gap-3.5 mb-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#ff7a1a]/15 border border-[#ff7a1a]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,122,26,0.25)] text-[#ff7a1a]">
            {/* Cookie SVG Icon */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-.54-.043-1.07-.126-1.587a.75.75 0 0 0-.825-.623 3.5 3.5 0 0 1-3.839-3.839.75.75 0 0 0-.623-.825A9.957 9.957 0 0 0 12 2zm-1.5 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm4.5 3a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm-7 4.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zm7.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4 2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </div>

          <div className="flex-1">
            <h3
              id="cookie-consent-title"
              className="cookie-title text-base sm:text-lg font-bold tracking-tight"
            >
              Cookie & Privacy Preferences
            </h3>
            <p
              id="cookie-consent-desc"
              className="cookie-desc text-xs sm:text-sm mt-1 leading-relaxed"
            >
              We use essential cookies for security and language settings, and optional analytics cookies to measure anonymous website traffic.
            </p>
          </div>
        </div>

        {/* Detailed Preferences Accordion */}
        {showPreferences && (
          <div className="mt-3 mb-4 space-y-2.5 border-t border-[#332219]/30 pt-3 text-xs">
            {/* Necessary Cookies (Always On) */}
            <div className="cookie-pref-item flex items-center justify-between p-2.5 rounded-xl">
              <div className="pr-3">
                <span className="cookie-pref-title font-semibold block">Essential Cookies</span>
                <span className="cookie-pref-desc text-[11px] block mt-0.5">
                  Required for core authentication, session security, and language selection.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ff7a1a]/20 text-[#ff7a1a] border border-[#ff7a1a]/30 shrink-0">
                Always Active
              </span>
            </div>

            {/* Analytics Cookies (User Toggleable) */}
            <div className="cookie-pref-item flex items-center justify-between p-2.5 rounded-xl">
              <div className="pr-3">
                <span className="cookie-pref-title font-semibold block">Analytics & Performance</span>
                <span className="cookie-pref-desc text-[11px] block mt-0.5">
                  Helps us understand anonymous visitor counts to improve portfolio speed and design.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#3a261c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff7a1a]"></div>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 pt-2 flex flex-col sm:flex-row items-center gap-2.5 relative z-10">
          {showPreferences ? (
            <button
              type="button"
              onClick={handleSavePreferences}
              className="keep-white w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#D57C63] to-[#ff7a1a] hover:from-[#e58a72] hover:to-[#ff9245] shadow-[0_4px_15px_rgba(213,124,99,0.35)] transition-all cursor-pointer text-center"
            >
              Save Preferences
            </button>
          ) : (
            <>
              {/* Accept All */}
              <button
                type="button"
                onClick={handleAcceptAll}
                className="keep-white w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#D57C63] to-[#ff7a1a] hover:from-[#e58a72] hover:to-[#ff9245] shadow-[0_4px_15px_rgba(213,124,99,0.35)] transition-all cursor-pointer text-center"
              >
                Accept All
              </button>

              {/* Decline Non-Essential */}
              <button
                type="button"
                onClick={handleDeclineAll}
                className="cookie-btn-decline w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center shadow-xs"
              >
                Decline
              </button>
            </>
          )}

          {/* Toggle Preferences button */}
          <button
            type="button"
            onClick={() => setShowPreferences((prev) => !prev)}
            className="cookie-btn-customize w-full sm:w-auto py-2 px-3 text-xs font-semibold underline underline-offset-2 transition-colors cursor-pointer text-center"
          >
            {showPreferences ? 'Back' : 'Customize'}
          </button>
        </div>
      </div>
    </div>
  );
}
