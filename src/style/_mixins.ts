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

export const cardsGrid = (cardMinWidth: string, cardHeigth: string) => {
  return css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${cardMinWidth}, 1fr));
    grid-template-rows: repeat(auto-fill, ${cardHeigth});
    justify-items: center;
  `;
};
