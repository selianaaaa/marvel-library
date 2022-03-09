import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const NotFoundPage: React.FC = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(helpersActions.getTodayBestBoards());
  // }, []);

  return (
    <div>
      <div>NOT FOUND PAGE</div>
    </div>
  );
};

export default NotFoundPage;
