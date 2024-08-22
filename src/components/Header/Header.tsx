import styles from './Header.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';
import LanguageToggle from '@components/LanguageToggle/LanguageToggle';
import Image from 'next/image';
import logo from '../../../public/logo.jpg';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <Image alt="Apex logo" src={logo} className={styles.logo}></Image>
        </div>
        <div className={styles.sideNavigation}>
          <LanguageToggle />
          <ButtonLarge text={'Sign In'} />
          <ButtonLarge text={'Sign Up'} />
        </div>
      </nav>
    </header>
  );
}
