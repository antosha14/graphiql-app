'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, User as FirebaseUser, onAuthStateChanged, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  signOutUser: () => Promise<void>;
  db: Firestore;
  auth: Auth;
}
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, 'users'), where('uid', '==', user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, 'users'), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: 'google',
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     alert(err);
//   }
// };

// const sendPasswordReset = async (email: string) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert('Password reset link sent!');
//   } catch (err) {
//     alert(err);
//   }
// };

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    await signOut(auth);
  };

  return <AuthContext.Provider value={{ currentUser, signOutUser, db, auth }}>{children}</AuthContext.Provider>;
};
