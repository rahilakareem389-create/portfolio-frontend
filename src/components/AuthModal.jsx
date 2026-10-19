import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useAuth, mapAuthError } from '../context/AuthContext';
import { sendWeb3FormsNotification } from '../utils/web3forms';

// Official Multicolor Google 'G' SVG
const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const AuthModal = ({ isOpen, onClose, initialMode = 'signup', onAuthSuccess }) => {
  const { t } = useLanguage();
  const {
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    resendVerificationEmail,
    checkEmailVerification,
    sendPasswordReset,
    isConfigured
  } = useAuth();

  // Mode: 'signup' | 'signin' | 'verify' | 'forgot'
  const [mode, setMode] = useState(initialMode || 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Loading states
  const [loading, setLoading] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Resend Verification cooldown timer
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || 'signup');
      setErrorMsg('');
      setSuccessMsg('');
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

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D57C63', '#ff9a7b', '#25D366', '#ffffff']
      });
    } catch (_) {}
  };

  // ==========================================================================
  // GOOGLE SIGN-IN HANDLER
  // ==========================================================================
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const user = await loginWithGoogle();
      triggerConfetti();

      // Dispatch Web3Forms notification for audit alert
      sendWeb3FormsNotification({
        type: 'Google Login',
        subject: `[User Login Alert] ${user.email} logged in via Google`,
        name: user.displayName || user.name || user.email?.split('@')[0],
        email: user.email,
        details: {
          action: 'Google OAuth Sign-In',
          provider: isConfigured ? 'Firebase Authentication' : 'Instant Client Session',
          userName: user.displayName || user.name,
          userEmail: user.email,
          role: user.role || 'Client'
        }
      });

      setSuccessMsg(`Welcome, ${user.displayName || user.name || 'Client'}! Signed in successfully.`);
      if (onAuthSuccess) {
        onAuthSuccess({
          uid: user.uid || user.id,
          id: user.uid || user.id,
          email: user.email,
          name: user.displayName || user.name || user.email?.split('@')[0],
          emailVerified: true,
          role: user.role || 'Client'
        });
      }
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setErrorMsg(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // 1. SUBMIT REGISTRATION (EMAIL + PASSWORD)
  // ==========================================================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const createdUser = await registerWithEmail(name.trim(), email.trim(), password);

      // Web3Forms notification for admin awareness
      sendWeb3FormsNotification({
        type: 'User Registration',
        subject: `[New Client Registered] ${name.trim()} (${email.trim()})`,
        name: name.trim(),
        email: email.trim(),
        details: {
          action: isConfigured ? 'Firebase Email/Password Registration' : 'Client Registration',
          userName: name.trim(),
          userEmail: email.trim(),
          role: 'Client'
        }
      });

      setSuccessMsg(`Verification email dispatched to ${email.trim()}. Please verify your email before entering your workspace.`);
      setMode('verify');
      setResendCooldown(60);
    } catch (err) {
      console.error('Registration Error:', err);
      setErrorMsg(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // 2. CHECK EMAIL VERIFICATION STATUS
  // ==========================================================================
  const handleCheckVerification = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setCheckingVerification(true);

    try {
      const verified = await checkEmailVerification();

      if (verified) {
        triggerConfetti();
        setSuccessMsg('Email verified successfully! Entering your workspace...');
        if (onAuthSuccess) {
          onAuthSuccess({
            email,
            name: name || email.split('@')[0],
            emailVerified: true,
            role: 'Client'
          });
        }
        setTimeout(() => onClose(), 1000);
      } else {
        setErrorMsg('Your email is not verified yet. Please check your inbox (and Spam folder) for the verification link, click it, and try again.');
      }
    } catch (err) {
      setErrorMsg(mapAuthError(err));
    } finally {
      setCheckingVerification(false);
    }
  };

  // ==========================================================================
  // 3. RESEND VERIFICATION EMAIL
  // ==========================================================================
  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await resendVerificationEmail();
      setSuccessMsg(`A fresh verification email has been sent to ${email}. Please check your inbox.`);
      setResendCooldown(60);
    } catch (err) {
      setErrorMsg(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // 4. SUBMIT LOGIN (EMAIL + PASSWORD)
  // ==========================================================================
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
      const user = await loginWithEmail(email.trim(), password);

      // Strictly enforce email verification
      if (!user.emailVerified && !user.isAdmin) {
        setErrorMsg('Your email is not verified yet. Please check your inbox for the verification link, click it, and try again.');
        setMode('verify');
        setResendCooldown(30);
        setLoading(false);
        return;
      }

      // Successful verified login
      triggerConfetti();
      const userName = user.displayName || user.name || email.split('@')[0];

      sendWeb3FormsNotification({
        type: 'User Login',
        subject: `[User Login Alert] ${email.trim()} logged in to Client Workspace`,
        name: userName,
        email: email.trim(),
        details: {
          action: 'Client Login',
          userName,
          userEmail: email.trim(),
          role: user.role || 'Client'
        }
      });

      setSuccessMsg(`Welcome back, ${userName}!`);
      if (onAuthSuccess) {
        onAuthSuccess({
          uid: user.uid || user.id,
          id: user.uid || user.id,
          email: user.email || email.trim(),
          name: userName,
          emailVerified: true,
          role: user.role || 'Client'
        });
      }
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      console.error('Login Error:', err);
      setErrorMsg(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================================
  // 5. SUBMIT PASSWORD RESET (FIREBASE AUTH)
  // ==========================================================================
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address to receive password reset instructions.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSuccessMsg(`Password reset link dispatched to ${email.trim()}. Please check your inbox.`);
    } catch (err) {
      console.error('Password Reset Error:', err);
      setErrorMsg(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in py-6">
      <div className="w-full max-w-[400px] my-auto p-5 sm:p-6 rounded-3xl relative shadow-2xl transition-all border border-[#e5d6c5] dark:border-[#332219] bg-white dark:bg-[#18110d] text-[#140d07] dark:text-[#f7ede3] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-6">
          <div className="w-9 h-9 rounded-xl bg-[#D57C63]/15 text-[#D57C63] flex items-center justify-center mb-2 shadow-sm">
            {mode === 'verify' ? (
              <ShieldCheck className="w-5 h-5" />
            ) : mode === 'forgot' ? (
              <Lock className="w-5 h-5" />
            ) : mode === 'signin' ? (
              <Lock className="w-5 h-5" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-neutral-900 dark:text-white tracking-tight">
            {mode === 'verify'
              ? 'Verify Your Email'
              : mode === 'forgot'
              ? 'Reset Password'
              : mode === 'signin'
              ? 'Welcome Back'
              : 'Create Client Account'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {mode === 'verify'
              ? 'A verification link was dispatched to your inbox'
              : mode === 'forgot'
              ? 'Enter your registered email to receive a password reset link'
              : mode === 'signin'
              ? 'Sign in to access your client dashboard & deliverables'
              : 'Sign up to track your projects & deliverables'}
          </p>
        </div>

        {/* Mode Switcher Tabs (Segmented Control) */}
        {mode !== 'verify' && mode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-[#251812] border border-neutral-200 dark:border-[#38261e] mb-3.5">
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white dark:bg-[#D57C63] text-[#D57C63] dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white dark:bg-[#D57C63] text-[#D57C63] dark:text-white shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Status Alerts */}
        {errorMsg && (
          <div className="p-2.5 mb-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-2.5 mb-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* GOOGLE SIGN-IN BUTTON & DIVIDER (For Sign Up & Sign In) */}
        {mode !== 'verify' && mode !== 'forgot' && (
          <div className="space-y-2.5 mb-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-[#3d271e] bg-white dark:bg-[#221612] hover:bg-neutral-50 dark:hover:bg-[#2c1c16] text-neutral-800 dark:text-neutral-100 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 hover:shadow"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center pt-0.5">
              <div className="border-t border-neutral-200 dark:border-[#38261e] w-full" />
              <span className="bg-white dark:bg-[#18110d] px-2 text-[10px] font-bold tracking-wider uppercase text-neutral-400 shrink-0">
                or continue with email
              </span>
              <div className="border-t border-neutral-200 dark:border-[#38261e] w-full" />
            </div>
          </div>
        )}

        {/* STEP 1A: SIGN UP */}
        {mode === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-[#38261e] bg-neutral-50/70 dark:bg-[#20140e] text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D57C63]/30 focus:border-[#D57C63] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-[#38261e] bg-neutral-50/70 dark:bg-[#20140e] text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D57C63]/30 focus:border-[#D57C63] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-neutral-200 dark:border-[#38261e] bg-neutral-50/70 dark:bg-[#20140e] text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D57C63]/30 focus:border-[#D57C63] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#D57C63] hover:bg-[#c2674e] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#D57C63]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1.5"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>Create Account</span>
            </button>

            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-0.5">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-[#D57C63] font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* STEP 1B: SIGN IN */}
        {mode === 'signin' && (
          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-[#38261e] bg-neutral-50/70 dark:bg-[#20140e] text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D57C63]/30 focus:border-[#D57C63] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="text-[11px] text-[#D57C63] hover:underline font-semibold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2 rounded-xl border border-neutral-200 dark:border-[#38261e] bg-neutral-50/70 dark:bg-[#20140e] text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D57C63]/30 focus:border-[#D57C63] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#D57C63] hover:bg-[#c2674e] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#D57C63]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1.5"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>Sign In to Workspace</span>
            </button>

            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-0.5">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#D57C63] font-bold hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          </form>
        )}

        {/* STEP 1C: FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <form onSubmit={handlePasswordReset} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-[#38261e] bg-neutral-50/70 dark:bg-[#20140e] text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D57C63]/30 focus:border-[#D57C63] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#D57C63] hover:bg-[#c2674e] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#D57C63]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1.5"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>Send Reset Link</span>
            </button>

            <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-0.5">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-[#D57C63] font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* STEP 2: VERIFICATION SCREEN (FIREBASE EMAIL VERIFICATION) */}
        {mode === 'verify' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#221612] border border-neutral-200 dark:border-[#38261e] text-center space-y-1">
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">Verification link sent to:</span>
              <span className="text-xs sm:text-sm font-bold text-[#D57C63] font-mono block truncate">{email}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#D57C63]/10 border border-[#D57C63]/30 text-xs text-neutral-700 dark:text-neutral-200 space-y-2 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 text-[#D57C63]">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>One Click Activation</span>
              </div>
              <p>
                Open your email app, look for the verification email sent by Firebase, and click the confirmation link.
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Can't find it? Check your Spam or Promotions tab.
              </p>
            </div>

            {/* Check Verification Status Button */}
            <button
              type="button"
              onClick={handleCheckVerification}
              disabled={checkingVerification}
              className="w-full py-2.5 rounded-xl bg-[#D57C63] hover:bg-[#c2674e] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#D57C63]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {checkingVerification ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>I Have Verified My Email</span>
            </button>

            {/* Resend Verification Button */}
            <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-[#291b15] text-xs">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              >
                ← Back to Sign In
              </button>

              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resendCooldown > 0 || loading}
                className="text-[#D57C63] hover:underline font-bold disabled:opacity-50 cursor-pointer"
              >
                {resendCooldown > 0 ? `Resend link in ${resendCooldown}s` : 'Resend Verification Link'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuthModal;
