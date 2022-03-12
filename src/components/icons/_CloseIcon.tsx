import React from 'react';

import { IBaseIcon } from '@types';
import { colors } from '@style';

/**
 * Close icon
 * @param {string} fill - fill color
 * @param {number} width - width of the icon
 * @param {number} height - height of the icon
 * @param {Function} onClick - click handler
 */
export const CloseIcon: React.FC<IBaseIcon> = ({
  fill = colors.PRIMARY_100,
  width = '100%',
  height = '100%',
  onClick,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 19"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.4 9.5L0 3l2.1-2 6.4 6.4L14.9.9 17 3l-6.4 6.5L17 16l-2.1 2-6.4-6.4-6.4 6.5L0 16l6.4-6.5z"
      fill={fill}
    />
  </svg>
);
