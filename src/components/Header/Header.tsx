'use client';

import styles from './Header.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';
import LanguageToggle from '@components/LanguageToggle/LanguageToggle';
import Image from 'next/image';
import logo from '../../../public/logo.webp';
import Link from 'next/link';
import { useAuth } from '@contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { currentUser } = useAuth();
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { t } = useTranslation();

  return (
    <header className={`${styles.headerContainer} ${isSticky ? styles.sticky : ''}`}>
      <nav className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <Link href={'/'}>
            <Image alt="Apex logo" src={logo} className={styles.logo}></Image>
          </Link>
        </div>
        <div className={styles.sideNavigation}>
          <LanguageToggle />
          {currentUser ? (
            <ButtonLarge text={t('signOutButtonText')} />
          ) : (
            <>
              <ButtonLarge text={t('signInButtonText')} />
              <ButtonLarge text={t('signUpButtonText')} />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
