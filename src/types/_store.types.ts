import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import { ICharactersData, ICharacter, IComics } from './_helpers.types';

export enum superheroesActionTypes {
  SET_CHARACTERS = 'set characters',
  SET_CHARACTERS_REQUEST = 'set characters request',
  SET_CHARACTER = 'set character',
  SET_CHARACTER_REQUEST = 'set character request',
  SET_COMICS = 'set comics',
  SET_COMICS_REQUEST = 'set comics request',
}

export interface ISuperheroesState {
  characters: ICharactersData | null;
  characters_request: boolean;
  character: ICharacter | null;
  character_request: boolean;
  comics: IComics[] | null;
  comics_request: boolean;
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
