import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

const DEFAULT_ADMIN_EMAILS = [
  'rahilakareem389@gmail.com',
  'wordpressrahila@gmail.com'
];

/**
 * Returns list of authorized admin emails configured via env or defaults.
 */
export const getAdminEmails = () => {
  const envEmails = import.meta.env.VITE_ADMIN_EMAILS;
  if (envEmails) {
    return envEmails.split(',').map((e) => e.trim().toLowerCase());
  }
  return DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase());
};

/**
 * Maps Firebase Auth error codes to user-friendly messages.
 */
export const mapAuthError = (err) => {
  if (!err) return 'An unexpected error occurred.';
  const code = err.code || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account exists with this email address. Please sign up.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please verify your credentials and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Access is temporarily locked. Please wait a few moments or reset your password.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing authentication.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/operation-not-allowed':
      return 'Email/Password sign-in is not enabled in Firebase Console. Please enable it in the Authentication tab.';
    default:
      return err.message || 'Authentication error. Please try again.';
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Monitor Auth State & Load Saved Session
  useEffect(() => {
    // 1. Check local session persistence first
    try {
      const savedUserStr = localStorage.getItem('rahila_auth_user');
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        if (parsed && (parsed.uid || parsed.id || parsed.email)) {
          setCurrentUser(parsed);
        }
      }
    } catch (_) {}

    // 2. If Firebase is not configured, complete loading cleanly
    if (!isFirebaseConfigured() || !auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const adminEmails = getAdminEmails();
        const userEmail = (firebaseUser.email || '').toLowerCase();
        const isAdmin = adminEmails.includes(userEmail);

        const formattedUser = {
          uid: firebaseUser.uid,
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Client',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Client',
          emailVerified: firebaseUser.emailVerified,
          role: isAdmin ? 'Admin' : 'Client',
          isAdmin,
          photoURL: firebaseUser.photoURL || null
        };

        setCurrentUser(formattedUser);
        localStorage.setItem('rahila_auth_user', JSON.stringify(formattedUser));

        try {
          const token = await firebaseUser.getIdToken();
          localStorage.setItem('rahila_auth_token', token);
        } catch (_) {}
      } else {
        // Only clear if auth was previously signed out
        const saved = localStorage.getItem('rahila_auth_user');
        if (!saved) {
          setCurrentUser(null);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Register with Email & Password
   * Supports Firebase if configured, otherwise falls back to instant local client session.
   */
  const registerWithEmail = async (name, email, password) => {
    if (isFirebaseConfigured() && auth) {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);

      if (name && name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() });
      }

      await sendEmailVerification(credential.user);
      return credential.user;
    }

    // Fallback: Instant client registration
    const adminEmails = getAdminEmails();
    const isAdmin = adminEmails.includes(email.trim().toLowerCase());
    const mockUser = {
      uid: 'client-' + Date.now(),
      id: 'client-' + Date.now(),
      email: email.trim(),
      displayName: name.trim() || email.split('@')[0],
      name: name.trim() || email.split('@')[0],
      emailVerified: true,
      role: isAdmin ? 'Admin' : 'Client',
      isAdmin,
      photoURL: null
    };

    try {
      const existing = JSON.parse(localStorage.getItem('rahila_registered_clients') || '[]');
      existing.push({ email: email.trim().toLowerCase(), password, name: name.trim() });
      localStorage.setItem('rahila_registered_clients', JSON.stringify(existing));
    } catch (_) {}

    setCurrentUser(mockUser);
    localStorage.setItem('rahila_auth_user', JSON.stringify(mockUser));
    localStorage.setItem('rahila_auth_token', 'local_token_' + Date.now());
    return mockUser;
  };

  /**
   * Log in with Email & Password
   * Supports Firebase if configured, otherwise verifies stored credentials or allows client login.
   */
  const loginWithEmail = async (email, password) => {
    if (isFirebaseConfigured() && auth) {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      return credential.user;
    }

    // Fallback: Local sign in
    const adminEmails = getAdminEmails();
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = adminEmails.includes(cleanEmail);
    let displayName = cleanEmail.split('@')[0];

    // Priority Check: Authorized Admin Credentials
    if (isAdmin) {
      const validAdminPasswords = ['rahila556688', 'rahila2026', 'admin123'];
      if (!validAdminPasswords.includes(password.trim())) {
        throw new Error('Invalid email or password. Please verify your credentials and try again.');
      }
      const adminUser = {
        uid: 'admin-rahila-rk',
        id: 'admin-rahila-rk',
        email: cleanEmail,
        displayName: 'Rahila Kareem',
        name: 'Rahila Kareem',
        emailVerified: true,
        role: 'Admin',
        isAdmin: true,
        photoURL: null
      };

      setCurrentUser(adminUser);
      localStorage.setItem('rahila_auth_user', JSON.stringify(adminUser));
      localStorage.setItem('rahila_auth_token', 'admin_token_' + Date.now());
      sessionStorage.setItem('rahila_admin_authenticated', 'true');
      return adminUser;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('rahila_registered_clients') || '[]');
      const found = existing.find((u) => u.email === cleanEmail);
      if (found) {
        if (found.password !== password) {
          throw new Error('Invalid email or password. Please verify your credentials and try again.');
        }
        displayName = found.name || displayName;
      }
    } catch (e) {
      if (e.message && e.message.includes('Invalid email or password')) throw e;
    }

    const mockUser = {
      uid: 'client-' + Date.now(),
      id: 'client-' + Date.now(),
      email: email.trim(),
      displayName,
      name: displayName,
      emailVerified: true,
      role: 'Client',
      isAdmin: false,
      photoURL: null
    };

    setCurrentUser(mockUser);
    localStorage.setItem('rahila_auth_user', JSON.stringify(mockUser));
    localStorage.setItem('rahila_auth_token', 'local_token_' + Date.now());
    return mockUser;
  };

  /**
   * Sign In with Google
   * Uses Firebase Google popup if keys provided, otherwise provides instant simulated Google client login.
   */
  const loginWithGoogle = async () => {
    if (isFirebaseConfigured() && auth && googleProvider) {
      const credential = await signInWithPopup(auth, googleProvider);
      return credential.user;
    }

    // Fallback: Instant verified Google client login
    const demoGoogleUser = {
      uid: 'google-client-' + Date.now(),
      id: 'google-client-' + Date.now(),
      email: 'client.google@gmail.com',
      displayName: 'Google Client',
      name: 'Google Client',
      emailVerified: true,
      role: 'Client',
      isAdmin: false,
      photoURL: null
    };

    setCurrentUser(demoGoogleUser);
    localStorage.setItem('rahila_auth_user', JSON.stringify(demoGoogleUser));
    localStorage.setItem('rahila_auth_token', 'google_token_' + Date.now());
    return demoGoogleUser;
  };

  /**
   * Resend Verification Email
   */
  const resendVerificationEmail = async () => {
    if (auth && auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
    return true;
  };

  /**
   * Check Verification Status
   */
  const checkEmailVerification = async () => {
    if (!auth || !auth.currentUser) return true;
    await auth.currentUser.reload();
    const isVerified = auth.currentUser.emailVerified;

    if (currentUser) {
      setCurrentUser((prev) => (prev ? { ...prev, emailVerified: isVerified } : null));
    }
    return isVerified;
  };

  /**
   * Log out
   */
  const logout = async () => {
    try {
      if (auth && auth.currentUser) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn('Sign-out notice:', err);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem('rahila_auth_user');
      localStorage.removeItem('rahila_auth_token');
      sessionStorage.removeItem('rahila_admin_authenticated');
    }
  };

  const value = {
    currentUser,
    user: currentUser,
    authLoading,
    isConfigured: isFirebaseConfigured(),
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    resendVerificationEmail,
    checkEmailVerification,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
