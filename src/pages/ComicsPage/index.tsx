import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Preloader, ComicsPopup } from '@components';
import { characterActions, comicsActions } from '@store';
import { ISuperheroesState, IComics } from '@types';
import { colors, baseRow, screenSizes } from '@style';
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

  useEffect(() => {
    if (characterId && characterId !== character?.id.toString()) {
      dispatch(characterActions.getCharacter(characterId));
      dispatch(comicsActions.getComics(characterId));
    }
  }, [characterId, character]);

  if (characterRequest || !character) {
    return (
      <$ComicsPage characterLoading>
        <Preloader />
      </$ComicsPage>
    );
  }

  return (
    <$ComicsPage>
      <CharacterFragment />

      <$ComicsWrapper>
        <$Title>COMICS</$Title>
        <ComicsFragment setSelectedComics={setSelectedComics} />
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
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  display: grid;
  grid-template-rows: 400px 1fr;
  gap: 50px;

  ${({ characterLoading }) => {
    if (characterLoading) {
      return css`
        ${baseRow()};

        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: block;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
        }
      `;
    }
  }}
`;

const $ComicsWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 30px;
`;

const $Title = styled.p`
  padding-top: 10px;
  font-size: 17px;
  border-top: 2px solid ${colors.GRAY};
`;

export default ComicsPage;
