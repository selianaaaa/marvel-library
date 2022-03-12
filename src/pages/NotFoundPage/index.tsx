import React from 'react';
import styled from 'styled-components';

import { colors, baseRow } from '@style';

const NotFoundPage: React.FC = () => {
  return (
    <$NotFoundPage>
      <$Text>404 PAGE NOT FOUND</$Text>
    </$NotFoundPage>
  );
};

const $NotFoundPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px;
  ${baseRow()}
`;

const $Text = styled.div`
  color: ${colors.GRAY_100};
  font-size: 30px;
  font-weight: 500;
`;

export default NotFoundPage;
