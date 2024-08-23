'use client';

import styles from './SignUpForm.module.scss';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function SignUpForm() {
  return (
    <div className={styles.formContainer}>
      <form className={styles.mainForm}>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.mainLabel}>
            Name:
          </label>
          <input id="name" className={styles.mainInput}></input>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.mainLabel}>
            Email:
          </label>
          <input id="email" className={styles.mainInput}></input>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.mainLabel}>
            Password:
          </label>
          <input id="password" className={styles.mainInput} type="password"></input>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="passwordConfirm" className={styles.mainLabel}>
            Confirm Password:
          </label>
          <input id="passwordConfirm" className={styles.mainInput} type="password"></input>
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
