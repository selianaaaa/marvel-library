import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import marvelLogo from '@assets/marvel_logo.svg';
import { colors, baseRow } from '@style';

/**
 * Navbar
 */
export const Navbar: React.FC = () => (
  <$Navbar>
    <$Link to="/">
      <$MarvelLogo src={marvelLogo} />
    </$Link>
  </$Navbar>
);

const $Navbar = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  background: ${colors.PRIMARY_100};
  ${baseRow()};
`;

const $MarvelLogo = styled.img`
  position: relative;
  width: 125px;
  height: 60px;
  object-fit: contain;
`;

const $Link = styled(Link)`
  text-decoration: none;
`;
