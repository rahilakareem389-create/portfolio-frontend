import React, { useState } from 'react';
import {
  HeartHandshake,
  Copy,
  Check,
  Volume2,
  Bookmark,
  Share2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { DAILY_DUAS_LIST } from '../../data/islamicData';

export default function IslamicDailyDuas() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [isPlayingId, setIsPlayingId] = useState(null);

  const categories = ['all', 'Morning & Evening', 'Protection', 'Knowledge', 'Anxiety & Debt', 'Sleep'];

  const filteredDuas = DAILY_DUAS_LIST.filter((d) => {
    if (selectedCategory === 'all') return true;
    return d.category === selectedCategory;
  });

  const handleCopy = (dua) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\nTransliteration: ${dua.transliteration}\n\nEnglish: ${dua.english}\n\nUrdu: ${dua.urdu}\n\nReference: ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeech = (dua) => {
    if ('speechSynthesis' in window) {
      if (isPlayingId === dua.id) {
        window.speechSynthesis.cancel();
        setIsPlayingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dua.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      utterance.onend = () => setIsPlayingId(null);
      utterance.onerror = () => setIsPlayingId(null);
      setIsPlayingId(dua.id);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported on this browser.');
    }
  };

  return (
    <section id="daily-duas" className="py-16 sm:py-24 bg-transparent border-t border-[#E6DCF5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4 text-[#F2C94C]" />
            <span>Spiritual Fortress</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Daily Masnoon Duas & Authentic Azkar
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            Connect your heart with Allah through authenticated supplications from Hisn-ul-Muslim. Complete with Arabic calligraphy, English and Urdu translations, and reference sources.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#6D28D9] text-white shadow-xs'
                  : 'bg-white text-[#6B5E80] hover:text-[#241B35] hover:bg-[#EDE5FF] border border-[#E6DCF5]'
              }`}
            >
              {cat === 'all' ? 'All Duas' : cat}
            </button>
          ))}
        </div>

        {/* Duas Cards Grid */}
        <div className="space-y-6">
          {filteredDuas.map((dua) => {
            const isCopied = copiedId === dua.id;
            const isPlaying = isPlayingId === dua.id;

            return (
              <div
                key={dua.id}
                className="rounded-3xl bg-white border border-[#E6DCF5] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-5"
              >
                {/* Dua Header Bar */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E6DCF5]">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EDE5FF] text-[#6D28D9]">
                      {dua.category}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#241B35]">
                      {dua.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSpeech(dua)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isPlaying
                          ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                          : 'bg-[#FAF8FF] hover:bg-[#EDE5FF] text-[#6D28D9] border-[#E6DCF5]'
                      }`}
                      title={isPlaying ? 'Stop Recitation' : 'Listen Recitation'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(dua)}
                      className="p-2 rounded-xl bg-[#FAF8FF] hover:bg-[#EDE5FF] text-[#241B35] border border-[#E6DCF5] transition-all cursor-pointer"
                      title="Copy full Dua"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#6B5E80]" />}
                    </button>
                  </div>
                </div>

                {/* Arabic Script */}
                <div className="text-center py-2">
                  <p className="font-serif text-2xl sm:text-3xl text-[#241B35] leading-relaxed sm:leading-loose" dir="rtl">
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration & Translations */}
                <div className="space-y-3 pt-2 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5]">
                    <span className="font-bold text-[#6D28D9] block text-xs uppercase mb-1">Pronunciation (Transliteration):</span>
                    <p className="text-[#241B35] italic leading-relaxed">{dua.transliteration}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5]">
                      <span className="font-bold text-[#4C1D95] block text-xs uppercase mb-1">English Translation:</span>
                      <p className="text-[#6B5E80] leading-relaxed">{dua.english}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] text-right" dir="rtl">
                      <span className="font-bold text-[#4C1D95] block text-xs uppercase mb-1 text-right">اردو ترجمہ:</span>
                      <p className="font-serif text-sm text-[#241B35] leading-relaxed">{dua.urdu}</p>
                    </div>
                  </div>
                </div>

                {/* Virtue & Hadith Reference Strip */}
                <div className="pt-3 border-t border-[#E6DCF5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6B5E80]">
                  <div>
                    <strong className="text-[#241B35]">Source Reference: </strong>
                    <span>{dua.reference}</span>
                  </div>
                  <div className="text-[#6D28D9] font-medium">
                    ✨ {dua.reward}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
