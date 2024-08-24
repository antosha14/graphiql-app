'use client';

import styles from '../styles/WelcomePage.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebase';
import Link from 'next/link';

export default function WelcomePage() {
  const [user] = useAuthState(auth);
  const welcomePage = user ? (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>{`Welcome Back, ${user.displayName}!`}</div>
      <div>Happy to see you here again!</div>
      <div className={styles.buttonsContainer}>
        <Link href="/restful" className={styles.buttonLarge}>
          REST Client
        </Link>
        <Link href="/graphiql" className={styles.buttonLarge}>
          GraphiQL Client
        </Link>
        <Link href="/history" className={styles.buttonLarge}>
          History
        </Link>
      </div>
    </section>
  ) : (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>Welcome!</div>
      <div>My name is Anton and here is my REST/GraphiQL Client for RS School 2024 React course!</div>
      <div className={styles.buttonsContainer}>
        <ButtonLarge text="Sign In"></ButtonLarge>
        <ButtonLarge text="Sign Up"></ButtonLarge>
      </div>
      <img src="hand.svg" className={styles.hand}></img>
    </section>
  );

  return welcomePage;
}
