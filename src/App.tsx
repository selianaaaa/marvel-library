import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import { GlobalStyles } from './style';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <GlobalStyles />
        <AppRouter />
      </Provider>
    </div>
  );
};
