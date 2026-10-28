// EDIT HERE: schedule, prices, currency, form endpoint, FAQ answers.
export const CONFIG = {
  formEndpoint: '',          // your existing contact/admission API URL
  currency: '$',              // e.g. 'USD'
  classDuration: '30–45 mins (Depends on student level & lesson topic)',
  schedule: {                // days: ['Mon','Tue',...]
    daily: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      time: 'Flexible 24/7 Slots',
      timeNote: 'Customized to your schedule',
      duration: '30–45 mins',
      durationNote: 'Depends on student level & lesson topic',
      tz: 'Global / Worldwide',
      tzNote: 'All international timezones',
    },
    weekend: {
      days: ['Sat', 'Sun'],
      time: 'Flexible Weekend Slots',
      timeNote: 'Customized to your schedule',
      duration: '30–45 mins',
      durationNote: 'Depends on student level & lesson topic',
      tz: 'Global / Worldwide',
      tzNote: 'All international timezones',
    },
  },
  plans: {
    monthly: 35,
  },
  classes: {
    monthly: '3 to 4 classes / week',
    weekend: '2 classes / week',
  },
};

// These are the SEVEN LEARNING AREAS of your single comprehensive program
export const COURSES = [
  ['Quran Tilawat', 'Recite the Quran with a calm, steady flow, with gentle correction and Makharij guidance from your tutor.'],
  ['Nazra Quran', 'Read the Quran from the Mushaf accurately, step by step, building confidence and fluency through regular practice.'],
  ['Tajweed and Quran Reading Rules', 'Understand and apply the authentic rules of Tajweed and correct pronunciation during recitation.'],
  ['Daily Duas', 'Learn authentic Sunnah supplications for morning, evening, eating, sleeping and daily life in easy lessons.'],
  ['Namaz Learning', 'Master the complete method of Salah, with correct postures, Arabic recitations, meanings, and practical steps.'],
  ['Islamic Books', 'Study foundational Islamic literature and essential religious knowledge with clear, age-appropriate explanations.'],
  ['Islamic Etiquettes', 'Adopt the noble character, respect, and day-to-day manners (Adab) taught in the Sunnah of the Prophet ﷺ.'],
];

export const PAL = [
  ['linear-gradient(135deg,#7c52df,#b695ff)', '#fff'],
  ['#fff2c7', '#3a2a00'],
  ['#e8dcff', '#2a1a5e'],
  ['#ffffff', '#2a1a5e'],
  ['linear-gradient(135deg,#3c2282,#5e2fce)', '#fff'],
  ['linear-gradient(135deg,#fff8dc,#ffe8f3)', '#4a1f4a'],
  ['linear-gradient(135deg,#d8caff,#f3eeff)', '#2a1a5e'],
];

export const FAQ = [
  ['What will I learn in this program?', 'We offer one comprehensive Islamic program that covers all seven essential learning areas: Quran Tilawat, Nazra Quran, Tajweed and Quran Reading Rules, Daily Duas, Namaz Learning, Islamic Books, and Islamic Etiquettes—all taught together in personalized classes.'],
  ['What are the fees for this program?', 'Our standard all-inclusive package is $35 / month with a 3-Day Free Trial included. Sibling discounts, custom schedules, and financial concessions are readily available—feel free to reach out directly on WhatsApp (+92 321 7812265).'],
  ['How does the 3-Day Free Trial work?', 'You or your child can attend 3 one-on-one classes completely free with a dedicated tutor. No credit card or upfront payment is required. You only enroll if you are 100% satisfied with the teacher.'],
  ['Are female tutors available?', 'Yes, we have certified and patient female Quran tutors for sisters, young girls, and children, as well as qualified male tutors.'],
  ['When are classes held and in which timezones?', 'Classes are 1-on-1 and scheduled according to your personal availability 24/7 across Global / Worldwide timezones.'],
  ['How do I get started?', 'Simply submit the admission form on this page or send a message on WhatsApp (+92 321 7812265). We will connect with you right away to schedule your free trial.'],
];
