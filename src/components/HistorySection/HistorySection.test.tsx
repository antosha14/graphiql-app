import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HistorySection from './HistorySection';
import * as localStorage from '@utils/useLocalStorage';

vi.mock('next/link', () => ({
  default: vi.fn(({ children, ...rest }) => <a {...rest}>{children}</a>),
}));

vi.mock('@utils/useLocalStorage');
vi.mock('react-i18next');

const useRouterPushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: useRouterPushMock,
  }),
}));

describe('HistorySection Component', () => {
  beforeEach(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => ({ t: (key: string) => key }),
    }));
  });

  it('renders "empty" message when there are no queries', () => {
    vi.mocked(localStorage.getAllQueries).mockReturnValue([]);
    render(<HistorySection />);
    expect(screen.getByText(/You haven't executed any requests/i)).toBeInTheDocument();
  });

  it('renders history entries when there are queries', () => {
    vi.mocked(localStorage.getAllQueries).mockReturnValue([
      {
        method: 'GET',
        url: 'https://example.com',
        body: '',
        headers: [{ id: 0, paramKey: 'Content-Type', paramValue: 'application/json' }],
        status: 200,
        statusText: 'OK',
      },
      {
        method: 'POST',
        url: 'https://api.example.com',
        body: '',
        headers: [{ id: 0, paramKey: 'Content-Type', paramValue: 'application/json' }],
        status: 200,
        statusText: 'OK',
      },
    ]);

    render(<HistorySection />);
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com')).toBeInTheDocument();
  });

  it('renders REST and GraphiQL client links', () => {
    render(<HistorySection />);
    expect(screen.getByText('REST client')).toHaveAttribute('href', '/GET');
    expect(screen.getByText('GraphiQL client')).toHaveAttribute('href', '/GRAPHQL');
  });
});
