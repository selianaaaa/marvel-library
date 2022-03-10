import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { BaseInput, SearchIcon, CharacterCard, Preloader } from '@components';
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
        <CharacterCard character={characters.results[0]} />
      </$SearchResult>
    </$HomePage>
  );
};

const $HomePage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 30px;
`;

const $SearchResult = styled.div`
  position: relative;
  width: 100%;
  padding-top: 20px;
`;

// const mapStateToProps = ({
//   superheroes,
// }: {
//   superheroes: ISuperheroesState;
// }) => ({
//   characters: superheroes.characters,
//   charactersRequest: superheroes.characters_request,
// });

// const HomePage = connect(mapStateToProps, {})(_HomePage);

export default HomePage;
