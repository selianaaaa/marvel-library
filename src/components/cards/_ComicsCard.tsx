import React from 'react';
import styled from 'styled-components';

import { IComicCreator, IComics } from '@types';
import { colors } from '@style';

interface IComicsCard {
  comics: IComics;
  onClick: () => void;
}

/**
 * Comics card component
 * @param {IComics} comics - comics info
 * @param {Function} onClick - click handler
 */
export const ComicsCard: React.FC<IComicsCard> = ({ comics, onClick }) => {
  const { thumbnail: image, title, creators } = comics;

  const getCreatorsLastName = (creators: IComicCreator[]) => {
    const creatorsLastName = creators.map((creator) => {
      const nameArray = creator.name.split(' ');

      return nameArray[nameArray.length - 1];
    });

    return creatorsLastName.join(', ');
  };

  return (
    <$Comics onClick={onClick}>
      <$Image src={`${image.path}.${image.extension}`} alt={title} />

      <$Name>{title}</$Name>
      <$Creators>{getCreatorsLastName(creators.items)}</$Creators>
    </$Comics>
  );
};

const $Image = styled.img`
  position: relative;
  width: 100%;
  height: 300px;
  object-fit: cover;
  box-shadow: 4px 4px 7px 3px rgba(23, 45, 62, 0.2);
`;

const $Name = styled.div`
  position: relative;
  width: 100%;
  margin-top: 15px;
  color: ${colors.PRIMARY_100};
`;

const $Creators = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  color: ${colors.PRIMARY_200};
  font-size: 14px;
`;

const $Comics = styled.div`
  position: relative;
  width: 200px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    ${$Image} {
      box-shadow: 5px 5px 29px -5px rgba(23, 45, 62, 0.2);
      transform: scale(1.02);
      transition: all 0.2s ease-in-out;
    }
  }
`;
