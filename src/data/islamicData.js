/**
 * Islamic Learn — Online Quran Education Data Repository
 * Brand Colors:
 * Royal Purple #6D28D9, Deep Purple #4C1D95, Lavender #EDE5FF,
 * Soft Light Yellow #FFF4B8, Golden Yellow #F2C94C, Background #FAF8FF, Text #241B35
 */

export const ISLAMIC_COLORS = {
  royalPurple: '#6D28D9',
  deepPurple: '#4C1D95',
  lavender: '#EDE5FF',
  softYellow: '#FFF4B8',
  goldenYellow: '#F2C94C',
  bg: '#FAF8FF',
  white: '#FFFFFF',
  text: '#241B35',
  textMuted: '#6B5E80',
  border: '#E6DCF5'
};

export const ISLAMIC_COURSES = [
  {
    id: 'quran-reading',
    title: 'Quran Reading & Nazra',
    arabicTitle: 'قراءة القرآن الكريم والناظرة',
    level: 'Beginner to Intermediate',
    duration: '3 - 6 Months',
    lessonsCount: 30,
    rating: 4.9,
    enrolledCount: 1420,
    tag: 'Foundational',
    description: 'Learn to read the Holy Quran from basic Arabic alphabets (Noorani Qaida) to fluent recitation with correct letter recognition and joining rules.',
    icon: 'BookOpen',
    featured: true,
    syllabus: [
      { id: 1, title: 'Arabic Alphabets (Huroof-e-Tahajji) & Correct Articulation', duration: '45 mins', type: 'video' },
      { id: 2, title: 'Compound Letters (Murakkabat) & Recognition Rules', duration: '40 mins', type: 'video' },
      { id: 3, title: 'Short Vowels (Harakat): Zabar, Zer, Pesh', duration: '50 mins', type: 'video' },
      { id: 4, title: 'Tanween (Double Vowels) & Noon Sakinah Basics', duration: '45 mins', type: 'video' },
      { id: 5, title: 'Long Vowels (Huroof-e-Maddah) & Leen Letters', duration: '55 mins', type: 'video' },
      { id: 6, title: 'Sukoon (Jazm) & Connecting Consonants', duration: '50 mins', type: 'video' },
      { id: 7, title: 'Tashdeed (Shaddah) Rules & Practice', duration: '60 mins', type: 'video' },
      { id: 8, title: 'Transition from Qaida to Juz Amma (Surah Al-Fatiha to An-Nas)', duration: '60 mins', type: 'practice' },
      { id: 9, title: 'Fluent Nazra Recitation Practice (Juz 1 to 5)', duration: '75 mins', type: 'practice' },
      { id: 10, title: 'Rules of Stopping (Waqf) & Pausing in the Quran', duration: '50 mins', type: 'video' }
    ]
  },
  {
    id: 'tajweed',
    title: 'Tajweed Rules & Pronunciation',
    arabicTitle: 'أحكام التجويد ومخارج الحروف',
    level: 'All Levels',
    duration: '4 - 8 Months',
    lessonsCount: 28,
    rating: 4.95,
    enrolledCount: 980,
    tag: 'Mastery',
    description: 'Master the science of Tajweed. Study Makharij al-Huroof (articulation points), Sifaat (characteristics), Ghunnah, Qalqalah, Ikhfa, and Idgham to recite like the Prophet (ﷺ).',
    icon: 'Sparkles',
    featured: true,
    syllabus: [
      { id: 1, title: 'Introduction to Tajweed Science & Its Obligation', duration: '40 mins', type: 'video' },
      { id: 2, title: 'Makharij Part 1: Throat Letters (Halqiyah)', duration: '55 mins', type: 'video' },
      { id: 3, title: 'Makharij Part 2: Tongue Letters (Lisaniyah)', duration: '60 mins', type: 'video' },
      { id: 4, title: 'Makharij Part 3: Lips & Nasal Cavity (Shafawiyah & Khaishoom)', duration: '45 mins', type: 'video' },
      { id: 5, title: 'Rules of Noon Sakinah & Tanween: Izhar, Idgham, Iqlab, Ikhfa', duration: '65 mins', type: 'video' },
      { id: 6, title: 'Rules of Meem Sakinah: Ikhfa Shafawi, Idgham Shafawi, Izhar Shafawi', duration: '50 mins', type: 'video' },
      { id: 7, title: 'Qalqalah Letters (Echoing Sound) & Levels of Qalqalah', duration: '45 mins', type: 'video' },
      { id: 8, title: 'Rules of Madd (Elongation): Natural & Derived Madd', duration: '60 mins', type: 'video' },
      { id: 9, title: 'Heavy and Light Letters (Tafkheem & Tarqeeq) with Ra & Lam', duration: '55 mins', type: 'video' },
      { id: 10, title: 'Practical Tajweed Recitation Evaluation & Ijazah Preparation', duration: '80 mins', type: 'practice' }
    ]
  },
  {
    id: 'namaz',
    title: 'Namaz (Salah) Learning & Duas',
    arabicTitle: 'تعليم الصلاة والأذكار',
    level: 'Beginners / Kids / Reverts / Adults',
    duration: '4 - 6 Weeks',
    lessonsCount: 16,
    rating: 5.0,
    enrolledCount: 2150,
    tag: 'Essential Daily',
    description: 'Comprehensive step-by-step guidance on how to perform Salah according to Sunnah. Includes Wudu, Fard, Sunnah, Nafl, Janazah prayer, and word-by-word Arabic translations.',
    icon: 'Compass',
    featured: true,
    syllabus: [
      { id: 1, title: 'Taharah: Proper Step-by-Step Wudu & Tayammum', duration: '35 mins', type: 'video' },
      { id: 2, title: 'Conditions of Prayer (Shuroot as-Salah) & Facing the Qibla', duration: '30 mins', type: 'video' },
      { id: 3, title: 'Takbeerat-ul-Ihram, Qiyam & Sana with Word-by-Word Meaning', duration: '45 mins', type: 'video' },
      { id: 4, title: 'Ruku (Bowing), Tasbeeh & Standing Up (Qawmah)', duration: '40 mins', type: 'video' },
      { id: 5, title: 'Sujood (Prostration), Sitting Between Two Sujoods (Jalsah)', duration: '45 mins', type: 'video' },
      { id: 6, title: 'Tashahhud (At-Tahiyyat), Durood-e-Ibrahim & Dua-e-Masoora', duration: '55 mins', type: 'video' },
      { id: 7, title: 'Tasleem & Post-Salah Authentic Sunnah Azkar', duration: '35 mins', type: 'video' },
      { id: 8, title: 'Understanding 2, 3, and 4 Rakat Prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)', duration: '50 mins', type: 'video' },
      { id: 9, title: 'Witr Prayer & Dua-e-Qunoot (Arabic, Transliteration, Urdu/English)', duration: '45 mins', type: 'video' },
      { id: 10, title: 'Namaz-e-Janazah (Funeral Prayer) & Sajdah-e-Sahw Rules', duration: '50 mins', type: 'video' }
    ]
  },
  {
    id: 'daily-duas',
    title: 'Daily Duas & Authentic Azkar',
    arabicTitle: 'الأدعية اليومية والأذكار المأثورة',
    level: 'All Ages',
    duration: 'Ongoing',
    lessonsCount: 24,
    rating: 4.92,
    enrolledCount: 1870,
    tag: 'Spiritual Shield',
    description: 'Learn essential Masnoon supplications for every aspect of life from Hisn-ul-Muslim (Fortress of the Muslim). Complete with clear audio recitation, Arabic script, transliteration, and Urdu/English translation.',
    icon: 'HeartHandshake',
    featured: true,
    syllabus: [
      { id: 1, title: 'Waking Up & Sleeping Duas with Sunnah Etiquettes', duration: '30 mins', type: 'video' },
      { id: 2, title: 'Morning & Evening Comprehensive Adhkar (Azkar-e-Sabah wal Masa)', duration: '60 mins', type: 'video' },
      { id: 3, title: 'Duas for Leaving & Entering Home and Masjid', duration: '35 mins', type: 'video' },
      { id: 4, title: 'Duas for Eating, Drinking, and Dining Etiquette', duration: '30 mins', type: 'video' },
      { id: 5, title: 'Duas for Travel, Riding, and Starting Journeys', duration: '40 mins', type: 'video' },
      { id: 6, title: 'Protection from Anxiety, Distress, Evil Eye & Illness (Ruqyah)', duration: '55 mins', type: 'video' },
      { id: 7, title: 'Istighfar (Sayyid-ul-Istighfar) & Seeking Forgiveness', duration: '40 mins', type: 'video' },
      { id: 8, title: 'Duas for Parents, Family & Righteous Offspring', duration: '35 mins', type: 'video' }
    ]
  },
  {
    id: 'islamic-books',
    title: 'Curated Islamic Books & Classical Texts',
    arabicTitle: 'المكتبة الإسلامية والكتب النافعة',
    level: 'Students & Seekers of Knowledge',
    duration: 'Self-Paced',
    lessonsCount: 20,
    rating: 4.88,
    enrolledCount: 760,
    tag: 'Authentic Library',
    description: 'Explore authentic classical and contemporary Islamic texts covering Aqeedah (creed), Seerah of Prophet Muhammad (ﷺ), Hadith collections (40 Hadith of Imam Nawawi), and Islamic ethics with interactive reading and PDF resources.',
    icon: 'Library',
    featured: true,
    syllabus: [
      { id: 1, title: 'The Foundations of Islamic Faith: Aqeedah At-Tahawiyyah Overview', duration: '60 mins', type: 'reading' },
      { id: 2, title: 'An-Nawawi’s Forty Hadith: Hadiths 1 to 10 (Intentions to Halal/Haram)', duration: '75 mins', type: 'reading' },
      { id: 3, title: 'An-Nawawi’s Forty Hadith: Hadiths 11 to 25 (Faith, Advice, Character)', duration: '80 mins', type: 'reading' },
      { id: 4, title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum): Early Life of the Prophet (ﷺ)', duration: '90 mins', type: 'reading' },
      { id: 5, title: 'The Sealed Nectar: The Makkan Period & Dawah Milestones', duration: '90 mins', type: 'reading' },
      { id: 6, title: 'The Sealed Nectar: The Hijrah & Madinah Statehood', duration: '95 mins', type: 'reading' },
      { id: 7, title: 'Riyad as-Salihin (Gardens of the Righteous): Selected Adab & Manners', duration: '70 mins', type: 'reading' },
      { id: 8, title: 'Islamic Jurisprudence (Fiqh) Made Easy: Purification & Worship', duration: '85 mins', type: 'reading' }
    ]
  },
  {
    id: 'tafheem-ul-quran',
    title: 'Tafheem-ul-Quran (Thematic Tafseer)',
    arabicTitle: 'تفهيم القرآن والتفسير الموضوعي',
    level: 'Intermediate to Advanced',
    duration: '6 - 12 Months',
    lessonsCount: 36,
    rating: 4.97,
    enrolledCount: 1130,
    tag: 'Deep Understanding',
    description: 'Delve into the meanings, historical context (Asbab al-Nuzul), guidance, and contemporary relevance of the Quran. Connect with the living message of Allah through thematic analysis.',
    icon: 'Flame',
    featured: true,
    syllabus: [
      { id: 1, title: 'Introduction to Tafseer Sciences & Principles of Quranic Exegesis', duration: '60 mins', type: 'video' },
      { id: 2, title: 'Surah Al-Fatiha: The Mother of the Quran & Opening Covenant', duration: '75 mins', type: 'video' },
      { id: 3, title: 'Surah Al-Baqarah: Guidance for the Believing Community & Core Commandments', duration: '90 mins', type: 'video' },
      { id: 4, title: 'Ayat al-Kursi: The Verse of Majesty & Divine Attributes', duration: '60 mins', type: 'video' },
      { id: 5, title: 'Surah Yaseen: The Heart of the Quran & Realities of Resurrection', duration: '80 mins', type: 'video' },
      { id: 6, title: 'Surah Al-Kahf: The 4 Trials (Faith, Wealth, Knowledge, Power)', duration: '90 mins', type: 'video' },
      { id: 7, title: 'Surah Ar-Rahman: Recognizing the Countless Favors of Allah', duration: '70 mins', type: 'video' },
      { id: 8, title: 'Surah Al-Mulk: Salvation from Grave Torment & Reflection on Creation', duration: '65 mins', type: 'video' },
      { id: 9, title: 'Juz Amma (Short Surahs): Thematic Focus on Tawheed & Hereafter', duration: '85 mins', type: 'video' },
      { id: 10, title: 'Practical Application of Quranic Commands in Modern Daily Life', duration: '75 mins', type: 'video' }
    ]
  }
];

