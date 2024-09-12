'use client';

import { useAuth } from '@contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../../styles/WelcomePage.module.scss';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!currentUser) {
      router.push('/authentication');
    }
    setLoading(false);
  }, [currentUser, router]);

  if (loading) {
    return (
      <section className={styles.mainContainer}>
        <img src="/loader.svg" alt="Loading indicator" className={styles.loadingSvg}></img>
      </section>
    );
  }

  return children;
};
