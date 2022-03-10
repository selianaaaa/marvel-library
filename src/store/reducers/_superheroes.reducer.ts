import { Reducer } from 'redux';
import { ISuperheroesState, superheroesActionTypes, IAppAction } from '@types';

export const initialState: ISuperheroesState = {
  characters: null,
  characters_request: false,
  character: null,
  character_request: false,
  comics: null,
  comics_request: false,
};

export const superheroesReducer: Reducer<ISuperheroesState> = (
  state: ISuperheroesState = initialState,
  { type, payload }: IAppAction,
) => {
  switch (type) {
    // characters
    case superheroesActionTypes.SET_CHARACTERS:
      return {
        ...state,
        characters: payload,
      };
    case superheroesActionTypes.SET_CHARACTERS_REQUEST:
      return {
        ...state,
        characters_request: payload,
      };
    // character
    case superheroesActionTypes.SET_CHARACTER:
      return {
        ...state,
        character: payload,
      };
    case superheroesActionTypes.SET_CHARACTER_REQUEST:
      return {
        ...state,
        character_request: payload,
      };
    // comics
    case superheroesActionTypes.SET_COMICS:
      console.log('SET_COMICS', payload);
      return {
        ...state,
        comics: payload,
      };
    case superheroesActionTypes.SET_COMICS_REQUEST:
      return {
        ...state,
        comics_request: payload,
      };
    default:
      return state;
  }
};
