'use client';

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ParamsTable from './ParamsTable';
import { VariableField } from '../AdditionalVariablesSection/RequestParamsSection';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'header':
          return 'Header';
        case 'varName':
          return 'Variable Name';
        case 'value':
          return 'Value';
        case 'keyPlaceholder':
          return 'Enter key';
        case 'valuePlaceholder':
          return 'Enter value';
        default:
          return key;
      }
    },
  }),
}));

describe('ParamsTable Component', () => {
  const mockDispatcher = vi.fn();
  const mockElements: VariableField[] = [
    { id: 0, paramKey: 'key1', paramValue: 'value1' },
    { id: 1, paramKey: 'key2', paramValue: 'value2' },
  ];

  it('renders table headers correctly', () => {
    render(<ParamsTable tableFor="headers" elements={mockElements} dispatcher={mockDispatcher} />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });
});
