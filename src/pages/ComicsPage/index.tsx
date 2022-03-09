import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ComicsPage: React.FC = () => {
  const params = useParams<{ heroId: string }>();

  return <div>{` COMICS PAGE: ${params.heroId}`}</div>;
};

export default ComicsPage;
