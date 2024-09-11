'use client';

import styles from '@components/SignUpForm/SignUpForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserLoginSchema } from '@models/signInModel';
import FormInput from '@components/FormInput/FormInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@contexts/AuthContext';
import { useState } from 'react';
import { stripFirebaseErrorMessage } from '@utils/stripFirebaseErrorMessage';
import { useTranslation } from 'react-i18next';

export interface FormInputState {
  email: string;
  password: string;
}

export default function SignInForm() {
  const schema = useUserLoginSchema();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
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

  const onGuest = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, 'anton.kozel.97@mail.ru', '123As***');
    } catch (err) {
      setSignInErrors(err.message);
      setTimeout(() => {
        setSignInErrors(null);
      }, 10000);
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();

  const checkErrors = () => {
    return Object.values(errors).some(value => value !== undefined);
  };

  return loadingUser ? (
    <div className={styles.formContainer}>
      <img src="/loader.svg" alt={t('imageAlt')}></img>
      <div>{t('pMessageAuth')}</div>
    </div>
  ) : (
    <>
      <div className={styles.formHeader}>{t('wmReg')}</div>
      <div className={styles.formContainer}>
        <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
          <FormInput field="email" register={register} errors={errors} watch={watch} />
          <FormInput field="password" register={register} errors={errors} watch={watch} />
          <button
            type="submit"
            className={`${styles.submitButton} ${checkErrors() ? styles.submitButtonError : ''}`}
            disabled={checkErrors()}
          >
            {t('signInButtonText')}
          </button>
          <div className={styles.guestContainer}>
            <p className={styles.guestText}>{t('guestMessage')}</p>
            <button className={styles.guestButton} onClick={onGuest}>
              {t('continue')}
            </button>
          </div>
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
