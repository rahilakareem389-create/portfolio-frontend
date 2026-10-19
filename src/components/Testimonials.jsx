import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  User,
  Plus,
  Lock,
  ArrowRight,
  X,
  ExternalLink,
  Award,
  Globe,
  Check,
  HelpCircle,
  Send,
  ChevronDown,
  Mail,
  MapPin,
  Upload,
  Camera
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { defaultReviews } from '../data/defaultReviews';
import { defaultFaqs } from '../data/defaultFaqs';
import { sendWeb3FormsNotification } from '../utils/web3forms';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

export default function Testimonials({ setActiveTab, setSelectedPlan }) {
  const { currentUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRequiredReason, setAuthRequiredReason] = useState('write_review'); // 'write_review' | 'ask_question'
  // Reviews state (real Google & verified client reviews only)
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_portfolio_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Wipe legacy mock dummy entries
        const clean = (parsed || []).filter(
          (r) =>
            !['Marcus Vance', 'Sophia Al-Mansoor', 'David Miller', 'Elena Rostova', 'Tariq Mehmood', 'Sarah Jenkins', 'Alexander Wright'].includes(r.name)
        );
        if (clean && clean.length > 0) {
          return clean;
        }
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultReviews;
  });

  // FAQs state (real authentic FAQs)
  const [faqs, setFaqs] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_portfolio_faqs');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.filter(
          (f) => !['Marcus Vance', 'Sophia Al-Mansoor', 'David Miller', 'Tariq Mehmood', 'Sarah Jenkins'].includes(f.askedBy)
        );
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultFaqs;
  });

  // Engaged users state (real active users only)
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_portfolio_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.filter(
          (u) => !['Marcus Vance', 'Sophia Al-Mansoor', 'David Miller'].includes(u.name)
        );
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return [];
  });

  // Active View Tab: 'reviews' | 'faqs'
  const [activeSection, setActiveSection] = useState('reviews');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Modals state
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);
  const [isAskQuestionModalOpen, setIsAskQuestionModalOpen] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState({});

  const toggleReply = (id) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };


  // Review Form
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    role: '',
    service: 'Complete SEO Strategy',
    rating: 5,
    title: '',
    message: '',
    avatar: ''
  });
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState(null);

  // Avatar Image Upload & Lightweight Canvas Compression
  const handleAvatarFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setReviewForm((prev) => ({ ...prev, avatar: compressedDataUrl }));
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Ask Question Form
  const [questionForm, setQuestionForm] = useState({
    name: '',
    email: '',
    category: 'SEO & Guest Posting',
    question: ''
  });
  const [questionSubmitStatus, setQuestionSubmitStatus] = useState(null);

  // Backend Sync
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [revRes, faqRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/reviews`).catch(() => null),
          fetch(`${API_BASE_URL}/api/faqs`).catch(() => null)
        ]);

        if (revRes && revRes.ok) {
          const rData = await revRes.json();
          if (rData && rData.reviews && isMounted) {
            const cleanReviews = (rData.reviews || []).filter(
              (r) =>
                !['Marcus Vance', 'Sophia Al-Mansoor', 'David Miller', 'Elena Rostova', 'Tariq Mehmood', 'Sarah Jenkins', 'Alexander Wright'].includes(r.name)
            );
            if (cleanReviews.length > 0) {
              setReviews(cleanReviews);
              localStorage.setItem('rahila_portfolio_reviews', JSON.stringify(cleanReviews));
            } else if (defaultReviews.length > 0) {
              setReviews(defaultReviews);
            }
          }
        }

        if (faqRes && faqRes.ok) {
          const fData = await faqRes.json();
          if (fData && fData.faqs && isMounted) {
            const cleanFaqs = (fData.faqs || []).filter(
              (f) =>
                !['Marcus Vance', 'Sophia Al-Mansoor', 'David Miller', 'Tariq Mehmood', 'Sarah Jenkins'].includes(f.askedBy)
            );
            setFaqs(cleanFaqs);
            localStorage.setItem('rahila_portfolio_faqs', JSON.stringify(cleanFaqs));
          }
        }

        if (usrRes && usrRes.ok) {
          const uData = await usrRes.json();
          if (uData && uData.users && isMounted) {
            setUsers(uData.users);
            localStorage.setItem('rahila_portfolio_users', JSON.stringify(uData.users));
          }
        }
      } catch (e) {
        console.log('Using local client store.');
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save Helpers
  const updateReviews = (newRev) => {
    setReviews(newRev);
    try {
      localStorage.setItem('rahila_portfolio_reviews', JSON.stringify(newRev));
    } catch (e) {}
  };

  const updateFaqs = (newFaqs) => {
    setFaqs(newFaqs);
    try {
      localStorage.setItem('rahila_portfolio_faqs', JSON.stringify(newFaqs));
    } catch (e) {}
  };

  const recordUserEngagement = (name, email, role, activity) => {
    if (!email) return;
    const existing = users.filter((u) => u.email.toLowerCase() !== email.toLowerCase());
    const updatedUsers = [
      {
        id: `usr_${Date.now()}`,
        name: name || 'Visitor',
        email: email.trim(),
        role: role || 'Client',
        activity: activity,
        date: new Date().toISOString()
      },
      ...existing
    ];
    setUsers(updatedUsers);
    try {
      localStorage.setItem('rahila_portfolio_users', JSON.stringify(updatedUsers));
    } catch (e) {}
  };

  // Authentication & Modal Gate Handlers
  const handleOpenWriteReview = () => {
    if (!currentUser) {
      setAuthRequiredReason('write_review');
      setAuthModalOpen(true);
      return;
    }
    setReviewForm((prev) => ({
      ...prev,
      name: currentUser.name || currentUser.displayName || prev.name || '',
      email: currentUser.email || prev.email || '',
      avatar: currentUser.photoURL || prev.avatar || ''
    }));
    setIsWriteReviewModalOpen(true);
  };

  const handleOpenAskQuestion = () => {
    if (!currentUser) {
      setAuthRequiredReason('ask_question');
      setAuthModalOpen(true);
      return;
    }
    setQuestionForm((prev) => ({
      ...prev,
      name: currentUser.name || currentUser.displayName || prev.name || '',
      email: currentUser.email || prev.email || ''
    }));
    setIsAskQuestionModalOpen(true);
  };

  // Submit User Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthRequiredReason('write_review');
      setAuthModalOpen(true);
      return;
    }

    const cleanName = (currentUser.name || currentUser.displayName || reviewForm.name || '').trim();
    const cleanEmail = (currentUser.email || reviewForm.email || '').trim().toLowerCase();
    if (!cleanName || !cleanEmail || !reviewForm.message) return;

    setReviewSubmitStatus('submitting');
    const token = localStorage.getItem('rahila_auth_token') || '';

    const newRev = {
      id: `rev_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: (reviewForm.role || 'Verified Client').trim(),
      service: reviewForm.service,
      rating: reviewForm.rating,
      title: (reviewForm.title || 'Great Service & Results').trim(),
      message: reviewForm.message.trim(),
      avatar: reviewForm.avatar || currentUser.photoURL || '',
      source: 'Website Submission',
      sourceType: 'submission',
      gmbVerified: false,
      date: 'Just now',
      status: 'pending', // Awaits Admin Approval
      helpfulCount: 0,
      createdAt: new Date().toISOString()
    };

    try {
      await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newRev)
      });
    } catch (err) {}

    // Dispatch Web3Forms notification directly to wordpressrahila@gmail.com
    sendWeb3FormsNotification({
      type: 'New Client Review',
      subject: `[New Client Review Submitted] ${reviewForm.rating} Stars by ${cleanName}`,
      name: cleanName,
      email: cleanEmail,
      message: reviewForm.message,
      details: {
        clientName: cleanName,
        clientEmail: cleanEmail,
        roleOrCompany: reviewForm.role || 'Verified Client',
        serviceDelivered: reviewForm.service,
        starRating: `${reviewForm.rating} / 5 Stars`,
        headline: reviewForm.title || 'No Headline',
        reviewMessage: reviewForm.message,
        hasUploadedAvatar: Boolean(reviewForm.avatar),
        moderationStatus: 'Pending Admin Approval in Dashboard'
      }
    });

    updateReviews([newRev, ...reviews]);
    recordUserEngagement(cleanName, cleanEmail, reviewForm.role, `Submitted ${reviewForm.rating}-Star Review`);

    setReviewSubmitStatus('success');
    setTimeout(() => {
      setIsWriteReviewModalOpen(false);
      setReviewSubmitStatus(null);
      setReviewForm({
        name: '',
        email: '',
        role: '',
        service: 'Complete SEO Strategy',
        rating: 5,
        title: '',
        message: '',
        avatar: ''
      });
    }, 2200);
  };

  // Submit User Question ("faq b ker sky")
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthRequiredReason('ask_question');
      setAuthModalOpen(true);
      return;
    }

    const cleanName = (currentUser.name || currentUser.displayName || questionForm.name || '').trim();
    const cleanEmail = (currentUser.email || questionForm.email || '').trim().toLowerCase();
    if (!cleanName || !cleanEmail || !questionForm.question) return;

    setQuestionSubmitStatus('submitting');
    const token = localStorage.getItem('rahila_auth_token') || '';

    const newQ = {
      id: `faq_${Date.now()}`,
      question: questionForm.question.trim(),
      answer: '', // Will be answered by Admin
      askedBy: cleanName,
      email: cleanEmail,
      category: questionForm.category,
      status: 'pending',
      date: 'Just now',
      createdAt: new Date().toISOString()
    };

    try {
      await fetch(`${API_BASE_URL}/api/faqs/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newQ)
      });
    } catch (err) {}

    // Dispatch Web3Forms notification directly to wordpressrahila@gmail.com
    sendWeb3FormsNotification({
      type: 'New Community Question (FAQ)',
      subject: `[New FAQ Question Asked] From ${questionForm.name}`,
      name: questionForm.name,
      email: questionForm.email,
      message: questionForm.question,
      details: {
        authorName: questionForm.name,
        authorEmail: questionForm.email,
        category: questionForm.category,
        questionText: questionForm.question,
        moderationStatus: 'Pending Admin Answer in Dashboard'
      }
    });

    updateFaqs([newQ, ...faqs]);
    recordUserEngagement(questionForm.name, questionForm.email, 'Prospective Client', `Asked Question: "${questionForm.question.substring(0, 35)}..."`);

    setQuestionSubmitStatus('success');
    setTimeout(() => {
      setIsAskQuestionModalOpen(false);
      setQuestionSubmitStatus(null);
      setQuestionForm({
        name: '',
        email: '',
        category: 'SEO & Guest Posting',
        question: ''
      });
    }, 2200);
  };

  // Moderation Handlers (Admin)
  const handleApproveReview = async (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: 'approved', updatedAt: new Date().toISOString() } : r
    );
    updateReviews(updated);
    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
    } catch (e) {}
  };

  const handleRejectReview = async (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: 'rejected', updatedAt: new Date().toISOString() } : r
    );
    updateReviews(updated);
    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
    } catch (e) {}
  };

  const handleDeleteReview = async (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    updateReviews(updated);
    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  const handleAddManualReview = async (rev) => {
    updateReviews([rev, ...reviews]);
    recordUserEngagement(rev.name, rev.email, rev.role, 'Verified Review Added');
    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rev)
      });
    } catch (e) {}
  };
  const handleReplyReview = async (id, replyMessage) => {
    const updated = reviews.map((r) =>
      r.id === id
        ? {
            ...r,
            status: 'approved',
            adminReply: {
              message: replyMessage,
              repliedAt: new Date().toISOString(),
              adminEmail: 'rahilakareem389@gmail.com'
            }
          }
        : r
    );
    updateReviews(updated);
    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage })
      });
    } catch (e) {}
  };

  // FAQ Admin Handlers
  const handleAnswerFaq = async (id, answerText) => {
    const updated = faqs.map((f) =>
      f.id === id ? { ...f, answer: answerText, status: 'approved', answeredAt: new Date().toISOString() } : f
    );
    updateFaqs(updated);
    try {
      await fetch(`${API_BASE_URL}/api/admin/faqs/${id}/answer`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answerText, status: 'approved' })
      });
    } catch (e) {}
  };

  const handleDeleteFaq = async (id) => {
    const updated = faqs.filter((f) => f.id !== id);
    updateFaqs(updated);
    try {
      await fetch(`${API_BASE_URL}/api/admin/faqs/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  const handleAddManualFaq = async (faq) => {
    updateFaqs([faq, ...faqs]);
    try {
      await fetch(`${API_BASE_URL}/api/admin/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faq)
      });
    } catch (e) {}
  };

  const handleLikeReview = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
    );
    updateReviews(updated);
  };

  // Filter ONLY APPROVED reviews & FAQs for public view!
  const publicApprovedReviews = reviews.filter((r) => r.status === 'approved');
  const publicApprovedFaqs = faqs.filter((f) => f.status === 'approved' && f.answer);

  const pendingReviewsCount = reviews.filter((r) => r.status === 'pending').length;
  const pendingFaqsCount = faqs.filter((f) => f.status === 'pending' || !f.answer).length;

  const filteredReviews = publicApprovedReviews.filter((r) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'seo') return r.service?.toLowerCase().includes('seo') || r.service?.toLowerCase().includes('guest');
    if (activeCategory === 'fullstack') return r.service?.toLowerCase().includes('full stack') || r.service?.toLowerCase().includes('mern');
    if (activeCategory === 'wordpress') return r.service?.toLowerCase().includes('wordpress') || r.service?.toLowerCase().includes('woo');
    return true;
  });

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D57C63]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#ff7a1a]/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="reveal-up text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D57C63]" />
            <span>Real &amp; Verified Client Endorsements</span>
          </div>
          <h2 className="font-heading font-extrabold text-[32px] sm:text-[46px] leading-tight seo-heading mb-4">
            Client Testimonials &amp; Community Q&amp;A
          </h2>
          <p className="text-[16px] sm:text-[18px] leading-relaxed seo-body">
            Authentic feedback from client deliverables, project engagements, and community Q&amp;A answered directly by Rahila Kareem.
          </p>
        </div>

        {/* ======================================================== */}
        {/* REAL GOOGLE MY BUSINESS (GMB) TRUST & ACTION CARD */}
        {/* ======================================================== */}
        <div className="reveal-up p-7 sm:p-10 rounded-[32px] seo-card border-2 border-[#D57C63]/30 mb-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Google G Logo & Real Rating */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center p-3 shadow-2xl shrink-0 border border-neutral-200">
                <svg className="w-12 h-12" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-white">5.0</span>
                  <div className="flex text-amber-400 text-lg">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s}>★</span>
                    ))}
                  </div>
                </div>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-white">
                  Google Business Profile (GMB)
                </h4>
                <p className="text-xs sm:text-sm text-[#bcab9e]">
                  Connected Account: <strong className="text-white font-mono">{personalInfo.gmbEmail || "rahilakareem389@gmail.com"}</strong>
                </p>
              </div>
            </div>

            {/* Center: Live Trust Badges */}
            <div className="lg:col-span-4 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Business</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Google Maps Profile</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D57C63]/15 border border-[#D57C63]/30 text-[#D57C63] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Genuine Reviews</span>
              </span>
            </div>

            {/* Right: Actions */}
            <div className="lg:col-span-3 flex flex-col gap-2.5 justify-end">
              {/* Direct Link to Google My Business */}
              <a
                href={personalInfo.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn px-4 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 text-white shadow-lg cursor-pointer hover:-translate-y-0.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Review us on Google (GMB)</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex">
                <button
                  type="button"
                  onClick={handleOpenWriteReview}
                  className="w-full px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Write Client Review</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section Navigation Tabs: Reviews vs FAQs */}
        <div className="reveal-up flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#1a120e] border border-[#33271f] shadow-lg">
            <button
              type="button"
              onClick={() => setActiveSection('reviews')}
              className={`px-6 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'reviews'
                  ? 'bg-[#D57C63] text-white shadow-md'
                  : 'text-[#bcab9e] hover:text-white'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Client Reviews ({publicApprovedReviews.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('faqs')}
              className={`px-6 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeSection === 'faqs'
                  ? 'bg-[#D57C63] text-white shadow-md'
                  : 'text-[#bcab9e] hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Questions &amp; Answers (FAQs) ({publicApprovedFaqs.length})</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: REVIEWS CARDS GRID */}
        {/* ======================================================== */}
        {activeSection === 'reviews' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {[
                { id: 'all', label: `All Reviews (${publicApprovedReviews.length})` },
                { id: 'seo', label: `SEO & Link Building` },
                { id: 'fullstack', label: `Full Stack Development` },
                { id: 'wordpress', label: `WordPress & WooCommerce` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#D57C63] text-white shadow-lg'
                      : 'bg-[#1a120e] text-[#bcab9e] hover:text-white border border-[#33271f] hover:border-[#D57C63]/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grid or Empty Reviews State */}
            {filteredReviews.length === 0 ? (
              <div className="p-8 sm:p-12 rounded-[32px] bg-[#1a120e] border border-[#33271f] text-center max-w-lg mx-auto space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D57C63]/10 border border-[#D57C63]/30 flex items-center justify-center mx-auto text-[#D57C63]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-lg sm:text-xl text-white">
                    Client Reviews
                  </h4>
                  <p className="text-xs sm:text-sm text-[#bcab9e] max-w-sm mx-auto">
                    No reviews in this category yet. Be the first client to leave feedback!
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={personalInfo.googleBusinessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn px-5 py-2.5 rounded-full text-xs font-bold text-white flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Review us on Google</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={handleOpenWriteReview}
                    className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Write Client Review
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-3">
                {filteredReviews.map((rev, idx) => {
                  const isReplyExpanded = Boolean(expandedReplies[rev.id]);
                  return (
                    <div
                      key={rev.id}
                      className="reveal-up relative pt-4 sm:pt-5"
                      style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                    >
                      {/* 1. Offset Backdrop Shape (Compact & sleek) */}
                      <div 
                        className="absolute -left-1.5 sm:-left-2 top-6 bottom-3 w-[88%] rounded-2xl bg-gradient-to-r from-[#ff7a1a] via-[#f59e0b] to-[#ea580c] opacity-90 shadow-md transform -rotate-1 pointer-events-none" 
                      />

                      {/* 2. Main Quotation Frame (Compact size with crisp border) */}
                      <div className="relative rounded-[24px] bg-[#1a120e] border-2 border-[#eedfd5]/90 p-5 sm:p-6 pt-7 pb-5 shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-[#ff7a1a] group">
                        
                        {/* Top Quotation Mark “ (Sleek size) */}
                        <div className="absolute -top-3.5 left-6 sm:left-8 px-2 bg-[#1a120e] z-10 flex items-center justify-center">
                          <span className="font-serif text-3xl sm:text-4xl font-black text-[#ff7a1a] leading-none select-none">
                            “
                          </span>
                        </div>

                        {/* Bottom Quotation Mark ” (Sleek size) */}
                        <div className="absolute -bottom-4 right-8 sm:right-10 px-2 bg-[#1a120e] z-10 flex items-center justify-center">
                          <span className="font-serif text-3xl sm:text-4xl font-black text-[#ff7a1a] leading-none select-none">
                            ”
                          </span>
                        </div>

                        {/* 3. Tilted Polaroid Photo Card at Top Right with Paperclip (Compact) */}
                        <div className="absolute -top-5 -right-1 sm:-top-6 sm:-right-2 z-20 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105">
                          {/* Paperclip Graphic 📎 */}
                          <svg 
                            className="w-4 h-6 text-neutral-900 drop-shadow -rotate-12 absolute -top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none" 
                            viewBox="0 0 24 36" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M16 8v16a6 6 0 0 1-12 0V9a4 4 0 0 1 8 0v14a2 2 0 0 1-4 0V9" />
                          </svg>

                          {/* Polaroid Frame */}
                          <div className="bg-white p-1 pb-3 sm:pb-3.5 rounded-sm shadow-md border border-neutral-200 rotate-6 sm:rotate-8 group-hover:rotate-0 transition-transform">
                            {rev.avatar ? (
                              <img
                                src={rev.avatar}
                                alt={rev.name}
                                className="w-11 h-11 sm:w-13 sm:h-13 object-cover rounded-xs"
                              />
                            ) : (
                              <div className="w-11 h-11 sm:w-13 sm:h-13 bg-gradient-to-br from-[#ff7a1a] to-[#ea580c] flex items-center justify-center font-heading font-black text-sm text-white">
                                {rev.name?.charAt(0) || 'U'}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Review Content */}
                        <div>
                          {/* Testimonial Quote Message (Bright visible text, clamped to 2-3 lines) */}
                          <div className="mb-3 pr-9 sm:pr-11">
                            {rev.title && (
                              <h5 className="font-heading font-extrabold text-[14px] sm:text-[15px] text-white mb-1 leading-snug line-clamp-1">
                                {rev.title}
                              </h5>
                            )}
                            <p className="text-[13px] sm:text-[13.5px] text-white font-medium leading-relaxed line-clamp-3">
                              "{rev.message}"
                            </p>
                          </div>

                          {/* 5 Rating Stars (Clean & bright) */}
                          <div className="flex items-center gap-1 mb-2.5 text-amber-400 text-base drop-shadow-sm">
                            {Array.from({ length: rev.rating || 5 }).map((_, s) => (
                              <span key={s}>★</span>
                            ))}
                          </div>

                          {/* Client Name & Role */}
                          <div className="pt-2 border-t border-[#33271f]/80 flex items-center justify-between gap-2 flex-wrap">
                            <div>
                              <h4 className="font-heading font-extrabold text-[14px] text-white leading-tight">
                                {rev.name}
                              </h4>
                              <p className="text-[11px] text-neutral-300 mt-0.5">
                                {rev.role || 'Verified Client'}
                              </p>
                            </div>

                            {/* Service Tag */}
                            {rev.service && (
                              <span className="text-[10px] font-bold text-[#ff7a1a] bg-[#ff7a1a]/15 border border-[#ff7a1a]/30 px-2 py-0.5 rounded-full truncate max-w-[130px]">
                                {rev.service}
                              </span>
                            )}
                          </div>

                          {/* Admin Reply (Collapsible See More) */}
                          {rev.adminReply && rev.adminReply.message && (
                            <div className="mt-2 pt-2 border-t border-[#33271f]/80">
                              <button
                                type="button"
                                onClick={() => toggleReply(rev.id)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff7a1a] hover:text-[#ff9240] transition-colors py-0.5 cursor-pointer select-none"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>
                                  {isReplyExpanded ? 'Hide Reply' : 'See Owner Reply (See More)'}
                                </span>
                                <ChevronDown
                                  className={`w-3 h-3 transition-transform duration-300 ${
                                    isReplyExpanded ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>

                              {/* Collapsible Admin Reply Container */}
                              {isReplyExpanded && (
                                <div className="mt-2 p-2.5 rounded-xl bg-[#281a14] border border-[#ff7a1a]/30 shadow-inner space-y-1 animate-fadeIn">
                                  <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#e5937d]">
                                    <ShieldCheck className="w-3 h-3 text-[#ff7a1a]" />
                                    <span>Response from Rahila Kareem:</span>
                                  </div>
                                  <p className="text-xs text-white leading-relaxed italic line-clamp-3">
                                    "{rev.adminReply.message}"
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Card Footer: Date & Helpful button */}
                        <div className="mt-3 pt-2.5 border-t border-[#33271f]/80 flex items-center justify-between text-[11px] text-neutral-400">
                          <span>{rev.date || 'Recent'}</span>
                          <button
                            type="button"
                            onClick={() => handleLikeReview(rev.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 hover:bg-[#ff7a1a]/20 hover:text-[#ff7a1a] transition-colors cursor-pointer text-[10.5px]"
                          >
                            <ThumbsUp className="w-2.5 h-2.5" />
                            <span>Helpful ({rev.helpfulCount || 0})</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: FAQS & COMMUNITY Q&A ("faq b ker sky") */}
        {/* ======================================================== */}
        {activeSection === 'faqs' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* Ask a Question Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2a1711] to-[#1c110d] border border-[#D57C63]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white mb-1">
                  Have a Question for Rahila Kareem?
                </h3>
                <p className="text-xs sm:text-sm text-[#bcab9e]">
                  Ask about SEO strategies, guest post outreach, full stack architecture, or project estimates.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAskQuestion}
                className="glow-btn px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-lg shrink-0"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Ask a Question</span>
              </button>
            </div>

            {/* Accordion List of Approved FAQs */}
            <div className="space-y-4">
              {publicApprovedFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={faq.id}
                    className="seo-card rounded-2xl overflow-hidden border border-[#33271f] transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1">
                        <span className="text-[11px] font-bold text-[#D57C63] uppercase tracking-wider block mb-1">
                          {faq.category}
                        </span>
                        <span className="font-heading font-extrabold text-base sm:text-lg text-white">
                          Q: {faq.question}
                        </span>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full bg-[#D57C63]/15 flex items-center justify-center text-[#D57C63] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#D57C63] text-black' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#33271f] space-y-2">
                        <div className="text-xs font-bold text-[#D57C63]">
                          Ans (Answer from Rahila Kareem):
                        </div>
                        <p className="text-xs sm:text-[14px] text-[#d6c7bc] leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.askedBy && (
                          <div className="text-[11px] text-[#a9988d] pt-2">
                            Asked by: {faq.askedBy} • {faq.date}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: WRITE A REVIEW MODAL */}
      {/* ======================================================== */}
      {isWriteReviewModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex justify-center items-start sm:items-center animate-fadeIn"
          onClick={() => setIsWriteReviewModalOpen(false)}
        >
          <div
            className="dialog-modal-box relative w-full max-w-xl my-auto rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsWriteReviewModalOpen(false)}
              className="modal-cancel-btn absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#D57C63]/20 border border-[#D57C63]/40 flex items-center justify-center text-[#D57C63] shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="modal-title font-heading font-extrabold text-lg sm:text-xl">Leave a Verified Review</h3>
                <p className="modal-subtitle text-xs">Share your experience working with Rahila Kareem.</p>
              </div>
            </div>

            {reviewSubmitStatus === 'success' ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="modal-title font-heading font-bold text-lg">Review Submitted for Verification!</h4>
                <p className="modal-subtitle text-xs max-w-md mx-auto leading-relaxed">
                  Thank you! To ensure 100% genuine reviews, your submission is routed to the Admin Dashboard and will appear on the site once accepted.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="dialog-modal-policy-box p-3 rounded-xl flex items-start gap-2.5 text-xs">
                  <ShieldCheck className="policy-icon w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Authenticity Policy:</strong> Reviews are moderated in the Admin Dashboard to prevent spam.
                  </span>
                </div>

                {/* Photo / Avatar Upload */}
                <div className="modal-box-card flex items-center gap-3.5 p-3 rounded-2xl">
                  <div className="relative shrink-0">
                    {reviewForm.avatar ? (
                      <div className="relative">
                        <img
                          src={reviewForm.avatar}
                          alt="Reviewer Avatar"
                          className="w-12 h-12 rounded-full object-cover border-2 border-[#D57C63] shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, avatar: '' })}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-[10px] shadow cursor-pointer"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#D57C63]/15 border-2 border-dashed border-[#D57C63]/50 flex items-center justify-center text-[#D57C63]">
                        <Camera className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <label className="modal-label text-xs font-bold block">
                        Your Photo / Avatar
                      </label>
                      <span className="dialog-modal-pill-badge text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                        Optional
                      </span>
                    </div>
                    <p className="modal-subtitle text-xs mb-2 leading-tight">
                      Upload your photo to display alongside your verified review.
                    </p>
                    <label className="dialog-modal-upload-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{reviewForm.avatar ? 'Change Photo' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleAvatarFile(e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {currentUser && (
                  <div className="dialog-modal-auth-banner p-3 rounded-xl flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Posting review as: <strong className="underline underline-offset-2">{currentUser.email}</strong></span>
                    </div>
                    <span className="dialog-modal-auth-badge text-[11px] px-2.5 py-1 rounded-md font-bold shrink-0">
                      Verified Client
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="modal-label text-xs font-bold block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jason Blake"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="modal-label text-xs font-bold block mb-1">Your Real Email *</label>
                    <input
                      type="email"
                      required
                      readOnly={Boolean(currentUser)}
                      placeholder="e.g. jason@business.com"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                      style={currentUser ? { cursor: 'not-allowed' } : {}}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="modal-label text-xs font-bold block mb-1">Role / Company</label>
                    <input
                      type="text"
                      placeholder="e.g. Director, SolarTech"
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                    />
                  </div>
                  <div>
                    <label className="modal-label text-xs font-bold block mb-1">Service Delivered</label>
                    <select
                      value={reviewForm.service}
                      onChange={(e) => setReviewForm({ ...reviewForm, service: e.target.value })}
                      className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                    >
                      <option>Complete SEO Strategy</option>
                      <option>High DA Guest Posting &amp; GBOB</option>
                      <option>Full Stack Web Development</option>
                      <option>WordPress &amp; WooCommerce</option>
                      <option>Technical SEO Audit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Star Rating *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-2xl cursor-pointer ${
                          star <= reviewForm.rating ? 'text-amber-400' : 'text-neutral-500'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 ml-2">{reviewForm.rating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Genuine Backlinks and Great Communication"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                  />
                </div>

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Review Details *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your project, results achieved, and feedback..."
                    value={reviewForm.message}
                    onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                    className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium resize-none transition-all"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteReviewModalOpen(false)}
                    className="modal-cancel-btn px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glow-btn px-6 py-2 rounded-xl text-xs font-bold text-white shadow-lg cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: ASK A QUESTION MODAL ("faq b ker sky") */}
      {/* ======================================================== */}
      {isAskQuestionModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex justify-center items-start sm:items-center animate-fadeIn"
          onClick={() => setIsAskQuestionModalOpen(false)}
        >
          <div
            className="dialog-modal-box relative w-full max-w-lg my-auto rounded-[24px] sm:rounded-[28px] p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAskQuestionModalOpen(false)}
              className="modal-cancel-btn absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#D57C63]/20 border border-[#D57C63]/40 flex items-center justify-center text-[#D57C63] shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="modal-title font-heading font-extrabold text-lg sm:text-xl">Ask Rahila Kareem</h3>
                <p className="modal-subtitle text-xs">Your question will be answered and published to FAQs.</p>
              </div>
            </div>

            {questionSubmitStatus === 'success' ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="modal-title font-heading font-bold text-lg">Question Sent to Rahila Kareem!</h4>
                <p className="modal-subtitle text-xs max-w-md mx-auto leading-relaxed">
                  Thank you! Rahila will answer your question in the Admin Dashboard, and it will be published in the FAQ section.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="space-y-3">
                {currentUser && (
                  <div className="dialog-modal-auth-banner p-3 rounded-xl flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Asking question as: <strong className="underline underline-offset-2">{currentUser.email}</strong></span>
                    </div>
                    <span className="dialog-modal-auth-badge text-[11px] px-2.5 py-1 rounded-md font-bold shrink-0">
                      Verified User
                    </span>
                  </div>
                )}

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={questionForm.name}
                    onChange={(e) => setQuestionForm({ ...questionForm, name: e.target.value })}
                    className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                  />
                </div>

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Your Real Email *</label>
                  <input
                    type="email"
                    required
                    readOnly={Boolean(currentUser)}
                    placeholder="e.g. sarah@elevatebrands.com"
                    value={questionForm.email}
                    onChange={(e) => setQuestionForm({ ...questionForm, email: e.target.value })}
                    className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all"
                    style={currentUser ? { cursor: 'not-allowed' } : {}}
                  />
                </div>

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Category</label>
                  <select
                    value={questionForm.category}
                    onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                    className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                  >
                    <option>SEO &amp; Guest Posting</option>
                    <option>Full Stack Web Apps</option>
                    <option>WordPress &amp; E-Commerce</option>
                    <option>Technical Audits &amp; Speed</option>
                    <option>Pricing &amp; Project Timelines</option>
                  </select>
                </div>

                <div>
                  <label className="modal-label text-xs font-bold block mb-1">Your Question *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Ask anything about SEO, backlinks, web development, or consultations..."
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    className="modal-input w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium resize-none transition-all"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAskQuestionModalOpen(false)}
                    className="modal-cancel-btn px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glow-btn px-6 py-2 rounded-xl text-xs font-bold text-white shadow-lg cursor-pointer"
                  >
                    Send Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Authentication Modal Triggered When Writing Review or Asking FAQ */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signin"
        onAuthSuccess={(user) => {
          if (authRequiredReason === 'write_review') {
            setReviewForm((prev) => ({
              ...prev,
              name: user.name || user.displayName || '',
              email: user.email || '',
              avatar: user.photoURL || prev.avatar || ''
            }));
            setIsWriteReviewModalOpen(true);
          } else if (authRequiredReason === 'ask_question') {
            setQuestionForm((prev) => ({
              ...prev,
              name: user.name || user.displayName || '',
              email: user.email || ''
            }));
            setIsAskQuestionModalOpen(true);
          }
        }}
      />

    </section>
  );
}
