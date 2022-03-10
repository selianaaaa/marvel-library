import { Reducer } from 'redux';
import { ISuperheroesState, superheroesActionTypes, IAppAction } from '@types';

export const initialState: ISuperheroesState = {
  characters: null,
  characters_request: false,
};

export const superheroesReducer: Reducer<ISuperheroesState> = (
  state: ISuperheroesState = initialState,
  { type, payload }: IAppAction,
) => {
  switch (type) {
    case superheroesActionTypes.SET_CHARACTERS:
      console.log('SET_CHARACTERS', payload);
      return {
        ...state,
        superheroes: payload,
      };
    case superheroesActionTypes.SET_CHARACTERS_REQUEST:
      return {
        ...state,
        characters_request: payload,
      };
    default:
      return state;
  }
};
