import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { ICharactersData } from './_helpers.types';

export enum superheroesActionTypes {
  SET_CHARACTERS = 'set characters',
  SET_CHARACTERS_REQUEST = 'set characters request',
}

export interface ISuperheroesState {
  characters: ICharactersData | null;
  characters_request: boolean;
}

export interface IAppState {
  superheroes: ISuperheroesState;
}

export interface IStoreAction {
  type: superheroesActionTypes;
  payload?: any;
}

export type ThunkResult<T, S = Record<string, unknown>> = ThunkAction<
  T,
  IAppState & S,
  object,
  IStoreAction | AnyAction
>;

export type IAppAction = Omit<IStoreAction, 'type'> & {
  type: superheroesActionTypes;
};
