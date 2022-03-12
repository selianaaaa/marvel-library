import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ICharacter } from '@types';
import { colors } from '@style';

interface ICharacterCard {
  character: ICharacter;
}

/**
 * Character card component
 * @param {ICharacterCard} character - character info
 */
export const CharacterCard: React.FC<ICharacterCard> = ({ character }) => {
  const { thumbnail: image, name, comics, id } = character;

  return (
    <$Character as={Link} to={`/comics/${id}`}>
      <$ImageWrapper>
        <$Image imgUrl={`${image.path}.${image.extension}`} />
      </$ImageWrapper>

      <$Info>
        <$HoverOverlap />
        <$Name>{name}</$Name>
        <$Comics>{`${comics.available} Comics`}</$Comics>
      </$Info>
    </$Character>
  );
};

const $ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  z-index: 10;
`;

const $Image = styled.div<{ imgUrl: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const $HoverOverlap = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-97%);
  background: ${colors.SECONDARY_100};
`;

const $Info = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  align-content: space-between;
  padding: 9px 10px;
`;

const $Name = styled.div`
  position: relative;
  width: 100%;
  color: ${colors.WHITE};
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
`;

const $Comics = styled.div`
  position: relative;
  width: 100%;
  color: ${colors.GRAY};
  font-size: 12px;
`;

const $Character = styled.div`
  position: relative;
  width: 190px;
  height: 300px;
  display: grid;
  grid-template-rows: 165px 1fr;
  background: ${colors.PRIMARY_100};
  clip-path: polygon(0 0, 100% 0, 100% 92%, 83% 100%, 0 100%);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    ${$Image} {
      transform: scale(1.2);
      transition: all 0.3s ease-in-out;
    }

    ${$HoverOverlap} {
      transform: translateY(0%);
      transition: all 0.3s ease-in-out;
    }
  }

  &:not(:hover) {
    ${$Image} {
      transition: all 0.1s ease-in-out;
    }
  }
`;
