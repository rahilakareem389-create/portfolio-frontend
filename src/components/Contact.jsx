import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { sendWeb3FormsNotification } from '../utils/web3forms';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

const Contact = ({ setActiveTab, selectedPlan }) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser ? (currentUser.name || currentUser.displayName || '') : '',
    email: currentUser ? (currentUser.email || '') : '',
    phone: '',
    plan: selectedPlan || 'Standard ($180)',
    message: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || currentUser.displayName || '',
        email: currentUser.email || prev.email || '',
      }));
    }
  }, [currentUser]);

  const [status, setStatus] = useState({
    submitting: false,
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
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
    const newErrors = {};

    const cleanName = (formData.name || '').trim();
    const cleanEmail = (formData.email || '').trim().toLowerCase();
    const cleanPhone = (formData.phone || '').trim();
    const cleanMessage = (formData.message || '').trim();

    // 1. Real Name Validation
    if (!cleanName || cleanName.length < 2) {
      newErrors.name = 'Please enter your real full name (at least 2 characters).';
    }

    // 2. Real Email Validation (rejects fake/dummy domains)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid, active email address.';
    } else if (/@(example\.com|test\.com|fake\.com|none\.com|sample\.com)$/i.test(cleanEmail)) {
      newErrors.email = 'Please provide your actual working email address, not a dummy or test domain.';
    }

    // 3. Real Phone Validation (if entered, must be valid phone digits)
    if (cleanPhone) {
      const digitsOnly = cleanPhone.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        newErrors.phone = 'Please enter a valid phone or WhatsApp number with country code (e.g. +92 321 7812265).';
      }
    }

    // 4. Real Message Requirement
    if (!cleanMessage || cleanMessage.length < 10) {
      newErrors.message = 'Please provide at least 10 characters detailing your project requirements.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus({ submitting: true, message: t('contact.btnSending') });

    // Always dispatch directly to Web3Forms from browser so it appears in Web3Forms dashboard
    sendWeb3FormsNotification({
      type: 'Project Inquiry',
      subject: `[New Inquiry] ${cleanName} - ${formData.plan}`,
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      details: {
        clientName: cleanName,
        clientEmail: cleanEmail,
        phoneNumber: cleanPhone || 'Not specified',
        selectedPlan: formData.plan,
        inquiryMessage: cleanMessage
      }
    });

    try {
      // 1. Backend /api/contact endpoint (saves to MongoDB Atlas / JSON)
      const token = localStorage.getItem('rahila_auth_token') || '';
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          plan: formData.plan,
          message: cleanMessage,
          subject: `New Project Inquiry from ${cleanName} (${formData.plan})`,
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
            <form onSubmit={handleSubmit} className="space-y-4 max-w-[640px]">
              
              {/* Row 1: 2 Columns (Name & Email) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] ${
                      errors.name ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#33271f] focus:border-[#ff7a1a]'
                    } text-white focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>⚠</span> {errors.name}
                    </p>
                  )}
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
                    className={`w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] ${
                      errors.email ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#33271f] focus:border-[#ff7a1a]'
                    } text-white focus:outline-none transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>⚠</span> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: 2 Columns (Phone & Package) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] ${
                      errors.phone ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#33271f] focus:border-[#ff7a1a]'
                    } text-white focus:outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <span>⚠</span> {errors.phone}
                    </p>
                  )}
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
              </div>

              {/* Full Width: Message & Details */}
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
                  className={`w-full px-4 py-3 rounded-[12px] bg-[#1b1411] border-[1.5px] ${
                    errors.message ? 'border-rose-500/80 focus:border-rose-400' : 'border-[#33271f] focus:border-[#ff7a1a]'
                  } text-white focus:outline-none transition-colors resize-y`}
                />
                {errors.message && (
                  <p className="text-rose-400 text-xs mt-1.5 font-medium flex items-center gap-1">
                    <span>⚠</span> {errors.message}
                  </p>
                )}
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

              <div className="text-[16px] text-[#bcab9e] leading-[1.8] space-y-4">
                <div>
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Official Email:</strong>
                  <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-[#ff7a1a] transition-colors font-medium">
                    {personalInfo.email}
                  </a>
                  <span className="text-xs text-[#8a7569] block mt-0.5">
                    Secondary: <a href="mailto:rahilakareem389@gmail.com" className="text-[#e2d5cb] hover:underline">rahilakareem389@gmail.com</a>
                  </span>
                </div>

                <div className="pt-1">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Phone:</strong>
                  <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-white hover:text-[#ff7a1a] transition-colors font-medium">
                    {personalInfo.phone}
                  </a>
                </div>

                <div className="pt-1">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">WhatsApp:</strong>
                  <a href={personalInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#ff7a1a] hover:underline font-semibold flex items-center gap-1.5">
                    <span>Chat on WhatsApp (+92 321 7812265)</span>
                  </a>
                </div>

                <div className="pt-1">
                  <strong className="text-white block text-xs uppercase text-[#eaa487]">Location & Response:</strong>
                  <span className="text-[#e2d5cb]">{t('contact.location')}</span>
                  <br />
                  <span className="text-xs text-[#bcab9e]">{t('contact.responseRate')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;