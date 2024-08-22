import styles from '../styles/WelcomePage.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';

export default function WelcomePage() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>Welcome!</div>
      <div>Hand</div>
      <div className={styles.buttonsContainer}>
        <ButtonLarge text="Sign In"></ButtonLarge>
        <ButtonLarge text="Sign Up"></ButtonLarge>
      </div>
    </section>
  );
}
