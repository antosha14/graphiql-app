import { object, string, InferType, ref } from 'yup';

export const userRegisterSchema = object({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter and contain only letters'),
  email: string().required('Email is required').email('Invalid email address'),
  password: string()
    .required('Password is required')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  passwordConfirm: string()
    .required('Password confirmation is required')
    .oneOf([ref('password')], 'Passwords must match'),
});

export type User = InferType<typeof userRegisterSchema>;
