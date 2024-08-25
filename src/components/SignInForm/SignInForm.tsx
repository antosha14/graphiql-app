'use client';

import styles from '@components/SignUpForm/SignUpForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLoginSchema } from '@models/signInModel';
import FormInput from '@components/FormInput/FormInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@contexts/AuthContext';
import { useState } from 'react';
import { stripFirebaseErrorMessage } from '@utils/stripFirebaseErrorMessage';

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

  const { auth } = useAuth();
  const [loadingUser, setLoading] = useState(false);
  const [signInErrors, setSignInErrors] = useState(null);

  const onSubmit: SubmitHandler<FormInputState> = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, watch('email'), watch('password'));
    } catch (err) {
      setSignInErrors(err.message);
      setTimeout(() => {
        setSignInErrors(null);
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  const checkErrors = () => {
    return Object.values(errors).some(value => value !== undefined);
  };

  return loadingUser ? (
    <div className={styles.formContainer}>
      <img src="loader.svg" alt="Loading indicator"></img>
      <div>Trying to authenticate ...</div>
    </div>
  ) : (
    <>
      <div className={styles.formHeader}>Welcome back!</div>
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
        {signInErrors ? (
          <div className={styles.registrationError}>{`${stripFirebaseErrorMessage(signInErrors)}`}</div>
        ) : (
          <div className={styles.registrationErrorPlaceholder}></div>
        )}
      </div>
    </>
  );
}
