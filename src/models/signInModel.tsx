import { object, string, InferType } from 'yup';

export const userLoginSchema = object({
  email: string().required('Email is required').email('Invalid email address'),
  password: string()
    .required('Password is required')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

export type User = InferType<typeof userLoginSchema>;
