import styles from './FormInput.module.scss';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FormInputState } from '@components/SignUpForm/SignUpForm';
import PasswordStrengthMeter from '@components/PasswordStrengthMeter/PasswordStrengthMeter';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type FieldType = 'name' | 'email' | 'password' | 'passwordConfirm';

interface FormInputPropsReg {
  field: 'name' | 'email' | 'password' | 'passwordConfirm';
  register: UseFormRegister<FormInputState>;
  errors: FieldErrors<FormInputState>;
  watch: UseFormWatch<FormInputState>;
}

export default function FormInputReg({ field, register, errors, watch }: FormInputPropsReg) {
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
        type={field == 'password' || field == 'passwordConfirm' ? 'password' : 'text'}
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
