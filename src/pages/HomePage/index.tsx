import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { BaseInput, SearchIcon } from '@components';
import { superheroesActions } from '@store';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(superheroesActions.getCharacters());
  }, []);

  return (
    <$HomePage>
      <BaseInput
        value={searchValue}
        placeholder="Search character"
        icon={<SearchIcon />}
        onChange={({ target }) => {
          setSearchValue(target.value);
          console.log('searchValue', searchValue);
        }}
      />
    </$HomePage>
  );
};

export default HomePage;

const $HomePage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 30px;
`;