export const DAILY_DUAS_LIST = [
  {
    id: 1,
    category: 'Morning & Evening',
    title: 'Sayyid-ul-Istighfar (The Master of Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana abduka, wa ana \'ala \'ahdika wa wa\'dika ma istata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya, wa abu\'u bidhanbi faghfir li, fa-innahu la yaghfiru adh-dhunuba illa Anta.',
    english: 'O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I remain upon Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for indeed none can forgive sins except You.',
    urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی استطاعت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں، مجھ پر تیری جو نعمتیں ہیں ان کا اقرار کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں۔ پس مجھے بخش دے، کیونکہ تیرے سوا گناہوں کو کوئی نہیں بخش سکتا۔',
    reference: 'Sahih al-Bukhari 6306',
    reward: 'Whoever recites this with conviction during the morning and dies before evening will be among the people of Paradise; and whoever recites it in the evening and dies before morning will be among the people of Paradise.'
  },
  {
    id: 2,
    category: 'Protection',
    title: 'Protection from Every Harm',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma\'as-mihi shay\'un fil-ardi wa la fis-sama\'i wa Huwas-Sami\'ul-\'Alim.',
    english: 'In the Name of Allah, with Whose Name nothing upon the earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.',
    urdu: 'اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہ خوب سننے والا، سب کچھ جاننے والا ہے۔',
    reference: 'Sunan Abi Dawud 5088, Jami` at-Tirmidhi 3388',
    reward: 'Recited 3 times morning and evening: Nothing will harm the reciter.'
  },
  {
    id: 3,
    category: 'Knowledge',
    title: 'Dua for Increase in Knowledge',
    arabic: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni \'ilma.',
    english: 'My Lord! Increase me in beneficial knowledge.',
    urdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
    reference: 'Surah Taha (20:114)',
    reward: 'Taught directly by Allah to Prophet Muhammad (ﷺ).'
  },
  {
    id: 4,
    category: 'Anxiety & Debt',
    title: 'Relief from Anxiety, Sorrow & Debt',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazani, wal-\'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala\'id-dayni wa ghalabatir-rijal.',
    english: 'O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice, and from being overpowered by debt and being dominated by men.',
    urdu: 'اے اللہ! میں غم و اندوہ، عاجزی اور سستی، بخل اور بزدلی، قرض کے بوجھ اور لوگوں کے تسلط سے تیری پناہ مانگتا ہوں۔',
    reference: 'Sahih al-Bukhari 2893',
    reward: 'Daily sunnah protection against mental distress and financial difficulty.'
  },
  {
    id: 5,
    category: 'Sleep',
    title: 'Dua Before Sleeping',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allahumma amutu wa ahya.',
    english: 'In Your Name, O Allah, I die and I live.',
    urdu: 'اے اللہ! تیرے ہی نام کے ساتھ میں مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں۔',
    reference: 'Sahih al-Bukhari 6312',
    reward: 'Entrusting one\'s soul to Allah during sleep.'
  },
  {
    id: 6,
    category: 'Sleep',
    title: 'Dua Upon Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Al-hamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur.',
    english: 'All praise is due to Allah, Who gave us life after giving us death, and unto Him is the resurrection.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا، اور اسی کی طرف اٹھ کر جانا ہے۔',
    reference: 'Sahih al-Bukhari 6314',
    reward: 'Gratitude for the blessing of a new day of life.'
  }
];

