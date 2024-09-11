'use client';

import SignUpForm from '@components/SignUpForm/SignUpForm';
import styles from './RegistrationPage.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext';

export default function Registration() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      router.push('/');
    }
    setLoading(false);
  }, [currentUser, router]);

  return loading ? (
    <section className={styles.mainContainer}>
      <img src="/loader.svg" alt="Loading indicator" className={styles.loadingSvg}></img>
    </section>
  ) : (
    <section className={styles.mainContainer}>
      <SignUpForm />
    </section>
  );
}
