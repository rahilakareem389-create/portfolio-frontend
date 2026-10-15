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

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-card modal-enter w-full max-w-2xl p-6 sm:p-8 rounded-[28px] border border-[var(--org)]/40 relative shadow-2xl bg-[#170e0a] text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#bcab9e] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#2d1b14]">
          <div className="w-12 h-12 rounded-2xl bg-[#D57C63]/20 border border-[#D57C63]/50 flex items-center justify-center text-[#D57C63] shadow-inner">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-black text-xl text-white">Client Workspace</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Account</span>
              </span>
            </div>
            <p className="text-xs text-[#bcab9e] mt-0.5">
              Secure client dashboard authenticated against MongoDB &amp; email verification
            </p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="p-5 rounded-2xl bg-[#221612] border border-[#3e2c22] mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{user.name || 'Verified Client'}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#D57C63]/20 text-[#D57C63] font-mono">
                {user.role || 'Client'}
              </span>
            </div>
            <div className="text-xs text-[#bcab9e] flex items-center gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-[#D57C63]" />
              <span>{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={fetchDashboard}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-[#bcab9e] transition-all cursor-pointer"
              title="Refresh Workspace"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-300">Email Ownership Confirmed</h4>
            <p className="text-[11px] text-[#a9988d] mt-0.5">
              Your inbox was verified via a cryptographically secure single-use code. All project communications and quotes are sent to <strong className="text-white">{user.email}</strong>.
            </p>
          </div>
        </div>

        {/* Private Inquiries Section */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#D57C63]" />
              <span>Your Project Inquiries ({dashboardData.inquiries?.length || 0})</span>
            </h3>
          </div>

          {dashboardData.inquiries && dashboardData.inquiries.length > 0 ? (
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
              {dashboardData.inquiries.map((inq) => (
                <div
                  key={inq.id || inq._id}
                  className="p-3.5 rounded-xl bg-[#1f140f] border border-[#332219] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{inq.subject || inq.plan || 'Project Inquiry'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase">
                      {inq.status || 'Received'}
                    </span>
                  </div>
                  <p className="text-xs text-[#bcab9e] line-clamp-2">{inq.message}</p>
                  <div className="text-[10px] text-[#8a7569] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{inq.date ? new Date(inq.date).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-2xl bg-[#1f140f] border border-[#332219] text-[#8a7569]">
              <MessageSquare className="w-7 h-7 mx-auto mb-2 opacity-40 text-[#D57C63]" />
              <p className="text-xs font-bold text-white">No active inquiries submitted yet</p>
              <p className="text-[11px] mt-1">Submit a project requirement through the contact form to track it here.</p>
            </div>
          )}
        </div>

        {/* Quick Action Footer */}
        <div className="pt-4 border-t border-[#2d1b14] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <a
            href={personalInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span>Direct WhatsApp Discussion</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
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
