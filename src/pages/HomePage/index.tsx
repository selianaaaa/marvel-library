import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { superheroesActions } from '@store';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(superheroesActions.getCharacters());
  }, []);

  return (
    <div>
      <div>HOME PAGE</div>
    </div>
  );
};

export default HomePage;
