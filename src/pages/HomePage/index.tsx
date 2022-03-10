import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import {
  BaseInput,
  SearchIcon,
  CharacterCard,
  Preloader,
  BaseButton,
} from '@components';
import { superheroesActions } from '@store';
import { ISuperheroesState, ICharactersData } from '@types';
import { colors } from '@style';

// interface IHomePage {
//   characters: ICharactersData | null;
//   charactersRequest: boolean;
// }

const HomePage: React.FC = () => {
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

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(superheroesActions.getCharacters());
  }, []);

  if (charactersRequest) {
    return (
      <$HomePage>
        <Preloader />
      </$HomePage>
    );
  }

  if (!characters || !characters.results.length) {
    return <div>Nothing found</div>;
  }

  return (
    <$HomePage>
      <BaseInput
        value={searchValue}
        placeholder="Search character"
        icon={<SearchIcon />}
        onChange={({ target }) => {
          setSearchValue(target.value);
        }}
      />

      <$SearchResult>
        {characters.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </$SearchResult>

      <$Bottom>
        <BaseButton onClick={() => console.log('CHARACTERS')}>
          LOAD MORE
        </BaseButton>
      </$Bottom>
    </$HomePage>
  );
};

const $HomePage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  display: grid;
  grid-template-rows: 30px 1fr 50px;
  gap: 30px;
`;

const $SearchResult = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 190px);
  grid-template-rows: repeat(auto-fill, 300px);
  gap: 10px;
  justify-items: center;
`;

const $Bottom = styled.div`
  position: relative;
  justify-self: center;
`;

export default HomePage;
