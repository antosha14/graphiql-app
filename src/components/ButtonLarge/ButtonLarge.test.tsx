import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ButtonLarge from './ButtonLarge';

const mockSignOutUser = vi.fn(() => Promise.resolve());

vi.mock('@contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({
    currentUser: { email: 'test@example.com' },
    signOutUser: mockSignOutUser,
  })),
}));

describe('ButtonLarge', () => {
  it('renders the button with correct text and link', () => {
    render(<ButtonLarge text="Sign In" />);
    const buttonElement = screen.getByText(/Sign In/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', '/authentication');
  });

  it('renders different text and link based on props', () => {
    render(<ButtonLarge text="Sign Up" />);
    const buttonElement = screen.getByText(/Sign Up/i);
    expect(buttonElement).toHaveAttribute('href', '/registration');
  });

  it('renders russian text and link based on props', () => {
    render(<ButtonLarge text="Регистрация" />);
    const buttonElement = screen.getByText(/Регистрация/i);
    expect(buttonElement).toHaveAttribute('href', '/registration');
    render(<ButtonLarge text="Войти" />);
    const buttonElement2 = screen.getByText(/Войти/i);
    expect(buttonElement2).toHaveAttribute('href', '/authentication');
  });

  it('calls signOutUser when currentUser exists and button is clicked', async () => {
    render(<ButtonLarge text="Sign Out" />);

    const buttonElement = screen.getByText(/Sign Out/i);
    await fireEvent.click(buttonElement);

    expect(mockSignOutUser).toHaveBeenCalledOnce();
  });
});
