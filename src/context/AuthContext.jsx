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
  'wordpressrahila@gmail.com',
  'rahilakareem389@gmail.com'
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

  // Monitor Firebase Auth State
  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      console.info(
        '[Firebase Auth] Configuration keys are missing or incomplete. Waiting for VITE_FIREBASE_API_KEY in .env.'
      );
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
        setCurrentUser(null);
        localStorage.removeItem('rahila_auth_user');
        localStorage.removeItem('rahila_auth_token');
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Register with Email & Password
   * Automatically sends verification email and updates display name.
   */
  const registerWithEmail = async (name, email, password) => {
    if (!isFirebaseConfigured() || !auth) {
      throw new Error('Firebase configuration missing. Please add VITE_FIREBASE_API_KEY to your .env file.');
    }

    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);

    // Update display name
    if (name && name.trim()) {
      await updateProfile(credential.user, { displayName: name.trim() });
    }

    // Send verification email
    await sendEmailVerification(credential.user);

    return credential.user;
  };

  /**
   * Log in with Email & Password
   */
  const loginWithEmail = async (email, password) => {
    if (!isFirebaseConfigured() || !auth) {
      throw new Error('Firebase configuration missing. Please add VITE_FIREBASE_API_KEY to your .env file.');
    }

    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return credential.user;
  };

  /**
   * Sign In with Google
   */
  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured() || !auth || !googleProvider) {
      throw new Error('Firebase configuration missing. Please add VITE_FIREBASE_API_KEY to your .env file.');
    }

    const credential = await signInWithPopup(auth, googleProvider);
    return credential.user;
  };

  /**
   * Resend Verification Email
   */
  const resendVerificationEmail = async () => {
    if (!auth || !auth.currentUser) {
      throw new Error('No active user to send verification email to.');
    }
    await sendEmailVerification(auth.currentUser);
  };

  /**
   * Check Verification Status (reloads user from Firebase server)
   */
  const checkEmailVerification = async () => {
    if (!auth || !auth.currentUser) return false;
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
