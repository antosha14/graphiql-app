import styles from './LanguageToggle.module.scss';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { i18nConfig } from '../../i18nConfig';
import { usePathname } from 'next/navigation';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isChecked, setIsChecked] = useState(currentLocale === 'ru');

  useEffect(() => {
    setIsChecked(currentLocale === 'ru');
  }, [currentLocale]);

  const handleLocaleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLocale = event.target.checked ? 'ru' : 'en';
    setIsChecked(event.target.checked);

    try {
      i18n.changeLanguage(newLocale);
      if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
        window.history.replaceState({}, '', '/' + newLocale + currentPathname);
      } else {
        window.history.replaceState({}, '', currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
      }
      router.refresh();
    } catch (error) {
      console.error('Error switching locale:', error);
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
