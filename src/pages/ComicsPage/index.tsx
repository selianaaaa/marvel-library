import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Preloader, ComicsPopup } from '@components';
import { characterActions, comicsActions } from '@store';
import { ISuperheroesState, IComics } from '@types';
import { colors, screenSizes } from '@style';
import { ComicsFragment, CharacterFragment } from './fragments';

const ComicsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { characterId } = useParams<{ characterId: string }>();
  const [selectedComics, setSelectedComics] = useState<IComics | null>(null);

  const character = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.character,
    shallowEqual,
  );

  const characterRequest = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.character_request,
    shallowEqual,
  );

  const comicsRequest = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.comics_request,
    shallowEqual,
  );

  useEffect(() => {
    if (characterId && characterId !== character?.id.toString()) {
      dispatch(characterActions.getCharacter(characterId));
      dispatch(comicsActions.getComics(characterId));
    }
  }, [characterId, character]);

  return (
    <$ComicsPage characterLoading={characterRequest || comicsRequest}>
      <CharacterFragment />

      <$ComicsWrapper>
        <$Title>COMICS</$Title>
        {comicsRequest ? (
          <Preloader />
        ) : (
          <ComicsFragment setSelectedComics={setSelectedComics} />
        )}
      </$ComicsWrapper>

      {selectedComics && (
        <ComicsPopup
          comics={selectedComics}
          closeClick={() => setSelectedComics(null)}
        />
      )}
    </$ComicsPage>
  );
};

const $ComicsPage = styled.div<{ characterLoading?: boolean }>`
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  display: grid;
  grid-template-rows: 400px 1fr;
  gap: 50px;
  background: ${({ characterLoading }) =>
    characterLoading ? colors.GRAY_200 : colors.WHITE};
`;

const $ComicsWrapper = styled.div`
  width: 100%;
  padding: 0 30px;

  @media ${screenSizes.MOBILE} {
    padding: 0 20px;
  }
`;

const $Title = styled.p`
  padding-top: 20px;
  font-size: 19px;
  border-top: 2px solid ${colors.GRAY_100};
`;

export default ComicsPage;
