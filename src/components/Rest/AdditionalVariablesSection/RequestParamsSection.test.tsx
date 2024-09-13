'use client';

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RequestParamsSection from './RequestParamsSection';
import { updateVariablesInLs, getAllVariablesFromLs } from '@utils/useLocalStorage';

vi.mock('@utils/useLocalStorage');
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'variables':
          return 'Variables';
        case 'headers':
          return 'Headers';
        default:
          return key;
      }
    },
  }),
}));

describe('RequestParamsSection Component', () => {
  const mockDispatchViewAction = vi.fn();
  const mockShowState = 'nothing';

  beforeEach(() => {
    vi.mocked(getAllVariablesFromLs).mockReturnValue([{ id: 0, paramKey: 'var1', paramValue: 'value1' }]);
    vi.mocked(updateVariablesInLs).mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the component with buttons', () => {
    render(<RequestParamsSection dispatchViewAction={mockDispatchViewAction} showState={mockShowState} />);
    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });

  it('updates showState when buttons are clicked', () => {
    render(<RequestParamsSection dispatchViewAction={mockDispatchViewAction} showState={mockShowState} />);

    fireEvent.click(screen.getByText('Variables'));
    expect(mockDispatchViewAction).toHaveBeenCalledWith({
      type: 'showed_variables',
    });

    fireEvent.click(screen.getByText('Headers'));
    expect(mockDispatchViewAction).toHaveBeenCalledWith({
      type: 'showed_headers',
    });
  });
});
