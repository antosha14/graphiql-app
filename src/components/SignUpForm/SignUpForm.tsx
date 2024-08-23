'use client';

import styles from './SignUpForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userRegisterSchema } from '@models/signUpModel';
//import { passwordStrengthCheck } from '@utils/passwordStrengthCheck';

interface FormInputState {
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
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormInputState> = async data => {
    console.log(setValue, trigger, data);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.mainForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.mainLabel}>
            Name:
          </label>
          <input id="name" {...register('name')} className={styles.mainInput}></input>
          <p className={styles.errorMessage}>{`${errors?.name ? errors.name.message : ''}`}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.mainLabel}>
            Email:
          </label>
          <input id="email" {...register('email')} className={styles.mainInput}></input>
          <p className={styles.errorMessage}>{`${errors?.email ? errors.email.message : ''}`}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.mainLabel}>
            Password:
          </label>
          <input id="password" {...register('password')} className={styles.mainInput} type="password"></input>
          <p className={styles.errorMessage}>{`${errors?.password ? errors.password.message : ''}`}</p>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="passwordConfirm" className={styles.mainLabel}>
            Confirm Password:
          </label>
          <input
            id="passwordConfirm"
            {...register('passwordConfirm')}
            className={styles.mainInput}
            type="password"
          ></input>
          <p className={styles.errorMessage}>{`${errors?.passwordConfirm ? errors.passwordConfirm.message : ''}`}</p>
        </div>

        <div className={styles.inputContainer}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
