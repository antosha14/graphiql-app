import styles from '../styles/WelcomePage.module.scss';
import ButtonLarge from '@components/ButtonLarge/ButtonLarge';

export default function WelcomePage() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.greetingContainer}>Welcome!</div>
      <div>My name is Anton and here is my REST/GraphiQL Client for RS School 2024 React course!</div>
      <div className={styles.buttonsContainer}>
        <ButtonLarge text="Sign In"></ButtonLarge>
        <ButtonLarge text="Sign Up"></ButtonLarge>
      </div>
      <img src="hand.svg" className={styles.hand}></img>
    </section>
  );
}
