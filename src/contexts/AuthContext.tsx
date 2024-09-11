'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { signOut, User as FirebaseUser, onAuthStateChanged, Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { auth, db } from '../app/fireBase';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  signOutUser: () => Promise<void>;
  db: Firestore;
  auth: Auth;
  setCurrentUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
}

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

  return (
    <AuthContext.Provider value={{ currentUser, signOutUser, db, auth, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
