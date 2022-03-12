import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import { GlobalStyles } from './style';
import { AppRouter } from './router';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppRouter />
    </Provider>
  );
};

export default App;
