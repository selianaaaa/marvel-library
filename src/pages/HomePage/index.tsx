import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled, { css } from 'styled-components';
import debouce from 'lodash.debounce';

import { BaseInput, SearchIcon } from '@components';
import { charactersActions } from '@store';
import { ISuperheroesState } from '@types';

import { CharactersFragment } from './fragments';
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
  const charactersSearchValue = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.characters_search,
    shallowEqual,
  );

  const [searchValue, setSearchValue] = useState(charactersSearchValue);

  const handleChange = (value: string) => {
    dispatch(charactersActions.getCharacters(0, value));
  };

  const debouncedCharactersSearch = useMemo(() => {
    return debouce(handleChange, 700);
  }, []);

  useEffect(() => {
    if (!characters) {
      dispatch(charactersActions.getCharacters(0, searchValue));
    }

    return () => {
      debouncedCharactersSearch.cancel();
    };
  }, []);

  return (
    <$HomePage charactersLoading={charactersRequest}>
      <BaseInput
        value={searchValue}
        placeholder="Search character"
        icon={<SearchIcon />}
        onChange={(event) => {
          setSearchValue(event.target.value);
          debouncedCharactersSearch(event.target.value);
        }}
      />

      <CharactersFragment searchValue={searchValue} />
    </$HomePage>
  );
};

const $HomePage = styled.div<{ charactersLoading: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px;
  display: grid;
  grid-template-rows: 30px 1fr;
  gap: 30px;
  background: ${({ charactersLoading }) =>
    charactersLoading ? colors.GRAY_200 : colors.WHITE};
`;

export default HomePage;
