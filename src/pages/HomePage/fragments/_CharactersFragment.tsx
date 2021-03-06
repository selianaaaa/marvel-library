import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { CharacterCard, Preloader, BaseButton } from '@components';
import { charactersActions } from '@store';
import { ISuperheroesState } from '@types';
import { baseRow, colors, cardsGrid } from '@style';

interface ICharactersFragment {
  searchValue: string;
}

export const CharactersFragment: React.FC<ICharactersFragment> = ({
  searchValue,
}) => {
  const dispatch = useDispatch();

  const characters = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.characters,
    shallowEqual,
  );
  const charactersRequest = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.characters_request,
    shallowEqual,
  );

  if (charactersRequest || !characters) {
    return (
      <$CharactersLoading>
        <Preloader />
      </$CharactersLoading>
    );
  }

  return (
    <$Characters>
      {characters.results.length ? (
        <>
          <$SearchResult>
            {characters.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </$SearchResult>
          <$Bottom>
            <BaseButton
              disabled={characters.offset >= characters.total}
              onClick={() =>
                dispatch(charactersActions.getMoreCharacters(searchValue))
              }
            >
              LOAD MORE
            </BaseButton>
          </$Bottom>
        </>
      ) : (
        <$EmptyResult>NOTHING FOUND, TRY AGAIN</$EmptyResult>
      )}
    </$Characters>
  );
};

const $Characters = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 50px;
  gap: 30px;
`;

const $CharactersLoading = styled($Characters)`
  position: relative;
  width: 100%;
  ${baseRow()};
`;

const $SearchResult = styled.div`
  position: relative;
  width: 100%;
  ${cardsGrid('190px', '300px')};
  gap: 1rem;
`;

const $Bottom = styled.div`
  position: relative;
  justify-self: center;
`;

const $EmptyResult = styled.p`
  justify-self: center;
  align-self: center;
  color: ${colors.GRAY_100};
  font-size: 30px;
  font-weight: 500;
`;
