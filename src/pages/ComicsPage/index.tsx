import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Preloader, ComicsCard, ComicsPopup } from '@components';
import { superheroesActions } from '@store';
import { ISuperheroesState, IComics } from '@types';
import { colors, baseRow, screenSizes } from '@style';

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
      <$ComicsPagePreload>
        <Preloader />
      </$ComicsPagePreload>
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
          alt={character.name}
        />
      </$Character>

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

const $ComicsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
`;

const $ComicsPagePreload = styled($ComicsPage)`
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-top: 20px;
`;

export default ComicsPage;
