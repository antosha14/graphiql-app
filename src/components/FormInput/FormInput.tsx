import styles from './FormInput.module.scss';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { FormInputState } from '@components/SignUpForm/SignUpForm';
import PasswordStrengthMeter from '@components/PasswordStrengthMeter/PasswordStrengthMeter';

interface FormInputProps {
  field: 'name' | 'email' | 'password' | 'passwordConfirm';
  register: UseFormRegister<FormInputState>;
  errors: FieldErrors<FormInputState>;
  watch: UseFormWatch<FormInputState>;
}

export default function FormInput({ field, register, errors, watch }: FormInputProps) {
  const fieldName = field == 'passwordConfirm' ? 'Confirm password:' : `${field[0].toUpperCase()}${field.slice(1)}:`;
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={field} className={styles.mainLabel}>
        {fieldName}
      </label>
      <input
        id={field}
        {...register(field)}
        className={`${styles.mainInput} ${errors?.[field]?.message ? styles.redBorder : ''}`}
        type={field == 'password' || field == 'passwordConfirm' ? 'password' : 'text'}
      ></input>
      {field == 'password' ? <PasswordStrengthMeter password={watch('password')}></PasswordStrengthMeter> : ''}
      <p
        className={`${styles.errorMessage} ${errors?.[field]?.message ? '' : styles.noneVisible}`}
      >{`${errors?.[field] ? errors[field].message : ''}`}</p>
    </div>
  );
}
