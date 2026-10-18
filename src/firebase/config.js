import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';

/**
 * Firebase Client SDK Configuration
 * Environment variables must be set in frontend/.env and Vercel Project Settings.
 */
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
  measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '').trim()
};

/**
 * Checks whether valid Firebase configuration keys are provided.
 */
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey.length > 10 &&
    !firebaseConfig.apiKey.includes('your_') &&
    firebaseConfig.projectId &&
    !firebaseConfig.projectId.includes('your_')
  );
};

let app = null;
let auth = null;
let googleProvider = null;

// Only initialize if configuration is actually provided to avoid auth/invalid-api-key crashes
if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);

    // Set local browser persistence for session continuity
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn('[Firebase Auth] Persistence setup notice:', err?.message || err);
    });

    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (err) {
    console.warn('[Firebase Auth] Initialization skipped or failed:', err?.message || err);
    app = null;
    auth = null;
    googleProvider = null;
  }
} else {
  console.info(
    '[Firebase Auth] Notice: Firebase credentials are not yet configured in .env. Authentication modal will prompt for configuration.'
  );
}

export { app, auth, googleProvider };
export default app;
