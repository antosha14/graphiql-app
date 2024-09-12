'use client';

import styles from './SignUpForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserRegisterSchema } from '@models/signUpModel';
import FormInput from '@components/FormInput/FormInputReg';
import { useAuth } from '@contexts/AuthContext';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { stripFirebaseErrorMessage } from '@utils/stripFirebaseErrorMessage';
import { useTranslation } from 'react-i18next';

export interface FormInputState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm() {
  const schema = useUserRegisterSchema();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [loadingUser, setLoading] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState<string | null>(null);
  const { t } = useTranslation();

  const { auth, db } = useAuth();
  const onSubmit: SubmitHandler<FormInputState> = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, watch('email'), watch('password'));
      const user = res.user;
      await updateProfile(user, {
        displayName: watch('name'),
      });
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: watch('name'),
        authProvider: 'local',
        email: watch('email'),
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSignUpErrors(err.message);
      } else {
        setSignUpErrors(t('reqError'));
      }
      setTimeout(() => {
        setSignUpErrors(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const checkErrors = () => {
    return Object.values(errors).some(value => value !== undefined);
  };

  return loadingUser ? (
    <div className={styles.formContainer}>
      <img src="/loader.svg" alt="Loading indicator"></img>
      <div>{t('regPro')}</div>
    </div>
  ) : (
    <>
      <div className={styles.formHeader}>{t('regIntro')}</div>
      <div className={styles.formContainer}>
        <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
          <FormInput field="name" register={register} errors={errors} watch={watch} />
          <FormInput field="email" register={register} errors={errors} watch={watch} />
          <FormInput field="password" register={register} errors={errors} watch={watch} />
          <FormInput field="passwordConfirm" register={register} errors={errors} watch={watch} />
          <button
            type="submit"
            className={`${styles.submitButton} ${checkErrors() || signUpErrors !== null ? styles.submitButtonError : ''}`}
            disabled={checkErrors() || signUpErrors !== null}
          >
            {t('regButtonText')}
          </button>
        </form>
        {signUpErrors ? (
          <div className={styles.registrationError}>{`${stripFirebaseErrorMessage(signUpErrors)}`}</div>
        ) : (
          <div className={styles.registrationErrorPlaceholder}></div>
        )}
      </div>
    </>
  );
}
