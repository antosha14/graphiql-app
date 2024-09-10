import styles from '@styles/WelcomePage.module.scss';

export default function NotFoundPage() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>404 | Page not found</div>
    </section>
  );
}