export const ISLAMIC_BOOKS_CATALOG = [
  {
    id: 'fortress-of-muslim',
    title: 'Hisn-ul-Muslim (Fortress of the Muslim)',
    author: 'Sa\'id bin Wahf Al-Qahtani',
    category: 'Duas & Adhkar',
    pages: 220,
    coverColor: '#6D28D9',
    language: 'Arabic with English & Urdu Translation',
    description: 'The world-famous collection of authentic daily supplications extracted from the Quran and Sunnah, categorized for every daily routine.',
    pdfUrl: '#',
    rating: 4.98
  },
  {
    id: 'nawawi-40-hadith',
    title: 'The Forty Hadith of Imam Nawawi',
    author: 'Imam Yahya ibn Sharaf an-Nawawi',
    category: 'Hadith',
    pages: 140,
    coverColor: '#4C1D95',
    language: 'Arabic & English',
    description: 'A timeless compilation of forty-two essential hadiths capturing the very essence and pillars of Islamic belief, ethics, and jurisprudence.',
    pdfUrl: '#',
    rating: 5.0
  },
  {
    id: 'sealed-nectar',
    title: 'Ar-Raheeq Al-Makhtum (The Sealed Nectar)',
    author: 'Safiur Rahman Al-Mubarakpuri',
    category: 'Seerah (Prophetic Biography)',
    pages: 580,
    coverColor: '#F2C94C',
    language: 'English & Urdu',
    description: 'Award-winning authoritative biography of Prophet Muhammad (ﷺ), tracing his noble life from lineage to the final farewell pilgrimage.',
    pdfUrl: '#',
    rating: 4.96
  },
  {
    id: 'riyad-as-salihin',
    title: 'Riyad as-Salihin (Gardens of the Righteous)',
    author: 'Imam an-Nawawi',
    category: 'Hadith & Adab',
    pages: 820,
    coverColor: '#6D28D9',
    language: 'English & Urdu',
    description: 'A comprehensive guide to moral conduct, personal character, sincerity, prayer, and family life through authenticated hadith traditions.',
    pdfUrl: '#',
    rating: 4.95
  }
];

