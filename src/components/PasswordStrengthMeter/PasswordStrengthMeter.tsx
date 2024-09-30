import styles from './PasswordStrengthMeter.module.scss';
import { passwordStrengthCheck } from '@utils/passwordStrengthCheck';

export default function PasswordStrengthMeter({ password }: { password: string }) {
  if (password == '' || password == undefined) {
    return <p className={styles.meterPlaceholder}></p>;
  }
  const passwordStrength = passwordStrengthCheck(password);
  return <meter max="4" value={passwordStrength} className={styles.passwordStrengthMeter}></meter>;
}
