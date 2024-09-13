'use client';

import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IconWithDescription from './IconWithDescription';

describe('IconWithDescription Component', () => {
  const mockImageUrl = '/test-image.png';
  const mockDescription = 'Test Description';
  const mockHandleClickFunction = vi.fn();

  it('renders the image with correct source', () => {
    render(
      <IconWithDescription
        imageUrl={mockImageUrl}
        description={mockDescription}
        handleClickFunction={mockHandleClickFunction}
      />
    );
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', mockImageUrl);
  });

  it('calls handleClickFunction when the image is clicked', () => {
    render(
      <IconWithDescription
        imageUrl={mockImageUrl}
        description={mockDescription}
        handleClickFunction={mockHandleClickFunction}
      />
    );
    const imageElement = screen.getByRole('img');
    fireEvent.click(imageElement);
    expect(mockHandleClickFunction).toHaveBeenCalled();
  });
});
