import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.linkContainer}>
        <a href="https://github.com/antosha14">Developed by: Kozel Anton</a>
        <p className={styles.year}> in 2024</p>
      </div>
      <div className={styles.logoContainer}>
        <a href="https://rs.school/react/">
          <img className={styles.logo} src={'/rss-logo.svg'} alt="RS School logo"></img>
        </a>
      </div>
    </footer>
  );
}
