import React from 'react';
import styled, { keyframes } from 'styled-components';

import { baseRow } from '@style';

/**
 * Preloader
 */
export const Preloader: React.FC = () => (
  <$PreloaderWrapper>
    <$Preloader>
      <$Circle></$Circle>
      <$Circle></$Circle>
      <$Circle></$Circle>
    </$Preloader>
  </$PreloaderWrapper>
);

const $PreloaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${baseRow()};
`;

const $Preloader = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  align-self: center;
`;

const zoom = keyframes`
    to {
    width: calc(50px + 20px);
    margin-left: calc(-25px - 10px);
    margin-top: calc(-25px - 10px);
    border-width: 5px;
    border-color: hsla(0, 0%, 100%, 0.7);
  }
`;

const $Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  align-self: center;
  border-width: 0;
  border-style: solid;
  border-color: hsla(0, 0%, 100%, 0);
  border-radius: 50%;
  animation: ${zoom} 1s ease-in infinite;

  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  &:nth-of-type(2) {
    animation-delay: 0.33s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.67s;
  }
`;
