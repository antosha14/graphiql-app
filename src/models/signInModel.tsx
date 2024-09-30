import { object, string, InferType } from 'yup';
import { useTranslation } from 'react-i18next';

export const useUserLoginSchema = () => {
  const { t } = useTranslation();

  return object({
    email: string().required(t('validation.email.required')).email(t('validation.email.invalid')),
    password: string().required(t('validation.password.required')),
  });
};

export type User = InferType<ReturnType<typeof useUserLoginSchema>>;
