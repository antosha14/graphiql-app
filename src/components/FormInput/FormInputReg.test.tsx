import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormInputReg from './FormInputReg';
import * as reactHookForm from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { FormInputState } from '@components/SignUpForm/SignUpForm';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('react-i18next', async () => ({
  ...vi.importActual('react-i18next'),
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('@components/PasswordStrengthMeter/PasswordStrengthMeter');

describe('FormInputReg Component', () => {
  it('renders email input correctly', () => {
    const TestComponent = () => {
      const { register, formState } = useForm<FormInputState>();

      return <FormInputReg field="email" register={register} errors={formState.errors} watch={vi.fn()} />;
    };

    render(<TestComponent />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(screen.getByText('email')).toBeInTheDocument();
  });

  it('renders correctly for password field with PasswordStrengthMeter on registration page', () => {
    const TestComponent = () => {
      const { register, formState } = useForm<FormInputState>();

      return <FormInputReg field="password" register={register} errors={formState.errors} watch={vi.fn()} />;
    };

    render(<TestComponent />);
    expect(screen.getByText('password')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const TestComponent = () => {
      const { register } = useForm<FormInputState>({
        defaultValues: {
          email: 'invalid-email',
        },
      });
      return (
        <FormInputReg
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
