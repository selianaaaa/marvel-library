import { Reducer } from 'redux';
import { ISuperheroesState, superheroesActionTypes, IAppAction } from '@types';

export const initialState: ISuperheroesState = {
  characters: null,
  characters_request: false,
  character: null,
};

export const superheroesReducer: Reducer<ISuperheroesState> = (
  state: ISuperheroesState = initialState,
  { type, payload }: IAppAction,
) => {
  switch (type) {
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
    case superheroesActionTypes.SET_CHARACTER:
      return {
        ...state,
        character: payload,
      };
    default:
      return state;
  }
};
