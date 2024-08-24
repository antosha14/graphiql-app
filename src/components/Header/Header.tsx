'use client';

import styles from './Header.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';
import LanguageToggle from '@components/LanguageToggle/LanguageToggle';
import Image from 'next/image';
import logo from '../../../public/logo.jpg';
import Link from 'next/link';
import { useAuth } from '@contexts/AuthContext';

export default function Header() {
  const { currentUser } = useAuth();
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <Link href={'/'}>
            <Image alt="Apex logo" src={logo} className={styles.logo}></Image>
          </Link>
        </div>
        <div className={styles.sideNavigation}>
          <LanguageToggle />
          {currentUser ? (
            <ButtonLarge text={'Sign Out'} />
          ) : (
            <>
              <ButtonLarge text={'Sign In'} />
              <ButtonLarge text={'Sign Up'} />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
