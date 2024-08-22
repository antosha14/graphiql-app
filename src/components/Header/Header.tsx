import styles from './Header.module.scss';
import Button from '@components/Button/Button';
import LanguageToggle from '@components/LanguageToggle/LanguageToggle';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.logoContainer}>Logo</div>
        <div className={styles.sideNavigation}>
          <LanguageToggle />
          <Button text={'Sign In'} />
        </div>
      </nav>
    </header>
  );
}
