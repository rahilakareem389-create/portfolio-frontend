import React, { useState, useEffect } from 'react';
import { X, Key, Sparkles, CheckCircle2, Lock, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'signup' }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'signup');
      setStatus(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({
      success: true,
      message: mode === 'signin' 
        ? 'Welcome to Rahila Kareem Client Portal! Session active.'
        : 'Account created! Welcome to Rahila Kareem Client Workspace.',
    });
    setTimeout(() => {
      onClose();
      setStatus(null);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card modal-enter w-full max-w-md p-7 rounded-[20px] border border-[var(--org)]/40 relative shadow-2xl bg-[var(--panel)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-[var(--org)]/20 border border-[var(--org)]/40 flex items-center justify-center text-[var(--org)]">
            {mode === 'signin' ? <Key className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-[var(--ink)]">
              {mode === 'signin' ? t('auth.signinTitle') : t('auth.signupTitle')}
            </h3>
            <p className="text-xs text-[var(--mute)]">
              {mode === 'signin' ? t('auth.signinDesc') : t('auth.signupDesc')}
            </p>
          </div>
        </div>

        {/* Tab Switcher: First Sign up, then Sign in */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[var(--bg)] border border-[var(--line)] mb-5">
          <button
            type="button"
            onClick={() => { setMode('signup'); setStatus(null); }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[var(--panel)] text-[var(--org)] shadow-sm'
                : 'text-[var(--mute)] hover:text-[var(--ink)]'
            }`}
          >
            ✨ {t('nav.signup')}
          </button>
          <button
            type="button"
            onClick={() => { setMode('signin'); setStatus(null); }}
            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-[var(--panel)] text-[var(--org)] shadow-sm'
                : 'text-[var(--mute)] hover:text-[var(--ink)]'
            }`}
          >
            🔑 {t('nav.signin')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--mute)] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--org)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--mute)] absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--org)]"
              />
            </div>
          </div>

          {status && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          <button
            type="submit"
            className="glow-btn w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{mode === 'signin' ? t('auth.btnSignin') : t('auth.btnSignup')}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </form>

        <p className="text-[11px] text-[var(--mute)] text-center mt-4">
          Need immediate support? Contact Rahila Kareem directly via WhatsApp.
        </p>

      </div>
    </div>
  );
};

export default AuthModal;
