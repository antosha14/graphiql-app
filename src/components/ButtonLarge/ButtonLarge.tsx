import { useAuth } from '@contexts/AuthContext';
import styles from '@styles/WelcomePage.module.scss';
import Link from 'next/link';

export default function ButtonLarge({ text }: { text: string }) {
  const { currentUser, signOutUser } = useAuth();

  let targetLink = '/';
  switch (text) {
    case 'Sign In':
      targetLink = '/authentication';
      break;
    case 'Войти':
      targetLink = '/authentication';
      break;
    case 'Sign Up':
      targetLink = '/registration';
      break;
    case 'Регистрация':
      targetLink = '/registration';
      break;
  }

  const handleClick = async () => {
    if (currentUser) {
      await signOutUser();
    }
  };

  return (
    <div>
      <Link href={targetLink} className={styles.buttonLarge} onClick={handleClick}>
        {text}
      </Link>
    </div>
  );
}
