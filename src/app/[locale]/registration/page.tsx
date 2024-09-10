'use client';

import SignUpForm from '@components/SignUpForm/SignUpForm';
import styles from './RegistrationPage.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext';

export default function Registration() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  return (
    <section className={styles.mainContainer}>
      <SignUpForm />
    </section>
  );
}
