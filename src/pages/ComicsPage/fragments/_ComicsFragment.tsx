import React, { useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { ComicsCard, Preloader, ComicsPopup } from '@components';
import { ISuperheroesState, IComics } from '@types';
import { colors, cardsGrid } from '@style';

export const ComicsFragment: React.FC = () => {
  const [selectedComics, setSelectedComics] = useState<IComics | null>(null);

  const comics = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) => superheroes.comics,
    shallowEqual,
  );

  if (!comics) return null;

  return (
    <$ComicsWrapper>
      <$Title>COMICS</$Title>
      <$Comics>
        {comics.map((comicsItem) => (
          <ComicsCard
            key={comicsItem.id}
            comics={comicsItem}
            onClick={() => setSelectedComics(comicsItem)}
          />
        ))}
      </$Comics>

      {selectedComics && (
        <ComicsPopup
          comics={selectedComics}
          closeClick={() => setSelectedComics(null)}
        />
      )}
    </$ComicsWrapper>
  );
};

const $ComicsWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 50px;
  padding: 0 30px;
`;

const $Title = styled.p`
  border-top: 2px solid ${colors.GRAY};
  padding-top: 10px;
  font-size: 17px;
`;

const $Comics = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  ${cardsGrid('200px', '1fr')};
`;
