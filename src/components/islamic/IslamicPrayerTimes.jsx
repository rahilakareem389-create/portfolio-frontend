import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  MapPin,
  RefreshCw,
  Sun,
  Sunset,
  Moon,
  Compass,
  AlertCircle,
  Check,
  ChevronDown,
  Navigation
} from 'lucide-react';
import { DEFAULT_CITIES, PRAYER_CALCULATION_METHODS } from '../../data/islamicData';

/**
 * Islamic Global Prayer Times Engine
 * Dynamic live calculation via official AlAdhan API
 * Features:
 * - City / Country picker + Geolocation auto-detection
 * - Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha
 * - Live real-time countdown to the next prayer
 * - Calculation method switch (Karachi, ISNA, MWL, Umm Al Qura)
 * - Never hardcoded, graceful errors & offline cache
 */
export default function IslamicPrayerTimes() {
  const [selectedCity, setSelectedCity] = useState('Karachi');
  const [selectedCountry, setSelectedCountry] = useState('Pakistan');
  const [customCity, setCustomCity] = useState('');
  const [customCountry, setCustomCountry] = useState('');
  const [method, setMethod] = useState(1); // 1 = Karachi (Hanafi)
  const [timings, setTimings] = useState(null);
  const [metaInfo, setMetaInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGeoLoading, setIsGeoLoading] = useState(false);

  // Live seconds clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Prayer Times from AlAdhan API
  const fetchPrayerTimes = async (city, country, methodId) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${methodId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data.code === 200 && data.data && data.data.timings) {
        setTimings(data.data.timings);
        setMetaInfo(data.data.meta);
        // Cache in localStorage for offline resiliency
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
        throw new Error('Invalid prayer data returned from service');
      }
    } catch (err) {
      console.warn('Live prayer time fetch failed, trying cached:', err);
      // Try local cache
      try {
        const cached = localStorage.getItem('cached_prayer_times');
        if (cached) {
          const parsed = JSON.parse(cached);
          setTimings(parsed.timings);
          setMetaInfo(parsed.meta);
          setError('Operating on cached timings. Please check internet connection.');
        } else {
          setError('Unable to fetch live prayer times. Please verify city name or retry.');
        }
      } catch (_) {
        setError('Unable to reach prayer times service.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrayerTimes(selectedCity, selectedCountry, method);
  }, [selectedCity, selectedCountry, method]);

  // Permitted Geolocation Handler
  const handleDetectLocation = () => {
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
            setSelectedCountry(data.data.meta.timezone || 'Detected');
          }
        } catch (err) {
          alert('Could not retrieve prayer times for your coordinates.');
        } finally {
          setIsGeoLoading(false);
        }
      },
      (err) => {
        setIsGeoLoading(false);
        alert('Location permission denied or unavailable. You can select your city manually from the list.');
      },
      { timeout: 10000 }
    );
  };

  // Prayer List & Next Prayer Countdown Calculation
  const prayers = useMemo(() => {
    if (!timings) return [];
    return [
      { name: 'Fajr', time: timings.Fajr, arabic: 'الفجر', icon: Moon, desc: 'Dawn Prayer before Sunrise' },
      { name: 'Sunrise', time: timings.Sunrise, arabic: 'الشروق', icon: Sun, desc: 'Solar Sunrise (End of Fajr)' },
      { name: 'Dhuhr', time: timings.Dhuhr, arabic: 'الظهر', icon: Sun, desc: 'Midday Prayer after Sun Zenith' },
      { name: 'Asr', time: timings.Asr, arabic: 'العصر', icon: Sun, desc: 'Late Afternoon Prayer' },
      { name: 'Maghrib', time: timings.Maghrib, arabic: 'المغرب', icon: Sunset, desc: 'Sunset Prayer' },
      { name: 'Isha', time: timings.Isha, arabic: 'العشاء', icon: Moon, desc: 'Night Prayer' },
    ];
  }, [timings]);

  // Determine which prayer is next & remaining seconds
  const { nextPrayer, countdownText } = useMemo(() => {
    if (!timings || prayers.length === 0) {
      return { nextPrayer: null, countdownText: '--:--:--' };
    }

    const now = currentTime;
    const nowMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

    // Convert time string "HH:MM" to minutes from midnight
    const getMinutes = (tStr) => {
      if (!tStr) return 0;
      const clean = tStr.split(' ')[0]; // Strip timezone like (PKT) if present
      const [h, m] = clean.split(':').map(Number);
      return h * 60 + (m || 0);
    };

    let next = null;
    let diffMinutes = 0;

    // Check today's remaining prayers
    for (const p of prayers) {
      if (p.name === 'Sunrise') continue; // Sunrise is not an obligatory salah
      const pMinutes = getMinutes(p.time);
      if (pMinutes > nowMinutes) {
        next = p;
        diffMinutes = pMinutes - nowMinutes;
        break;
      }
    }

    // If all prayers passed today, next is tomorrow's Fajr
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

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customCity.trim() && customCountry.trim()) {
      setSelectedCity(customCity.trim());
      setSelectedCountry(customCountry.trim());
    }
  };

  return (
    <section id="prayer-times" className="py-16 sm:py-24 bg-[#FFFFFF] border-t border-[#E6DCF5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-4 h-4 text-[#F2C94C]" />
            <span>Global Real-Time Calculation</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Today’s Sacred Prayer Times
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            Accurate Islamic prayer timings calculated dynamically for any city worldwide using official astronomical methods. Never miss your Salah.
          </p>
        </div>

        {/* Next Prayer Countdown Spotlight Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#6D28D9] via-[#4C1D95] to-[#241B35] text-white shadow-[0_12px_40px_rgba(109,40,217,0.28)] mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-[#F2C94C]/30">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2C94C]/20 border border-[#F2C94C]/40 text-[#FFF4B8] text-xs font-bold uppercase tracking-wider">
              <span>Next Upcoming Prayer</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center md:justify-start gap-3">
              <span>{nextPrayer?.name || 'Fajr'}</span>
              <span className="text-xl sm:text-2xl font-serif text-[#F2C94C] opacity-90">{nextPrayer?.arabic}</span>
              <span className="text-lg sm:text-xl font-normal text-purple-200">at {nextPrayer?.time}</span>
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Location: <strong className="text-white font-semibold">{selectedCity}, {selectedCountry}</strong>
              {metaInfo?.timezone && <span className="opacity-80"> ({metaInfo.timezone})</span>}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end shrink-0 relative z-10">
            <span className="text-xs font-medium uppercase tracking-wider text-purple-200 mb-1">Time Remaining</span>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#F2C94C] tracking-wide bg-black/25 px-5 py-2.5 rounded-2xl border border-white/10 shadow-inner">
              {countdownText}
            </div>
          </div>
        </div>

        {/* Location Picker & Quick City Bar */}
        <div className="bg-[#FAF8FF] p-4 sm:p-6 rounded-2xl border border-[#E6DCF5] mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E6DCF5]">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#241B35]">
              <MapPin className="w-4 h-4 text-[#6D28D9]" />
              <span>Select or Detect Your City:</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isGeoLoading}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#EDE5FF] text-[#4C1D95] hover:bg-[#6D28D9] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                title="Detect automatically via browser geolocation"
              >
                <Navigation className={`w-3.5 h-3.5 ${isGeoLoading ? 'animate-spin' : ''}`} />
                <span>{isGeoLoading ? 'Detecting...' : 'Detect GPS City'}</span>
              </button>

              <button
                type="button"
                onClick={() => fetchPrayerTimes(selectedCity, selectedCountry, method)}
                disabled={loading}
                className="p-1.5 rounded-lg text-xs font-medium text-[#6B5E80] hover:text-[#6D28D9] hover:bg-[#EDE5FF] transition-all cursor-pointer"
                title="Refresh prayer times"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Preset City Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {DEFAULT_CITIES.map((c) => {
              const isActive = selectedCity === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    setSelectedCity(c.name);
                    setSelectedCountry(c.country);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#6D28D9] text-white shadow-xs font-semibold'
                      : 'bg-white text-[#241B35] hover:bg-[#EDE5FF] border border-[#E6DCF5]'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom City Search Input & Calculation Method Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <form onSubmit={handleCustomSubmit} className="sm:col-span-2 flex gap-2">
              <input
                type="text"
                placeholder="Enter city (e.g. Chicago, Peshawar)..."
                value={customCity}
                onChange={(e) => setCustomCity(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
              />
              <input
                type="text"
                placeholder="Country (e.g. USA)..."
                value={customCountry}
                onChange={(e) => setCustomCountry(e.target.value)}
                className="w-28 sm:w-36 px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer shrink-0"
              >
                Go
              </button>
            </form>

            <div>
              <select
                value={method}
                onChange={(e) => setMethod(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9] cursor-pointer"
                title="Prayer Calculation Method"
              >
                {PRAYER_CALCULATION_METHODS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error / Offline Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#FFF4B8] border border-[#F2C94C] text-[#241B35] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#6D28D9] shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 6 Prayer Times Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading && !timings ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] animate-pulse h-36"></div>
            ))
          ) : (
            prayers.map((p) => {
              const isNext = nextPrayer?.name === p.name;
              const isSunrise = p.name === 'Sunrise';

              return (
                <div
                  key={p.name}
                  className={`relative rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 border ${
                    isNext
                      ? 'bg-gradient-to-b from-[#EDE5FF] to-white border-[#6D28D9] shadow-md transform -translate-y-1'
                      : 'bg-white hover:bg-[#FAF8FF] border-[#E6DCF5]'
                  }`}
                >
                  {isNext && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#6D28D9] text-white shadow-xs uppercase tracking-wider">
                      Upcoming
                    </span>
                  )}

                  <div className={`w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                    isNext ? 'bg-[#6D28D9] text-white' : 'bg-[#EDE5FF] text-[#6D28D9]'
                  }`}>
                    <p.icon className="w-4 h-4" />
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#241B35] leading-tight">
                    {p.name}
                  </h4>
                  <span className="text-[11px] font-serif text-[#6B5E80] block mb-2 opacity-80">
                    {p.arabic}
                  </span>

                  <div className="font-mono text-lg sm:text-xl font-extrabold text-[#6D28D9] tracking-tight">
                    {p.time || '--:--'}
                  </div>

                  <span className="text-[10px] text-[#6B5E80] mt-1 block leading-tight">
                    {isSunrise ? 'Salah prohibited' : p.desc.split(' ')[0]}
                  </span>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
