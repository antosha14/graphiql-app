import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HistoryEntry from './HistoryEntry';
import { Query } from '@utils/useLocalStorage';
import { requestTypeOptions } from '@models/requestTypeOptions';

const useRouterPushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: useRouterPushMock,
  }),
}));

describe('HistoryEntry Component', () => {
  const mockQuery: Query = {
    method: 'GET',
    url: 'https://api.example.com/data',
    body: '',
    headers: [{ id: 0, paramKey: 'Content-Type', paramValue: 'application/json' }],
    status: 200,
    statusText: 'OK',
  };

  it('renders correctly', () => {
    render(<HistoryEntry query={mockQuery} />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('https://api.example.com/data')).toBeInTheDocument();
    expect(screen.getByText('200. OK')).toBeInTheDocument();
  });

  it('applies the correct color based on request method', () => {
    render(<HistoryEntry query={mockQuery} />);
    const methodElement = screen.getByText('GET');
    const expectedColor = requestTypeOptions.find(option => option.method === mockQuery.method)?.color;
    expect(methodElement).toHaveStyle({ color: expectedColor });
  });

  it('navigates to the correct URL on click', () => {
    render(<HistoryEntry query={mockQuery} />);

    const getEntry = screen.getByText('GET');
    fireEvent.click(getEntry);

    expect(useRouterPushMock).toHaveBeenCalledTimes(1);
    expect(useRouterPushMock).toHaveBeenCalledWith(
      '/GET/aHR0cHMlM0ElMkYlMkZhcGkuZXhhbXBsZS5jb20lMkZkYXRh/?Content-Type=application/json'
    );
  });
});
