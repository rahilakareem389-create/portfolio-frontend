import React, { useState, useEffect } from 'react';
import {
  X,
  Key,
  Sparkles,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Check,
  User,
  Send,
  Eye,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

const AuthModal = ({ isOpen, onClose, initialMode = 'signup', onAuthSuccess }) => {
  const { t } = useLanguage();

  // Mode: 'signup' | 'signin' | 'verify'
  const [mode, setMode] = useState(initialMode || 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Loading states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Resend OTP cooldown timer
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'signup');
      setErrorMsg('');
      setSuccessMsg('');
      setOtp('');
    }
  }, [isOpen, initialMode]);

  // Resend cooldown countdown
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  if (!isOpen) return null;

  // Password rules validation
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff7a1a', '#ffb347', '#25D366', '#ffffff']
    });
  };

  // 1. Submit Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!isPasswordValid) {
      setErrorMsg('Please satisfy all password complexity requirements.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password
        })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        setSuccessMsg(data.message || 'Verification code dispatched to your email!');
        setMode('verify');
        setResendCooldown(60);
      } else {
        setErrorMsg(data?.message || 'Registration failed. Please check your inputs.');
      }
    } catch (err) {
      setErrorMsg('Network error. Unable to reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit OTP Email Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otp || otp.trim().length < 6) {
      setErrorMsg('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim()
        })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        triggerConfetti();
        if (data.token) {
          localStorage.setItem('rahila_auth_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('rahila_auth_user', JSON.stringify(data.user));
          if (onAuthSuccess) onAuthSuccess(data.user);
        }

        setSuccessMsg('Account verified successfully! Entering your workspace...');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrorMsg(data?.message || 'Verification failed. Please check the code and try again.');
      }
    } catch (err) {
      setErrorMsg('Network error while verifying OTP.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Resend Verification OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data && data.success) {
        setSuccessMsg(data.message || 'A fresh verification code has been dispatched.');
        setResendCooldown(60);
      } else {
        setErrorMsg(data?.message || 'Unable to resend code right now.');
      }
    } catch (err) {
      setErrorMsg('Network error while requesting code.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Submit Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        triggerConfetti();
        if (data.token) {
          localStorage.setItem('rahila_auth_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('rahila_auth_user', JSON.stringify(data.user));
          if (onAuthSuccess) onAuthSuccess(data.user);
        }

        setSuccessMsg(`Welcome back, ${data.user?.name || 'Client'}!`);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else if (data?.code === 'UNVERIFIED_EMAIL') {
        // Automatically route to verification step
        setErrorMsg(data.message);
        setMode('verify');
        setResendCooldown(30);
      } else {
        setErrorMsg(data?.message || 'Invalid email address or password.');
      }
    } catch (err) {
      setErrorMsg('Network error during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-card modal-enter w-full max-w-md p-6 sm:p-8 rounded-[28px] border border-[var(--org)]/40 relative shadow-2xl bg-[#170e0a] text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#bcab9e] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#D57C63]/20 border border-[#D57C63]/50 flex items-center justify-center text-[#D57C63] shadow-inner shrink-0">
            {mode === 'verify' ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            ) : mode === 'signin' ? (
              <Key className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-heading font-black text-xl text-white">
              {mode === 'verify'
                ? 'Verify Email Code'
                : mode === 'signin'
                ? 'Client Sign In'
                : 'Create Client Account'}
            </h3>
            <p className="text-xs text-[#bcab9e]">
              {mode === 'verify'
                ? 'Single-use cryptographic OTP verification'
                : mode === 'signin'
                ? 'Access your private project workspace'
                : 'Real email verification required to activate'}
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs (Hidden during OTP step) */}
        {mode !== 'verify' && (
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#221612] border border-[#3e2c22] mb-5">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#D57C63] text-white shadow-md'
                  : 'text-[#bcab9e] hover:text-white'
              }`}
            >
              ✨ Register Account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-[#D57C63] text-white shadow-md'
                  : 'text-[#bcab9e] hover:text-white'
              }`}
            >
              🔑 Client Sign In
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-3.5 mb-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 1A: REGISTRATION FORM */}
        {/* ======================================================== */}
        {mode === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[#d6c7bc] font-bold mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8a7569] absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D57C63]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#d6c7bc] font-bold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8a7569] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D57C63]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#d6c7bc] font-bold mb-1">Secure Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8a7569] absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D57C63]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#8a7569] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Policy Live Indicators */}
              <div className="mt-2.5 p-2.5 rounded-xl bg-[#20140e] border border-[#332219] space-y-1 text-[11px]">
                <span className="text-[#8a7569] font-bold block mb-1">Password Requirements:</span>
                <div className="grid grid-cols-2 gap-1 text-[10.5px]">
                  <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400 font-bold' : 'text-[#8a7569]'}`}>
                    <Check className="w-3 h-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1.5 ${hasUppercase ? 'text-emerald-400 font-bold' : 'text-[#8a7569]'}`}>
                    <Check className="w-3 h-3" /> 1 Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${hasLowercase ? 'text-emerald-400 font-bold' : 'text-[#8a7569]'}`}>
                    <Check className="w-3 h-3" /> 1 Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400 font-bold' : 'text-[#8a7569]'}`}>
                    <Check className="w-3 h-3" /> 1 Number
                  </span>
                  <span className={`flex items-center gap-1.5 col-span-2 ${hasSpecial ? 'text-emerald-400 font-bold' : 'text-[#8a7569]'}`}>
                    <Check className="w-3 h-3" /> 1 Special Character (!@#$%^&*)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordValid}
              className="w-full py-3 rounded-xl glow-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Send Verification Code</span>
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* STEP 1B: SIGN IN FORM */}
        {/* ======================================================== */}
        {mode === 'signin' && (
          <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[#d6c7bc] font-bold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8a7569] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D57C63]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#d6c7bc] font-bold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8a7569] absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#221612] border border-[#3e2c22] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D57C63]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#8a7569] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl glow-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Key className="w-4 h-4" />
              )}
              <span>Sign In to Workspace</span>
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* STEP 2: VERIFY EMAIL OTP (SINGLE-USE HASHED TOKEN) */}
        {/* ======================================================== */}
        {mode === 'verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#221612] border border-[#3e2c22] text-center space-y-1">
              <span className="text-[11px] text-[#8a7569] block">Verification code sent to:</span>
              <span className="text-xs font-bold text-[#D57C63] font-mono block truncate">{email}</span>
              <p className="text-[10px] text-[#bcab9e] mt-1">
                ⏱️ Code valid for 15 minutes. Check inbox &amp; spam folder.
              </p>
            </div>

            <div>
              <label className="block text-[#d6c7bc] font-bold mb-1.5 text-center">
                Enter 6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full py-3 text-center tracking-[12px] font-mono font-bold text-2xl rounded-2xl bg-[#221612] border border-[#D57C63]/60 text-white focus:outline-none focus:border-[#ff7a1a]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full py-3 rounded-xl glow-btn text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>Verify &amp; Activate Account</span>
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-[#291b15] text-[11px]">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#8a7569] hover:text-white transition-colors cursor-pointer"
              >
                ← Edit Email
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || loading}
                className="text-[#D57C63] hover:underline font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>
          </form>
        )}

        <p className="text-[11px] text-[#8a7569] text-center mt-5">
          🔒 Production-grade security: Passwords hashed with bcrypt; single-use SHA-256 tokens.
        </p>

      </div>
    </div>
  );
};

export default AuthModal;
