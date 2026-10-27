import React, { useState } from 'react';
import { Flame, BookOpen, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const SURAH_STUDIES = [
  {
    number: 1,
    name: 'Surah Al-Fatiha (The Opening)',
    arabic: 'سورة الفاتحة',
    verses: 7,
    type: 'Makki',
    theme: 'The Essence of the Entire Quran: Praising Allah, Acknowledging Divine Sovereignty, Sincere Supplication for the Straight Path (Sirat al-Mustaqeem).',
    lessons: [
      'The foundational principle of Tawheed (Monotheism)',
      'The balance between Ar-Rahman (Mercy) and Malik Yawm ad-Deen (Divine Justice)',
      'The eternal prayer for guidance away from deviance and divine anger'
    ]
  },
  {
    number: 2,
    name: 'Surah Al-Baqarah (The Cow)',
    arabic: 'سورة البقرة',
    verses: 286,
    type: 'Madani',
    theme: 'Comprehensive Guidance for the Muslim Ummah: Law, Faith, Fasting, Charity, Family, Ayat al-Kursi, and the Final Covenant.',
    lessons: [
      'The trial of Adam (AS) and the appointment of humanity as Khalifah on Earth',
      'The core pillars of Islamic law: Fasting (Ramadan), Hajj, Prohibition of Riba (Usury)',
      'Ayat al-Kursi (2:255): The greatest verse proclaiming Absolute Divine Sovereignty'
    ]
  },
  {
    number: 18,
    name: 'Surah Al-Kahf (The Cave)',
    arabic: 'سورة الكهف',
    verses: 110,
    type: 'Makki',
    theme: 'Spiritual Armor Against the 4 Major Trials of the End Times: Trial of Faith (Youth of the Cave), Wealth (Two Gardens), Knowledge (Musa & Khidr), and Power (Dhul-Qarnayn).',
    lessons: [
      'Steadfastness of youth amidst moral decay and societal pressure',
      'Wealth is a temporary test, not a measure of divine favor',
      'True humility before divine wisdom that surpasses human intellect'
    ]
  },
  {
    number: 36,
    name: 'Surah Yaseen (The Heart of Quran)',
    arabic: 'سورة يس',
    verses: 83,
    type: 'Makki',
    theme: 'Revival of the Spirit: Prophethood of Muhammad (ﷺ), Evidence in the Cosmos, and the Inevitability of the Day of Resurrection.',
    lessons: [
      'Reflection upon nature: the cycles of the sun, moon, and regenerating earth',
      'The ultimate confrontation on the Day of Judgment when limbs will testify',
      'The creative command of Allah: "Kun Fa-Yakoon" (Be, and it is)'
    ]
  },
  {
    number: 67,
    name: 'Surah Al-Mulk (The Dominion)',
    arabic: 'سورة الملك',
    verses: 30,
    type: 'Makki',
    theme: 'The Protector from the Torment of the Grave: Contemplation of the Heavens, Life and Death as a Divine Test of Excellence.',
    lessons: [
      'Life and death created to test "which of you is best in deed" (Ahsanu \'Amala)',
      'Flawless order in the seven heavens: "Look again! Can you see any flaw?"',
      'Prophetic intercession for whoever recites and reflects upon it every night'
    ]
  }
];

export default function IslamicTafheem() {
  const [selectedSurah, setSelectedSurah] = useState(SURAH_STUDIES[0]);

  return (
    <section id="tafheem" className="py-16 sm:py-24 bg-transparent border-t border-[#E6DCF5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 text-[#F2C94C]" />
            <span>Divine Guidance & Wisdom</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Tafheem-ul-Quran: Thematic Surah Study
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            Move beyond mere recitation into profound comprehension. Discover historical context, central themes, and timeless lessons for your daily life.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Surahs Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B5E80] block mb-1">
              Select Surah for Thematic Breakdown:
            </span>

            {SURAH_STUDIES.map((s) => {
              const isSelected = selectedSurah.number === s.number;
              return (
                <div
                  key={s.number}
                  onClick={() => setSelectedSurah(s)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#6D28D9] shadow-md ring-2 ring-[#6D28D9]/20'
                      : 'bg-white/60 hover:bg-white border-[#E6DCF5]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#6D28D9] text-white' : 'bg-[#EDE5FF] text-[#6D28D9]'
                    }`}>
                      {s.number}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#241B35] leading-snug">
                        {s.name}
                      </h4>
                      <span className="text-[11px] text-[#6B5E80]">
                        {s.type} • {s.verses} Ayat
                      </span>
                    </div>
                  </div>

                  <span className="font-serif text-base text-[#6D28D9]" dir="rtl">
                    {s.arabic}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Surah Comprehensive Deep Dive (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCF5] shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6DCF5]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF4B8] text-[#241B35] border border-[#F2C94C]/40">
                    Surah #{selectedSurah.number}
                  </span>
                  <span className="text-xs font-medium text-[#6B5E80]">
                    {selectedSurah.type} Period ({selectedSurah.verses} Verses)
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#241B35]">
                  {selectedSurah.name}
                </h3>
              </div>

              <div className="font-serif text-2xl sm:text-3xl text-[#6D28D9] bg-[#FAF8FF] px-4 py-2 rounded-2xl border border-[#E6DCF5]" dir="rtl">
                {selectedSurah.arabic}
              </div>
            </div>

            {/* Central Thematic Focus */}
            <div className="p-4 rounded-2xl bg-[#EDE5FF]/60 border border-[#6D28D9]/20 space-y-1.5">
              <span className="text-xs font-bold text-[#4C1D95] uppercase tracking-wider block">Central Thematic Message:</span>
              <p className="text-xs sm:text-sm text-[#241B35] leading-relaxed font-medium">
                {selectedSurah.theme}
              </p>
            </div>

            {/* Key Actionable Lessons */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#241B35] uppercase tracking-wider block">
                Key Spiritual Reflections & Commandments:
              </span>
              <ul className="space-y-2.5">
                {selectedSurah.lessons.map((lesson, idx) => (
                  <li key={idx} className="p-3.5 rounded-2xl bg-[#FAF8FF] border border-[#E6DCF5] flex items-start gap-3 text-xs sm:text-sm text-[#241B35]">
                    <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 text-xs text-[#6B5E80] flex items-center justify-between border-t border-[#E6DCF5]">
              <span>Teacher Consultation Available</span>
              <span className="font-semibold text-[#6D28D9]">Tafheem Course Included in Monthly Plan</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
