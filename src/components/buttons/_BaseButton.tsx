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
  width: auto;
  padding: 20px 40px;
  background-color: ${colors.SECONDARY_100};
  border: none;
  outline: none;
  ${baseRow()};
  color: ${colors.WHITE};
  clip-path: polygon(11% 0, 100% 0, 100% 65%, 89% 100%, 0 100%, 0 35%);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    background-color: ${colors.SECONDARY_200};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
