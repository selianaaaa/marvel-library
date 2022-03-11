import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { ComicsCard, Preloader, ComicsPopup } from '@components';
import { ISuperheroesState, IComics } from '@types';
import { colors, cardsGrid, baseRow } from '@style';

interface IComicsFragment {
  setSelectedComics: (comics: IComics) => void;
}
export const ComicsFragment: React.FC<IComicsFragment> = ({
  setSelectedComics,
}) => {
  const comics = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) => superheroes.comics,
    shallowEqual,
  );

  const comicsRequest = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.comics_request,
    shallowEqual,
  );

  if (comicsRequest || !comics) {
    return null;
  }

  if (comics.length) {
    return (
      <$Comics>
        {comics.map((comicsItem) => (
          <ComicsCard
            key={comicsItem.id}
            comics={comicsItem}
            onClick={() => setSelectedComics(comicsItem)}
          />
        ))}
      </$Comics>
    );
  }

  return <$EmptyResult>NO COMICS FOUND</$EmptyResult>;
};

const $PreloadWrapper = styled.div`
  position: relative;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  ${baseRow()};
`;

const $Comics = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  ${cardsGrid('200px', '1fr')};
`;

const $EmptyResult = styled.p`
  text-align: center;
  color: ${colors.GRAY};
  margin-top: 40px;
  font-size: 30px;
  font-weight: 500;
`;