export const PRAYER_CALCULATION_METHODS = [
  { id: 1, name: 'University of Islamic Sciences, Karachi (Hanafi)' },
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 3, name: 'Muslim World League (MWL)' },
  { id: 4, name: 'Umm Al-Qura University, Makkah' },
  { id: 5, name: 'Egyptian General Authority of Survey' },
  { id: 12, name: 'Union Des Organisations Islamiques De France (UOIF)' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı (Turkey)' }
];

export const DEFAULT_CITIES = [
  { name: 'Karachi', country: 'Pakistan', flag: '🇵🇰' },
  { name: 'Lahore', country: 'Pakistan', flag: '🇵🇰' },
  { name: 'Islamabad', country: 'Pakistan', flag: '🇵🇰' },
  { name: 'Makkah', country: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Madinah', country: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'London', country: 'United Kingdom', flag: '🇬🇧' },
  { name: 'New York', country: 'United States', flag: '🇺🇸' },
  { name: 'Toronto', country: 'Canada', flag: '🇨🇦' },
  { name: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Istanbul', country: 'Turkey', flag: '🇹🇷' },
  { name: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾' },
  { name: 'Sydney', country: 'Australia', flag: '🇦🇺' }
];

export const ISLAMIC_PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free Trial',
    badge: 'Starter',
    price: '$0',
    billing: '7 Days Free Access',
    description: 'Experience authentic Quran learning with access to introductory lessons and full prayer times.',
    features: [
      'Access to first 3 Noorani Qaida lessons',
      'Daily Duas & Azkar library with audio',
      'Real-time Global Prayer Times & countdown',
      'Community discussion board',
      'Basic Quran reading guide'
    ],
    highlight: false,
    cta: 'Start Free Trial'
  },
  {
    id: 'monthly',
    name: 'Standard Monthly',
    badge: 'Most Popular',
    price: '$15',
    billing: 'billed monthly',
    description: 'Full live access to all courses, personalized Tajweed evaluations, and authenticated Islamic books.',
    features: [
      'Full access to all 6 Specialized Courses (No Hifz)',
      'Quran Reading, Nazra & Complete Tajweed',
      'Step-by-step Namaz Masterclass with Audio',
      'Tafheem-ul-Quran Surah-by-Surah study',
      'Full digital Islamic Books & PDF downloads',
      '1-on-1 Teacher recitation reviews (monthly)',
      'Certificate of course completion'
    ],
    highlight: true,
    cta: 'Enroll Monthly'
  },
  {
    id: 'yearly',
    name: 'Yearly Family Plan',
    badge: 'Best Value (Save 33%)',
    price: '$120',
    billing: '$10/month billed annually',
    description: 'Comprehensive family Quran learning with priority teacher sessions and all course updates.',
    features: [
      'Everything in the Standard Monthly Plan',
      'Up to 3 Student profiles on one account',
      'Unlimited lesson bookmarks & progress saving',
      'Dedicated weekly Tajweed feedback & grading',
      'Direct WhatsApp teacher consultation access',
      'Lifetime downloadable PDF study notes',
      'Annual verified Ijazah / Completion Certificate'
    ],
    highlight: false,
    cta: 'Enroll Yearly'
  }
];

export const ISLAMIC_FAQS = [
  {
    q: 'Can beginners with zero Arabic knowledge learn Quran reading here?',
    a: 'Yes, absolutely! Our Quran Reading & Nazra course starts from the absolute fundamentals with Noorani Qaida, teaching correct recognition, articulation points, and vowel joins step-by-step.'
  },
  {
    q: 'Why is there no Hifz-ul-Quran (memorization) course listed?',
    a: 'Our curriculum focuses purely on foundational understanding, fluent Nazra reading, precise Tajweed pronunciation, Salah (Namaz) mastery, daily Duas, Islamic classical books, and Tafheem-ul-Quran. We deliberately do not offer full Hifz to keep our focus dedicated to quality recitation and comprehension.'
  },
  {
    q: 'How accurate are the prayer times displayed on the platform?',
    a: 'Our prayer times are calculated dynamically in real-time using the globally recognized AlAdhan API with official calculation methods (such as Karachi, ISNA, Umm al-Qura). You can select your city or use your device geolocation for exact local timings with zero hardcoding.'
  },
  {
    q: 'Are the lessons live or recorded?',
    a: 'We offer interactive structured self-paced modules with audio, video, and PDF resources, complemented by live teacher evaluations for enrolled students.'
  },
  {
    q: 'Can female students request female Quran teachers?',
    a: 'Yes. We have certified female and male Quran teachers who hold authentic Sanad and Ijazah in Tajweed and Quran recitation.'
  }
];
