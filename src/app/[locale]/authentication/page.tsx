'use client';

import styles from '../registration/RegistrationPage.module.scss';
import SignInForm from '@components/SignInForm/SignInForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@contexts/AuthContext';

export default function Authentication() {
  const { auth, currentUser, setCurrentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      const updateUser = async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setCurrentUser(auth.currentUser);
      };
      updateUser();
      router.push('/');
    }
  }, [currentUser, router]);

  return (
    <section className={styles.mainContainer}>
      <SignInForm />
    </section>
  );
}
