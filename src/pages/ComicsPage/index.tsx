import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Preloader } from '@components';
import { superheroesActions } from '@store';
import { ISuperheroesState } from '@types';
import { colors, baseRow } from '@style';

const ComicsPage: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ heroId: string }>();

  const character = useSelector(
    ({ superheroes }: { superheroes: ISuperheroesState }) =>
      superheroes.character,
    shallowEqual,
  );

  // useEffect(() => {
  //   if (!characters) {
  //     dispatch(superheroesActions.getCharacters());
  //   }
  // }, []);

  // if (charactersRequest) {
  //   return (
  //     <$ComicsPage>
  //       <Preloader />
  //     </$ComicsPage>
  //   );
  // }

  if (!character || params.heroId !== character?.id.toString()) {
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
        <$Comics></$Comics>
      </$ComicsWrapper>
    </$ComicsPage>
  );
};

const $ComicsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* display: grid;
  grid-template-rows: 30px 1fr 50px;
  gap: 30px; */
`;

const $Character = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: ${colors.PRIMARY_200};
  clip-path: polygon(50% 0%, 100% 0, 100% 66%, 0 100%, 0 0);
  ${baseRow('flex-end')};
  padding: 0 330px 80px 0;
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
  grid-template-columns: repeat(auto-fill, 190px);
  grid-template-rows: repeat(auto-fill, 300px);
  gap: 10px;
  justify-items: center;
`;

const $Bottom = styled.div`
  position: relative;
  justify-self: center;
`;

export default ComicsPage;
