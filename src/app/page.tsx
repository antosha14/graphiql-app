'use client';

import styles from '../styles/WelcomePage.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';
import { useAuth } from '@contexts/AuthContext';
import Link from 'next/link';

export default function WelcomePage() {
  const { currentUser } = useAuth();
  const welcomePage = currentUser ? (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>{`Welcome Back, ${currentUser.displayName}!`}</div>
      <div className={styles.greetingMessage}>Happy to see you here again!</div>
      <div className={styles.buttonsContainer}>
        <Link href="/restful/GET" className={styles.buttonLarge}>
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
      <div className={styles.greetingMessage}>
        My name is Anton and here is my REST/GraphiQL Client for RS School 2024 React course!
      </div>
      <div className={styles.buttonsContainer}>
        <ButtonLarge text="Sign In"></ButtonLarge>
        <ButtonLarge text="Sign Up"></ButtonLarge>
      </div>
      <img src="hand.svg" className={styles.hand}></img>
    </section>
  );

  return welcomePage;
}
