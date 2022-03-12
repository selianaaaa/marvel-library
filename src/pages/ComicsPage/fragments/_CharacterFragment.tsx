import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { ISuperheroesState } from '@types';
import { colors, screenSizes, baseRow } from '@style';

export const CharacterFragment: React.FC = () => {
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

  return (
    <$Character>
      {character && !characterRequest && (
        <>
          <$CharacterName>{character?.name}</$CharacterName>
          <$CharacterImg
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
        </>
      )}
    </$Character>
  );
};

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
