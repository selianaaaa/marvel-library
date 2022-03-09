import { css } from 'styled-components';
import { Properties } from 'csstype';

export const baseRow = (
  justifyContent: Properties['justifyContent'] = 'center',
  alignItems: Properties['alignItems'] = 'center',
) => {
  return css`
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `;
};

export const baseColumn = (alignItems: Properties['alignItems'] = 'center') => {
  return css`
    display: flex;
    flex-direction: column;
    align-items: ${alignItems};
  `;
};
