import styles from './FormInput.module.scss';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FormInputState } from '@components/SignUpForm/SignUpForm';
import { FormInputStateAuth } from '@components/SignInForm/SignInForm';
import PasswordStrengthMeter from '@components/PasswordStrengthMeter/PasswordStrengthMeter';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type FieldType = 'email' | 'password';

interface FormInputPropsAuth {
  field: 'email' | 'password';
  register: UseFormRegister<FormInputStateAuth>;
  errors: FieldErrors<FormInputState>;
  watch: UseFormWatch<FormInputStateAuth>;
}

export default function FormInputAuth({ field, register, errors, watch }: FormInputPropsAuth) {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={field} className={styles.mainLabel}>
        {t(field)}
      </label>
      <input
        id={field}
        {...register(field as FieldType)}
        className={`${styles.mainInput} ${errors?.[field]?.message ? styles.redBorder : ''}`}
        type={field == 'password' ? 'password' : 'text'}
      ></input>
      {field == 'password' && pathname == '/registration' ? (
        <PasswordStrengthMeter password={watch('password')}></PasswordStrengthMeter>
      ) : (
        ''
      )}
      <p
        className={`${styles.errorMessage} ${errors?.[field]?.message ? '' : styles.noneVisible}`}
      >{`${errors?.[field] ? errors[field].message : ''}`}</p>
    </div>
  );
}
