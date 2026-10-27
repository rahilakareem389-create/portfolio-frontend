import React, { useState } from 'react';
import { Compass, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';

const NAMAZ_STEPS = [
  {
    step: 1,
    name: 'Wudu (Purification)',
    arabic: 'الوضوء والطهارة',
    desc: 'Purification is the key to prayer. Wash hands, rinse mouth and nose, wash face, wash arms up to elbows, wipe head and ears, and wash feet up to ankles.',
    arabicText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ',
    transliteration: 'O you who believe! When you rise to pray, wash your faces and your hands to the elbows, wipe your heads and your feet to the ankles. (5:6)',
    translation: 'Wudu is obligatory before standing in front of Allah Almighty.',
    note: 'Ensure clothes, body, and place of prayer are clean, and face towards the Qibla (Makkah).'
  },
  {
    step: 2,
    name: 'Takbeerat-ul-Ihram (Starting Prayer)',
    arabic: 'تكبيرة الإحرام',
    desc: 'Raise both hands up to earlobes (men) or shoulders (women), while focusing the heart with sincere intention (Niyyah), and pronounce Allahu Akbar.',
    arabicText: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest.',
    note: 'Fard element. Worldly talk and actions become forbidden once Takbeer is pronounced.'
  },
  {
    step: 3,
    name: 'Qiyam: Sana & Surah Al-Fatiha',
    arabic: 'القيام وقراءة الفاتحة',
    desc: 'Place right hand over left below or on chest/navel. Recite the opening supplication (Sana), Ta\'awwudh, Tasmiyah, Surah Al-Fatiha, and an additional Surah.',
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
    transliteration: 'Subhanak-Allahumma wa bihamdika, wa tabarakasmuka, wa ta\'ala jadduka, wa la ilaha ghayruk.',
    translation: 'Glory be to You, O Allah, and all praise. Blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship besides You.',
    note: 'Reciting Surah Al-Fatiha is an essential pillar in every single Rakat.'
  },
  {
    step: 4,
    name: 'Ruku (Bowing)',
    arabic: 'الركوع وتعظيم الرب',
    desc: 'Bow down with a straight back, placing hands firmly on knees with fingers spread, and glorify Allah at least three times.',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (×٣)',
    transliteration: 'Subhana Rabbiyal-\'Azeem (3 times)',
    translation: 'Glory be to my Lord, the Almighty.',
    note: 'Keep head level with back without sagging or tilting too high.'
  },
  {
    step: 5,
    name: 'Qawmah (Standing Up from Ruku)',
    arabic: 'الرفع من الركوع',
    desc: 'Rise back to a full standing posture while reciting Sami\' Allahu liman hamidah, followed by Rabbana lakal-hamd.',
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا وَلَكَ الْحَمْدُ',
    transliteration: 'Sami\' Allahu liman hamidah • Rabbana wa lakal-hamd.',
    translation: 'Allah hears whoever praises Him • Our Lord, to You belongs all praise.',
    note: 'Stand completely upright and pause for a brief moment with tranquility before going into prostration.'
  },
  {
    step: 6,
    name: 'Sujood (Prostration)',
    arabic: 'السجود وقمة التذلل',
    desc: 'Prostrate on 7 body parts: forehead & nose, both palms, both knees, and tips of both feet toes pointing towards Qibla.',
    arabicText: 'سُبْحَانَ رَبِّيَ الأَعْلَى (×٣)',
    transliteration: 'Subhana Rabbiyal-A\'la (3 times)',
    translation: 'Glory be to my Lord, the Most High.',
    note: 'The servant is closest to their Lord while in Sujood. Perform two prostrations in every Rakat.'
  },
  {
    step: 7,
    name: 'Tashahhud (Sitting for At-Tahiyyat)',
    arabic: 'التشهد الأخير',
    desc: 'Sit calmly after completing the second or final Rakat on the left foot with right foot upright. Recite the divine greeting, testimony of faith, and Durood.',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat. As-salamu \'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh. As-salamu \'alayna wa \'ala \'ibadillahis-salihin. Ash-hadu alla ilaha illallahu wa ash-hadu anna Muhammadan \'abduhu wa Rasuluh.',
    translation: 'All compliments, prayers, and pure things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no god but Allah, and I bear witness that Muhammad is His servant and messenger.',
    note: 'Raise index finger gently when uttering "Ash-hadu alla ilaha illallah".'
  },
  {
    step: 8,
    name: 'Tasleem (Concluding the Salah)',
    arabic: 'التسليم وإنهاء الصلاة',
    desc: 'Turn your head smoothly over your right shoulder and then over your left shoulder while greeting the recording angels and fellow believers.',
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'As-salamu \'alaykum wa rahmatullah',
    translation: 'May the peace and mercy of Allah be upon you.',
    note: 'Turning to the right and left completes the obligatory prayer.'
  }
];

export default function IslamicNamazGuide() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const current = NAMAZ_STEPS[currentStepIndex];

  return (
    <section id="namaz-guide" className="py-16 sm:py-24 bg-white/50 backdrop-blur-xs border-t border-[#E6DCF5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4 text-[#F2C94C]" />
            <span>Pillar of Islam</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#241B35] tracking-tight mb-4">
            Interactive Step-by-Step Namaz (Salah) Masterclass
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E80]">
            Learn how to perform complete Salah according to the authentic Sunnah of Prophet Muhammad (ﷺ). Includes word-by-word Arabic pronunciation, transliteration, and spiritual etiquette.
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {NAMAZ_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setCurrentStepIndex(idx)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                currentStepIndex === idx
                  ? 'bg-[#6D28D9] text-white shadow-xs'
                  : 'bg-[#FAF8FF] text-[#6B5E80] hover:bg-[#EDE5FF] hover:text-[#241B35] border border-[#E6DCF5]'
              }`}
            >
              <span>{s.step}.</span>
              <span>{s.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Step Detail Active Card */}
        <div className="rounded-3xl bg-[#FAF8FF] border border-[#E6DCF5] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#E6DCF5]">
            <div>
              <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider">
                Step {current.step} of {NAMAZ_STEPS.length}
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#241B35] mt-1">
                {current.name}
              </h3>
            </div>
            <div className="font-serif text-xl sm:text-2xl text-[#6D28D9] bg-white px-4 py-2 rounded-2xl border border-[#E6DCF5]" dir="rtl">
              {current.arabic}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#241B35] leading-relaxed my-6 font-medium">
            {current.desc}
          </p>

          {/* Arabic Recitation Box */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE5FF] shadow-xs space-y-4">
            <div className="text-center">
              <span className="text-[11px] font-bold text-[#6B5E80] uppercase tracking-wider block mb-2">Recitation in Arabic</span>
              <p className="font-serif text-2xl sm:text-3xl text-[#241B35] leading-loose" dir="rtl">
                {current.arabicText}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E6DCF5]/60 text-xs sm:text-sm space-y-2">
              <div>
                <strong className="text-[#6D28D9]">Transliteration: </strong>
                <span className="text-[#6B5E80] italic">{current.transliteration}</span>
              </div>
              <div>
                <strong className="text-[#241B35]">Translation: </strong>
                <span className="text-[#6B5E80]">{current.translation}</span>
              </div>
            </div>
          </div>

          {/* Essential Rule / Note */}
          <div className="mt-6 p-4 rounded-2xl bg-[#FFF4B8]/60 border border-[#F2C94C]/40 text-xs text-[#241B35] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Important Jurisprudence Note: </strong>
              <span>{current.note}</span>
            </div>
          </div>

          {/* Navigation Prev / Next */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#E6DCF5]">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#6B5E80] hover:text-[#241B35] bg-white border border-[#E6DCF5] hover:bg-[#EDE5FF] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <span className="text-xs font-semibold text-[#6B5E80]">
              {currentStepIndex + 1} / {NAMAZ_STEPS.length}
            </span>

            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(NAMAZ_STEPS.length - 1, prev + 1))}
              disabled={currentStepIndex === NAMAZ_STEPS.length - 1}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#6D28D9] hover:bg-[#4C1D95] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
