import {
  createStore,
  applyMiddleware,
  Store,
  combineReducers,
  Reducer,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { IAppState } from '@types';
import { superheroesReducer } from './reducers';

const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  superheroes: superheroesReducer,
});
const composeEnhancers = composeWithDevTools({});

export const history = createBrowserHistory();

export const store: Store<IAppState> = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)),
);
