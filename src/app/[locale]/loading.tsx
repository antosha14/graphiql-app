import styles from '@styles/WelcomePage.module.scss';

export default function Loading() {
  return (
    <section className={styles.mainContainer}>
      <img src="/loader.svg" alt="Loading indicator" className={styles.loadingSvg}></img>
    </section>
  );
}
