import React, { useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

const Contact = ({ setActiveTab, selectedPlan }) => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: selectedPlan || 'Standard ($180)',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7a1a', '#ffb347', '#eaa487', '#ffffff'],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, message: t('contact.btnSending') });

    try {
      // 1. Backend /api/contact endpoint (sends to Web3Forms + saves to MongoDB Atlas!)
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          plan: formData.plan,
          message: formData.message,
          subject: `New Project Inquiry from ${formData.name} (${formData.plan})`,
        }),
      });

      if (response.ok) {
        setStatus({
          submitting: false,
          message: t('contact.successMsg'),
        });
        triggerConfetti();
        setFormData({ name: '', email: '', phone: '', plan: 'Standard ($180)', message: '' });
        return;
      }
      throw new Error('Backend offline');
    } catch (err) {
      // 2. Direct Web3Forms submission
      try {
        const fallbackRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: 'ad131140-827b-407f-a476-5afd66b1fa0b',
            name: formData.name,
            email: formData.email,
            subject: `Project inquiry: ${formData.plan}`,
            message: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPlan: ${formData.plan}\n\n${formData.message}`,
          }),
        });

        if (fallbackRes.ok) {
          setStatus({
            submitting: false,
            message: t('contact.successMsg'),
          });
          triggerConfetti();
          setFormData({ name: '', email: '', phone: '', plan: 'Standard ($180)', message: '' });
          return;
        }
      } catch (backupErr) {
        console.warn('Backup form submission error:', backupErr);
      }

      // 3. Fallback to client mailto
      const mailtoSubject = encodeURIComponent(`Project inquiry: ${formData.plan}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPlan: ${formData.plan}\n\n${formData.message}`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

      setStatus({
        submitting: false,
        message: t('contact.successMsg'),
      });
      triggerConfetti();
    }
  };

  return (
    <section className="pt-24 pb-24 page-enter">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Top Breadcrumb & Close Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#33271f]">
          <div className="flex items-center gap-2 text-sm text-[#bcab9e]">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-[#ff7a1a] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('contact.backOverview')}</span>
            </button>
            <span>/</span>
            <span className="text-[#ff7a1a]">{t('contact.title')}</span>
          </div>

          <button
            onClick={() => setActiveTab('home')}
            className="p-2 rounded-full bg-[#1b1411] border border-[#33271f] text-gray-300 hover:text-white hover:border-[#ff7a1a] transition-all flex items-center gap-1 text-xs cursor-pointer"
            title="Close page"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{t('contact.close')}</span>
          </button>
        </div>

        {/* Title Header */}
        <div className="reveal-up mb-10">
          <h1 className="font-heading font-extrabold text-white text-[clamp(34px,5vw,60px)] leading-[1.08] mb-4">
            {t('contact.title')}
          </h1>
          <p className="lead">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Two-Column Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form Column */}
          <div className="reveal-up lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-[600px]">
              
              <div>
                <label className="block font-semibold text-sm text-[#f7ede3] mb-1.5">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] border-[#33271f] text-white focus:outline-none focus:border-[#ff7a1a] transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-sm text-[#f7ede3] mb-1.5">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] border-[#33271f] text-white focus:outline-none focus:border-[#ff7a1a] transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-sm text-[#f7ede3] mb-1.5">
                  {t('contact.phoneLabel')}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.phonePlaceholder')}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] border-[#33271f] text-white focus:outline-none focus:border-[#ff7a1a] transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-sm text-[#f7ede3] mb-1.5">
                  {t('contact.planLabel')}
                </label>
                <input
                  type="text"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] border-[#33271f] text-white focus:outline-none focus:border-[#ff7a1a] transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-sm text-[#f7ede3] mb-1.5">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  name="message"
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] border-[#33271f] text-white focus:outline-none focus:border-[#ff7a1a] transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={status.submitting}
                className="glow-btn px-7 py-3 rounded-[40px] text-base font-bold cursor-pointer disabled:opacity-50"
              >
                {status.submitting ? t('contact.btnSending') : t('contact.btnSend')}
              </button>

              {status.message && (
                <div className="text-[#ff7a1a] font-semibold min-h-[24px] pt-1">
                  {status.message}
                </div>
              )}

            </form>
          </div>

          {/* Right Get in touch Column */}
          <div className="reveal-up lg:col-span-5">
            <div className="glass-card p-6 sm:p-8 rounded-[18px]">
              <h3 className="font-heading font-bold text-[21px] text-white mb-4">
                {t('contact.directChannels')}
              </h3>

              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#241712] border border-[#33271f] text-[#ff7a1a] mb-5">
                🟢 {t('contact.availableBadge')}
              </div>

              <p className="text-[16px] text-[#bcab9e] leading-[1.8] space-y-2">
                <div>
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Email:</strong>
                  <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-[#ff7a1a] transition-colors">
                    {personalInfo.email}
                  </a>
                </div>

                <div className="pt-2">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Phone:</strong>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-white hover:text-[#ff7a1a] transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>

                <div className="pt-2">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">WhatsApp:</strong>
                  <a href={personalInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#ff7a1a] hover:underline">
                    Chat on WhatsApp (Fast response)
                  </a>
                </div>

                <div className="pt-2">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Fiverr:</strong>
                  <a href={personalInfo.fiverrUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff7a1a] transition-colors">
                    Fiverr Pro Profile
                  </a>
                </div>

                <div className="pt-2">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Location & Response:</strong>
                  <span>{t('contact.location')}</span>
                  <br />
                  <span className="text-xs text-[#bcab9e]">{t('contact.responseRate')}</span>
                </div>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;