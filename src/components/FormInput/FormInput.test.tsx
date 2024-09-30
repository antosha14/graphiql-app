import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormInputAuth from './FormInputAuth';
import * as reactHookForm from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { FormInputStateAuth } from '@components/SignInForm/SignInForm';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('react-i18next', async () => ({
  ...vi.importActual('react-i18next'),
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@components/PasswordStrengthMeter/PasswordStrengthMeter');

describe('FormInputAuth Component', () => {
  it('renders email input correctly', () => {
    const TestComponent = () => {
      const { register, formState } = useForm<FormInputStateAuth>();

      return <FormInputAuth field="email" register={register} errors={formState.errors} watch={vi.fn()} />;
    };

    render(<TestComponent />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(screen.getByText('email')).toBeInTheDocument();
  });

  it('renders correctly for password field with PasswordStrengthMeter on registration page', () => {
    const TestComponent = () => {
      const { register, formState } = useForm<FormInputStateAuth>();

      return <FormInputAuth field="password" register={register} errors={formState.errors} watch={vi.fn()} />;
    };

    render(<TestComponent />);
    expect(screen.getByText('password')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const TestComponent = () => {
      const { register } = useForm<FormInputStateAuth>({
        defaultValues: {
          email: 'invalid-email',
        },
      });
      return (
        <FormInputAuth
          field="email"
          register={register}
          errors={{ email: { message: 'Invalid email address' } as reactHookForm.FieldError }}
          watch={vi.fn()}
        />
      );
    };

    render(<TestComponent />);
    expect(screen.getByText('Invalid email address')).toBeVisible();
  });
});
