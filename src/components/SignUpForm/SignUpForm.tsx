'use client';

import styles from './SignUpForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userRegisterSchema } from '@models/signUpModel';
import FormInput from '@components/FormInput/FormInput';
import { registerWithEmailAndPassword } from '../../auth/firebase';

export interface FormInputState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormInputState> = async () => {
    registerWithEmailAndPassword(watch('name'), watch('email'), watch('password'));
  };

  const checkErrors = () => {
    return Object.values(errors).some(value => value !== undefined);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
        <FormInput field="name" register={register} errors={errors} watch={watch} />
        <FormInput field="email" register={register} errors={errors} watch={watch} />
        <FormInput field="password" register={register} errors={errors} watch={watch} />
        <FormInput field="passwordConfirm" register={register} errors={errors} watch={watch} />
        <button
          type="submit"
          className={`${styles.submitButton} ${checkErrors() ? styles.submitButtonError : ''}`}
          disabled={checkErrors()}
        >
          Register
        </button>
      </form>
    </div>
  );
}
