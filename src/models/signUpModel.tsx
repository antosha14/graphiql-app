import { object, string, InferType, ref } from 'yup';

export const userRegisterSchema = object({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Start with uppercase letter'),
  email: string().required('Email is required').email('Invalid email address'),
  password: string()
    .required('Password is required')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[a-z]/, 'At least one lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least one special character')
    .length(8, 'At least 8 characters long'),
  passwordConfirm: string()
    .required('Password confirmation is required')
    .oneOf([ref('password')], 'Passwords must match'),
});

export type User = InferType<typeof userRegisterSchema>;
