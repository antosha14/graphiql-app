import TranslationsProvider from './TranslationsProvider';
import { render } from '@testing-library/react';
import { vi, Mock } from 'vitest';

vi.mock('../../app/i18n');
import initTranslations from '../../app/i18n';

describe('TranslationsProvider', () => {
  it('renders children with I18nextProvider and initialized i18n', () => {
    const mockInitTranslations = initTranslations as Mock;
    const mockResources = {
      en: {
        translation: {
          test: 'Test',
        },
      },
    };
    const testLocale = 'en';
    const testNamespaces = ['translation'];

    render(
      <TranslationsProvider locale={testLocale} namespaces={testNamespaces} resources={mockResources}>
        <div>Test Children</div>
      </TranslationsProvider>
    );

    expect(mockInitTranslations).toHaveBeenCalledWith(testLocale, testNamespaces, expect.any(Object), mockResources);
  });
});
