import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'developerCreds':
          return 'Developed by Anton';
        case 'year':
          return '2024';
        default:
          return key;
      }
    },
  }),
}));

describe('Footer', () => {
  it('renders the footer content correctly', () => {
    render(<Footer />);

    const developerLink = screen.getByRole('link', { name: 'Developed by Anton' });
    expect(developerLink).toHaveAttribute('href', 'https://github.com/antosha14');

    const yearText = screen.getByText('2024');
    expect(yearText).toBeInTheDocument();

    const rsSchoolLink = screen.getByRole('link', { name: 'RS School logo' });
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/react/');

    const rsSchoolLogo = screen.getByRole('img', { name: 'RS School logo' });
    expect(rsSchoolLogo).toHaveAttribute('src', '/rss-logo.svg');
    expect(rsSchoolLogo).toHaveAttribute('alt', 'RS School logo');
  });
});
