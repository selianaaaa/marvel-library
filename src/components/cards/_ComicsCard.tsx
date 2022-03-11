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
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.PRIMARY_100};
`;

const $Creators = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
  color: ${colors.PRIMARY_200};
  font-size: 13px;
  font-weight: 400;
`;

const $Comics = styled.div`
  position: relative;
  width: 200px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    ${$Image} {
      transform: translateY(-5px);
      transition: all 0.2s ease-in-out;
    }

    ${$Name} {
      color: ${colors.SECONDARY};
    }
  }
`;
