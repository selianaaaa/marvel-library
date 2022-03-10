import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import { colors, baseRow } from '@style';

export const BaseButton: React.FC<ComponentProps<'button'>> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <$Button onClick={onClick} disabled={disabled}>
      {children}
    </$Button>
  );
};

const $Button = styled.button`
  position: relative;
  width: 170px;
  height: 50px;
  background-color: ${colors.SECONDARY};
  border: none;
  outline: none;
  transition: 0.1s;
  ${baseRow()};
  color: ${colors.WHITE};
  clip-path: polygon(11% 0, 100% 0, 100% 65%, 89% 100%, 0 100%, 0 33%);
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    background-color: red;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
