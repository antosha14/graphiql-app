import styles from './LanguageToggle.module.scss';

export default function LanguageToggle() {
  return (
    <div className={styles.switch}>
      <input
        id="language-toggle"
        className={`${styles['check-toggle']} ${styles['check-toggle-round-flat']}`}
        type="checkbox"
      />
      <label htmlFor="language-toggle"></label>
      <span className={styles.on}>EN</span>
      <span className={styles.off}>RU</span>
    </div>
  );
}
