import {
  createStore,
  applyMiddleware,
  Store,
  combineReducers,
  compose,
  CombinedState,
  AnyAction,
} from 'redux';
import { Reducer } from 'react';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { createBrowserHistory, History } from 'history';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const rootReducer = (history: History) => combineReducers({});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

export const store = createStore(
  rootReducer(history)
  // composeEnhancers(
  //   applyMiddleware(
  //     routerMiddleware(history),
  //     thunk,
  //     websocketMiddleware
  //   )
  // )
);
