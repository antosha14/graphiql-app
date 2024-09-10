import styles from './LanguageToggle.module.scss';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig } from '../../i18nConfig';
import { useState, useEffect } from 'react';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isChecked, setIsChecked] = useState(currentLocale === 'ru');

  useEffect(() => {
    setIsChecked(currentLocale === 'ru');
  }, [currentLocale]);

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocale = event.target.checked ? 'ru' : 'en';
    setIsChecked(event.target.checked);

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }
  };

  return (
    <div className={styles.switch}>
      <input
        id="language-toggle"
        className={`${styles['check-toggle']} ${styles['check-toggle-round-flat']}`}
        type="checkbox"
        checked={isChecked}
        onChange={handleLocaleChange}
      />
      <label htmlFor="language-toggle"></label>
      <span className={styles.on}>EN</span>
      <span className={styles.off}>RU</span>
    </div>
  );
}
