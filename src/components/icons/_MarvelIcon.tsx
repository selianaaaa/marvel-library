import React from 'react';

import { IBaseIcon } from '@types';
import { colors } from '@style';

/**
 * Marvel icon
 * @param {string} fill - fill color
 * @param {number} width - width of the icon
 * @param {number} height - height of the icon
 * @param {Function} onClick - click handler
 */
export const MarvelIcon: React.FC<IBaseIcon> = ({
  fill = colors.SECONDARY_100,
  width = '100%',
  height = '100%',
  onClick,
}) => (
  <svg width={width} height={height} viewBox="0 0 500 200" onClick={onClick}>
    <path fill={fill} d="M0 0h500v200H0z" />
    <path
      fill="#fff"
      d="M423 47V16h-86l-14 102-14-102h-31l4 27c-4-7-16-27-44-27h-31v149L184 16h-40l-24 154V16H82l-14 87-14-87H15v168h31v-81l14 81h16l14-81v81h59l3-26h24l3 26h58v-55l7-1 15 56h30l-19-65c9-7 20-26 18-43l18 108h35l25-152v152h57v-30h-27v-39h27V85h-27V47h27zm-267 84 8-71 9 71h-17zm88-33-7 2V46c3 0 21 1 21 27 0 13-6 22-14 25zm241 56v30h-57V16h31v138h26z"
    />
  </svg>
);
