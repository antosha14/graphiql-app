import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';
import { useAuth } from '@contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';

vi.mock('@components/FormInput/FormInputAuth');
vi.mock('@contexts/AuthContext');
vi.mock('react-i18next');
vi.mock('firebase/auth');

describe('SignInForm Component', () => {
  const mockAuth = {
    currentUser: null,
  };

  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({ auth: mockAuth });
    vi.mocked(useTranslation).mockReturnValue({ t: key => key });
  });

  it('renders the form', () => {
    render(<SignInForm />);
    expect(screen.getByText('wmReg')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'signInButtonText' })).toBeInTheDocument();
    expect(screen.getByText('guestMessage')).toBeInTheDocument();
  });

  it('handles guest sign-in', async () => {
    const mockGuestSignInWithEmailAndPassword = vi.mocked(signInWithEmailAndPassword);
    mockGuestSignInWithEmailAndPassword.mockResolvedValue({
      user: {
        email: 'anton.kozel.97@mail.ru',
      },
    });

    render(<SignInForm />);

    const guestLink = screen.getByText('guestMessage');
    fireEvent.click(guestLink);

    expect(mockGuestSignInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, 'anton.kozel.97@mail.ru', '123As***');
  });
});
