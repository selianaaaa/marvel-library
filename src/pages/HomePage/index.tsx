import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(helpersActions.getTodayBestBoards());
  // }, []);

  return (
    <div>
      <div>HOME PAGE</div>
    </div>
  );
};

export default HomePage;
