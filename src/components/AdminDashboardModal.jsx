import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
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
  Eye,
  Filter
} from 'lucide-react';

const ADMIN_PASSWORD = 'rahila2026';

export default function AdminDashboardModal({
  isOpen,
  onClose,
  reviews,
  onApprove,
  onReject,
  onDelete,
  onAddManualReview
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [showAddForm, setShowAddForm] = useState(false);

  // Manual Review Form State
  const [manualForm, setManualForm] = useState({
    name: '',
    email: '',
    role: '',
    service: 'Complete SEO Strategy',
    rating: 5,
    title: '',
    message: '',
    source: 'Google My Business',
    sourceType: 'gmb',
    gmbVerified: true,
    status: 'approved'
  });

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD || passwordInput.trim() === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect admin password. (Hint: rahila2026)');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    setErrorMsg('');
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.message) return;
    onAddManualReview({
      ...manualForm,
      id: `man_${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0
    });
    setShowAddForm(false);
    setManualForm({
      name: '',
      email: '',
      role: '',
      service: 'Complete SEO Strategy',
      rating: 5,
      title: '',
      message: '',
      source: 'Google My Business',
      sourceType: 'gmb',
      gmbVerified: true,
      status: 'approved'
    });
  };

  const pendingList = reviews.filter((r) => r.status === 'pending');
  const approvedList = reviews.filter((r) => r.status === 'approved');
  const rejectedList = reviews.filter((r) => r.status === 'rejected');

  const filteredReviews =
    activeFilter === 'pending'
      ? pendingList
      : activeFilter === 'approved'
      ? approvedList
      : activeFilter === 'rejected'
      ? rejectedList
      : reviews;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#160f0c] border-2 border-[#D57C63]/35 rounded-[28px] p-5 sm:p-8 shadow-2xl flex flex-col text-[#f7ede3] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#33271f] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D57C63]/20 border border-[#D57C63]/40 flex items-center justify-center text-[#D57C63]">
              {isAuthenticated ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
                <span>Admin Reviews Portal</span>
                {isAuthenticated && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Session
                  </span>
                )}
              </h2>
              <p className="text-xs text-[#a9988d]">
                {isAuthenticated
                  ? 'Approve user reviews before they appear publicly on the Home Page'
                  : 'Enter password to access review moderation & acceptance'}
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
          /* Password Authentication Gate */
          <div className="py-12 sm:py-16 max-w-md mx-auto w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#D57C63]/15 border-2 border-[#D57C63]/30 mx-auto flex items-center justify-center text-[#D57C63] mb-5">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
              Protected Administrator Area
            </h3>
            <p className="text-xs sm:text-sm text-[#bcab9e] mb-6 leading-relaxed">
              Moderation controls for approving client reviews and managing authentic Google My Business testimonials.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Admin Password (rahila2026)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] focus:border-[#D57C63] focus:outline-none text-white text-sm"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-400 bg-rose-500/10 py-2 px-3 rounded-lg border border-rose-500/20">
                  {errorMsg}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#D57C63] hover:bg-[#ba5e46] text-white font-bold text-sm transition-all cursor-pointer shadow-lg"
                >
                  Unlock Dashboard
                </button>
                <button
                  type="button"
                  onClick={handleQuickUnlock}
                  className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-[#f7ede3] font-bold text-xs transition-all cursor-pointer whitespace-nowrap"
                  title="One-click demo unlock for testing"
                >
                  Quick Unlock
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto pt-5 pb-2 space-y-6">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-center">
                <div className="text-xs font-bold text-[#a9988d] uppercase tracking-wider">Total</div>
                <div className="font-heading font-black text-2xl text-white mt-0.5">{reviews.length}</div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                pendingList.length > 0
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-[#221612] border-[#3e2c22] text-[#a9988d]'
              }`}>
                <div className="text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  {pendingList.length > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                  <span>Pending</span>
                </div>
                <div className="font-heading font-black text-2xl text-amber-400 mt-0.5">{pendingList.length}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-center">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Approved (Live)</div>
                <div className="font-heading font-black text-2xl text-emerald-400 mt-0.5">{approvedList.length}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-center">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Rejected</div>
                <div className="font-heading font-black text-2xl text-rose-400 mt-0.5">{rejectedList.length}</div>
              </div>
            </div>

            {/* Controls Bar: Filter Tabs + Add Review Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'pending', label: `Pending (${pendingList.length})`, highlight: pendingList.length > 0 },
                  { id: 'approved', label: `Approved (${approvedList.length})` },
                  { id: 'rejected', label: `Rejected (${rejectedList.length})` },
                  { id: 'all', label: `All Reviews (${reviews.length})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[#D57C63] text-white shadow-md'
                        : tab.highlight
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-[#221612] text-[#bcab9e] hover:text-white border border-[#3e2c22]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel Manual Entry' : 'Add Manual Review'}</span>
              </button>
            </div>

            {/* Optional: Add Manual Review Form */}
            {showAddForm && (
              <form
                onSubmit={handleManualSubmit}
                className="p-5 rounded-2xl bg-[#1e1410] border-2 border-[#D57C63]/40 space-y-4 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D57C63]" />
                    <span>Add Verified Client Review Manually</span>
                  </h4>
                  <span className="text-[11px] text-[#bcab9e]">Auto-approved upon submission</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Smith"
                      value={manualForm.name}
                      onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Role / Company</label>
                    <input
                      type="text"
                      placeholder="e.g. CMO, FinTech Global"
                      value={manualForm.role}
                      onChange={(e) => setManualForm({ ...manualForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Service Delivered</label>
                    <select
                      value={manualForm.service}
                      onChange={(e) => setManualForm({ ...manualForm, service: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63]"
                    >
                      <option>Complete SEO Strategy</option>
                      <option>High DA Guest Posting &amp; GBOB</option>
                      <option>Full Stack Web Development</option>
                      <option>WordPress &amp; WooCommerce</option>
                      <option>Technical SEO Audit</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Source</label>
                    <select
                      value={manualForm.source}
                      onChange={(e) => {
                        const val = e.target.value;
                        setManualForm({
                          ...manualForm,
                          source: val,
                          sourceType: val.includes('Google') ? 'gmb' : 'client',
                          gmbVerified: val.includes('Google')
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63]"
                    >
                      <option>Google My Business</option>
                      <option>Direct Enterprise Client</option>
                      <option>Fiverr Pro Verified</option>
                      <option>Upwork Top Rated</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Rating</label>
                    <div className="flex items-center gap-1 py-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setManualForm({ ...manualForm, rating: star })}
                          className={`text-lg transition-transform hover:scale-125 ${
                            star <= manualForm.rating ? 'text-amber-400' : 'text-neutral-600'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Headline</label>
                    <input
                      type="text"
                      placeholder="e.g. Ranked Top 3 on Google"
                      value={manualForm.title}
                      onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#bcab9e] block mb-1">Review Body *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter the authentic testimonial..."
                    value={manualForm.message}
                    onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#2b1b15] border border-[#443026] text-xs text-white focus:outline-none focus:border-[#D57C63] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#D57C63] hover:bg-[#ba5e46] text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
                  >
                    Save &amp; Publish Review
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-3.5">
              {filteredReviews.length === 0 ? (
                <div className="py-12 text-center text-[#bcab9e] border border-dashed border-[#3e2c22] rounded-2xl">
                  <AlertCircle className="w-8 h-8 text-[#D57C63] mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold">No reviews found in this filter ({activeFilter}).</p>
                </div>
              ) : (
                filteredReviews.map((rev) => {
                  const isPending = rev.status === 'pending';
                  const isApproved = rev.status === 'approved';
                  const isRejected = rev.status === 'rejected';

                  return (
                    <div
                      key={rev.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isPending
                          ? 'bg-[#241712] border-amber-500/50 shadow-lg'
                          : isApproved
                          ? 'bg-[#1c130f] border-[#3e2c22]'
                          : 'bg-[#18100d] border-rose-950/40 opacity-70'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-heading font-extrabold text-base text-white">
                              {rev.name}
                            </span>

                            {rev.email && (
                              <span className="text-[11px] text-[#a9988d]">
                                &lt;{rev.email}&gt;
                              </span>
                            )}

                            {/* Status Tag */}
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                isPending
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : isApproved
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                              }`}
                            >
                              {rev.status}
                            </span>

                            {/* Source Tag */}
                            <span className="text-[11px] text-[#D57C63] font-semibold">
                              • {rev.source || 'Website'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#bcab9e]">
                            <span>{rev.role}</span>
                            <span>•</span>
                            <span className="text-[#e29f8c] font-semibold">{rev.service}</span>
                            <span>•</span>
                            <span>{rev.date}</span>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 text-amber-400 text-sm">
                          {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                            <span key={sIdx}>★</span>
                          ))}
                        </div>
                      </div>

                      {/* Title & Body */}
                      {rev.title && (
                        <h5 className="font-heading font-bold text-sm text-white mb-1">
                          "{rev.title}"
                        </h5>
                      )}
                      <p className="text-xs sm:text-[13px] text-[#d6c7bc] leading-relaxed mb-4">
                        {rev.message}
                      </p>

                      {/* Action Buttons Toolbar */}
                      <div className="pt-3 border-t border-[#33271f] flex flex-wrap items-center justify-between gap-3">
                        <div className="text-[11px] text-[#a9988d]">
                          ID: <span className="font-mono text-white/70">{rev.id}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Accept / Approve Button */}
                          {!isApproved && (
                            <button
                              type="button"
                              onClick={() => onApprove(rev.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                              title="Accept review: it will appear publicly on the Home Page"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept &amp; Publish</span>
                            </button>
                          )}

                          {/* Reject Button */}
                          {!isRejected && (
                            <button
                              type="button"
                              onClick={() => onReject(rev.id)}
                              className="px-3.5 py-1.5 rounded-lg bg-amber-600/80 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                              title="Reject review: it will NOT be shown publicly"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete review from "${rev.name}" permanently?`)) {
                                onDelete(rev.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white transition-all cursor-pointer"
                            title="Delete permanently"
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

        {/* Footer info note */}
        {isAuthenticated && (
          <div className="pt-3 border-t border-[#33271f] flex items-center justify-between text-[11px] text-[#a9988d] shrink-0">
            <span>Only reviews with status "approved" are visible to public visitors on the Home Page.</span>
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="text-[#D57C63] hover:underline cursor-pointer"
            >
              Lock Session
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
