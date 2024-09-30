import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.linkContainer}>
        <a href="https://github.com/antosha14">{t('developerCreds')}</a>
        <p className={styles.year}>{t('year')}</p>
      </div>
      <div className={styles.logoContainer}>
        <a href="https://rs.school/react/">
          <img className={styles.logo} src={'/rss-logo.svg'} alt="RS School logo"></img>
        </a>
      </div>
    </footer>
  );
}
