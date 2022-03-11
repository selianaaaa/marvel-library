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
import { ISuperheroesState } from '@types';
import { colors } from '@style';

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
    if (!characters) {
      dispatch(superheroesActions.getCharacters());
    }
  }, []);

  if (charactersRequest) {
    return (
      <$HomePagePreload>
        <Preloader />
      </$HomePagePreload>
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
        <BaseButton
          disabled={characters.offset >= characters.total}
          onClick={() => dispatch(superheroesActions.getMoreCharacters())}
        >
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
  padding: 30px;
  display: grid;
  grid-template-rows: 30px 1fr 50px;
  gap: 30px;
`;

const $HomePagePreload = styled($HomePage)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px;
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

const $SearchResult = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 190px);
  grid-template-rows: repeat(auto-fill, 300px);
  gap: 10px;
`;

const $Bottom = styled.div`
  position: relative;
  justify-self: center;
`;

export default HomePage;
