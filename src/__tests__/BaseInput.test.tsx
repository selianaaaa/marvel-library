import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { BaseInput } from '../components';

describe('BaseInput', () => {
  test('should render BaseInput', async () => {
    render(<BaseInput />);
  });

  test('should have input tag', () => {
    render(<BaseInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('check the onChange callback handler', () => {
    const onChange = jest.fn();

    render(<BaseInput value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Man' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('should change input value', async () => {
    const value = 'test value';
    const { getByTestId } = render(<BaseInput />);
    const input = getByTestId('input-value') as HTMLInputElement;

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: value } });

    expect(input.value).toBe(value);
  });
});
