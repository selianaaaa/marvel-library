import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Preloader, ComicsCard } from '@components';
import { superheroesActions } from '@store';
import { ISuperheroesState } from '@types';
import { colors, baseRow, screenSizes } from '@style';

const ComicsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { characterId } = useParams<{ characterId: string }>();

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

  const comics = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) => superheroes.comics,
    shallowEqual,
  );

  useEffect(() => {
    if (characterId && characterId !== character?.id.toString()) {
      dispatch(superheroesActions.getCharacter(characterId));
      dispatch(superheroesActions.getComics(characterId));
    }
  }, []);

  if (characterRequest) {
    return (
      <$ComicsPage>
        <Preloader />
      </$ComicsPage>
    );
  }

  if (!character || !comics) {
    return <div>Something went wrong</div>;
  }

  return (
    <$ComicsPage>
      <$Character>
        <$CharacterName>{character.name}</$CharacterName>
        <$CharacterImg
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        />
      </$Character>

      <$ComicsWrapper>
        <$Title>COMICS</$Title>
        <$Comics>
          {comics.map((comicsItem) => (
            <ComicsCard key={comicsItem.id} comics={comicsItem} />
          ))}
        </$Comics>
      </$ComicsWrapper>
    </$ComicsPage>
  );
};

const $ComicsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
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
    padding-bottom: 60px;
    flex-direction: column;
    justify-content: center;
  }
`;

const $CharacterName = styled.h1`
  color: ${colors.WHITE};
  font-size: 20px;
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
  margin-top: 50px;
  padding: 0 30px;
`;

const $Title = styled.p`
  border-top: 2px solid ${colors.GRAY};
  padding-top: 10px;
`;

const $Comics = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 15px;
  justify-items: center;
`;

export default ComicsPage;
