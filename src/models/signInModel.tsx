import { object, string, InferType } from 'yup';

export const userLoginSchema = object({
  email: string().required('Email is required').email('Invalid email address'),
  password: string().required('Password is required'),
});

export type User = InferType<typeof userLoginSchema>;
