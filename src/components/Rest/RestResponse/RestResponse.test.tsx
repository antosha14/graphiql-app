'use client';

import RestResponse from './RestResponse';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest';
import { useRestRequest, useRequestUpdateContext } from '@contexts/RequestStateContext';
import { useTranslation } from 'react-i18next';

vi.mock('@contexts/RequestStateContext', () => ({
  useRestRequest: vi.fn(),
  useRequestUpdateContext: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value }) => <pre data-testid="code-mirror">{value}</pre>,
}));

describe('RestResponse Component', () => {
  const mockRequest = {
    status: 'noRequest',
    response: { status: 0, statusText: '', duration: 0, contentLength: '0', data: '' },
  };

  const mockSetRequest = vi.fn();
  const mockT = vi.fn((key: string) => key);

  beforeEach(() => {
    (useRestRequest as () => RestRequestState).mockReturnValue(mockRequest);
    (useRequestUpdateContext as () => RestRequestState).mockReturnValue(mockSetRequest);
    (useTranslation as () => RestRequestState).mockReturnValue({ t: mockT });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial response message when status is "noRequest"', () => {
    render(<RestResponse />);
    expect(screen.getByText('initialResp')).toBeInTheDocument();
  });

  it('renders loading indicator when status is "pending"', () => {
    (useRestRequest as () => RestRequestState).mockReturnValue({ ...mockRequest, status: 'pending' });
    render(<RestResponse />);
    expect(screen.getByAltText('Loading indicator')).toBeInTheDocument();
  });

  it('renders error message when status is "displayError"', () => {
    const mockErrorData = 'Something went wrong!';
    (useRestRequest as () => RestRequestState).mockReturnValue({
      ...mockRequest,
      status: 'displayError',
      response: { ...mockRequest.response, data: mockErrorData },
    });
    render(<RestResponse />);
    expect(screen.getByText(mockErrorData)).toBeInTheDocument();
  });
});
