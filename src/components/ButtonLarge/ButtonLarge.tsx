import styles from './ButtonLarge.module.scss';
import Link from 'next/link';

export default function ButtonLarge({ text }: { text: string }) {
  const targetLink = text == 'Sign In' ? '/authentication' : '/registration';
  return (
    <div>
      <Link href={targetLink} className={styles.buttonLarge}>
        {text}
      </Link>
    </div>
  );
}
