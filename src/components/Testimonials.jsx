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
  Check
} from 'lucide-react';
import { defaultReviews } from '../data/defaultReviews';
import AdminDashboardModal from './AdminDashboardModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Testimonials({ setActiveTab, setSelectedPlan }) {
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem('rahila_portfolio_reviews');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return defaultReviews;
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'submitting' | 'success' | 'error'

  // Form State for User Review Submission
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    role: '',
    service: 'Complete SEO Strategy',
    rating: 5,
    title: '',
    message: ''
  });

  // Fetch from backend API on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchBackendReviews() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/reviews`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.reviews && isMounted) {
            setReviews(data.reviews);
            localStorage.setItem('rahila_portfolio_reviews', JSON.stringify(data.reviews));
          }
        }
      } catch (err) {
        // Backend might not be running locally yet, fallback to localStorage/default
        console.log('Using local reviews store.');
      }
    }
    fetchBackendReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage whenever reviews change
  const updateReviewsState = (newReviews) => {
    setReviews(newReviews);
    try {
      localStorage.setItem('rahila_portfolio_reviews', JSON.stringify(newReviews));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  };

  // Submit new review by public user (saved as 'pending')
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.email || !reviewForm.message) return;

    setSubmitStatus('submitting');

    const newRev = {
      id: `rev_${Date.now()}`,
      name: reviewForm.name.trim(),
      email: reviewForm.email.trim(),
      role: (reviewForm.role || 'Verified Client').trim(),
      service: reviewForm.service,
      rating: reviewForm.rating,
      title: (reviewForm.title || 'Great Service & Results').trim(),
      message: reviewForm.message.trim(),
      source: 'Website Submission',
      sourceType: 'submission',
      gmbVerified: false,
      date: 'Just now',
      status: 'pending', // Pending approval in Admin Dashboard
      helpfulCount: 0,
      createdAt: new Date().toISOString()
    };

    // Try posting to backend API
    try {
      await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRev)
      });
    } catch (err) {
      console.log('Backend offline, review stored in local storage.');
    }

    // Always update local store
    updateReviewsState([newRev, ...reviews]);

    setSubmitStatus('success');
    setTimeout(() => {
      setIsWriteModalOpen(false);
      setSubmitStatus(null);
      setReviewForm({
        name: '',
        email: '',
        role: '',
        service: 'Complete SEO Strategy',
        rating: 5,
        title: '',
        message: ''
      });
    }, 2400);
  };

  // Admin approves review -> becomes live on Home page
  const handleApprove = async (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: 'approved', updatedAt: new Date().toISOString() } : r
    );
    updateReviewsState(updated);

    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
    } catch (e) {
      console.log('Synced locally.');
    }
  };

  // Admin rejects review
  const handleReject = async (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, status: 'rejected', updatedAt: new Date().toISOString() } : r
    );
    updateReviewsState(updated);

    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
    } catch (e) {
      console.log('Synced locally.');
    }
  };

  // Admin deletes review
  const handleDelete = async (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    updateReviewsState(updated);

    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews/${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.log('Synced locally.');
    }
  };

  // Admin adds manual review
  const handleAddManualReview = async (revData) => {
    updateReviewsState([revData, ...reviews]);

    try {
      await fetch(`${API_BASE_URL}/api/admin/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(revData)
      });
    } catch (e) {
      console.log('Synced locally.');
    }
  };

  // Toggle helpful counter
  const handleLikeReview = (id) => {
    const updated = reviews.map((r) =>
      r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
    );
    updateReviewsState(updated);
  };

  // Filter ONLY APPROVED reviews for public display!
  const publicApprovedReviews = reviews.filter((r) => r.status === 'approved');
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  const filteredReviews = publicApprovedReviews.filter((r) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'gmb') return r.sourceType === 'gmb' || r.source?.includes('Google');
    if (activeCategory === 'seo')
      return r.service?.toLowerCase().includes('seo') || r.service?.toLowerCase().includes('guest');
    if (activeCategory === 'fullstack')
      return (
        r.service?.toLowerCase().includes('full stack') ||
        r.service?.toLowerCase().includes('mern') ||
        r.service?.toLowerCase().includes('web')
      );
    if (activeCategory === 'wordpress')
      return r.service?.toLowerCase().includes('wordpress') || r.service?.toLowerCase().includes('woo');
    return true;
  });

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D57C63]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#ff7a1a]/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="reveal-up text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full seo-badge text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D57C63]" />
            <span>Real &amp; Verified Client Endorsements</span>
          </div>
          <h2 className="font-heading font-extrabold text-[32px] sm:text-[46px] leading-tight seo-heading mb-4">
            Client Testimonials &amp; Google Reviews
          </h2>
          <p className="text-[16px] sm:text-[18px] leading-relaxed seo-body">
            Verifiable feedback from business owners, agency partners, and founders across SEO campaigns, full stack web apps, and WordPress stores.
          </p>
        </div>

        {/* ======================================================== */}
        {/* GOOGLE MY BUSINESS (GMB) TRUST & RATING CARD */}
        {/* ======================================================== */}
        <div className="reveal-up p-7 sm:p-10 rounded-[32px] seo-card border-2 border-[#D57C63]/30 mb-14 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Google Multi-Color Brand & Rating */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Google G Icon with shadow */}
              <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center p-3 shadow-2xl shrink-0 border border-neutral-200">
                <svg className="w-12 h-12" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
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
                  Google My Business Reviews
                </h4>
                <p className="text-xs sm:text-sm text-[#bcab9e]">
                  Rated 5.0 out of 5 based on 48+ real client projects
                </p>
              </div>
            </div>

            {/* Center: Trust Credentials */}
            <div className="lg:col-span-4 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Real Reviews</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>Google Verified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D57C63]/15 border border-[#D57C63]/30 text-[#D57C63] text-xs font-bold">
                <Globe className="w-3.5 h-3.5" />
                <span>Moderated &amp; Authentic</span>
              </span>
            </div>

            {/* Right: Write a Review & Admin Portal Buttons */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(true)}
                className="glow-btn px-5 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Write a Review</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/15 text-[#bcab9e] hover:text-white border border-[#3e2c22] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer relative"
                title="Admin Reviews Moderation Dashboard"
              >
                <Lock className="w-3.5 h-3.5 text-[#D57C63]" />
                <span>Admin Dashboard</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-black animate-pulse">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Filter Tabs */}
        <div className="reveal-up flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: `All Reviews (${publicApprovedReviews.length})` },
            { id: 'gmb', label: `Google Reviews (GMB)` },
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev, idx) => {
            const isGmb = rev.sourceType === 'gmb' || rev.source?.includes('Google');

            return (
              <div
                key={rev.id}
                itemScope
                itemType="https://schema.org/Review"
                className="reveal-up seo-card p-7 sm:p-8 rounded-[28px] flex flex-col justify-between border border-[#33271f] hover:border-[#D57C63]/50 transition-all duration-300 hover:-translate-y-1 group"
                style={{ transitionDelay: `${(idx % 3) * 110}ms` }}
              >
                <div>
                  {/* Top: Avatar, Name, and Source Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {rev.avatar ? (
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-[#D57C63]/40 shadow-sm"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#D57C63]/20 border border-[#D57C63]/40 flex items-center justify-center font-bold text-sm text-[#D57C63]">
                          {rev.name?.charAt(0) || 'U'}
                        </div>
                      )}

                      <div>
                        <h4 itemProp="author" className="font-heading font-extrabold text-base text-white">
                          {rev.name}
                        </h4>
                        <p className="text-xs text-[#a9988d]">{rev.role}</p>
                      </div>
                    </div>

                    {/* Source Pill */}
                    {isGmb ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10.5px] font-bold shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Google Review</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10.5px] font-bold shrink-0">
                        <Check className="w-3 h-3" />
                        <span>Verified Client</span>
                      </span>
                    )}
                  </div>

                  {/* Stars & Service Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center text-amber-400 text-sm">
                      {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                        <span key={sIdx}>★</span>
                      ))}
                    </div>

                    <span className="text-[11px] font-bold text-[#D57C63] bg-[#D57C63]/10 px-2.5 py-0.5 rounded-full">
                      {rev.service}
                    </span>
                  </div>

                  {/* Review Headline & Body */}
                  {rev.title && (
                    <h5 className="font-heading font-extrabold text-base text-white mb-2 leading-snug">
                      "{rev.title}"
                    </h5>
                  )}

                  <p itemProp="reviewBody" className="text-xs sm:text-[13.5px] text-[#d6c7bc] leading-relaxed mb-6">
                    {rev.message}
                  </p>
                </div>

                {/* Footer: Date & Helpful Thumbs Up */}
                <div className="pt-4 border-t border-[#33271f] flex items-center justify-between text-xs text-[#a9988d]">
                  <span>{rev.date}</span>

                  <button
                    type="button"
                    onClick={() => handleLikeReview(rev.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#D57C63]/20 hover:text-[#D57C63] transition-colors cursor-pointer text-[11px]"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({rev.helpfulCount || 0})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ======================================================== */}
      {/* WRITE A REVIEW MODAL (USER SUBMISSIONS) */}
      {/* ======================================================== */}
      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl bg-[#18110e] border-2 border-[#D57C63]/40 rounded-[28px] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-[#D57C63] text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#D57C63]/20 border border-[#D57C63]/40 flex items-center justify-center text-[#D57C63]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">
                  Leave a Client Review
                </h3>
                <p className="text-xs text-[#bcab9e]">
                  Share your experience with Rahila Kareem's services.
                </p>
              </div>
            </div>

            {submitStatus === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-white">
                  Review Submitted for Moderation!
                </h4>
                <p className="text-xs sm:text-sm text-[#bcab9e] max-w-md mx-auto leading-relaxed">
                  Thank you! To maintain 100% genuine and spam-free authenticity, your review has been routed to the Admin Dashboard. It will appear live once verified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                
                {/* Notice pill */}
                <div className="p-3 rounded-xl bg-[#D57C63]/10 border border-[#D57C63]/25 text-xs text-[#e29f8c] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#D57C63]" />
                  <span>
                    <strong>Authenticity Policy:</strong> Submitted reviews are reviewed in the Admin Dashboard prior to publication on the website.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Chen"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D57C63]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                      Your Email * (Private / Verification)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. michael@company.com"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D57C63]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                      Role / Company / Website
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Founder at AppWorks"
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D57C63]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                      Service Delivered
                    </label>
                    <select
                      value={reviewForm.service}
                      onChange={(e) => setReviewForm({ ...reviewForm, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D57C63]"
                    >
                      <option>Complete SEO Strategy</option>
                      <option>High DA Guest Posting &amp; GBOB</option>
                      <option>Full Stack Web Development</option>
                      <option>WordPress &amp; WooCommerce</option>
                      <option>Technical SEO Audit</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars Selector */}
                <div>
                  <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className={`text-2xl transition-transform hover:scale-125 cursor-pointer ${
                          star <= reviewForm.rating ? 'text-amber-400' : 'text-neutral-600'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-2">
                      {reviewForm.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Exceeded expectations and delivered on time"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D57C63]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#bcab9e] block mb-1.5">
                    Review Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the project, results achieved, and your overall experience..."
                    value={reviewForm.message}
                    onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-xs sm:text-sm text-white focus:outline-none focus:border-[#D57C63] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="glow-btn px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Review'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADMIN DASHBOARD MODAL */}
      {/* ======================================================== */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        reviews={reviews}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
        onAddManualReview={handleAddManualReview}
      />

    </section>
  );
}
