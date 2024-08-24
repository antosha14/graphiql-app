'use client';

import styles from '@components/SignUpForm/SignUpForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLoginSchema } from '@models/signInModel';
import FormInput from '@components/FormInput/FormInput';
import { logInWithEmailAndPassword } from '../../auth/firebase';

export interface FormInputState {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(userLoginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormInputState> = async () => {
    logInWithEmailAndPassword(watch('email'), watch('password'));
  };

  const checkErrors = () => {
    return Object.values(errors).some(value => value !== undefined);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
        <FormInput field="email" register={register} errors={errors} watch={watch} />
        <FormInput field="password" register={register} errors={errors} watch={watch} />
        <button
          type="submit"
          className={`${styles.submitButton} ${checkErrors() ? styles.submitButtonError : ''}`}
          disabled={checkErrors()}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
