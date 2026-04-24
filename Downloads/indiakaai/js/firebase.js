// ── FIREBASE CONFIG ───────────────────────────────────────────────────────
// SECURITY NOTE: These are PUBLIC configuration values
// Firebase project: indiakaai-98aa5
// SAFE TO EXPOSE: All values below are public and designed for client-side use
// NEVER EXPOSE: Firebase Admin SDK credentials (keep server-side only)
// 
// IMPORTANT: Enable Google Sign-In in Firebase Console:
// 1. Go to: Authentication → Sign-in method → Google → Enable
// 2. Add authorized domains: indiakaai.com, *.vercel.app
// 3. Configure Firebase Security Rules to restrict write access
// ─────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyBMs7z9mxrygfGrVEylqiW7-D-6qYES_dU",
  authDomain:        "indiakaai-98aa5.firebaseapp.com",
  projectId:         "indiakaai-98aa5",
  storageBucket:     "indiakaai-98aa5.firebasestorage.app",
  messagingSenderId: "909881261290",
  appId:             "1:909881261290:web:c87f1d908edba76b806b93",
  measurementId:     "G-BH8NBLRSMD"
};
firebase.initializeApp(firebaseConfig);
const _auth      = firebase.auth();
const _gProvider = new firebase.auth.GoogleAuthProvider();
// Security: Force account selection on every sign-in
_gProvider.setCustomParameters({ prompt: 'select_account' });
// Security: Persist auth state locally (survives page refresh)
_auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// PHASE 3: Initialize Firestore for bookmarks
// Note: Firestore must be enabled in Firebase Console first
// Go to: Firebase Console → Firestore Database → Create Database
const _firestore = firebase.firestore();
