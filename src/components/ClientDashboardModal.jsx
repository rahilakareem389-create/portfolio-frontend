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
  RefreshCw
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

export default function ClientDashboardModal({ isOpen, onClose, user, onLogout }) {
  const [dashboardData, setDashboardData] = useState({
    inquiries: [],
    reviews: [],
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
          setDashboardData(data);
        }
      }
    } catch (err) {
      console.warn('Dashboard fetch notice:', err);
    } finally {
      setLoading(false);
    }
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
              Secure client dashboard authenticated via Firebase Authentication &amp; email verification
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

        {/* Verification Status Banner */}
        <div className="dialog-modal-auth-banner p-4 rounded-2xl mb-6 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Email Ownership Confirmed</h4>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-100 font-medium leading-relaxed mt-0.5">
              Your inbox was verified via a cryptographically secure single-use code. All project communications and quotes are sent to <strong className="underline underline-offset-2 font-bold text-emerald-950 dark:text-emerald-300">{user.email}</strong>.
            </p>
          </div>
        </div>

        {/* Private Inquiries Section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="modal-title font-heading font-bold text-sm flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#ff7a1a]" />
              <span>Your Project Inquiries ({dashboardData.inquiries?.length || 0})</span>
            </h3>
          </div>

          {dashboardData.inquiries && dashboardData.inquiries.length > 0 ? (
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {dashboardData.inquiries.map((inq) => (
                <div
                  key={inq.id || inq._id}
                  className="modal-box-card p-3.5 rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold modal-title">{inq.subject || inq.plan || 'Project Inquiry'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold uppercase border border-amber-500/30">
                      {inq.status || 'Received'}
                    </span>
                  </div>
                  <p className="text-xs modal-subtitle line-clamp-2">{inq.message}</p>
                  <div className="text-[10px] modal-subtitle flex items-center gap-1 font-semibold">
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
