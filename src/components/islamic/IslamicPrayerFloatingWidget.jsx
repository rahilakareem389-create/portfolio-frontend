import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  MapPin,
  RefreshCw,
  Sun,
  Sunset,
  Moon,
  Compass,
  AlertCircle,
  X,
  Search,
  Navigation,
  Globe,
  ChevronDown
} from 'lucide-react';
import { WORLD_COUNTRIES } from '../../data/worldCountries';
import { PRAYER_CALCULATION_METHODS } from '../../data/islamicData';

/**
 * Islamic Prayer Floating Widget & World Countries Popup Modal
 * Features:
 * - Floating small circular widget on right side of screen that persists while scrolling
 * - Clicking the circle opens a high-polish modal popup
 * - Searchable 200+ countries with flags & cities
 * - Live AlAdhan dynamic calculation & next prayer countdown
 * - Completely removes the giant static prayer section from taking up page body space
 */
export default function IslamicPrayerFloatingWidget({ isOpenExternal, onCloseExternal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountryObj, setSelectedCountryObj] = useState(WORLD_COUNTRIES[0]); // Pakistan default
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [customCity, setCustomCity] = useState('');
  const [method, setMethod] = useState(1); // 1 = Karachi
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const [timings, setTimings] = useState(null);
  const [metaInfo, setMetaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGeoLoading, setIsGeoLoading] = useState(false);

  const countryDropdownRef = useRef(null);

  // Sync external open trigger (e.g. from navbar click)
  useEffect(() => {
    if (isOpenExternal !== undefined && isOpenExternal !== null) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  const handleClose = () => {
    setIsOpen(false);
    onCloseExternal?.();
  };

  // Close country dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // Clock ticker for live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Prayer Times dynamically from AlAdhan API
  const fetchPrayerTimes = async (city, country, methodId) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${methodId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.code === 200 && data.data?.timings) {
        setTimings(data.data.timings);
        setMetaInfo(data.data.meta);
        try {
          localStorage.setItem('cached_prayer_times', JSON.stringify({
            city,
            country,
            timings: data.data.timings,
            meta: data.data.meta,
            date: new Date().toDateString()
          }));
        } catch (_) {}
      } else {
        throw new Error('Invalid prayer data');
      }
    } catch (err) {
      try {
        const cached = localStorage.getItem('cached_prayer_times');
        if (cached) {
          const parsed = JSON.parse(cached);
          setTimings(parsed.timings);
          setMetaInfo(parsed.meta);
          setError('Operating on cached timings.');
        } else {
          setError('Unable to fetch live prayer times. Please verify city name or retry.');
        }
      } catch (_) {
        setError('Service temporarily unavailable.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(selectedCity, selectedCountryObj.name, method);
  }, [selectedCity, selectedCountryObj, method]);

  // GPS Geolocation Auto-Detect
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=${method}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.code === 200 && data.data?.timings) {
            setTimings(data.data.timings);
            setMetaInfo(data.data.meta);
            setSelectedCity('My Location (GPS)');
          }
        } catch (_) {
          alert('Could not determine prayer times for GPS coordinates.');
        } finally {
          setIsGeoLoading(false);
        }
      },
      () => {
        setIsGeoLoading(false);
        alert('Location permission not granted. Please pick your country and city manually.');
      },
      { timeout: 10000 }
    );
  };

  // Prayers List
  const prayers = useMemo(() => {
    if (!timings) return [];
    return [
      { name: 'Fajr', time: timings.Fajr, arabic: 'الفجر', icon: Moon, desc: 'Dawn Prayer' },
      { name: 'Sunrise', time: timings.Sunrise, arabic: 'الشروق', icon: Sun, desc: 'Solar Sunrise' },
      { name: 'Dhuhr', time: timings.Dhuhr, arabic: 'الظهر', icon: Sun, desc: 'Midday Prayer' },
      { name: 'Asr', time: timings.Asr, arabic: 'العصر', icon: Sun, desc: 'Late Afternoon' },
      { name: 'Maghrib', time: timings.Maghrib, arabic: 'المغرب', icon: Sunset, desc: 'Sunset Prayer' },
      { name: 'Isha', time: timings.Isha, arabic: 'العشاء', icon: Moon, desc: 'Night Prayer' },
    ];
  }, [timings]);

  // Next Prayer & Countdown
  const { nextPrayer, countdownText } = useMemo(() => {
    if (!timings || prayers.length === 0) {
      return { nextPrayer: null, countdownText: '--:--:--' };
    }

    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    const getMinutes = (tStr) => {
      if (!tStr) return 0;
      const clean = tStr.split(' ')[0];
      const [h, m] = clean.split(':').map(Number);
      return h * 60 + (m || 0);
    };

    let next = null;
    let diffMinutes = 0;

    for (const p of prayers) {
      if (p.name === 'Sunrise') continue;
      const pMinutes = getMinutes(p.time);
      if (pMinutes > nowMinutes) {
        next = p;
        diffMinutes = pMinutes - nowMinutes;
        break;
      }
    }

    if (!next) {
      const fajr = prayers[0];
      next = fajr;
      const fajrMinutes = getMinutes(fajr.time);
      diffMinutes = (24 * 60 - nowMinutes) + fajrMinutes;
    }

    const totalSeconds = Math.max(0, Math.floor(diffMinutes * 60));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, '0');

    return {
      nextPrayer: next,
      countdownText: `${pad(h)}h ${pad(m)}m ${pad(s)}s`
    };
  }, [timings, prayers, currentTime]);

  // Filtered countries list for search
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return WORLD_COUNTRIES;
    return WORLD_COUNTRIES.filter((c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  const handleSelectCountry = (country) => {
    setSelectedCountryObj(country);
    setSelectedCity(country.cities[0] || 'Capital');
    setIsCountryDropdownOpen(false);
    setCountrySearch('');
  };

  const handleCustomCitySubmit = (e) => {
    e.preventDefault();
    if (customCity.trim()) {
      setSelectedCity(customCity.trim());
    }
  };

  return (
    <>
      {/* 1. FLOATING CIRCULAR WIDGET ON RIGHT SIDE (Persists on Scroll) */}
      <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-28 z-[99970] select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#4C1D95] via-[#6D28D9] to-[#6D28D9] text-[#F2C94C] shadow-[0_10px_30px_rgba(109,40,217,0.5)] border-2 border-[#F2C94C]/70 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all"
          title="Global Prayer Times (Click to Open)"
          aria-label="Open Global Prayer Times"
        >
          {/* Subtle Outer Pulsing Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#F2C94C]/25 animate-ping pointer-events-none" />

          {/* Center Clock & Crescent Mosque Icon */}
          <div className="relative flex flex-col items-center justify-center">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-[#F2C94C] group-hover:rotate-12 transition-transform" />
          </div>

          {/* Tiny Top Badge */}
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-[#F2C94C] text-[#241B35] shadow-xs uppercase leading-none">
            Salah
          </span>

          {/* High-Contrast Tooltip Indicator (Crystal-Clear Text in Light & Dark Mode) */}
          <div
            className="islamic-prayer-tooltip absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl shadow-xl border border-[#F2C94C] whitespace-nowrap keep-white"
            style={{ backgroundColor: '#241B35', borderColor: '#F2C94C', color: '#ffffff' }}
          >
            <span>🕌</span>
            <span className="font-bold text-xs" style={{ color: '#ffffff' }}>Prayer Times •</span>
            <span className="font-bold text-xs gold-accent" style={{ color: '#F2C94C' }}>{nextPrayer?.name || 'Fajr'}</span>
            <span className="font-mono text-xs font-semibold yellow-accent px-1.5 py-0.5 rounded-md bg-black/40" style={{ color: '#FFF4B8' }}>
              ({countdownText})
            </span>
          </div>
        </button>
      </div>

      {/* 2. LUXURY POPUP MODAL (Opens upon clicking circle) */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99995] flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-in fade-in"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-[0_25px_60px_rgba(36,27,53,0.4)] border border-[#E6DCF5] flex flex-col overflow-hidden text-[#241B35]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#FAF8FF] border-b border-[#E6DCF5] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EDE5FF] text-[#6D28D9] flex items-center justify-center shrink-0 border border-[#6D28D9]/20 shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#241B35] leading-tight">
                    Global Sacred Prayer Times
                  </h3>
                  <p className="text-xs text-[#6B5E80]">
                    Real-time calculation for all 200+ countries and cities worldwide
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-white border border-[#E6DCF5] hover:bg-[#EDE5FF] text-[#241B35] hover:text-[#6D28D9] flex items-center justify-center transition-all cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              
              {/* Next Prayer Countdown Card (High Contrast Guaranteed) */}
              <div
                className="islamic-prayer-banner rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden border border-[#F2C94C]/40 keep-white"
                style={{
                  background: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 60%, #241B35 100%)',
                  color: '#ffffff'
                }}
              >
                <div className="space-y-1.5 text-center md:text-left relative z-10">
                  <span
                    className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#F2C94C]/40"
                    style={{ backgroundColor: 'rgba(242, 201, 76, 0.2)', color: '#FFF4B8' }}
                  >
                    Next Upcoming Prayer
                  </span>
                  <div className="flex flex-wrap items-baseline justify-center md:justify-start gap-2.5">
                    <span className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#ffffff' }}>
                      {nextPrayer?.name || 'Fajr'}
                    </span>
                    <span className="text-xl sm:text-2xl font-serif gold-highlight" style={{ color: '#F2C94C' }}>
                      {nextPrayer?.arabic}
                    </span>
                    <span className="text-lg" style={{ color: '#EDE5FF' }}>
                      at {nextPrayer?.time}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#EDE5FF' }}>
                    Location: <strong className="font-semibold" style={{ color: '#ffffff' }}>{selectedCity}, {selectedCountryObj.name}</strong>
                    {metaInfo?.timezone && <span className="opacity-90"> ({metaInfo.timezone})</span>}
                  </p>
                </div>

                <div className="flex flex-col items-center md:items-end shrink-0 relative z-10">
                  <span className="text-[11px] uppercase tracking-wider mb-1 font-medium" style={{ color: '#EDE5FF' }}>Time Remaining</span>
                  <div
                    className="font-mono text-2xl sm:text-3xl font-extrabold px-4 py-2 rounded-2xl border border-white/20 shadow-inner gold-highlight"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#F2C94C' }}
                  >
                    {countdownText}
                  </div>
                </div>
              </div>

              {/* Location Controls: 200+ Countries Dropdown + City Selector + GPS */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E6DCF5]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#241B35]">
                    <Globe className="w-4 h-4 text-[#6D28D9]" />
                    <span>Choose Country &amp; City (200+ Countries Supported):</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDetectGPS}
                      disabled={isGeoLoading}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#EDE5FF] text-[#4C1D95] hover:bg-[#6D28D9] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Navigation className={`w-3.5 h-3.5 ${isGeoLoading ? 'animate-spin' : ''}`} />
                      <span>{isGeoLoading ? 'Detecting...' : 'Auto-Detect GPS'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fetchPrayerTimes(selectedCity, selectedCountryObj.name, method)}
                      disabled={loading}
                      className="p-1.5 rounded-xl bg-white text-[#6B5E80] hover:text-[#6D28D9] border border-[#E6DCF5] cursor-pointer"
                      title="Refresh times"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Country Dropdown & City Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Searchable Country Dropdown */}
                  <div className="relative" ref={countryDropdownRef}>
                    <label className="block text-[11px] font-bold text-[#6B5E80] uppercase mb-1">
                      1. Country ({WORLD_COUNTRIES.length} Available)
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] font-semibold flex items-center justify-between cursor-pointer focus:border-[#6D28D9]"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span className="text-base">{selectedCountryObj.flag}</span>
                        <span className="truncate">{selectedCountryObj.name}</span>
                      </span>
                      <ChevronDown className="w-4 h-4 text-[#6D28D9] shrink-0" />
                    </button>

                    {/* Dropdown Menu */}
                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-2xl border border-[#E6DCF5] shadow-2xl p-2 max-h-60 overflow-y-auto space-y-1">
                        <div className="p-1 sticky top-0 bg-white">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 text-[#6B5E80] absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#FAF8FF] border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                              autoFocus
                            />
                          </div>
                        </div>

                        {filteredCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleSelectCountry(c)}
                            className={`w-full px-3 py-2 rounded-xl text-xs text-left flex items-center gap-2 transition-colors cursor-pointer ${
                              selectedCountryObj.code === c.code
                                ? 'bg-[#EDE5FF] text-[#6D28D9] font-bold'
                                : 'text-[#241B35] hover:bg-[#FAF8FF]'
                            }`}
                          >
                            <span className="text-sm">{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* City Preset Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#6B5E80] uppercase mb-1">
                      2. Major City
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] font-semibold focus:outline-none focus:border-[#6D28D9] cursor-pointer"
                    >
                      {selectedCountryObj.cities?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Calculation Method */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#6B5E80] uppercase mb-1">
                      3. Jurisprudence Method
                    </label>
                    <select
                      value={method}
                      onChange={(e) => setMethod(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] font-medium focus:outline-none focus:border-[#6D28D9] cursor-pointer truncate"
                    >
                      {PRAYER_CALCULATION_METHODS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom City Type-In */}
                <form onSubmit={handleCustomCitySubmit} className="pt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Or type any specific city/town name (e.g. Medina, Chicago, Peshawar)..."
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer shrink-0"
                  >
                    Set City
                  </button>
                </form>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded-xl bg-[#FFF4B8] border border-[#F2C94C] text-xs text-[#241B35] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#6D28D9] shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 6 Prayer Times Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {loading && !timings ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] animate-pulse h-32" />
                  ))
                ) : (
                  prayers.map((p) => {
                    const isNext = nextPrayer?.name === p.name;
                    const isSunrise = p.name === 'Sunrise';

                    return (
                      <div
                        key={p.name}
                        className={`rounded-2xl p-4 text-center transition-all border ${
                          isNext
                            ? 'bg-gradient-to-b from-[#EDE5FF] to-white border-[#6D28D9] shadow-md ring-2 ring-[#6D28D9]/20'
                            : 'bg-[#FAF8FF] border-[#E6DCF5]'
                        }`}
                      >
                        {isNext && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#6D28D9] text-white uppercase tracking-wider mb-1">
                            Upcoming
                          </span>
                        )}

                        <div className={`w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                          isNext ? 'bg-[#6D28D9] text-white' : 'bg-[#EDE5FF] text-[#6D28D9]'
                        }`}>
                          <p.icon className="w-4 h-4" />
                        </div>

                        <h4 className="font-heading font-bold text-sm text-[#241B35] leading-tight">
                          {p.name}
                        </h4>
                        <span className="text-[10px] font-serif text-[#6B5E80] block mb-1.5 opacity-80">
                          {p.arabic}
                        </span>

                        <div className="font-mono text-base sm:text-lg font-extrabold text-[#6D28D9]">
                          {p.time || '--:--'}
                        </div>

                        <span className="text-[10px] text-[#6B5E80] mt-1 block">
                          {isSunrise ? 'Salah prohibited' : p.desc}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF8FF] border-t border-[#E6DCF5] flex items-center justify-between text-xs text-[#6B5E80]">
              <span>Powered by AlAdhan Global Astronomical API</span>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-xl font-bold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer"
              >
                Close Prayer Times
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
