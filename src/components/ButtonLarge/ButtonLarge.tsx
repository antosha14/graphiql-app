import styles from './ButtonLarge.module.scss';

export default function ButtonLarge({ text }: { text: string }) {
  return <button className={styles.buttonLarge}>{text}</button>;
}
