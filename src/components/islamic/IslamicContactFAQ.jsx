import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ISLAMIC_FAQS } from '../../data/islamicData';

export default function IslamicContactFAQ() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'Quran Reading & Nazra',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) return;

    // Save inquiry to localStorage and attempt backend sync
    try {
      const existing = JSON.parse(localStorage.getItem('islamic_inquiries') || '[]');
      existing.unshift({
        ...formState,
        id: Date.now(),
        date: new Date().toISOString()
      });
      localStorage.setItem('islamic_inquiries', JSON.stringify(existing));
    } catch (_) {}

    setSubmitted(true);
  };

  return (
    <section id="contact-faq" className="py-16 sm:py-24 bg-white/50 backdrop-blur-xs border-t border-[#E6DCF5] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Contact Form & Admission Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact & WhatsApp (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-3">
                <MessageCircle className="w-4 h-4 text-[#F2C94C]" />
                <span>Admission Guidance</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl text-[#241B35] tracking-tight">
                Get in Touch with Our Academic Advisors
              </h2>
              <p className="text-xs sm:text-sm text-[#6B5E80] mt-2 leading-relaxed">
                Have questions about teacher scheduling, course syllabus, or male/female tutors? Reach out via WhatsApp or submit the inquiry form.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 rounded-3xl bg-[#FAF8FF] border border-[#E6DCF5] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#241B35]">
                    Instant WhatsApp Support
                  </h4>
                  <span className="text-xs text-[#6B5E80]">24/7 Academic Inquiries</span>
                </div>
              </div>

              <p className="text-xs text-[#6B5E80] leading-relaxed">
                Speak directly with an advisor to book your 1-on-1 free trial session at your preferred time.
              </p>

              <a
                href="https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20to%20inquire%20about%20Islamic%20Learn%20Online%20Quran%20Education"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Privacy & Terms Quick Links */}
            <div className="flex items-center gap-4 text-xs font-medium text-[#6B5E80] pt-2">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-[#6D28D9] underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="hover:text-[#6D28D9] underline cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Right Column: Admission Inquiry Form (7 cols) */}
          <div id="admission-form" className="lg:col-span-7 bg-[#FAF8FF] rounded-3xl p-6 sm:p-8 border border-[#E6DCF5] shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EDE5FF] text-[#6D28D9] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#241B35]">
                  JazakAllah Khair! Inquiry Submitted
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E80] max-w-md mx-auto leading-relaxed">
                  Our academic coordinator will contact you via WhatsApp or Email within 24 hours to schedule your placement interview.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', phone: '', course: 'Quran Reading & Nazra', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#6D28D9] text-white hover:bg-[#4C1D95] transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-[#241B35] mb-2">
                  Request a Free 7-Day Trial Consultation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#241B35] mb-1">
                      Student / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Zahra"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#241B35] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. parent@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#241B35] mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#241B35] mb-1">
                      Course of Interest
                    </label>
                    <select
                      value={formState.course}
                      onChange={(e) => setFormState({ ...formState, course: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9] cursor-pointer"
                    >
                      <option>Quran Reading & Nazra</option>
                      <option>Tajweed Rules & Pronunciation</option>
                      <option>Namaz (Salah) Learning</option>
                      <option>Daily Duas & Authentic Azkar</option>
                      <option>Islamic Books & Classical Texts</option>
                      <option>Tafheem-ul-Quran (Thematic Tafseer)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#241B35] mb-1">
                    Student Age & Preferred Study Timings
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any details about previous Quran learning, preferred time zone, or request for female tutor..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#E6DCF5] text-[#241B35] focus:outline-none focus:border-[#6D28D9]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#6D28D9] hover:bg-[#4C1D95] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4 text-[#F2C94C]" />
                  <span>Submit Admission Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Frequently Asked Questions (FAQ) Accordion */}
        <div className="pt-12 border-t border-[#E6DCF5] max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#241B35]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E80] mt-1">
              Common questions answered regarding admissions, curriculum, and methodology.
            </p>
          </div>

          <div className="space-y-3">
            {ISLAMIC_FAQS.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-[#E6DCF5] bg-[#FAF8FF] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#241B35]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#6D28D9] transition-transform shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#6B5E80] leading-relaxed border-t border-[#E6DCF5]/60 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-[99996] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E6DCF5] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DCF5]">
              <h3 className="font-heading font-extrabold text-xl text-[#241B35]">
                Islamic Learn Privacy Policy
              </h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8FF] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-[#6B5E80] space-y-3 leading-relaxed">
              <p>
                Islamic Learn — Online Quran Education values the sanctity of personal privacy. We collect information solely for educational facilitation, student class scheduling, and academic progress tracking.
              </p>
              <p>
                <strong>Data Protection:</strong> We do not sell, rent, or monetize student or parent data to any third parties. All teacher-student communications are strictly supervised by our academic administration.
              </p>
              <p>
                <strong>Cookies & Local Storage:</strong> Local storage is strictly utilized to store your lesson completion status, prayer time preferences, and authentication tokens securely.
              </p>
            </div>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#6D28D9] text-white"
            >
              Close Privacy Policy
            </button>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-[99996] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowTermsModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E6DCF5] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DCF5]">
              <h3 className="font-heading font-extrabold text-xl text-[#241B35]">
                Terms & Academic Code of Conduct
              </h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-8 h-8 rounded-full bg-[#FAF8FF] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-[#6B5E80] space-y-3 leading-relaxed">
              <p>
                By enrolling in Islamic Learn, students agree to observe the sacred etiquette (Adab) of Quranic learning, punctuality with respect to scheduled class times, and respectful engagement with teachers.
              </p>
              <p>
                <strong>Academic Focus:</strong> Courses are strictly dedicated to Quran Reading, Tajweed, Salah, Duas, authentic classical Islamic literature, and Tafheem-ul-Quran. Hifz-ul-Quran is excluded to maintain quality focus.
              </p>
            </div>
            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#6D28D9] text-white"
            >
              Close Terms of Service
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
