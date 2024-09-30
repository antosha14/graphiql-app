import { render, screen } from '@testing-library/react';

test('Testing test', () => {
  render(<div>Test</div>);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
