import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { ICharactersData, ICharacter } from './_helpers.types';

export enum superheroesActionTypes {
  SET_CHARACTERS = 'set characters',
  SET_CHARACTERS_REQUEST = 'set characters request',
  SET_SELECTED_CHARACTER = 'set selected character',
}

export interface ISuperheroesState {
  characters: ICharactersData | null;
  characters_request: boolean;
  selected_character: ICharacter | null;
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
