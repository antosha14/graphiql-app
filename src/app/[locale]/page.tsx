'use client';

import styles from '@styles/WelcomePage.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';
import { useAuth } from '@contexts/AuthContext';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function WelcomePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCurrentUser(currentUser);
    setLoading(false);
  }, [currentUser]);

  const welcomePage = loading ? (
    <section className={styles.mainContainer}>
      <img src="/loader.svg" alt="Loading indicator" className={styles.loadingSvg}></img>
    </section>
  ) : currentUser ? (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>{`${t('wBack')}, ${currentUser.displayName}!`}</div>
      <div className={styles.greetingMessage}>{t('wMessageReg')}</div>
      <div className={styles.buttonsContainer}>
        <Link href="/GET" className={styles.buttonLarge}>
          REST {t('clientName')}
        </Link>
        <Link href="/GRAPHQL" className={styles.buttonLarge}>
          GraphQL {t('clientName')}
        </Link>
        <Link href="/history" className={styles.buttonLarge}>
          {t('history')}
        </Link>
      </div>
    </section>
  ) : (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>{t('greeting')}</div>
      <div className={styles.greetingMessage}>{t('greetingMessage')}</div>
      <div className={styles.buttonsContainer}>
        <ButtonLarge text={t('signInButtonText')}></ButtonLarge>
        <ButtonLarge text={t('signUpButtonText')}></ButtonLarge>
      </div>
      <img src="hand.svg" className={styles.hand}></img>
    </section>
  );

  return welcomePage;
}
