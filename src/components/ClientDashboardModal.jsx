import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Clock,
  LogOut,
  FolderOpen,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  RefreshCw,
  Star,
  HelpCircle,
  Check
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

export default function ClientDashboardModal({ isOpen, onClose, user, onLogout }) {
  const [dashboardData, setDashboardData] = useState({
    inquiries: [],
    reviews: [],
    faqs: [],
    securityStatus: {
      emailVerified: true,
      accountType: 'Client',
      lastLogin: new Date()
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchDashboard();
    }
  }, [isOpen, user]);

  const fetchDashboard = async () => {
    setLoading(true);
    const userEmail = (user?.email || '').toLowerCase().trim();

    // Check local caches
    let localMsgs = [];
    let localRevs = [];
    let localFaqs = [];
    try {
      const storedM = JSON.parse(localStorage.getItem('rahila_portfolio_messages') || '[]');
      if (Array.isArray(storedM)) localMsgs = storedM.filter(m => (m.email || '').toLowerCase().trim() === userEmail);
      const storedR = JSON.parse(localStorage.getItem('rahila_portfolio_reviews') || '[]');
      if (Array.isArray(storedR)) localRevs = storedR.filter(r => (r.email || '').toLowerCase().trim() === userEmail);
      const storedF = JSON.parse(localStorage.getItem('rahila_portfolio_faqs') || '[]');
      if (Array.isArray(storedF)) localFaqs = storedF.filter(f => (f.email || '').toLowerCase().trim() === userEmail);
    } catch (_) {}

    try {
      const token = localStorage.getItem('rahila_auth_token');
      const res = await fetch(`${API_BASE_URL}/api/auth/dashboard`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          const sInq = Array.isArray(data.inquiries) ? data.inquiries : [];
          const mergedInq = [...sInq];
          localMsgs.forEach(lm => {
            const idx = mergedInq.findIndex(sm => sm.id === lm.id);
            if (idx === -1) mergedInq.push(lm);
            else if (mergedInq[idx].adminNotes) lm.adminNotes = mergedInq[idx].adminNotes;
          });

          const sRev = Array.isArray(data.reviews) ? data.reviews : [];
          const mergedRev = [...sRev];
          localRevs.forEach(lr => {
            const idx = mergedRev.findIndex(sr => sr.id === lr.id);
            if (idx === -1) mergedRev.push(lr);
          });

          const sFaq = Array.isArray(data.faqs) ? data.faqs : [];
          const mergedFaq = [...sFaq];
          localFaqs.forEach(lf => {
            const idx = mergedFaq.findIndex(sf => sf.id === lf.id);
            if (idx === -1) mergedFaq.push(lf);
          });

          setDashboardData({
            ...data,
            inquiries: mergedInq,
            reviews: mergedRev,
            faqs: mergedFaq
          });
          return;
        }
      }
    } catch (err) {
      console.warn('Dashboard fetch notice:', err);
    } finally {
      setLoading(false);
    }

    setDashboardData(prev => ({
      ...prev,
      inquiries: localMsgs,
      reviews: localRevs,
      faqs: localFaqs
    }));
  };

  if (!isOpen || !user || !user.emailVerified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="dialog-modal-box relative w-full max-w-2xl my-auto p-6 sm:p-8 rounded-[28px] shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="modal-cancel-btn absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-neutral-200 dark:border-[#38261e]">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center text-[#ff7a1a] shadow-inner shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="modal-title font-heading font-black text-xl">Client Workspace</h2>
              <span className="dialog-modal-auth-badge inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Account</span>
              </span>
            </div>
            <p className="modal-subtitle text-xs mt-0.5 font-medium leading-relaxed">
              Track project inquiries, client reviews, community FAQs, and Rahila Kareem's replies.
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="modal-box-card p-5 rounded-2xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-black modal-title flex items-center gap-2">
              <span>{user.name || 'Verified Client'}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-orange-500/15 dark:bg-orange-500/25 text-orange-700 dark:text-orange-300 font-bold border border-orange-500/30">
                {user.role || 'Client'}
              </span>
            </div>
            <div className="text-xs modal-subtitle flex items-center gap-1.5 font-semibold">
              <Mail className="w-3.5 h-3.5 text-[#ff7a1a]" />
              <span>{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchDashboard}
              className="modal-cancel-btn p-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="Refresh Workspace"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Section 1: Private Inquiries & Admin Replies */}
        <div className="space-y-3 mb-6">
          <h3 className="modal-title font-heading font-bold text-sm flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-[#ff7a1a]" />
            <span>Your Project Inquiries ({dashboardData.inquiries?.length || 0})</span>
          </h3>

          {dashboardData.inquiries && dashboardData.inquiries.length > 0 ? (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {dashboardData.inquiries.map((inq) => (
                <div
                  key={inq.id || inq._id}
                  className="modal-box-card p-4 rounded-2xl space-y-2 border border-neutral-200 dark:border-[#38261e]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold modal-title">{inq.subject || inq.plan || 'Project Inquiry'}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                      inq.adminNotes
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30'
                    }`}>
                      {inq.adminNotes ? 'Admin Replied' : (inq.status || 'Received')}
                    </span>
                  </div>
                  <p className="text-xs modal-subtitle leading-relaxed">{inq.message}</p>
                  
                  {/* Dedicated Admin Reply Card */}
                  {inq.adminNotes ? (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-orange-700 dark:text-orange-400">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff7a1a]" />
                        <span>Reply from Rahila Kareem (Admin):</span>
                      </div>
                      <p className="text-neutral-800 dark:text-neutral-100 leading-relaxed font-semibold">
                        {inq.adminNotes}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 italic pt-1">
                      Rahila Kareem will review your inquiry and reply here shortly.
                    </div>
                  )}

                  <div className="text-[10px] modal-subtitle flex items-center gap-1 font-semibold pt-1 border-t border-neutral-100 dark:border-neutral-800">
                    <Clock className="w-3 h-3 text-[#ff7a1a]" />
                    <span>{inq.date ? new Date(inq.date).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="modal-box-card p-6 text-center rounded-2xl">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-[#ff7a1a]" />
              <p className="text-xs font-bold modal-title">No active inquiries submitted yet</p>
              <p className="text-xs modal-subtitle mt-1">Submit a project requirement through the contact form to track it here.</p>
            </div>
          )}
        </div>

        {/* Section 2: User Submitted Reviews & Admin Replies */}
        {dashboardData.reviews && dashboardData.reviews.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="modal-title font-heading font-bold text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Your Client Reviews ({dashboardData.reviews.length})</span>
            </h3>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {dashboardData.reviews.map((rev) => (
                <div key={rev.id || rev._id} className="modal-box-card p-4 rounded-2xl space-y-2 border border-neutral-200 dark:border-[#38261e]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold modal-title">{rev.title || rev.service || 'Client Review'}</span>
                    <span className="text-amber-500 font-bold">★ {rev.rating}/5</span>
                  </div>
                  <p className="text-xs modal-subtitle leading-relaxed italic">"{rev.message}"</p>

                  {/* Admin Reply on Review */}
                  {rev.adminReply && rev.adminReply.message && (
                    <div className="mt-2.5 p-3 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-orange-700 dark:text-orange-400">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff7a1a]" />
                        <span>Rahila Kareem (Owner &amp; Admin) Replied:</span>
                      </div>
                      <p className="text-neutral-800 dark:text-neutral-100 italic leading-relaxed">
                        "{rev.adminReply.message}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: User Community FAQs & Admin Answers */}
        {dashboardData.faqs && dashboardData.faqs.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="modal-title font-heading font-bold text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#ff7a1a]" />
              <span>Your Community Questions ({dashboardData.faqs.length})</span>
            </h3>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {dashboardData.faqs.map((faq) => (
                <div key={faq.id || faq._id} className="modal-box-card p-4 rounded-2xl space-y-2 border border-neutral-200 dark:border-[#38261e]">
                  <span className="font-bold modal-title text-xs block">Q: {faq.question}</span>

                  {faq.answer ? (
                    <div className="mt-2 p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Official Answer from Rahila Kareem:</span>
                      </div>
                      <p className="text-neutral-800 dark:text-neutral-100 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ) : (
                    <div className="text-[11px] text-amber-600 dark:text-amber-400 italic">
                      Awaiting response from Rahila Kareem.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Action Footer */}
        <div className="pt-4 border-t border-neutral-200 dark:border-[#38261e] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-400 dark:border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>Direct WhatsApp Discussion</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl glow-btn text-white font-bold cursor-pointer text-center"
          >
            Continue Browsing Portfolio
          </button>
        </div>

      </div>
    </div>
  );
}
