import SignUpForm from '@components/SignUpForm/SignUpForm';
import styles from './RegistrationPage.module.scss';

export default function Registration() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.formHeader}>Create new User</div>
      <SignUpForm />
    </section>
  );
}
