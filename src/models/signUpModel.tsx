import { object, string, InferType, ref } from 'yup';
import { useTranslation } from 'react-i18next';

export const useUserRegisterSchema = () => {
  const { t } = useTranslation();

  return object({
    name: string()
      .required(t('validation.name.required'))
      .matches(/^[A-Z][a-zA-Z]*$/, t('validation.name.uppercase')),
    email: string().required(t('validation.email.required')).email(t('validation.email.invalid')),
    password: string()
      .required(t('validation.password.required'))
      .matches(/[0-9]/, t('validation.password.oneNumber'))
      .matches(/[A-Z]/, t('validation.password.oneUppercase'))
      .matches(/[a-z]/, t('validation.password.oneLowercase'))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t('validation.password.oneSpecial'))
      .length(8, t('validation.password.minLength')),
    passwordConfirm: string()
      .required(t('validation.passwordConfirm.required'))
      .oneOf([ref('password')], t('validation.passwordConfirm.match')),
  });
};

export type User = InferType<ReturnType<typeof useUserRegisterSchema>>;
