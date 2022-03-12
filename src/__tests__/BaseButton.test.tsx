import React from 'react';
import { render, screen } from '@testing-library/react';

import { BaseButton } from '../components';

describe('BaseButton', () => {
  test('should render BaseButton', () => {
    render(<BaseButton />);
  });

  test('should have button tag', () => {
    render(<BaseButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should have child', () => {
    render(<BaseButton>Click</BaseButton>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });
});
