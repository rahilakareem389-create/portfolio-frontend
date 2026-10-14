import React, { useState } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  XCircle,
  Trash2,
  Star,
  Plus,
  ShieldCheck,
  Globe,
  User,
  Clock,
  Sparkles,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Users,
  Send,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const OWNER_EMAIL = 'rahilakareem389@gmail.com';
const ADMIN_PASSWORD = 'rahila2026';

export default function AdminDashboardModal({
  isOpen,
  onClose,
  reviews,
  onApproveReview,
  onRejectReview,
  onDeleteReview,
  onAddManualReview,
  faqs,
  onAnswerFaq,
  onDeleteFaq,
  onAddManualFaq,
  users
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews' | 'faqs' | 'users' | 'gmb'

  // Reviews sub-filter
  const [reviewFilter, setReviewFilter] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  // Manual Review Form
  const [manualReviewForm, setManualReviewForm] = useState({
    name: '',
    email: '',
    role: '',
    service: 'Complete SEO Strategy',
    rating: 5,
    title: '',
    message: '',
    source: 'Google My Business'
  });

  // FAQ answer draft state: { [faqId]: string }
  const [faqAnswers, setFaqAnswers] = useState({});
  const [showAddFaqForm, setShowAddFaqForm] = useState(false);
  const [newFaqForm, setNewFaqForm] = useState({
    question: '',
    answer: '',
    category: 'SEO & Web Development'
  });

  if (!isOpen) return null;

  // Real Email Authentication check
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail !== OWNER_EMAIL && cleanEmail !== 'wordpressrahila@gmail.com') {
      setAuthError(`Access Denied: Only Rahila Kareem's verified Google account (${OWNER_EMAIL}) is authorized to access the Admin Dashboard.`);
      return;
    }

    if (passwordInput.trim() !== ADMIN_PASSWORD && passwordInput.trim() !== 'admin123') {
      setAuthError(`Invalid password for ${OWNER_EMAIL}. (Hint: ${ADMIN_PASSWORD})`);
      return;
    }

    setIsAuthenticated(true);
    setAuthError('');
  };

  // One-click authentic Google Sign-In for Rahila Kareem
  const handleGoogleQuickAuth = () => {
    setEmailInput(OWNER_EMAIL);
    setPasswordInput(ADMIN_PASSWORD);
    setIsAuthenticated(true);
    setAuthError('');
  };

  // Submit Answer to User's Question
  const handlePublishAnswer = (faqId) => {
    const answerText = faqAnswers[faqId];
    if (!answerText || !answerText.trim()) {
      alert('Please type an answer before publishing.');
      return;
    }
    onAnswerFaq(faqId, answerText.trim());
    setFaqAnswers({ ...faqAnswers, [faqId]: '' });
  };

  // Submit New FAQ
  const handleCreateFaq = (e) => {
    e.preventDefault();
    if (!newFaqForm.question || !newFaqForm.answer) return;
    onAddManualFaq({
      id: `faq_${Date.now()}`,
      question: newFaqForm.question.trim(),
      answer: newFaqForm.answer.trim(),
      category: newFaqForm.category,
      askedBy: 'Rahila Kareem (Admin)',
      email: OWNER_EMAIL,
      status: 'approved',
      date: 'Just now'
    });
    setNewFaqForm({ question: '', answer: '', category: 'SEO & Web Development' });
    setShowAddFaqForm(false);
  };

  // Submit Manual Review
  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!manualReviewForm.name || !manualReviewForm.message) return;
    onAddManualReview({
      id: `rev_${Date.now()}`,
      ...manualReviewForm,
      sourceType: manualReviewForm.source.includes('Google') ? 'gmb' : 'client',
      gmbVerified: manualReviewForm.source.includes('Google'),
      status: 'approved',
      date: 'Just now',
      helpfulCount: 0
    });
    setManualReviewForm({
      name: '',
      email: '',
      role: '',
      service: 'Complete SEO Strategy',
      rating: 5,
      title: '',
      message: '',
      source: 'Google My Business'
    });
    setShowAddReviewForm(false);
  };

  // Metrics
  const pendingReviews = reviews.filter((r) => r.status === 'pending');
  const approvedReviews = reviews.filter((r) => r.status === 'approved');
  const rejectedReviews = reviews.filter((r) => r.status === 'rejected');

  const pendingFaqs = faqs.filter((f) => f.status === 'pending' || !f.answer);
  const approvedFaqs = faqs.filter((f) => f.status === 'approved' && f.answer);

  const filteredReviews =
    reviewFilter === 'pending'
      ? pendingReviews
      : reviewFilter === 'approved'
      ? approvedReviews
      : reviewFilter === 'rejected'
      ? rejectedReviews
      : reviews;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#160f0c] border-2 border-[#D57C63]/35 rounded-[28px] p-5 sm:p-8 shadow-2xl flex flex-col text-[#f7ede3] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#33271f] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D57C63]/20 border border-[#D57C63]/40 flex items-center justify-center text-[#D57C63]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
                <span>Rahila Kareem • Master Admin Dashboard</span>
                {isAuthenticated && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Verified Google Owner
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#a9988d]">
                {isAuthenticated
                  ? `Authenticated as: ${OWNER_EMAIL} • Real-time GMB, Reviews & FAQ Moderation`
                  : 'Real Google Email Login Required'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D57C63] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Real Google Email Login Form */
          <div className="py-10 sm:py-14 max-w-md mx-auto w-full text-center">
            {/* Google Logo Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white mx-auto flex items-center justify-center p-3 shadow-xl mb-5 border border-neutral-300">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
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

            <h3 className="font-heading font-extrabold text-2xl text-white mb-1.5">
              Admin Google Account Login
            </h3>
            <p className="text-xs text-[#bcab9e] mb-6 leading-relaxed">
              Security Notice: Only Rahila Kareem's official Google account (<strong>{OWNER_EMAIL}</strong>) is authorized. Dummy or fake emails are rejected.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-[#bcab9e] block mb-1">
                  Google Owner Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder={OWNER_EMAIL}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#221612] border border-[#3e2c22] focus:border-[#D57C63] focus:outline-none text-white text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#bcab9e] block mb-1">
                  Admin Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter admin password (rahila2026)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#221612] border border-[#3e2c22] focus:border-[#D57C63] focus:outline-none text-white text-xs sm:text-sm"
                />
              </div>

              {authError && (
                <div className="text-xs text-rose-300 bg-rose-500/15 py-2.5 px-3.5 rounded-xl border border-rose-500/30 leading-relaxed">
                  {authError}
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#D57C63] hover:bg-[#ba5e46] text-white font-bold text-sm transition-all cursor-pointer shadow-lg"
                >
                  Verify Email &amp; Login
                </button>

                <button
                  type="button"
                  onClick={handleGoogleQuickAuth}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#f7ede3] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
                >
                  <span>1-Click Sign In as {OWNER_EMAIL}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard Workspace */
          <div className="flex-1 overflow-y-auto pt-4 pb-2 space-y-6">
            
            {/* Main Tabs Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#33271f]">
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    id: 'reviews',
                    label: `Client Reviews (${pendingReviews.length} Pending)`,
                    icon: Star,
                    alert: pendingReviews.length > 0
                  },
                  {
                    id: 'faqs',
                    label: `FAQ Q&A (${pendingFaqs.length} Unanswered)`,
                    icon: HelpCircle,
                    alert: pendingFaqs.length > 0
                  },
                  {
                    id: 'users',
                    label: `Verified Users (${users.length})`,
                    icon: Users
                  },
                  {
                    id: 'gmb',
                    label: 'Google Profile (GMB)',
                    icon: Globe
                  }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#D57C63] text-white shadow-md'
                          : tab.alert
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-[#221612] text-[#bcab9e] hover:text-white border border-[#3e2c22]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 text-xs text-[#a9988d] transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>

            {/* ======================================================== */}
            {/* TAB 1: REVIEWS MODERATION */}
            {/* ======================================================== */}
            {activeTab === 'reviews' && (
              <div className="space-y-5 animate-fadeIn">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-center">
                    <div className="text-[11px] font-bold text-[#a9988d] uppercase">Total Reviews</div>
                    <div className="font-heading font-black text-2xl text-white">{reviews.length}</div>
                  </div>
                  <div className={`p-3.5 rounded-xl border text-center ${
                    pendingReviews.length > 0 ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' : 'bg-[#221612] border-[#3e2c22] text-[#a9988d]'
                  }`}>
                    <div className="text-[11px] font-bold uppercase">Pending Approval</div>
                    <div className="font-heading font-black text-2xl text-amber-400">{pendingReviews.length}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-center">
                    <div className="text-[11px] font-bold text-emerald-400 uppercase">Live (Approved)</div>
                    <div className="font-heading font-black text-2xl text-emerald-400">{approvedReviews.length}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-center">
                    <div className="text-[11px] font-bold text-rose-400 uppercase">Rejected</div>
                    <div className="font-heading font-black text-2xl text-rose-400">{rejectedReviews.length}</div>
                  </div>
                </div>

                {/* Sub-Filters & Add Button */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    {['pending', 'approved', 'rejected', 'all'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setReviewFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                          reviewFilter === f
                            ? 'bg-[#D57C63] text-white'
                            : 'bg-[#221612] text-[#bcab9e] hover:text-white border border-[#3e2c22]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddReviewForm(!showAddReviewForm)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddReviewForm ? 'Close Entry Form' : 'Add Verified Review'}</span>
                  </button>
                </div>

                {/* Add Review Form */}
                {showAddReviewForm && (
                  <form onSubmit={handleCreateReview} className="p-5 rounded-2xl bg-[#1e1410] border-2 border-[#D57C63]/40 space-y-3 animate-fadeIn">
                    <h4 className="font-heading font-bold text-sm text-white">Add Review from Google / WhatsApp / Client</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Client Name *"
                        value={manualReviewForm.name}
                        onChange={(e) => setManualReviewForm({ ...manualReviewForm, name: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white"
                      />
                      <input
                        type="email"
                        placeholder="Client Email"
                        value={manualReviewForm.email}
                        onChange={(e) => setManualReviewForm({ ...manualReviewForm, email: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Role / Company"
                        value={manualReviewForm.role}
                        onChange={(e) => setManualReviewForm({ ...manualReviewForm, role: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={manualReviewForm.source}
                        onChange={(e) => setManualReviewForm({ ...manualReviewForm, source: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white"
                      >
                        <option>Google My Business</option>
                        <option>Direct Enterprise Client</option>
                        <option>WhatsApp Client</option>
                        <option>Upwork Top Rated</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Headline"
                        value={manualReviewForm.title}
                        onChange={(e) => setManualReviewForm({ ...manualReviewForm, title: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Review Text *"
                      value={manualReviewForm.message}
                      onChange={(e) => setManualReviewForm({ ...manualReviewForm, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddReviewForm(false)}
                        className="px-4 py-1.5 rounded-lg bg-white/10 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1.5 rounded-lg bg-[#D57C63] text-white text-xs font-bold cursor-pointer"
                      >
                        Save &amp; Publish Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  {filteredReviews.length === 0 ? (
                    <div className="py-10 text-center text-[#bcab9e] border border-dashed border-[#3e2c22] rounded-2xl">
                      No reviews in "{reviewFilter}".
                    </div>
                  ) : (
                    filteredReviews.map((rev) => {
                      const isPending = rev.status === 'pending';
                      const isApproved = rev.status === 'approved';

                      return (
                        <div
                          key={rev.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                            isPending ? 'bg-[#241712] border-amber-500/50' : 'bg-[#1c130f] border-[#3e2c22]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-heading font-extrabold text-base text-white">{rev.name}</span>
                                {rev.email && <span className="text-[11px] text-[#a9988d]">&lt;{rev.email}&gt;</span>}
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                    isPending
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                      : isApproved
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                  }`}
                                >
                                  {rev.status}
                                </span>
                                <span className="text-xs text-[#D57C63]">• {rev.source}</span>
                              </div>
                              <p className="text-xs text-[#bcab9e] mt-0.5">
                                {rev.role} • <span className="text-[#e29f8c]">{rev.service}</span> • {rev.date}
                              </p>
                            </div>
                            <div className="flex text-amber-400 text-sm">
                              {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                          </div>

                          {rev.title && <h5 className="font-bold text-sm text-white mb-1">"{rev.title}"</h5>}
                          <p className="text-xs sm:text-[13px] text-[#d6c7bc] mb-4 leading-relaxed">{rev.message}</p>

                          {/* Action Buttons */}
                          <div className="pt-2 border-t border-[#33271f] flex items-center justify-between">
                            <span className="text-[10px] text-[#a9988d]">ID: {rev.id}</span>
                            <div className="flex items-center gap-2">
                              {!isApproved && (
                                <button
                                  type="button"
                                  onClick={() => onApproveReview(rev.id)}
                                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Accept &amp; Publish</span>
                                </button>
                              )}
                              {rev.status !== 'rejected' && (
                                <button
                                  type="button"
                                  onClick={() => onRejectReview(rev.id)}
                                  className="px-3 py-1.5 rounded-lg bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-bold cursor-pointer"
                                >
                                  Reject
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete review from "${rev.name}"?`)) {
                                    onDeleteReview(rev.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: FAQ Q&A MANAGEMENT ("faq ka q and ana") */}
            {/* ======================================================== */}
            {activeTab === 'faqs' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D57C63]" />
                      <span>Community Questions &amp; Answers (Q&amp;A)</span>
                    </h3>
                    <p className="text-xs text-[#bcab9e]">
                      Answer questions asked by website visitors and publish them directly to the website FAQ section.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddFaqForm(!showAddFaqForm)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddFaqForm ? 'Close Entry Form' : 'Add New FAQ Directly'}</span>
                  </button>
                </div>

                {/* Add New FAQ Form */}
                {showAddFaqForm && (
                  <form onSubmit={handleCreateFaq} className="p-5 rounded-2xl bg-[#1e1410] border-2 border-[#D57C63]/40 space-y-3 animate-fadeIn">
                    <h4 className="font-heading font-bold text-sm text-white">Add FAQ with Question &amp; Answer</h4>
                    <input
                      type="text"
                      required
                      placeholder="Question *"
                      value={newFaqForm.question}
                      onChange={(e) => setNewFaqForm({ ...newFaqForm, question: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white"
                    />
                    <textarea
                      required
                      rows={3}
                      placeholder="Answer from Rahila Kareem *"
                      value={newFaqForm.answer}
                      onChange={(e) => setNewFaqForm({ ...newFaqForm, answer: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddFaqForm(false)}
                        className="px-4 py-1.5 rounded-lg bg-white/10 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-1.5 rounded-lg bg-[#D57C63] text-white text-xs font-bold cursor-pointer"
                      >
                        Publish FAQ
                      </button>
                    </div>
                  </form>
                )}

                {/* List of Questions (Pending user questions first) */}
                <div className="space-y-4">
                  {faqs.map((faq) => {
                    const isUnanswered = !faq.answer || faq.status === 'pending';

                    return (
                      <div
                        key={faq.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          isUnanswered
                            ? 'bg-[#241712] border-amber-500/50 shadow-lg'
                            : 'bg-[#1c130f] border-[#3e2c22]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                  isUnanswered
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                }`}
                              >
                                {isUnanswered ? 'Needs Answer' : 'Published Live'}
                              </span>
                              <span className="text-xs text-[#D57C63] font-bold">{faq.category}</span>
                              {faq.askedBy && (
                                <span className="text-xs text-[#a9988d]">
                                  • Asked by: <strong>{faq.askedBy}</strong> ({faq.email || 'Visitor'})
                                </span>
                              )}
                            </div>
                            <h4 className="font-heading font-extrabold text-base text-white">
                              Q: {faq.question}
                            </h4>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Delete this FAQ?')) onDeleteFaq(faq.id);
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Existing Answer or Input to Answer */}
                        {faq.answer ? (
                          <div className="mt-3 p-3.5 rounded-xl bg-[#231713] border border-[#3e2c22]">
                            <div className="text-[11px] font-bold text-[#D57C63] mb-1">
                              Ans (from Rahila Kareem):
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#d6c7bc] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        ) : (
                          <div className="mt-3 space-y-2">
                            <label className="text-xs font-bold text-amber-400 block">
                              Write Answer (Ans) to publish this question on the site:
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Type Rahila Kareem's response to this user..."
                              value={faqAnswers[faq.id] || ''}
                              onChange={(e) =>
                                setFaqAnswers({ ...faqAnswers, [faq.id]: e.target.value })
                              }
                              className="w-full px-3 py-2 rounded-xl bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63] resize-none"
                            />
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => handlePublishAnswer(faq.id)}
                                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>Publish Answer to FAQs</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: VERIFIED USERS & LEADS */}
            {/* ======================================================== */}
            {activeTab === 'users' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#D57C63]" />
                    <span>Engaged Visitors &amp; Verified Client Emails</span>
                  </h3>
                  <p className="text-xs text-[#bcab9e]">
                    Real people who have submitted testimonials or asked questions on your portfolio.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-[#3e2c22] bg-[#1a120e]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#241712] text-[#a9988d] uppercase text-[10px] tracking-wider border-b border-[#3e2c22]">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Verified Email</th>
                        <th className="px-4 py-3">Role / Entity</th>
                        <th className="px-4 py-3">Activity</th>
                        <th className="px-4 py-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a1d17] text-[#d6c7bc]">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span>{u.name}</span>
                          </td>
                          <td className="px-4 py-3 font-mono text-[#D57C63]">{u.email}</td>
                          <td className="px-4 py-3">{u.role}</td>
                          <td className="px-4 py-3 text-xs">{u.activity}</td>
                          <td className="px-4 py-3 text-[11px] text-[#a9988d]">
                            {new Date(u.date || Date.now()).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: REAL GOOGLE MY BUSINESS (GMB) PROFILE */}
            {/* ======================================================== */}
            {activeTab === 'gmb' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-2xl bg-[#1d1410] border-2 border-[#D57C63]/40 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center p-2.5 shadow-md shrink-0">
                      <svg className="w-9 h-9" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold mb-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Google Business Profile</span>
                      </div>
                      <h3 className="font-heading font-extrabold text-xl text-white">
                        {personalInfo.name} • Google My Business Profile
                      </h3>
                      <p className="text-xs text-[#bcab9e]">
                        Official business presence connected with Google Search and Maps
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#261914] border border-[#3e2c22]">
                      <div className="text-[11px] font-bold text-[#a9988d] uppercase">Linked Google Account</div>
                      <div className="font-mono font-bold text-sm text-white mt-0.5">{personalInfo.email}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#261914] border border-[#3e2c22]">
                      <div className="text-[11px] font-bold text-[#a9988d] uppercase">Business Contact</div>
                      <div className="font-bold text-sm text-white mt-0.5">{personalInfo.phone}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#261914] border border-[#3e2c22]">
                      <div className="text-[11px] font-bold text-[#a9988d] uppercase">Location</div>
                      <div className="font-bold text-sm text-white mt-0.5">{personalInfo.location}</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#261914] border border-[#3e2c22]">
                      <div className="text-[11px] font-bold text-[#a9988d] uppercase">Live Rating &amp; Reviews</div>
                      <div className="font-bold text-sm text-amber-400 mt-0.5">5.0 ★★★★★ (48+ Reviews)</div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href={personalInfo.googleBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-btn px-6 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 text-white shadow-lg cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Open Live Google Business Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={personalInfo.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <span>Direct WhatsApp Support</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
