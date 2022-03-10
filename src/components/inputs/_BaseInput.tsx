import React, { ComponentProps } from 'react';
import styled from 'styled-components';

import { baseRow, colors } from '@style';

interface IBaseInput extends ComponentProps<'input'> {
  icon?: JSX.Element;
}

/**
 * Base input component
 * @param {string} value - input value
 * @param {string} placeholder - input placeholder
 * @param {function} onChange - change handler
 * @param {JSX.Element} icon - input icon
 */
export const BaseInput: React.FC<IBaseInput> = ({
  value,
  placeholder = '',
  onChange,
  icon,
}) => {
  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof onChange === 'function') {
      return onChange(event);
    }
  }

  return (
    <$InputWrapper withIcon={!!icon}>
      {icon && <$Icon>{icon}</$Icon>}
      <$Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = placeholder)}
      />
    </$InputWrapper>
  );
};

const $Input = styled.input`
  position: relative;
  width: 100%;
  height: 30px;
  background: transparent;
  border: none;
  outline: none;
  box-sizing: border-box;
  border-bottom: 4px solid ${colors.PRIMARY_100};
  padding-bottom: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.PRIMARY_100};

  &::placeholder {
    color: ${colors.GRAY};
  }
`;

const $Icon = styled.span`
  position: absolute;
  width: 25px;
  height: 25px;
  transform: rotateZ(-5deg);
  top: 0;
  left: 0;
  z-index: 10;
`;

const $InputWrapper = styled.div<{ withIcon: boolean }>`
  position: relative;
  width: 100%;
  ${baseRow()};
  align-items: flex-end;

  ${$Input} {
    padding-left: ${({ withIcon }) => (withIcon ? '50px' : '')};
  }
`;
