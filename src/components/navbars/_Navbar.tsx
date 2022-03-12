import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { MarvelIcon } from '@components';
import { colors, baseRow } from '@style';

/**
 * Navbar
 */
export const Navbar: React.FC = () => (
  <$Navbar>
    <$Link to="/">
      <MarvelIcon width={125} height={60} />
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

const $Link = styled(Link)`
  text-decoration: none;

  &:hover {
    svg {
      path:first-of-type {
        fill: ${colors.SECONDARY_200};
        transition: 0.2s;
      }
    }
  }
`;
