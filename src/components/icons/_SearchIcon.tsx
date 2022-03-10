import React from 'react';

import { IBaseIcon } from '@types';
import { colors } from '@style';

/**
 * Search icon
 * @param {string} fill - fill color
 * @param {number} width - width of the icon
 * @param {number} height - height of the icon
 * @param {string} className - external class
 */
export const SearchIcon: React.FC<IBaseIcon> = ({
  fill = colors.PRIMARY,
  width = '100%',
  height = '100%',
  className = '',
}) => (
  <svg className={className} width={width} height={height} viewBox="0 0 50 50">
    <path
      d="M21 3a17 17 0 1 0 9 31.3l12.4 12.3 4.2-4.2-12.1-12.1A17 17 0 0 0 21 3Zm0 4a13 13 0 1 1 0 26 13 13 0 1 1 0-26Z"
      fill={fill}
    />
  </svg>
);
