import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { CloseIcon } from '@components';
import { IComics } from '@types';
import { screenSizes, colors } from '@style';

interface IComicsPopup {
  comics: IComics;
  closeClick: () => void;
}

/**
 * Comics popup component
 * @param {IComics} comics - comics info
 * @param {Function} closeClick - close popup click
 */
export const ComicsPopup: React.FC<IComicsPopup> = ({ comics, closeClick }) => {
  const popup = useRef<HTMLDivElement>(null);

  const { thumbnail: image, title } = comics;

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    if (!popup.current) return;

    popup.current.style.transform = 'translateY(20px)';
    popup.current.style.opacity = '1';

    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  return (
    <$PopupWrapper>
      <$ClickArea onClick={closeClick} />

      <$Popup ref={popup}>
        <$Content>
          <$CloseButton>
            <CloseIcon onClick={closeClick} />
          </$CloseButton>

          <$Name>{comics.title}</$Name>

          <$Image src={`${image.path}.${image.extension}`} alt={title} />

          <$Description
            dangerouslySetInnerHTML={{
              __html:
                comics.description || 'This comics do not have a description.',
            }}
          />
        </$Content>
      </$Popup>
    </$PopupWrapper>
  );
};

const $PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
`;

const $ClickArea = styled.div`
  width: 100%;
  height: 100%;

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
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const $Popup = styled.div`
  position: absolute;
  top: calc(50% - 300px);
  left: calc(50% - 300px);
  width: 600px;
  height: 600px;
  opacity: 0;
  transition: all 0.5s ease;

  @media ${screenSizes.MOBILE} {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform: translateX(0);
  }
`;

const $Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px 20px 40px 20px;
  background: ${colors.WHITE};
  display: grid;
  grid-template-areas:
    'button button'
    'name name'
    'img description';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 15px 25px 1fr;
  gap: 20px;
`;

const $CloseButton = styled.button`
  position: relative;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  justify-self: end;
  grid-area: button;

  &:hover {
    transform: scale(1.1);
  }
`;

const $Name = styled.p`
  font-weight: 600;
  padding-right: 10px;
  grid-area: name;
  font-size: 17px;
`;

const $Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 4px 4px 7px 3px rgba(23, 45, 62, 0.2);
  grid-area: img;
`;

const $Description = styled.p`
  padding-right: 10px;
  font-size: 14px;
  grid-area: description;
  overflow: auto;
`;
