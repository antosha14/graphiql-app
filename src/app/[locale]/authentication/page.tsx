'use client';

import styles from '../registration/RegistrationPage.module.scss';
import SignInForm from '@components/SignInForm/SignInForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext';

export default function Authentication() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  return (
    <section className={styles.mainContainer}>
      <SignInForm />
    </section>
  );
}
