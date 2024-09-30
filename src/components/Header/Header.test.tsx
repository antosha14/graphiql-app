import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

vi.mock('next/image', () => ({
  default: vi.fn(({ alt, src, className }) => <img alt={alt} src={src} className={className} />),
}));

vi.mock('next/link', () => ({
  default: vi.fn(({ children }) => <a>{children}</a>),
}));

const mockUseAuth = vi.fn();
const mockUseTranslation = vi.fn();
const mockUseWindowScroll = vi.fn();

vi.mock('@contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth.mockReturnValue({ currentUser: null }),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
    },
  }),
}));

const useRouterPushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: useRouterPushMock,
  }),
  usePathname: vi.fn(),
}));

vi.mock('react-use', () => ({
  useWindowScroll: () => mockUseWindowScroll.mockReturnValue({ y: 0 }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    mockUseAuth.mockClear();
    mockUseTranslation.mockClear();
    mockUseWindowScroll.mockClear();
  });

  it('renders the header', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
