import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Preloader, ComicsPopup } from '@components';
import { superheroesActions } from '@store';
import { ISuperheroesState, IComics } from '@types';
import { colors, baseRow, screenSizes } from '@style';
import { ComicsFragment } from './fragments';

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
      dispatch(superheroesActions.getCharacter(characterId));
      dispatch(superheroesActions.getComics(characterId));
    }
  }, []);

  if (characterRequest || !character) {
    return (
      <$ComicsPage characterLoading>
        <Preloader />
      </$ComicsPage>
    );
  }

  return (
    <$ComicsPage>
      <$Character>
        <$CharacterName>{character.name}</$CharacterName>
        <$CharacterImg
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </$Character>

      <$ComicsWrapper>
        <$Title>COMICS</$Title>
        <ComicsFragment setSelectedComics={setSelectedComics} />
        {selectedComics && (
          <ComicsPopup
            comics={selectedComics}
            closeClick={() => setSelectedComics(null)}
          />
        )}
      </$ComicsWrapper>
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

const $Character = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: ${colors.PRIMARY_200};
  clip-path: polygon(50% 0%, 100% 0, 100% 66%, 0 100%, 0 0);
  ${baseRow()};
  padding-bottom: 80px;

  @media ${screenSizes.MOBILE} {
    padding: 0 15px 60px 15px;
    flex-direction: column;
    justify-content: center;
  }
`;

const $CharacterName = styled.h1`
  color: ${colors.WHITE};
  font-size: 20px;
  text-transform: uppercase;

  @media ${screenSizes.MOBILE} {
    text-align: center;
  }
`;

const $CharacterImg = styled.img`
  position: relative;
  width: 170px;
  height: 170px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 50px;

  @media ${screenSizes.MOBILE} {
    margin-left: 0;
    margin-top: 20px;
  }
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
